import {
  FiSearch,
  FiBell,
  FiMoon,
} from "react-icons/fi";

function Navbar() {
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
            src="https://i.pravatar.cc/100?img=32"
            alt=""
          />

          <div>

            <h4>Nora</h4>

            <span>Manager</span>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;