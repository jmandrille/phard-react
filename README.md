# PHARD E-commerce - Proyecto Final de React

PHARD E-commerce es una aplicación web front-end completa para una tienda online, desarrollada con React y Vite. La plataforma permite a los usuarios navegar por un catálogo de productos, filtrar por categorías y búsqueda, y gestionar un carrito de compras. Incluye un panel de administración protegido para la gestión de productos (CRUD) y un historial de pedidos para usuarios registrados.


**URL del sitio desplegado:** [https://javier-mandrilletalento2025.vercel.app/](https://javier-mandrilletalento2025.vercel.app/)

---

## Funcionalidades Implementadas

### Para Clientes
* **Catálogo de Productos:** Visualización de productos desde una API personalizada (MockAPI), con paginación y ordenamiento de nuevos productos primero.
* **Búsqueda y Filtros:** Búsqueda en tiempo real por nombre de producto y filtrado por categorías dinámicas.
* **Detalle de Producto:** Rutas dinámicas para una vista detallada de cada ítem.
* **Carrito de Compras:** Funcionalidad completa para agregar, modificar cantidad, y eliminar productos. El estado es global (Context API) y persistente (`localStorage`).
* **Autenticación de Usuarios:** Sistema de login/logout con una página de formulario dedicada. El estado de la sesión persiste.
* **Checkout Simulado:** Flujo de compra protegido que guarda un registro del pedido y vacía el carrito.
* **Historial de Pedidos:** Página protegida para que los usuarios vean un listado de sus compras anteriores.

### Para Administradores
* **Panel de Gestión:** Dashboard protegido para administrar el inventario.
* **CRUD Completo de Productos:**
    * **Crear:** Formulario con validaciones para agregar nuevos productos a la API.
    * **Leer:** Tabla con todos los productos, mostrando ID, nombre, categoría y precio.
    * **Actualizar:** Formulario reutilizable para editar la información de un producto existente.
    * **Eliminar:** Opción para borrar productos con un diálogo de confirmación.

---

## Tecnologías Utilizadas

* **Framework:** **React 19**
* **Herramienta de Build:** **Vite**
* **Lenguaje:** JavaScript (ES6+)
* **Gestión de Estado:** **React Context API** para un manejo global y modular del carrito, productos y autenticación.
* **Ruteo:** **React Router DOM v6** para la navegación y protección de rutas.
* **UI Framework:** **React Bootstrap** & **Bootstrap 5** para un diseño responsivo y componentes de interfaz.
* **API:** **MockAPI** para la persistencia de datos de productos y pedidos (CRUD completo).
* **Notificaciones:** **React Toastify** para feedback al usuario.
* **Iconos:** **React Icons** para mejorar la interfaz visual.
* **SEO:** **Tags nativos** (`<title>`, `<meta>`) para la gestión del head del documento.

---

## Instalación y Puesta en Marcha Local

### Prerrequisitos
* Node.js (v18 o superior)
* npm

### Pasos

1.  **Clona el repositorio:**
    ```bash
    git clone [https://github.com/jmandrille/phard-react.git](https://github.com/jmandrille/phard-react.git)
    cd phard-react
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Ejecuta el proyecto:**
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:5173`.

### Credenciales de Prueba
* **Usuario:** `user`
* **Contraseña:** `pass`

---

## Scripts Disponibles

* `npm run dev`: Inicia el servidor de desarrollo.
* `npm run build`: Compila la aplicación para producción.
* `npm run preview`: Previsualiza la build de producción localmente.