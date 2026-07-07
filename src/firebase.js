import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCh4ZAnKmsDIJZ3qNHUdIhWpT0sht8C10M",
  authDomain: "batch-bridge.firebaseapp.com",
  projectId: "batch-bridge",
  storageBucket: "batch-bridge.firebasestorage.app",
  messagingSenderId: "853642215604",
  appId: "1:853642215604:web:a255f5f7f9a55d6b6457e1",
  measurementId: "G-E52S7DYMYK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection };
