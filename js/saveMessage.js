var firebaseConfig = {
// ここにFirebase API KEYを入れる
};
    
    firebase.initializeApp(firebaseConfig);
    var database = firebase.database();
    
    function getLocationAndSaveMessage() {
            var message = document.getElementById("message").value;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
            saveMessage(position.coords.latitude, position.coords.longitude, message);
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    function saveMessage(lat, long, message) {
        var newMessageKey = database.ref().child('messages').push().key;
        
        var updates = {};
        updates['/messages/' + newMessageKey] = {lat: lat, long: long, message: message};

        return database.ref().update(updates);
    }