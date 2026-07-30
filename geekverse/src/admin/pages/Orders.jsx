import {
  FiEye,
  FiMoreVertical,
} from "react-icons/fi";

function Orders() {

  const orders = [

    {
      id: "#GV1001",
      customer: "John Doe",
      total: "$48.00",
      items: 3,
      status: "Completed",
      date: "24 Jul 2026",
    },

    {
      id: "#GV1002",
      customer: "Sarah Smith",
      total: "$22.00",
      items: 1,
      status: "Pending",
      date: "24 Jul 2026",
    },

    {
      id: "#GV1003",
      customer: "Michael Brown",
      total: "$95.00",
      items: 5,
      status: "Processing",
      date: "25 Jul 2026",
    },

    {
      id: "#GV1004",
      customer: "Emma Wilson",
      total: "$13.00",
      items: 1,
      status: "Cancelled",
      date: "25 Jul 2026",
    },

  ];

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

      <div className="orders-table-card">

        <table className="orders-table">

          <thead>

            <tr>

              <th>Order ID</th>

              <th>Customer</th>

              <th>Items</th>

              <th>Total</th>

              <th>Date</th>

              <th>Status</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {orders.map((order) => (

              <tr key={order.id}>

                <td>{order.id}</td>

                <td>{order.customer}</td>

                <td>{order.items}</td>

                <td>{order.total}</td>

                <td>{order.date}</td>

                <td>

                  <span
                    className={`order-status ${order.status.toLowerCase()}`}
                  >
                    {order.status}
                  </span>

                </td>

                <td>

                  <div className="table-actions">

                    <FiEye />

                    <FiMoreVertical />

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

export default Orders;