import {
  FiUser,
  FiEye,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

function Users() {

  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@gmail.com",
      role: "Premium",
      joined: "12 Jul 2026",
      status: "Active",
    },
    {
      id: 2,
      name: "Sarah Smith",
      email: "sarah@gmail.com",
      role: "Free",
      joined: "14 Jul 2026",
      status: "Active",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael@gmail.com",
      role: "Premium",
      joined: "17 Jul 2026",
      status: "Blocked",
    },
  ];

  return (

    <div className="users-page">

      <div className="users-header">

        <div>

          <h1>Users</h1>

          <p>
            Manage registered users.
          </p>

        </div>

      </div>

      <div className="users-table-card">

        <table className="users-table">

          <thead>

            <tr>

              <th>User</th>

              <th>Email</th>

              <th>Role</th>

              <th>Joined</th>

              <th>Status</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr key={user.id}>

                <td>

                  <div className="staff-user">

                    <div className="staff-avatar">

                      <FiUser />

                    </div>

                    {user.name}

                  </div>

                </td>

                <td>{user.email}</td>

                <td>{user.role}</td>

                <td>{user.joined}</td>

                <td>

                  <span className={`order-status ${user.status.toLowerCase()}`}>

                    {user.status}

                  </span>

                </td>

                <td>

                  <div className="table-actions">

                    <FiEye />

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

export default Users;