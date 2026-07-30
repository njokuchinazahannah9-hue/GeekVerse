import {
  FiBox,
  FiUsers,
  FiShoppingBag,
  FiDollarSign,
} from "react-icons/fi";

function StatsCards() {
  const stats = [
    {
      icon: <FiBox />,
      title: "Total Products",
      value: "248",
      change: "+12.5%",
      text: "from last month",
      color: "purple",
    },
    {
      icon: <FiUsers />,
      title: "Total Users",
      value: "15,682",
      change: "+8.2%",
      text: "from last month",
      color: "green",
    },
    {
      icon: <FiShoppingBag />,
      title: "Total Orders",
      value: "1,248",
      change: "+18.7%",
      text: "from last month",
      color: "orange",
    },
    {
      icon: <FiDollarSign />,
      title: "Total Revenue",
      value: "$34,280",
      change: "+24.1%",
      text: "from last month",
      color: "blue",
    },
  ];

  return (
    <section className="stats-grid">
      {stats.map((item, index) => (
        <div className="stat-card" key={index}>
          <div className={`stat-icon ${item.color}`}>
            {item.icon}
          </div>

          <div className="stat-content">
            <span>{item.title}</span>

            <h2>{item.value}</h2>

            <p>
              <strong>{item.change}</strong> {item.text}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}

export default StatsCards;