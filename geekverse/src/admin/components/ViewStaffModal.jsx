import { FiX } from "react-icons/fi";

function ViewStaffModal({
  open,
  staff,
  onClose,
}) {

  if (!open || !staff) return null;

  return (

    <div
      className="modal-overlay"
      onClick={onClose}
    >

      <div
        className="modal"
        onClick={(e)=>e.stopPropagation()}
      >

        <div className="modal-header">

          <h2>Staff Details</h2>

          <button onClick={onClose}>

            <FiX />

          </button>

        </div>

        <div className="modal-body">

          <div className="info-row">

            <span>Name</span>

            <strong>{staff.name}</strong>

          </div>

          <div className="info-row">

            <span>Email</span>

            <strong>{staff.email}</strong>

          </div>

          <div className="info-row">

            <span>Phone</span>

            <strong>{staff.phone || "-"}</strong>

          </div>

          <div className="info-row">

            <span>Department</span>

            <strong>{staff.department || "-"}</strong>

          </div>

          <div className="info-row">

            <span>Role</span>

            <strong>{staff.role}</strong>

          </div>

          <div className="info-row">

            <span>Status</span>

            <strong>{staff.status}</strong>

          </div>

        </div>

      </div>

    </div>

  );

}

export default ViewStaffModal;