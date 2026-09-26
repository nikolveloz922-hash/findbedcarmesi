-- TABLA DE USUARIOS (Para el candado de entrada al Panel Admin)
CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    rol TEXT DEFAULT 'admin'
);

-- TABLA DE HOTELES Y ALOJAMIENTOS
CREATE TABLE IF NOT EXISTS hoteles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    tipo TEXT NOT NULL, -- Hotel, Motel, Resort, Posada
    categoria TEXT NOT NULL, -- Básica, Estándar, Premium, Suite
    estado TEXT NOT NULL,
    ciudad TEXT NOT NULL,
    zona TEXT NOT NULL,
    precio_normal REAL NOT NULL,
    precio_findbed REAL NOT NULL,
    anticipo REAL NOT NULL,
    saldo_hotel REAL NOT NULL,
    imagen TEXT DEFAULT 'hotel1_habitacion.jpg',
    disponible INTEGER DEFAULT 1
);

-- TABLA DE RESERVAS
CREATE TABLE IF NOT EXISTS reservas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    codigo_reserva TEXT UNIQUE NOT NULL,
    hotel_id INTEGER,
    referencia_pago TEXT NOT NULL,
    monto_anticipo REAL NOT NULL,
    fecha_reserva DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(hotel_id) REFERENCES hoteles(id)
);
