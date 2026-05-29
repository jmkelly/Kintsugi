using Kintsugi.Web.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Kintsugi.Web.Features.Items;

public class IndexModel(AppDbContext db) : PageModel
{
    public IReadOnlyList<Item> Items { get; set; } = [];

    public async Task OnGetAsync()
    {
        Items = await db.GetAllItemsAsync();
    }

    public async Task<PartialViewResult> OnPostCreateAsync(string title)
    {
        db.Items.Add(new Item(title));
        await db.SaveChangesAsync();
        Items = await db.GetAllItemsAsync();
        return Partial("_ItemList", Items);
    }

    public async Task<PartialViewResult> OnPostToggleCompleteAsync(int id)
    {
        var item = await db.FindItemByIdAsync(id);
        if (item is not null)
        {
            item.Toggle();
            await db.SaveChangesAsync();
        }
        Items = await db.GetAllItemsAsync();
        return Partial("_ItemList", Items);
    }

    public async Task<PartialViewResult> OnPostDeleteAsync(int id)
    {
        await db.DeleteItemAsync(id);
        Items = await db.GetAllItemsAsync();
        return Partial("_ItemList", Items);
    }
}
