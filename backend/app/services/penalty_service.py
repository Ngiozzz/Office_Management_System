from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.repositories.penalty_repo import PenaltyRepository
from app.repositories.user_repo import UserRepository
from app.models.penalty import Penalty
from app.schemas.penalty import PenaltyCreate
from app.core.permissions import PENALTY_APPROVAL_RULES


class PenaltyService:
    def __init__(self, db: Session):
        self.penalty_repo = PenaltyRepository(db)
        self.user_repo    = UserRepository(db)

    def issue_penalty(self, data: PenaltyCreate, issued_by_id: str) -> Penalty:
        employee = self.user_repo.get_by_id(data.employee_id)
        if not employee:
            raise HTTPException(status_code=404, detail="Employee not found")

        requires_approval = data.severity in ("Medium", "High")
        initial_status    = "Pending Approval" if requires_approval else "Active"

        penalty = Penalty(
            **data.model_dump(),
            issued_by_id=issued_by_id,
            requires_approval=requires_approval,
            status=initial_status,
        )

        if not requires_approval:
            employee.compliance_points -= data.points_deducted

        return self.penalty_repo.create(penalty)

    def approve_penalty(self, penalty_id: str, approver_id: str, notes: str = "") -> Penalty:
        penalty = self.penalty_repo.get_by_id(penalty_id)
        if not penalty:
            raise HTTPException(status_code=404, detail="Penalty not found")

        employee = self.user_repo.get_by_id(penalty.employee_id)
        employee.compliance_points -= penalty.points_deducted
        penalty.status          = "Active"
        penalty.approved_by_id  = approver_id
        penalty.approval_notes  = notes
        self.penalty_repo.db.commit()
        return penalty
