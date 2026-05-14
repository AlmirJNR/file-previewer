import { createContext } from 'react';
import { IDirectoryTree } from '@/types/directory';

interface IDirectoryTreeContext {
    isLoadingDirectoryTree: boolean;
    setIsLoadingDirectoryTree: (value: boolean) => void;
    directoryTree: IDirectoryTree | null;
    setDirectoryTree: (directoryTree: IDirectoryTree | null) => void;
}

export const DirectoryTreeContext = createContext<IDirectoryTreeContext | null>(null);

export type { IDirectoryTreeContext };
