from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request

WRITE_METHODS = {"POST", "PUT", "PATCH", "DELETE"}


class AuditMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)
        if request.method in WRITE_METHODS and response.status_code < 400:
            # Non-blocking audit log — extend to write to DB via background task
            print(f"[AUDIT] {request.method} {request.url.path} → {response.status_code}")
        return response
