from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserOut

router = APIRouter(prefix="/users", tags=["users"])


@router.post("", response_model=UserOut, status_code=201)
def create_user(payload: UserCreate, db: Session = Depends(get_db)):
    # ja existeix?
    existing = db.get(User, payload.firebase_uid)
    if existing:
        raise HTTPException(status_code=409, detail="User already exists")

    user = User(**payload.model_dump())
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@router.get("/{firebase_uid}", response_model=UserOut)
def get_user(firebase_uid: str, db: Session = Depends(get_db)):
    user = db.get(User, firebase_uid)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user