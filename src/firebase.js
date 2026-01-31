// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{getAuth}from"firebase/auth";
import{getStorage}from "firebase/storage";
// import { getAuth,GoogleAuthProvider } from "firebase/auth";
import{getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYBirUX3OqryZ06vc542eAGsMNRL_WEUk",
  authDomain: "fem-hack-5345a.firebaseapp.com",
  projectId: "fem-hack-5345a",
  storageBucket: "fem-hack-5345a.firebasestorage.app",
  messagingSenderId: "312004498909",
  appId: "1:312004498909:web:0d0694fb016fcefed71234"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db= getFirestore(app)
export const storage = getStorage(app);
// export const googleProvider = GoogleAuthProvider();