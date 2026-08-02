import { useEffect, useState } from "react";

import {
  FiUser,
  FiLock,
  FiBell,
  FiCamera,
  FiEdit2,
  FiShield,
} from "react-icons/fi";

import {
  doc,
  getDoc,
  updateDoc,
  setDoc,
  deleteDoc,
  serverTimestamp,
  collection,
  onSnapshot,
  getDocs,
  query,
  where,
} from "firebase/firestore";


import { db } from "../../firebase/firebase";

import { useAuth } from "../../context/AuthContext";
import EditManagerModal from "../components/EditManagerModal";
import AddStaffModal from "../components/AddStaffModal";
import ViewStaffModal from "../components/ViewStaffModal";
import ChangePasswordModal from "../components/ChangePasswordModal";
import LoginSessionModal from "../components/LoginSessionModal";
import EditStaffModal from "../components/EditStaffModal";
import EditStoreModal from "../components/EditStoreModal";
import { useNavigate } from "react-router-dom";

function Manager() {

  const { currentUser } = useAuth();
  const [manager, setManager] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [showEditStaffModal, setShowEditStaffModal] =
useState(false);
  const [showAddStaffModal, setShowAddStaffModal] =
  useState(false);
  const navigate = useNavigate();

  const [activities, setActivities] = useState([]);

  const [showSessionModal, setShowSessionModal] =
useState(false);

const [showEditModal, setShowEditModal] = useState(false);

  const [staff, setStaff] = useState([]);
  const [showViewModal, setShowViewModal] = useState(false);
const [selectedStaff, setSelectedStaff] = useState(null);
const [showPasswordModal,setShowPasswordModal]=
useState(false);

const [twoFactor, setTwoFactor] = useState(false);
const [showStoreModal, setShowStoreModal] = useState(false);
const [recentOrders, setRecentOrders] = useState([]);



const [notifications, setNotifications] = useState({
  email: true,
  orders: true,
  system: true,
});

const [overview, setOverview] = useState({
  users: 0,
  staff: 0,
  products: 0,
  orders: 0,
  revenue: 0,
  pendingOrders: 0,
});

const [settings, setSettings] = useState({
  darkMode: true,
  emailNotifications: true,
  smsAlerts: false,
  currency: "NGN",
  timezone: "Africa/Lagos",
  language: "English",
});

const [storeInfo, setStoreInfo] = useState({
  name: "",
  email: "",
  phone: "",
  address: "",
});

useEffect(() => {

  const unsubscribe = onSnapshot(

    collection(db, "staff"),

    (snapshot) => {

      const data = snapshot.docs.map((doc) => ({

        id: doc.id,

        ...doc.data(),

      }));

      setStaff(data);

    }

  );

  return unsubscribe;

}, []);

useEffect(() => {

  const unsubscribe = onSnapshot(

    collection(db, "orders"),

    (snapshot) => {

      const data = snapshot.docs.map((doc) => ({

        id: doc.id,

        ...doc.data(),

      }));

      setRecentOrders(

        data.sort((a,b)=>{

          const first =
            a.createdAt?.seconds || 0;

          const second =
            b.createdAt?.seconds || 0;

          return second-first;

        }).slice(0,5)

      );

    }

  );

  return unsubscribe;

}, []);

useEffect(() => {

  const unsubscribe = onSnapshot(
    collection(db, "activities"),
    (snapshot) => {

      const data = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .sort((a, b) => {
          const aTime = a.createdAt?.seconds || 0;
          const bTime = b.createdAt?.seconds || 0;
          return bTime - aTime;
        });

      setActivities(data);

    }
  );

  return unsubscribe;

}, []);

async function saveStaff(data) {

  try {

    const id = crypto.randomUUID();

    await setDoc(
      doc(db, "staff", id),
      {
        ...data,
        id,
        createdAt: serverTimestamp(),
      }
    );

    setStaff((prev) => [
      ...prev,
      {
        ...data,
        id,
      },
    ]);

    setShowAddStaffModal(false);

    alert("Staff added successfully.");

  } catch (error) {

    console.error(error);

    alert("Failed to add staff.");

  }
  await addActivity(
  `Added staff: ${data.name}`
);

}

async function saveStoreInfo(data) {

  try {

    await updateDoc(
      doc(db, "users", currentUser.uid),
      {
        storeInfo: data,
      }
    );

    setStoreInfo(data);

    setShowStoreModal(false);

    alert("Store information updated.");

  } catch (error) {

    console.error(error);

    alert(error.message);

  }

}


async function addActivity(action) {

  try {

    const id = crypto.randomUUID();

    await setDoc(
      doc(db, "activities", id),
      {
        action,
        createdAt: serverTimestamp(),
      }
    );

  } catch (error) {

    console.error(error);

  }

}
async function toggleStaffStatus(member) {

  try {

    const newStatus =
      member.status === "Active"
        ? "Suspended"
        : "Active";

    await updateDoc(
      doc(db, "staff", member.id),
      {
        status: newStatus,
      }
    );

    alert(
      `Staff ${newStatus.toLowerCase()} successfully.`
    );
    await addActivity(
  `${newStatus === "Suspended" ? "Suspended" : "Activated"} ${member.name}`
);

  } catch (error) {

    console.error(error);

    alert(error.message);

  }

}

function downloadReport(type) {

  let content = "";

  switch (type) {

    case "pdf":
      content =
`GEEKVERSE SALES REPORT

Generated: ${new Date().toLocaleString()}

Total Revenue: ₦${overview.revenue}

Total Orders: ${overview.orders}

Total Products: ${overview.products}

Total Users: ${overview.users}

Total Staff: ${overview.staff}`;
      break;

    case "excel":
      content =
`OrderID,Revenue
001,5000
002,12000
003,8000`;
      break;

    case "users":
      content =
`Name,Email
${manager.name},${manager.email}`;
      break;

    default:
      return;

  }

  const blob = new Blob(
    [content],
    {
      type: "text/plain",
    }
  );

  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);

  link.download = `${type}_report.txt`;

  link.click();

}

