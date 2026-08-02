import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

export async function sendNotification({
  userId,
  title,
  message,
  type = "general",
}) {
  try {
    await addDoc(
      collection(db, "notifications"),
      {
        userId,
        title,
        message,
        type,
        read: false,
        createdAt: serverTimestamp(),
      }
    );
  } catch (error) {
    console.error(error);
  }
}