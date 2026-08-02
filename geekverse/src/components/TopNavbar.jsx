import { useState, useEffect, useRef } from "react";
import {
  FiSearch,
  FiBell,
  FiShoppingCart,
  FiMenu,
  FiStar,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";

import QuickPanel from "./QuickPanel";
import NotificationDropdown from "./NotificationDropdown";

import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

function TopNavbar() {
  const [search, setSearch] = useState("");

  const [showQuickPanel, setShowQuickPanel] =
    useState(false);

  const [showNotifications, setShowNotifications] =
    useState(false);

  const dropdownRef = useRef(null);

  const { user } = useUser();

  const navigate = useNavigate();

  const { totalItems } = useCart();

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setShowNotifications(false);
        setShowQuickPanel(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  async function handleLogout() {
  try {
    await signOut(auth);

    navigate("/login");

  } catch (error) {
    console.error(error);
    alert("Failed to logout.");
  }
}

  function handleSearch(e) {
  if (e) e.preventDefault();

  const query = search.trim();

  console.log("Searching:", query);

  if (!query) return;

  navigate(`/search?q=${encodeURIComponent(query)}`);

  setSearch("");
}

  return (
    <header className="top-navbar">

      <form
        className="search-bar"
        onSubmit={handleSearch}
      >
        <FiSearch />

        <input
  type="text"
  placeholder="Search movies, manga, books..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  }}
/>

       <button
  type="button"
  className="search-btn"
  onClick={handleSearch}
>
  Search
</button>
      </form>

      <div className="nav-right">

        {/* Notifications */}
        <div
          className="icon-btn"
          onClick={() => {
            setShowNotifications(
              !showNotifications
            );
            setShowQuickPanel(false);
          }}
        >
          <FiBell />
          <span>4</span>
        </div>

        {/* Cart */}
        <div
          className="icon-btn"
          onClick={() => navigate("/cart")}
        >
          <FiShoppingCart />
          <span>{totalItems}</span>
        </div>

        {/* Profile */}
        <div
  className="nav-profile"
  onClick={() => navigate("/profile")}
>
  <img
    src={
      user.avatar ||
      "https://i.pravatar.cc/150"
    }
    alt={user.name}
  />

  <div>
    <h4>{user.name}</h4>

    <p>
      {user.premium
        ? "Premium Member"
        : "Free Member"}
    </p>
  </div>
</div>

{user && (

  <button
    className="logout-btn"
    onClick={handleLogout}
  >
    Logout
  </button>

)}

        {/* Premium */}
        <button
          className="premium-nav-btn"
          onClick={() =>
            navigate("/premium")
          }
        >
          <FiStar />
          <span>Premium</span>
        </button>

        {/* Quick Panel */}
        <div
          className="icon-btn"
          onClick={() => {
            setShowQuickPanel(
              !showQuickPanel
            );
            setShowNotifications(false);
          }}
        >
          <FiMenu />
        </div>

      </div>

      <div ref={dropdownRef}>

        <QuickPanel
          show={showQuickPanel}
        />

        <NotificationDropdown
          show={showNotifications}
        />

      </div>

    </header>
  );
}

export default TopNavbar;