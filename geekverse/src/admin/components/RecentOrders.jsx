function RecentOrders() {
  const orders = [
    {
      id: "#ORD12345",
      product: "Solo Leveling Vol. 7",
      price: "$20.00",
      status: "Completed",
    },
    {
      id: "#ORD12344",
      product: "Interstellar (Blu-ray)",
      price: "$15.00",
      status: "Processing",
    },
    {
      id: "#ORD12343",
      product: "Chainsaw Man Vol. 12",
      price: "$18.00",
      status: "Completed",
    },
    {
      id: "#ORD12342",
      product: "The Hobbit",
      price: "$12.00",
      status: "Pending",
    },
    {
      id: "#ORD12341",
      product: "Demon Slayer Vol. 23",
      price: "$16.00",
      status: "Completed",
    },
  ];

  return (
    <div className="recent-orders">

      <div className="orders-header">

        <h3>Recent Orders</h3>

        <span>View All</span>

      </div>

      {orders.map((order) => (

        <div className="order-item" key={order.id}>

          <div className="order-info">

            <div className="order-image"></div>

            <div>

              <h4>{order.product}</h4>

              <small>{order.id}</small>

            </div>

          </div>

          <div className="order-right">

            <strong>{order.price}</strong>

            <span
              className={`status ${order.status.toLowerCase()}`}
            >
              {order.status}
            </span>

          </div>

        </div>

      ))}

    </div>
  );
}

export default RecentOrders;