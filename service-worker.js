const CACHE_NAME = 'offline-cache-v5';
const OFFLINE_URL = '/offline.html';

async function getAllPagesAndAssets() {
    try {
        const response = await fetch('/');
        const text = await response.text();
        const links = [...new Set(text.match(/(href|src)="([^"]+)"/g))]
            .map(l => l.replace(/(href|src)="|"$/g, ''))
            .filter(link => !link.startsWith('http') || link.startsWith(location.origin))
            .map(link => new URL(link, location.origin).href);
        return [...links, OFFLINE_URL];
    } catch (err) {
        return [OFFLINE_URL];
    }
}

self.addEventListener('install', event => {
    event.waitUntil(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            const pagesAndAssets = await getAllPagesAndAssets();
            await cache.addAll(pagesAndAssets);
        })()
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request).then(networkResponse => {
                return caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
            });
        }).catch(() => caches.match(OFFLINE_URL))
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        })
    );
});
