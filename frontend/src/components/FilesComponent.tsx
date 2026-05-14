import FileComponent from '@/components/FileComponent.tsx';
import { IDirectoryFile } from '@/types/directoryFile';

interface IFilesProps {
    files: IDirectoryFile[];
}

function FilesComponent({ files }: IFilesProps) {
    if (!files.length) {
        return null;
    }

    return (
        <div className="flex flex-col gap-2">
            {files.map(x => {
                return <FileComponent key={x.path + x.name} file={x} />;
            })}
        </div>
    );
}

export default FilesComponent;
