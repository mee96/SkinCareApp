from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict


# El que el client ENVIA per crear una entrada de wishlist
class WishlistCreate(BaseModel):
    user_id: str
    product_name: str
    brand: Optional[str] = None
    slot_id: Optional[str] = None


# El que l'API RETORNA
class WishlistOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: str
    product_name: str
    brand: Optional[str] = None
    slot_id: Optional[str] = None
    added_at: datetime
