from typing import Optional, Literal
from pydantic import BaseModel, ConfigDict


Moment = Literal["am", "pm"]
SlotId = Literal[
    "oil-cleanser", "water-cleanser", "toner", "essence", "treatment-serum",
    "retinoid", "eye", "moisturizer", "exfoliant", "spf",
]
RoutineTypeCode = Literal["R", "C", "H", "P"]


# El que el client ENVIA per crear un pas
class StepDefCreate(BaseModel):
    user_id: str
    routine_type_code: RoutineTypeCode
    moment: Moment
    slot_id: SlotId
    product_id: Optional[int] = None
    sort_order: int
    is_optional: bool = False


# El que el client ENVIA per actualitzar (tot opcional)
class StepDefUpdate(BaseModel):
    moment: Optional[Moment] = None
    slot_id: Optional[SlotId] = None
    product_id: Optional[int] = None
    sort_order: Optional[int] = None
    is_optional: Optional[bool] = None


# El que l'API RETORNA
class StepDefOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: str
    routine_type_code: RoutineTypeCode
    moment: Moment
    slot_id: SlotId
    product_id: Optional[int] = None
    sort_order: int
    is_optional: bool