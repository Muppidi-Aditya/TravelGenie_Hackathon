import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyBTwQwevc5CZklWOE-zWLRRr8-y__TJ6tM",
  authDomain: "travelgenie-305fc.firebaseapp.com",
  projectId: "travelgenie-305fc",
  storageBucket: "travelgenie-305fc.firebasestorage.app",
  messagingSenderId: "842503801309",
  appId: "1:842503801309:web:cbfc08acea97897a84ce34"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);  // Firestore instance

export { auth, db };
