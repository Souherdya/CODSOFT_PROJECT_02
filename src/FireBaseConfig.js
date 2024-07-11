// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore,getDoc,doc,addDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVjFNN9tQubgYgX1eZkbt7bOa93pm5vZQ",
  authDomain: "quizfornothing.firebaseapp.com",
  projectId: "quizfornothing",
  storageBucket: "quizfornothing.appspot.com",
  messagingSenderId: "877100629961",
  appId: "1:877100629961:web:25051063ea0f05958ff218",
  measurementId: "G-Q50W55TJKL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};