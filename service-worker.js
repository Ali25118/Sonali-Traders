const CACHE_NAME = 'sonali-traders-v1';
const urlsToCache = [
  'index.html',
  'products.html',
  'wholesale.html',
  'order.html',
  'contact.html',
  'about.html',
  'logo.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

