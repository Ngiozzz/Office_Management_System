from fastapi import APIRouter
from app.api.v1.director import dashboard, organization_tasks, workforce_analytics, penalty_governance, reports

router = APIRouter()
router.include_router(dashboard.router,              prefix="/dashboard")
router.include_router(organization_tasks.router,     prefix="/tasks")
router.include_router(workforce_analytics.router,    prefix="/analytics")
router.include_router(penalty_governance.router,     prefix="/penalties")
router.include_router(reports.router,                prefix="/reports")
