# 🛒 E-Commerce Backend API — NestJS & PostgreSQL (Módulo 4)

API RESTful escalable y segura desarrollada como proyecto integrador de especialización Backend del **Módulo 4** en **Henry Bootcamp**, construida con **NestJS**, **TypeScript**, **TypeORM**, **PostgreSQL** y documentación interactiva con **Swagger / OpenAPI**.

## 📋 Descripción del Proyecto

Este servicio backend gestiona la lógica central de una plataforma de comercio electrónico, incluyendo autenticación con JWT, control de acceso basado en roles (RBAC), precarga automática de datos (*seeding*), carga de imágenes en la nube y procesamiento transaccional de órdenes de compra.

### ✨ Funcionalidades Principales

* **Arquitectura Modular en NestJS:** Organización limpia en módulos (`Auth`, `Users`, `Products`, `Categories`, `Orders`, `Files`), controladores, servicios, repositorios, pipes e interceptores.

* **Autenticación y Autorización (JWT + Guards):** Registro e inicio de sesión con contraseñas encriptadas (`bcrypt`), generación de tokens JWT y protección de rutas mediante `AuthGuard` y `RolesGuard` (`Admin` / `User`).

* **Gestión Transaccional de Órdenes:** Creación de pedidos verificando stock disponible en tiempo real, cálculo automático del total y actualización atómica de inventario.

* **Data Seeding Automatizado:** Precarga inicial de categorías y productos al levantar la aplicación sin duplicar registros existentes.

* **Carga de Imágenes:** Integración con **Cloudinary** y validación de formato y tamaño mediante `ParseFilePipe`.

* **Documentación OpenAPI / Swagger:** Especificación completa de endpoints, DTOs, esquemas de respuesta y autenticación Bearer lista para probar desde el navegador.

## 🛠️ Tecnologías Utilizadas

* **Framework & Lenguaje:** NestJS, Node.js, TypeScript.

* **Base de Datos & ORM:** PostgreSQL, TypeORM.

* **Seguridad & Validación:** JWT (`@nestjs/jwt`), `bcrypt`, `class-validator`, `class-transformer`.

* **Servicios & Documentación:** Swagger / OpenAPI, Cloudinary, Docker.

## 🚀 Cómo ejecutar el proyecto localmente

1. **Clona este repositorio:**

   ```
   git clone https://github.com/MGaBustos/NOMBRE-DE-TU-REPO-M4.git
   
   ```

2. **Ingresa a la carpeta del proyecto:**

   ```
   cd NOMBRE-DE-TU-REPO-M4/e-commerce-mgabustos
   
   ```

3. **Configura las variables de entorno (`.env`):**

   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=tu_usuario_postgres
   DB_PASSWORD=tu_password_postgres
   DB_NAME=ecommerce_db
   JWT_SECRET=tu_clave_secreta_jwt
   CLOUDINARY_CLOUD_NAME=tu_cloud_name
   CLOUDINARY_API_KEY=tu_api_key
   CLOUDINARY_API_SECRET=tu_api_secret
   
   ```

4. **Instala las dependencias y levanta el servidor:**

   ```
   npm install
   npm run start:dev
   
   ```

5. **Accede a la documentación interactiva de la API:**

   * Abre tu navegador en `http://localhost:3000/api` para explorar y probar todos los endpoints en Swagger UI.

## 👨‍💻 Autor

**Matias Gabriel Bustos**

Full Stack Web Developer | Enfoque Backend

* **LinkedIn:** [linkedin.com/in/matias-bustos-9045642a8](https://www.linkedin.com/in/matias-bustos-9045642a8/)

* **GitHub:** [@MGaBustos](https://github.com/MGaBustos)

* **Email:** matiasgabrielbustos07@gmail.com