from sqlalchemy import (
    Column, BigInteger, String, CHAR, Enum, SmallInteger, Boolean, ForeignKey, UniqueConstraint
)
from app.core.database import Base


class RoutineStepDef(Base):
    __tablename__ = "routine_step_def"

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    user_id = Column(
        String(128),
        ForeignKey("user.firebase_uid", ondelete="CASCADE"),
        nullable=False,
    )
    routine_type_code = Column(
        CHAR(1),
        ForeignKey("routine_type.code"),
        nullable=False,
    )
    moment = Column(Enum("am", "pm"), nullable=False)
    slot_id = Column(
        String(30),
        ForeignKey("routine_slot.slot_id"),
        nullable=False,
    )
    product_id = Column(
        BigInteger,
        ForeignKey("product.id", ondelete="SET NULL"),
        nullable=True,
    )
    sort_order = Column(SmallInteger, nullable=False)
    is_optional = Column(Boolean, nullable=False, default=False)

    __table_args__ = (
        UniqueConstraint("user_id", "routine_type_code", "moment", "sort_order", name="uq_step_def"),
    )