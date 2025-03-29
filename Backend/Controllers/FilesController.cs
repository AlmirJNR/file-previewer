using System.Net.Mime;
using System.Web;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class FilesController : ControllerBase
{
    private readonly ILogger<FilesController> _logger;

    public FilesController(ILogger<FilesController> logger)
    {
        _logger = logger;
    }

    [HttpGet("{filePathUrlEncoded}")]
    public ActionResult Get(string filePathUrlEncoded)
    {
        var filePath = HttpUtility.UrlDecode(filePathUrlEncoded);
        if (!System.IO.File.Exists(filePath))
        {
            return NotFound("File not found");
        }

        var fileInfo = new FileInfo(filePath);
        var fileBytes = System.IO.File.ReadAllBytes(filePath);
        var applicationType = fileInfo.Extension switch
        {
            ".pdf" => MediaTypeNames.Application.Pdf,
            _ => null
        };
        if (applicationType is null)
        {
            return new UnsupportedMediaTypeResult();
        }

        return File(fileBytes, applicationType);
    }
}