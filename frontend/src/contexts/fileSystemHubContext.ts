import { createContext } from 'react';
import { HubConnection } from '@microsoft/signalr';

export const FileSystemHubContext = createContext<HubConnection | null>(null);
