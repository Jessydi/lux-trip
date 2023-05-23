import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB4qDvOnRBoKzWo6wk63Ao-g0ifG0sCeCM",
  authDomain: "firetrip-b1efe.firebaseapp.com",
  projectId: "firetrip-b1efe",
  storageBucket: "firetrip-b1efe.appspot.com",
  messagingSenderId: "141929569121",
  appId: "1:141929569121:web:858b6640367220c8784320",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { db, storage };
