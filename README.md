# 🚗 AutoMarket - Plataforma de Vehículos Full Stack

**AutoMarket** es una aplicación web moderna para la gestión y visualización de un catálogo de vehículos en tiempo real. Conecta un Frontend dinámico con una API .NET y una base de datos SQL Server.

---

## 📸 Capturas de Pantalla

| Catálogo Principal | Detalle de Vehículo (Modal) |
|:---:|:---:|
| ![Catalogo](ruta/a/tu/imagen_catalogo.png) | ![Modal](ruta/a/tu/imagen_modal.png) |
| *Vista general con filtros y buscador* | *Vista de detalle con especificaciones* |

> *Nota: Reemplaza `ruta/a/tu/imagen...` con los links de tus fotos subidas.*

---

## ✨ Funcionalidades Principales

Este sistema reemplaza los catálogos estáticos por una experiencia 100% dinámica:

* **🔎 Buscador Inteligente:** Filtrado en tiempo real por marca o modelo.
* **🎚️ Filtros Avanzados:** Búsqueda por rango de precios (Mín/Máx), categorías y ordenamiento.
* **⚡ Carga Dinámica:** El catálogo se alimenta desde una base de datos SQL, permitiendo actualizaciones instantáneas de precio y stock.
* **📱 100% Responsive:** Diseño adaptado a celulares (Mobile First) y escritorio.
* **🖼️ Ventana Modal:** Visualización rápida de detalles técnicos sin recargar la página.
* **📩 Módulo de Contacto:** Formulario para publicar vehículos y sistema de notificaciones visuales.

---

## 🛠️ Tecnologías (Stack)

El proyecto utiliza una arquitectura profesional de **3 Capas**:

* **Frontend:** HTML5, CSS3 (Grid/Flexbox), JavaScript Vanilla.
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
* Abre el archivo `index.html` en tu navegador.
* ¡Listo! La web se conectará automáticamente a tu API local.

---

### 👤 Autor

**Martiniano Bidini** Estudiante de Ingeniería de Software | Desarrollador .NET Trainee  
[LinkedIn](Tu_Link_De_LinkedIn)