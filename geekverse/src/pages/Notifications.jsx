import { useState, useEffect } from "react";

import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";

import { useAuth } from "../context/AuthContext";

import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  updateDoc,
  doc,
  writeBatch,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

function Notifications() {

  const { currentUser } = useAuth();

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {

    if (!currentUser) return;

    const q = query(

      collection(db, "notifications"),

      where("userId", "==", currentUser.uid),

      orderBy("createdAt", "desc")

    );

    const unsubscribe = onSnapshot(

      q,

      (snapshot) => {

        const data = snapshot.docs.map((doc) => ({

          id: doc.id,

          ...doc.data(),

        }));

        setNotifications(data);

      }

    );

    return unsubscribe;

  }, [currentUser]);

  async function markAsRead(id) {

    try {

      await updateDoc(

        doc(db, "notifications", id),

        {

          read: true,

        }

      );

    } catch (error) {

      console.error(error);

    }

  }

  async function clearAll() {

    try {

      const batch = writeBatch(db);

      notifications.forEach((note) => {

        batch.delete(

          doc(db, "notifications", note.id)

        );

      });

      await batch.commit();

    } catch (error) {

      console.error(error);

    }

  }

  return (

    <div className="dashboard">

      <Sidebar />

      <main className="main-area">

        <TopNavbar />

        <div className="page-container">

          <div className="page-header">

            <h1>Notifications</h1>

            <button
              className="clear-btn"
              onClick={clearAll}
            >
              Clear All
            </button>

          </div>

          {notifications.length === 0 ? (

            <h3>No Notifications Yet.</h3>

          ) : (

            notifications.map((note) => (

              <div
                key={note.id}
                className={`notification-card ${
                  note.read ? "read" : ""
                }`}
              >

                <h3>{note.title}</h3>

                <p>{note.message}</p>

                <small>

                  {note.createdAt?.toDate
                    ? note.createdAt
                        .toDate()
                        .toLocaleString()
                    : ""}

                </small>

                {!note.read && (

                  <button
                    onClick={() =>
                      markAsRead(note.id)
                    }
                  >
                    Mark as Read
                  </button>

                )}

              </div>

            ))

          )}

        </div>

      </main>

    </div>

  );

}

export default Notifications;