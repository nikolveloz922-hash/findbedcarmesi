const CACHE_NAME = 'findbed-carmesi-v1';

// Archivos esenciales que se guardan en la memoria del dispositivo
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './estilos.css',
  './script.js',
  './manifest.json',
  './datos.json',
  './fondo.jpg',
  './portada.jpg',
  './Encabezado.jpg',
  './panda-normal.png',
  './panda-saludando.png',
  './panda-hotel.png',
  './panda-alerts.png',
  './Anuncio PinkWeather.jpg'
];

// Instalación del Service Worker
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Activación y limpieza de cachés antiguas
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Estrategia: Buscar en red primero, si falla o no hay datos, cargar desde el Caché
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});
