import {
    compressToEncodedURIComponent,
    decompressFromEncodedURIComponent
} from "lz-string";

// Serializa y comprime
export function compressData<T>(data: T): string {
    const json = JSON.stringify(data);
    return compressToEncodedURIComponent(json);
}

// Descomprime y parsea
export function decompressData<T>(compressed: string): T | null {
    const json = decompressFromEncodedURIComponent(compressed);
    if (!json) return null;
    try {
        return JSON.parse(json);
    } catch {
        return null;
    }
}
