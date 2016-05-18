'use strict';

if ('serviceWorker' in navigator) {
  console.log('Service Worker is supported');
  navigator.serviceWorker.register('sw.js').then(function() {
    return navigator.serviceWorker.ready;
  }).then(function(reg) {
    console.log('Service Worker is ready :^)', reg);
    reg.pushManager.subscribe({userVisibleOnly: true}).then(function(sub) {
	document.getElementById("result").innerHTML = sub.endpoint;
	var endpoint = document.getElementById("result").innerHTML;
	var subscriptionId = endpoint.substring(endpoint.lastIndexOf("/")+1);
	document.getElementById("subscriptionId").value = subscriptionId;
    });
  }).catch(function(error) {
    console.log('Service Worker error :^(', error);
  });
}
