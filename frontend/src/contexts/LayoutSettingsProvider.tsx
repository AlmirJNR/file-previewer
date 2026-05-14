import { PropsWithChildren, useEffect, useState } from 'react';
import { LayoutSettingsContext } from '@/contexts/layoutSettingsContext.ts';

const TITLE_KEY = 'titleIsVisible';
const FILE_NAME_KEY = 'fileNameIsVisible';
const FILE_DESCRIPTION_BUTTON_KEY = 'fileDescriptionButtonIsVisible';

function LayoutSettingsProvider({ children }: PropsWithChildren) {
    const [isTitleVisible, setIsTitleVisible] = useState(() => {
        const value = localStorage.getItem(TITLE_KEY) ?? 'true';
        return value === 'true';
    });
    const [isFileNameVisible, setIsFileNameVisible] = useState(() => {
        const value = localStorage.getItem(FILE_NAME_KEY) ?? 'true';
        return value === 'true';
    });
    const [isFileDescriptionButtonVisible, setIsFileDescriptionButtonVisible] = useState(() => {
        const value = localStorage.getItem(FILE_DESCRIPTION_BUTTON_KEY) ?? 'true';
        return value === 'true';
    });

    useEffect(() => {
        localStorage.setItem(TITLE_KEY, String(isTitleVisible));
    }, [isTitleVisible]);

    useEffect(() => {
        localStorage.setItem(FILE_NAME_KEY, String(isFileNameVisible));
    }, [isFileNameVisible]);

    useEffect(() => {
        localStorage.setItem(FILE_DESCRIPTION_BUTTON_KEY, String(isFileDescriptionButtonVisible));
    }, [isFileDescriptionButtonVisible]);

    return (
        <LayoutSettingsContext
            value={{
                title: {
                    isVisible: isTitleVisible,
                    setIsVisible: setIsTitleVisible,
                },
                fileName: {
                    isVisible: isFileNameVisible,
                    setIsVisible: setIsFileNameVisible,
                },
                fileDescriptionButton: {
                    isVisible: isFileDescriptionButtonVisible,
                    setIsVisible: setIsFileDescriptionButtonVisible,
                },
            }}
        >
            {children}
        </LayoutSettingsContext>
    );
}

export default LayoutSettingsProvider;
