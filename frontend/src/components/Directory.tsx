import { Activity, CSSProperties, Dispatch, SetStateAction } from 'react';
import { FaFolder, FaFolderOpen } from 'react-icons/fa6';
import { directoryHasFiles } from '@/utils/directoryHasFiles.ts';
import FilesComponent from '@/components/FilesComponent.tsx';
import { IDirectoryTree } from '@/types/directory';

interface IDirectoryProps {
    depth: number;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    directoryTree: IDirectoryTree;
}

function Directory({ depth, isOpen, setIsOpen, directoryTree }: IDirectoryProps) {
    const { directory } = directoryTree;

    if (!directory.isVisible) {
        return null;
    }

    const paddingLeftString = depth.toString();
    const directoryStyle: CSSProperties = { paddingLeft: `${paddingLeftString}rem` };

    function onClick() {
        setIsOpen(prevState => !prevState);
    }

    if (!directoryHasFiles(directoryTree)) {
        return (
            <li key={directory.id} style={directoryStyle}>
                <div className={'flex items-center gap-2 opacity-50'}>
                    <FaFolder />
                    <span>{directory.name}</span>
                </div>
            </li>
        );
    }

    return (
        <li
            key={directory.id}
            style={directoryStyle}
            className="flex flex-col gap-2"
            onClick={onClick}
        >
            <div className={'flex items-center gap-2 hover:cursor-pointer hover:underline'}>
                {isOpen ? <FaFolderOpen /> : <FaFolder />}
                <span>{directory.name}</span>
            </div>

            <Activity mode={isOpen ? 'visible' : 'hidden'}>
                <FilesComponent files={directory.pdfFiles} />
            </Activity>
        </li>
    );
}

export default Directory;
