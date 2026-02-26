from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.core.permissions import require_roles, UserRole
from app.services.report_service import ReportService

router = APIRouter()


@router.get("/org")
def org_report(db: Session = Depends(get_db),
               _=Depends(require_roles(UserRole.DIRECTOR, UserRole.SUPER_ADMIN))):
    return ReportService(db).generate_org_report()
