(function(){
  self.addEventListener('fetch', function(event) {
    var request, url;
    request = event.request;
    url = new URL(request.url);
    if (url.origin !== location.origin) return; // we don't accept out-of-site requests (shouldn't happen, but browsers!)
    if ((request.method != 'GET') || (url.pathname != '/big-image.jpg')) return; // we only care about big-* images on GET requests

    return event.respondWith(fetch(request).then(function(response) {
      return response;
    })["catch"](function() {
      return new Response(`<svg role="img" aria-labelledby="offline-title" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><title id="offline-title">Offline</title><g fill="none" fill-rule="evenodd"><text fill="#9B9B9B" font-family="Helvetica Neue,Arial,Helvetica,sans-serif" font-size="72" font-weight="bold"><tspan x="93" y="172">offline</tspan></text></g></svg>`, {
        headers: {
          'Content-Type': 'image/svg+xml'
        }
      });
    }));
  });
}).call(this);
