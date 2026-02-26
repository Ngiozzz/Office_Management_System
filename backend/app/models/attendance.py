import uuid
from sqlalchemy import Column, String, ForeignKey, DateTime, Float
from sqlalchemy.orm import relationship
from app.db.base import Base, TimestampMixin


class Attendance(Base, TimestampMixin):
    __tablename__ = "attendance"

    id          = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id     = Column(String, ForeignKey("users.id"), nullable=False)
    check_in    = Column(DateTime, nullable=True)
    check_out   = Column(DateTime, nullable=True)
    hours_worked = Column(Float, nullable=True)
    status      = Column(
        Enum("Present", "Late", "Absent", name="attendance_status"),
        default="Present",
    )
    date        = Column(String, nullable=False)  # YYYY-MM-DD

    user        = relationship("User", back_populates="attendance_records")
