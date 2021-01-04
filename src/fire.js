import firebase from 'firebase'
import "firebase/firestore"
// Required for side-effects
require("firebase/firestore");
require("firebase");
// Required for side-effects
require('firebase/auth')
require('firebase-admin')
    // Set the configuration for your app
     var fire = firebase.initializeApp ( {
        apiKey: "AIzaSyBVJksDX51DyOaSiuquAq0mG3O_wO_ooVo",
        authDomain: "iot-dashboard-a6a92.firebaseapp.com",
        databaseURL: "https://iot-dashboard-a6a92-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "iot-dashboard-a6a92",
        storageBucket: "iot-dashboard-a6a92.appspot.com",
        messagingSenderId: "1074827536202",
        appId: "1:1074827536202:web:663708905b3befa52043b3",
        measurementId: "G-88RXNW35SS"
     })

      
      

      export default fire;
