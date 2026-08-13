import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import VendorManagement from './pages/VendorManagement';
import PurchaseOrders from './pages/PurchaseOrders';
import Procurement from './pages/Procurement';
import Invoices from './pages/Invoices';
import Payments from './pages/Payments';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import DashboardLayout from './layouts/DashboardLayout';
import VendorDashboard from './pages/VendorDashboard';
import Quotations from './pages/Quotations';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Pages */}
        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Vendor Pages */}
        <Route
          path="/vendor-dashboard"
          element={<VendorDashboard />}
        />

        {/* Admin Pages */}
        <Route element={<DashboardLayout />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/vendors"
            element={<VendorManagement />}
          />

          <Route
            path="/quotations"
            element={<Quotations />}
          />

          <Route
            path="/procurement"
            element={<Procurement />}
          />

          <Route
            path="/purchase-orders"
            element={<PurchaseOrders />}
          />

          <Route
            path="/invoices"
            element={<Invoices />}
          />

          <Route
            path="/payments"
            element={<Payments />}
          />

          <Route
            path="/reports"
            element={<Reports />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;