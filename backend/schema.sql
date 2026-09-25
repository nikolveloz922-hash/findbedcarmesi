-- Estructura de tablas para FindBed Carmesí

DROP TABLE IF EXISTS reservas;
DROP TABLE IF EXISTS hoteles;
DROP TABLE IF EXISTS zonas;
DROP TABLE IF EXISTS ciudades;
DROP TABLE IF EXISTS estados;

-- Tabla de Estados
CREATE TABLE estados (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL UNIQUE
);

-- Tabla de Ciudades
CREATE TABLE ciudades (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    estado_id INTEGER NOT NULL,
    nombre TEXT NOT NULL,
    FOREIGN KEY (estado_id) REFERENCES estados(id) ON DELETE CASCADE
);

-- Tabla de Zonas
CREATE TABLE zonas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ciudad_id INTEGER NOT NULL,
    nombre TEXT NOT NULL,
    FOREIGN KEY (ciudad_id) REFERENCES ciudades(id) ON DELETE CASCADE
);

-- Tabla de Hoteles
CREATE TABLE hoteles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    categoria TEXT CHECK(categoria IN ('Hotel', 'Resort', 'Motel')) DEFAULT 'Hotel',
    nivel TEXT CHECK(nivel IN ('Premium', 'Alta Gama', 'Económica')) DEFAULT 'Económica',
    estado_id INTEGER NOT NULL,
    ciudad_id INTEGER NOT NULL,
    zona_id INTEGER NOT NULL,
    habitaciones INTEGER DEFAULT 1,
    precio_oficial REAL NOT NULL,
    precio_oferta REAL NOT NULL,
    anticipo REAL NOT NULL,
    pago_restante REAL NOT NULL,
    imagen TEXT DEFAULT 'hotel1_habitacion.jpg',
    FOREIGN KEY (estado_id) REFERENCES estados(id),
    FOREIGN KEY (ciudad_id) REFERENCES ciudades(id),
    FOREIGN KEY (zona_id) REFERENCES zonas(id)
);

-- Tabla de Reservas
CREATE TABLE reservas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    codigo_reserva TEXT NOT NULL UNIQUE,
    hotel_id INTEGER NOT NULL,
    referencia_pago TEXT NOT NULL,
    monto_anticipo REAL NOT NULL,
    estado_pago TEXT CHECK(estado_pago IN ('pendiente', 'confirmado', 'rechazado')) DEFAULT 'pendiente',
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (hotel_id) REFERENCES hoteles(id)
);
