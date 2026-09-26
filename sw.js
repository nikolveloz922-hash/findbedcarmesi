// Nombre del caché y versión de la App
const CACHE_NAME = 'findbed-carmesi-v1';

// Archivos principales que se guardarán en la memoria del teléfono/navegador
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './admin.html',
  './estilos.css',
  './script.js',
  './Encabezado.jpg',
  './panda-normal.png',
  './panda-saludando.png',
  './panda-revisando.png',
  './hotel1_habitacion.jpg',
  './hotel1_piscina.jpg',
  './manifest.json'
];

// 1. INSTALACIÓN: Guarda los archivos esenciales en el caché
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('📦 [Service Worker] Guardando archivos de FindBed Carmesí en caché...');
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// 2. ACTIVACIÓN: Limpia cachés antiguos si haces una actualización futura
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('🧹 [Service Worker] Eliminando caché antiguo:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. INTERCEPCIÓN DE PETICIONES (FETCH): Responde con el caché o busca en la red
self.addEventListener('fetch', (event) => {
  // Ignorar peticiones a la API del Worker (para que las reservas y datos de base de datos siempre sean en tiempo real)
  if (event.request.url.includes('/api/')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Si el archivo está en el caché, lo entrega al instante
      if (cachedResponse) {
        return cachedResponse;
      }
      // Si no está, lo busca en internet
      return fetch(event.request).then((networkResponse) => {
        // Guarda en caché copias de imágenes u otros recursos cargados dinámicamente
        if (event.request.method === 'GET' && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      });
    }).catch(() => {
      // Si no hay conexión ni caché, responde con la página principal
      return caches.match('./index.html');
    })
  );
});
