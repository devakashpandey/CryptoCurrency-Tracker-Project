import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
                      apiKey: "AIzaSyCHdK1UlEzVz5te_ZHtQUgnVnI9jIHy_6Q",
                      authDomain: "crypto-tracker-b2c7f.firebaseapp.com",
                      projectId: "crypto-tracker-b2c7f",
                      storageBucket: "crypto-tracker-b2c7f.appspot.com",
                      messagingSenderId: "1017486958427",
                      appId: "1:1017486958427:web:2540061692f3be8b29447e"
 };

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)

export { auth, db };

