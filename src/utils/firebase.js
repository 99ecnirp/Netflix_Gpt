// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-cADeyfnbltv-BrWqeFdS3AZZh-PCTx0",
  authDomain: "netflix-gpt-ecnirp.firebaseapp.com",
  projectId: "netflix-gpt-ecnirp",
  storageBucket: "netflix-gpt-ecnirp.appspot.com",
  messagingSenderId: "164051677887",
  appId: "1:164051677887:web:ee2282c565ddd06e2a8c0a",
  measurementId: "G-XNX40Y76X0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();