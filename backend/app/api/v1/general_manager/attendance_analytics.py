from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.core.permissions import require_roles, UserRole

router = APIRouter()


@router.get("/attendance")
def get_attendance(db: Session = Depends(get_db),
                   _=Depends(require_roles(UserRole.GENERAL_MANAGER, UserRole.SUPER_ADMIN))):
    # TODO: return department attendance stats
    return []
