import { Layout } from '@/components/Layout/Layout';
import { useData } from '@/context/DataContext';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Package, Clock, TrendingUp, Plus, Eye, MessageSquare, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const { orders, products, notifications } = useData();

  // Calculate statistics
  const totalOrders = orders.length;
  const paidAmount = orders
    .filter(o => o.status === 'paid')
    .reduce((sum, o) => sum + o.amount, 0);
  const unpaidAmount = orders
    .filter(o => o.status === 'unpaid')
    .reduce((sum, o) => sum + o.amount, 0);
  const pendingAmount = orders
    .filter(o => o.status === 'pending')
    .reduce((sum, o) => sum + o.amount, 0);
  const unreadNotifications = notifications.filter(n => !n.read).length;

  const stats = [
    {
      title: 'Total Orders',
      value: totalOrders,
      icon: ShoppingCart,
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      title: 'Paid Orders',
      value: `₦${paidAmount.toLocaleString()}`,
      icon: TrendingUp,
      color: 'bg-green-500',
      lightColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      title: 'Unpaid Orders',
      value: `₦${unpaidAmount.toLocaleString()}`,
      icon: AlertCircle,
      color: 'bg-red-500',
      lightColor: 'bg-red-50',
      textColor: 'text-red-600',
    },
    {
      title: 'Pending Orders',
      value: `₦${pendingAmount.toLocaleString()}`,
      icon: Clock,
      color: 'bg-yellow-500',
      lightColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
    },
    {
      title: 'Products',
      value: products.length,
      icon: Package,
      color: 'bg-purple-500',
      lightColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
    {
      title: 'Notifications',
      value: unreadNotifications,
      icon: MessageSquare,
      color: 'bg-indigo-500',
      lightColor: 'bg-indigo-50',
      textColor: 'text-indigo-600',
    },
  ];

  return (
    <Layout>
      <div className="p-6 md:p-8 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Dashboard</h1>
          <p className="text-slate-600">Welcome back! Here's your sales overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-slate-600 text-sm font-medium mb-1">{stat.title}</p>
                    <h3 className="text-3xl font-bold text-slate-900">{stat.value}</h3>
                  </div>
                  <div className={`${stat.lightColor} p-3 rounded-lg`}>
                    <Icon className={`${stat.textColor}`} size={24} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={() => navigate('/products/new')}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:shadow-lg transition-all rounded-xl p-6 text-white text-left group"
          >
            <div className="flex items-start justify-between mb-4">
              <Plus size={32} className="group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-xl font-bold mb-1">Add Product</h3>
            <p className="text-blue-100">Add a new product to your store</p>
          </button>

          <button
            onClick={() => navigate('/orders')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg transition-all rounded-xl p-6 text-white text-left group"
          >
            <div className="flex items-start justify-between mb-4">
              <Eye size={32} className="group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-xl font-bold mb-1">View Orders</h3>
            <p className="text-purple-100">Manage all your customer orders</p>
          </button>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h2 className="text-xl font-bold text-slate-900">Recent Orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map(order => (
                  <tr
                    key={order.id}
                    onClick={() => navigate(`/orders/${order.id}`)}
                    className="border-b border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm text-slate-900">#{order.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-900">{order.customerName}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-slate-900">
                        ₦{order.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === 'paid'
                            ? 'bg-green-100 text-green-700'
                            : order.status === 'unpaid'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-sm">
                      {order.createdAt.toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {orders.length === 0 && (
            <div className="px-6 py-12 text-center">
              <ShoppingCart className="mx-auto text-slate-300 mb-4" size={48} />
              <p className="text-slate-600">No orders yet</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
