from sqlalchemy.orm import Session
from app.models.department import Department
from app.repositories.base import BaseRepository
from typing import Optional


class DepartmentRepository(BaseRepository[Department]):
    def __init__(self, db: Session):
        super().__init__(Department, db)

    def get_by_name(self, name: str) -> Optional[Department]:
        return self.db.query(Department).filter(Department.name == name).first()
