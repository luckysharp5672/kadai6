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

    let pushpin = new Microsoft.Maps.Pushpin(loc);
    map.entities.push(pushpin);

    map.setView({ center: loc, zoom: 14 });
  });
}
