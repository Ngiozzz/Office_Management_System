from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.core.permissions import require_roles, UserRole
from app.schemas.task import TaskCreate, TaskRead
from app.services.task_service import TaskService

router = APIRouter()


@router.get("/")
def list_tasks(db: Session = Depends(get_db),
               current_user=Depends(require_roles(UserRole.GENERAL_MANAGER, UserRole.SUPER_ADMIN))):
    from app.repositories.task_repo import TaskRepository
    return TaskRepository(db).get_by_department(current_user.department_id)


@router.post("/", response_model=TaskRead)
def create_task(payload: TaskCreate, db: Session = Depends(get_db),
                current_user=Depends(require_roles(UserRole.GENERAL_MANAGER, UserRole.SUPER_ADMIN))):
    return TaskService(db).create_task(payload, current_user.id)
