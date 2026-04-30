from fastapi import APIRouter, Body
router = APIRouter()
@router.get('/')
def list_events():
    return {'events': [{'id': 'e-1', 'title': 'Patch Cycle Q2', 'start': '2026-05-01T10:00:00', 'duration': 4, 'services': ['auth-service']}]}
@router.post('/create')
def create_event(data: dict = Body(...)):
    return {'status': 'CREATED', 'id': 'e-new'}
@router.post('/update')
def update_event(data: dict = Body(...)):
    return {'status': 'UPDATED'}
