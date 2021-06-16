import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyBdt2-Ht9T9RX6zkJTB73r8S5UlHvT3ZeA",
  authDomain: "whatsapp-mern-70322.firebaseapp.com",
  projectId: "whatsapp-mern-70322",
  storageBucket: "whatsapp-mern-70322.appspot.com",
  messagingSenderId: "912934835969",
  appId: "1:912934835969:web:68698ab1f95034d33b6d00"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
//const db = firebaseApp.firestore();
const auth = firebase.auth(); 
const provider = new firebase.auth.GoogleAuthProvider();

export {auth,provider};