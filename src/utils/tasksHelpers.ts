import { createHash } from "crypto";

export function generateUniqueId(user: string): string {
    const timestamp = new Date().toISOString;
    const raw = `${user}_${timestamp}`;
    const hash = createHash("sha256").update(raw).digest("hex");
    return `${user}_${Date.now()}_${hash.substring(0, 8)}`;
};

