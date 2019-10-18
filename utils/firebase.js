import * as firebase from "firebase/app";
require("firebase/auth");
require("firebase/firestore");

console.log(process.env.FIREBASE_API_KEY);

// Initialize firebase

const app = firebase.apps.length
    ? firebase.app()
    : firebase.initializeApp(firebaseConfig);

let firestore, auth;

try {
    firestore = firebase.firestore();
    auth = firebase.auth();
} catch (error) {
    console.error(error);
}

export { app, firebase, firestore, auth };
