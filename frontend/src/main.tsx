import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import Directories from "@/components/Directories.tsx";
import {IconContext} from "react-icons";
import FileSystemHubProvider from "@/contexts/FileSystemHubProvider.tsx";
import DirectoriesProvider from "@/contexts/DirectoriesProvider.tsx";

const root = document.getElementById('root');
if (!root) {
    throw new Error();
}

createRoot(root).render(
    <StrictMode>
        <IconContext value={{className: 'fill-cyan-800', size: '0.8em'}}>
            <FileSystemHubProvider>
                <DirectoriesProvider>
                    <App>
                        <Directories/>
                    </App>
                </DirectoriesProvider>
            </FileSystemHubProvider>
        </IconContext>
    </StrictMode>
);
