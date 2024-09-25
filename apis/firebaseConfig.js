// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// WARNING FROM DEV, THIS IS A TEST PROJECT, PLEASE DON'T SPAM (it probably won't work after a few days)
const firebaseConfig = {
  // your api stuff here
  apiKey: "AIzaSyAkK4A4WcyWTBwk7mAbxasCzW77rn6in04",
  authDomain: "react-firebase-demo-f9ba3.firebaseapp.com",
  projectId: "react-firebase-demo-f9ba3",
  storageBucket: "react-firebase-demo-f9ba3.appspot.com",
  messagingSenderId: "42717602420",
  appId: "1:42717602420:web:bdd4c0cf7f2e97c992e721",
  measurementId: "G-YXQSW5HQGF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
// Initialize Auth with AsyncStorage for persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
// const auth = initializeAuth(app);

export {app, db, analytics, auth};