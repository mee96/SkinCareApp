from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.product_review import ProductReview
from app.schemas.product_review import ReviewCreate, ReviewOut

router = APIRouter(prefix="/reviews", tags=["reviews"])


@router.post("", response_model=ReviewOut, status_code=200)
def upsert_review(payload: ReviewCreate, db: Session = Depends(get_db)):
    # busquem si ja existeix una review d'aquest usuari per aquest producte
    existing = (
        db.query(ProductReview)
        .filter(
            ProductReview.user_id == payload.user_id,
            ProductReview.product_id == payload.product_id,
        )
        .first()
    )

    if existing:
        # ja existeix -> actualitzem rating i notes
        existing.rating = payload.rating
        existing.notes = payload.notes
        db.commit()
        db.refresh(existing)
        return existing

    # no existeix -> la creem
    review = ProductReview(**payload.model_dump())
    db.add(review)
    db.commit()
    db.refresh(review)
    return review


@router.get("/{product_id}", response_model=ReviewOut)
def get_review(product_id: int, user_id: Optional[str] = None, db: Session = Depends(get_db)):
    review = (
        db.query(ProductReview)
        .filter(
            ProductReview.product_id == product_id,
            ProductReview.user_id == user_id,
        )
        .first()
    )
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    return review
