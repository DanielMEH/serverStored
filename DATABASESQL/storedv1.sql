-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-02-2023 a las 19:51:27
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `storedv1`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `ADMIN_AUTH_LOGIN` (`email` VARCHAR(50))   BEGIN

SELECT password,idUsers,rol FROM admin WHERE correo = email;

 
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ADMIN_INSERT_ACCOUNT` (IN `email` VARCHAR(50), IN `pass` TEXT, IN `authCount` TEXT, IN `datecreate` DATE, IN `timeCreate` TIME, IN `roluser` VARCHAR(50), IN `AceptTerminosYcondiciones` TEXT)   BEGIN
INSERT INTO admin(idUsers,correo,password,authCuenta,fechaCreacion,hora,rol,AceptoterminosYcondiciones) VALUES(UUID(), email,pass,authCount,datecreate,timeCreate,roluser,AceptTerminosYcondiciones );

 
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ADMIN_RECOVERY__PASSWORD_CODE` (IN `email` VARCHAR(50), IN `codeAuth` INT)   BEGIN
 UPDATE admin SET codigo=codeAuth WHERE correo=email;
 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ADMIN_SELECT` (IN `id` CHAR(36))   BEGIN

SELECT * FROM admin WHERE idUsers = id;

 
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ADMIN_SELECT_CODE` (IN `email` VARCHAR(50))   BEGIN

SELECT codigo FROM admin WHERE correo = email;

 
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ADMIN_SELECT_EMAIL` (`email` VARCHAR(50))   BEGIN
  SELECT * FROM admin WHERE correo = email;
  
  END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ADMIN_STATE_ACCOUNT` (IN `id` CHAR(36), IN `state` TEXT)   BEGIN

UPDATE admin SET estado = state WHERE idUsers = id;

 
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ADMIN_UPDATE_DATA` (IN `id` CHAR(36), IN `nombre` VARCHAR(30), IN `documento` BIGINT, IN `tel` BIGINT, IN `nombreEmpresa` VARCHAR(50))   BEGIN
 UPDATE admin SET name= nombre, document=documento,telefono=tel, nombreTienda=nombreEmpresa WHERE idUsers = id;
 
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ADMIN_UPDATE_PASSWORD` (IN `email` VARCHAR(50), IN `pass` TEXT)   BEGIN

UPDATE admin SET password=pass WHERE correo = email;

 
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ADMIN_UPLOAD_IMG` (IN `iduser` CHAR(36), IN `imgURL` TEXT, IN `imgLD` TEXT)   BEGIN
 UPDATE admin SET imgURL= imgURL,imgLD=imgLD WHERE idUsers=iduser;
 
 END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `account`
--

CREATE TABLE `account` (
  `correo` varchar(50) DEFAULT NULL,
  `password` text DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `estado` text DEFAULT NULL,
  `hora` time DEFAULT NULL,
  `URLimage` text DEFAULT NULL,
  `imgId` text DEFAULT NULL,
  `idAccount` char(36) NOT NULL,
  `idUsers1` char(36) DEFAULT NULL,
  `rol` varchar(50) NOT NULL,
  `idModulo` char(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `account`
--

INSERT INTO `account` (`correo`, `password`, `fecha`, `estado`, `hora`, `URLimage`, `imgId`, `idAccount`, `idUsers1`, `rol`, `idModulo`) VALUES
('account1@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, '2efd28fc-a4b9-11ed-bebd-1078d241b29f', '212d24a0-a420-11ed-bebd-1078d241b29f', '', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admin`
--

