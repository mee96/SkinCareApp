from sqlalchemy import Column, String, Boolean, SmallInteger
from app.core.database import Base


class RoutineSlot(Base):
    __tablename__ = "routine_slot"

    slot_id = Column(String(30), primary_key=True)
    label = Column(String(60), nullable=False)
    is_required = Column(Boolean, nullable=False, default=False)
    sort_order = Column(SmallInteger, nullable=False)