async function deleteStaff(member) {

  const confirmDelete = window.confirm(
    `Delete ${member.name}?`
  );

  if (!confirmDelete) return;

  try {

    await deleteDoc(
      doc(db, "staff", member.id)
    );

    alert("Staff deleted successfully.");

  } catch (error) {

    console.error(error);

    alert(error.message);

  }
  await addActivity(
  `Deleted staff: ${member.name}`
);

}

useEffect(() => {

  const unsubscribe = onSnapshot(
    collection(db, "staff"),
    (snapshot) => {

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setStaff(data);

    }
  );

  return unsubscribe;

}, []);

  async function saveManager(data) {
    try {
      await updateDoc(doc(db, "users", currentUser.uid), data);
      setManager((prev) => ({ ...prev, ...data }));
      setShowEditModal(false);
      alert("Profile updated successfully.");
    } catch(error){

if(
error.code==="auth/requires-recent-login"
){

alert(
"For security reasons, please log out and log in again before changing your password."
);

return;

}

alert(error.message);

}
  }


  useEffect(() => {

  async function loadOverview() {

    try {

      const usersSnapshot =
        await getDocs(collection(db, "users"));

      const staffSnapshot =
        await getDocs(collection(db, "staff"));

      const productsSnapshot =
        await getDocs(collection(db, "products"));

      const ordersSnapshot =
        await getDocs(collection(db, "orders"));

      let revenue = 0;
      let pending = 0;

      ordersSnapshot.forEach((doc) => {

        const order = doc.data();

        revenue += Number(order.total || 0);

        if (order.status === "Pending") {
          pending++;
        }

      });

      setOverview({
        users: usersSnapshot.size,
        staff: staffSnapshot.size,
        products: productsSnapshot.size,
        orders: ordersSnapshot.size,
        revenue,
        pendingOrders: pending,
      });

    } catch (error) {

      console.error(error);

    }

  }

  loadOverview();

}, []);
  async function updateNotification(type){

  const updated = {

    ...notifications,

    [type]: !notifications[type],

  };

  setNotifications(updated);

  try{

    await updateDoc(

      doc(db,"users",currentUser.uid),

      {

        notifications: updated,

      }

    );

  }catch(error){

    console.error(error);

  }

}

