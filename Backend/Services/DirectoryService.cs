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
        var contentDirectories = Directory.GetDirectories(ContentDirectory, "*", SearchOption.AllDirectories);
        return contentDirectories.Append(ContentDirectory)
            .OrderBy(x => x.Length)
            .ToArray();
    }
}