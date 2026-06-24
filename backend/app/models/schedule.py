from sqlalchemy import (
    Column, BigInteger, String, Date, CHAR, ForeignKey, UniqueConstraint
)
from app.core.database import Base


class ScheduleDay(Base):
    __tablename__ = "schedule_day"

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    user_id = Column(
        String(128),
        ForeignKey("user.firebase_uid", ondelete="CASCADE"),
        nullable=False,
    )
    sched_date = Column(Date, nullable=False)
    routine_type_code = Column(
        CHAR(1),
        ForeignKey("routine_type.code"),
        nullable=False,
    )

    __table_args__ = (
        UniqueConstraint("user_id", "sched_date", name="uq_schedule_day"),
    )