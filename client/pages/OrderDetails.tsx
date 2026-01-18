import { Layout } from '@/components/Layout/Layout';
import { useData } from '@/context/DataContext';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, User, Mail, Phone } from 'lucide-react';

export default function OrderDetails() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { orders } = useData();

  const order = orders.find(o => o.id === orderId);

  if (!order) {
    return (
      <Layout>
        <div className="p-6 md:p-8 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
          <button
            onClick={() => navigate('/orders')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-6"
          >
            <ArrowLeft size={20} />
            Back to Orders
          </button>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
            <p className="text-slate-600 text-lg">Order not found</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 md:p-8 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
        {/* Header */}
        <button
          onClick={() => navigate('/orders')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-6"
        >
          <ArrowLeft size={20} />
          Back to Orders
        </button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Order #{order.id}</h1>
          <p className="text-slate-600">{order.createdAt.toLocaleDateString()}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Info */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Customer Information</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="text-slate-400 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-slate-600">Name</p>
                    <p className="text-slate-900 font-medium">{order.customerName}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="text-slate-400 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-slate-600">Email</p>
                    <p className="text-slate-900 font-medium">{order.customerEmail}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="text-slate-400 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-slate-600">Phone</p>
                    <p className="text-slate-900 font-medium">{order.customerPhone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Order Items</h2>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Package className="text-slate-400" size={20} />
                      <div>
                        <p className="font-medium text-slate-900">Product #{item.productId}</p>
                        <p className="text-sm text-slate-600">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-semibold text-slate-900">₦{item.price.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bot Conversation */}
            {order.botTranscript && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Bot Conversation</h2>
                <div className="bg-slate-50 rounded-lg p-4 space-y-3 text-sm max-h-64 overflow-y-auto">
                  {order.botTranscript.split('\n').map((line, index) => (
                    <p key={index} className="text-slate-700">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Media */}
            {order.media && order.media.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Order Media</h2>
                <div className="grid grid-cols-2 gap-4">
                  {order.media.map((mediaUrl, index) => (
                    <img
                      key={index}
                      src={mediaUrl}
                      alt={`Order media ${index + 1}`}
                      className="rounded-lg w-full h-48 object-cover border border-slate-200"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-semibold text-slate-900">₦{order.amount.toLocaleString()}</span>
                </div>
                <div className="border-t border-slate-200 pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-900">Total</span>
                    <span className="text-2xl font-bold text-blue-600">₦{order.amount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Payment Status</h2>
              <div
                className={`text-center py-3 rounded-lg font-semibold ${
                  order.status === 'paid'
                    ? 'bg-green-100 text-green-700'
                    : order.status === 'unpaid'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
