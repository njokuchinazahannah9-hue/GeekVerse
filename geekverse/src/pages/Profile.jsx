import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaUser,
  FaShoppingBag,
  FaHeart,
  FaCoins,
  FaShieldAlt,
  FaCamera,
  FaCrown,
} from "react-icons/fa";

import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";


import { useUser } from "../context/UserContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const navigate = useNavigate();

  const { user, updateUser } = useUser();
  const {
  currentUser,
  logout,
  changePassword,
} = useAuth();
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  const [activeTab, setActiveTab] =
  useState("overview");

const [showWallet, setShowWallet] =
  useState(false);

const [showPasswordModal, setShowPasswordModal] =
  useState(false);

const [currentPassword, setCurrentPassword] =
  useState("");

const [newPassword, setNewPassword] =
  useState("");

const [confirmPassword, setConfirmPassword] =
  useState("");

const [amount, setAmount] = useState("");

const [formData, setFormData] = useState({
  name: user.name,
  phone: user.phone,
  country: user.country,
  bio: user.bio,
});

  function handleChange(e) {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
}

async function saveProfile() {
  await updateUser(formData);

  alert("Profile updated successfully!");
}

  function handleImage(e) {
  const file = e.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    updateUser({
      avatar: reader.result,
    });
  };

  reader.readAsDataURL(file);
}
const cartItems = cart.reduce(
  (total, item) => total + item.quantity,
  0
);

const totalSpent = cart.reduce(
  (total, item) =>
    total + item.price * item.quantity,
  0
);

async function handleLogout() {
  try {
    await logout();
    navigate("/login", {
      replace: true,
    });
  } catch (error) {
    console.log(error);
  }
}

async function addMoney() {

  if (!amount || Number(amount) <= 0) {
    return alert("Enter a valid amount.");
  }

  await updateUser({
    wallet: user.wallet + Number(amount),
  });

  setAmount("");
  setShowWallet(false);

  alert("Wallet funded successfully!");
}