async function updateStaff(data) {

try{

await updateDoc(

doc(db,"staff",selectedStaff.id),

data

);

setShowEditStaffModal(false);

setSelectedStaff(null);

alert("Staff updated successfully.");

}catch(error){

console.error(error);

alert(error.message);

}

}

async function updateSetting(key, value) {

  const updated = {
    ...settings,
    [key]: value,
  };

  setSettings(updated);

  try {

    await updateDoc(
      doc(db, "users", currentUser.uid),
      {
        settings: updated,
      }
    );

  } catch (error) {

    console.error(error);

    alert("Failed to save settings.");

  }

}

  async function toggleTwoFactor() {

  try {

    const value = !twoFactor;

    await updateDoc(
      doc(db, "users", currentUser.uid),
      {
        twoFactor: value,
      }
    );

    setNotifications({

  email:
    snapshot.data().notifications?.email ?? true,

  orders:
    snapshot.data().notifications?.orders ?? true,

  system:
    snapshot.data().notifications?.system ?? true,

});

    setTwoFactor(value);

    alert(
      value
        ? "Two-Factor Authentication Enabled"
        : "Two-Factor Authentication Disabled"
    );

  } catch (error) {

    console.error(error);

    alert("Failed to update.");

  }

}


   function uploadAvatar(e) {

  const file = e.target.files[0];

  if (!file) return;

  const preview = URL.createObjectURL(file);

  setAvatarPreview(preview);

  setManager((prev) => ({
    ...prev,
    avatar: preview,
  }));

}
useEffect(() => {


  async function loadManager() {

  if (!currentUser) return;

  const snapshot = await getDoc(
    doc(db, "users", currentUser.uid)
  );

  if (!snapshot.exists()) return;

  const data = snapshot.data();

  if (data.role !== "Manager") {

    alert("Access denied.");

    navigate("/");

    return;

  }

  setManager(data);


    setTwoFactor(
  snapshot.data().twoFactor || false
);

setSettings({
  darkMode: snapshot.data().settings?.darkMode ?? true,
  emailNotifications:
    snapshot.data().settings?.emailNotifications ?? true,
  smsAlerts:
    snapshot.data().settings?.smsAlerts ?? false,
  currency:
    snapshot.data().settings?.currency ?? "NGN",
  timezone:
    snapshot.data().settings?.timezone ??
    "Africa/Lagos",
  language:
    snapshot.data().settings?.language ??
    "English",
});

setStoreInfo({
  name: snapshot.data().storeInfo?.name || "GeekVerse",
  email: snapshot.data().storeInfo?.email || "support@geekverse.com",
  phone: snapshot.data().storeInfo?.phone || "",
  address: snapshot.data().storeInfo?.address || "",
});
  }

  loadManager();

}, [currentUser]);

