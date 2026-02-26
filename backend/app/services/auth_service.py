from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.repositories.user_repo import UserRepository
from app.core.security import verify_password, create_access_token, create_refresh_token


class AuthService:
    def __init__(self, db: Session):
        self.repo = UserRepository(db)

    def login(self, email: str, password: str) -> dict:
        user = self.repo.get_by_email(email)
        if not user or not verify_password(password, user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password",
            )
        if not user.is_active:
            raise HTTPException(status_code=400, detail="Account is inactive")

        token_data = {"sub": user.id, "role": user.role}
        return {
            "access_token":  create_access_token(token_data),
            "refresh_token": create_refresh_token(token_data),
            "token_type":    "bearer",
        }
