import {use} from 'react'
import {IDirectory} from "@/types/directory";
import {FaFolder, FaFolderOpen} from "react-icons/fa6";
import {Link} from "react-router";
import {DirectoriesContext} from "@/contexts/directoriesContext.ts";

export default function Directories() {
    const directoriesContext = use(DirectoriesContext);

    function countParent(directory: IDirectory, count = 0) {
        const parentDirectory = directoriesContext?.directories.find(x => x.id === directory.parentId);
        if (!parentDirectory) {
            return count;
        }

        return countParent(parentDirectory, count + 1);
    }

    function isParent(directory: IDirectory) {
        return directoriesContext?.directories.some(x => x.parentId === directory.id) ?? false;
    }

    return (
        <ul className="space-y-2">
            {directoriesContext?.directories.map((directory: IDirectory) => {
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