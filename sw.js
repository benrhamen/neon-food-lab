const C='pixelchef-v1';
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
 const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
 // network first so a new ?v= or new commit always wins; cache is only the offline fallback
 e.respondWith(fetch(r,{cache:'no-cache'}).then(res=>{const copy=res.clone();caches.open(C).then(c=>c.put(r,copy));return res}).catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match('./',{ignoreSearch:true}))));
});
