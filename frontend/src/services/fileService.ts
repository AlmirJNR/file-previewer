export function getFile(filePath: string) {
    const urlEncodedFilePath = encodeURIComponent(filePath);
    return `http://localhost:5000/api/v1/files/${urlEncodedFilePath}`;
}