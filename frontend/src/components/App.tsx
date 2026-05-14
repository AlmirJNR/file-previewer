import { useDirectoryTreeContext } from '@/hooks/useDirectoryTreeContext.ts';
import { useFileSystem } from '@/hooks/useFileSystem.ts';
import DirectoryTree from '@/components/DirectoryTree.tsx';
import Loading from '@/components/Loading.tsx';
import Title from '@/components/Title.tsx';
import Warning from '@/components/Warning.tsx';
import ActionButtons from '@/components/actionButtons/ActionButtons.tsx';

export default function App() {
    const { isConnecting } = useFileSystem();
    const { directoryTree } = useDirectoryTreeContext();

    if (isConnecting) {
        return (
            <main className="m-4 space-y-4 rounded p-4 shadow-lg shadow-gray-200">
                <Loading />
            </main>
        );
    }

    if (!directoryTree) {
        return (
            <main className="m-4 space-y-4 rounded p-4 shadow-lg shadow-gray-200">
                <Warning text="Não existem arquivos no diretório principal" />
            </main>
        );
    }

    return (
        <main className="m-4 flex flex-col gap-2 rounded p-4 shadow-lg shadow-gray-200">
            <Title />
            <ul className={'flex flex-col gap-2'}>
                <DirectoryTree depth={-1} initialIsOpen directoryTree={directoryTree} />
            </ul>
            <ActionButtons />
        </main>
    );
}
