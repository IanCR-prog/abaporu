// Define um nome e versão para o cache
const CACHE_NAME = 'caixamestre-cache-v1';

// Lista de arquivos para colocar em cache na instalação
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Evento de Instalação: Salva os arquivos no cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento de Fetch: Intercepta as requisições
// Se o arquivo estiver no cache, entrega a versão do cache.
// Se não, busca na rede.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna o que encontrou no cache, ou faz a requisição à rede se não encontrar
        return response || fetch(event.request);
      })
  );
});