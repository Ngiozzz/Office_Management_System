from fastapi import APIRouter, Depends
from app.core.permissions import require_roles, UserRole

router = APIRouter()


@router.get("/stats")
def get_dashboard_stats(current_user=Depends(require_roles(UserRole.SUPER_ADMIN))):
    # TODO: return system-wide stats
    return {"users": 0, "active_sessions": 0}
