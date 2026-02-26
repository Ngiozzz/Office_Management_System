from pydantic import BaseModel
from typing import List


class DepartmentStat(BaseModel):
    department: str
    total_tasks: int
    completed: int
    pending: int
    in_progress: int


class WorkforceStat(BaseModel):
    total_employees: int
    present_today: int
    on_leave: int
    avg_compliance_points: float


class PenaltyStat(BaseModel):
    department: str
    penalties: int
    resolved: int
    active: int
