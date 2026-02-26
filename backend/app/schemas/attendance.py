from pydantic import BaseModel
from typing import Optional


class CheckInRequest(BaseModel):
    date: str  # YYYY-MM-DD


class AttendanceRead(BaseModel):
    id: str
    user_id: str
    date: str
    status: str
    hours_worked: Optional[float]

    class Config:
        from_attributes = True
