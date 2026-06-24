from datetime import date
from typing import Literal
from pydantic import BaseModel, ConfigDict


# Casa amb els codis de la taula routine_type
RoutineTypeCode = Literal["R", "C", "H", "P"]


# El que el client ENVIA per crear/canviar un dia
class ScheduleDayCreate(BaseModel):
    user_id: str
    sched_date: date
    routine_type_code: RoutineTypeCode


# El que l'API RETORNA
class ScheduleDayOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: str
    sched_date: date
    routine_type_code: RoutineTypeCode