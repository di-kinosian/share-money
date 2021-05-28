import firebase from "firebase/app";
// eslint-disable-next-line import/no-duplicates
import "firebase/auth";
import "firebase/database";
// eslint-disable-next-line import/no-duplicates
import "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyA_iQuSL5zAGk7sIIV3bmHSp4-FPMQ6IWQ",
    authDomain: "share-money-be.firebaseapp.com",
    databaseURL:
        "https://share-money-be-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "share-money-be",
    storageBucket: "share-money-be.appspot.com",
    messagingSenderId: "1086591812627",
    appId: "1:1086591812627:web:8aed3c4b214996ae2febe6",
    measurementId: "G-ZDTS5RJWF9",
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
}

export default firebase;
