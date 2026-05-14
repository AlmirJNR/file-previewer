import {useEffect, useState} from "react";

interface IUseFileDescriptionProps {
    filePath: string;
}

function useFileDescription({filePath}: IUseFileDescriptionProps) {
    const key = `fileDescription:${filePath}`;

    const [fileDescription, setFileDescription] = useState(() => localStorage.getItem(key) ?? '');

    useEffect(() => {
        if (!fileDescription) return;
        localStorage.setItem(key, fileDescription);
    }, [key, fileDescription]);

    useEffect(() => {
        return () => {
            localStorage.removeItem(key);
        }
    }, [key]);

    return {
        fileDescription,
        setFileDescription
    }
}

export {useFileDescription};