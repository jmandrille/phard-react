# PHARD E-commerce - Proyecto React

PHARD E-commerce es una aplicación web de frontend para una tienda online, desarrollada con React y Vite. La plataforma permite a los usuarios navegar por un catálogo de productos, ver detalles individuales, filtrar por categorías y gestionar un carrito de compras. Incorpora un sistema de autenticación simulado para proteger rutas específicas como el proceso de checkout.

## Funcionalidades Implementadas

* **Catálogo de Productos:**
    * Visualización de productos desde Fake Store API.
    * Imágenes de producto en formato cuadrado (con `object-fit: contain`).
    * Manejo de estados de carga y errores.
    * Filtro y navegación por categorías dinámicas.
* **Detalle de Producto:** Rutas dinámicas para vista individual.
* **Carrito de Compras:**
    * Agregar, actualizar cantidad, eliminar ítems, vaciar carrito.
    * Cálculo de total.
    * Estado global con React Context API y persistencia en `localStorage`.
* **Navegación:**
    * Ruteo con React Router DOM.
    * Rutas estáticas (Inicio, Productos, Contacto, Carrito).
    * Rutas dinámicas (Detalle de Producto, Categorías).
    * Página 404.
* **Autenticación (Simulada):**
    * Login/Logout (mock: usuario `user`, contraseña `pass`).
    * Ruta protegida para `/checkout`.
    * Modal de invitación a login para checkout.
* **Diseño y Branding:**
    * Interfaz responsiva con React Bootstrap.
    * Favicon, logos y título de pestaña personalizados para la marca "PHARD".

## Tecnologías Utilizadas

* **Framework/Librería Principal:** [React](https://reactjs.org/) (v18+)
* **Herramienta de Build:** [Vite](https://vitejs.dev/)
* **Lenguaje:** JavaScript (ES6+)
* **Gestión de Estado:** React Context API
* **Ruteo:** [React Router DOM](https://reactrouter.com/) (v6+)
* **UI Framework:** [React Bootstrap](https://react-bootstrap.github.io/) & [Bootstrap 5](https://getbootstrap.com/)
* **API Externa:** [Fake Store API](https://fakestoreapi.com/) (para datos de productos y categorías)
* **Persistencia Local:** `localStorage` (para carrito y estado de autenticación)
* **Control de Versiones:** Git & GitHub

## Configuración y Puesta en Marcha del Proyecto

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local:

### Prerrequisitos

* Node.js (v18 o superior recomendado) - Puedes descargarlo desde [nodejs.org](https://nodejs.org/)
* npm (usualmente viene con Node.js) o Yarn

### Instalación

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/jmandrille/phard-react.git
    cd tu-repositorio-phard
    ```

2.  **Instala las dependencias del proyecto:**
    ```bash
    npm install
    ```
    *(O `yarn install` si usas Yarn)*

### Ejecución

1.  **Iniciar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    Esto iniciará la aplicación en modo de desarrollo. Generalmente estará disponible en `http://localhost:5173` (Vite te indicará la URL en la consola). La aplicación se recargará automáticamente si realizas cambios en el código.

## Scripts Disponibles

En el directorio del proyecto, puedes ejecutar:

* `npm run dev`: Inicia la aplicación en modo de desarrollo.
* `npm run build`: Compila la aplicación para producción en la carpeta `dist/`.
* `npm run lint`: Ejecuta el linter (si está configurado por Vite, usualmente ESLint).
* `npm run preview`: Sirve localmente la build de producción desde la carpeta `dist/` para previsualizarla.

## Estructura de Carpetas (Resumen)

├── public/               # Assets estáticos (favicon, etc.)
├── src/
│   ├── assets/           # Imágenes, fuentes, etc., usados en componentes
│   ├── components/       # Componentes reutilizables (Layout, Products, Cart, ProtectedRoute)
│   ├── contexts/         # Contextos de React (CartContext, AuthContext)
│   ├── pages/            # Componentes que representan páginas (HomePage, ProductosPage, etc.)
│   ├── App.css           # Estilos globales de la aplicación
│   ├── App.jsx           # Componente principal de la aplicación y configuración de rutas
│   ├── index.css         # Estilos base y reseteos
│   └── main.jsx          # Punto de entrada de la aplicación
├── .eslintrc.cjs         # Configuración de ESLint
├── .gitignore            # Archivos ignorados por Git
├── index.html            # Plantilla HTML principal
├── package.json          # Metadatos del proyecto y dependencias
├── README.md             # Este archivo
└── vite.config.js        # Configuración de Vite