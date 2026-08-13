import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://procureflow-enterprise-vendor-management-e2a6.onrender.com//api/invoices';

function Invoices() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const res = await axios.get(API_URL);
      setInvoices(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const markPaid = async (id) => {
    try {
      await axios.put(`${API_URL}/${id}/status`, {
        status: 'Paid',
      });

      fetchInvoices();

    } catch (error) {
      console.error(error);
      alert('Failed to update invoice');
    }
  };

  return (
    <div className='min-h-screen bg-slate-100 p-8'>

      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-slate-900'>
          Invoice Management
        </h1>

        <p className='text-slate-600 mt-1'>
          Manage generated invoices and payment status.
        </p>
      </div>

      <div className='bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden'>

        <table className='w-full'>

          <thead className='bg-slate-50'>
            <tr className='text-left text-slate-600'>
              <th className='px-6 py-4'>Invoice No</th>
              <th className='px-6 py-4'>PO Number</th>
              <th className='px-6 py-4'>Vendor</th>
              <th className='px-6 py-4'>Amount</th>
              <th className='px-6 py-4'>Status</th>
              <th className='px-6 py-4 text-center'>Action</th>
            </tr>
          </thead>

          <tbody>

            {invoices.length === 0 ? (
              <tr>
                <td
                  colSpan='6'
                  className='py-10 text-center text-slate-500'
                >
                  No invoices found.
                </td>
              </tr>
            ) : (
              invoices.map((invoice) => (
                <tr
                  key={invoice._id}
                  className='border-t border-slate-200'
                >
                  <td className='px-6 py-4 font-medium'>
                    {invoice.invoiceNumber}
                  </td>

                  <td className='px-6 py-4'>
                    {invoice.purchaseOrder?.poNumber}
                  </td>

                  <td className='px-6 py-4'>
                    {invoice.vendor?.company}
                  </td>

                  <td className='px-6 py-4'>
                    ₹{invoice.amount?.toLocaleString()}
                  </td>

                  <td className='px-6 py-4'>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        invoice.status === 'Paid'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </td>

                  <td className='px-6 py-4 text-center'>

                    {invoice.status === 'Pending' ? (
                      <button
                        onClick={() => markPaid(invoice._id)}
                        className='px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700'
                      >
                        Mark Paid
                      </button>
                    ) : (
                      <span className='text-green-600 font-medium'>
                        Paid
                      </span>
                    )}

                  </td>
                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Invoices;