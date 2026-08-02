import { FiX } from "react-icons/fi";

function ViewOrderModal({
  open,
  order,
  onClose,
}) {
  if (!open || !order) return null;

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

          <h2>Order Details</h2>

          <button
            type="button"
            onClick={onClose}
          >
            <FiX />
          </button>

        </div>

        <div className="modal-body">

          <div className="details-grid">

            <div className="detail-item">
              <strong>Order ID</strong>
              <span>{order.id}</span>
            </div>

            <div className="detail-item">
              <strong>Customer</strong>
              <span>{order.customer}</span>
            </div>

            <div className="detail-item">
              <strong>Items</strong>
              <span>{order.items}</span>
            </div>

            <div className="detail-item">
              <strong>Total</strong>
              <span>{order.total}</span>
            </div>

            <div className="detail-item">
              <strong>Payment</strong>
              <span>{order.payment}</span>
            </div>

            <div className="detail-item">
              <strong>Status</strong>
              <span>{order.status}</span>
            </div>

            <div className="detail-item">
              <strong>Date</strong>
              <span>{order.date}</span>
            </div>

          </div>

          <div className="modal-footer">

            <button
              className="cancel-btn"
              onClick={onClose}
            >
              Close
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ViewOrderModal;