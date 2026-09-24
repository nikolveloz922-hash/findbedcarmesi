backend/seed.sql
INSERT OR IGNORE INTO hotels(id,name,category,state,city,zone,normal_price,findbed_price,deposit,rooms,photo,gallery_json,active)
VALUES('hotel-carmesi-royal','Hotel Carmesí Royal','Hotel','Carabobo','Valencia','El Viñedo',80,70,10,4,'hotel1_piscina.jpg',
'["hotel1_piscina.jpg","hotel1_habitacion.jpg","hotel1_bano.jpg","hotel1_restaurante.jpg"]',1);
