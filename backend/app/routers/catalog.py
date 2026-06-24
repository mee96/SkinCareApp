from typing import List, Optional
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel, ConfigDict

from app.core.database import get_db
from app.models.routine_slot import RoutineSlot
from app.models.routine_type import RoutineType
from app.models.ingredient import Ingredient

router = APIRouter(prefix="/catalog", tags=["catalog"])


# --- Schemas de sortida (només lectura) ---
class SlotOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    slot_id: str
    label: str
    is_required: bool
    sort_order: int


class TypeOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    code: str
    label: str
    icon: Optional[str] = None


class IngredientOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str
    category: Optional[str] = None
    description: Optional[str] = None


# --- Endpoints (només GET) ---
@router.get("/slots", response_model=List[SlotOut])
def list_slots(db: Session = Depends(get_db)):
    return db.query(RoutineSlot).order_by(RoutineSlot.sort_order).all()


@router.get("/types", response_model=List[TypeOut])
def list_types(db: Session = Depends(get_db)):
    return db.query(RoutineType).all()


@router.get("/ingredients", response_model=List[IngredientOut])
def list_ingredients(db: Session = Depends(get_db)):
    return db.query(Ingredient).order_by(Ingredient.name).all()