var firebaseConfig = {
// ここにfirebase API KEYを入れる
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

    
    // データベースからメッセージを取得し、それぞれに対してプッシュピンを作成します
    database.ref('/messages').once('value').then(function(snapshot) {
        var messages = snapshot.val();
        for (var key in messages) {
        var message = messages[key];
        addPushpinToMap(message.lat, message.long, 'orange');
        }
    });
    
    // 指定された色でプッシュピンを作成し、地図に追加します
    function addPushpinToMap(lat, long, color) {
        var location = new Microsoft.Maps.Location(lat, long);
        var pushpin = new Microsoft.Maps.Pushpin(location, { color: color });
        map.entities.push(pushpin);
    }

    //メッセージと位置情報を保存します    
    function getLocationAndSaveMessage() {
            var message = document.getElementById("message").value;

            if (navigator.geolocation) {
                return new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        resolve(saveMessage(position.coords.latitude, position.coords.longitude, message));
                    });
                });
            } else {
                alert("Geolocation is not supported by this browser.");
            }
    }

    function saveMessage(lat, long, message) {
        var newMessageKey = database.ref().child('messages').push().key;
        
        var updates = {};
        updates['/messages/' + newMessageKey] = {lat: lat, long: long, message: message};

        let loc = new Microsoft.Maps.Location(lat, long);
        let pushpin = new Microsoft.Maps.Pushpin(loc);
        map.entities.push(pushpin);

        return database.ref().update(updates)
            .then(() => {
                alert("保存しました");
            })
            .catch((error) => {
                alert("エラーが発生しました: " + error.message);
            });
    }