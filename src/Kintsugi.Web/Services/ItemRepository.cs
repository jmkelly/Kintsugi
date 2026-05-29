using Kintsugi.Web.Data;
using Kintsugi.Web.Models;
using Microsoft.EntityFrameworkCore;

namespace Kintsugi.Web.Services;

public class ItemRepository(AppDbContext db) : IItemRepository
{
    public async Task<IReadOnlyList<Item>> GetAllAsync()
    {
        return await db.Items.OrderBy(i => i.CreatedAt).ToListAsync();
    }

    public async Task<Item?> GetByIdAsync(int id)
    {
        return await db.Items.FindAsync(id);
    }

    public async Task AddAsync(Item item)
    {
        db.Items.Add(item);
        await db.SaveChangesAsync();
    }

    public async Task UpdateAsync(Item item)
    {
        db.Items.Update(item);
        await db.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        await db.Items.Where(i => i.Id == id).ExecuteDeleteAsync();
    }
}
