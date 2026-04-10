import {MouseEvent, useEffect, useRef} from "react";
import {useDirectoriesContext} from "@/hooks/useDirectoriesContext.ts";

function useFile() {
    const {directories} = useDirectoriesContext();
    const embedRef = useRef<HTMLEmbedElement>(null);

    function onFullscreenChange() {
        const ref = embedRef.current;
        if (!ref) {
            return;
        }

        ref.className = document.fullscreenElement ? "visible" : "hidden";
    }

    function requestFullscreen(event: MouseEvent<HTMLElement>) {
        event.stopPropagation();
        void embedRef.current?.requestFullscreen();
    }

    useEffect(() => {
        const ref = embedRef.current;
        ref?.addEventListener("fullscreenchange", onFullscreenChange);
        return () => ref?.removeEventListener("fullscreenchange", onFullscreenChange);
    }, [directories]);

    return {embedRef, requestFullscreen};
}

export {useFile};