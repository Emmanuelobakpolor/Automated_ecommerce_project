import { Layout } from '@/components/Layout/Layout';
import { useData } from '@/context/DataContext';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Eye } from 'lucide-react';
import { useState } from 'react';

export default function Orders() {
  const navigate = useNavigate();
  const { orders } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'paid' | 'unpaid' | 'pending'>('all');

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <Layout>
      <div className="p-6 md:p-8 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Orders</h1>
          <p className="text-slate-600">View and manage all customer orders</p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search by customer, email, or order ID..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          <div className="flex gap-2">
            <Filter size={20} className="text-slate-600 self-center" />
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value as any)}
              className="px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {filteredOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Order ID</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Customer</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Email</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Amount</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map(order => (
                    <tr key={order.id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm text-slate-900">#{order.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-slate-900 font-medium">{order.customerName}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-slate-600 text-sm">{order.customerEmail}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-slate-900">₦{order.amount.toLocaleString()}</span>
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
                      <td className="px-6 py-4">
                        <button
                          onClick={() => navigate(`/orders/${order.id}`)}
                          className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                        >
                          <Eye size={16} />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-6 py-12 text-center">
              <p className="text-slate-600">
                {searchTerm || filterStatus !== 'all' ? 'No orders found' : 'No orders yet'}
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
