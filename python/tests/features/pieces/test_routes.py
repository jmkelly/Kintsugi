from httpx import AsyncClient


class TestRoutes:
    async def test_home_page(self, client: AsyncClient):
        response = await client.get("/")
        assert response.status_code == 200
        assert "Kintsugi" in response.text

    async def test_pieces_page_empty(self, client: AsyncClient):
        response = await client.get("/pieces")
        assert response.status_code == 200
        assert "No pieces yet" in response.text

    async def test_register_piece(self, client: AsyncClient):
        response = await client.post("/pieces/register", data={"title": "Teacup"})
        assert response.status_code == 200
        assert "Teacup" in response.text

    async def test_register_and_toggle(self, client: AsyncClient):
        await client.post("/pieces/register", data={"title": "Bowl"})
        page = await client.get("/pieces")
        assert "Bowl" in page.text

    async def test_toggle_piece(self, client: AsyncClient):
        await client.post("/pieces/register", data={"title": "Vase"})
        pieces_resp = await client.get("/pieces")
        import re
        match = re.search(r"hx-vals='{\"id\": (\d+)}'", pieces_resp.text)
        assert match, "Could not find piece id in page"
        piece_id = match.group(1)

        toggle_resp = await client.post("/pieces/toggle", data={"id": piece_id})
        assert toggle_resp.status_code == 200

    async def test_remove_piece(self, client: AsyncClient):
        await client.post("/pieces/register", data={"title": "Cup"})
        pieces_resp = await client.get("/pieces")
        import re
        match = re.search(r"hx-vals='{\"id\": (\d+)}'", pieces_resp.text)
        assert match
        piece_id = match.group(1)

        remove_resp = await client.post("/pieces/remove", data={"id": piece_id})
        assert remove_resp.status_code == 200
        assert "No pieces yet" in remove_resp.text

    async def test_error_page(self, client: AsyncClient):
        response = await client.get("/error")
        assert response.status_code == 404
        assert "404" in response.text

    async def test_register_empty_title(self, client: AsyncClient):
        response = await client.post("/pieces/register", data={"title": ""})
        assert response.status_code == 400
