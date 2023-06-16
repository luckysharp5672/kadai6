// Firebaseの設定情報
var firebaseConfig = {
// ここにFirebase API KEYを入れる
};

    var app;
    if (!firebase.apps.length) {
        app = firebase.initializeApp(firebaseConfig);
    } else {
      app = firebase.app(); // if already initialized, use that one
    }
    var database = app.database();

  // 地球の半径（km）
    var earthRadiusKm = 6371;
    
    function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
    }

  // 二点間の距離を計算する関数（Haversine formula）
    function getDistanceInKm(lat1, lon1, lat2, lon2) {
        var dLat = degreesToRadians(lat2 - lat1);
        var dLon = degreesToRadians(lon2 - lon1);
    
    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
    return earthRadiusKm * c;
    }

    function searchMessages() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
            var userLat = position.coords.latitude;
            var userLong = position.coords.longitude;
            
            var messagesRef = database.ref('messages');
                messagesRef.once('value', function(snapshot) {
                    snapshot.forEach(function(childSnapshot) {
                    var childData = childSnapshot.val();
                    var messageLat = childData.lat;
                    var messageLong = childData.long;
                    var message = childData.message;
                    
                    var distance = getDistanceInKm(userLat, userLong, messageLat, messageLong);
                    
                    // メッセージが50m以内にある場合
                    if(distance <= 0.05) {
                        alert("メッセージを見つけました: " + message);
                    }
                    });
                });
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }
