from sqlalchemy import Column, String, Enum, TIMESTAMP, func
from app.core.database import Base


class User(Base):
    __tablename__ = "user"

    firebase_uid = Column(String(128), primary_key=True)
    email = Column(String(255), nullable=False, unique=True)
    display_name = Column(String(100), nullable=True)
    skin_type = Column(
        Enum("mixta", "grassa", "seca", "normal", "sensible"),
        nullable=True,
    )
    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now()) 