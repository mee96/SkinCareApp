from sqlalchemy import Column, BigInteger, String, TIMESTAMP, ForeignKey, func
from app.core.database import Base

class Wishlist(Base):
    __tablename__ = "wishlist"
    id           = Column(BigInteger, primary_key=True, autoincrement=True)
    user_id      = Column(String(128), ForeignKey("user.firebase_uid", ondelete="CASCADE"), nullable=False)
    product_name = Column(String(120), nullable=False)
    brand        = Column(String(80), nullable=True)
    slot_id      = Column(String(30), nullable=True)
    added_at     = Column(TIMESTAMP, server_default=func.now())
