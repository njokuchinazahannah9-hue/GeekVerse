import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiUserCheck,
} from "react-icons/fi";

function Staff() {

  const staff = [

    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@geekverse.com",
      role: "Sales Staff",
      status: "Active",
    },

    {
      id: 2,
      name: "Michael Brown",
      email: "michael@geekverse.com",
      role: "Inventory Staff",
      status: "Active",
    },

    {
      id: 3,
      name: "Emily Wilson",
      email: "emily@geekverse.com",
      role: "Support Staff",
      status: "Suspended",
    },

  ];

  return (

    <div className="staff-page">

      <div className="staff-header">

        <div>

          <h1>Staff</h1>

          <p>
            Manage all staff members.
          </p>

        </div>

        <button className="add-product-btn">

          <FiPlus />

          Add Staff

        </button>

      </div>

      <div className="staff-table-card">

        <table className="staff-table">

          <thead>

            <tr>

              <th>Name</th>

              <th>Email</th>

              <th>Role</th>

              <th>Status</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {staff.map((member) => (

              <tr key={member.id}>

                <td>

                  <div className="staff-user">

                    <div className="staff-avatar">

                      <FiUserCheck />

                    </div>

                    {member.name}

                  </div>

                </td>

                <td>{member.email}</td>

                <td>{member.role}</td>

                <td>

                  <span
                    className={`order-status ${member.status.toLowerCase()}`}
                  >
                    {member.status}
                  </span>

                </td>

                <td>

                  <div className="table-actions">

                    <FiEdit2 />

                    <FiTrash2 />

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default Staff;