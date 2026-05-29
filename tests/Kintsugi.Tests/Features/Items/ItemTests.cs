using Kintsugi.Web.Data;
using Kintsugi.Web.Features.Items;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;

namespace Kintsugi.Tests.Features.Items;

public class ItemTests : IDisposable
{
    private readonly SqliteConnection _connection;
    private readonly AppDbContext _db;

    public ItemTests()
    {
        _connection = new SqliteConnection("DataSource=:memory:");
        _connection.Open();

        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseSqlite(_connection)
            .Options;

        _db = new AppDbContext(options);
        _db.Database.EnsureCreated();
    }

    [Fact]
    public async Task add_and_save_persists_item()
    {
        var item = new Item("Test item");

        _db.Items.Add(item);
        await _db.SaveChangesAsync();

        Assert.NotEqual(0, item.Id);
        var saved = await _db.FindItemByIdAsync(item.Id);
        Assert.NotNull(saved);
        Assert.Equal("Test item", saved.Title);
    }

    [Fact]
    public async Task get_all_items_returns_in_order()
    {
        _db.Items.AddRange(new Item("A"), new Item("B"));
        await _db.SaveChangesAsync();

        var items = await _db.GetAllItemsAsync();

        Assert.Equal(2, items.Count);
        Assert.Equal("A", items[0].Title);
    }

    [Fact]
    public async Task delete_item_removes_from_database()
    {
        _db.Items.Add(new Item("Delete me"));
        await _db.SaveChangesAsync();
        var id = (await _db.GetAllItemsAsync())[0].Id;

        await _db.DeleteItemAsync(id);

        Assert.Null(await _db.FindItemByIdAsync(id));
        Assert.Empty(await _db.GetAllItemsAsync());
    }

    [Fact]
    public async Task toggle_complete_persists_change()
    {
        _db.Items.Add(new Item("Toggle me"));
        await _db.SaveChangesAsync();
        var item = (await _db.GetAllItemsAsync())[0];

        item.Toggle();
        await _db.SaveChangesAsync();

        var reloaded = await _db.FindItemByIdAsync(item.Id);
        Assert.True(reloaded!.IsComplete);
    }

    public void Dispose()
    {
        _db.Dispose();
        _connection.Close();
    }
}
