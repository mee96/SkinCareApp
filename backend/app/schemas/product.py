from datetime import date, datetime
from typing import Optional, Literal
from pydantic import BaseModel, ConfigDict


# Els 10 slots canònics de la rutina coreana (casa amb la taula routine_slot)
SlotId = Literal[
    "oil-cleanser", "water-cleanser", "toner", "essence", "treatment-serum",
    "retinoid", "eye", "moisturizer", "exfoliant", "spf",
]


# El que el client ENVIA per crear un producte
class ProductCreate(BaseModel):
    user_id: str
    name: str
    brand: Optional[str] = None
    slot_id: SlotId
    in_stock: bool = True
    opened_at: Optional[date] = None


# El que el client ENVIA per actualitzar (tot opcional)
class ProductUpdate(BaseModel):
    name: Optional[str] = None
    brand: Optional[str] = None
    slot_id: Optional[SlotId] = None
    in_stock: Optional[bool] = None
    opened_at: Optional[date] = None


# El que l'API RETORNA
class ProductOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: str
    name: str
    brand: Optional[str] = None
    slot_id: SlotId
    in_stock: bool
    opened_at: Optional[date] = None
    created_at: datetime