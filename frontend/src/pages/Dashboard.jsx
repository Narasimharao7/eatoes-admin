import { useEffect, useState } from "react";
import { ShoppingBag, Utensils, Clock, TrendingUp } from "lucide-react";
import Header from "../components/Header";
import api from "../services/api.js";

const API_ORDERS = "/orders";
const API_MENU = "/menu";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    totalMenuItems: 0,
    revenue: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [ordersRes, menuRes] = await Promise.all([
          api.get(API_ORDERS),
          api.get(API_MENU),
        ]);

        const orders = ordersRes.data;
        const menu = menuRes.data;

        const totalOrders = orders.length;
        const pendingOrders = orders.filter(
          (o) => o.status === "Pending",
        ).length;

        const revenue = orders.reduce(
          (sum, o) => (o.status !== "Cancelled" ? sum + o.totalAmount : sum),
          0,
        );

        setStats({
          totalOrders,
          pendingOrders,
          totalMenuItems: menu.length,
          revenue,
        });
      } catch (err) {
        console.error("Dashboard load failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="p-6 text-gray-500">Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="Dashboard Overview" />

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={<ShoppingBag />}
          color="bg-blue-100 text-blue-600"
        />
        <StatCard
          title="Pending Orders"
          value={stats.pendingOrders}
          icon={<Clock />}
          color="bg-yellow-100 text-yellow-600"
        />
        <StatCard
          title="Menu Items"
          value={stats.totalMenuItems}
          icon={<Utensils />}
          color="bg-green-100 text-green-600"
        />
        <StatCard
          title="Total Revenue"
          value={`₹${stats.revenue}`}
          icon={<TrendingUp />}
          color="bg-purple-100 text-purple-600"
        />
      </div>
    </div>
  );
}

/* ---------- SUB COMPONENT ---------- */

function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4 hover:shadow-lg transition">
      <div className={`p-3 rounded-full ${color}`}>{icon}</div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-2xl font-bold">{value}</h2>
      </div>
    </div>
  );
}
