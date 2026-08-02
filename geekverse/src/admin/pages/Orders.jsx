import { useMemo, useState } from "react";

import {
  FiSearch,
  FiEye,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

import ViewOrderModal from "../components/ViewOrderModal";
import EditOrderModal from "../components/EditOrderModal";

function Orders() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
const [paymentFilter, setPaymentFilter] = useState("All");

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [showViewModal, setShowViewModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);

  const [orders, setOrders] = useState([
    {
      id: "GV1001",
      customer: "John Doe",
      items: 3,
      total: "$75.00",
      payment: "Paid",
      status: "Delivered",
      date: "01 Aug 2026",
    },
    {
      id: "GV1002",
      customer: "Sarah Smith",
      items: 1,
      total: "$20.00",
      payment: "Pending",
      status: "Processing",
      date: "01 Aug 2026",
    },
    {
      id: "GV1003",
      customer: "Michael Brown",
      items: 5,
      total: "$110.00",
      payment: "Paid",
      status: "Pending",
      date: "31 Jul 2026",
    },
  ]);

 const filteredOrders = useMemo(() => {
  return orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      order.status === statusFilter;

    const matchesPayment =
      paymentFilter === "All" ||
      order.payment === paymentFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPayment
    );
  });
}, [
  orders,
  search,
  statusFilter,
  paymentFilter,
]);

  function deleteOrder(id) {
    if (!window.confirm("Delete this order?")) return;

    setOrders(
      orders.filter(
        (order) => order.id !== id
      )
    );
  }

  function saveOrder(data) {
    setOrders(
      orders.map((order) =>
        order.id === selectedOrder.id
          ? {
              ...order,
              ...data,
            }
          : order
      )
    );

    setShowEditModal(false);
    setSelectedOrder(null);
  }

  return (
    <div className="orders-page">

      <div className="orders-header">

        <div>

          <h1>Orders</h1>

          <p>
            Manage customer orders.
          </p>

        </div>

      </div>

      {/* <div className="users-search">

        <FiSearch />

        <input
          type="text"
          placeholder="Search orders..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div> */}

      <div className="orders-toolbar">

  <div className="users-search">

    <FiSearch />

    <input
      placeholder="Search orders..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
    />

  </div>

  <div className="toolbar-filters">

    <select
      value={statusFilter}
      onChange={(e) =>
        setStatusFilter(e.target.value)
      }
    >
      <option>All</option>
      <option>Pending</option>
      <option>Processing</option>
      <option>Shipped</option>
      <option>Delivered</option>
      <option>Cancelled</option>
    </select>

    <select
      value={paymentFilter}
      onChange={(e) =>
        setPaymentFilter(e.target.value)
      }
    >
      <option>All</option>
      <option>Paid</option>
      <option>Pending</option>
      <option>Refunded</option>
    </select>

  </div>

</div>

      <div className="stats-grid">

  <div className="stat-card">

    <h4>Total Orders</h4>

    <h2>{orders.length}</h2>

  </div>

  <div className="stat-card">

    <h4>Revenue</h4>

    <h2>

      $

      {orders
        .reduce(
          (sum, order) =>
            sum +
            Number(
              order.total.replace("$", "")
            ),
          0
        )
        .toFixed(2)}

    </h2>

  </div>

  <div className="stat-card">

    <h4>Pending</h4>

    <h2>

      {
        orders.filter(
          (o) => o.status === "Pending"
        ).length
      }

    </h2>

  </div>

  <div className="stat-card">

    <h4>Delivered</h4>

    <h2>

      {
        orders.filter(
          (o) =>
            o.status === "Delivered"
        ).length
      }

    </h2>

  </div>

</div>

      <div className="users-table-card">

        <table className="users-table">

          <thead>

            <tr>

              <th>Order ID</th>

              <th>Customer</th>

              <th>Items</th>

              <th>Total</th>

              <th>Payment</th>

              <th>Status</th>

              <th>Date</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredOrders.map((order) => (

              <tr key={order.id}>

                <td>{order.id}</td>

                <td>{order.customer}</td>

                <td>{order.items}</td>

                <td>{order.total}</td>

                <td>

                  <span
                    className={`order-status ${order.payment.toLowerCase()}`}
                  >
                    {order.payment}
                  </span>

                </td>

                <td>

                  <span
                    className={`order-status ${order.status.toLowerCase()}`}
                  >
                    {order.status}
                  </span>

                </td>

                <td>{order.date}</td>

                <td>

                  <div className="table-actions">

                    <FiEye
                      title="View Order"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setSelectedOrder(order);
                        setShowViewModal(true);
                      }}
                    />

                    <FiEdit2
                      title="Edit Order"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setSelectedOrder(order);
                        setShowEditModal(true);
                      }}
                    />

                    <FiTrash2
                      title="Delete Order"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        deleteOrder(order.id)
                      }
                    />

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <ViewOrderModal
        open={showViewModal}
        order={selectedOrder}
        onClose={() => {
          setShowViewModal(false);
          setSelectedOrder(null);
        }}
      />

      <EditOrderModal
        open={showEditModal}
        order={selectedOrder}
        onClose={() => {
          setShowEditModal(false);
          setSelectedOrder(null);
        }}
        onSave={saveOrder}
      />

    </div>
  );
}

export default Orders;