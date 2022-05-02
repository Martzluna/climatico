import { initializeApp } from "firebase/app"
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDvjrK1x15sJ5umUGj-DpQ0b5PnYecfuhM",
    authDomain: "prueba-tecnica-clima.firebaseapp.com",
    projectId: "prueba-tecnica-clima",
    storageBucket: "prueba-tecnica-clima.appspot.com",
    messagingSenderId: "263773120052",
    appId: "1:263773120052:web:1603a68426eb0c86c80c61"
}
// Initialize Firebase and Firestore
const google = new GoogleAuthProvider();
const facebook = new FacebookAuthProvider();
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export {
    db,
    google,
    facebook
}