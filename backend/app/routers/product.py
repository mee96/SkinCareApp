from typing import List, Optional

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.crud import CRUDBase
from app.core.database import get_db
from app.models.product import Product
from app.schemas.product import ProductCreate, ProductUpdate, ProductOut

router = APIRouter(prefix="/products", tags=["products"])
crud = CRUDBase[Product, ProductCreate, ProductUpdate](
    Product, not_found_detail="Product not found"
)


@router.post("", response_model=ProductOut, status_code=201)
def create_product(payload: ProductCreate, db: Session = Depends(get_db)):
    return crud.create(db, payload)


@router.get("", response_model=List[ProductOut])
def list_products(user_id: Optional[str] = None, db: Session = Depends(get_db)):
    return crud.list(db, filters={"user_id": user_id})


@router.get("/{product_id}", response_model=ProductOut)
def get_product(product_id: int, db: Session = Depends(get_db)):
    return crud.get(db, product_id)


@router.patch("/{product_id}", response_model=ProductOut)
def update_product(product_id: int, payload: ProductUpdate, db: Session = Depends(get_db)):
    return crud.update(db, product_id, payload)


@router.delete("/{product_id}", status_code=204)
def delete_product(product_id: int, db: Session = Depends(get_db)):
    crud.delete(db, product_id)
    return None
