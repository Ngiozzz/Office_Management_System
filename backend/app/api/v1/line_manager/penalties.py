from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.core.permissions import require_roles, UserRole
from app.schemas.penalty import PenaltyCreate, PenaltyRead
from app.services.penalty_service import PenaltyService

router = APIRouter()


@router.get("/")
def list_issued_penalties(db: Session = Depends(get_db),
                           current_user=Depends(require_roles(UserRole.LINE_MANAGER, UserRole.SUPER_ADMIN))):
    from app.repositories.penalty_repo import PenaltyRepository
    # Only return penalties issued by this manager
    return [p for p in PenaltyRepository(db).get_all() if p.issued_by_id == current_user.id]


@router.post("/", response_model=PenaltyRead)
def issue_penalty(payload: PenaltyCreate, db: Session = Depends(get_db),
                  current_user=Depends(require_roles(UserRole.LINE_MANAGER, UserRole.SUPER_ADMIN))):
    return PenaltyService(db).issue_penalty(payload, current_user.id)
