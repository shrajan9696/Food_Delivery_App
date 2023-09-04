// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider  } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9qF82zVL0KAxzSML6HTJXdq8zEafXp10",
  authDomain: "react-http-5bc5a.firebaseapp.com",
  databaseURL: "https://react-http-5bc5a-default-rtdb.firebaseio.com",
  projectId: "react-http-5bc5a",
  storageBucket: "react-http-5bc5a.appspot.com",
  messagingSenderId: "158663764029",
  appId: "1:158663764029:web:60407ff39026a3e2afa254"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth,provider};