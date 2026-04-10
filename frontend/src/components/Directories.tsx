import {IDirectory} from "@/types/directory";
import {useDirectoriesContext} from "@/hooks/useDirectoriesContext.ts";
import Directory from "@/components/Directory.tsx";
import Warning from "@/components/Warning.tsx";

export default function Directories() {
    const {directories} = useDirectoriesContext();

    function countParent(directory: IDirectory, count = 0) {
        const parentDirectory = directories.find(x => x.id === directory.parentId);
        if (!parentDirectory) {
            return count;
        }

        return countParent(parentDirectory, count + 1);
    }

    if (directories.length <= 1 && countParent(directories[0]) === 0) {
        return <Warning text="Não existem arquivos no diretório"/>;
    }

    return (
        <ul className="space-y-2">
            {directories.flatMap((directory: IDirectory) => {
                return <Directory key={directory.name} parentCount={countParent(directory)} directory={directory}/>;
            })}
        </ul>
    );
}