import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAajWiiI3NlFaCqUJhao58rY42oatJJ5-A",
  authDomain: "elmaestroapp.firebaseapp.com",
  projectId: "elmaestroapp",
  storageBucket: "elmaestroapp.appspot.com",
  messagingSenderId: "1098289482815",
  appId: "1:1098289482815:web:28804d6e8dd40376f03c8a",
  measurementId: "G-7MP6YYKCLX"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export { db, app };

