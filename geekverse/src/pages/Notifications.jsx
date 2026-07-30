import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";


function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("notifications")) || [
        {
          id: 1,
          title: "Welcome to GeekVerse!",
          message: "Enjoy exploring Movies, Manga, Books and Comics.",
          read: false,
        },
        {
          id: 2,
          title: "New Movies Added",
          message: "Check out the latest trending movies.",
          read: false,
        },
        {
          id: 3,
          title: "Special Offer",
          message: "50% discount on selected premium content.",
          read: false,
        },
      ];

    setNotifications(saved);
    localStorage.setItem(
      "notifications",
      JSON.stringify(saved)
    );
  }, []);

  function markAsRead(id) {
    const updated = notifications.map((item) =>
      item.id === id
        ? { ...item, read: true }
        : item
    );

    setNotifications(updated);

    localStorage.setItem(
      "notifications",
      JSON.stringify(updated)
    );
  }

  function clearAll() {
    setNotifications([]);
    localStorage.setItem("notifications", "[]");
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
            <h3>No notifications</h3>
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