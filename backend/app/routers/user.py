from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.crud import CRUDBase
from app.core.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate, UserOut

router = APIRouter(prefix="/users", tags=["users"])
crud = CRUDBase[User, UserCreate, UserUpdate](User, not_found_detail="User not found")


@router.post("", response_model=UserOut, status_code=201)
def create_user(payload: UserCreate, db: Session = Depends(get_db)):
    # ja existeix?
    existing = db.get(User, payload.firebase_uid)
    if existing:
        raise HTTPException(status_code=409, detail="User already exists")
    return crud.create(db, payload)


@router.get("/{firebase_uid}", response_model=UserOut)
def get_user(firebase_uid: str, db: Session = Depends(get_db)):
    return crud.get(db, firebase_uid)


@router.get("", response_model=List[UserOut])
def list_users(db: Session = Depends(get_db)):
    return crud.list(db)


@router.patch("/{firebase_uid}", response_model=UserOut)
def update_user(firebase_uid: str, payload: UserUpdate, db: Session = Depends(get_db)):
    return crud.update(db, firebase_uid, payload)


@router.delete("/{firebase_uid}", status_code=204)
def delete_user(firebase_uid: str, db: Session = Depends(get_db)):
    crud.delete(db, firebase_uid)
    return None
