# CRUD de Productos con React y Backend en PHP

Este proyecto implementa un CRUD de productos utilizando React para el frontend y PHP para el backend. Se conecta a una base de datos MySQL a través de una API (`api.php`) y utiliza diversas herramientas y bibliotecas modernas para mejorar la funcionalidad y el estilo.

## Características

- **Frontend**: React con Tailwind CSS.
- **Backend**: API en PHP (`api.php`) utilizando XAMPP como servidor local.
- **Base de datos**: MySQL con la tabla `productosdb`.
- **Visualización de datos**: Uso de `react-data-table-component` para mostrar una tabla de productos.
- **Rutas**: Configuración de rutas internas con React Router.
- **CRUD**: Crear, leer, actualizar y eliminar productos.

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- [Node.js](https://nodejs.org) (incluye npm)
- [XAMPP](https://www.apachefriends.org/)
- Un navegador compatible con ES6+

## Instalación

### Backend

1. Instala y configura XAMPP.
2. Copia el archivo `api.php` en el directorio `htdocs` de XAMPP.
3. Crea una base de datos llamada `productosdb` en phpMyAdmin y configura la tabla según sea necesario.
4. Asegúrate de que Apache y MySQL estén corriendo desde el panel de control de XAMPP.

### Frontend

1. Clona este repositorio:
   ```bash
   git clone https://github.com/KvinCodes/practica01-react.git
   cd practica01-react
   
2. Instala las dependencias:
   ```bash
   npm install
3. Ejecutar el servidor de desarrollo:
   ```bash
   npm start
Esto abrirá la aplicación en http://localhost:3000/

## Configuración del Backend

3. Subir la API a XAMPP:
   1. Copia el archivo (`api.php`) dentro de la carpeta htdocs en tu instalación de XAMPP.
   2. Asegúrate de que el servidor Apache esté en ejecución.
  
4. Crear la base de datos:
   1. Abre phpMyAdmin (generalmente en http://localhost/phpmyadmin).
   2. Importa el archivo productosdb.sql que se encuentra en la carpeta backend/
  
## Uso del CRUD

1. Accede al frontend en `http://localhost:3000/catalog`.
2. Existen dos tablas, ambas muestran los productos obtenidos desde la base de datos.
3. Usa las opciones disponibles para:
   1. Crear un nuevo producto.
   2. Editar un producto existente.
   3. Eliminar un producto.
