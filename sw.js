
'use strict';

console.log('Started', self);

self.addEventListener('install', function(event) {
  self.skipWaiting();
  console.log('Installed', event);
});

self.addEventListener('activate', function(event) {
  console.log('Activated', event);
});

self.addEventListener('push', function(event) {
  alert("");
  console.log("push event:", event);
  event.waitUntil(  
    fetch(url).then(function(response) {  
      if (response.status !== 200) {  
        // Either show a message to the user explaining the error  
        // or enter a generic message and handle the
        // onnotificationclick event to direct the user to a web page  
        console.log('Looks like there was a problem. Status Code: ' + response.status);  
        throw new Error();  
      }
 
      // Examine the text in the response  
      return response.json().then(function(data) {  
        if (data.error || !data.notification) {  
          console.log('The API returned an error.', data.error);  
          throw new Error();  
        }  
        var title = data.notification.title;  
        var message = data.notification.message;  
        var icon = data.notification.icon;  
 
        return self.registration.showNotification(title, {  
          body: message,  
          icon: icon,  
          data: {
            url: data.notification.url
          }  
        });  
      });  
    }).catch(function(err) {  
      console.log('Unable to retrieve data', err);
    }));
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
