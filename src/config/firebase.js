import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA7cEgrR8CPoFUgdk1vaXviiuPmimLSGok",
  authDomain: "uts-deep-learning---facetrace.firebaseapp.com",
  projectId: "uts-deep-learning---facetrace",
  storageBucket: "uts-deep-learning---facetrace.appspot.com",
  messagingSenderId: "904455652730",
  appId: "1:904455652730:web:1d97af583deb95100482c3",
  measurementId: "G-6KFLREL96E",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
