from typing import List, Optional
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.step_log import StepLog
from app.schemas.step_log import StepLogToggle, StepLogToggleResult, StepLogOut

router = APIRouter(prefix="/step-logs", tags=["step-logs"])


@router.post("/toggle", response_model=StepLogToggleResult)
def toggle_step(payload: StepLogToggle, db: Session = Depends(get_db)):
    # busquem si aquest pas ja està marcat aquest dia
    existing = (
        db.query(StepLog)
        .filter(
            StepLog.user_id == payload.user_id,
            StepLog.log_date == payload.log_date,
            StepLog.step_def_id == payload.step_def_id,
        )
        .first()
    )

    if existing:
        # ja estava fet -> el desmarquem (esborrem la fila)
        db.delete(existing)
        db.commit()
        done = False
    else:
        # no estava fet -> el marquem (creem la fila)
        log = StepLog(
            user_id=payload.user_id,
            log_date=payload.log_date,
            step_def_id=payload.step_def_id,
        )
        db.add(log)
        db.commit()
        done = True

    return StepLogToggleResult(
        done=done,
        step_def_id=payload.step_def_id,
        log_date=payload.log_date,
    )


@router.get("", response_model=List[StepLogOut])
def list_step_logs(
    user_id: Optional[str] = None,
    log_date: Optional[str] = None,
    db: Session = Depends(get_db),
):
    query = db.query(StepLog)
    if user_id:
        query = query.filter(StepLog.user_id == user_id)
    if log_date:
        query = query.filter(StepLog.log_date == log_date)
    return query.all()