import firebase from "firebase";
import firestore from "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyB1seBajBQ9xe4FLmiX2eYpC9TVc1Inrr0",
  authDomain: "geo-location-app-ninja.firebaseapp.com",
  databaseURL: "https://geo-location-app-ninja.firebaseio.com",
  projectId: "geo-location-app-ninja",
  storageBucket: "geo-location-app-ninja.appspot.com",
  messagingSenderId: "237803592679",
  appId: "1:237803592679:web:e16bb5a184d6e079"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();