if (!manager) {

  return (

    <div className="manager-page">

      Loading...

    </div>

  );

}
  return (
    <div className="manager-page">

      <div className="manager-header">

        <div>

          <h1>Manager Profile</h1>

          <p>
            Manage your administrator account.
          </p>

        </div>

      </div>

      <div className="manager-profile-card">

        <div className="manager-avatar">

         <img
  src={
    avatarPreview ||
    manager.avatar ||
    "https://i.pravatar.cc/150?img=12"
  }
  alt="Manager"
/>

          <>
  <input
  type="file"
  accept="image/*"
  id="avatarUpload"
  style={{ display: "none" }}
  onChange={uploadAvatar}
/>

  <button
  className="change-photo-btn"
  onClick={() =>
    document
      .getElementById("avatarUpload")
      .click()
  }
>
  <FiCamera />
</button>
</>

        </div>

        <div className="manager-info">

          {manager.name || "Manager"}

         {manager.email}

          <span className="manager-role">

            <FiShield />

            {manager.role || "Manager"}

          </span>

        </div>

      </div>

      <div className="manager-grid">

        <div className="manager-card">

          <h3>

            <FiUser />

            Personal Information

          </h3>

          <div className="info-row">

            <span>Full Name</span>

            <strong>GeekVerse Manager</strong>

          </div>

          <div className="info-row">

            <span>Email</span>

            <strong>manager@geekverse.com</strong>

          </div>

          <div className="info-row">

            <span>Phone</span>

            <strong>+234 800 000 0000</strong>

          </div>

          <button
className="save-btn"
onClick={() =>
setShowEditModal(true)
}
>

<FiEdit2/>

Edit Profile

</button>

        </div>

        <div className="manager-card">

          <h3>

            <FiLock />

            Security

          </h3>

          <div className="security-item">

            <span>Password</span>

            <button
className="filter-btn"
onClick={()=>
setShowPasswordModal(true)
}
>

Change

</button>

          </div>

          <div className="security-item">

            <span>Two Factor Authentication</span>

            <button
  className="filter-btn"
  onClick={toggleTwoFactor}
>
  {twoFactor ? "Disable" : "Enable"}
</button>

<span
  style={{
    color: twoFactor ? "#22c55e" : "#ef4444",
    fontWeight: "600",
  }}
>
  {twoFactor ? "Enabled" : "Disabled"}
</span>

          </div>

          <div className="security-item">

            <span>Login Sessions</span>

            <button
className="filter-btn"
onClick={()=>
setShowSessionModal(true)
}
>

View

</button>

          </div>

        </div>

        <div className="manager-card">

          <h3>

            <FiBell />

            Notifications

          </h3>

          <div className="security-item">

            <span>Email Notifications</span>

          <input

type="checkbox"

checked={notifications.email}

onChange={()=>
updateNotification("email")
}

/>

          </div>

          <div className="security-item">

            <span>Order Alerts</span>

            <input

type="checkbox"

checked={notifications.orders}

onChange={()=>
updateNotification("orders")
}

/>

          </div>

          <div className="security-item">

            <span>System Updates</span>

           <input

type="checkbox"

checked={notifications.system}

onChange={()=>
updateNotification("system")
}

/>

          </div>

        </div>

      </div>

  {/* ===========================
   STORE OVERVIEW
=========================== */}

<div className="manager-section">

  <div className="section-header">

    <div>

      <h2>Store Overview</h2>

      <p>
        Live summary of your store.
      </p>

    </div>

  </div>

  <div className="overview-grid">

    <div className="overview-card">

      <h4>Today's Revenue</h4>

      <h2>₦{overview.revenue.toLocaleString()}</h2>

      <span>Total revenue generated</span>

    </div>

    <div className="overview-card">

      <h4>Total Orders</h4>

      <h2>{overview.orders}</h2>

      <span>{overview.pendingOrders} Pending</span>

    </div>

    <div className="overview-card">

      <h4>Total Products</h4>

      <h2>{overview.products}</h2>

      <span>Products in Store</span>

    </div>

    <div className="overview-card">

      <h4>Total Users</h4>

      <h2>{overview.users}</h2>

      <span>Registered Customers</span>

    </div>

    <div className="overview-card">

      <h4>Total Staff</h4>

      <h2>{overview.staff}</h2>

      <span>Active Staff Members</span>

    </div>

    <div className="overview-card">

      <h4>Pending Orders</h4>

      <h2>{overview.pendingOrders}</h2>

      <span>Awaiting Processing</span>

    </div>

  </div>

</div>

{/* ===========================
   QUICK ANALYTICS
=========================== */}

<div className="manager-section">

  <div className="section-header">

    <h2>Quick Analytics</h2>

    <p>Live store performance.</p>

  </div>

  <div className="overview-grid">

    <div className="overview-card">

      <h4>Total Revenue</h4>

      <h2>₦{overview.revenue.toLocaleString()}</h2>

      <span>Overall Revenue</span>

    </div>

    <div className="overview-card">

      <h4>Total Orders</h4>

      <h2>{overview.orders}</h2>

      <span>Processed Orders</span>

    </div>

    <div className="overview-card">

      <h4>Registered Users</h4>

      <h2>{overview.users}</h2>

      <span>All Customers</span>

    </div>

    <div className="overview-card">

      <h4>Products</h4>

      <h2>{overview.products}</h2>

      <span>Products Available</span>

    </div>

  </div>

</div>
{/* ===========================
   STAFF MANAGEMENT
=========================== */}

<div className="manager-section">

  <div className="section-header">

    <div>

      <h2>Staff Management</h2>

      <p>
        Manage your team members.
      </p>

    </div>

    <button
  className="save-btn"
  onClick={() =>
    setShowAddStaffModal(true)
  }
>
  + Add Staff
</button>

  </div>

  <div className="manager-toolbar">

    <input
      type="text"
      placeholder="Search staff..."
    />

    <select>

      <option>All Roles</option>

      <option>Manager</option>

      <option>Customer Support</option>

      <option>Inventory Manager</option>

      <option>Moderator</option>

    </select>

    <select>

      <option>All Status</option>

      <option>Active</option>

      <option>Suspended</option>

    </select>

  </div>

  <div className="users-table-card">

    <table className="users-table">

      <thead>

        <tr>

          <th>Name</th>

          <th>Role</th>

          <th>Email</th>

          <th>Status</th>

          <th>Actions</th>

        </tr>

      </thead>

      <tbody>

  {staff.length === 0 ? (

    <tr>

      <td
        colSpan="5"
        style={{
          textAlign: "center",
          padding: "30px",
        }}
      >
        No staff found.
      </td>

    </tr>

  ) : (

    staff.map((member) => (

      <tr key={member.id}>

        <td>{member.name}</td>

        <td>{member.role}</td>

        <td>{member.email}</td>

        <td>

          <span
            className={`order-status ${(
              member.status || "Active"
            ).toLowerCase()}`}
          >
            {member.status || "Active"}
          </span>

        </td>

        <td>

          <div className="table-actions">

            <button
  className="action-btn"
  onClick={() => {

    setSelectedStaff(member);

    setShowViewModal(true);

  }}
>

View

</button>

           <button

className="action-btn"

onClick={() => {

setSelectedStaff(member);

setShowEditStaffModal(true);

}}

>

Edit

</button>

            <button
  className="action-btn danger"
  onClick={() =>
    toggleStaffStatus(member)
  }
>

{member.status === "Active"
  ? "Suspend"
  : "Activate"}

</button>

            <button
  className="action-btn delete"
  onClick={() => deleteStaff(member)}
>

Delete

</button>

          </div>

        </td>

      </tr>

    ))

  )}

</tbody>
    </table>

  </div>

</div>

{/* ===========================
   ACTIVITY TIMELINE
=========================== */}

<div className="manager-section">

  <div className="section-header">

    <h2>Activity Timeline</h2>

    <p>
      Recent activities across the store.
    </p>

  </div>

  <div className="timeline">

    <div className="timeline-item">

      <div className="timeline-dot"></div>

      <div>

        <h4>Sarah updated a product</h4>

        <p>Today • 09:15 AM</p>

      </div>

    </div>

    <div className="timeline">

  {activities.length === 0 ? (

    <p>No recent activity.</p>

  ) : (

    activities.map((activity) => (

      <div
        className="timeline-item"
        key={activity.id}
      >

        <div className="timeline-dot"></div>

        <div>

          <h4>{activity.action}</h4>

          <p>
            {activity.createdAt?.toDate
              ? activity.createdAt
                  .toDate()
                  .toLocaleString()
              : "Just now"}
          </p>

        </div>

      </div>

    ))

  )}

</div>
  </div>

</div>
{/* ===========================
   RECENT ORDERS
=========================== */}

<div className="manager-section">

  <div className="section-header">

    <h2>Recent Orders</h2>

    <p>
      Latest customer orders.
    </p>

  </div>

  <div className="users-table-card">

    <table className="users-table">

      <thead>

        <tr>

          <th>Order ID</th>

          <th>Customer</th>

          <th>Total</th>

          <th>Status</th>

          <th>Date</th>

        </tr>

      </thead>

      <tbody>

{recentOrders.length===0?(
<tr>

<td
colSpan="5"
style={{
textAlign:"center",
padding:"20px"
}}
>

No orders yet.

</td>

</tr>

):(

recentOrders.map((order)=>(

<tr key={order.id}>

<td>

#{order.id.slice(0,6)}

</td>

<td>

{order.customerName ||
order.customer ||
"Customer"}

</td>

<td>

₦{Number(
order.total||0
).toLocaleString()}

</td>

<td>

<span
className={`order-status ${
(order.status||"Pending").toLowerCase()
}`}
>

{order.status||"Pending"}

</span>

</td>

<td>

{order.createdAt?.toDate
?order.createdAt
.toDate()
.toLocaleDateString()
:"Today"}

</td>

</tr>

))

)}

</tbody>

    </table>

  </div>

</div>

{/* ===========================
   QUICK SETTINGS
=========================== */}

<div className="manager-section">

  <div className="section-header">

    <h2>Quick Settings</h2>

    <p>
      Configure your store quickly.
    </p>

  </div>

  <div className="settings-grid">

    <div className="setting-card">

      <h4>🌙 Dark Mode</h4>

      <label className="switch">

       <input
  type="checkbox"
  checked={settings.darkMode}
  onChange={(e) =>
    updateSetting("darkMode", e.target.checked)
  }
/>

        <span className="slider"></span>

      </label>

    </div>

    <div className="setting-card">

      <h4>📧 Email Notifications</h4>

      <label className="switch">

        <input
  type="checkbox"
  checked={settings.emailNotifications}
  onChange={(e) =>
    updateSetting(
      "emailNotifications",
      e.target.checked
    )
  }
/>

        <span className="slider"></span>

      </label>

    </div>

    <div className="setting-card">

      <h4>📱 SMS Alerts</h4>

      <label className="switch">

        <input
  type="checkbox"
  checked={settings.smsAlerts}
  onChange={(e) =>
    updateSetting("smsAlerts", e.target.checked)
  }
/>

        <span className="slider"></span>

      </label>

    </div>

    <div className="setting-card">

      <h4>🌍 Currency</h4>

      <select
  value={settings.currency}
  onChange={(e) =>
    updateSetting("currency", e.target.value)
  }
>
  <option value="NGN">NGN (₦)</option>
  <option value="USD">USD ($)</option>
  <option value="GBP">GBP (£)</option>
</select>

    </div>

    <div className="setting-card">

      <h4>🕒 Time Zone</h4>

      <select
  value={settings.timezone}
  onChange={(e) =>
    updateSetting("timezone", e.target.value)
  }
>
  <option value="Africa/Lagos">
    Africa/Lagos
  </option>
  <option value="UTC">
    UTC
  </option>
</select>

    </div>

    <div className="setting-card">

      <h4>🌐 Language</h4>

     <select
  value={settings.language}
  onChange={(e) =>
    updateSetting("language", e.target.value)
  }
>
  <option value="English">English</option>
  <option value="French">French</option>
  <option value="Spanish">Spanish</option>
</select>
    </div>

  </div>

</div>

{/* ===========================
   STORE INFORMATION
=========================== */}

<div className="manager-section">

  <div className="section-header">

    <h2>Store Information</h2>

    <p>
      Business information displayed to customers.
    </p>

  </div>

  <div className="manager-grid">

    <div className="manager-card">

      <div className="info-row">

        <span>Store Name</span>

        <strong>{storeInfo.name}</strong>

      </div>

      <div className="info-row">

        <span>Support Email</span>

        <strong>support@geekverse.com</strong>

      </div>

      <div className="info-row">

        <span>Phone</span>

        <strong>{storeInfo.phone}</strong>

      </div>

      <div className="info-row">

        <span>Business Address</span>

        <strong>{storeInfo.address}</strong>

      </div>

      <button
  className="save-btn"
  onClick={() => setShowStoreModal(true)}
>
  Edit Store Info
</button>
    </div>

  </div>

</div>

{/* ===========================
   BACKUP & RESTORE
=========================== */}

<div className="manager-section">

  <div className="section-header">

    <h2>Backup & Restore</h2>

    <p>
      Protect your store data.
    </p>

  </div>

  <div className="overview-grid">

    <div className="overview-card">

      <h4>Create Backup</h4>

      <button
  className="save-btn"
  onClick={() => {

    const backup = {

      manager,

      settings,

      storeInfo,

      overview,

      createdAt: new Date().toLocaleString(),

    };

    const blob = new Blob(
      [JSON.stringify(backup, null, 2)],
      {
        type: "application/json",
      }
    );

    const link =
      document.createElement("a");

    link.href =
      URL.createObjectURL(blob);

    link.download =
      "GeekVerse_Backup.json";

    link.click();

    alert("Backup downloaded successfully.");

  }}
>

Backup Now

</button>

    </div>

    <div className="overview-card">

      <h4>Restore Database</h4>

      <button
className="filter-btn"
onClick={()=>
alert(
"Restore feature will be enabled in the next version."
)
}
>

Restore

</button>

    </div>

    <div className="overview-card">

      <h4>Export Database</h4>

      <button
className="save-btn"
onClick={()=>
alert(
"Database exported successfully."
)
}
>

Export

</button>

    </div>

  </div>

</div>

{/* ===========================
   REPORTS
=========================== */}

<div className="manager-section">

  <div className="section-header">

    <h2>Reports</h2>

    <p>
      Download business reports.
    </p>

  </div>

  <div className="overview-grid">

    <div className="overview-card">

      <h4>Sales Report</h4>

      <button
className="save-btn"
onClick={()=>
downloadReport("pdf")
}
>

Download PDF

</button>
    </div>

    <div className="overview-card">

      <h4>Orders Report</h4>

      <button
className="save-btn"
onClick={()=>
downloadReport("excel")
}
>

Download Excel

</button>

    </div>

    <div className="overview-card">

      <h4>Users Report</h4>
<button
className="save-btn"
onClick={()=>
downloadReport("users")
}
>

Download Users

</button>
    </div>

  </div>

</div>

{/* ===========================
   REVENUE SUMMARY
=========================== */}

<div className="manager-section">

  <div className="section-header">

    <h2>Revenue Summary</h2>

    <p>
      Revenue performance.
    </p>

  </div>

  <div className="overview-grid">

    <div className="overview-card">

      <h4>Today</h4>

      <h2>$3,250</h2>

    </div>

    <div className="overview-card">

      <h4>This Week</h4>

      <h2>$18,720</h2>

    </div>

    <div className="overview-card">

      <h4>This Month</h4>

      <h2>$52,430</h2>

    </div>

    <div className="overview-card">

      <h4>This Year</h4>

      <h2>$620,500</h2>

    </div>

  </div>

</div>

<EditManagerModal

  open={showEditModal}

  manager={manager}

  onClose={() =>
    setShowEditModal(false)
  }

  onSave={saveManager}

/>
<AddStaffModal
  open={showAddStaffModal}
  onClose={() =>
    setShowAddStaffModal(false)
  }
  onSave={saveStaff}
/>

<ViewStaffModal
  open={showViewModal}
  staff={selectedStaff}
  onClose={() => {
    setShowViewModal(false);
    setSelectedStaff(null);
  }}
/>

<ChangePasswordModal
open={showPasswordModal}
onClose={()=>
setShowPasswordModal(false)
}
/>

<LoginSessionModal

open={showSessionModal}

manager={manager}

onClose={()=>
setShowSessionModal(false)
}

/>

<EditStaffModal

open={showEditStaffModal}

staff={selectedStaff}

onClose={() => {

setShowEditStaffModal(false);

setSelectedStaff(null);

}}

onSave={updateStaff}

/>

<EditStoreModal
  open={showStoreModal}
  storeInfo={storeInfo}
  onClose={() => setShowStoreModal(false)}
  onSave={saveStoreInfo}
/>
    </div>

    
  );
}

export default Manager;