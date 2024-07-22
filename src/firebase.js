// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "marapukkalam.firebaseapp.com",
  projectId: "marapukkalam",
  storageBucket: "marapukkalam.appspot.com",
  messagingSenderId: "543600137432",
  appId: "1:543600137432:web:6a586a202d3e1dad9fb3ad",
  measurementId: "G-CPL0R9170Y"
};

// Initialize Firebase
export  const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);