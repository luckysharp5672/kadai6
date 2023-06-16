var x = document.getElementById("demo");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude;
}

let map;
let apiKey = ''; // ここにBing Maps API keyを入れる

function loadMap() {
    map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
      credentials: apiKey
    });
  
    navigator.geolocation.getCurrentPosition(function (position) {
      let loc = new Microsoft.Maps.Location(position.coords.latitude, position.coords.longitude);
  
      map.setView({ center: loc, zoom: 14 });
    });
}

function loadMapScenario() {
    map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
        credentials: apiKey
    });
  
    navigator.geolocation.getCurrentPosition(function (position) {
      let loc = new Microsoft.Maps.Location(position.coords.latitude, position.coords.longitude);
  
      // 現在位置に青色のプッシュピンを追加
      let pushpin = new Microsoft.Maps.Pushpin(loc, { color: 'blue' });
      map.entities.push(pushpin);
  
      map.setView({ center: loc, zoom: 14 });
    });
  }

  let currentLocationPushpin; // 現在位置のプッシュピンを保持するためのグローバル変数

  function showPosition(position) {
    var loc = new Microsoft.Maps.Location(position.coords.latitude, position.coords.longitude);
  
    // 前のプッシュピンがあれば削除
    if (currentLocationPushpin) {
      map.entities.remove(currentLocationPushpin);
    }
  
    // 新しいプッシュピンを作成し、地図に追加
    currentLocationPushpin = new Microsoft.Maps.Pushpin(loc, { color: 'blue' });
    map.entities.push(currentLocationPushpin);
  
    // 地図のビューを更新
    map.setView({ center: loc, zoom: 14 });
  }