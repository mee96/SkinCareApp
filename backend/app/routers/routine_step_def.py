from typing import List, Optional
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.crud import CRUDBase
from app.models.routine_step_def import RoutineStepDef
from app.schemas.routine_step_def import StepDefCreate, StepDefUpdate, StepDefOut

router = APIRouter(prefix="/step-defs", tags=["step-defs"])

crud = CRUDBase[RoutineStepDef, StepDefCreate, StepDefUpdate](
    RoutineStepDef, not_found_detail="Step definition not found"
)


@router.post("", response_model=StepDefOut, status_code=201)
def create_step_def(payload: StepDefCreate, db: Session = Depends(get_db)):
    return crud.create(db, payload)


@router.get("", response_model=List[StepDefOut])
def list_step_defs(
    user_id: Optional[str] = None,
    routine_type_code: Optional[str] = None,
    db: Session = Depends(get_db),
):
    return crud.list(db, filters={"user_id": user_id, "routine_type_code": routine_type_code})


@router.get("/{step_def_id}", response_model=StepDefOut)
def get_step_def(step_def_id: int, db: Session = Depends(get_db)):
    return crud.get(db, step_def_id)


@router.patch("/{step_def_id}", response_model=StepDefOut)
def update_step_def(step_def_id: int, payload: StepDefUpdate, db: Session = Depends(get_db)):
    return crud.update(db, step_def_id, payload)


@router.delete("/{step_def_id}", status_code=204)
def delete_step_def(step_def_id: int, db: Session = Depends(get_db)):
    crud.delete(db, step_def_id)
    return None