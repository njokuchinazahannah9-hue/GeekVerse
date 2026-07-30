import {
  FiBell,
  FiCheckCircle,
  FiGift,
  FiFilm,
  FiDollarSign,
} from "react-icons/fi";

import "../styles/NotificationDropdown.css";

function NotificationDropdown({ show }) {
  if (!show) return null;

  const notifications = [
    {
      id: 1,
      icon: <FiCheckCircle />,
      title: "Welcome to GeekVerse",
      time: "Just now",
    },
    {
      id: 2,
      icon: <FiFilm />,
      title: "New Movies Added",
      time: "2 hours ago",
    },
    {
      id: 3,
      icon: <FiGift />,
      title: "Daily Reward Available",
      time: "Today",
    },
    {
      id: 4,
      icon: <FiDollarSign />,
      title: "Wallet Funded",
      time: "Yesterday",
    },
  ];

  return (
    <div className="notification-dropdown">

      <div className="notification-header">
        <FiBell />
        <h3>Notifications</h3>
      </div>

      <div className="notification-list">

        {notifications.map((item) => (
          <div
            key={item.id}
            className="notification-item"
          >
            <div className="notification-icon">
              {item.icon}
            </div>

            <div>
              <h4>{item.title}</h4>
              <p>{item.time}</p>
            </div>
          </div>
        ))}

      </div>

      <button className="mark-read-btn">
        Mark all as read
      </button>

    </div>
  );
}

export default NotificationDropdown;