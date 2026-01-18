import { Layout } from '@/components/Layout/Layout';
import { useData } from '@/context/DataContext';
import { Trash2, Check, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function NotificationsPage() {
  const { notifications, markNotificationAsRead } = useData();

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'error':
        return <AlertCircle className="text-red-500" size={20} />;
      case 'warning':
        return <AlertCircle className="text-yellow-500" size={20} />;
      default:
        return <Info className="text-blue-500" size={20} />;
    }
  };

  return (
    <Layout>
      <div className="p-6 md:p-8 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Notifications</h1>
          <p className="text-slate-600">Stay updated with your sales activity</p>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.length > 0 ? (
            notifications.map(notification => (
              <div
                key={notification.id}
                className={cn(
                  'bg-white border rounded-lg p-4 flex items-start gap-4 hover:shadow-md transition-shadow',
                  notification.read ? 'border-slate-200' : 'border-blue-200 bg-blue-50'
                )}
              >
                <div className="flex-shrink-0 mt-1">
                  {getIcon(notification.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className={cn('font-semibold', notification.read ? 'text-slate-600' : 'text-slate-900')}>
                    {notification.title}
                  </h3>
                  <p className="text-slate-600 text-sm mt-1">{notification.message}</p>
                  <p className="text-xs text-slate-500 mt-2">
                    {notification.createdAt.toLocaleString()}
                  </p>
                </div>

                {!notification.read && (
                  <button
                    onClick={() => markNotificationAsRead(notification.id)}
                    className="flex-shrink-0 p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                    title="Mark as read"
                  >
                    <Check size={18} />
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg p-12 text-center border border-slate-200">
              <AlertCircle className="mx-auto text-slate-300 mb-4" size={48} />
              <p className="text-slate-600">No notifications yet</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
