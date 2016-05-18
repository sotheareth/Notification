'use strict';

if ('serviceWorker' in navigator) {
  console.log('Service Worker is supported');
  navigator.serviceWorker.register('sw.js').then(function() {
    return navigator.serviceWorker.ready;
  }).then(function(reg) {
    console.log('Service Worker is ready :^)', reg);
    reg.pushManager.subscribe({userVisibleOnly: true}).then(function(sub) {
	document.getElementById("result").innerHTML = sub.endpoint;
    });
  }).catch(function(error) {
    console.log('Service Worker error :^(', error);
  });
}

document.getElementById("register").addEventListener("click", function(event){
	var subscriptionId = document.getElementById("subscriptionId").value;
	var channelName = document.getElementById("subject").value;
	window.open("https://192.168.1.143:8443/AppServerPushSpring/user/register?subscriptionId=" + subscriptionId + "&channelName=" + channelName);	
});
