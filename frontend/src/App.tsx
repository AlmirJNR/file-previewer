import {PropsWithChildren, useEffect,  useState} from "react";
import ActionButtons from "@/components/actionButtons/ActionButtons.tsx";
import Loading from "@/components/Loading.tsx";
import {HubConnectionState} from "@microsoft/signalr";
import {getDirectories} from "@/services/directoriesService.ts";
import {useFileSystemHubContext} from "@/hooks/useFileSystemHubContext.ts";
import {useDirectoriesContext} from "@/hooks/useDirectoriesContext.ts";

export default function App({children}: PropsWithChildren) {
    const fileSystemHub = useFileSystemHubContext();
    const {setDirectories} = useDirectoriesContext();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fileSystemHub.on("Changed", async () => {
            const directories = await getDirectories();
            setDirectories(directories);
        });

        setIsLoading(true);

        const startFileSystemHub = fileSystemHub.state === HubConnectionState.Disconnected
            ? fileSystemHub.start()
            : Promise.resolve();

        Promise.all([startFileSystemHub, getDirectories()])
            .then(([, directories]) => {
                setDirectories(directories);
            })
            .catch((err: unknown) => {
                console.error(err);
            })
            .finally(() => {
                setIsLoading(false);
            });

        return () => {
            if (fileSystemHub.state !== HubConnectionState.Connecting && fileSystemHub.state !== HubConnectionState.Reconnecting) {
                void fileSystemHub.stop();
            }
        };
    }, [fileSystemHub, setDirectories]);

    return (
        <div className="m-4 p-4 rounded shadow-lg shadow-gray-200 space-y-4">
            <main>
                {isLoading ? <Loading/> : children}
            </main>

            <ActionButtons/>
        </div>
    );
}