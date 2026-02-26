from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.core.permissions import require_roles, UserRole
from app.schemas.attendance import AttendanceRead
from app.services.attendance_service import AttendanceService
from app.utils.date_utils import today_str

router = APIRouter()


@router.post("/checkin", response_model=AttendanceRead)
def check_in(db: Session = Depends(get_db),
             current_user=Depends(require_roles(UserRole.STAFF, UserRole.LINE_MANAGER,
                                                UserRole.GENERAL_MANAGER, UserRole.SUPER_ADMIN))):
    return AttendanceService(db).check_in(current_user.id, today_str())


@router.post("/checkout", response_model=AttendanceRead)
def check_out(db: Session = Depends(get_db),
              current_user=Depends(require_roles(UserRole.STAFF, UserRole.LINE_MANAGER,
                                                 UserRole.GENERAL_MANAGER, UserRole.SUPER_ADMIN))):
    return AttendanceService(db).check_out(current_user.id, today_str())
