import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './components/App.tsx';
import {IconContext} from "react-icons";
import FileSystemHubProvider from "@/contexts/FileSystemHubProvider.tsx";
import DirectoryTreeProvider from "@/contexts/DirectoryTreeProvider.tsx";

const root = document.getElementById('root');
if (!root) {
    throw new Error();
}

createRoot(root).render(
    <StrictMode>
        <IconContext value={{className: 'fill-cyan-800', size: '0.8em'}}>
            <FileSystemHubProvider>
                <DirectoryTreeProvider>
                    <App/>
                </DirectoryTreeProvider>
            </FileSystemHubProvider>
        </IconContext>
    </StrictMode>
);
