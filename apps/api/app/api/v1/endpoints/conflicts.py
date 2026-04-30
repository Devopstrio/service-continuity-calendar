from fastapi import APIRouter
router = APIRouter()
@router.get('/')
def get_conflicts():
    return {'status': 'ok', 'component': 'conflicts'}
