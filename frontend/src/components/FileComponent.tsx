import { Activity, ChangeEvent, MouseEvent, useState } from 'react';
import { FaChevronDown, FaChevronUp, FaFilePdf } from 'react-icons/fa6';
import { getFile } from '@/services/fileService.ts';
import { useFile } from '@/hooks/useFile.ts';
import { useFileDescription } from '@/hooks/useFileDescription.ts';
import { useLayoutSettingsContext } from '@/hooks/useLayoutSettingsContext.ts';
import { IDirectoryFile } from '@/types/directoryFile';

interface IFileProps {
    file: IDirectoryFile;
}

export default function FileComponent({ file }: IFileProps) {
    const [isOpen, setIsOpen] = useState(false);

    const { fileName: fileNameLayout, fileDescriptionButton: fileDescriptionButtonLayout } =
        useLayoutSettingsContext();

    const { embedRef, requestFullscreen } = useFile();
    const { fileDescription, setFileDescription } = useFileDescription({ filePath: file.path });

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
        <div className="flex flex-col gap-2 pl-4" onClick={onClickContainer}>
            <div className="flex items-center gap-2">
                <div
                    className="flex min-h-4 items-center gap-2 hover:cursor-pointer hover:underline"
                    onClick={requestFullscreen}
                >
                    <FaFilePdf />
                    {fileNameLayout.isVisible && <span>{fileName}</span>}
                    <embed ref={embedRef} src={getFile(file.path)} className="hidden" />
                </div>

                <Activity mode={fileDescriptionButtonLayout.isVisible ? 'visible' : 'hidden'}>
                    <button
                        className="flex items-center rounded-full bg-cyan-800 p-0.5 pr-1 pl-1 hover:cursor-pointer"
                        onClick={onClickButton}
                    >
                        {isOpen ? (
                            <FaChevronUp className="fill-white" size="0.6em" />
                        ) : (
                            <FaChevronDown className="fill-white" size="0.6em" />
                        )}
                    </button>
                </Activity>
            </div>

            <Activity mode={isOpen ? 'visible' : 'hidden'}>
                <textarea
                    className="mb-2 w-full rounded-sm bg-gray-100 p-1 focus:outline-none"
                    rows={descriptionTotalRows}
                    onChange={onDescriptionChange}
                    value={fileDescription}
                />
            </Activity>
        </div>
    );
}
