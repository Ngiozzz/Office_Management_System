from pydantic import BaseModel
from typing import Optional


class DepartmentCreate(BaseModel):
    name: str
    description: Optional[str] = None
    manager_id: Optional[str] = None


class DepartmentRead(BaseModel):
    id: str
    name: str
    description: Optional[str]
    manager_id: Optional[str]

    class Config:
        from_attributes = True
