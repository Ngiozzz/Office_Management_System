from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.core.permissions import require_roles, UserRole
from app.schemas.penalty import PenaltyRead

router = APIRouter()


@router.get("/", response_model=list[PenaltyRead])
def my_penalties(db: Session = Depends(get_db),
                 current_user=Depends(require_roles(UserRole.STAFF, UserRole.SUPER_ADMIN))):
    from app.repositories.penalty_repo import PenaltyRepository
    return PenaltyRepository(db).get_by_employee(current_user.id)
