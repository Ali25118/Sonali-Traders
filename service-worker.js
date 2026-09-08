const CACHE_NAME = "sonali-traders-v1";
const urlsToCache = [
  "/Sonali-Traders/index.html",
  "/Sonali-Traders/products.html",
  "/Sonali-Traders/wholesale.html",
  "/Sonali-Traders/order.html",
  "/Sonali-Traders/contact.html",
  "/Sonali-Traders/about.html",
  "/Sonali-Traders/icons/icon-192.png",
  "/Sonali-Traders/icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return (
        cached ||
        fetch(event.request).catch(() => caches.match("/Sonali-Traders/index.html"))
      );
    })
  );
});

