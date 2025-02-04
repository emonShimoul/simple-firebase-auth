// Don't store config on the client side

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAML2Ojcyg77XAXJqo2ee2b2MxOvuwmurc",
  authDomain: "simple-firebase-auth-df48f.firebaseapp.com",
  projectId: "simple-firebase-auth-df48f",
  storageBucket: "simple-firebase-auth-df48f.firebasestorage.app",
  messagingSenderId: "139476965806",
  appId: "1:139476965806:web:303325c0471b45c03f103f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
