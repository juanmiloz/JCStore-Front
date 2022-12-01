// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "@firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXrYtKvRSO-6_FQmZTFl5dmKXL9dWYMK8",
  authDomain: "jc-store-9e701.firebaseapp.com",
  projectId: "jc-store-9e701",
  storageBucket: "jc-store-9e701.appspot.com",
  messagingSenderId: "451643222896",
  appId: "1:451643222896:web:5ab02a4e641a8e06a37db5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default  getStorage(app);