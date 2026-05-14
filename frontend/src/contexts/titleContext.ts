import { Dispatch, SetStateAction, createContext } from 'react';

interface ITitleContext {
    isVisible: boolean;
    setIsVisible: Dispatch<SetStateAction<boolean>>;
    title: string;
    setTitle: Dispatch<SetStateAction<string>>;
}

export const TitleContext = createContext<ITitleContext | null>(null);

export type { ITitleContext };
