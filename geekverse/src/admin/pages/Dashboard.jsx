import DashboardHeader from "../components/DashboardHeader";
import StatsCards from "../components/StatsCards";
import SalesChart from "../components/SalesChart";
import TopCategories from "../components/TopCategories";
import RecentOrders from "../components/RecentOrders";

import RecentProducts from "../components/RecentProducts";
import RecentUsers from "../components/RecentUsers";
import SystemActivity from "../components/SystemActivity";

function Dashboard() {
  return (
    <div className="dashboard-page">

      <DashboardHeader />

      <StatsCards />

      <div className="dashboard-row">
        <SalesChart />
        <TopCategories />
        <RecentOrders />
      </div>

      <div className="dashboard-row">
        <RecentProducts />
        <RecentUsers />
        <SystemActivity />
      </div>

    </div>
  );
}

export default Dashboard;