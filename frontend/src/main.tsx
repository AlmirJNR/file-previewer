import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter, Route, Routes} from "react-router";
import Directories from "@/components/Directories.tsx";
import DirectoryFiles from "@/components/DirectoryFiles.tsx";
import {IconContext} from "react-icons";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <IconContext value={{className: 'fill-cyan-800', size: '0.8em'}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App/>}>
                        <Route path="/" element={<Directories/>}/>
                        <Route path="directory-files/:directoryId" element={<DirectoryFiles/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </IconContext>
    </StrictMode>
)
