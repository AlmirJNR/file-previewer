namespace Backend.Services;

public class DirectoryService
{
    public string ContentDirectory { get; }

    public DirectoryService()
    {
        var currentDirectory = Directory.GetCurrentDirectory();
        ContentDirectory = Path.Combine(currentDirectory, "Content");
        if (!Path.Exists(ContentDirectory))
        {
            Directory.CreateDirectory(ContentDirectory);
        }
    }

    public string[] GetContentDirectories()
    {
        return Directory.GetDirectories(ContentDirectory, "*", SearchOption.AllDirectories);
    }
}