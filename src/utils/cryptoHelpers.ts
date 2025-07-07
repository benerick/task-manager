import { config } from "@/config";

// Encripta un string agregando un 'secret' y codificando en base64
export function encrypt(data: string): string {
    const combined = `${data}:${config.secret}`;
    return btoa(combined);
}

// Desencripta un string codificado por la función encrypt
export function decrypt(encrypted: string): string {
    const decoded = atob(encrypted);
    return decoded.split(":")[0];
}