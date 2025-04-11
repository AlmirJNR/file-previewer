import {FaFilePdf} from "react-icons/fa6";
import {Link} from "react-router";
import {useDirectories} from "@/contexts/directoriesContext.ts";

export default function MeetingAgendaButton() {
    const {directories} = useDirectories();
    const directory = directories.find(x => x.pdfFiles.some(x => x.name.trim().toLowerCase() === 'pauta.pdf'));
    if (!directory) {
        return null;
    }

    const directoryPath = `/directory-files/${encodeURIComponent(directory.id)}`;
    return (
        <Link to={directoryPath}
              className="bg-cyan-800 rounded-full p-2 group hover:bg-white w-20 flex justify-evenly items-center">
            <FaFilePdf className="fill-white group-hover:fill-cyan-800"/>
            <span className="text-white group-hover:text-cyan-800 text-xs">Pauta</span>
        </Link>
    );
}