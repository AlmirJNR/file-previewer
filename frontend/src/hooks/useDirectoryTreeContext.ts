import { use } from 'react';
import { DirectoryTreeContext } from '@/contexts/directoryTreeContext.ts';

function useDirectoryTreeContext() {
    const context = use(DirectoryTreeContext);
    if (!context) {
        throw new Error('useDirectoryTree hook used without DirectoryTreeContext!');
    }

    return context;
}

export { useDirectoryTreeContext };
