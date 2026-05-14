import ActionButtons from "@/components/actionButtons/ActionButtons.tsx";
import Loading from "@/components/Loading.tsx";
import DirectoryTree from "@/components/DirectoryTree.tsx";
import {useFileSystem} from "@/hooks/useFileSystem.ts";
import {useDirectoryTreeContext} from "@/hooks/useDirectoryTreeContext.ts";
import Warning from "@/components/Warning.tsx";
import Title from "@/components/Title.tsx";

export default function App() {
    const {isConnecting} = useFileSystem();
    const {directoryTree} = useDirectoryTreeContext();

    if (isConnecting) {
        return (
            <main className="m-4 p-4 rounded shadow-lg shadow-gray-200 space-y-4">
                <Loading/>
            </main>
        );
    }

    if (!directoryTree) {
        return (
            <main className="m-4 p-4 rounded shadow-lg shadow-gray-200 space-y-4">
                <Warning text="Não existem arquivos no diretório principal"/>;
            </main>
        );
    }

    return (
        <main className="flex flex-col m-4 p-4 rounded shadow-lg shadow-gray-200 gap-2">
            <Title/>
            <ul>
                <DirectoryTree depth={-1} initialIsOpen directoryTree={directoryTree}/>
            </ul>
            <ActionButtons/>
        </main>
    );
}