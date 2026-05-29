using Kintsugi.Web.Models;

namespace Kintsugi.Web.Services;

public interface IItemRepository
{
    Task<IReadOnlyList<Item>> GetAllAsync();
    Task<Item?> GetByIdAsync(int id);
    Task AddAsync(Item item);
    Task UpdateAsync(Item item);
    Task DeleteAsync(int id);
}
