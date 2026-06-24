from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.schedule import ScheduleDay
from app.schemas.schedule import ScheduleDayCreate, ScheduleDayOut

router = APIRouter(prefix="/schedule", tags=["schedule"])


@router.post("", response_model=ScheduleDayOut, status_code=200)
def upsert_schedule_day(payload: ScheduleDayCreate, db: Session = Depends(get_db)):
    # busquem si ja existeix un dia per aquest usuari + data
    existing = (
        db.query(ScheduleDay)
        .filter(
            ScheduleDay.user_id == payload.user_id,
            ScheduleDay.sched_date == payload.sched_date,
        )
        .first()
    )

    if existing:
        # ja existeix -> actualitzem el tipus (ex: Retinal -> Hidratació)
        existing.routine_type_code = payload.routine_type_code
        db.commit()
        db.refresh(existing)
        return existing

    # no existeix -> el creem
    day = ScheduleDay(**payload.model_dump())
    db.add(day)
    db.commit()
    db.refresh(day)
    return day


@router.get("", response_model=List[ScheduleDayOut])
def list_schedule(
    user_id: Optional[str] = None,
    start: Optional[str] = None,
    end: Optional[str] = None,
    db: Session = Depends(get_db),
):
    query = db.query(ScheduleDay)
    if user_id:
        query = query.filter(ScheduleDay.user_id == user_id)
    if start:
        query = query.filter(ScheduleDay.sched_date >= start)
    if end:
        query = query.filter(ScheduleDay.sched_date <= end)
    return query.order_by(ScheduleDay.sched_date).all()


@router.delete("/{schedule_id}", status_code=204)
def delete_schedule_day(schedule_id: int, db: Session = Depends(get_db)):
    day = db.get(ScheduleDay, schedule_id)
    if not day:
        raise HTTPException(status_code=404, detail="Schedule day not found")
    db.delete(day)
    db.commit()
    return None