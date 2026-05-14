import { Dispatch, SetStateAction, createContext } from 'react';

interface IIsVisible {
    isVisible: boolean;
    setIsVisible: Dispatch<SetStateAction<boolean>>;
}

interface ILayoutSettingsContext {
    title: IIsVisible;
    fileName: IIsVisible;
    fileDescriptionButton: IIsVisible;
}

export const LayoutSettingsContext = createContext<ILayoutSettingsContext | null>(null);

export type { ILayoutSettingsContext };
