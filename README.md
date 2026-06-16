# 🛒 Product Catalog & Store Application

Una aplicación moderna de comercio electrónico tipo SPA (Single Page Application) construida con **React**, **TypeScript** y **Material UI**. El proyecto implementa renderizado eficiente de datos mediante scroll infinito, filtros avanzados sincronizados con la URL y una arquitectura limpia y desacoplada.

---

## 🏗️ Arquitectura del Proyecto

Este proyecto se ha estructurado bajo los principios de **Separación de Responsabilidades (Separation of Concerns)** y un enfoque modular escalable. La arquitectura desacopla estrictamente la lógica de negocio, la gestión del estado global y la comunicación con servicios externos de la capa de presentación (UI).

### 📁 Estructura de Directorios

```text
src/
├── components/          # Componentes de UI puramente visuales y reutilizables
├────────────── components/products # UI para productos
├────────────── components/shoppingCart # UI para el carrito de compras
├────────────── components/error # UI para manejo de errores
├────────────── components/common # UI común para varios componentes
├────────────── components/detailsProduct # UI para detalles de productos
├── hooks/               # Capa de lógica de negocio y estado (Zustand Custom Hooks)
├── services/            # Capa de infraestructura (Llamados a API, servicios de Checkout)
└── test/                # Suite de pruebas unitarias y de flujo de integración
```

## 🛠️ Tecnologías y Dependencias

El proyecto utiliza un ecosistema robusto para garantizar el rendimiento, el manejo de estado y una interfaz de usuario pulida:

* **UI & Estilos:** [@mui/material](https://mui.com/) (Material UI) junto con Emotion para un diseño responsivo y componentes listos para producción.
* **Enrutamiento:** `react-router-dom` para la gestión de rutas y sincronización de filtros a través de la URL (`searchParams`).
* **Asincronía y Caché:** `@tanstack/react-query` para la gestión de peticiones HTTP con soporte nativo de Suspense e Infinite Queries.
* **Estado Global:** `zustand` para un manejo de estado ligero, rápido y centralizado (como el carrito de compras).
* **Detección de Scroll:** `react-intersection-observer` para activar la carga perezosa de productos al hacer scroll.
* **Cliente HTTP:** `axios` (o fetch configurado) para la comunicación con la API de DummyJSON.
* **Error Boundary:** `react-error-boundary` para manejar los errores globales.
* **Pruebas:** `jest` `@testing-library` para manejar pruebas unitarias y integración.

### 💻 Comandos de Instalación

Para replicar el entorno de desarrollo y añadir todas las dependencias ejecutadas, utiliza los siguientes comandos en tu terminal:

```bash
# Instalación de dependencias
npm install 

# Iniciar la aplicación en desarrollo
npm run dev 

# Iniciar las pruebas
npm run test

# Iniciar las pruebas con cobertura
npm run test:coverage

```