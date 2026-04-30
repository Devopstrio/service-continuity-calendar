from fastapi import APIRouter
from app.api.v1.endpoints import (
    auth, events, conflicts, impact, audit
)

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(events.router, prefix="/events", tags=["events"])
api_router.include_router(conflicts.router, prefix="/conflicts", tags=["conflicts"])
api_router.include_router(impact.router, prefix="/impact", tags=["impact"])
api_router.include_router(audit.router, prefix="/audit", tags=["audit"])
