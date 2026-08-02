import { useEffect, useMemo, useState } from "react";

import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../../firebase/firebase";
import ViewUserModal from "../components/ViewUserModal";
import EditUserModal from "../components/EditUserModal";

import {
  FiSearch,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiSlash,
} from "react-icons/fi";

function Users() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

const [showViewModal, setShowViewModal] = useState(false);
const [showEditModal, setShowEditModal] = useState(false);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setUsers(data);
      }
    );

    return unsubscribe;
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const name = (user.name || "").toLowerCase();
      const email = (user.email || "").toLowerCase();

      return (
        name.includes(search.toLowerCase()) ||
        email.includes(search.toLowerCase())
      );
    });
  }, [users, search]);

  async function toggleStatus(user) {
    try {
      await updateDoc(doc(db, "users", user.id), {
        status:
          user.status === "Active"
            ? "Blocked"
            : "Active",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to update user.");
    }
  }

  async function deleteUser(id) {
    if (!window.confirm("Delete this user?")) return;

    try {
      await deleteDoc(doc(db, "users", id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete user.");
    }
  }

  async function saveUser(data) {
  try {
    await updateDoc(
      doc(db, "users", selectedUser.id),
      data
    );

    setShowEditModal(false);
    setSelectedUser(null);
  } catch (error) {
    console.error(error);
    alert("Failed to update user.");
  }
}

  return (
    <div className="users-page">

      <div className="users-header">

        <div>
          <h1>Users</h1>

          <p>
            Manage all registered users.
          </p>
        </div>

      </div>

      <div className="users-search">

        <FiSearch />

        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      <div className="users-table-card">

        <table className="users-table">

          <thead>

            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Membership</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {filteredUsers.length === 0 ? (

              <tr>

                <td
                  colSpan="7"
                  style={{
                    textAlign: "center",
                    padding: "30px",
                  }}
                >
                  No users found.
                </td>

              </tr>

            ) : (

              filteredUsers.map((user) => (

                <tr key={user.id}>

                  <td>

                    <div className="staff-user">

                      <div className="staff-avatar">

                        {user.name
                          ? user.name.charAt(0).toUpperCase()
                          : "U"}

                      </div>

                      {user.name || "No Name"}

                    </div>

                  </td>

                  <td>{user.email}</td>

                  <td>
                    {user.membership || "Free"}
                  </td>

                  <td>
                    {user.role || "Customer"}
                  </td>

                  <td>

                    {user.createdAt?.toDate
                      ? user.createdAt
                          .toDate()
                          .toLocaleDateString()
                      : "-"}

                  </td>

                  <td>

                    <span
                      className={`order-status ${(
                        user.status || "Active"
                      ).toLowerCase()}`}
                    >
                      {user.status || "Active"}
                    </span>

                  </td>

                  <td>

                    <div className="table-actions">

                      <FiEye
  title="View User"
  style={{ cursor: "pointer" }}
  onClick={() => {
    setSelectedUser(user);
    setShowViewModal(true);
  }}
/>

                      <FiEdit2
  title="Edit User"
  style={{ cursor: "pointer" }}
  onClick={() => {
    setSelectedUser(user);
    setShowEditModal(true);
  }}
/>

                      <FiSlash
                        title="Block / Unblock"
                        onClick={() =>
                          toggleStatus(user)
                        }
                        style={{
                          cursor: "pointer",
                        }}
                      />

                      <FiTrash2
                        title="Delete User"
                        onClick={() =>
                          deleteUser(user.id)
                        }
                        style={{
                          cursor: "pointer",
                        }}
                      />

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

       <ViewUserModal
  open={showViewModal}
  user={selectedUser}
  onClose={() => {
    setShowViewModal(false);
    setSelectedUser(null);
  }}
/>

<EditUserModal
  open={showEditModal}
  user={selectedUser}
  onClose={() => {
    setShowEditModal(false);
    setSelectedUser(null);
  }}
  onSave={saveUser}
/>

      </div>

    </div>
  );
}

export default Users;