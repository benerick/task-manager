// Funcion que simula latencia entre 500ms y 1000ms
export async function simulateLatency() {
    const delay = Math.random() * 1000 + 500;
    return new Promise((resolve) => setTimeout(resolve, delay));
}

// Funcion que genera clave dinamica usando hash del email del usuario + fecha
export function generateDynamicKey(email: string): string {
    const now = new Date().toISOString();
    return btoa(`${email}:${now}`).slice(0, 15);
}

