import Chart from "react-apexcharts";

function Analytics() {
  const revenueChart = {
    series: [
      {
        name: "Revenue",
        data: [1200, 2100, 1800, 2900, 3400, 4200],
      },
    ],

    options: {
      chart: {
        toolbar: {
          show: false,
        },
        background: "transparent",
      },

      theme: {
        mode: "dark",
      },

      stroke: {
        curve: "smooth",
        width: 4,
      },

      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
        ],
      },

      grid: {
        borderColor: "#2B3045",
      },

      colors: ["#7C3AED"],
    },
  };

  const ordersChart = {
    series: [
      {
        name: "Orders",
        data: [45, 60, 52, 80, 95, 120],
      },
    ],

    options: {
      chart: {
        toolbar: {
          show: false,
        },
        background: "transparent",
      },

      theme: {
        mode: "dark",
      },

      plotOptions: {
        bar: {
          borderRadius: 8,
        },
      },

      colors: ["#22C55E"],

      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
        ],
      },

      grid: {
        borderColor: "#2B3045",
      },
    },
  };

  const categoryChart = {
    series: [45, 20, 25, 10],

    options: {
      labels: [
        "Movies",
        "Books",
        "Manga",
        "Comics",
      ],

      theme: {
        mode: "dark",
      },

      legend: {
        position: "bottom",
      },

      colors: [
        "#7C3AED",
        "#22C55E",
        "#FACC15",
        "#F97316",
      ],
    },
  };

  return (
    <div className="analytics-page">

      <div className="analytics-header">

        <h1>Analytics</h1>

        <p>
          Store analytics and reports.
        </p>

      </div>

      <div className="analytics-grid">

        <div className="analytics-card">

          <h3>Total Revenue</h3>

          <h2>$52,340</h2>

        </div>

        <div className="analytics-card">

          <h3>Total Orders</h3>

          <h2>2,485</h2>

        </div>

        <div className="analytics-card">

          <h3>Total Users</h3>

          <h2>12,487</h2>

        </div>

        <div className="analytics-card">

          <h3>Products Sold</h3>

          <h2>8,940</h2>

        </div>

      </div>

      <div className="charts-grid">

        <div className="chart-card">

          <h3>Revenue Overview</h3>

          <Chart
            options={revenueChart.options}
            series={revenueChart.series}
            type="line"
            height={320}
          />

        </div>

        <div className="chart-card">

          <h3>Orders Overview</h3>

          <Chart
            options={ordersChart.options}
            series={ordersChart.series}
            type="bar"
            height={320}
          />

        </div>

      </div>

      <div className="chart-card">

        <h3>Products by Category</h3>

        <Chart
          options={categoryChart.options}
          series={categoryChart.series}
          type="donut"
          height={380}
        />

      </div>

      {/* ===========================
   STAFF MANAGEMENT
=========================== */}

<div className="manager-section">

  <div className="section-header">

    <h2>Staff Management</h2>

    <p>
      Manage your staff members quickly.
    </p>

  </div>

  <div className="staff-overview-card">

    <div className="staff-list">

      <div className="staff-item">

        <div>

          <h4>Sarah Smith</h4>

          <span>Customer Support</span>

        </div>

        <span className="staff-status active">
          Active
        </span>

      </div>

      <div className="staff-item">

        <div>

          <h4>Michael Brown</h4>

          <span>Inventory Manager</span>

        </div>

        <span className="staff-status active">
          Active
        </span>

      </div>

      <div className="staff-item">

        <div>

          <h4>David Wilson</h4>

          <span>Moderator</span>

        </div>

        <span className="staff-status suspended">
          Suspended
        </span>

      </div>

    </div>

    <div className="staff-actions">

      <button className="save-btn">
        Add Staff
      </button>

      <button className="filter-btn">
        View All Staff
      </button>

    </div>

  </div>

</div>

    </div>
  );
}

export default Analytics;