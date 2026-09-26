-- Insertar usuario administrador (Usuario: admin | Clave: carmesi2026)
INSERT OR IGNORE INTO usuarios (usuario, password_hash) 
VALUES ('admin', 'carmesi2026');

-- Insertar alojamientos de ejemplo en Venezuela
INSERT INTO hoteles (nombre, tipo, categoria, estado, ciudad, zona, precio_normal, precio_findbed, anticipo, saldo_hotel, imagen)
VALUES 
('Hotel Carmesí Royal', 'Hotel', 'Estándar', 'Caracas (Distrito Capital)', 'Chacao', 'Altamira', 80, 70, 10, 60, 'hotel1_habitacion.jpg'),
('Posada Express Carmesí', 'Posada', 'Básica', 'Cojedes', 'Tinaquillo', 'Centro', 35, 25, 5, 20, 'hotel1_piscina.jpg'),
('Margarita Beach Resort', 'Resort', 'Premium', 'Nueva Esparta', 'Pampatar', 'Bahía de Pampatar', 120, 100, 15, 85, 'hotel1_habitacion.jpg'),
('Motel Sweet Carmesí', 'Motel', 'Básica', 'Caracas (Distrito Capital)', 'Baruta', 'Las Mercedes', 45, 35, 5, 30, 'hotel1_piscina.jpg'),
('Suite Carmesí Deluxe', 'Hotel', 'Suite', 'Caracas (Distrito Capital)', 'Chacao', 'La Castellana', 150, 130, 20, 110, 'hotel1_habitacion.jpg');
