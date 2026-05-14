import {MouseEvent, ChangeEvent, Activity, useState} from "react";
import {FaChevronDown, FaChevronUp, FaFile, FaFilePdf} from "react-icons/fa6";

import {getFile} from "@/services/fileService.ts";
import {useFile} from "@/hooks/useFile.ts";
import {useFileDescription} from "@/hooks/useFileDescription.ts";

import {IDirectoryFile} from "@/types/directoryFile";

interface IFileProps {
    file: IDirectoryFile;
}

export default function FileComponent({file}: IFileProps) {
    const [isOpen, setIsOpen] = useState(false);
    const {embedRef, requestFullscreen} = useFile();
    const {fileDescription, setFileDescription} = useFileDescription({filePath: file.path});

    const isDescriptionOnlyFile = file.name === '_.pdf';
    const fileName = file.name.replace('.pdf', '');

    const descriptionTotalRows = fileDescription.split('\n').length;

    function onClickContainer(event: MouseEvent<HTMLDivElement>) {
        event.preventDefault();
        event.stopPropagation();
    }

    function onClickButton() {
        setIsOpen(prevState => !prevState);
    }

    function onDescriptionChange(event: ChangeEvent<HTMLTextAreaElement>) {
        setFileDescription(event.target.value);
    }

    return (
        <div className="flex flex-col pl-4 gap-y-0.5" onClick={onClickContainer}>
            <div className="flex items-center gap-2">
                <div
                    className="flex items-center gap-2 hover:underline hover:cursor-pointer"
                    onClick={requestFullscreen}
                >
                    {isDescriptionOnlyFile ? <FaFile/> : <FaFilePdf/>}
                    {!isDescriptionOnlyFile && <span>{fileName}</span>}
                    <embed ref={embedRef} src={getFile(file.path)} className="hidden"/>
                </div>

                <button
                    className="bg-cyan-800 rounded-full p-0.5 pl-1 pr-1 flex items-center hover:cursor-pointer"
                    onClick={onClickButton}
                >
                    {isOpen
                        ? <FaChevronUp className="fill-white" size='0.6em'/>
                        : <FaChevronDown className="fill-white" size='0.6em'/>}
                </button>
            </div>

            <Activity mode={isOpen ? 'visible' : 'hidden'}>
                <textarea
                    className="bg-gray-100 rounded-sm w-full focus:outline-none p-1" rows={descriptionTotalRows}
                    onChange={onDescriptionChange}
                    value={fileDescription}
                />
            </Activity>
        </div>
    );
}