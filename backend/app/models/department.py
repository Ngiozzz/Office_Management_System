import uuid
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base, TimestampMixin


class Department(Base, TimestampMixin):
    __tablename__ = "departments"

    id          = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name        = Column(String, unique=True, nullable=False)
    description = Column(String, nullable=True)
    manager_id  = Column(String, ForeignKey("users.id"), nullable=True)

    members     = relationship("User", back_populates="department", foreign_keys="User.department_id")
    tasks       = relationship("Task", back_populates="department")
