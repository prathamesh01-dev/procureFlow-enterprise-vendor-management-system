import { useEffect, useState } from 'react';
import axios from 'axios';

function Reports() {
  const [vendorStats, setVendorStats] = useState({
    totalVendors: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
  });

  const [orders, setOrders] = useState([]);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const vendorRes = await axios.get(
        'https://procureflow-enterprise-vendor-management-e2a6.onrender.com//api/vendors/stats'
      );
      const orderRes = await axios.get(
        'https://procureflow-enterprise-vendor-management-e2a6.onrender.com//api/purchase-orders'
      );
      const invoiceRes = await axios.get(
        'https://procureflow-enterprise-vendor-management-e2a6.onrender.com//api/invoices'
      );

      setVendorStats(vendorRes.data);
      setOrders(orderRes.data);
      setInvoices(invoiceRes.data);

    } catch (error) {
      console.error(error);
    }
  };

  const totalPOAmount = orders.reduce(
    (sum, order) => sum + (order.totalAmount || 0),
    0
  );

  const totalInvoiceAmount = invoices.reduce(
    (sum, invoice) => sum + (invoice.amount || 0),
    0
  );

  return (
    <div className='min-h-screen bg-slate-100 p-8'>

      <h1 className='text-3xl font-bold text-slate-900 mb-8'>
        Reports & Analytics
      </h1>

      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6'>

        <div className='bg-white rounded-2xl p-6 shadow-sm'>
          <p className='text-slate-500'>Total Vendors</p>
          <h2 className='text-3xl font-bold mt-2'>
            {vendorStats.totalVendors}
          </h2>
        </div>

        <div className='bg-white rounded-2xl p-6 shadow-sm'>
          <p className='text-slate-500'>Approved Vendors</p>
          <h2 className='text-3xl font-bold mt-2 text-green-600'>
            {vendorStats.approved}
          </h2>
        </div>

        <div className='bg-white rounded-2xl p-6 shadow-sm'>
          <p className='text-slate-500'>Purchase Orders</p>
          <h2 className='text-3xl font-bold mt-2'>
            {orders.length}
          </h2>
        </div>

        <div className='bg-white rounded-2xl p-6 shadow-sm'>
          <p className='text-slate-500'>Invoices</p>
          <h2 className='text-3xl font-bold mt-2'>
            {invoices.length}
          </h2>
        </div>

      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-8'>

        <div className='bg-white rounded-2xl p-6 shadow-sm'>
          <p className='text-slate-500'>Total Purchase Order Value</p>
          <h2 className='text-3xl font-bold mt-2 text-blue-600'>
            ₹{totalPOAmount.toLocaleString()}
          </h2>
        </div>

        <div className='bg-white rounded-2xl p-6 shadow-sm'>
          <p className='text-slate-500'>Total Invoice Value</p>
          <h2 className='text-3xl font-bold mt-2 text-purple-600'>
            ₹{totalInvoiceAmount.toLocaleString()}
          </h2>
        </div>

      </div>

    </div>
  );
}

export default Reports;