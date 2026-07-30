import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBvvyg8bX8qIzmwcVX9EA3mAfKEf8qHvfk",
  authDomain: "geekverse-d52ea.firebaseapp.com",
  projectId: "geekverse-d52ea",
  storageBucket: "geekverse-d52ea.firebasestorage.app",
  messagingSenderId: "916964428992",
  appId: "1:916964428992:web:53263f05f3ff20b15c3125",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export default app;