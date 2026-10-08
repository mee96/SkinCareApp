from datetime import datetime
from typing import Optional, Literal
from pydantic import BaseModel, EmailStr, ConfigDict


# Tipus reutilitzable per al tipus de pell (casa amb l'ENUM de la BBDD)
SkinType = Literal["mixta", "grassa", "seca", "normal", "sensible"]


# El que el client ENVIA per crear un usuari
class UserCreate(BaseModel):
    firebase_uid: str
    email: EmailStr
    display_name: Optional[str] = None
    skin_type: Optional[SkinType] = None


# El que el client ENVIA per actualitzar (tot opcional)
class UserUpdate(BaseModel):
    display_name: Optional[str] = None
    skin_type: Optional[SkinType] = None


# El que l'API RETORNA
class UserOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    firebase_uid: str
    email: EmailStr
    display_name: Optional[str] = None
    skin_type: Optional[SkinType] = None
    created_at: datetime
    updated_at: datetime