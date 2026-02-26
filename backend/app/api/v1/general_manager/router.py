from fastapi import APIRouter
from app.api.v1.general_manager import dashboard, department_tasks, attendance_analytics, penalty_performance

router = APIRouter()
router.include_router(dashboard.router,              prefix="/dashboard")
router.include_router(department_tasks.router,       prefix="/tasks")
router.include_router(attendance_analytics.router,   prefix="/analytics")
router.include_router(penalty_performance.router,    prefix="/penalties")
