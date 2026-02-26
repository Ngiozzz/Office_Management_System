import uuid
from sqlalchemy import Column, String, Enum, ForeignKey, Text, Integer
from sqlalchemy.orm import relationship
from app.db.base import Base, TimestampMixin


class Task(Base, TimestampMixin):
    __tablename__ = "tasks"

    id            = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    title         = Column(String, nullable=False)
    description   = Column(Text, nullable=True)
    category      = Column(String, nullable=True)
    priority      = Column(Enum("Low", "Medium", "High", name="task_priority"), default="Medium")
    status        = Column(
        Enum("Pending", "In Progress", "Completed", name="task_status"),
        default="Pending",
    )
    due_date      = Column(String, nullable=True)
    estimated_hours = Column(Integer, nullable=True)

    assignee_id   = Column(String, ForeignKey("users.id"), nullable=True)
    creator_id    = Column(String, ForeignKey("users.id"), nullable=False)
    department_id = Column(String, ForeignKey("departments.id"), nullable=True)

    assignee      = relationship("User", foreign_keys=[assignee_id], back_populates="assigned_tasks")
    creator       = relationship("User", foreign_keys=[creator_id],  back_populates="created_tasks")
    department    = relationship("Department", back_populates="tasks")
