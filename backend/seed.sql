-- Carga masiva de datos iniciales (Seed) para FindBed Carmesí

-- 1. LIMPIEZA PREVIA DE TABLAS
DELETE FROM reservas;
DELETE FROM hoteles;
DELETE FROM zonas;
DELETE FROM ciudades;
DELETE FROM estados;

-- Resetear contadores de autoincremento
DELETE FROM sqlite_sequence WHERE name IN ('estados', 'ciudades', 'zonas', 'hoteles', 'reservas');

-- 2. INSERTAR ESTADOS (23 Estados + DCO + DPF)
INSERT INTO estados (id, nombre) VALUES 
(1, 'Caracas (Distrito Capital)'),
(2, 'Amazonas'),
(3, 'Anzoátegui'),
(4, 'Apure'),
(5, 'Aragua'),
(6, 'Barinas'),
(7, 'Bolívar'),
(8, 'Carabobo'),
(9, 'Cojedes'),
(10, 'Delta Amacuro'),
(11, 'Falcón'),
(12, 'Guárico'),
(13, 'Lara'),
(14, 'Mérida'),
(15, 'Miranda'),
(16, 'Monagas'),
(17, 'Nueva Esparta'),
(18, 'Portuguesa'),
(19, 'Sucre'),
(20, 'Táchira'),
(21, 'Trujillo'),
(22, 'La Guaira'),
(23, 'Yaracuy'),
(24, 'Zulia'),
(25, 'Dependencias Federales');

-- 3. INSERTAR CIUDADES
INSERT INTO ciudades (id, estado_id, nombre) VALUES 
(1, 1, 'Chacao'), (2, 1, 'Baruta'), (3, 1, 'Libertador'),
(4, 2, 'Puerto Ayacucho'),
(5, 3, 'Puerto La Cruz'), (6, 3, 'Lechería'), (7, 3, 'Barcelona'),
(8, 4, 'San Fernando de Apure'),
(9, 5, 'Maracay'), (10, 5, 'Choroní'),
(11, 6, 'Barinas'),
(12, 7, 'Ciudad Guayana'), (13, 7, 'Ciudad Bolívar'),
(14, 8, 'Valencia'), (15, 8, 'Puerto Cabello'),
(16, 9, 'Tinaquillo'), (17, 9, 'San Carlos'),
(18, 10, 'Tucupita'),
(19, 11, 'Punto Fijo'), (20, 11, 'Coro'),
(21, 12, 'San Juan de los Morros'), (22, 12, 'Valle de la Pascua'),
(23, 13, 'Barquisimeto'), (24, 13, 'Carora'),
(25, 14, 'Mérida'), (26, 14, 'El Vigía'),
(27, 15, 'Los Teques'), (28, 15, 'Guatire'), (29, 15, 'Guarenas'),
(30, 16, 'Maturín'),
(31, 17, 'Porlamar'), (32, 17, 'Pampatar'),
(33, 18, 'Acarigua'), (34, 18, 'Guanare'),
(35, 19, 'Cumaná'), (36, 19, 'Carúpano'),
(37, 20, 'San Cristóbal'), (38, 20, 'San Antonio del Táchira'),
(39, 21, 'Trujillo'), (40, 21, 'Valera'),
(41, 22, 'La Guaira'),
(42, 23, 'San Felipe'),
(43, 24, 'Maracaibo'), (44, 24, 'Cabimas'),
(45, 25, 'Los Roques');

