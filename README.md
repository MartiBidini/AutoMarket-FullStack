# 🚗 AutoMarket - Plataforma de Vehículos Full Stack

**AutoMarket** es una pagina web moderna para la gestión y visualización de un catálogo de vehículos en tiempo real. Conecta un Frontend dinámico con una API .NET y una base de datos SQL Server.

---

## Capturas de pantalla:

<img width="1918" height="907" alt="image" src="https://github.com/user-attachments/assets/aca85c8f-b7ef-499f-bf43-bcf46da38bb1" />

<img width="1900" height="907" alt="image" src="https://github.com/user-attachments/assets/60c6e3e6-6a14-46b9-84ba-6d5b98f1a078" />

<img width="1901" height="915" alt="foto publciar" src="https://github.com/user-attachments/assets/3ecac76f-5d91-40ae-b185-93a661e4aa89" />

<img width="1893" height="911" alt="image" src="https://github.com/user-attachments/assets/877e120a-fa3f-47da-bcfe-24060fc69dcf" />

<img width="1915" height="907" alt="modal auto" src="https://github.com/user-attachments/assets/d8092427-248f-4aee-b55c-166e5b678adc" />

<img width="1900" height="915" alt="image" src="https://github.com/user-attachments/assets/d1e54e8a-7821-4a5d-b843-3bf0b939bf4b" />

---

## Funcionalidades Principales

* ** Buscador Inteligente:** Filtrado en tiempo real por marca o modelo.
* ** Filtros Avanzados:** Búsqueda por rango de precios (Mín/Máx), categorías y ordenamiento.
* ** Carga Dinámica:** El catálogo se alimenta desde una base de datos SQL, permitiendo actualizaciones instantáneas de precio y stock.
* ** 100% Responsive:** Diseño adaptado a celulares (Mobile First) y escritorio.
* ** Ventana Modal:** Visualización rápida de detalles técnicos sin recargar la página.
* ** Módulo de Contacto:** Formulario para publicar vehículos y sistema de notificaciones visuales.

---

## 🛠️ Tecnologías (Stack)

El proyecto utiliza una arquitectura profesional de **3 Capas**:

* **Frontend:** HTML5, CSS3 (Grid/Flexbox), JavaScript .
* **Backend:** C# .NET 8 (ASP.NET Core Web API).
* **Base de Datos:** SQL Server Express.
* **ORM:** Entity Framework Core.

---

## 🚀 Cómo ejecutar el proyecto

Sigue estos pasos para correr el sistema en tu computadora:

### 1. Base de Datos
* Asegurate de tener **SQL Server Express** instalado.
* Ejecuta el script `BaseDeDatos/setup.sql` (incluido en el repo) para crear la tabla `Vehiculos` y cargar los datos de prueba.

### 2. Backend (API)
* Abre la carpeta `Backend` con **Visual Studio**.
* Verifica la cadena de conexión en `appsettings.json`.
* Ejecuta el proyecto (`F5`). La API quedará escuchando en `https://localhost:7258`.

### 3. Frontend
* Abre la carpeta `Frontend` con **VS Code**.
* Abre el archivo `login.html` en tu navegador.
* ¡Listo! La web se conectará automáticamente a tu API local.

---
