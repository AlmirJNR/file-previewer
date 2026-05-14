import { PropsWithChildren, useState } from 'react';
import { FileSystemHubContext } from '@/contexts/fileSystemHubContext.ts';
import { buildFileSystemHub } from '@/services/fileSystemHubService.ts';

function FileSystemHubProvider({ children }: PropsWithChildren) {
    const [fileSystemHub] = useState(() => buildFileSystemHub());

    return <FileSystemHubContext value={fileSystemHub}>{children}</FileSystemHubContext>;
}

export default FileSystemHubProvider;
