import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/purchase-orders';

function PurchaseOrders() {
  const [orders, setOrders] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    poNumber: '',
    vendor: '',
    item: '',
    quantity: '',
    unitPrice: '',
  });

  useEffect(() => {
    fetchOrders();
    fetchVendors();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(API_URL);
      setOrders(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchVendors = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/vendors');
      const approved = res.data.filter((v) => v.status === 'Approved');
      setVendors(approved);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateOrder = async () => {
    try {
      const totalAmount =
        Number(formData.quantity) * Number(formData.unitPrice);

      await axios.post(API_URL, {
        poNumber: formData.poNumber,
        vendor: formData.vendor,
        item: formData.item,
        quantity: Number(formData.quantity),
        unitPrice: Number(formData.unitPrice),
        totalAmount,
      });

      fetchOrders();

      setFormData({
        poNumber: '',
        vendor: '',
        item: '',
        quantity: '',
        unitPrice: '',
      });

      setShowModal(false);
    } catch (error) {
      console.error(error);
      alert('Failed to create purchase order');
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/purchase-orders/${id}/status`,
        { status }
      );

      fetchOrders();
    } catch (error) {
      console.error(error);
      alert('Failed to update purchase order status');
    }
  };

  const generateInvoice = async (order) => {
    try {
      await axios.post('http://localhost:5000/api/invoices', {
        invoiceNumber: `INV-${Date.now()}`,
        purchaseOrder: order._id,
        vendor: order.vendor?._id,
        amount: order.totalAmount,
      });

      alert('Invoice generated successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to generate invoice');
    }
  };

  return (
    <div className='min-h-screen bg-slate-100 p-8'>
      <div className='flex items-center justify-between mb-8'>
        <div>
          <h1 className='text-3xl font-bold text-slate-900'>
            Purchase Orders
          </h1>

          <p className='text-slate-600 mt-1'>
            Manage procurement purchase orders.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className='bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-700 transition'
        >
          Create Purchase Order
        </button>
      </div>

      <div className='bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden'>
        <table className='w-full'>
          <thead className='bg-slate-50'>
            <tr className='text-left text-slate-600'>
              <th className='px-6 py-4'>PO Number</th>
              <th className='px-6 py-4'>Vendor</th>
              <th className='px-6 py-4'>Item</th>
              <th className='px-6 py-4'>Quantity</th>
              <th className='px-6 py-4'>Total Amount</th>
              <th className='px-6 py-4'>Status</th>
              <th className='px-6 py-4 text-center'>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td
                  colSpan='7'
                  className='text-center py-10 text-slate-500'
                >
                  No purchase orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className='border-t border-slate-200'
                >
                  <td className='px-6 py-4 font-medium'>
                    {order.poNumber}
                  </td>

                  <td className='px-6 py-4'>
                    {order.vendor?.company || order.vendor?.companyName || '-'}
                  </td>

                  <td className='px-6 py-4'>{order.item}</td>

                  <td className='px-6 py-4'>{order.quantity}</td>

                  <td className='px-6 py-4'>
                    ₹{order.totalAmount?.toLocaleString()}
                  </td>

                  <td className='px-6 py-4'>{order.status}</td>

                  <td className='px-6 py-4'>
                    <div className='flex items-center justify-center gap-2 flex-wrap'>
                      <button
                        onClick={() =>
                          updateOrderStatus(order._id, 'Approved')
                        }
                        className='px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700'
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          updateOrderStatus(order._id, 'Delivered')
                        }
                        className='px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700'
                      >
                        Delivered
                      </button>

                      <button
                        onClick={() =>
                          updateOrderStatus(order._id, 'Cancelled')
                        }
                        className='px-3 py-1 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700'
                      >
                        Cancel
                      </button>

                      {order.status === 'Approved' && (
                        <button
                          onClick={() => generateInvoice(order)}
                          className='px-3 py-1 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700'
                        >
                          Generate Invoice
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
          <div className='bg-white rounded-3xl p-8 w-full max-w-xl shadow-2xl'>
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-2xl font-bold text-slate-900'>
                Create Purchase Order
              </h2>

              <button
                onClick={() => setShowModal(false)}
                className='text-slate-500 text-2xl'
              >
                ×
              </button>
            </div>

            <div className='space-y-4'>
              <input
                name='poNumber'
                value={formData.poNumber}
                onChange={handleChange}
                placeholder='PO Number (e.g. PO-1001)'
                className='w-full border border-slate-300 rounded-xl px-4 py-3'
              />

              <select
                name='vendor'
                value={formData.vendor}
                onChange={handleChange}
                className='w-full border border-slate-300 rounded-xl px-4 py-3'
              >
                <option value=''>Select Vendor</option>

                {vendors.map((vendor) => (
                  <option
                    key={vendor._id}
                    value={vendor._id}
                  >
                    {vendor.company}
                  </option>
                ))}
              </select>

              <input
                name='item'
                value={formData.item}
                onChange={handleChange}
                placeholder='Item Name'
                className='w-full border border-slate-300 rounded-xl px-4 py-3'
              />

              <div className='grid grid-cols-2 gap-4'>
                <input
                  type='number'
                  name='quantity'
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder='Quantity'
                  className='w-full border border-slate-300 rounded-xl px-4 py-3'
                />

                <input
                  type='number'
                  name='unitPrice'
                  value={formData.unitPrice}
                  onChange={handleChange}
                  placeholder='Unit Price'
                  className='w-full border border-slate-300 rounded-xl px-4 py-3'
                />
              </div>

              <div className='bg-slate-100 rounded-xl px-4 py-3'>
                <p className='text-slate-600'>Total Amount</p>

                <p className='text-2xl font-bold text-slate-900'>
                  ₹
                  {(
                    Number(formData.quantity || 0) *
                    Number(formData.unitPrice || 0)
                  ).toLocaleString()}
                </p>
              </div>
            </div>

            <div className='flex justify-end gap-3 mt-6'>
              <button
                onClick={() => setShowModal(false)}
                className='px-5 py-3 rounded-xl border border-slate-300 text-slate-700'
              >
                Cancel
              </button>

              <button
                onClick={handleCreateOrder}
                className='px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold'
              >
                Create Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PurchaseOrders;