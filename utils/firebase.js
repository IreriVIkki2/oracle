import config from "../config/config";
import * as firebase from "firebase/app";
require("firebase/auth");
require("firebase/firestore");
require("firebase/functions");
require("firebase/storage");

var firebaseConfig = {
    apiKey: config.apiKey,
    projectId: config.projectId,
    measurementId: config.measurementId,
    messagingSenderId: config.messagingSenderId,
    authDomain: config.authDomain,
    databaseURL: config.databaseURL,
    storageBucket: config.storageBucket,
    appId: config.appId,
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
