-- Tabla de hoteles y hospedajes
CREATE TABLE IF NOT EXISTS hoteles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    categoria TEXT NOT NULL,
    estado TEXT NOT NULL,
    ciudad TEXT NOT NULL,
    zona TEXT NOT NULL,
    precio_normal REAL NOT NULL,
    precio_findbed REAL NOT NULL,
    anticipo REAL NOT NULL,
    saldo_hotel REAL NOT NULL,
    imagen TEXT,
    disponible INTEGER DEFAULT 1
);

-- Tabla para guardar los pagos y reservas confirmadas
CREATE TABLE IF NOT EXISTS reservas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    codigo_reserva TEXT UNIQUE NOT NULL,
    hotel_id INTEGER NOT NULL,
    referencia_pago TEXT NOT NULL,
    monto_anticipo REAL NOT NULL,
    estado_pago TEXT DEFAULT 'verificado',
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (hotel_id) REFERENCES hoteles(id)
);
