// Import the functions you need from the Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword as signInWithEmailAndPasswordFirebase, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtq3i3emo88rNL90C5JMZMwGmgc617p9I",
  authDomain: "english-courses-adenilson.firebaseapp.com",
  projectId: "english-courses-adenilson",
  storageBucket: "english-courses-adenilson.appspot.com",
  messagingSenderId: "1047482281392",
  appId: "1:1047482281392:web:5a8e7b2fd0874bbd0afa75",
  measurementId: "G-5TRGBP6V13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Get the Firebase Auth instance
const auth = getAuth();

// Rename your custom functions to avoid conflicts
const customSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPasswordFirebase(auth, email, password);
};

const customRegisterWithEmailAndPassword = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export { customSignInWithEmailAndPassword, customRegisterWithEmailAndPassword };
