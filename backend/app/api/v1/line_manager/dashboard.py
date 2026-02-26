from fastapi import APIRouter, Depends
from app.core.permissions import require_roles, UserRole

router = APIRouter()


@router.get("/stats")
def get_stats(_=Depends(require_roles(UserRole.LINE_MANAGER, UserRole.SUPER_ADMIN))):
    return {"team_size": 0, "tasks_due_today": 0, "present_today": 0}
