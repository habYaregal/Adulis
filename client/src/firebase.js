// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCiIj-MOeAbWnR3Mqlp59ctLD8khKaYkPM",
  authDomain: "adulis-8b0dc.firebaseapp.com",
  projectId: "adulis-8b0dc",
  storageBucket: "adulis-8b0dc.appspot.com",
  messagingSenderId: "1039022634330",
  appId: "1:1039022634330:web:66386069017fd5eecfaf63"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };