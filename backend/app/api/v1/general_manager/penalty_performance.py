from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.core.permissions import require_roles, UserRole
from app.services.penalty_service import PenaltyService

router = APIRouter()


@router.get("/")
def get_pending_penalties(db: Session = Depends(get_db),
                          _=Depends(require_roles(UserRole.GENERAL_MANAGER, UserRole.SUPER_ADMIN))):
    from app.repositories.penalty_repo import PenaltyRepository
    return PenaltyRepository(db).get_by_severity("Medium")


@router.put("/{penalty_id}/approve")
def approve_penalty(penalty_id: str, notes: str = "",
                    db: Session = Depends(get_db),
                    current_user=Depends(require_roles(UserRole.GENERAL_MANAGER, UserRole.SUPER_ADMIN))):
    return PenaltyService(db).approve_penalty(penalty_id, current_user.id, notes)
