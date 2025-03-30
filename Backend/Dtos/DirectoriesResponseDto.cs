namespace Backend.Dtos;

public class DirectoriesResponseDto
{
    public required string Id { get; init; }
    public string? ParentId { get; init; }
    public required string Name { get; init; }
    public required bool HasFiles { get; init; }
    public required DirectoryFileDto[] PdfFiles { get; init; }
}