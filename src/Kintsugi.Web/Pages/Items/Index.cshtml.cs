using Kintsugi.Web.Models;
using Kintsugi.Web.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Kintsugi.Web.Pages.Items;

public class IndexModel(IItemRepository repo) : PageModel
{
    public IReadOnlyList<Item> Items { get; set; } = [];

    public async Task OnGetAsync()
    {
        Items = await repo.GetAllAsync();
    }

    public async Task<PartialViewResult> OnPostCreateAsync(string title)
    {
        await repo.AddAsync(new Item { Title = title });
        Items = await repo.GetAllAsync();
        return Partial("_ItemList", Items);
    }

    public async Task<PartialViewResult> OnPostToggleCompleteAsync(int id)
    {
        var item = await repo.GetByIdAsync(id);
        if (item is not null)
        {
            item.IsComplete = !item.IsComplete;
            await repo.UpdateAsync(item);
        }
        Items = await repo.GetAllAsync();
        return Partial("_ItemList", Items);
    }

    public async Task<PartialViewResult> OnPostDeleteAsync(int id)
    {
        await repo.DeleteAsync(id);
        Items = await repo.GetAllAsync();
        return Partial("_ItemList", Items);
    }
}
