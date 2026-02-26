from sqlalchemy.orm import Session
from app.models.attendance import Attendance
from app.repositories.base import BaseRepository


class AttendanceRepository(BaseRepository[Attendance]):
    def __init__(self, db: Session):
        super().__init__(Attendance, db)

    def get_by_user_and_date(self, user_id: str, date: str):
        return (
            self.db.query(Attendance)
            .filter(Attendance.user_id == user_id, Attendance.date == date)
            .first()
        )

    def get_by_date(self, date: str):
        return self.db.query(Attendance).filter(Attendance.date == date).all()
