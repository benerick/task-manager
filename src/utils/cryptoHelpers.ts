import { config } from "@/config";


export function encrypt(data: string): string {
    const combined = `${data}:${config.secret}`;
    return btoa(combined);
}

export function decrypt(encrypted: string): string {
    const decoded = atob(encrypted);
    return decoded.split(":")[0];
}