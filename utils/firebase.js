import * as firebase from "firebase/app";
require("firebase/auth");
require("firebase/firestore");
require("firebase/functions");
require("firebase/storage");

// Initialize firebase

const app = firebase.apps.length
    ? firebase.app()
    : firebase.initializeApp(firebaseConfig);

let firestore, auth;

try {
    firestore = firebase.firestore();
    auth = firebase.auth();
} catch (error) {
    throw error;
}

export { app, firebase, firestore, auth };
