from sqlalchemy import Column, CHAR, String
from app.core.database import Base


class RoutineType(Base):
    __tablename__ = "routine_type"

    code = Column(CHAR(1), primary_key=True)
    label = Column(String(40), nullable=False)
    icon = Column(String(8), nullable=True)