from sqlalchemy.orm import Session
from app.models.audit_log import AuditLog
from app.repositories.base import BaseRepository


class AuditLogRepository(BaseRepository[AuditLog]):
    def __init__(self, db: Session):
        super().__init__(AuditLog, db)

    def get_by_user(self, user_id: str):
        return self.db.query(AuditLog).filter(AuditLog.user_id == user_id).all()

    def get_by_resource(self, resource: str):
        return self.db.query(AuditLog).filter(AuditLog.resource == resource).all()
