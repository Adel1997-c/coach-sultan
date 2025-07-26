// firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC9zrzUSrKA5tPjRBmgRfKSs1-eqQJYc3Q",
  authDomain: "couch-me.firebaseapp.com",
  projectId: "couch-me",
  storageBucket: "couch-me.appspot.com",
  messagingSenderId: "582714505013",
  appId: "1:582714505013:web:1fcf3b20e735055f753e7c",
  measurementId: "G-LZSKN6QYT6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
