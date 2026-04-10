import {use} from "react";
import {DirectoriesContext} from "@/contexts/directoriesContext.ts";

function useDirectoriesContext() {
    const context = use(DirectoriesContext);
    if (!context) {
        throw new Error('useDirectories hook used without DirectoriesContext!');
    }

    return context;
}

export { useDirectoriesContext };