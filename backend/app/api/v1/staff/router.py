from fastapi import APIRouter
from app.api.v1.staff import dashboard, my_tasks, my_penalties, attendance

router = APIRouter()
router.include_router(dashboard.router,     prefix="/dashboard")
router.include_router(my_tasks.router,      prefix="/tasks")
router.include_router(my_penalties.router,  prefix="/penalties")
router.include_router(attendance.router,    prefix="/attendance")
