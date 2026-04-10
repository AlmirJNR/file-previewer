import {PropsWithChildren, useMemo, useState} from "react";
import {IDirectory} from "@/types/directory";
import {DirectoriesContext, IDirectoriesContext} from "@/contexts/directoriesContext.ts";

function DirectoriesProvider({children}: PropsWithChildren) {
    const [directories, setDirectories] = useState<IDirectory[]>([]);

    const directoriesContextValue = useMemo<IDirectoriesContext>(() => {
        return {
            directories: directories,
            setDirectories: setDirectories
        }
    }, [directories]);

    return <DirectoriesContext value={directoriesContextValue}>{children}</DirectoriesContext>
}

export default DirectoriesProvider;