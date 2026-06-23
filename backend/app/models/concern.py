from sqlalchemy import (
    Column, BigInteger, String, Enum, SmallInteger, TIMESTAMP, ForeignKey, func
)
from app.core.database import Base


class UserConcern(Base):
    __tablename__ = "user_concern"

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    user_id = Column(
        String(128),
        ForeignKey("user.firebase_uid", ondelete="CASCADE"),
        nullable=False,
    )
    concern_type = Column(
        Enum("grans", "rosacea", "arrugues", "iluminacio", "taques", "poros", "deshidratacio"),
        nullable=False,
    )
    priority = Column(SmallInteger, nullable=False, default=1)
    created_at = Column(TIMESTAMP, server_default=func.now())