from pydantic import BaseModel
from typing import Optional


class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    category: Optional[str] = None
    priority: str = "Medium"
    due_date: Optional[str] = None
    estimated_hours: Optional[int] = None
    assignee_id: Optional[str] = None
    department_id: Optional[str] = None


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    status: Optional[str] = None
    priority: Optional[str] = None
    due_date: Optional[str] = None
    assignee_id: Optional[str] = None


class TaskRead(BaseModel):
    id: str
    title: str
    description: Optional[str]
    category: Optional[str]
    priority: str
    status: str
    due_date: Optional[str]
    assignee_id: Optional[str]
    creator_id: str
    department_id: Optional[str]

    class Config:
        from_attributes = True
