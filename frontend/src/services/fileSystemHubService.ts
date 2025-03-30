import {HubConnectionBuilder} from "@microsoft/signalr";

export function buildFileSystemHub() {
    return new HubConnectionBuilder()
        .withUrl("http://localhost:5000/hubs/filesystem", {withCredentials: false})
        .withAutomaticReconnect([1000, 2000, 3000, 5000, 8000])
        .build();
}