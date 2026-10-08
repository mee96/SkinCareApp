from typing import Literal, Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.user import User
from app.models.concern import UserConcern
from app.models.product import Product
from app.services.groq_service import skincare_chat

router = APIRouter(prefix="/chat", tags=["chat"])


class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str


class ChatRequest(BaseModel):
    user_id: str
    message: str
    history: list[ChatMessage] = []


class ChatResponse(BaseModel):
    response: str


@router.post("/skincare", response_model=ChatResponse)
def chat_skincare(payload: ChatRequest, db: Session = Depends(get_db)):
    user: Optional[User] = db.get(User, payload.user_id)
    skin_type = user.skin_type if user else None

    concerns = (
        db.query(UserConcern)
        .filter(UserConcern.user_id == payload.user_id)
        .all()
    )
    concern_list = [c.concern_type for c in concerns]

    products = (
        db.query(Product)
        .filter(Product.user_id == payload.user_id, Product.in_stock.is_(True))
        .all()
    )
    product_list = [p.name for p in products]

    try:
        response_text = skincare_chat(
            payload.message,
            [h.model_dump() for h in payload.history],
            skin_type,
            concern_list,
            product_list,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al chat: {str(e)}")

    return ChatResponse(response=response_text)
