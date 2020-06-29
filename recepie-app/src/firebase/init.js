import firebase from "firebase";
import firestore from "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBRs5lVuqyCXM7N_tIJC6CnUPvsGuXLLiw",
  authDomain: "vue-recepie-app-ninja.firebaseapp.com",
  databaseURL: "https://vue-recepie-app-ninja.firebaseio.com",
  projectId: "vue-recepie-app-ninja",
  storageBucket: "",
  messagingSenderId: "474361048009",
  appId: "1:474361048009:web:66b1209fd640b7f0"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();
