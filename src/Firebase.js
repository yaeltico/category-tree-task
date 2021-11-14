import { initializeApp } from "firebase/app";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1iK0yQgiFbZeUQb1ucdJipCeP-Lp2RyU",
  authDomain: "category-db-5f496.firebaseapp.com",
  projectId: "category-db-5f496",
  storageBucket: "category-db-5f496.appspot.com",
  messagingSenderId: "861207100037",
  appId: "1:861207100037:web:d1b146f2cc3c2e105407ec",
  databaseURL: "https://category-db-5f496-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const Firebase = initializeApp(firebaseConfig);

export default Firebase;
