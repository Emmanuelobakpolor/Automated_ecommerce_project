import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Settings, 
  Bell, 
  CreditCard,
  LogOut,
  MessageSquare,
  ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  badge?: number;
}

export function Sidebar() {
  const { logout } = useAuth();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);

  const navItems: NavItem[] = [
    { label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { label: 'Products', path: '/products', icon: <Package size={20} /> },
    { label: 'Orders', path: '/orders', icon: <ShoppingCart size={20} /> },
    { label: 'Bot Settings', path: '/bot-settings', icon: <MessageSquare size={20} /> },
    { label: 'Notifications', path: '/notifications', icon: <Bell size={20} />, badge: 2 },
  ];

  const settingsItems: NavItem[] = [
    { label: 'Payment Settings', path: '/payment-settings', icon: <CreditCard size={20} /> },
    { label: 'General Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-white fixed left-0 top-0 h-screen border-r border-slate-800">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            ChatBot
          </h1>
          <p className="text-xs text-slate-400 mt-1">Sales Platform</p>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Main Menu</p>
            <ul className="space-y-2">
              {navItems.map(item => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors relative',
                      isActive(item.path)
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-300 hover:bg-slate-800'
                    )}
                  >
                    {item.icon}
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Settings</p>
            <ul className="space-y-2">
              {settingsItems.map(item => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                      isActive(item.path)
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-300 hover:bg-slate-800'
                    )}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-red-900/20 hover:text-red-300 transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-slate-900 text-white border-b border-slate-800 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            ChatBot
          </h1>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <ChevronDown className={cn('transition-transform', showMenu && 'rotate-180')} />
          </button>
        </div>

        {showMenu && (
          <nav className="px-4 py-4 border-t border-slate-800 bg-slate-800">
            <ul className="space-y-2">
              {[...navItems, ...settingsItems].map(item => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setShowMenu(false)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm',
                      isActive(item.path)
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-300 hover:bg-slate-700'
                    )}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    logout();
                    setShowMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-slate-300 hover:bg-red-900/20 hover:text-red-300 transition-colors text-sm"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </>
  );
}
