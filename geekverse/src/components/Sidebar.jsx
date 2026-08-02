import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  FiHome,
  FiFilm,
  FiBookOpen,
  FiHeart,
  FiShoppingBag,
  FiUser,
  FiSettings,
  FiArchive,
} from "react-icons/fi";

import { MdOutlineCollectionsBookmark } from "react-icons/md";
import { PiBooksDuotone } from "react-icons/pi";
import { HiSparkles } from "react-icons/hi2";

import { useUser } from "../context/UserContext";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useUser();

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

        {user?.premium ? (

          <>
            <h3>👑 Premium Member</h3>

            <p>
              Your Premium membership is active.
            </p>

            <button
              onClick={() => navigate("/premium")}
            >
              View Benefits
            </button>
          </>

        ) : (

          <>
            <h3>👑 Become a Member</h3>

            <p>
              Unlock premium movies, books,
              manga and comics with
              exclusive benefits.
            </p>

            <button
              onClick={() => navigate("/premium")}
            >
              Join Now
            </button>
          </>

        )}

      </div>

      {/* Dark Mode */}
      <div className="dark-mode">

        <span>Dark Mode</span>

        <label className="switch">

          <input
            type="checkbox"
            defaultChecked
          />

          <span className="slider"></span>

        </label>

      </div>

    </aside>
  );
}

export default Sidebar;