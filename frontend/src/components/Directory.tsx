import {CSSProperties, Dispatch, SetStateAction} from "react";
import {IDirectory} from "@/types/directory";
import {FaFolder, FaFolderOpen} from "react-icons/fa6";
import FilesComponent from "@/components/FilesComponent.tsx";

interface IDirectoryProps {
    depth: number;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    directory: IDirectory;
}

function Directory({depth, isOpen, setIsOpen, directory}: IDirectoryProps) {
    if (!directory.isVisible) {
        return null;
    }

    const paddingLeftString = depth.toString();
    const directoryStyle: CSSProperties = {paddingLeft: `${paddingLeftString}rem`};

    function onClick() {
        setIsOpen((prevState) => !prevState);
    }

    if (!directory.hasFiles) {
        return (
            <li key={directory.id} style={directoryStyle}>
                <div className={'flex items-center space-x-2 opacity-50'}>
                    <FaFolder/>
                    <span>{directory.name}</span>
                </div>
            </li>
        );
    }

    return (
        <li key={directory.id} style={directoryStyle} onClick={onClick}>
            <div className={'flex items-center space-x-2 hover:cursor-pointer hover:underline'}>
                {isOpen ? <FaFolderOpen/> : <FaFolder/>}
                <span>{directory.name}</span>
            </div>

            {isOpen && <FilesComponent files={directory.pdfFiles}/>}
        </li>
    );
}

export default Directory;