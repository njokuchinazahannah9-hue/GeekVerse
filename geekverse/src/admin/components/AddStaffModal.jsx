import { useState } from "react";
import { FiX } from "react-icons/fi";

function AddStaffModal({
  open,
  onClose,
  onSave,
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    role: "Customer Support",
    password: "",
    status: "Active",
  });

  if (!open) return null;

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSave(form);

    setForm({
      name: "",
      email: "",
      phone: "",
      department: "",
      role: "Customer Support",
      password: "",
      status: "Active",
    });
  }

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

          <h2>Add Staff</h2>

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
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
          />

          <input
            name="department"
            placeholder="Department"
            value={form.department}
            onChange={handleChange}
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option>Customer Support</option>
            <option>Inventory Manager</option>
            <option>Moderator</option>
            <option>Content Manager</option>
          </select>

          <input
            name="password"
            type="password"
            placeholder="Temporary Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <div className="modal-footer">

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              className="save-btn"
              type="submit"
            >
              Create Staff
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddStaffModal;