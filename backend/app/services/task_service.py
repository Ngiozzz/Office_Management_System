from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.repositories.task_repo import TaskRepository
from app.models.task import Task
from app.schemas.task import TaskCreate, TaskUpdate


class TaskService:
    def __init__(self, db: Session):
        self.repo = TaskRepository(db)

    def create_task(self, data: TaskCreate, creator_id: str) -> Task:
        task = Task(**data.model_dump(), creator_id=creator_id)
        return self.repo.create(task)

    def update_task(self, task_id: str, data: TaskUpdate) -> Task:
        task = self.repo.get_by_id(task_id)
        if not task:
            raise HTTPException(status_code=404, detail="Task not found")
        for field, value in data.model_dump(exclude_none=True).items():
            setattr(task, field, value)
        self.repo.db.commit()
        self.repo.db.refresh(task)
        return task
