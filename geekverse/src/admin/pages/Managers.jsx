import {
  FiUserCheck,
  FiSlash,
  FiTrash2,
  FiShield,
} from "react-icons/fi";

function Managers() {

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
      status: "Suspended",
    },

    {
      id: 3,
      name: "Emily Wilson",
      email: "emily@geekverse.com",
      role: "Support Staff",
      status: "Active",
    },

  ];

  return (

    <div className="manager-page">

      <div className="manager-header">

        <div>

          <h1>Manager Panel</h1>

          <p>
            Manage staff permissions and access.
          </p>

        </div>

      </div>

      <div className="manager-table-card">

        <table className="manager-table">

          <thead>

            <tr>

              <th>Staff</th>

              <th>Email</th>

              <th>Role</th>

              <th>Status</th>

              <th>Manager Actions</th>

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

                  <div className="manager-actions">

                    <button className="promote-btn">

                      <FiShield />

                      Promote

                    </button>

                    <button className="suspend-btn">

                      <FiSlash />

                      Suspend

                    </button>

                    <button className="remove-btn">

                      <FiTrash2 />

                      Remove

                    </button>

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

export default Managers;