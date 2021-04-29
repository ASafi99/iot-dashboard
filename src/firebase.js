
// src/firebase.js
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// TODO: Use a configuration object
firebase.initializeApp({
  projectId: '',
  appId: '',
  databaseURL: '',
  storageBucket: '',
  locationId: '',
  apiKey: '',
  authDomain: '',
  messagingSenderId: '',
});

const db = firebase.firestore();
const auth = firebase.auth;

// eslint-disable-next-line no-restricted-globals
if (location.hostname === 'localhost') {
  db.useEmulator('localhost', 8080);
  auth().useEmulator('http://localhost:9099/', { disableWarnings: true });
}

export default firebase;
export { db, auth };
