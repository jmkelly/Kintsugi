namespace Kintsugi.Web.Features.Items;

public class Item
{
    public int Id { get; set; }
    public string Title { get; private set; }
    public bool IsComplete { get; private set; }
    public DateTime CreatedAt { get; private set; }

    private Item()
    {
        Title = string.Empty;
    }

    public Item(string title) : this()
    {
        SetTitle(title);
        CreatedAt = DateTime.UtcNow;
    }

    public void Toggle()
    {
        IsComplete = !IsComplete;
    }

    public void Rename(string title)
    {
        SetTitle(title);
    }

    private void SetTitle(string title)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(title, nameof(title));
        Title = title;
    }
}
