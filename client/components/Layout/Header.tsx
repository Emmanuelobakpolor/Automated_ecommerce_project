import { useAuth } from '@/context/AuthContext';
import { Bell, User, LogOut } from 'lucide-react';
import { useData } from '@/context/DataContext';
import { useState } from 'react';

export function Header() {
  const { user, logout } = useAuth();
  const { notifications } = useData();
  const unreadCount = notifications.filter(n => !n.read).length;
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200 ml-64 fixed top-0 right-0 h-16">
      <div className="flex items-center gap-6">
        <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors">
          <Bell size={20} className="text-slate-600" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      <div className="relative">
        <button
          onClick={() => setShowProfile(!showProfile)}
          className="flex items-center gap-3 p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-8 h-8 rounded-full"
          />
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-slate-900">{user?.name}</p>
            <p className="text-xs text-slate-500">{user?.businessName}</p>
          </div>
        </button>

        {showProfile && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-50">
            <div className="p-4 border-b border-slate-200">
              <p className="font-medium text-slate-900">{user?.name}</p>
              <p className="text-sm text-slate-500">{user?.email}</p>
            </div>
            <button
              onClick={() => {
                logout();
                setShowProfile(false);
              }}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
