from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.dependencies import get_current_user
from app.schemas.user import UserRead, UserUpdate
from app.services.user_service import UserService

router = APIRouter()


@router.get("/", response_model=UserRead)
def get_profile(current_user=Depends(get_current_user)):
    return current_user


@router.put("/", response_model=UserRead)
def update_profile(payload: UserUpdate, db: Session = Depends(get_db),
                   current_user=Depends(get_current_user)):
    return UserService(db).update_user(current_user.id, payload)
