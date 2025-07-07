# Gestor de Tareas

Este proyecto es una aplicación de gestión de tareas construida con **Next.js**, **TypeScript**, **Redux Toolkit**, **styled-components** y **WebSockets** para sincronización en tiempo real entre pestañas. Está diseñado para cumplir con requerimientos avanzados como persistencia, validaciones estrictas, caché optimizada y estructura de datos personalizada.

---

## Decisiones de Diseño Clave

- **Redux Toolkit** se utiliza para manejar el estado global de forma clara y escalable.
- **styled-components** permite mantener el estilo encapsulado y reutilizable.
- **Next.js** facilita el renderizado SSR y el enrutamiento automático.
- **WebSocket Server local** para sincronización entre pestañas en tiempo real.
- La **estructura del estado de tareas** se modela como un árbol (`columns -> tasks -> {id: Task}`), permitiendo acceso rápido por ID y soporte para múltiples columnas.
- Las pruebas unitarias y de integracion se realizaron con **jest.js** y **React Testing Library**

---

## Persistencia de Datos

La persistencia se implementa de la siguiente forma:

- Las tareas se serializan y **comprimen en Base64** antes de guardarlas en `localStorage`.
- Al iniciar sesión, si el token válido está presente encriptado, el estado de tareas se hidrata desde `localStorage`.
- Cada vez que se crea, edita o elimina una tarea, el estado se vuelve a serializar y actualizar en el almacenamiento.
- Se utiliza un **middleware de Redux** personalizado para interceptar acciones relevantes y persistir el estado automáticamente.

---

## Generación de IDs y Estrategia de Caché

### Generación de ID único

Cada tarea tiene un ID generado así:

```ts
const timestamp = new Date().toISOString;
const raw = `${user}_${timestamp}`;
const hash = createHash("sha256").update(raw).digest("hex");
return `${user ?? "anon"}_${Date.now()}_${hash.substring(0, 8)}`;
```

Se combina el email del usuario, el timestamp y un hash basado en el usuario y fecha.

Esto garantiza unicidad por usuario y evita colisiones.

### Estructuras de Datos Avanzadas
En lugar de usar un array simple de tareas, se utiliza una estructura tipo árbol:

```ts
columns: {
  pending: {
    name: "Pendiente",
    tasks: {
      "task-1": { id: "task-1", title: "...", ... },
      ...
    }
  },
  ...
}
```
Ventajas:

Acceso O(1) por ID de tarea.

Soporte nativo para múltiples columnas con estados personalizables.

Fácil implementación de drag and drop sin necesidad de recorrer arrays.

Favorece la lógica de actualización, validación y sincronización sin recorrer toda la lista de tareas.

### Caché en Memoria

Fue aplicada estrategia de caché para funciones que requerian de hacer un recorrido al arbol de tareas.

Esto mejora el rendimiento especialmente cuando se renderiza el TaskBoard, se filtra por titulo o estado o se busca validar tareas duplicadas en formularios.

### Tests
Aunque no se completaron al 100%, el proyecto incluye:

Pruebas unitarias para slice de tareas y validaciones de formularios.

Simulaciones de edición y creación de tareas con estado inicial.

Cobertura de pruebas de componentes como LoginForm, TaskCard, y lógica de sincronización.

## Cómo empezar

Sigue estos pasos para clonar el repositorio, instalar las dependencias y correr la app en desarrollo.

### 1. Clona el repositorio

```bash
git clone https://github.com/benerick/task-manager.git
cd task-manager
```
2. Instala las dependencias
```
npm install
```
4. Ejecuta los scripts
Iniciar la app en desarrollo
```
npm run dev
```
Compilar para producción
```
npm run build
```
Ejecutar los tests con Jest
```
npm test
```
Iniciar el servidor WebSocket
```
npx ts-node src/server/ws-server.ts
```

### Prueba - Ingreso al Sistema
Para iniciar sesión en la aplicación, debes utilizar una cuenta válida proporcionada por el servicio de autenticación de pruebas Reqres.

#### Pasos para ingresar
- Ve a la página de inicio (/).

- Ingresa el correo electrónico: eve.holt@reqres.in.

- Ingresa una contraseña cualquiera (por ejemplo: 123456).

- Haz clic en el botón Entrar.

Si los datos son correctos, serás redirigido automáticamente al tablero de tareas (Dashboard) donde podrás gestionar tus tareas.

## Autor
Desarrollado por Erick Benzo - 2025
Proyecto de práctica para evaluación técnica

## Problemas 
Problemas de hidratacion con styled-components y SSR de Next
Solucion: En este caso hice el uso de una configuracion personalizada de babel en la cual se añade el plugin de styled-components con la opcion "ssr" true.

