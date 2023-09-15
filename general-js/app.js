// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

// Your Firebase configuration (same as login and registration pages)
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

// Get the Firebase Auth instance
const auth = getAuth(app); // Notice the 'app' parameter here

// Function to sign in with Email/Password
const signInWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

// Function to register a new user with Email/Password
const registerWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export { signInWithEmailAndPassword, registerWithEmailAndPassword };