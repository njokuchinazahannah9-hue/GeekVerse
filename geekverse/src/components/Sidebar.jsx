import { useState } from "react";
import PremiumModal from "../components/PremiumModal";

import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiFilm,
  FiBookOpen,
  FiHeart,
  FiShoppingBag,
  FiUser,
  FiSettings,
} from "react-icons/fi";

import { MdOutlineCollectionsBookmark } from "react-icons/md";
import { PiBooksDuotone } from "react-icons/pi";
import { HiSparkles } from "react-icons/hi2";
import { useUser } from "../context/UserContext";
import { FiArchive } from "react-icons/fi";


function Sidebar() {
  const [showPremium, setShowPremium] =
  useState(false);
  const location = useLocation();
  const { user, updateUser } = useUser();

  function handlePremiumUpgrade() {
  if (user.premium) {
    alert("You're already a Premium Member.");
    return;
  }

  if (user.wallet < 10) {
    alert("Insufficient Wallet Balance.");
    return;
  }

  updateUser({
    wallet: user.wallet - 10,
    premium: true,
  });

  alert("🎉 Welcome to GeekVerse Premium!");

  setShowPremium(false);
}

  return (
    <aside className="sidebar">

      {/* Logo */}
      <div className="logo">
        <HiSparkles className="logo-icon" />
        <h2>
          Geek<span>Verse</span>
        </h2>
      </div>

      {/* Menu */}
      <ul className="menu">

        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/">
            <FiHome />
            <span>Home</span>
          </Link>
        </li>

        <li className={location.pathname === "/movies" ? "active" : ""}>
          <Link to="/movies">
            <FiFilm />
            <span>Movies</span>
          </Link>
        </li>

        <li className={location.pathname === "/manga" ? "active" : ""}>
          <Link to="/manga">
            <PiBooksDuotone />
            <span>Manga</span>
          </Link>
        </li>

        <li className={location.pathname === "/books" ? "active" : ""}>
          <Link to="/books">
            <FiBookOpen />
            <span>Books</span>
          </Link>
        </li>

        <li
  className={
    location.pathname === "/comics"
      ? "active"
      : ""
  }
>
  <Link to="/comics">
    <MdOutlineCollectionsBookmark />
    <span>Comics</span>
  </Link>
</li>

        <li className={location.pathname === "/wishlist" ? "active" : ""}>
          <Link to="/wishlist">
            <FiHeart />
            <span>Wishlist</span>
          </Link>
        </li>

        <li
  className={
    location.pathname === "/library"
      ? "active"
      : ""
  }
>
  <Link to="/library">
    <FiArchive />
    <span>My Library</span>
  </Link>
</li>

        <li className={location.pathname === "/cart" ? "active" : ""}>
          <Link to="/cart">
            <FiShoppingBag />
            <span>Cart</span>
          </Link>
        </li>

        <li className={location.pathname === "/profile" ? "active" : ""}>
          <Link to="/profile">
            <FiUser />
            <span>Profile</span>
          </Link>
        </li>

        <li className={location.pathname === "/settings" ? "active" : ""}>
  <Link to="/settings">
    <FiSettings />
    <span>Settings</span>
  </Link>
</li>

      </ul>

      {/* Premium Box */}
      <div className="premium-box">
        <h3>👑 Become a Member</h3>

        <p>
          Unlock premium movies, books, manga and comics with exclusive benefits.
        </p>

        <button
  onClick={() => setShowPremium(true)}
>
  Join Now
</button>
      </div>

      {/* Dark Mode */}
      <div className="dark-mode">
        <span>Dark Mode</span>

        <label className="switch">
          <input type="checkbox" defaultChecked />
          <span className="slider"></span>
        </label>
      </div>

      

<PremiumModal
  show={showPremium}
  onClose={() => setShowPremium(false)}
  onUpgrade={handlePremiumUpgrade}
/>
    </aside>
  );
}

export default Sidebar;