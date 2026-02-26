from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.core.permissions import require_roles, UserRole
from app.schemas.task import TaskUpdate, TaskRead
from app.services.task_service import TaskService

router = APIRouter()


@router.get("/")
def my_tasks(db: Session = Depends(get_db),
             current_user=Depends(require_roles(UserRole.STAFF, UserRole.SUPER_ADMIN))):
    from app.repositories.task_repo import TaskRepository
    return TaskRepository(db).get_by_assignee(current_user.id)


@router.put("/{task_id}/status", response_model=TaskRead)
def update_status(task_id: str, payload: TaskUpdate, db: Session = Depends(get_db),
                  _=Depends(require_roles(UserRole.STAFF, UserRole.SUPER_ADMIN))):
    return TaskService(db).update_task(task_id, payload)
