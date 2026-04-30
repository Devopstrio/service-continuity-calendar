from fastapi import APIRouter
router = APIRouter()
@router.get('/')
def get_impact():
    return {'status': 'ok', 'component': 'impact'}
