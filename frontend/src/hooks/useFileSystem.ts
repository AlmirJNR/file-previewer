import {useEffect, useState} from "react";

import {useFileSystemHubContext} from "@/hooks/useFileSystemHubContext.ts";
import {useDirectoryTreeContext} from "@/hooks/useDirectoryTreeContext.ts";
import {getDirectoryTree} from "@/services/directoriesService.ts";
import {HubConnectionState} from "@microsoft/signalr";

function useFileSystem() {
    const fileSystemHub = useFileSystemHubContext();
    const {setDirectoryTree, setIsLoadingDirectoryTree} = useDirectoryTreeContext();
    const [isConnecting, setIsConnecting] = useState(true);

    useEffect(() => {
        fileSystemHub.on("Changed", async () => {
            setIsLoadingDirectoryTree(true);

            try {
                const directoryTree = await getDirectoryTree();
                setDirectoryTree(directoryTree);
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoadingDirectoryTree(false);
            }
        });

        void onEffect();

        return () => {
            if (fileSystemHub.state !== HubConnectionState.Connecting && fileSystemHub.state !== HubConnectionState.Reconnecting) {
                void fileSystemHub.stop();
            }
        };

        async function onEffect() {
            const startFileSystemHub = fileSystemHub.state === HubConnectionState.Disconnected
                ? () => fileSystemHub.start()
                : () => Promise.resolve();

            try {
                const [, directories] = await Promise.all([startFileSystemHub(), getDirectoryTree()]);
                setDirectoryTree(directories);
            } catch (e) {
                console.error(e);
            } finally {
                setIsConnecting(false);
            }
        }
    }, [fileSystemHub, setIsLoadingDirectoryTree, setDirectoryTree]);

    return {
        isConnecting,
    };
}

export {useFileSystem};