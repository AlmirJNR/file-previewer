import {Link, useNavigate, useParams} from "react-router";
import {IDirectory} from "@/types/directory";
import {getFile} from "@/services/fileService.ts";
import {Fragment, use, useEffect, useState} from "react";
import Warning from "@/components/Warning.tsx";
import {DirectoriesContext} from "@/contexts/directoriesContext.ts";

export default function DirectoryFiles() {
    const {directoryId} = useParams();
    const [hasDirectories, setHasDirectories] = useState<boolean>(false);
    const [directory, setDirectory] = useState<IDirectory | null>(null);
    const navigate = useNavigate();

    const directoriesContext = use(DirectoriesContext);

    useEffect(() => {
        const directories = directoriesContext?.directories;
        if (directories && directories.length > 0) {
            setHasDirectories(true);
        }

        const directory = directories?.find(x => x.id === directoryId);
        if (!directory?.hasFiles) {
            void navigate('/', {replace: true});
            return;
        }

        setDirectory(directory);
    }, [directoryId, directoriesContext?.directories, navigate]);

    if (!hasDirectories) {
        return (
            <Link to="/" className="flex items-center justify-center hover:underline">
                <Warning text="não existem diretórios"/>
            </Link>
        );
    }

    if (!directory) {
        return (
            <Link to="/" className="flex items-center justify-center hover:underline">
                <Warning text="diretório não encontrado"/>
            </Link>
        );
    }

    return directory.pdfFiles.map((file) => (
        <Fragment key={file.path}>
            <div className="text-center">{file.name}</div>
            <embed src={getFile(file.path)} className="w-full h-screen"/>
        </Fragment>
    ));
}