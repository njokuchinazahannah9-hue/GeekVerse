import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

function EditManagerModal({
  open,
  manager,
  onClose,
  onSave,
}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    country: "",
    address: "",
    bio: "",
  });

  useEffect(() => {
    if (manager) {
      setForm({
        name: manager.name || "",
        phone: manager.phone || "",
        country: manager.country || "",
        address: manager.address || "",
        bio: manager.bio || "",
      });
    }
  }, [manager]);

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

          <h2>Edit Manager</h2>

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

          <input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
          />

          <textarea
            rows="4"
            name="bio"
            placeholder="Bio"
            value={form.bio}
            onChange={handleChange}
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
              Save Changes
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditManagerModal;