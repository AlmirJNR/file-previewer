import {PropsWithChildren, useEffect, useState} from "react";
import {TitleContext} from "@/contexts/titleContext.ts";

function TitleProvider({children}: PropsWithChildren) {
    const key = 'title';

    const [isVisible, setIsVisible] = useState(true);
    const [title, setTitle] = useState(() => localStorage.getItem(key) ?? '');

    useEffect(() => {
        localStorage.setItem(key, title);
    }, [title]);

    return (
        <TitleContext value={{isVisible, setIsVisible, title, setTitle}}>
            {children}
        </TitleContext>
    );
}

export default TitleProvider;