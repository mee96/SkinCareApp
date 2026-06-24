from sqlalchemy import Column, BigInteger, String, Text
from app.core.database import Base


class Ingredient(Base):
    __tablename__ = "ingredient"

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    name = Column(String(80), nullable=False, unique=True)
    category = Column(String(40), nullable=True)
    description = Column(Text, nullable=True)