from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.dependencies import get_current_user
from app.schemas.task import TaskCreate, TaskRead
from app.services.task_service import TaskService

router = APIRouter()


@router.post("/", response_model=TaskRead)
def create_task(payload: TaskCreate, db: Session = Depends(get_db),
                current_user=Depends(get_current_user)):
    """Shared create-task endpoint accessible by all roles."""
    return TaskService(db).create_task(payload, current_user.id)
