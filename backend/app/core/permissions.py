from enum import Enum
from fastapi import Depends, HTTPException, status
from app.dependencies import get_current_user


class UserRole(str, Enum):
    SUPER_ADMIN     = "super-admin"
    DIRECTOR        = "director"
    GENERAL_MANAGER = "general-manager"
    LINE_MANAGER    = "line-manager"
    STAFF           = "staff"


# Penalty severity → minimum approver role
PENALTY_APPROVAL_RULES = {
    "Low":    UserRole.LINE_MANAGER,
    "Medium": UserRole.GENERAL_MANAGER,
    "High":   UserRole.DIRECTOR,
}


def require_roles(*roles: UserRole):
    """FastAPI dependency factory — enforces role-based access."""
    def checker(current_user=Depends(get_current_user)):
        if current_user.role not in [r.value for r in roles]:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access denied. Required: {[r.value for r in roles]}",
            )
        return current_user
    return checker
