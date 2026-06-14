from aiosqlite import Connection
from fastapi import APIRouter, Depends, Request
from fastapi.responses import HTMLResponse

from src.db import get_db
from src.features.pieces.piece import Piece
from src.features.pieces.repository import (
    find_piece_by_id,
    get_all_pieces,
    register_piece,
    remove_piece,
    save_piece,
)
from src.templates import templates

router = APIRouter()


@router.get("", response_class=HTMLResponse)
async def list_pieces(request: Request, db: Connection = Depends(get_db)):
    pieces = await get_all_pieces(db)
    return templates.TemplateResponse(request, "features/pieces/list.html", {"pieces": pieces})


@router.post("/register", response_class=HTMLResponse)
async def register(request: Request, db: Connection = Depends(get_db)):
    form = await request.form()
    try:
        piece = Piece.describe(form["title"])
    except ValueError:
        return HTMLResponse("", status_code=400)
    await register_piece(db, piece)
    pieces = await get_all_pieces(db)
    return templates.TemplateResponse(request, "features/pieces/_piece_list.html", {"pieces": pieces})


@router.post("/toggle", response_class=HTMLResponse)
async def toggle(request: Request, db: Connection = Depends(get_db)):
    form = await request.form()
    piece_id = int(form["id"])
    piece = await find_piece_by_id(db, piece_id)
    if piece is None:
        return HTMLResponse("", status_code=404)
    piece.toggle()
    await save_piece(db, piece)
    pieces = await get_all_pieces(db)
    return templates.TemplateResponse(request, "features/pieces/_piece_list.html", {"pieces": pieces})


@router.post("/remove", response_class=HTMLResponse)
async def remove(request: Request, db: Connection = Depends(get_db)):
    form = await request.form()
    piece_id = int(form["id"])
    await remove_piece(db, piece_id)
    pieces = await get_all_pieces(db)
    return templates.TemplateResponse(request, "features/pieces/_piece_list.html", {"pieces": pieces})
