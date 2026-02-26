from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.core.permissions import require_roles, UserRole
from app.schemas.user import UserCreate, UserRead
from app.services.user_service import UserService

router = APIRouter()


@router.get("/", response_model=list[UserRead])
def list_users(db: Session = Depends(get_db), _=Depends(require_roles(UserRole.SUPER_ADMIN))):
    from app.repositories.user_repo import UserRepository
    return UserRepository(db).get_all()


@router.post("/", response_model=UserRead)
def create_user(payload: UserCreate, db: Session = Depends(get_db),
                _=Depends(require_roles(UserRole.SUPER_ADMIN))):
    return UserService(db).create_user(payload)
