import React, { createContext, useContext, useState, useCallback } from 'react';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category?: string;
  createdAt: Date;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  amount: number;
  status: 'pending' | 'paid' | 'unpaid';
  items: { productId: string; quantity: number; price: number }[];
  media?: string[];
  createdAt: Date;
  botTranscript?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: Date;
}

interface DataContextType {
  products: Product[];
  orders: Order[];
  notifications: Notification[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addOrder: (order: Omit<Order, 'id' | 'createdAt'>) => void;
  markNotificationAsRead: (id: string) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Premium Laptop Stand',
    description: 'Adjustable aluminum laptop stand for better ergonomics',
    price: 4999,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop',
    category: 'Accessories',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Wireless Keyboard',
    description: 'Ultra-slim wireless keyboard with 24-hour battery life',
    price: 2999,
    image: 'https://images.unsplash.com/photo-1587829191301-8c94a6cf40e0?w=400&h=300&fit=crop',
    category: 'Peripherals',
    createdAt: new Date('2024-01-20'),
  },
  {
    id: '3',
    name: 'USB-C Hub',
    description: '7-in-1 USB-C hub with multiple ports for connectivity',
    price: 1999,
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=300&fit=crop',
    category: 'Accessories',
    createdAt: new Date('2024-01-25'),
  },
];

const INITIAL_ORDERS: Order[] = [
  {
    id: '1',
    customerId: 'cust-1',
    customerName: 'Alice Johnson',
    customerEmail: 'alice@example.com',
    customerPhone: '+1234567890',
    amount: 7998,
    status: 'paid',
    items: [
      { productId: '1', quantity: 1, price: 4999 },
      { productId: '2', quantity: 1, price: 2999 },
    ],
    media: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop'],
    createdAt: new Date('2024-02-01'),
    botTranscript: 'Bot: Hello! Can I help you find a product?\nCustomer: Yes, I need a laptop stand\nBot: Great! We have a premium stand for 4,999. Interested?\nCustomer: Yes, I\'ll take it along with a keyboard\nBot: Perfect! Order confirmed.',
  },
  {
    id: '2',
    customerId: 'cust-2',
    customerName: 'Bob Smith',
    customerEmail: 'bob@example.com',
    customerPhone: '+1234567891',
    amount: 1999,
    status: 'unpaid',
    items: [{ productId: '3', quantity: 1, price: 1999 }],
    createdAt: new Date('2024-02-03'),
    botTranscript: 'Bot: Welcome back! What can I help you with?\nCustomer: I need a USB-C hub\nBot: We have a great 7-in-1 hub. Would you like to see details?\nCustomer: Yes, please add it to my cart',
  },
  {
    id: '3',
    customerId: 'cust-3',
    customerName: 'Carol Davis',
    customerEmail: 'carol@example.com',
    customerPhone: '+1234567892',
    amount: 4999,
    status: 'pending',
    items: [{ productId: '1', quantity: 1, price: 4999 }],
    createdAt: new Date('2024-02-05'),
    botTranscript: 'Bot: Hi! Looking for something special?\nCustomer: Yes, I need a laptop stand\nBot: Perfect timing! We have a premium stand on sale.',
  },
];

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'New Order',
    message: 'You received a new order from Alice Johnson',
    type: 'success',
    read: false,
    createdAt: new Date(Date.now() - 3600000),
  },
  {
    id: '2',
    title: 'Payment Received',
    message: 'Payment of ₦7,998 from order #1 has been confirmed',
    type: 'success',
    read: false,
    createdAt: new Date(Date.now() - 7200000),
  },
  {
    id: '3',
    title: 'Pending Payment',
    message: 'Order #2 is awaiting payment confirmation',
    type: 'warning',
    read: true,
    createdAt: new Date(Date.now() - 86400000),
  },
];

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);

  const addProduct = useCallback((product: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setProducts(prev => [newProduct, ...prev]);
  }, []);

  const updateProduct = useCallback((id: string, product: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...product } : p));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  }, []);

  const addOrder = useCallback((order: Omit<Order, 'id' | 'createdAt'>) => {
    const newOrder: Order = {
      ...order,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setOrders(prev => [newOrder, ...prev]);
  }, []);

  const markNotificationAsRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }, []);

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'createdAt'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setNotifications(prev => [newNotification, ...prev]);
  }, []);

  return (
    <DataContext.Provider value={{
      products,
      orders,
      notifications,
      addProduct,
      updateProduct,
      deleteProduct,
      addOrder,
      markNotificationAsRead,
      addNotification,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
}
