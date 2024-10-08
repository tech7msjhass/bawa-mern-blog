// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mandeep-blog.firebaseapp.com",
  projectId: "mandeep-blog",
  storageBucket: "mandeep-blog.appspot.com",
  messagingSenderId: "350370962231",
  appId: "1:350370962231:web:11510a54ee46ea4b0c98b2",
  measurementId: "G-PMB374T77E",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
