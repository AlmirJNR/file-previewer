import { use } from 'react';
import { FileSystemHubContext } from '@/contexts/fileSystemHubContext.ts';

function useFileSystemHubContext() {
    const context = use(FileSystemHubContext);
    if (!context) {
        throw new Error();
    }

    return context;
}

export { useFileSystemHubContext };
