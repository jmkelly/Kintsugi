using Kintsugi.Web.Data;
using Microsoft.EntityFrameworkCore;

namespace Kintsugi.Web.Features.Items;

public static class ItemExtensions
{
    public static async Task<IReadOnlyList<Item>> GetAllItemsAsync(this AppDbContext db)
        => await db.Items.OrderBy(i => i.CreatedAt).ToListAsync();

    public static async Task<Item?> FindItemByIdAsync(this AppDbContext db, int id)
        => await db.Items.FindAsync([id]);

    public static async Task DeleteItemAsync(this AppDbContext db, int id)
    {
        var item = await db.Items.FindAsync(id);
        if (item is not null)
        {
            db.Items.Remove(item);
            await db.SaveChangesAsync();
        }
    }
}