CREATE TABLE `admin` (
  `idUsers` char(36) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `imgURL` text DEFAULT NULL,
  `imgLD` text DEFAULT NULL,
  `document` bigint(20) DEFAULT NULL,
  `password` text DEFAULT NULL,
  `authCuenta` text DEFAULT NULL,
  `estado` set('activo','inactivo') DEFAULT NULL,
  `correo` varchar(50) DEFAULT NULL,
  `codigo` int(11) DEFAULT NULL,
  `telefono` bigint(20) DEFAULT NULL,
  `nombreTienda` varchar(50) DEFAULT NULL,
  `fechaCreacion` date DEFAULT NULL,
  `hora` time NOT NULL,
  `rol` varchar(50) NOT NULL,
  `AceptoterminosYcondiciones` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `admin`
--

INSERT INTO `admin` (`idUsers`, `name`, `imgURL`, `imgLD`, `document`, `password`, `authCuenta`, `estado`, `correo`, `codigo`, `telefono`, `nombreTienda`, `fechaCreacion`, `hora`, `rol`, `AceptoterminosYcondiciones`) VALUES
('212d24a0-a420-11ed-bebd-1078d241b29f', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '00:00:00', '', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modulo`
--

CREATE TABLE `modulo` (
  `IDmodulo` char(36) NOT NULL,
  `titulo` varchar(30) NOT NULL,
  `descripcion` varchar(40) NOT NULL,
  `statusM` int(11) NOT NULL,
  `idAdminAcc` char(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `modulo`
--

INSERT INTO `modulo` (`IDmodulo`, `titulo`, `descripcion`, `statusM`, `idAdminAcc`) VALUES
('965ff5c7-a4ba-11ed-bebd-1078d241b29f', 'Dasboard', 'Dasboard', 1, '2efd28fc-a4b9-11ed-bebd-1078d241b29f'),
('ab64e37a-a4ba-11ed-bebd-1078d241b29f', 'Admin', 'Admin', 1, '2efd28fc-a4b9-11ed-bebd-1078d241b29f'),
('b68fb483-a4ba-11ed-bebd-1078d241b29f', 'Analityc', 'Analityc', 1, '2efd28fc-a4b9-11ed-bebd-1078d241b29f');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisos`
--

CREATE TABLE `permisos` (
  `idpermisions` char(36) NOT NULL,
  `idmodulCount` char(36) NOT NULL,
  `isAllowed` text DEFAULT NULL,
  `name` text DEFAULT NULL,
  `estado` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `permisos`
--

INSERT INTO `permisos` (`idpermisions`, `idmodulCount`, `isAllowed`, `name`, `estado`) VALUES
('76f9a2d9-a4bb-11ed-bebd-1078d241b29f', '965ff5c7-a4ba-11ed-bebd-1078d241b29f', 'Eliminar', 'EliminarTablas dasboard', 'Activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `services`
--

CREATE TABLE `services` (
  `idServices` char(36) NOT NULL,
  `dispositivo` text NOT NULL,
  `ip` text NOT NULL,
  `tokens` text NOT NULL,
  `fechaUltHour` text NOT NULL,
  `lugarConection` text NOT NULL,
  `idioma` varchar(30) NOT NULL,
  `navegador` text NOT NULL,
  `infoNavegIp` text NOT NULL,
  `ciudad` varchar(50) NOT NULL,
  `Pais` varchar(40) NOT NULL,
  `region` varchar(50) NOT NULL,
  `idAccountUsers` char(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`idAccount`),
  ADD KEY `fk_accUsers` (`idUsers1`);

--
-- Indices de la tabla `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`idUsers`);

--
-- Indices de la tabla `modulo`
--
ALTER TABLE `modulo`
  ADD PRIMARY KEY (`IDmodulo`),
  ADD KEY `aceso_,odul_usuario` (`idAdminAcc`);

--
-- Indices de la tabla `permisos`
--
ALTER TABLE `permisos`
  ADD KEY `accmodul_permisions` (`idmodulCount`);

--
-- Indices de la tabla `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`idServices`),
  ADD KEY `acce_usersfk` (`idAccountUsers`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `account`
--
ALTER TABLE `account`
  ADD CONSTRAINT `acce_users` FOREIGN KEY (`idUsers1`) REFERENCES `admin` (`idUsers`);

--
-- Filtros para la tabla `modulo`
--
ALTER TABLE `modulo`
  ADD CONSTRAINT `aceso_,odul_usuario` FOREIGN KEY (`idAdminAcc`) REFERENCES `account` (`idAccount`);

--
-- Filtros para la tabla `permisos`
--
ALTER TABLE `permisos`
  ADD CONSTRAINT `accmodul_permisions` FOREIGN KEY (`idmodulCount`) REFERENCES `modulo` (`IDmodulo`);

--
-- Filtros para la tabla `services`
--
ALTER TABLE `services`
  ADD CONSTRAINT `acc_usersfk` FOREIGN KEY (`idAccountUsers`) REFERENCES `account` (`idAccount`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
