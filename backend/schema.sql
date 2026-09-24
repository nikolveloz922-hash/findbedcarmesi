backend/schema.sql
CREATE TABLE IF NOT EXISTS hotels(
 id TEXT PRIMARY KEY,name TEXT NOT NULL,category TEXT NOT NULL,state TEXT,city TEXT,zone TEXT,
 normal_price REAL NOT NULL,findbed_price REAL NOT NULL,deposit REAL DEFAULT 0,rooms INTEGER DEFAULT 0,
 photo TEXT,gallery_json TEXT,active INTEGER DEFAULT 1
);
CREATE TABLE IF NOT EXISTS reservations(
 id TEXT PRIMARY KEY,hotel_id TEXT NOT NULL,checkin TEXT,checkout TEXT,guests INTEGER,room TEXT,total REAL,
 status TEXT,client_name TEXT,cedula TEXT,phone TEXT,payment_reference TEXT,code TEXT,created_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_res_hotel_dates ON reservations(hotel_id,checkin,checkout);
