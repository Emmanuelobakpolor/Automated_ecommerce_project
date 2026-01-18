# Social Sales ChatBot Platform - App Structure & Documentation

## Overview
A complete React frontend application for a social sales chatbot platform with authentication, product management, order tracking, and bot configuration. Built with React 18, React Router 6, TypeScript, and Tailwind CSS.

## Project Architecture

### Directory Structure
```
client/
├── pages/                          # Page components (route views)
│   ├── Login.tsx                  # Login page with validation
│   ├── Signup.tsx                 # Signup page with validation
│   ├── Dashboard.tsx              # Main dashboard with stats & recent orders
│   ├── Products.tsx               # Product listing with search
│   ├── AddProduct.tsx             # Create new product form
│   ├── EditProduct.tsx            # Edit existing product
│   ├── Orders.tsx                 # Orders list with search & filtering
│   ├── OrderDetails.tsx           # Individual order details & bot transcript
│   ├── Notifications.tsx          # Notification center
│   ├── BotSettings.tsx            # Bot configuration (placeholder)
│   ├── PaymentSettings.tsx        # Payment configuration (placeholder)
│   ├── GeneralSettings.tsx        # Account settings (placeholder)
│   ├── Placeholder.tsx            # Generic placeholder component
│   └── NotFound.tsx               # 404 page
│
├── context/                       # Global state management
│   ├── AuthContext.tsx           # Authentication state & user management
│   └── DataContext.tsx           # App data (products, orders, notifications)
│
├── components/
│   ├── Layout/
│   │   ├── Sidebar.tsx           # Navigation sidebar (desktop + mobile)
│   │   ├── Header.tsx            # Top header with user menu
│   │   └── Layout.tsx            # Layout wrapper component
│   ├── ProtectedRoute.tsx        # Route guard for protected pages
│   └── ui/                        # Pre-built shadcn UI components
│
├── lib/
│   └── utils.ts                  # Utility functions (cn helper)
│
├── hooks/
│   └── use-toast.ts              # Toast notification hook
│
└── App.tsx                        # Main app component with routing

public/                           # Static assets
shared/                           # Shared types between client & server
```

## Key Features

### 1. Authentication System
**Location**: `client/context/AuthContext.tsx`

- **Login Page** (`/login`)
  - Email validation
  - Password with show/hide toggle
  - Remember me checkbox
  - Demo credentials display
  - Error handling with validation messages

- **Signup Page** (`/signup`)
  - Full name, business name, email, password fields
  - Password confirmation matching
  - Form validation
  - Automatic login after signup

- **Protected Routes**
  - All non-auth pages require authentication
  - Automatic redirect to login if not authenticated
  - User context available throughout app

### 2. Dashboard
**Location**: `client/pages/Dashboard.tsx`

#### Summary Cards
- Total Orders count
- Paid Orders (total amount)
- Unpaid Orders (total amount)
- Pending Orders (total amount)
- Product count
- Unread Notifications count

#### Features
- Recent orders table (5 most recent)
- Click order to view details
- Quick action buttons:
  - Add Product → `/products/new`
  - View Orders → `/orders`
- Responsive grid layout

### 3. Products Management
**Location**: `client/pages/Products.tsx`, `client/pages/AddProduct.tsx`, `client/pages/EditProduct.tsx`

#### Products List
- Grid layout (responsive: 1 col mobile, 2 cols tablet, 3 cols desktop)
- Product cards with image, name, description, price
- Search functionality
- Edit/Delete buttons
- Hover effects

#### Add/Edit Forms
- Product name, description, category
- Price input with validation
- Optional image URL with preview
- Form validation with error messages
- Loading states

### 4. Orders Management
**Location**: `client/pages/Orders.tsx`, `client/pages/OrderDetails.tsx`

#### Orders List
- Search by customer name, email, or order ID
- Filter by status (All, Paid, Unpaid, Pending)
- Table view with columns: Order ID, Customer, Email, Amount, Status, Date
- Click rows to view details
- Status badges (color-coded)

#### Order Details
- Customer information (name, email, phone)
- Order items list with quantities and prices
- Bot conversation transcript (if available)
- Media gallery (images/videos)
- Order summary with total amount
- Payment status display

### 5. Notifications Center
**Location**: `client/pages/Notifications.tsx`

- List of all notifications with timestamps
- Type-based icons (success, error, warning, info)
- Mark as read functionality
- Unread badge in sidebar
- Notification creation from data context

### 6. Navigation & Layout
**Location**: `client/components/Layout/`

#### Sidebar (Desktop)
- Fixed left sidebar on desktop
- Hidden on mobile
- Brand logo at top
- Main menu items:
  - Dashboard, Products, Orders, Bot Settings, Notifications
- Settings section:
  - Payment Settings, General Settings
- Logout button
- Badge for notification count
- Active link highlighting

#### Sidebar (Mobile)
- Collapsible menu dropdown
- Same navigation items
- Accessible from top of page

#### Header
- Hidden on mobile
- Shows notification bell with unread count
- User profile menu:
  - Avatar, name, business name
  - Logout option

### 7. Global State Management

