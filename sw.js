const CACHE_NAME = 'devcoderz-v3';
const ASSETS = [
  '/',
  '/index.html',
  '/batches.html',
  '/chapters.html',
  '/lectures.html',
  '/Player/player.html',
  '/Player/player2.html',
  '/Player/player3.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)));
    })
  );
});
