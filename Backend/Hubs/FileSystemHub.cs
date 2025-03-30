using Microsoft.AspNetCore.SignalR;

namespace Backend.Hubs;

public interface IFileSystemHubMessages
{
    public Task Changed();
}

public class FileSystemHub : Hub<IFileSystemHubMessages>
{
    public Task NotifyChanged()
    {
        return Clients.All.Changed();
    }
}