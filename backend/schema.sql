
CREATE TABLE IF NOT EXISTS hotels(id TEXT PRIMARY KEY,name TEXT NOT NULL,category TEXT NOT NULL,level TEXT,state TEXT,city TEXT,zone TEXT,normal_price REACREATE TABLE IF NOT EXISTS reservations(id TEXT PRIMARY KEY,hotel_id TEXT NOT NULL,checkin TEXT NOT NULL,checkout TEXT NOT NULL,guests INTEGER NOT NULL,roCREATE INDEX IF NOT EXISTS idx_res_hotel_dates ON reservations(hotel_id,checkin,checkout);
