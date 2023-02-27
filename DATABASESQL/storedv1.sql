-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-02-2023 a las 02:32:01
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

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

CREATE DEFINER=`root`@`localhost` PROCEDURE `ASIGNED_PERMISION_USER_ACCOUNT` (IN `idModuleAcc` CHAR(36), IN `autorized` TEXT, IN `name_permise` TEXT, IN `state_permise` TEXT)   BEGIN
INSERT INTO permisos(idpermisions,idModulCount,isAllowed,name,estado) VALUES (UUID(),idModuleAcc,autorized,name_permise,state_permise);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ASSIGNED_MODULE_USER_REGISTER` (IN `title` VARCHAR(30), IN `description` VARCHAR(40), IN `state` INT, IN `idUserAsigned` CHAR(36))   BEGIN
INSERT INTO modulo(IDmodulo, titulo, descripcion, statusM,idAdminAcc) VALUES (UUID(),title,description,state,idUserAsigned);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `AUTH_GOOGLE` (IN `email` VARCHAR(50), IN `nombre` VARCHAR(30), IN `imgurl` TEXT, IN `fecha` DATE, IN `times` TIME, IN `risAllowed` VARCHAR(50), IN `state` TEXT)   BEGIN
INSERT INTO admin(idUsers,correo,name,imgLD,fechaCreacion,hora,estado)VALUES(UUID(),email,nombre,imgurl,fecha,times,risAllowed,state);

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `COUNT_STATE_USER` (IN `id` CHAR(36))   BEGIN
SELECT COUNT(estado) as totalActive FROM account WHERE estado ="Activo" AND idUsers1 =id;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `COUNT_STATE_USER_INACTIVO` (IN `id` CHAR(36))   BEGIN
SELECT COUNT(estado) as totalActive FROM account WHERE estado ="Inactivo" AND idUsers1 =id;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `CREATE_USER` (IN `email` VARCHAR(50), IN `pass` TEXT, IN `dates` TEXT, IN `idAdmin` CHAR(36), IN `TimesHours` TEXT, IN `state` TEXT)   BEGIN
INSERT INTO account(idAccount,correo,password,idUsers1,fecha,hora,estado) VALUES(UUID(),email,pass,idAdmin,dates,TimesHours,state); 
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `DELETE_ALL_USERS` (IN `idUser` CHAR(36), IN `idModul` CHAR(36))   BEGIN
DELETE p.* from permisos p INNER JOIN modulo m ON p.idmodulCount = m.IDmodulo WHERE p.idmodulCount=idModul;
DELETE m.* FROM modulo m INNER JOIN account ac ON m.idAdminAcc = ac.idAccount WHERE m.idAdminAcc = idUser;
DELETE ac.* FROM account ac  WHERE ac.idAccount  = idUser;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GET_COUNT_USERS` (`id` CHAR(36))   BEGIN
SELECT COUNT(*) as total FROM account  WHERE idUsers1 = id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GET_MODULE_ACCOUNT_USER` (`id` CHAR(36))   BEGIN

SELECT IDmodulo FROM modulo WHERE idAdminAcc= id;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GET_USER` (IN `id` CHAR(36))   BEGIN
SELECT ac.* FROM account ac WHERE idUsers1 = id ORDER by ac.fecha DESC ;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GET_USER_CREATE` (`email` VARCHAR(50))   BEGIN
SELECT * FROM account  WHERE correo = email;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GET_USER_SECOND_USER` (`email` VARCHAR(50))   BEGIN

