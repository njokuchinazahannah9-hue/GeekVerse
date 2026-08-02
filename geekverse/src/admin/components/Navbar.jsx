import { useEffect, useState } from "react";

import {
  FiSearch,
  FiBell,
  FiMoon,
} from "react-icons/fi";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "../../firebase/firebase";

import { useAuth } from "../../context/AuthContext";

function Navbar() {

  const { currentUser } = useAuth();

  const [manager, setManager] = useState(null);

  useEffect(() => {

    async function loadManager() {

      if (!currentUser) return;

      const snapshot = await getDoc(
        doc(db, "users", currentUser.uid)
      );

      if (snapshot.exists()) {

        setManager(snapshot.data());

      }

    }

    loadManager();

  }, [currentUser]);

  return (

    <header className="admin-navbar">

      <div className="navbar-search">

        <FiSearch />

        <input
          type="text"
          placeholder="Search..."
        />

      </div>

      <div className="navbar-right">

        <button className="icon-btn">

          <FiMoon />

        </button>

        <button className="icon-btn">

          <FiBell />

        </button>

        <div className="admin-user">

          <img
            src={
              manager?.avatar ||
              "https://i.pravatar.cc/100?img=32"
            }
            alt="Manager"
          />

          <div>

            <h4>

              {manager?.name || "Manager"}

            </h4>

            <span>

              {manager?.role || "Manager"}

            </span>

          </div>

        </div>

      </div>

    </header>

  );

}

export default Navbar;