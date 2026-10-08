from functools import lru_cache

from groq import Groq
from app.core.config import settings


# Lazily builds the Groq client on first use instead of at import time. This matters because
# an invalid/missing GROQ_API_KEY would otherwise raise during app startup (crashing every
# route, not just the AI ones) since this module is imported eagerly by the routers.
# lru_cache(maxsize=1) makes it a de-facto singleton: the client is created once and reused.
@lru_cache(maxsize=1)
def get_groq_client() -> Groq:
    return Groq(api_key=settings.GROQ_API_KEY)


def scan_product_image(image_base64: str, media_type: str = "image/jpeg") -> dict:
    """Envia una imatge a Groq i retorna nom, marca i slot del producte.

    Uses a vision-capable model (qwen3.8-27b) since this is the only one of the three
    AI calls that needs to interpret an actual image rather than plain text.
    The prompt forces a strict JSON shape so the caller can parse the reply without
    an LLM-specific SDK; explicit nulls are requested for the "can't tell" case
    instead of leaving fields out, keeping the response shape predictable.
    """
    response = get_groq_client().chat.completions.create(
        model="qwen/qwen3.8-27b",
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:{media_type};base64,{image_base64}"
                        }
                    },
                    {
                        "type": "text",
                        "text": """You are a skincare product expert. Analyze this product image and respond ONLY with a JSON object (no markdown, no explanation) with these exact keys:
{
  "name": "product name",
  "brand": "brand name or null",
  "slot_id": "one of: oil-cleanser, water-cleanser, toner, essence, treatment-serum, retinoid, eye, moisturizer, exfoliant, spf"
}
If you cannot identify the product, return {"name": null, "brand": null, "slot_id": null}."""
                    }
                ]
            }
        ],
        max_tokens=200,
    )
    
    import json
    raw = response.choices[0].message.content.strip()
    # Models often wrap JSON in ```/```json code fences despite being told not to;
    # strip that before parsing. No try/except here: a malformed reply should
    # surface as a 500 to the router rather than silently returning bad data.
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]
    return json.loads(raw.strip())


def classify_product(name: str, brand: str | None) -> dict:
    """Classifica un producte al seu slot de rutina a partir del nom i la marca.

    Uses "groq/compound" (a fast, text-only model) since this call only needs to
    reason over a name/brand string, not an image — no vision capability required.
    """
    response = get_groq_client().chat.completions.create(
        model="groq/compound",
        messages=[
            {
                "role": "user",
                "content": f"""You are a skincare product expert. Given a product name and brand, classify it into exactly one routine slot. Respond ONLY with a JSON object (no markdown, no explanation) with this exact key:
{{
  "slot_id": "one of: oil-cleanser, water-cleanser, toner, essence, treatment-serum, exfoliant, eye, moisturizer, spf"
}}
If you cannot determine it, return {{"slot_id": "moisturizer"}}.

Product name: {name}
Brand: {brand or "unknown"}""",
            }
        ],
        max_tokens=60,
    )

    import json
    raw = response.choices[0].message.content.strip()
    # Same code-fence stripping as scan_product_image (see comment there).
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]
    try:
        result = json.loads(raw.strip())
    except (json.JSONDecodeError, ValueError):
        # Unlike scan/check-ingredients, classification always needs a slot_id for the
        # product to be saved — "moisturizer" is the safest default because every
        # routine has one, so a wrong guess here is low-stakes and easy to fix later.
        return {"slot_id": "moisturizer"}
    if not result.get("slot_id"):
        result = {"slot_id": "moisturizer"}
    return result


def check_ingredients(
    product_name: str,
    brand: str | None,
    skin_type: str | None,
    concerns: list[str]
) -> dict:
    """Comprova si un producte és adequat per al perfil de l'usuari.

    Also uses "groq/compound" (text-only reasoning over the user's skin profile).
    The prompt asks for a Catalan summary plus a structured `warnings` list so the
    frontend can render free text and bullet points without extra parsing.
    """
    concerns_text = ", ".join(concerns) if concerns else "cap preocupació específica"
    skin_text = skin_type or "no especificat"

    response = get_groq_client().chat.completions.create(
        model="groq/compound",
        messages=[
            {
                "role": "user",
                "content": f"""Ets un expert en skincare coreà. Analitza si aquest producte és adequat per a aquest perfil i respon NOMÉS amb un JSON (sense markdown):
{{
  "suitable": true/false,
  "summary": "resum breu en català (màx 2 frases)",
  "warnings": ["avís 1 si cal", "avís 2 si cal"]
}}

Producte: {product_name} de {brand or "marca desconeguda"}
Tipus de pell: {skin_text}
Preocupacions: {concerns_text}"""
            }
        ],
        max_tokens=300,
    )
    
    import json
    raw = response.choices[0].message.content.strip()
    # No safe fallback here on purpose: guessing "suitable: true" on a parse failure
    # could pass along unreliable skincare advice, so we'd rather bubble up a 500.
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]
    return json.loads(raw.strip())