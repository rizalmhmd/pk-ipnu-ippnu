const CACHE_NAME = 'pkpt-pwa-v1';
const urlsToCache = [
    '/',
    '/manifest.json',
    '/logo-192.png',
    '/logo-512.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    // Basic network-first strategy for dynamic content, cache fallback
    // Since this is a Laravel/Inertia app, we don't want to heavily cache 
    // the dynamic API routes, just rely on network primarily.
    if (event.request.method !== 'GET') {
        return;
    }

    event.respondWith(
        fetch(event.request)
            .catch(() => {
                return caches.match(event.request);
            })
    );
});
