using Backend.Dtos;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class DirectoriesController : ControllerBase
{
    private readonly ILogger<DirectoriesController> _logger;
    private readonly DirectoryService _directoryService;

    public DirectoriesController(ILogger<DirectoriesController> logger, DirectoryService directoryService)
    {
        _logger = logger;
        _directoryService = directoryService;
    }

    [HttpGet]
    public ActionResult<IOrderedEnumerable<DirectoriesResponseDto>> Get()
    {
        var directories = _directoryService.GetContentDirectories();
        var response = new List<DirectoriesResponseDto>();
        foreach (var directory in directories)
        {
            var directoryInfo = new DirectoryInfo(directory);
            var directoryName = directoryInfo.Name;

            var pdfFilesPaths = Directory.GetFiles(directory, "*.pdf", SearchOption.TopDirectoryOnly)
                .OrderBy(x => x)
                .ToArray();

            var pdfFiles = new List<DirectoryFileDto>();
            foreach (var pdfFile in pdfFilesPaths)
            {
                var fileInfo = new FileInfo(pdfFile);
                pdfFiles.Add(new DirectoryFileDto
                {
                    Path = fileInfo.FullName,
                    Name = fileInfo.Name
                });
            }

            var isContentDirectory = directory == _directoryService.ContentDirectory;
            response.Add(new DirectoriesResponseDto
            {
                Id = directory,
                ParentId = isContentDirectory ? null : directoryInfo.Parent?.FullName,
                Name = directoryName,
                HasFiles = pdfFiles.Count != 0,
                PdfFiles = pdfFiles.ToArray()
            });
        }

        var orderedDirectories = response.OrderBy(x => x.Id);
        return Ok(orderedDirectories);
    }
}