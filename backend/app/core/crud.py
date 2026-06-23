from typing import Any, Generic, Optional, Type, TypeVar

from fastapi import HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.core.database import Base

ModelType = TypeVar("ModelType", bound=Base)
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)


class CRUDBase(Generic[ModelType, CreateSchemaType, UpdateSchemaType]):
    """Operacions CRUD genèriques i reutilitzables per a qualsevol model."""

    def __init__(self, model: Type[ModelType], *, not_found_detail: Optional[str] = None):
        self.model = model
        self.not_found_detail = not_found_detail or f"{model.__name__} not found"

    def create(self, db: Session, payload: CreateSchemaType) -> ModelType:
        obj = self.model(**payload.model_dump())
        db.add(obj)
        db.commit()
        db.refresh(obj)
        return obj

    def get(self, db: Session, id: Any) -> ModelType:
        obj = db.get(self.model, id)
        if not obj:
            raise HTTPException(status_code=404, detail=self.not_found_detail)
        return obj

    def list(self, db: Session, *, filters: Optional[dict] = None) -> list[ModelType]:
        query = db.query(self.model)
        if filters:
            for field, value in filters.items():
                # només filtrem pels camps que tenen un valor (manté el
                # comportament original `if user_id:`)
                if value:
                    query = query.filter(getattr(self.model, field) == value)
        return query.all()

    def update(self, db: Session, id: Any, payload: UpdateSchemaType) -> ModelType:
        obj = self.get(db, id)
        # només actualitzem els camps que han arribat (no els None)
        data = payload.model_dump(exclude_unset=True)
        for field, value in data.items():
            setattr(obj, field, value)
        db.commit()
        db.refresh(obj)
        return obj

    def delete(self, db: Session, id: Any) -> None:
        obj = self.get(db, id)
        db.delete(obj)
        db.commit()
        return None
