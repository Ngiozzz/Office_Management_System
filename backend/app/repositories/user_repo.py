from sqlalchemy.orm import Session
from app.models.user import User
from app.repositories.base import BaseRepository
from typing import Optional


class UserRepository(BaseRepository[User]):
    def __init__(self, db: Session):
        super().__init__(User, db)

    def get_by_email(self, email: str) -> Optional[User]:
        return self.db.query(User).filter(User.email == email).first()

    def get_by_role(self, role: str):
        return self.db.query(User).filter(User.role == role).all()

    def get_by_department(self, department_id: str):
        return self.db.query(User).filter(User.department_id == department_id).all()
