// Import Firebase
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// Your Firebase configuration
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
const auth = getAuth();

// Function to sign in with Firebase
const signInWithFirebase = () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // User signed in successfully
            const user = userCredential.user;
            console.log('User signed in:', user);

            // Redirect the user to a different page
            window.location.href = './bem-vindo.html'; // Replace with the desired destination
        })
        .catch((error) => {
            // Handle sign-in errors
            console.error('Error signing in:', error);
        });
};