using Kintsugi.Web.Models;
using Kintsugi.Web.Services;

namespace Kintsugi.Tests.Fakes;

public class FakeItemRepository : IItemRepository
{
    private readonly List<Item> _items = [];
    private int _nextId = 1;

    public Task<IReadOnlyList<Item>> GetAllAsync()
    {
        return Task.FromResult<IReadOnlyList<Item>>(_items.OrderBy(i => i.CreatedAt).ToList());
    }

    public Task<Item?> GetByIdAsync(int id)
    {
        return Task.FromResult(_items.FirstOrDefault(i => i.Id == id));
    }

    public Task AddAsync(Item item)
    {
        item.Id = _nextId++;
        item.CreatedAt = DateTime.UtcNow;
        _items.Add(item);
        return Task.CompletedTask;
    }

    public Task UpdateAsync(Item item)
    {
        var index = _items.FindIndex(i => i.Id == item.Id);
        if (index >= 0)
            _items[index] = item;
        return Task.CompletedTask;
    }

    public Task DeleteAsync(int id)
    {
        _items.RemoveAll(i => i.Id == id);
        return Task.CompletedTask;
    }
}
