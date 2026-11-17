/* RunLog — service worker
   Rende l'app installabile e utilizzabile senza rete.
   - la pagina (index.html) si prende prima dalla rete, così gli aggiornamenti arrivano subito;
     se la rete manca si usa la copia salvata
   - icone e font: prima la copia salvata, poi la rete
   - le chiamate a Google (Sheet) non passano mai dalla cache
   Quando cambi i file statici, aumenta il numero di versione qui sotto. */
const CACHE='runlog-v10.1';
const BASE=['./','./manifest.webmanifest','./icon-192.png','./icon-512.png'];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(BASE)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET') return;
  const u=new URL(r.url);
  if(u.hostname.endsWith('google.com')||u.hostname.endsWith('googleusercontent.com')) return;
  if(r.mode==='navigate'){
    e.respondWith(fetch(r).then(res=>{
      const copia=res.clone();
      caches.open(CACHE).then(c=>c.put('./',copia));
      return res;
    }).catch(()=>caches.match('./')));
    return;
  }
  e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{
    if(res.ok||res.type==='opaque'){const copia=res.clone();caches.open(CACHE).then(c=>c.put(r,copia));}
    return res;
  })));
});
