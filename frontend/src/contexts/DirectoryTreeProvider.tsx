import {PropsWithChildren, useMemo, useState} from "react";
import {IDirectoryTree} from "@/types/directory";
import {DirectoryTreeContext, IDirectoryTreeContext} from "@/contexts/directoryTreeContext.ts";

function DirectoryTreeProvider({children}: PropsWithChildren) {
    const [directoryTree, setDirectoryTree] = useState<IDirectoryTree | null>(null);
    const [isLoadingDirectoryTree, setIsLoadingDirectoryTree] = useState(true);

    const directoriesContextValue = useMemo<IDirectoryTreeContext>(() => {
        return {
            directoryTree,
            setDirectoryTree,
            isLoadingDirectoryTree,
            setIsLoadingDirectoryTree
        }
    }, [directoryTree, isLoadingDirectoryTree]);

    return <DirectoryTreeContext value={directoriesContextValue}>{children}</DirectoryTreeContext>
}

export default DirectoryTreeProvider;