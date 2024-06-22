// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0NzcYffkY-mQkhjUPPq3jJBwQBqSrm4s",
  authDomain: "apmw-c04bd.firebaseapp.com",
  projectId: "apmw-c04bd",
  storageBucket: "apmw-c04bd.appspot.com",
  messagingSenderId: "144039735450",
  appId: "1:144039735450:web:6e05426d6454841fbe2f23",
  measurementId: "G-L0GMEBV2Z0",
  databaseURL:
    "https://apmw-c04bd-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
