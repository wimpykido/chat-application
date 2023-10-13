import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { setPersistence, browserSessionPersistence } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAUWmEImmNltgSrzcjEuqUySlmGdmQWfUw",
  authDomain: "chat-application-9e8b8.firebaseapp.com",
  projectId: "chat-application-9e8b8",
  storageBucket: "chat-application-9e8b8.appspot.com",
  messagingSenderId: "35338722063",
  appId: "1:35338722063:web:70fc00b82383776a2efc7a",
  measurementId: "G-7D6YJ9HP2M",
};

// Initialize Firebase and Firebase Authentication
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();
setPersistence(auth, browserSessionPersistence);
export { auth, db, storage };
