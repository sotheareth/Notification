
'use strict';

console.log('Started', self);

self.addEventListener('install', function(event) {
  self.skipWaiting();
  console.log('Installed', event);
});

self.addEventListener('activate', function(event) {
  console.log('Activated', event);
});

function getEndpoint() {
  return self.registration.pushManager.getSubscription()
  .then(function(subscription) {
    if (subscription) {
      return subscription.endpoint;
    }

    throw new Error('User not subscribed');
  });
}

self.addEventListener('push', function(event) {
  var title = 'Push message';

  event.waitUntil(
    getEndpoint()
    .then(function(endpoint) {
      //return fetch('response.json');
      return $.ajax({
        "url" : "http://192.168.1.143:9000/AppServerPushSpring/user/getPayload", 
        "dataType" : "application/json"
      });
    })
    .then(function(response) {
      return response.text();
    })
    .then(function(payload) {
      self.registration.showNotification('ServiceWorker Cookbook', {
        body: payload,
      });
    })
    );
});

self.addEventListener('notificationclick', function(event) {
  console.log(arguments);
  console.log('Notification click: tag', event.notification.tag);
  // Android doesn't close the notification when you click it
  // See http://crbug.com/463146
  event.notification.close();

  var url = 'https://youtu.be/gYMkEMCHtJ4';
  // Check if there's already a tab open with this URL.
  // If yes: focus on the tab.
  // If no: open a tab with the URL.
  event.waitUntil(
    clients.matchAll({
      type: 'window'
    })
    .then(function(windowClients) {
      console.log('WindowClients', windowClients);
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        console.log('WindowClient', client);
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
