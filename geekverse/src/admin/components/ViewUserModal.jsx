import { FiX } from "react-icons/fi";

function ViewUserModal({ open, user, onClose }) {
  if (!open || !user) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>User Profile</h2>

          <button onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className="modal-body">

          <div className="profile-avatar">
            {user.name
              ? user.name.charAt(0).toUpperCase()
              : "U"}
          </div>

          <div className="profile-info">

            <div>
              <strong>Name</strong>
              <p>{user.name || "No Name"}</p>
            </div>

            <div>
              <strong>Email</strong>
              <p>{user.email}</p>
            </div>

            <div>
              <strong>Role</strong>
              <p>{user.role || "Customer"}</p>
            </div>

            <div>
              <strong>Membership</strong>
              <p>{user.membership || "Free"}</p>
            </div>

            <div>
              <strong>Status</strong>
              <p>{user.status || "Active"}</p>
            </div>

            <div>
              <strong>Wallet</strong>
              <p>${user.wallet || 0}</p>
            </div>

            <div>
              <strong>Geek Coins</strong>
              <p>{user.geekCoins || 0}</p>
            </div>

            <div>
              <strong>Orders</strong>
              <p>{user.orders || 0}</p>
            </div>

            <div>
              <strong>Country</strong>
              <p>{user.country || "-"}</p>
            </div>

            <div>
              <strong>Phone</strong>
              <p>{user.phone || "-"}</p>
            </div>

            <div>
              <strong>Bio</strong>
              <p>{user.bio || "-"}</p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default ViewUserModal;