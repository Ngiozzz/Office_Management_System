from fastapi import APIRouter
from app.api.v1.auth.router          import router as auth_router
from app.api.v1.super_admin.router   import router as super_admin_router
from app.api.v1.director.router      import router as director_router
from app.api.v1.general_manager.router import router as gm_router
from app.api.v1.line_manager.router  import router as lm_router
from app.api.v1.staff.router         import router as staff_router
from app.api.v1.shared.profile       import router as profile_router

api_router = APIRouter()

api_router.include_router(auth_router,         prefix="/auth",            tags=["Auth"])
api_router.include_router(super_admin_router,  prefix="/super-admin",     tags=["Super Admin"])
api_router.include_router(director_router,     prefix="/director",        tags=["Director"])
api_router.include_router(gm_router,           prefix="/general-manager", tags=["General Manager"])
api_router.include_router(lm_router,           prefix="/line-manager",    tags=["Line Manager"])
api_router.include_router(staff_router,        prefix="/staff",           tags=["Staff"])
api_router.include_router(profile_router,      prefix="/profile",         tags=["Shared"])
