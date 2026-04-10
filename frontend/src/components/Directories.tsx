import {IDirectory} from "@/types/directory";
import {useDirectoriesContext} from "@/hooks/useDirectoriesContext.ts";
import Directory from "@/components/Directory.tsx";

export default function Directories() {
    const {directories} = useDirectoriesContext();

    function countParent(directory: IDirectory, count = 0) {
        const parentDirectory = directories.find(x => x.id === directory.parentId);
        if (!parentDirectory) {
            return count;
        }

        return countParent(parentDirectory, count + 1);
    }

    return (
        <ul className="space-y-2">
            {directories.flatMap((directory: IDirectory) => {
                return <Directory key={directory.name} parentCount={countParent(directory)} directory={directory}/>;
            })}
        </ul>
    );
}