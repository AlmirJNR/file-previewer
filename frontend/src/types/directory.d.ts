import {IDirectoryFile} from "./directoryFile";

export interface IDirectory {
    id: string;
    parentId?: string;
    name: string;
    hasFiles: boolean;
    pdfFiles: IDirectoryFile[]
}