from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.core.permissions import require_roles, UserRole

router = APIRouter()


@router.get("/")
def get_org_tasks(db: Session = Depends(get_db),
                  _=Depends(require_roles(UserRole.DIRECTOR, UserRole.SUPER_ADMIN))):
    from app.repositories.task_repo import TaskRepository
    return TaskRepository(db).get_all()
