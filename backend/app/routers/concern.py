from typing import List, Optional

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.crud import CRUDBase
from app.core.database import get_db
from app.models.concern import UserConcern
from app.schemas.concern import ConcernCreate, ConcernUpdate, ConcernOut

router = APIRouter(prefix="/concerns", tags=["concerns"])
crud = CRUDBase[UserConcern, ConcernCreate, ConcernUpdate](
    UserConcern, not_found_detail="Concern not found"
)


@router.post("", response_model=ConcernOut, status_code=201)
def create_concern(payload: ConcernCreate, db: Session = Depends(get_db)):
    return crud.create(db, payload)


@router.get("", response_model=List[ConcernOut])
def list_concerns(user_id: Optional[str] = None, db: Session = Depends(get_db)):
    return crud.list(db, filters={"user_id": user_id})


@router.get("/{concern_id}", response_model=ConcernOut)
def get_concern(concern_id: int, db: Session = Depends(get_db)):
    return crud.get(db, concern_id)


@router.patch("/{concern_id}", response_model=ConcernOut)
def update_concern(concern_id: int, payload: ConcernUpdate, db: Session = Depends(get_db)):
    return crud.update(db, concern_id, payload)


@router.delete("/{concern_id}", status_code=204)
def delete_concern(concern_id: int, db: Session = Depends(get_db)):
    crud.delete(db, concern_id)
    return None
