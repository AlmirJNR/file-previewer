import { IDirectoryFile } from './directoryFile';

export interface IDirectory {
    id: string;
    parentId?: string;
    name: string;
    isVisible: boolean;
    hasFiles: boolean;
    pdfFiles: IDirectoryFile[];
}

export interface IDirectoryTree {
    directory: IDirectory;
    directories: IDirectoryTree[];
}
