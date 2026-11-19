"""Regenerate the game's explicit offline cache after changing local runtime assets."""
from pathlib import Path
import json
ROOT=Path(__file__).resolve().parents[1]
paths=['./','./index.html','./manifest.webmanifest']
for directory in ['css','js','assets/mascot','assets/cells','assets/organelles','assets/backgrounds','assets/icons','assets/audio']:
 for p in sorted((ROOT/directory).rglob('*')):
  if p.is_file() and p.suffix.lower() in ['.js','.css','.svg','.png','.wav','.webp']:
   paths.append('./'+p.relative_to(ROOT).as_posix())
sw="""/* Explicit, scope-isolated precache. Bump VERSION for each published release. */
'use strict';
const VERSION='2.0.0-20261118';
const SCOPE=new URL(self.registration.scope);
const PREFIX='biomundo:'+SCOPE.pathname+':';
const CACHE=PREFIX+VERSION;
const FILES=__FILES__;
self.addEventListener('install',event=>{
 event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)));
 // Updates wait until previous app tabs close; do not replace a running game's code.
});
self.addEventListener('activate',event=>{
 event.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.filter(k=>k.startsWith(PREFIX)&&k!==CACHE).map(k=>caches.delete(k)));
  await self.clients.claim();
 })());
});
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url);
 if(event.request.method!=='GET'||url.origin!==SCOPE.origin||!url.pathname.startsWith(SCOPE.pathname))return;
 const relative='./'+url.pathname.slice(SCOPE.pathname.length);
 if(!FILES.includes(relative))return; // Never intercept unrelated apps or external links.
 event.respondWith((async()=>{
  const cache=await caches.open(CACHE);
  const stored=await cache.match(new URL(relative,SCOPE));
  if(stored)return stored;
  return fetch(event.request);
 })());
});
""".replace('__FILES__',json.dumps(paths,indent=1))
(ROOT/'service-worker.js').write_text(sw,encoding='utf-8')
print('Offline cache:',len(paths),'resources')
