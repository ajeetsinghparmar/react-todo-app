

import firebase from "firebase";
import "firebase/auth";



const firebaseApp = firebase.initializeApp({

    apiKey: "AIzaSyC03wu3g4nVTgXtHvsndD8ZYLdNAIKx130",
    authDomain: "react-app-8bf44.firebaseapp.com",
    projectId: "react-app-8bf44",
    storageBucket: "react-app-8bf44.appspot.com",
    messagingSenderId: "610936695024",
    appId: "1:610936695024:web:c34aafc1aed1489a0a3a35"

});

const db = firebaseApp.firestore();

const auth = firebaseApp.auth()

export {db, auth}

export default firebaseApp;