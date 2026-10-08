from datetime import datetime
from typing import Optional, Literal
from pydantic import BaseModel, ConfigDict


# Casa amb l'ENUM concern_type de la BBDD
ConcernType = Literal[
    "grans", "rosacea", "arrugues", "iluminacio", "taques", "poros", "deshidratacio"
]


# El que el client ENVIA per crear
class ConcernCreate(BaseModel):
    user_id: str
    concern_type: ConcernType
    priority: int = 1


# El que el client ENVIA per actualitzar (tot opcional)
class ConcernUpdate(BaseModel):
    concern_type: Optional[ConcernType] = None
    priority: Optional[int] = None


# El que l'API RETORNA
class ConcernOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: str
    concern_type: ConcernType
    priority: int
    created_at: datetime