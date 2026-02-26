from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.core.permissions import require_roles, UserRole
from app.utils.date_utils import today_str

router = APIRouter()


@router.get("/today")
def today_attendance(db: Session = Depends(get_db),
                     _=Depends(require_roles(UserRole.LINE_MANAGER, UserRole.SUPER_ADMIN))):
    from app.repositories.attendance_repo import AttendanceRepository
    return AttendanceRepository(db).get_by_date(today_str())
