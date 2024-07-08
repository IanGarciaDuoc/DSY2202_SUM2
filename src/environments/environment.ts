// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiDsBsFNQ-KE31iHY4ADCLD2xztxRruAw",
  authDomain: "vinachos-fd78e.firebaseapp.com",
  projectId: "vinachos-fd78e",
  storageBucket: "vinachos-fd78e.appspot.com",
  messagingSenderId: "153508477926",
  appId: "1:153508477926:web:74723125c21f200eb67427",
  measurementId: "G-3DP6PZ5134"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);