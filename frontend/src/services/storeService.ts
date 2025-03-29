export function sessionSetItem(key: string, value: unknown) {
    sessionStorage.setItem(key, JSON.stringify(value));
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export function sessionGetItem<T>(key: string): T | null {
    const item = sessionStorage.getItem(key);
    if (!item) {
        return null;
    }

    return JSON.parse(item) as T;
}

export function localSetItem(key: string, value: unknown) {
    localStorage.setItem(key, JSON.stringify(value));
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export function localGetItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    if (!item) {
        return null;
    }

    return JSON.parse(item) as T;
}