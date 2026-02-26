from sqlalchemy.orm import Session
from app.models.task import Task
from app.repositories.base import BaseRepository


class TaskRepository(BaseRepository[Task]):
    def __init__(self, db: Session):
        super().__init__(Task, db)

    def get_by_assignee(self, assignee_id: str):
        return self.db.query(Task).filter(Task.assignee_id == assignee_id).all()

    def get_by_department(self, department_id: str):
        return self.db.query(Task).filter(Task.department_id == department_id).all()

    def get_by_status(self, status: str):
        return self.db.query(Task).filter(Task.status == status).all()