SELECT 	idAccount FROM account WHERE correo = email;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `INSERT_MODULE_USER` (IN `title` VARCHAR(30), IN `description` VARCHAR(40), IN `id` CHAR(36))   BEGIN
Insert INTO modulo (IDmodulo,titulo, descripcion,idAdminAcc)  VALUES(UUID(),title, description,id);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SELECT_ALL_MODULE_USERS` (`id` CHAR(36))   BEGIN
      SELECT m.IDmodulo FROM modulo m WHERE m.idAdminAcc = id;
                                         
  END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `USER_LOGIN` (IN `email` VARCHAR(50))   BEGIN
select idAccount, correo, password from account where correo=email;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `account`
--

CREATE TABLE `account` (
  `correo` varchar(50) DEFAULT NULL,
  `password` text DEFAULT NULL,
  `fecha` text DEFAULT NULL,
  `estado` text DEFAULT NULL,
  `hora` text DEFAULT NULL,
  `URLimage` text DEFAULT NULL,
  `imgId` text DEFAULT NULL,
  `idAccount` char(36) NOT NULL,
  `idUsers1` char(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `account`
--

INSERT INTO `account` (`correo`, `password`, `fecha`, `estado`, `hora`, `URLimage`, `imgId`, `idAccount`, `idUsers1`) VALUES
('jhone@gmail.com', '$2b$10$x3DE5v9Iie/myXPxupE6feRvu2/2kv7hgkycAXT0lLPZvO7vsMJQi', 'febrero 26º 2023', 'Inactivo', '8:31:25 pm', NULL, NULL, '735ce2a4-b63e-11ed-82f9-1078d241b29f', '2a9013d0-b58b-11ed-9cc2-1078d241b29f'),
('german@gmail.com', '$2b$10$epfv8oaEWHKhX97ZYSvryOozNU1iYvW5L2fE8EpnneEEFi2LGjsey', 'febrero 26º 2023', 'Activo', '5:32:41 pm', NULL, NULL, '7b668ab0-b625-11ed-82f9-1078d241b29f', '2a9013d0-b58b-11ed-9cc2-1078d241b29f'),
('Danielospina@gmail.com', '$2b$10$AXbTWm.R.h2l840DT8WmhuDjZM1DR1MUhjn/sZzgj3UFhlThSXdAa', 'febrero 26º 2023', 'Inactivo', '5:33:05 pm', NULL, NULL, '8950ad72-b625-11ed-82f9-1078d241b29f', '2a9013d0-b58b-11ed-9cc2-1078d241b29f'),
('Danielospina2@gmail.com', '$2b$10$KTOTnl2ytxhAlrhiPB3gve70u1.3OCqM0Z1wq/wXlRV4/I67a74hW', 'febrero 26º 2023', 'Inactivo', '5:33:16 pm', NULL, NULL, '9020cf95-b625-11ed-82f9-1078d241b29f', '2a9013d0-b58b-11ed-9cc2-1078d241b29f'),
('usuario1@gmail.com', '$2b$10$veZAsYWbVVieJC4M/c7dq.VhopR4x0OyuvYKk7Coauk4OVaPsn4ES', 'febrero 26º 2023', 'Activo', '5:33:41 pm', NULL, NULL, '9eff0270-b625-11ed-82f9-1078d241b29f', '2a9013d0-b58b-11ed-9cc2-1078d241b29f'),
('usuario2@gmail.com', '$2b$10$veZAsYWbVVieJC4M/c7dq.0VewpCaENt6WvDOfIZ2vNdR4TB9nzi2', 'febrero 26º 2023', 'Activo', '5:33:41 pm', NULL, NULL, '9f14650c-b625-11ed-82f9-1078d241b29f', '2a9013d0-b58b-11ed-9cc2-1078d241b29f'),
('usuario3@gmail.com', '$2b$10$veZAsYWbVVieJC4M/c7dq.0VewpCaENt6WvDOfIZ2vNdR4TB9nzi2', 'febrero 26º 2023', 'Activo', '5:33:41 pm', NULL, NULL, '9f265a49-b625-11ed-82f9-1078d241b29f', '2a9013d0-b58b-11ed-9cc2-1078d241b29f'),
('usuario4@gmail.com', '$2b$10$veZAsYWbVVieJC4M/c7dq.VhopR4x0OyuvYKk7Coauk4OVaPsn4ES', 'febrero 26º 2023', 'Activo', '5:33:41 pm', NULL, NULL, '9f32f6d1-b625-11ed-82f9-1078d241b29f', '2a9013d0-b58b-11ed-9cc2-1078d241b29f'),
('usuario5@gmail.com', '$2b$10$veZAsYWbVVieJC4M/c7dq.VhopR4x0OyuvYKk7Coauk4OVaPsn4ES', 'febrero 26º 2023', 'Activo', '5:33:41 pm', NULL, NULL, '9f44cf8e-b625-11ed-82f9-1078d241b29f', '2a9013d0-b58b-11ed-9cc2-1078d241b29f'),
('usuario6@gmail.com', '$2b$10$veZAsYWbVVieJC4M/c7dq.VhopR4x0OyuvYKk7Coauk4OVaPsn4ES', 'febrero 26º 2023', 'Activo', '5:33:41 pm', NULL, NULL, '9f581468-b625-11ed-82f9-1078d241b29f', '2a9013d0-b58b-11ed-9cc2-1078d241b29f'),
('usuario7@gmail.com', '$2b$10$veZAsYWbVVieJC4M/c7dq.VhopR4x0OyuvYKk7Coauk4OVaPsn4ES', 'febrero 26º 2023', 'Activo', '5:33:41 pm', NULL, NULL, '9f6b3b87-b625-11ed-82f9-1078d241b29f', '2a9013d0-b58b-11ed-9cc2-1078d241b29f'),
('usuario8@gmail.com', '$2b$10$veZAsYWbVVieJC4M/c7dq.VhopR4x0OyuvYKk7Coauk4OVaPsn4ES', 'febrero 26º 2023', 'Activo', '5:33:41 pm', NULL, NULL, '9f7caeec-b625-11ed-82f9-1078d241b29f', '2a9013d0-b58b-11ed-9cc2-1078d241b29f'),
('usuario9@gmail.com', '$2b$10$veZAsYWbVVieJC4M/c7dq.VhopR4x0OyuvYKk7Coauk4OVaPsn4ES', 'febrero 26º 2023', 'Activo', '5:33:41 pm', NULL, NULL, '9f8e9e25-b625-11ed-82f9-1078d241b29f', '2a9013d0-b58b-11ed-9cc2-1078d241b29f'),
('usuario10@gmail.com', '$2b$10$veZAsYWbVVieJC4M/c7dq.VhopR4x0OyuvYKk7Coauk4OVaPsn4ES', 'febrero 26º 2023', 'Activo', '5:33:41 pm', NULL, NULL, '9fa000e3-b625-11ed-82f9-1078d241b29f', '2a9013d0-b58b-11ed-9cc2-1078d241b29f'),
('usuario11@gmail.com', '$2b$10$veZAsYWbVVieJC4M/c7dq.VhopR4x0OyuvYKk7Coauk4OVaPsn4ES', 'febrero 26º 2023', 'Activo', '5:33:41 pm', NULL, NULL, '9fb1a6b5-b625-11ed-82f9-1078d241b29f', '2a9013d0-b58b-11ed-9cc2-1078d241b29f'),
('usuario12@gmail.com', '$2b$10$veZAsYWbVVieJC4M/c7dq.VhopR4x0OyuvYKk7Coauk4OVaPsn4ES', 'febrero 26º 2023', 'Activo', '5:33:41 pm', NULL, NULL, '9fc30d88-b625-11ed-82f9-1078d241b29f', '2a9013d0-b58b-11ed-9cc2-1078d241b29f'),
('usuario13@gmail.com', '$2b$10$veZAsYWbVVieJC4M/c7dq.VhopR4x0OyuvYKk7Coauk4OVaPsn4ES', 'febrero 26º 2023', 'Activo', '5:33:41 pm', NULL, NULL, '9fd49e0c-b625-11ed-82f9-1078d241b29f', '2a9013d0-b58b-11ed-9cc2-1078d241b29f'),
('usuario114@gmail.com', '$2b$10$veZAsYWbVVieJC4M/c7dq.VhopR4x0OyuvYKk7Coauk4OVaPsn4ES', 'febrero 26º 2023', 'Activo', '5:33:41 pm', NULL, NULL, '9fe63eb0-b625-11ed-82f9-1078d241b29f', '2a9013d0-b58b-11ed-9cc2-1078d241b29f'),
('usuario15@gmail.com', '$2b$10$veZAsYWbVVieJC4M/c7dq.VhopR4x0OyuvYKk7Coauk4OVaPsn4ES', 'febrero 26º 2023', 'Activo', '5:33:41 pm', NULL, NULL, '9ff7d22f-b625-11ed-82f9-1078d241b29f', '2a9013d0-b58b-11ed-9cc2-1078d241b29f'),
('usuario116@gmail.com', '$2b$10$veZAsYWbVVieJC4M/c7dq.VhopR4x0OyuvYKk7Coauk4OVaPsn4ES', 'febrero 26º 2023', 'Activo', '5:33:41 pm', NULL, NULL, 'a009766d-b625-11ed-82f9-1078d241b29f', '2a9013d0-b58b-11ed-9cc2-1078d241b29f'),
('usuario17@gmail.com', '$2b$10$veZAsYWbVVieJC4M/c7dq.VhopR4x0OyuvYKk7Coauk4OVaPsn4ES', 'febrero 26º 2023', 'Activo', '5:33:41 pm', NULL, NULL, 'a01b22b0-b625-11ed-82f9-1078d241b29f', '2a9013d0-b58b-11ed-9cc2-1078d241b29f'),
('usuario18@gmail.com', '$2b$10$veZAsYWbVVieJC4M/c7dq.VhopR4x0OyuvYKk7Coauk4OVaPsn4ES', 'febrero 26º 2023', 'Activo', '5:33:41 pm', NULL, NULL, 'a02d416a-b625-11ed-82f9-1078d241b29f', '2a9013d0-b58b-11ed-9cc2-1078d241b29f');

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
('2a9013d0-b58b-11ed-9cc2-1078d241b29f', 'Daniel ospina', NULL, 'https://lh3.googleusercontent.com/a/AGNmyxb-4h52q218wbkuRBjA-rRfKZLmlMoMnPwP-9fn-A=s96-c', NULL, NULL, NULL, 'activo', 'ospinaortizjuandaniel351@gmail.com', NULL, NULL, NULL, '2023-02-25', '23:08:03', 'superAdmin', '');

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
('73611f5f-b63e-11ed-82f9-1078d241b29f', 'inventario', 'inventario', 0, '735ce2a4-b63e-11ed-82f9-1078d241b29f'),
('7b6ae987-b625-11ed-82f9-1078d241b29f', 'inventario', 'inventario', 0, '7b668ab0-b625-11ed-82f9-1078d241b29f'),
('89611e2d-b625-11ed-82f9-1078d241b29f', 'inventario', 'inventario', 0, '8950ad72-b625-11ed-82f9-1078d241b29f'),
('9025e0f2-b625-11ed-82f9-1078d241b29f', 'inventario', 'inventario', 0, '9020cf95-b625-11ed-82f9-1078d241b29f'),
('9f149481-b625-11ed-82f9-1078d241b29f', 'inventario', 'inventario', 0, '9eff0270-b625-11ed-82f9-1078d241b29f'),
('9f1eb9f0-b625-11ed-82f9-1078d241b29f', 'inventario', 'inventario', 0, '9f14650c-b625-11ed-82f9-1078d241b29f'),
('9f28ed1c-b625-11ed-82f9-1078d241b29f', 'inventario', 'inventario', 0, '9f265a49-b625-11ed-82f9-1078d241b29f'),
('9f35af8b-b625-11ed-82f9-1078d241b29f', 'inventario', 'inventario', 0, '9f32f6d1-b625-11ed-82f9-1078d241b29f'),
('9f48b1ac-b625-11ed-82f9-1078d241b29f', 'inventario', 'inventario', 0, '9f44cf8e-b625-11ed-82f9-1078d241b29f'),
('9f5b6dea-b625-11ed-82f9-1078d241b29f', 'inventario', 'inventario', 0, '9f581468-b625-11ed-82f9-1078d241b29f'),
('9f790b2b-b625-11ed-82f9-1078d241b29f', 'inventario', 'inventario', 0, '9f6b3b87-b625-11ed-82f9-1078d241b29f'),
('9f833dea-b625-11ed-82f9-1078d241b29f', 'inventario', 'inventario', 0, '9f7caeec-b625-11ed-82f9-1078d241b29f'),
('9f914f81-b625-11ed-82f9-1078d241b29f', 'inventario', 'inventario', 0, '9f8e9e25-b625-11ed-82f9-1078d241b29f'),
('9fa3685b-b625-11ed-82f9-1078d241b29f', 'inventario', 'inventario', 0, '9fa000e3-b625-11ed-82f9-1078d241b29f'),
('9fb4c767-b625-11ed-82f9-1078d241b29f', 'inventario', 'inventario', 0, '9fb1a6b5-b625-11ed-82f9-1078d241b29f'),
('9fc61382-b625-11ed-82f9-1078d241b29f', 'inventario', 'inventario', 0, '9fc30d88-b625-11ed-82f9-1078d241b29f'),
('9fd7ddd3-b625-11ed-82f9-1078d241b29f', 'inventario', 'inventario', 0, '9fd49e0c-b625-11ed-82f9-1078d241b29f'),
('9fe8de9e-b625-11ed-82f9-1078d241b29f', 'inventario', 'inventario', 0, '9fe63eb0-b625-11ed-82f9-1078d241b29f'),
('9ffab9a6-b625-11ed-82f9-1078d241b29f', 'inventario', 'inventario', 0, '9ff7d22f-b625-11ed-82f9-1078d241b29f'),
('a014305c-b625-11ed-82f9-1078d241b29f', 'inventario', 'inventario', 0, 'a009766d-b625-11ed-82f9-1078d241b29f'),
('a01f8e48-b625-11ed-82f9-1078d241b29f', 'inventario', 'inventario', 0, 'a01b22b0-b625-11ed-82f9-1078d241b29f'),
('a03173b1-b625-11ed-82f9-1078d241b29f', 'inventario', 'inventario', 0, 'a02d416a-b625-11ed-82f9-1078d241b29f');

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
('73649656-b63e-11ed-82f9-1078d241b29f', '73611f5f-b63e-11ed-82f9-1078d241b29f', 'editar', 'editar', 'Inactivo'),
('7b6e54d4-b625-11ed-82f9-1078d241b29f', '7b6ae987-b625-11ed-82f9-1078d241b29f', 'editar', 'editar', 'Inactivo'),
('8968aa07-b625-11ed-82f9-1078d241b29f', '89611e2d-b625-11ed-82f9-1078d241b29f', 'editar', 'editar', 'Inactivo'),
('9028ef32-b625-11ed-82f9-1078d241b29f', '9025e0f2-b625-11ed-82f9-1078d241b29f', 'editar', 'editar', 'Inactivo'),
('9f1ec65d-b625-11ed-82f9-1078d241b29f', '9f149481-b625-11ed-82f9-1078d241b29f', 'editar', 'editar', 'Inactivo'),
('9f2662cc-b625-11ed-82f9-1078d241b29f', '9f1eb9f0-b625-11ed-82f9-1078d241b29f', 'editar', 'editar', 'Inactivo'),
('9f2df22d-b625-11ed-82f9-1078d241b29f', '9f28ed1c-b625-11ed-82f9-1078d241b29f', 'editar', 'editar', 'Inactivo'),
('9f390344-b625-11ed-82f9-1078d241b29f', '9f35af8b-b625-11ed-82f9-1078d241b29f', 'editar', 'editar', 'Inactivo'),
('9f4b4982-b625-11ed-82f9-1078d241b29f', '9f48b1ac-b625-11ed-82f9-1078d241b29f', 'editar', 'editar', 'Inactivo'),
('9f5e710d-b625-11ed-82f9-1078d241b29f', '9f5b6dea-b625-11ed-82f9-1078d241b29f', 'editar', 'editar', 'Inactivo'),
('9f85c9eb-b625-11ed-82f9-1078d241b29f', '9f790b2b-b625-11ed-82f9-1078d241b29f', 'editar', 'editar', 'Inactivo'),
('9f8841cd-b625-11ed-82f9-1078d241b29f', '9f833dea-b625-11ed-82f9-1078d241b29f', 'editar', 'editar', 'Inactivo'),
('9f948ef7-b625-11ed-82f9-1078d241b29f', '9f914f81-b625-11ed-82f9-1078d241b29f', 'editar', 'editar', 'Inactivo'),
('9fa6591d-b625-11ed-82f9-1078d241b29f', '9fa3685b-b625-11ed-82f9-1078d241b29f', 'editar', 'editar', 'Inactivo'),
('9fb74119-b625-11ed-82f9-1078d241b29f', '9fb4c767-b625-11ed-82f9-1078d241b29f', 'editar', 'editar', 'Inactivo'),
('9fc92a34-b625-11ed-82f9-1078d241b29f', '9fc61382-b625-11ed-82f9-1078d241b29f', 'editar', 'editar', 'Inactivo'),
('9fdadee7-b625-11ed-82f9-1078d241b29f', '9fd7ddd3-b625-11ed-82f9-1078d241b29f', 'editar', 'editar', 'Inactivo'),
('9feb891a-b625-11ed-82f9-1078d241b29f', '9fe8de9e-b625-11ed-82f9-1078d241b29f', 'editar', 'editar', 'Inactivo'),
('9ffd3ff8-b625-11ed-82f9-1078d241b29f', '9ffab9a6-b625-11ed-82f9-1078d241b29f', 'editar', 'editar', 'Inactivo'),
('a01d3490-b625-11ed-82f9-1078d241b29f', 'a014305c-b625-11ed-82f9-1078d241b29f', 'editar', 'editar', 'Inactivo'),
('a0249d2e-b625-11ed-82f9-1078d241b29f', 'a01f8e48-b625-11ed-82f9-1078d241b29f', 'editar', 'editar', 'Inactivo'),
('a034ca37-b625-11ed-82f9-1078d241b29f', 'a03173b1-b625-11ed-82f9-1078d241b29f', 'editar', 'editar', 'Inactivo');

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
  ADD PRIMARY KEY (`idpermisions`),
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
