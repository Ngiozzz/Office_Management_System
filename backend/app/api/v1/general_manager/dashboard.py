from fastapi import APIRouter, Depends
from app.core.permissions import require_roles, UserRole

router = APIRouter()


@router.get("/stats")
def get_stats(_=Depends(require_roles(UserRole.GENERAL_MANAGER, UserRole.SUPER_ADMIN))):
    return {"department_tasks": 0, "attendance_rate": 0, "pending_penalties": 0}
