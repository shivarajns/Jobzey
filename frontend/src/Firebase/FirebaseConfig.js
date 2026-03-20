import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBqR2r5HbmgPiKAzxS6KLese7PHb0QApd4",
  authDomain: "jobzey-1daeb.firebaseapp.com",
  projectId: "jobzey-1daeb",
  storageBucket: "jobzey-1daeb.firebasestorage.app",
  messagingSenderId: "631660645802",
  appId: "1:631660645802:web:398cfff2a832e55c2c2fd3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(initializeApp(firebaseConfig));


export default auth