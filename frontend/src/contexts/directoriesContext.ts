import {createContext, use} from "react";
import {IDirectory} from "@/types/directory";

export interface IDirectoriesContext {
    directories: IDirectory[];
    setDirectories: (directories: IDirectory[]) => void;
}

export const DirectoriesContext = createContext<IDirectoriesContext | null>(null);

export function useDirectories() {
    const context = use(DirectoriesContext);
    if (!context) {
        throw new Error('useDirectories hook used without DirectoriesContext!');
    }

    return context;
}