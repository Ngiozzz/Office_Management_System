from sqlalchemy.orm import Session
from app.models.penalty import Penalty
from app.repositories.base import BaseRepository


class PenaltyRepository(BaseRepository[Penalty]):
    def __init__(self, db: Session):
        super().__init__(Penalty, db)

    def get_by_employee(self, employee_id: str):
        return self.db.query(Penalty).filter(Penalty.employee_id == employee_id).all()

    def get_pending_approval(self):
        return self.db.query(Penalty).filter(Penalty.status == "Pending Approval").all()

    def get_by_severity(self, severity: str):
        return self.db.query(Penalty).filter(Penalty.severity == severity).all()
