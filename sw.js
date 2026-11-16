const CACHE_NAME = 'aleppo-ee-sim-v3';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './1000233248.jpg',
  'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js',
  'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js',
  'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  // استثناء اتصالات البيانات الحية الخاصة بـ Firestore API و IdentityToolkit
  if (event.request.url.includes('firestore.googleapis.com') || event.request.url.includes('identitytoolkit')) {
    return;
  }

  // تخزين واسترجاع ملفات المشروع ومكتبات gstatic Firebase CDN للعمل بدون إنترنت بنسبة 100%
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      }).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
