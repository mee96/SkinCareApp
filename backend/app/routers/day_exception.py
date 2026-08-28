import json
from datetime import date
from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.day_exception import DayException
from app.schemas.day_exception import DayExceptionCreate, DayExceptionOut

router = APIRouter(prefix="/exceptions", tags=["exceptions"])


@router.post("", response_model=DayExceptionOut, status_code=200)
def upsert_day_exception(payload: DayExceptionCreate, db: Session = Depends(get_db)):
    custom_steps = json.dumps(payload.custom_steps) if payload.custom_steps is not None else None

    entry = (
        db.query(DayException)
        .filter(
            DayException.user_id == payload.user_id,
            DayException.exception_date == payload.exception_date,
        )
        .first()
    )

    if entry:
        entry.note = payload.note
        entry.custom_steps = custom_steps
    else:
        entry = DayException(
            user_id=payload.user_id,
            exception_date=payload.exception_date,
            note=payload.note,
            custom_steps=custom_steps,
        )
        db.add(entry)

    db.commit()
    db.refresh(entry)
    return entry


@router.get("", response_model=List[DayExceptionOut])
def list_day_exceptions(
    user_id: str,
    start: date,
    end: date,
    db: Session = Depends(get_db),
):
    return (
        db.query(DayException)
        .filter(
            DayException.user_id == user_id,
            DayException.exception_date >= start,
            DayException.exception_date <= end,
        )
        .order_by(DayException.exception_date)
        .all()
    )


@router.delete("/{exception_id}", status_code=204)
def delete_day_exception(exception_id: int, db: Session = Depends(get_db)):
    entry = db.query(DayException).filter(DayException.id == exception_id).first()
    if not entry:
        raise HTTPException(status_code=404, detail="Day exception not found")
    db.delete(entry)
    db.commit()
    return None
