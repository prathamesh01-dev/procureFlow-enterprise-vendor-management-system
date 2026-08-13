import {
  LayoutDashboard,
  Users,
  FileText,
  ShoppingCart,
  Receipt,
  CreditCard,
  BarChart3,
  Settings,
  Bell,
  Search,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const STATS_API = "http://localhost:5000/api/vendors/stats";
const PO_API = 'http://localhost:5000/api/purchase-orders';

function Dashboard() {
  const [stats, setStats] = useState({
    totalVendors: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    averageRating: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
  fetchStats();
  fetchRecentOrders();

  const interval = setInterval(() => {
    fetchStats();
    fetchRecentOrders();
  }, 3000);

  return () => clearInterval(interval);
}, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get(STATS_API);
      setStats(res.data);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };
  const fetchRecentOrders = async () => {
  try {
    const res = await axios.get(PO_API);

    setRecentOrders(res.data.slice(0, 5));

  } catch (error) {
    console.error(error);
  }
};

  const chartData = [
    { status: "Approved", count: stats.approved },
    { status: "Pending", count: stats.pending },
    { status: "Rejected", count: stats.rejected },
  ];

  return (
    
  <div className="flex-1">
      

      {/* Main */}
      
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center bg-slate-100 rounded-xl px-4 py-2 w-96">
            <Search className="w-5 h-5 text-slate-500" />

            <input
              placeholder="Search vendors, orders, invoices..."
              className="bg-transparent outline-none ml-2 w-full text-slate-700"
            />
          </div>

          <div className="flex items-center gap-4">
            <Bell className="w-6 h-6 text-slate-600" />

            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              A
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-8">
          <h2 className="text-3xl font-bold text-slate-900">
            Procurement Dashboard
          </h2>

          <p className="text-slate-600 mt-2">
            Monitor vendors, procurement operations, and financial approvals.
          </p>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 mt-8">
            {/* Total Vendors */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <p className="text-slate-500">Total Vendors</p>

              <h3 className="text-3xl font-bold text-slate-900 mt-2">
                {stats.totalVendors}
              </h3>
            </div>

            {/* Pending */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <p className="text-slate-500">Pending Approvals</p>

              <h3 className="text-3xl font-bold text-yellow-600 mt-2">
                {stats.pending}
              </h3>
            </div>

            {/* Approved */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <p className="text-slate-500">Approved Vendors</p>

              <h3 className="text-3xl font-bold text-green-600 mt-2">
                {stats.approved}
              </h3>
            </div>

            {/* Rejected */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <p className="text-slate-500">Rejected Vendors</p>

              <h3 className="text-3xl font-bold text-red-600 mt-2">
                {stats.rejected}
              </h3>
            </div>

            {/* Average Rating */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <p className="text-slate-500">Average Vendor Rating</p>

              <div className="mt-2 flex items-center gap-2">
                <span className="text-2xl">
                  {"⭐".repeat(
                    Math.round(Number(stats.averageRating || 0))
                  )}
                </span>

                <span className="text-xl font-bold text-slate-900">
                  {stats.averageRating}/5
                </span>
              </div>
            </div>
          </div>

          {/* Vendor Status Chart */}
          <div className="mt-8 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">
              Vendor Status Distribution
            </h3>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="status" />

                  <YAxis />

                  <Tooltip />

                  <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          entry.status === "Approved"
                            ? "#2563eb"
                            : entry.status === "Pending"
                            ? "#f59e0b"
                            : "#dc2626"
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Purchase Orders */}
          <div className="mt-8 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">
              Recent Purchase Orders
            </h3>

            <table className="w-full">
              <thead>
                <tr className="text-left text-slate-500 border-b">
                  <th className="pb-3">PO ID</th>
                  <th className="pb-3">Vendor</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {recentOrders.length === 0 ? (
  <tr>
    <td
      colSpan='4'
      className='py-8 text-center text-slate-500'
    >
      No purchase orders found.
    </td>
  </tr>
) : (
  recentOrders.map((order) => (
    <tr
      key={order._id}
      className='border-b'
    >
      <td className='py-4'>{order.poNumber}</td>

      <td>{order.vendor?.company}</td>

      <td>₹{order.totalAmount?.toLocaleString()}</td>

      <td
        className={`font-medium ${
          order.status === 'Approved'
            ? 'text-green-600'
            : order.status === 'Pending'
            ? 'text-yellow-600'
            : order.status === 'Delivered'
            ? 'text-blue-600'
            : 'text-red-600'
        }`}
      >
        {order.status}
      </td>
    </tr>
  ))
)}
              </tbody>
            </table>
          </div>
        </main>
      
    </div>
  );
}

function SidebarItem({ icon: Icon, label, active, to }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
        active
          ? "bg-blue-600 text-white"
          : "text-slate-300 hover:bg-slate-800 hover:text-white"
      }`}
    >
      <Icon className="w-5 h-5" />

      <span className="font-medium">{label}</span>
    </Link>
  );
}

export default Dashboard;