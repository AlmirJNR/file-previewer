import {IDirectoryTree} from "@/types/directory";

function directoryHasFiles({directory, directories}: IDirectoryTree) {
    if (directory.hasFiles) {
        return true;
    }

    if (directories.some(directoryHasFiles)) {
        return true;
    }

    return false;
}

export {directoryHasFiles};