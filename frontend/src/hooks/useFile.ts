import { MouseEvent, useEffect, useRef } from 'react';
import { useDirectoryTreeContext } from '@/hooks/useDirectoryTreeContext.ts';

function useFile() {
    const { directoryTree } = useDirectoryTreeContext();
    const embedRef = useRef<HTMLEmbedElement>(null);

    function onFullscreenChange() {
        const ref = embedRef.current;
        if (!ref) {
            return;
        }

        ref.className = document.fullscreenElement ? 'visible' : 'hidden';
    }

    function requestFullscreen(event: MouseEvent<HTMLElement>) {
        event.stopPropagation();
        void embedRef.current?.requestFullscreen();
    }

    useEffect(() => {
        const ref = embedRef.current;
        ref?.addEventListener('fullscreenchange', onFullscreenChange);
        return () => ref?.removeEventListener('fullscreenchange', onFullscreenChange);
    }, [directoryTree]);

    return { embedRef, requestFullscreen };
}

export { useFile };
