const CACHE_NAME = 'findbedcarmesi-v2';

// Lista exacta de archivos que existen en tu proyecto
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './logo.png'
];

// Instalación: Guarda los archivos en la caché del teléfono
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Archivos cacheados correctamente');
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Activación: Limpia cachés antiguas si actualizas la app
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
    })
  );
  return self.clients.claim();
});

// Intercepción de peticiones: Carga desde caché si está offline
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});

