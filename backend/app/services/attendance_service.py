from sqlalchemy.orm import Session
from fastapi import HTTPException
from datetime import datetime, timezone
from app.repositories.attendance_repo import AttendanceRepository
from app.models.attendance import Attendance


class AttendanceService:
    def __init__(self, db: Session):
        self.repo = AttendanceRepository(db)

    def check_in(self, user_id: str, date: str) -> Attendance:
        existing = self.repo.get_by_user_and_date(user_id, date)
        if existing:
            raise HTTPException(status_code=400, detail="Already checked in today")
        record = Attendance(user_id=user_id, date=date, check_in=datetime.now(timezone.utc))
        return self.repo.create(record)

    def check_out(self, user_id: str, date: str) -> Attendance:
        record = self.repo.get_by_user_and_date(user_id, date)
        if not record or not record.check_in:
            raise HTTPException(status_code=400, detail="No check-in found for today")
        record.check_out    = datetime.now(timezone.utc)
        record.hours_worked = round(
            (record.check_out - record.check_in).seconds / 3600, 2
        )
        self.repo.db.commit()
        self.repo.db.refresh(record)
        return record