-- 4. INSERTAR ZONAS
INSERT INTO zonas (id, ciudad_id, nombre) VALUES 
-- Caracas
(1, 1, 'Altamira'), (2, 1, 'La Castellana'), (3, 1, 'Los Palos Grandes'),
(4, 2, 'Las Mercedes'), (5, 2, 'Prados del Este'),
(6, 3, 'Centro Histórico'), (7, 3, 'El Recreo'), (8, 3, 'Sabana Grande'),
-- Amazonas
(9, 4, 'Centro'), (10, 4, 'Avenida Orinoco'),
-- Anzoátegui
(11, 5, 'Paseo Colón'), (12, 6, 'El Morro'), (13, 7, 'Nueva Barcelona'),
-- Apure
(14, 8, 'Centro'), (15, 8, 'Av. Carabobo'),
-- Aragua
(16, 9, 'Las Delicias'), (17, 9, 'Base Aragua'), (18, 10, 'Puerto Colombia'),
-- Barinas
(19, 11, 'Alto Barinas'), (20, 11, 'Centro'),
-- Bolívar
(21, 12, 'Puerto Ordaz'), (22, 12, 'San Félix'), (23, 13, 'Casco Histórico'),
-- Carabobo
(24, 14, 'El Trigal'), (25, 14, 'Prebo'), (26, 14, 'Mañongo'), (27, 15, 'Zona Playera'),
-- Cojedes
(28, 16, 'Centro'), (29, 16, 'Avenida Bolívar'), (30, 16, 'Zona Industrial'), (31, 17, 'Los Samanes'),
-- Delta Amacuro
(32, 18, 'Centro'), (33, 18, 'Av. Rivera'),
-- Falcón
(34, 19, 'Comunidad Cardón'), (35, 20, 'Casco Colonial'),
-- Guárico
(36, 21, 'Centro'), (37, 22, 'Centro'),
-- Lara
(38, 23, 'El Uro'), (39, 23, 'Cabudare'), (40, 24, 'Centro Histórico'),
-- Mérida
(41, 25, 'Milla'), (42, 25, 'Las Heroínas'), (43, 26, 'Centro'),
-- Miranda
(44, 27, 'Centro'), (45, 28, 'Castillejo'), (46, 29, 'Nueva Casarapa'),
-- Monagas
(47, 30, 'Tipuro'), (48, 30, 'Juanico'),
-- Nueva Esparta
(49, 31, 'Costa Azul'), (50, 32, 'Bahía de Pampatar'),
-- Portuguesa
(51, 33, 'Araure'), (52, 34, 'Centro'),
-- Sucre
(53, 35, 'San Luis'), (54, 36, 'Centro'),
-- Táchira
(55, 37, 'Pueblo Nuevo'), (56, 37, 'La Concordia'), (57, 38, 'Centro'),
-- Trujillo
(58, 39, 'Centro'), (59, 40, 'La Puerta'),
-- La Guaira
(60, 41, 'Macuto'), (61, 41, 'Catia La Mar'),
-- Yaracuy
(62, 42, 'Higuerón'),
-- Zulia
(63, 43, 'Bella Vista'), (64, 43, '5 de Julio'), (65, 43, 'El Milagro'), (66, 44, 'Centro'),
-- Dependencias Federales
(67, 45, 'Gran Roque');

-- 5. INSERTAR HOTELES DE PRUEBA
INSERT INTO hoteles (nombre, categoria, nivel, estado_id, ciudad_id, zona_id, habitaciones, precio_oficial, precio_oferta, anticipo, pago_restante, imagen) VALUES 
('Hotel Carmesí Royal', 'Hotel', 'Alta Gama', 1, 1, 1, 4, 50.0, 40.0, 12.0, 28.0, 'hotel1_habitacion.jpg'),
('Posada Express Carmesí', 'Hotel', 'Económica', 9, 16, 28, 8, 25.0, 25.0, 4.0, 21.0, 'hotel1_piscina.jpg'),
('Resort Costa Caribe', 'Resort', 'Premium', 17, 32, 50, 12, 120.0, 95.0, 30.0, 65.0, 'hotel1_piscina.jpg'),
('Hotel Gran Andes', 'Hotel', 'Alta Gama', 14, 25, 42, 6, 60.0, 50.0, 15.0, 35.0, 'hotel1_habitacion.jpg');
