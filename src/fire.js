import firebase from 'firebase'
require('firebase/auth')

    // Set the configuration for your app
    var config = {
        apiKey: "AIzaSyBVJksDX51DyOaSiuquAq0mG3O_wO_ooVo",
        authDomain: "iot-dashboard-a6a92.firebaseapp.com",
        databaseURL: "https://iot-dashboard-a6a92-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "iot-dashboard-a6a92",
        storageBucket: "iot-dashboard-a6a92.appspot.com",
        messagingSenderId: "1074827536202",
        appId: "1:1074827536202:web:663708905b3befa52043b3",
        measurementId: "G-88RXNW35SS"
      };

      var fire = firebase.initializeApp(config);
      export default fire;
