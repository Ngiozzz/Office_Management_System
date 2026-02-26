from fastapi import APIRouter
from app.api.v1.super_admin import users, system_settings, audit_logs, dashboard

router = APIRouter()
router.include_router(dashboard.router,        prefix="/dashboard")
router.include_router(users.router,            prefix="/users")
router.include_router(system_settings.router,  prefix="/settings")
router.include_router(audit_logs.router,       prefix="/audit-logs")
