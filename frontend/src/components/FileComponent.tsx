import {getFile} from "@/services/fileService.ts";
import {IDirectoryFile} from "@/types/directoryFile";
import {FaFilePdf} from "react-icons/fa6";
import {useFile} from "@/hooks/useFile.ts";
import {CSSProperties} from "react";

interface IFileProps {
    file: IDirectoryFile;
    style?: CSSProperties;
}

export default function FileComponent({file, style}: IFileProps) {
    const {embedRef, requestFullscreen} = useFile();

    const fileName = file.name.replace('.pdf', '');

    return (
        <div
            className="flex items-center space-x-2 pl-1 hover:underline hover:cursor-pointer"
            style={style}
            onClick={requestFullscreen}
        >
            <FaFilePdf/>
            <span>{fileName}</span>
            <embed ref={embedRef} src={getFile(file.path)} className="hidden"/>
        </div>
    );
}