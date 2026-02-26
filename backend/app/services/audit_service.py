from sqlalchemy.orm import Session
from app.models.audit_log import AuditLog
from app.repositories.audit_log_repo import AuditLogRepository


class AuditService:
    def __init__(self, db: Session):
        self.repo = AuditLogRepository(db)

    def log(self, user_id: str, action: str, resource: str = None,
            resource_id: str = None, detail: str = None, ip: str = None):
        entry = AuditLog(
            user_id=user_id, action=action, resource=resource,
            resource_id=resource_id, detail=detail, ip_address=ip,
        )
        self.repo.create(entry)
