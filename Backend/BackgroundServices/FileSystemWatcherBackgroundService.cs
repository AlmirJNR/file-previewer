using Backend.Hubs;
using Backend.Services;
using Microsoft.AspNetCore.SignalR;

namespace Backend.BackgroundServices;

public class FileSystemWatcherBackgroundService : BackgroundService
{
    private readonly DirectoryService _directoryService;
    private readonly IHubContext<FileSystemHub, IFileSystemHubMessages> _hubContext;

    private FileSystemWatcher? _fileWatcher;

    public FileSystemWatcherBackgroundService(
        DirectoryService directoryService,
        IHubContext<FileSystemHub, IFileSystemHubMessages> hubContext
    )
    {
        _directoryService = directoryService;
        _hubContext = hubContext;
    }

    private void OnChanged(object sender, FileSystemEventArgs e)
    {
        _hubContext.Clients.All.Changed();
    }

    protected override Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _fileWatcher = new FileSystemWatcher(_directoryService.ContentDirectory)
        {
            NotifyFilter = NotifyFilters.LastWrite | NotifyFilters.FileName | NotifyFilters.DirectoryName,
            IncludeSubdirectories = true
        };

        _fileWatcher.Changed += OnChanged;
        _fileWatcher.Created += OnChanged;
        _fileWatcher.Deleted += OnChanged;
        _fileWatcher.Renamed += OnChanged;

        _fileWatcher.EnableRaisingEvents = true;
        return Task.CompletedTask;
    }

    public override Task StopAsync(CancellationToken cancellationToken)
    {
        _fileWatcher?.Dispose();
        return base.StopAsync(cancellationToken);
    }
}