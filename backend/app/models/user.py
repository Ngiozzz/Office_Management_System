import uuid
from sqlalchemy import Column, String, Boolean, Enum, ForeignKey, Integer
from sqlalchemy.orm import relationship
from app.db.base import Base, TimestampMixin


class User(Base, TimestampMixin):
    __tablename__ = "users"

    id                = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    email             = Column(String, unique=True, nullable=False, index=True)
    full_name         = Column(String, nullable=False)
    hashed_password   = Column(String, nullable=False)
    role              = Column(
        Enum("super-admin", "director", "general-manager", "line-manager", "staff", name="user_role"),
        nullable=False,
    )
    department_id     = Column(String, ForeignKey("departments.id"), nullable=True)
    position          = Column(String, nullable=True)
    compliance_points = Column(Integer, default=1000, nullable=False)
    is_active         = Column(Boolean, default=True)

    # Relationships
    department        = relationship("Department", back_populates="members")
    assigned_tasks    = relationship("Task", foreign_keys="Task.assignee_id", back_populates="assignee")
    created_tasks     = relationship("Task", foreign_keys="Task.creator_id",  back_populates="creator")
    penalties_received = relationship("Penalty", foreign_keys="Penalty.employee_id", back_populates="employee")
    penalties_issued  = relationship("Penalty", foreign_keys="Penalty.issued_by_id", back_populates="issued_by")
    attendance_records = relationship("Attendance", back_populates="user")
