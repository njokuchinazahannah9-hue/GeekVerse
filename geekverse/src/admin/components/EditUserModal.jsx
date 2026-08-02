import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

function EditUserModal({ open, user, onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    country: "",
    bio: "",
    membership: "Free",
    role: "Customer",
    status: "Active",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        phone: user.phone || "",
        country: user.country || "",
        bio: user.bio || "",
        membership: user.membership || "Free",
        role: user.role || "Customer",
        status: user.status || "Active",
      });
    }
  }, [user]);

  if (!open || !user) return null;

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(form);
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>Edit User</h2>

          <button onClick={onClose}>
            <FiX />
          </button>
        </div>

        <form
          className="modal-body"
          onSubmit={handleSubmit}
        >
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
          />

          <input
            name="country"
            placeholder="Country"
            value={form.country}
            onChange={handleChange}
          />

          <textarea
            name="bio"
            placeholder="Bio"
            rows="4"
            value={form.bio}
            onChange={handleChange}
          />

          <select
            name="membership"
            value={form.membership}
            onChange={handleChange}
          >
            <option>Free</option>
            <option>Premium</option>
          </select>

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option>Customer</option>
            <option>Admin</option>
          </select>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option>Active</option>
            <option>Blocked</option>
          </select>

          <button className="save-btn">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditUserModal;