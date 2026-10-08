from sqlalchemy import (
    Column, BigInteger, String, Boolean, Date, TIMESTAMP, ForeignKey, func
)
from app.core.database import Base


class Product(Base):
    __tablename__ = "product"

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    user_id = Column(
        String(128),
        ForeignKey("user.firebase_uid", ondelete="CASCADE"),
        nullable=False,
    )
    name = Column(String(120), nullable=False)
    brand = Column(String(80), nullable=True)
    slot_id = Column(
        String(30),
        ForeignKey("routine_slot.slot_id"),
        nullable=False,
    )
    in_stock = Column(Boolean, nullable=False, default=True)
    opened_at = Column(Date, nullable=True)
    created_at = Column(TIMESTAMP, server_default=func.now())