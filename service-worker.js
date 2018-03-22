'use strict';

const cacheName = 'v104';
const offlineUrl = '/index.html';

self.addEventListener('install', e => {
  // once the SW is installed, go ahead and fetch the resources
  // to make this work offline
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        '/index.html',
        '/manifest.json',
        '/css/unlimited.css',
        '/js/min/jquery.min.js',
        '/js/min/howler.min.js',
        '/js/min/unlimited.min.js',
        '/audio/bylemon.mp3',
        '/audio/ready.mp3',
        '/audio/song.mp3',
        '/img/dance1.gif', '/img/dance2.gif', '/img/dance3.gif', '/img/dance4.gif', '/img/dance5.gif', '/img/dance6.gif', '/img/dance7.gif', '/img/dance8.gif', '/img/dance9.gif', '/img/dance10.gif', '/img/dance11.gif', '/img/dance12.gif', '/img/dance12.gif', '/img/dance13.gif', '/img/dance14.gif', '/img/dance15.gif', '/img/dance16.gif', '/img/dance17.gif', '/img/dance18.gif', '/img/dance19.gif', '/img/dance20.gif', '/img/dance21.gif', '/img/dance22.gif', '/img/dance23.gif', '/img/dance24.gif', '/img/dance25.gif', '/img/dance26.gif', 
      ]).then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('fetch', function(event) {
  if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
    event.respondWith(
      fetch(event.request.url).catch(error => {
        return caches.match(offlineUrl);
      })
    );
  } else {
    return response
  }
});