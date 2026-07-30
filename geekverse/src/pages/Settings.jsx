import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";


import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function Settings() {
  const navigate = useNavigate();

  const { currentUser, logout } = useAuth();
  const { clearCart } = useCart();
  const { clearWishlist } = useWishlist();

  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [newReleases, setNewReleases] = useState(true);
  const [language, setLanguage] = useState("English");

  async function handleLogout() {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (error) {
      alert("Failed to logout.");
    }
  }

  function handleClearCart() {
    if (window.confirm("Clear all items from cart?")) {
      clearCart();
      alert("Cart cleared!");
    }
  }

  function handleClearWishlist() {
    if (window.confirm("Clear your wishlist?")) {
      clearWishlist();
      alert("Wishlist cleared!");
    }
  }

  return (
    <div className="dashboard">
      <Sidebar />

      <main className="main-area">
        <TopNavbar />

        <div className="settings-page">

          <h1>⚙️ Settings</h1>

          {/* Account */}

          <div className="settings-card">

            <h2>👤 Account</h2>

            <div className="setting-row">
              <span>Email</span>
              <span className="setting-value">
                {currentUser?.email}
              </span>
            </div>

            <div className="setting-row">
              <span>Membership</span>
              <span className="premium-text">
                ⭐ Premium Geek
              </span>
            </div>

            <button
              className="settings-btn logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>

          {/* Notifications */}

          <div className="settings-card">

            <h2>🔔 Notifications</h2>

            <div className="setting-row">
              <span>Enable Notifications</span>

              <input
                type="checkbox"
                checked={notifications}
                onChange={() =>
                  setNotifications(!notifications)
                }
              />
            </div>

            <div className="setting-row">
              <span>Email Notifications</span>

              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={() =>
                  setEmailNotifications(
                    !emailNotifications
                  )
                }
              />
            </div>

            <div className="setting-row">
              <span>New Releases</span>

              <input
                type="checkbox"
                checked={newReleases}
                onChange={() =>
                  setNewReleases(!newReleases)
                }
              />
            </div>

          </div>

          {/* Language */}

          <div className="settings-card">

            <h2>🌍 Language</h2>

            <select
              value={language}
              onChange={(e) =>
                setLanguage(e.target.value)
              }
            >
              <option>English</option>
              <option>French</option>
              <option>Spanish</option>
            </select>

          </div>

          {/* Data */}

          <div className="settings-card">

            <h2>🛒 Data Management</h2>

            <button
              className="settings-btn"
              onClick={handleClearWishlist}
            >
              Clear Wishlist
            </button>

            <button
              className="settings-btn danger-btn"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>

          </div>

          {/* Support */}

          <div className="settings-card">

            <h2>💬 Support</h2>

            <button
              className="settings-btn"
              onClick={() =>
                window.open(
                  "mailto:support@geekverse.com"
                )
              }
            >
              Contact Support
            </button>

          </div>

          {/* About */}

          <div className="settings-card">

            <h2>ℹ️ About GeekVerse</h2>

            <p className="about-text">
              Version <strong>1.0.0</strong>
            </p>

            <p className="about-text">
              Built with React + Firebase
            </p>

            <p className="about-text">
              © 2026 GeekVerse
            </p>

          </div>

        </div>
      </main>

      
    </div>
  );
}

export default Settings;