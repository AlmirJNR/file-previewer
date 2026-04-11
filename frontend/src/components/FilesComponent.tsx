import {IDirectoryFile} from "@/types/directoryFile";
import FileComponent from "@/components/FileComponent.tsx";

interface IFilesProps {
    files: IDirectoryFile[];
}

function FilesComponent({files}: IFilesProps) {
    return (
        <div>
            {files.map(x => {
                return <FileComponent key={x.path + x.name} file={x}/>
            })}
        </div>
    );
}

export default FilesComponent;