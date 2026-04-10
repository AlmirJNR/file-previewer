import {PropsWithChildren, useState} from "react";
import {buildFileSystemHub} from "@/services/fileSystemHubService.ts";
import {FileSystemHubContext} from "@/contexts/fileSystemHubContext.ts";

function FileSystemHubProvider({children}: PropsWithChildren) {
    const [fileSystemHub] = useState(() => buildFileSystemHub());

    return (
        <FileSystemHubContext value={fileSystemHub}>
            {children}
        </FileSystemHubContext>
    );
}

export default FileSystemHubProvider;