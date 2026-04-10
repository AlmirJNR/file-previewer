import {FaFilePdf} from "react-icons/fa6";
import {useFile} from "@/hooks/useFile.ts";
import {getFile} from "@/services/fileService.ts";
import {useDirectoriesContext} from "@/hooks/useDirectoriesContext.ts";

export default function MeetingAgendaButton() {
    const {directories} = useDirectoriesContext();
    const {embedRef, requestFullscreen} = useFile();

    const directory = directories.find(x => x.name.endsWith('Content'));
    const file = directory?.pdfFiles.find(x => x.name.trim().toLowerCase() === 'pauta.pdf');
    if (!directory || !file) {
        return null;
    }

    const fileNameLower = file.name.toLowerCase();
    const fileName = (fileNameLower[0].toUpperCase() + fileNameLower.slice(1)).replace('.pdf', '');

    return (
        <div
            onClick={requestFullscreen}
            className="bg-cyan-800 rounded-full p-2 group hover:bg-white w-20 flex justify-evenly items-center cursor-pointer">
            <FaFilePdf className="fill-white group-hover:fill-cyan-800"/>
            <span className="text-white group-hover:text-cyan-800 text-xs">{fileName}</span>
            <embed ref={embedRef} src={getFile(file.path)} className="hidden"/>
        </div>
    );
}