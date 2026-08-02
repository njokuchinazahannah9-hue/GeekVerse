import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";


function EditOrderModal({
  open,
  order,
  onClose,
  onSave,
}) {
  const [form, setForm] = useState({
    payment: "Pending",
    status: "Pending",
  });

  useEffect(() => {
    if (order) {
      setForm({
        payment: order.payment || "Pending",
        status: order.status || "Pending",
      });
    }
  }, [order]);

  if (!open || !order) return null;

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

          <h2>Edit Order</h2>

          <button
            type="button"
            onClick={onClose}
          >
            <FiX />
          </button>

        </div>

        <form
          className="modal-body"
          onSubmit={handleSubmit}
        >

          <div className="form-group">

            <label>Payment Status</label>

            <select
              name="payment"
              value={form.payment}
              onChange={handleChange}
            >
              <option>Paid</option>
              <option>Pending</option>
              <option>Refunded</option>
            </select>

          </div>

          <div className="form-group">

            <label>Order Status</label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option>Pending</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>

          </div>

          <div className="modal-footer">

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
            >
              Save Changes
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditOrderModal;