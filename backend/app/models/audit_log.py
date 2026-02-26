import uuid
from sqlalchemy import Column, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base, TimestampMixin


class AuditLog(Base, TimestampMixin):
    __tablename__ = "audit_logs"

    id          = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id     = Column(String, ForeignKey("users.id"), nullable=True)
    action      = Column(String, nullable=False)   # e.g. CREATE_USER, UPDATE_TASK
    resource    = Column(String, nullable=True)    # e.g. users, tasks
    resource_id = Column(String, nullable=True)
    detail      = Column(Text,   nullable=True)    # JSON snapshot
    ip_address  = Column(String, nullable=True)

    user        = relationship("User")
