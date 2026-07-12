from typing import List, Optional

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.crud import CRUDBase
from app.core.database import get_db
from app.models.wishlist import Wishlist
from app.schemas.wishlist import WishlistCreate, WishlistOut

router = APIRouter(prefix="/wishlist", tags=["wishlist"])
crud = CRUDBase[Wishlist, WishlistCreate, WishlistCreate](
    Wishlist, not_found_detail="Wishlist entry not found"
)


@router.post("", response_model=WishlistOut, status_code=201)
def create_wishlist_entry(payload: WishlistCreate, db: Session = Depends(get_db)):
    return crud.create(db, payload)


@router.get("", response_model=List[WishlistOut])
def list_wishlist(user_id: Optional[str] = None, db: Session = Depends(get_db)):
    return crud.list(db, filters={"user_id": user_id})


@router.delete("/{wishlist_id}", status_code=204)
def delete_wishlist_entry(wishlist_id: int, db: Session = Depends(get_db)):
    crud.delete(db, wishlist_id)
    return None
