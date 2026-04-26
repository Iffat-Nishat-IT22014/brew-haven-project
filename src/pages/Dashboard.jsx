import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, CheckCircle, Clock, Package, User, MoreHorizontal } from 'lucide-react';
import { motion } from 'motion/react';
import bgImage from '../assets/dashboard_bg.jpg';
import bgImage1 from '../assets/7.png';

const Dashboard = () => {
  const { user, token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('/api/orders', {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log("ORDERS API RESPONSE:", res.data);

      const safeOrders =
        Array.isArray(res.data)
          ? res.data
          : res.data?.orders || res.data?.data || [];

      setOrders(safeOrders);
    } catch (err) {
      console.error("Failed to fetch orders", err);
      setOrders([]); // fallback safe state
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      const res = await axios.patch(
        `https://brew-haven-jo83.onrender.com//api/orders/${orderId}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      console.log("UPDATED:", res.data);
      fetchOrders();

    } catch (err) {
      console.error("ERROR:", err.response?.data || err.message);
    }
  };

  const statusBadge = (status) => {
    switch (status) {
      case 'pending':
        return (
          <span className="badge badge-warning gap-1">
            <Clock size={12} /> Pending
          </span>
        );
      case 'completed':
        return (
          <span className="badge badge-success gap-1 text-white">
            <CheckCircle size={12} /> Completed
          </span>
        );
      case 'cancelled':
        return (
          <span className="badge badge-error gap-1 text-white">
            <Package size={12} /> Cancelled
          </span>
        );
      default:
        return <span className="badge badge-ghost">{status}</span>;
    }
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div className="container mx-auto px-4 md:px-8 py-12"
      style={{ backgroundImage: `url(${bgImage1})` }}
    >

      {/* HEADER */}
      <div
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 p-8 md:p-12 rounded-md text-primary-content shadow-xl bg-cover bg-center relative"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        {/* Overlay (optional but recommended) */}
        <div className="absolute inset-0 rounded-md"></div>

        <div className="relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-2 text-[#331A15]"
            style={{ fontFamily: 'Rancho, cursive' }}
          >
            My Dashboard
          </h1>
          <p className="text-xl opacity-90 text-amber-950/90">
            Welcome back, {user?.name
              ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
              : "User"}
            {user?.role === 'admin' ? '(Administrator)' : ''}
          </p>
        </div>

        <div className="stat rounded-md text-white py-4 px-8 text-right relative z-10"
          style={{ backgroundImage: `url(${bgImage1})` }}
        >
          <div className="stat-title text-white/70">Total Orders</div>
          <div className="stat-value">{orders.length}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* PROFILE */}
        <div className="card bg-base-100 shadow-xl p-8 rounded-[40px]">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 text-4xl font-bold">
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>

          <h2 className="text-2xl font-bold text-center mb-6">
            {user?.name}
          </h2>

          <div className="space-y-4 text-base-content/70">
            <div className="flex items-center gap-3">
              <User size={18} /> {user?.email}
            </div>
            <div className="flex items-center gap-3">
              <ShoppingBag size={18} /> Role: {user?.role}
            </div>
          </div>
        </div>

        {/* ORDERS */}
        <div className="lg:col-span-2 bg-base-100 rounded-[40px] shadow-xl overflow-hidden">

          <div className="p-8 border-b flex justify-between items-center">
            <h2 className="text-2xl font-bold">Recent Orders</h2>
            <button onClick={fetchOrders} className="btn btn-ghost btn-sm">
              Refresh
            </button>
          </div>

          {/* EMPTY STATE */}
          {(!Array.isArray(orders) || orders.length === 0) ? (
            <div className="p-20 text-center text-base-content/40">
              <Package size={48} className="mx-auto mb-4 opacity-20" />
              <p>No orders found yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    {user?.role === 'admin' && <th>Customer</th>}
                    <th>Date</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Items</th>
                    {user?.role === 'admin' && <th>Action</th>}
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <motion.tr
                      key={order._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <td className="font-bold">
                        #ORD-{order.id}
                      </td>

                      {user?.role === 'admin' && (
                        <td>{order.user_name}</td>
                      )}

                      <td>
                        {order.created_at
                          ? new Date(order.created_at).toLocaleDateString()
                          : "N/A"}
                      </td>

                      <td className="font-bold text-primary">
                        ${Number(order.total_price || 0).toFixed(2)}
                      </td>

                      <td>{statusBadge(order.status)}</td>

                      {/* ITEMS SAFE */}
                      <td>
                        <div className="dropdown dropdown-left">
                          <label tabIndex={0} className="btn btn-xs">
                            View
                          </label>

                          <ul className="dropdown-content menu p-3 shadow bg-base-100 rounded-box w-64">
                            {(order.items || []).map((item, idx) => (
                              <li key={idx} className="flex justify-between">
                                <span>
                                  {item.quantity}x {item.name}
                                </span>
                                <span>
                                  ${(item.price * item.quantity).toFixed(2)}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </td>

                      {/* ADMIN ACTION */}
                      {user?.role === 'admin' && (
                        <td>
                          <div className="dropdown dropdown-left">
                            <button tabIndex={0} className="btn btn-ghost btn-sm">
                              <MoreHorizontal size={16} />
                            </button>

                            <ul
                              tabIndex={0}
                              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40"
                            >
                              <li>
                                <button onClick={() => updateStatus(order._id, 'pending')}>
                                  Pending
                                </button>
                              </li>
                              <li>
                                <button onClick={() => updateStatus(order._id, 'completed')}>
                                  Completed
                                </button>
                              </li>
                              <li>
                                <button onClick={() => updateStatus(order._id, 'cancelled')}>
                                  Cancel
                                </button>
                              </li>
                            </ul>
                          </div>
                        </td>
                      )}
                    </motion.tr>
                  ))}
                </tbody>
              </table>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;