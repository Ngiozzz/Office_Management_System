import uuid
from sqlalchemy import Column, String, Enum, Integer, ForeignKey, Text, Boolean
from sqlalchemy.orm import relationship
from app.db.base import Base, TimestampMixin


class Penalty(Base, TimestampMixin):
    __tablename__ = "penalties"

    id              = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    employee_id     = Column(String, ForeignKey("users.id"), nullable=False)
    issued_by_id    = Column(String, ForeignKey("users.id"), nullable=False)
    reason          = Column(String, nullable=False)
    description     = Column(Text, nullable=True)
    severity        = Column(Enum("Low", "Medium", "High", name="penalty_severity"), nullable=False)
    points_deducted = Column(Integer, nullable=False)
    status          = Column(
        Enum("Active", "Pending Approval", "Under Review", "Resolved", "Rejected", name="penalty_status"),
        default="Active",
    )
    requires_approval = Column(Boolean, default=False)
    approved_by_id  = Column(String, ForeignKey("users.id"), nullable=True)
    approval_notes  = Column(Text, nullable=True)

    employee    = relationship("User", foreign_keys=[employee_id],  back_populates="penalties_received")
    issued_by   = relationship("User", foreign_keys=[issued_by_id], back_populates="penalties_issued")
    approved_by = relationship("User", foreign_keys=[approved_by_id])
