import {IDirectoryFile} from "@/types/directoryFile";
import FileComponent from "@/components/FileComponent.tsx";

interface IFilesProps {
    defaultLeftPadding?: number;
    parentCount: number;
    files: IDirectoryFile[];
}

function FilesComponent({defaultLeftPadding = 1, parentCount, files}: IFilesProps) {
    const paddingLeftString = (parentCount || defaultLeftPadding).toString();

    return (
        <div>
            {files.map(x => {
                return <FileComponent key={x.path + x.name} file={x} style={{paddingLeft: `${paddingLeftString}rem`}}/>
            })}
        </div>
    );
}

export default FilesComponent;