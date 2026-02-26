from fastapi import APIRouter, Depends
from app.core.permissions import require_roles, UserRole

router = APIRouter()


@router.get("/stats")
def get_stats(current_user=Depends(require_roles(UserRole.STAFF, UserRole.SUPER_ADMIN))):
    return {
        "compliance_points": current_user.compliance_points,
        "tasks_assigned":    0,
        "tasks_completed":   0,
    }
