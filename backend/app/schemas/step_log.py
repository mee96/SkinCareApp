from datetime import date, datetime
from pydantic import BaseModel, ConfigDict


# El que el client ENVIA per fer toggle d'un pas
class StepLogToggle(BaseModel):
    user_id: str
    log_date: date
    step_def_id: int


# El que l'API RETORNA després del toggle
class StepLogToggleResult(BaseModel):
    done: bool          # True = ara està marcat, False = ara desmarcat
    step_def_id: int
    log_date: date


# El que l'API RETORNA quan llegeix els passos fets d'un dia
class StepLogOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: str
    log_date: date
    step_def_id: int
    done_at: datetime