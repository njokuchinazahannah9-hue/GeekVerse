function SystemActivity() {

  const activities = [
    {
      icon: "👤",
      text: "New user registered",
      time: "2 mins ago",
    },
    {
      icon: "🛒",
      text: "New order received",
      time: "5 mins ago",
    },
    {
      icon: "✏️",
      text: "Product updated",
      time: "10 mins ago",
    },
    {
      icon: "👥",
      text: "Staff member added",
      time: "30 mins ago",
    },
    {
      icon: "✅",
      text: "Order completed",
      time: "1 hour ago",
    },
  ];

  return (
    <div className="system-activity">

      <div className="table-header">
        <h3>System Activity</h3>
        <span>View All</span>
      </div>

      {activities.map((item, index) => (
        <div
          className="activity-item"
          key={index}
        >
          <div className="activity-left">
            <div className="activity-icon">
              {item.icon}
            </div>

            <span>{item.text}</span>
          </div>

          <small>{item.time}</small>
        </div>
      ))}

    </div>
  );
}

export default SystemActivity;