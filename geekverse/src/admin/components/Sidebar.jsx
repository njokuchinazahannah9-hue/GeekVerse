import { NavLink } from "react-router-dom";

import {
  FiGrid,
  FiPackage,
  FiShoppingCart,
  FiUsers,
  FiUserCheck,
  FiShield,
  FiBarChart2,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

function AdminSidebar() {
  return (
    <aside className="admin-sidebar">

      {/* Logo */}

      <div className="admin-logo">

        <div className="logo-circle">
          GV
        </div>

        <div>

          <h2>GeekVerse</h2>

          <span>Admin Dashboard</span>

        </div>

      </div>

      {/* Navigation */}

      <nav className="admin-menu">

        <NavLink to="/admin" end>
          <FiGrid />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/admin/products">
          <FiPackage />
          <span>Products</span>
        </NavLink>

        <NavLink to="/admin/orders">
          <FiShoppingCart />
          <span>Orders</span>
        </NavLink>

        <NavLink to="/admin/users">
          <FiUsers />
          <span>Users</span>
        </NavLink>

        <NavLink to="/admin/staff">
          <FiUserCheck />
          <span>Staff</span>
        </NavLink>

        <NavLink to="/admin/managers">
          <FiShield />
          <span>Managers</span>
        </NavLink>

        <NavLink to="/admin/analytics">
          <FiBarChart2 />
          <span>Analytics</span>
        </NavLink>

        <NavLink to="/admin/settings">
          <FiSettings />
          <span>Settings</span>
        </NavLink>

      </nav>

      {/* Logout */}

      <button className="logout-btn">

        <FiLogOut />

        Logout

      </button>

    </aside>
  );
}

export default AdminSidebar;