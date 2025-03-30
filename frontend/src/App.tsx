import {use, useEffect, useMemo, useState} from "react";
import {Outlet} from "react-router";
import ActionButtons from "@/components/actionButtons";
import {IDirectoriesContext, DirectoriesContext} from "@/contexts/directoriesContext.ts";
import Loading from "@/components/Loading.tsx";
import {HubConnectionState} from "@microsoft/signalr";
import {getDirectories} from "@/services/directoriesService.ts";
import {IDirectory} from "@/types/directory";
import {sessionGetItem, sessionSetItem} from "@/services/storeService.ts";
import {FileSystemHubContext} from "@/contexts/fileSystemHubContext.ts";

export default function App() {
    const {fileSystemHub} = use(FileSystemHubContext);
    const [title, setTitle] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [directories, setDirectories] = useState<IDirectory[]>([]);

    const directoriesContextValue = useMemo<IDirectoriesContext>(() => {
        return {
            directories: directories,
            setDirectories: setDirectories
        }
    }, [directories]);

    useEffect(() => {
        const title = sessionGetItem<string>('title');
        setTitle(title ?? '');

        fileSystemHub.on("Changed", async () => {
            const directories = await getDirectories();
            setDirectories(directories);
        });

        setIsLoading(true);

        const startFileSystemHub = fileSystemHub.state === HubConnectionState.Disconnected
            ? fileSystemHub.start()
            : Promise.resolve();

        Promise.all([startFileSystemHub, getDirectories()])
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .then(([_, directories]) => {
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
    }, [fileSystemHub]);

    return (
        <div className="m-4 p-4 rounded shadow-lg shadow-gray-200 space-y-4">
            <header>
                <input
                    type="text"
                    placeholder="insira um título"
                    value={title}
                    onChange={(e) => {
                        const value = e.target.value;
                        sessionSetItem('title', value);
                        setTitle(value);
                    }}
                    onKeyUp={(e) => {
                        if (e.key !== 'Enter') {
                            return;
                        }

                        const target = e.target as HTMLInputElement;
                        target.blur();
                    }}
                    className="w-full text-center text-xl uppercase hover:outline-2 focus:outline-2 outline-cyan-800 rounded"
                />
            </header>

            <main>
                <DirectoriesContext value={directoriesContextValue}>
                    {isLoading ? <Loading/> : <Outlet/>}
                </DirectoriesContext>
            </main>

            <ActionButtons/>
        </div>
    );
}