from fastapi import APIRouter
from app.api.v1.line_manager import dashboard, team_tasks, attendance, penalties

router = APIRouter()
router.include_router(dashboard.router,   prefix="/dashboard")
router.include_router(team_tasks.router,  prefix="/tasks")
router.include_router(attendance.router,  prefix="/attendance")
router.include_router(penalties.router,   prefix="/penalties")
