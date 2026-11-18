// ポケットブック Service Worker v8
const CACHE = 'pocketbook-v8';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './app-icon-192.png',
  './app-icon-512.png',
  './apple-touch-icon.png',
  './nylon-sling-chart.png',
  './shackle-diagram.png',
  './gasket-section.png',
  './cmp_fig9.png',
  './flange-rf.jpeg',
  './flange-ff.jpeg',
  './flange-mf.jpeg',
  './flange-tg.jpeg',
  './loctite-1.png',
  './loctite-2.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // ページ本体：電波があれば最新版、なければ保存済みを表示
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request)
        .then(r => {
          const copy = r.clone();
          caches.open(CACHE).then(c => c.put('./index.html', copy));
          return r;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }
  // 画像など：保存済みを優先
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(r => r || fetch(e.request))
  );
});
