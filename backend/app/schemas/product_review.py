from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict, Field


# El que el client ENVIA per crear/upsert una review
class ReviewCreate(BaseModel):
    user_id: str
    product_id: int
    rating: int = Field(ge=1, le=5)
    notes: Optional[str] = None


# El que el client ENVIA per actualitzar (tot opcional)
class ReviewUpdate(BaseModel):
    rating: Optional[int] = Field(default=None, ge=1, le=5)
    notes: Optional[str] = None


# El que l'API RETORNA
class ReviewOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: str
    product_id: int
    rating: int
    notes: Optional[str] = None
    created_at: datetime
    updated_at: datetime
