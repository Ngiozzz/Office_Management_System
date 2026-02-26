from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class AuditLogRead(BaseModel):
    id: str
    user_id: Optional[str]
    action: str
    resource: Optional[str]
    resource_id: Optional[str]
    detail: Optional[str]
    ip_address: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True