#### AuthContext
```typescript
{
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login(email, password): Promise<void>;
  signup(email, password, name, businessName): Promise<void>;
  logout(): void;
}
```

#### DataContext
```typescript
{
  products: Product[];
  orders: Order[];
  notifications: Notification[];
  addProduct(product): void;
  updateProduct(id, changes): void;
  deleteProduct(id): void;
  addOrder(order): void;
  markNotificationAsRead(id): void;
  addNotification(notification): void;
}
```

### 8. Mock Data

**Initial Products**:
- Premium Laptop Stand (₦4,999)
- Wireless Keyboard (₦2,999)
- USB-C Hub (₦1,999)

**Initial Orders**:
- Order 1: Alice Johnson (Paid, ₦7,998)
- Order 2: Bob Smith (Unpaid, ₦1,999)
- Order 3: Carol Davis (Pending, ₦4,999)

**Initial Notifications**:
- New order alerts
- Payment confirmations
- Pending payment warnings

### 9. Routing Map

#### Public Routes
- `/login` - Login page
- `/signup` - Signup page

#### Protected Routes
- `/` - Redirects to `/dashboard`
- `/dashboard` - Main dashboard
- `/products` - Products listing
- `/products/new` - Add new product
- `/products/:productId/edit` - Edit product
- `/orders` - Orders listing
- `/orders/:orderId` - Order details
- `/bot-settings` - Bot configuration (placeholder)
- `/notifications` - Notifications center
- `/payment-settings` - Payment config (placeholder)
- `/settings` - General settings (placeholder)
- `*` - 404 Not Found page

## Styling & Theme

### Tailwind Configuration
- Custom color palette with HSL variables
- Dark mode support via CSS variables in `client/global.css`
- Predefined colors:
  - Primary: Blue/Cyan gradient
  - Secondary: Light Gray/Blue
  - Destructive: Red
  - Muted: Gray
  - Success: Green
  - Warning: Yellow

### Design System
- Rounded corners: 0.5rem (base)
- Shadows: Subtle, elevation-based
- Animations: Smooth transitions, hover effects
- Responsive breakpoints: sm (640px), md (768px), lg (1024px)

## Responsive Design

### Mobile (< 768px)
- Single column layouts
- Collapsible sidebar menu
- Hidden header
- Touch-friendly buttons
- Full-width inputs and cards

### Tablet (768px - 1024px)
- Two-column product grid
- Visible sidebar with text
- Standard spacing

### Desktop (> 1024px)
- Three-column product grid
- Fixed sidebar
- Full header with user menu
- Expanded tables

## How to Use the App

### 1. Getting Started
1. Navigate to `/login`
2. Use demo credentials or create new account via signup
3. Login to access protected routes

### 2. Adding a Product
1. Click "Add Product" button or go to `/products/new`
2. Fill form (name, description, price required)
3. Upload optional image URL
4. Click "Create Product"
5. Redirects to products list

### 3. Managing Orders
1. Go to "Orders" in sidebar
2. Search or filter by status
3. Click order row to view details
4. View customer info, items, bot transcript, and media

### 4. Viewing Notifications
1. Click "Notifications" in sidebar
2. Mark notifications as read
3. Unread count shown in sidebar badge

## API Simulation

All data operations are client-side with mock delays:
- Simulated 800ms delays for login/signup
- Immediate read operations
- State updates using Context API
- No actual backend calls

## Component Hierarchy

```
<App>
  <AuthProvider>
    <DataProvider>
      <QueryClientProvider>
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            } />
            {/* More routes... */}
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </DataProvider>
  </AuthProvider>
</App>
```

## Key Technologies

- **React 18**: Component library
- **React Router 6**: Client-side routing with SPA
- **TypeScript**: Type safety
- **Tailwind CSS 3**: Utility-first styling
- **Lucide React**: Icon library
- **React Context**: Global state management
- **React Query**: Server state management (configured but minimal use)
- **Vite**: Build tool
- **shadcn/ui**: Pre-built component library

## Future Enhancements

### Placeholder Pages to Implement
1. **Bot Settings**
   - Question flow configuration
   - Platform toggles (WhatsApp, Instagram, Snapchat)
   - Default reply templates

2. **Payment Settings**
   - Paystack API key input
   - Test mode toggle
   - Transaction history

3. **General Settings**
   - Profile editing
   - Business info updates
   - Password change
   - Account security

### Potential Features
- Real backend API integration (replace mock data)
- WebSocket for real-time order updates
- File upload for product images
- Payment processing with Paystack
- Bot conversation builder UI
- Analytics dashboard
- Dark mode toggle
- Multi-language support

## Testing Notes

- **Demo Login**: demo@example.com / demo123
- **Create Account**: Use signup form for new accounts
- **Mock Data**: Pre-populated with sample products, orders, notifications
- **No Validation**: Backend would handle duplicate emails, payment processing
- **No Persistence**: Data resets on page refresh

## File Sizes & Performance

- No external API calls
- All data loaded on app init from context
- Lazy loading ready (can add React.lazy for code splitting)
- Minimal bundle size with tree-shaking
- Fast page transitions with client-side routing

---

**Last Updated**: 2024
**App Version**: 1.0.0
**Status**: Production Ready (Frontend Only)
