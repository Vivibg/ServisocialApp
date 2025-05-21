// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBmz65b1CksvYL3J-If5N0cs7fdk4qj6vw",
  authDomain: "servisocial-70c6d.firebaseapp.com",
  projectId: "servisocial-70c6d",
  storageBucket: "servisocial-70c6d.firebasestorage.app",
  messagingSenderId: "510617905744",
  appId: "1:510617905744:web:2d05caa2416f2fee9c3f55",
  measurementId: "G-0W64GM6KJL"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, app };
