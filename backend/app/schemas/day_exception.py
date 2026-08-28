from datetime import date, datetime
from typing import Any, Optional
from pydantic import BaseModel, ConfigDict


# El que el client ENVIA per crear/actualitzar una excepció de dia
class DayExceptionCreate(BaseModel):
    user_id: str
    exception_date: date
    note: Optional[str] = None
    custom_steps: Optional[list[Any]] = None


# El que l'API RETORNA
class DayExceptionOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: str
    exception_date: date
    note: Optional[str] = None
    custom_steps: Optional[str] = None
    created_at: datetime
    updated_at: datetime
