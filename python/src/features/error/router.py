from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse

from src.templates import templates

router = APIRouter()


@router.get("/error", response_class=HTMLResponse)
async def error_page(request: Request):
    return templates.TemplateResponse(
        request,
        "features/error/error.html",
        {"code": 404, "message": "Page not found"},
        status_code=404,
    )
