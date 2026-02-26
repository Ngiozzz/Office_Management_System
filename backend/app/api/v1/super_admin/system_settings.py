from fastapi import APIRouter, Depends
from app.core.permissions import require_roles, UserRole

router = APIRouter()


@router.get("/")
def get_settings(_=Depends(require_roles(UserRole.SUPER_ADMIN))):
    # TODO: fetch from SystemSettings table
    return []


@router.put("/{key}")
def update_setting(key: str, value: str, _=Depends(require_roles(UserRole.SUPER_ADMIN))):
    # TODO: update SystemSettings
    return {"key": key, "value": value}
