// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");
console.log("\n\n\n", `${process.env.FIREBASE_PROJECT_ID}`);

// TODO: Replace the following with your app's firebase project configuration
var firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    projectId: process.env.FIREBASE_PROJECT_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    authDomain: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
    databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
    storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
    appId: `1:${process.env.FIREBASE_MESSAGING_SENDER_ID}:web:b896f57f394681f818ec63`,
};

// Initialize firebase

const app = firebase.apps.length
    ? firebase.app()
    : firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const auth = firebase.auth();

export { app, firebase, firestore, auth };
