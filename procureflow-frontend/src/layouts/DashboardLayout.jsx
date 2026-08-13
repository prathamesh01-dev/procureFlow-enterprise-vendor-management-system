import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  FileText,
  Receipt,
  CreditCard,
  BarChart3,
  Settings,
} from 'lucide-react';

import { Link, Outlet, useLocation } from 'react-router-dom';

function SidebarItem({ icon: Icon, label, to }) {
  const location = useLocation();

  const active = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
        active
          ? 'bg-blue-600 text-white'
          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
      }`}
    >
      <Icon className='w-5 h-5' />

      <span className='font-medium'>{label}</span>
    </Link>
  );
}

function DashboardLayout() {
  return (
    <div className='min-h-screen bg-slate-100 flex'>

      <aside className='w-64 bg-slate-900 text-white p-6'>

        <h1 className='text-2xl font-bold mb-10'>
          ProcureFlow
        </h1>

        <nav className='space-y-3'>

          <SidebarItem
            icon={LayoutDashboard}
            label='Dashboard'
            to='/dashboard'
          />

          <SidebarItem
            icon={Users}
            label='Vendors'
            to='/vendors'
          />

          <SidebarItem
            icon={ShoppingCart}
            label='Procurement'
            to='/procurement'
          />
          <SidebarItem
  icon={FileText}
  label='Quotations'
  to='/quotations'
/>

          <SidebarItem
            icon={FileText}
            label='Purchase Orders'
            to='/purchase-orders'
          />

          <SidebarItem
            icon={Receipt}
            label='Invoices'
            to='/invoices'
          />

          <SidebarItem
            icon={CreditCard}
            label='Payments'
            to='/payments'
          />

          <SidebarItem
            icon={BarChart3}
            label='Reports'
            to='/reports'
          />

          <SidebarItem
            icon={Settings}
            label='Settings'
            to='/settings'
          />

        </nav>

      </aside>

      <div className='flex-1'>
        <Outlet />
      </div>

    </div>
  );
}

export default DashboardLayout;