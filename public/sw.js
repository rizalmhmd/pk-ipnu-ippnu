const CACHE_NAME = 'pkpt-pwa-v2';
const urlsToCache = [
    '/manifest.json',
    '/logo-192.png',
    '/logo-512.png'
];

self.addEventListener('install', event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        )
    );
});

self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') {
        return;
    }

    const url = new URL(event.request.url);

    // Cache-first for immutable hashed Vite build assets and icons
    if (
        url.origin === self.location.origin &&
        (url.pathname.startsWith('/build/assets/') || url.pathname === '/logo-192.png' || url.pathname === '/logo-512.png')
    ) {
        event.respondWith(
            caches.match(event.request).then(cached => {
                if (cached) return cached;
                return fetch(event.request).then(response => {
                    if (response && response.ok) {
                        const copy = response.clone();
                        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
                    }
                    return response;
                });
            })
        );
        return;
    }

    // Network-first for HTML & Inertia requests
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});
