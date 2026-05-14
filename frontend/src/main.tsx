import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DirectoryTreeProvider from '@/contexts/DirectoryTreeProvider.tsx';
import FileSystemHubProvider from '@/contexts/FileSystemHubProvider.tsx';
import LayoutSettingsProvider from '@/contexts/LayoutSettingsProvider.tsx';
import { IconContext } from 'react-icons';
import App from './components/App.tsx';
import './index.css';

const root = document.getElementById('root');
if (!root) {
    throw new Error();
}

createRoot(root).render(
    <StrictMode>
        <IconContext value={{ className: 'fill-cyan-800', size: '0.8em' }}>
            <FileSystemHubProvider>
                <DirectoryTreeProvider>
                    <LayoutSettingsProvider>
                        <App />
                    </LayoutSettingsProvider>
                </DirectoryTreeProvider>
            </FileSystemHubProvider>
        </IconContext>
    </StrictMode>
);
