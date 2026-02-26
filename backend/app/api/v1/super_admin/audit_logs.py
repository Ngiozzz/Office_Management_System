from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.core.permissions import require_roles, UserRole
from app.schemas.audit_log import AuditLogRead

router = APIRouter()


@router.get("/", response_model=list[AuditLogRead])
def get_audit_logs(db: Session = Depends(get_db), _=Depends(require_roles(UserRole.SUPER_ADMIN))):
    from app.repositories.audit_log_repo import AuditLogRepository
    return AuditLogRepository(db).get_all()
