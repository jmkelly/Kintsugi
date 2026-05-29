using Kintsugi.Web.Data;
using Kintsugi.Web.Models;
using Kintsugi.Web.Services;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;

namespace Kintsugi.Tests.Services;

public class ItemRepositoryIntegrationTests : IDisposable
{
    private readonly SqliteConnection _connection;
    private readonly AppDbContext _db;
    private readonly ItemRepository _repo;

    public ItemRepositoryIntegrationTests()
    {
        _connection = new SqliteConnection("DataSource=:memory:");
        _connection.Open();

        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseSqlite(_connection)
            .Options;

        _db = new AppDbContext(options);
        _db.Database.EnsureCreated();
        _repo = new ItemRepository(_db);
    }

    [Fact]
    public async Task AddAsync_persists_item_to_database()
    {
        var item = new Item { Title = "Persisted item" };

        await _repo.AddAsync(item);

        Assert.NotEqual(0, item.Id);
        var fromDb = await _db.Items.FindAsync(item.Id);
        Assert.NotNull(fromDb);
        Assert.Equal("Persisted item", fromDb.Title);
    }

    [Fact]
    public async Task GetAllAsync_returns_all_items()
    {
        await _repo.AddAsync(new Item { Title = "A" });
        await _repo.AddAsync(new Item { Title = "B" });

        var items = await _repo.GetAllAsync();

        Assert.Equal(2, items.Count);
    }

    [Fact]
    public async Task DeleteAsync_removes_item_from_database()
    {
        await _repo.AddAsync(new Item { Title = "Delete me" });
        var items = await _repo.GetAllAsync();

        await _repo.DeleteAsync(items[0].Id);

        Assert.Empty(await _repo.GetAllAsync());
    }

    public void Dispose()
    {
        _db.Dispose();
        _connection.Close();
    }
}
