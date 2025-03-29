import {Link, useParams} from "react-router";
import {localGetItem} from "@/services/storeService.ts";
import {IDirectory} from "@/types/directory";
import {getFile} from "@/services/fileService.ts";
import {Fragment} from "react";
import Warning from "@/components/Warning.tsx";

export default function DirectoryFiles() {
    const {directoryId} = useParams();

    const directories = localGetItem<IDirectory[]>('directories');
    if (!directories || directories.length === 0) {
        return (
            <Link to="/" className="hover:underline">
                <Warning text="não existem diretórios"/>
            </Link>
        );
    }

    const directory = directories.find(x => x.id === directoryId);
    if (!directory) {
        return (
            <Link to="/" className="hover:underline">
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