async function handlePasswordChange() {
  if (newPassword !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  if (newPassword.length < 6) {
    alert("Password must be at least 6 characters.");
    return;
  }

  try {
    await changePassword(
      currentPassword,
      newPassword
    );

    alert("Password changed successfully!");

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setShowPasswordModal(false);
  } catch (error) {
    alert(error.message);
  }
}
  return (
    <div className="dashboard">
      <Sidebar />
      {showWallet && (

<div className="wallet-modal">

<div className="wallet-box">

<h2>Add Money</h2>

<input
type="number"
placeholder="Enter amount"
value={amount}
onChange={(e)=>setAmount(e.target.value)}
/>

<div className="wallet-buttons">

<button
className="wallet-btn"
onClick={addMoney}
>
Fund Wallet
</button>

<button
className="cancel-btn"
onClick={() => setShowWallet(false)}
>
Cancel
</button>

</div>

</div>

</div>

)}

{showPasswordModal && (
  <div className="wallet-modal">

    <div className="wallet-box">

      <h2>Change Password</h2>

      <input
        type="password"
        placeholder="Current Password"
        value={currentPassword}
        onChange={(e) =>
          setCurrentPassword(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) =>
          setNewPassword(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) =>
          setConfirmPassword(e.target.value)
        }
      />

      <div className="wallet-buttons">

        <button
          className="wallet-btn"
          onClick={handlePasswordChange}
        >
          Save
        </button>

        <button
          className="cancel-btn"
          onClick={() =>
            setShowPasswordModal(false)
          }
        >
          Cancel
        </button>

      </div>

    </div>

  </div>
)}

      <main className="main-area">
        <TopNavbar />

        <div className="profile-page">

          {/* Cover */}
          <div className="profile-cover">
            <div className="profile-avatar">
              <img
                src={user.avatar}
                alt={user.name}
              />

              <label className="upload-btn">
                Change Photo

                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImage}
                />
              </label>
            </div>
          </div>

          {/* User */}
          <div className="profile-user">
            <h1>{currentUser?.displayName || user.name}</h1>

           <span
  className={`premium-badge ${
    user.premium ? "premium" : "free"
  }`}
>
  {user.premium
    ? "⭐ Premium Geek Member"
    : "🆓 Free Member"}
</span>

            <p>{currentUser?.email || user.bio}</p>
          </div>

          {/* Statistics */}
          <div className="stats-grid">

            <div className="stat-card">
              <h2>{user.orders}</h2>
              <p>Orders</p>
            </div>

            <div className="stat-card">
              <h2>{wishlist.length}</h2>
              <p>Wishlist</p>
            </div>

            <div className="stat-card">
              <h2>
                {cart.reduce(
                  (total, item) => total + item.quantity,
                  0
                )}
              </h2>
              <p>Cart</p>
            </div>

            <div className="stat-card">
  <h2>${user.wallet.toFixed(2)}</h2>
  <p>Wallet</p>
</div>

<div className="stat-card">
  <h2>{user.geekCoins}</h2>
  <p>Geek Coins</p>
</div>

          </div>

          {/* Tabs */}
          <div className="profile-tabs">

            <button
              className={activeTab === "overview" ? "active" : ""}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>

            {activeTab === "orders" && (
  <div className="overview-card">

    <h2>Your Orders</h2>

    {!user.purchaseHistory ||
    user.purchaseHistory.length === 0 ? (

      <p>No purchases yet.</p>

    ) : (

      user.purchaseHistory.map((item) => (

        <div
          key={item.id}
          className="order-item"
        >
          <img
            src={item.image}
            alt={item.title}
          />

          <div className="order-info">

            <h3>{item.title}</h3>

            <p>
              ${item.price} × {item.quantity}
            </p>

            <small>{item.date}</small>

          </div>

          <span className="order-status">
            {item.status}
          </span>

        </div>

      ))

    )}

  </div>
)}

            <button
              className={activeTab === "orders" ? "active" : ""}
              onClick={() => setActiveTab("orders")}
            >
              Orders
            </button>

            <button
              className={activeTab === "wishlist" ? "active" : ""}
              onClick={() => setActiveTab("wishlist")}
            >
              Wishlist
            </button>

            <button
              className={activeTab === "security" ? "active" : ""}
              onClick={() => setActiveTab("security")}
            >
              Security
            </button>

          </div>

          {/* Overview */}
          {activeTab === "overview" && (
           <div className="overview-card">

  <h2>Welcome Back 👋</h2>

  <p>
    Manage your GeekVerse account,
    purchases, wallet, subscriptions
    and security settings.
  </p>

  <div className="wallet-actions">

    <button
      className="wallet-btn"
      onClick={() => setShowWallet(true)}
    >
      💳 Add Money
    </button>

  </div>

</div>
          )}

          {/* Personal Information */}
          {activeTab === "personal" && (
            <div className="edit-profile">

              <h2>Edit Profile</h2>

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
              />

              <input
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Email"
              />

              <input
                name="phone"
               value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
              />

                <input
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Country"
                />

              <textarea
                rows="5"
                name="bio"
              value={formData.bio}
                onChange={handleChange}
                placeholder="Bio"
              />

              <button
  className="save-profile-btn"
  onClick={saveProfile}
>
  Save Changes
</button>

            </div>
          )}

          {/* Orders */}
          {activeTab === "orders" && (
            <div className="overview-card">

              <h2>Your Orders</h2>

             {user.purchaseHistory?.length===0?

(

<p>No orders yet.</p>

)

:

user.purchaseHistory.map(order=>(

<div
key={order.id}
className="order-card"
>

<img
src={order.image}
alt={order.title}
/>

<div>

<h3>{order.title}</h3>

<p>${order.price}</p>

<p>{order.date}</p>

<span>

{order.status}

</span>

</div>

</div>

))

}

            </div>
          )}

          {/* Wishlist */}
          {activeTab === "wishlist" && (
            <div className="overview-card">

              <h2>Your Wishlist</h2>

              {wishlist.length === 0 ? (
                <p>Your wishlist is empty.</p>
              ) : (
                wishlist.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                      marginBottom: "15px",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      width="70"
                    />

                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.subtitle}</p>
                    </div>
                  </div>
                ))
              )}

            </div>
          )}

          {/* Security */}
          {activeTab === "security" && (
            <div className="overview-card">

              <h2>Security</h2>

              <button
  className="watch-btn"
  onClick={() =>
    setShowPasswordModal(true)
  }
>
  Change Password
</button>

               
<button
  className="wishlist-btn"
  onClick={handleLogout}
>
  Logout
</button>
            </div>
          )}

        </div>
      </main>

    </div>
  );
}

export default Profile;