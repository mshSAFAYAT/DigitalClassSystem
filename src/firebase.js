import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';

const app = firebase.initializeApp({
    apiKey: "AIzaSyBCA2tglVem5tbEGywt1a6cH4lRvTw6V68",
    authDomain: "dcs-development-20e77.firebaseapp.com",
    projectId: "dcs-development-20e77",
    storageBucket: "dcs-development-20e77.appspot.com",
    messagingSenderId: "299937297682",
    appId: "1:299937297682:web:716df7beeb5f9b8730efcb"
})

const auth = app.auth();
const db = firebase.firestore();
export { auth, db };
export default app;