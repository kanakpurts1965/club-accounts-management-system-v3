const CACHE_NAME="club-accounts-v3";

const urlsToCache=[

"/",

"/index.html",

"/login.html",

"/dashboard.html",

"/assets/css/main.css",

"/assets/css/layout.css",

"/assets/css/dashboard.css",

"/assets/css/login.css",

"/assets/js/firebase.js",

"/assets/js/auth.js",

"/assets/js/dashboard.js",

"/assets/images/logo.png",

"/assets/images/default-user.png"

];

self.addEventListener("install",event=>{

event.waitUntil(

caches.open(CACHE_NAME)

.then(cache=>cache.addAll(urlsToCache))

);

});

self.addEventListener("activate",event=>{

event.waitUntil(

caches.keys()

.then(keys=>Promise.all(

keys.map(key=>{

if(key!==CACHE_NAME){

return caches.delete(key);

}

})

))

);

});

self.addEventListener("fetch",event=>{

event.respondWith(

caches.match(event.request)

.then(response=>{

return response||fetch(event.request);

})

);

});
