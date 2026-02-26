from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.repositories.user_repo import UserRepository
from app.models.user import User
from app.core.security import hash_password
from app.schemas.user import UserCreate, UserUpdate


class UserService:
    def __init__(self, db: Session):
        self.repo = UserRepository(db)

    def create_user(self, data: UserCreate) -> User:
        if self.repo.get_by_email(data.email):
            raise HTTPException(status_code=400, detail="Email already registered")
        user = User(
            email=data.email,
            full_name=data.full_name,
            hashed_password=hash_password(data.password),
            role=data.role,
            department_id=data.department_id,
            position=data.position,
        )
        return self.repo.create(user)

    def update_user(self, user_id: str, data: UserUpdate) -> User:
        user = self.repo.get_by_id(user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        for field, value in data.model_dump(exclude_none=True).items():
            setattr(user, field, value)
        self.repo.db.commit()
        self.repo.db.refresh(user)
        return user
