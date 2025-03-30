import {createContext} from "react";
import {HubConnection} from "@microsoft/signalr";
import {buildFileSystemHub} from "@/services/fileSystemHubService.ts";

interface IFileSystemHubContext {
    fileSystemHub: HubConnection;
}

export const FileSystemHubContext = createContext<IFileSystemHubContext>({
    fileSystemHub: buildFileSystemHub()
});