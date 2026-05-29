using Kintsugi.Web.Models;
using Kintsugi.Tests.Fakes;

namespace Kintsugi.Tests.Services;

public class ItemRepositoryTests
{
    private readonly FakeItemRepository _repo = new();

    [Fact]
    public async Task AddAsync_assigns_id_and_creates_item()
    {
        var item = new Item { Title = "Test item" };

        await _repo.AddAsync(item);

        Assert.NotEqual(0, item.Id);
        var saved = await _repo.GetByIdAsync(item.Id);
        Assert.NotNull(saved);
        Assert.Equal("Test item", saved.Title);
    }

    [Fact]
    public async Task GetAllAsync_returns_items_in_order()
    {
        await _repo.AddAsync(new Item { Title = "First" });
        await _repo.AddAsync(new Item { Title = "Second" });

        var items = await _repo.GetAllAsync();

        Assert.Equal(2, items.Count);
        Assert.Equal("First", items[0].Title);
    }

    [Fact]
    public async Task DeleteAsync_removes_item()
    {
        await _repo.AddAsync(new Item { Title = "To delete" });
        var items = await _repo.GetAllAsync();
        var id = items[0].Id;

        await _repo.DeleteAsync(id);

        Assert.Null(await _repo.GetByIdAsync(id));
        Assert.Empty(await _repo.GetAllAsync());
    }
}
