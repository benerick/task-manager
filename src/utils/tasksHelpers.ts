import { createHash } from "crypto";

export function generateUniqueId(user: string | null): string {
    const timestamp = new Date().toISOString;
    const raw = `${user}_${timestamp}`;
    const hash = createHash("sha256").update(raw).digest("hex");
    return `${user ?? "anon"}_${Date.now()}_${hash.substring(0, 8)}`;
};

