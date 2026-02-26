from pydantic import BaseModel, EmailStr
from typing import Optional


class UserCreate(BaseModel):
    email: EmailStr
    full_name: str
    password: str
    role: str
    department_id: Optional[str] = None
    position: Optional[str] = None


class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    position: Optional[str] = None
    department_id: Optional[str] = None
    is_active: Optional[bool] = None


class UserRead(BaseModel):
    id: str
    email: str
    full_name: str
    role: str
    position: Optional[str]
    department_id: Optional[str]
    compliance_points: int
    is_active: bool

    class Config:
        from_attributes = True
