self.addEventListener("install", (event) => {
    console.log("[Service Worker] Installed", event);
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    console.log("[Service Worker] Activated", event);
});

self.addEventListener("fetch", (event) => {
    console.log("[Service Worker] Fetching", event);
});