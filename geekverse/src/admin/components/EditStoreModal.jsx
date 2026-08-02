import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

function EditStoreModal({
  open,
  storeInfo,
  onClose,
  onSave,
}) {

  const [form, setForm] = useState(storeInfo);

  useEffect(() => {
    setForm(storeInfo);
  }, [storeInfo]);

  if (!open) return null;

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function submit(e) {
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
          <h2>Edit Store Information</h2>

          <button onClick={onClose}>
            <FiX />
          </button>
        </div>

        <form
          className="modal-body"
          onSubmit={submit}
        >

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Store Name"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Support Email"
          />

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
          />

          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Business Address"
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
              Save
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditStoreModal;