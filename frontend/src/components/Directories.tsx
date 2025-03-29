import {useEffect, useState} from 'react'
import {IDirectory} from "@/types/directory";
import {getDirectories} from "@/services/directoriesService.ts";
import {localSetItem} from "@/services/storeService.ts";
import {FaFolder, FaFolderOpen} from "react-icons/fa6";
import {Link} from "react-router";
import Loading from "@/components/Loading.tsx";

export default function Directories() {
    const [isLoading, setIsLoading] = useState(false);
    const [directories, setDirectories] = useState<IDirectory[]>([]);

    function countParent(directory: IDirectory, count = 0) {
        const parentDirectory = directories.find(x => x.id === directory.parentId);
        if (!parentDirectory) {
            return count;
        }

        return countParent(parentDirectory, count + 1);
    }

    function isParent(directory: IDirectory) {
        return directories.some(x => x.parentId === directory.id);
    }

    useEffect(() => {
        setIsLoading(true);

        Promise.all([getDirectories()])
            .then(([directories]) => {
                localSetItem('directories', directories);
                setDirectories(directories);
            })
            .catch((err: unknown) => {
                console.error(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <Loading/>
    }

    return (
        <ul className="space-y-2">
            {directories.map((directory: IDirectory) => {
                const padding = countParent(directory);
                const paddingString = (padding * 2).toString();

                const directoryFilesRoute = directory.hasFiles ? `/directory-files/${encodeURIComponent(directory.id)}` : '#';

                const directoryIcon = isParent(directory) ? <FaFolderOpen/> : <FaFolder/>;

                return (
                    <li key={directory.id} style={{paddingLeft: `${paddingString}rem`}}>
                        <Link to={directoryFilesRoute} className={
                            directory.hasFiles
                                ? 'flex items-center space-x-2 hover:underline'
                                : 'flex items-center space-x-2 cursor-default opacity-50'
                        }>
                            {directoryIcon}
                            <span>{directory.name}</span>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}