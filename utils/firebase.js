import * as firebase from "firebase/app";
require("firebase/auth");
require("firebase/firestore");
require("firebase/functions");
require("firebase/storage");

var firebaseConfig = {
    apiKey: "AIzaSyDl11Epe8rmJtuy8TsqoaX6h7G-ICvm1yU",
    projectId: "nate-a76c4",
    measurementId: "G-2BZ63LPBHY",
    messagingSenderId: "345362250842",
    authDomain: "nate-a76c4.firebaseapp.com",
    databaseURL: "https://nate-a76c4.firebaseio.com",
    storageBucket: "nate-a76c4.appspot.com",
    appId: "1:345362250842:web:b896f57f394681f818ec63",
};

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
