from sqlalchemy import (
    Column, BigInteger, String, Date, TIMESTAMP, ForeignKey, UniqueConstraint, func
)
from app.core.database import Base


class StepLog(Base):
    __tablename__ = "step_log"

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    user_id = Column(
        String(128),
        ForeignKey("user.firebase_uid", ondelete="CASCADE"),
        nullable=False,
    )
    log_date = Column(Date, nullable=False)
    step_def_id = Column(
        BigInteger,
        ForeignKey("routine_step_def.id", ondelete="CASCADE"),
        nullable=False,
    )
    done_at = Column(TIMESTAMP, server_default=func.now())

    __table_args__ = (
        UniqueConstraint("user_id", "log_date", "step_def_id", name="uq_step_log"),
    )