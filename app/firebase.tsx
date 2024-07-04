// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbQzxDkpuZYQtHmllnAGtL7OsXYybrEBA",
  authDomain: "imtihon-8601d.firebaseapp.com",
  databaseURL:
    "https://imtihon-8601d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "imtihon-8601d",
  storageBucket: "imtihon-8601d.appspot.com",
  messagingSenderId: "1044443738741",
  appId: "1:1044443738741:web:2bea82aaf17ec236727e3c",
  measurementId: "G-C2CZ05GLBQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
