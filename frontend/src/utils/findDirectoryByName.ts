import { IDirectoryTree } from '@/types/directory';

function findDirectoryByName(directoryTree: IDirectoryTree, name: string): IDirectoryTree | null {
    if (directoryTree.directory.name === name) {
        return directoryTree;
    }

    const target = directoryTree.directories.find(x => !!findDirectoryByName(x, name));
    if (!target) {
        return null;
    }

    return target;
}

export { findDirectoryByName };
