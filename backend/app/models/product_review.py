from sqlalchemy import Column, BigInteger, String, TIMESTAMP, SmallInteger, ForeignKey, func, UniqueConstraint
from app.core.database import Base

class ProductReview(Base):
    __tablename__ = "product_review"
    id         = Column(BigInteger, primary_key=True, autoincrement=True)
    user_id    = Column(String(128), ForeignKey("user.firebase_uid", ondelete="CASCADE"), nullable=False)
    product_id = Column(BigInteger, ForeignKey("product.id", ondelete="CASCADE"), nullable=False)
    rating     = Column(SmallInteger, nullable=False)
    notes      = Column(String(500), nullable=True)
    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())
    __table_args__ = (UniqueConstraint("user_id", "product_id", name="uq_review"),)
