from groq import Groq
from app.core.config import settings

client = Groq(api_key=settings.GROQ_API_KEY)

def scan_product_image(image_base64: str, media_type: str = "image/jpeg") -> dict:
    """Envia una imatge a Groq i retorna nom, marca i slot del producte."""
    response = client.chat.completions.create(
        model="meta-llama/llama-4-scout-17b-16e-instruct",
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
    # neteja possible markdown
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]
    return json.loads(raw.strip())


def check_ingredients(
    product_name: str,
    brand: str | None,
    skin_type: str | None,
    concerns: list[str]
) -> dict:
    """Comprova si un producte és adequat per al perfil de l'usuari."""
    concerns_text = ", ".join(concerns) if concerns else "cap preocupació específica"
    skin_text = skin_type or "no especificat"
    
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
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
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]
    return json.loads(raw.strip())