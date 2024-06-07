import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCDDe4i9TFPiVsMNSkkABfhvNLaT5lD2GU",
  authDomain: "the-astrum-news.firebaseapp.com",
  projectId: "the-astrum-news",
  storageBucket: "the-astrum-news.appspot.com",
  messagingSenderId: "467644112874",
  appId: "1:467644112874:web:a2cffbf403e5e164da9c93",
  measurementId: "G-Q84PG1VSKS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
export { db, storage };
