import {createContext} from "react";
import {IDirectory} from "@/types/directory";

interface IDirectoriesContext {
    directories: IDirectory[];
    setDirectories: (directories: IDirectory[]) => void;
}

export const DirectoriesContext = createContext<IDirectoriesContext | null>(null);

export type {IDirectoriesContext};
