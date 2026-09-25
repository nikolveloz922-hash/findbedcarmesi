const CACHE_NAME = 'findbed-carmesi-v1';

// Lista de todos los archivos de tu proyecto que se guardarán en la memoria del teléfono
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './estilos.css',
  './script.js',
  './manifest.json',
  './datos.json',
  './sw.js',
  './Encabezado.jpg',
  './panda-normal.png',
  './panda-saludando.png',
  './panda-revisando.png',
  './panda-exito.png',
  './panda-error.png',
  './hotel1_habitacion.jpg',
  './hotel1_piscina.jpg'
];

// Instalación del Service Worker y guardado en caché
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Activación del Service Worker y limpieza de caché antigua
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

// Intercepción de peticiones para que la app responda incluso sin señal
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});
              
