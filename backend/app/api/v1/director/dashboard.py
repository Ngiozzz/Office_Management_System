from fastapi import APIRouter, Depends
from app.core.permissions import require_roles, UserRole

router = APIRouter()


@router.get("/stats")
def get_stats(_=Depends(require_roles(UserRole.DIRECTOR, UserRole.SUPER_ADMIN))):
    return {"org_tasks": 0, "workforce": 0, "penalties": 0}
