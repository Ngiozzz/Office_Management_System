from pydantic import BaseModel
from typing import Optional


class PenaltyCreate(BaseModel):
    employee_id: str
    reason: str
    description: Optional[str] = None
    severity: str
    points_deducted: int


class PenaltyUpdate(BaseModel):
    status: Optional[str] = None
    approval_notes: Optional[str] = None


class PenaltyRead(BaseModel):
    id: str
    employee_id: str
    issued_by_id: str
    reason: str
    severity: str
    points_deducted: int
    status: str
    requires_approval: bool
    approved_by_id: Optional[str]

    class Config:
        from_attributes = True
