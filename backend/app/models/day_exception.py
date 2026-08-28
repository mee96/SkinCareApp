from sqlalchemy import Column, BigInteger, String, Date, Text, TIMESTAMP, ForeignKey, UniqueConstraint, func
from app.core.database import Base

class DayException(Base):
    __tablename__ = "day_exception"
    id             = Column(BigInteger, primary_key=True, autoincrement=True)
    user_id        = Column(String(128), ForeignKey("user.firebase_uid", ondelete="CASCADE"), nullable=False)
    exception_date = Column(Date, nullable=False)
    note           = Column(String(500), nullable=True)
    custom_steps   = Column(Text, nullable=True)
    created_at     = Column(TIMESTAMP, server_default=func.now())
    updated_at     = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())
    __table_args__ = (UniqueConstraint("user_id", "exception_date", name="uq_day_exception"),)
