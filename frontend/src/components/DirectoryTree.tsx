import {IDirectoryTree} from "@/types/directory";
import Directory from "@/components/Directory.tsx";
import {Activity, useState} from "react";

interface IDirectoryTreeProps {
    depth: number;
    initialIsOpen: boolean;
    directoryTree: IDirectoryTree;
}

export default function DirectoryTree({depth, initialIsOpen, directoryTree}: IDirectoryTreeProps) {
    const [isOpen, setIsOpen] = useState(initialIsOpen);

    return (
        <>
            <Directory depth={depth} isOpen={isOpen} setIsOpen={setIsOpen} directoryTree={directoryTree}/>

            <Activity mode={isOpen ? 'visible' : 'hidden'}>
                {directoryTree.directories.map((directoryTree) =>
                    <DirectoryTree key={directoryTree.directory.id}
                                   initialIsOpen={false}
                                   depth={depth + 1}
                                   directoryTree={directoryTree}/>)}
            </Activity>
        </>
    );
}