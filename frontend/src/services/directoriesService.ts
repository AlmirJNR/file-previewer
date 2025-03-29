import {IDirectory} from "@/types/directory";

export async function getDirectories() {
    const response = await fetch('http://localhost:5000/api/v1/directories');
    if (!response.ok) {
        throw Error(await response.text());
    }

    return await response.json() as IDirectory[];
}