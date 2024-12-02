-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-04-2024 a las 17:03:11
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `productsdb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `deleted` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `precio`, `deleted`) VALUES
(1, 'Nuevo nombre 1', 'Nueva descripción 1', 15.99, 3),
(2, 'Un producto', 'Descripción del producto', 50.24, 1),
(3, 'Producto de prueba', 'Descripción de prueba', 10.99, 1),
(4, 'Producto de prueba', 'Descripción de prueba', 10.99, 1),
(5, 'Producto de prueba 2', 'Descripción de prueba 2', 10.99, 1),
(6, 'Producto de prueba 3', 'Descripción de prueba 3', 10.99, 1),
(7, 'Producto de prueba 4', 'Descripción de prueba 4', 10.99, 1),
(8, 'Producto de prueba 5', 'Descripción de prueba 5', 10.99, 1),
(9, 'Producto de prueba 6', 'Descripción de prueba 6', 10.99, 1),
(10, 'Producto de prueba 7', 'Descripción de prueba 7', 10.99, 1),
(11, 'Producto de prueba 8', 'Descripción de prueba 8', 10.99, 1),
(12, 'Producto de prueba 8', 'Descripción de prueba 8', 10.99, 1),
(13, 'Producto de prueba 9', 'Descripción de prueba 9', 10.99, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;