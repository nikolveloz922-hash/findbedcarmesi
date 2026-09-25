-- Carga de datos iniciales (Seed)

-- Insertar Estados
INSERT INTO estados (id, nombre) VALUES 
(1, 'Caracas (Distrito Capital)'),
(2, 'Cojedes'),
(3, 'Carabobo'),
(4, 'Aragua'),
(5, 'Zulia');

-- Insertar Ciudades
INSERT INTO ciudades (id, estado_id, nombre) VALUES 
(1, 1, 'Chacao'),
(2, 1, 'Baruta'),
(3, 2, 'Tinaquillo'),
(4, 2, 'San Carlos'),
(5, 3, 'Valencia');

-- Insertar Zonas
INSERT INTO zonas (id, ciudad_id, nombre) VALUES 
(1, 1, 'Altamira'),
(2, 1, 'La Castellana'),
(3, 2, 'Las Mercedes'),
(4, 3, 'Centro'),
(5, 3, 'Zona Industrial');

-- Insertar Hoteles
INSERT INTO hoteles (nombre, categoria, nivel, estado_id, ciudad_id, zona_id, habitaciones, precio_oficial, precio_oferta, anticipo, pago_restante, imagen) VALUES 
('Hotel Carmesí Royal', 'Hotel', 'Alta Gama', 1, 1, 1, 4, 50.0, 40.0, 12.0, 28.0, 'hotel1_habitacion.jpg'),
('Posada Express Carmesí', 'Hotel', 'Económica', 2, 3, 4, 8, 25.0, 25.0, 4.0, 21.0, 'hotel1_piscina.jpg');
