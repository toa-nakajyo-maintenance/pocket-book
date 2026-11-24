// ポケットブック Service Worker v14
const CACHE = 'pocketbook-v14';
const ASSETS = [
  './',
  './index.html',
  './gasket-torque.js',
  './oil-seal.js',
  './bearing-search.js',
  './shindashi.js',
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
  './loctite-2.png',
  './shindashi-machine.jpg'
];

self.addEventListener('install', e => {
  // ブラウザの一時保存を使わず、必ずサーバーから最新を取得して保存
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS.map(u => new Request(u, { cache: 'reload' })))));
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
  // プログラム(.js/.json)：電波があれば最新版、なければ保存済み
  if (/\.(js|json)$/.test(new URL(e.request.url).pathname)) {
    e.respondWith(
      fetch(e.request, { cache: 'no-cache' })
        .then(r => {
          const copy = r.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
          return r;
        })
        .catch(() => caches.match(e.request, { ignoreSearch: true }))
    );
    return;
  }
  // 画像など：保存済みを優先
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(r => r || fetch(e.request))
  );
});
