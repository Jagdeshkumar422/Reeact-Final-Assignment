import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore, collection} from "firebase/firestore"
import { getStorage } from "firebase/storage";
import "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyCk4sAdXIJV4cuwRpvE3HJmE7SClFINdjE",
  authDomain: "reactassignment-1a44e.firebaseapp.com",
  projectId: "reactassignment-1a44e",
  storageBucket: "reactassignment-1a44e.appspot.com",
  messagingSenderId: "126812747965",
  appId: "1:126812747965:web:abde866685c156234cdfd4",
  measurementId: "G-M8ZNCZSLF5"
};

const app = initializeApp(firebaseConfig);

const auth =getAuth()
export const db =getFirestore(app)
export const userRef= collection(db, "userData")
export const PostRef= collection(db, "posts")
export const storage = getStorage(app)
export {auth, app, }