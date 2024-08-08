// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from "firebase/auth";
import {getStorage, ref, listAll, getDownloadURL} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1gyghUynMICkQat8axPsYYV5-moR38fA",
  authDomain: "inventory-management-5ab69.firebaseapp.com",
  projectId: "inventory-management-5ab69",
  storageBucket: "inventory-management-5ab69.appspot.com",
  messagingSenderId: "798280330863",
  appId: "1:798280330863:web:1ea9e38211815705a3a79a",
  measurementId: "G-VXK5CGRQ5P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const firestore = getFirestore(app)
const auth = getAuth(app);
const storage = getStorage(app);
export {firestore,auth,storage, ref, listAll, getDownloadURL}