import { IDirectory, IDirectoryTree } from '@/types/directory';

function buildDirectoryTree(rootDir: IDirectory, allDirectories: IDirectory[]): IDirectoryTree[] {
    return allDirectories
        .filter(x => x.parentId === rootDir.id)
        .map(x => ({ directory: x, directories: buildDirectoryTree(x, allDirectories) }));
}

export async function getDirectoryTree(): Promise<IDirectoryTree> {
    const response = await fetch('http://localhost:5000/api/v1/directories');
    if (!response.ok) {
        throw Error(await response.text());
    }

    const directories = (await response.json()) as IDirectory[];

    const rootDir = directories.find(x => x.name.toLowerCase() === 'content');
    if (!rootDir) {
        throw Error('Missing Content directory');
    }

    return {
        directory: rootDir,
        directories: buildDirectoryTree(rootDir, directories),
    };
}
