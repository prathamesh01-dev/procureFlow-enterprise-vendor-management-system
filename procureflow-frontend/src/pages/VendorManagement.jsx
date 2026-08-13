import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Plus, Filter, Eye, Pencil, Trash2, X } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const API_URL = 'http://localhost:5000/api/vendors';

function VendorManagement() {
  const [vendors, setVendors] = useState([]);
  const [pendingVendorAccounts, setPendingVendorAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
const [showModal, setShowModal] = useState(false);
const [editingVendor, setEditingVendor] = useState(null);
const [showRejectModal, setShowRejectModal] = useState(false);
const [rejectingVendor, setRejectingVendor] = useState(null);
const [rejectionReason, setRejectionReason] = useState('');
const [viewingVendor, setViewingVendor] = useState(null);

const [formData, setFormData] = useState({
  company: '',
  contact: '',
  email: '',
  category: '',
});
useEffect(() => {
  fetchVendors();
  fetchPendingVendorAccounts();
}, []);

const fetchVendors = async () => {
  try {
    const res = await axios.get(API_URL);
    setVendors(res.data);
  } catch (error) {
    console.error(error);
  }
};
const fetchPendingVendorAccounts = async () => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/auth/vendors/pending"
    );

    setPendingVendorAccounts(res.data);
  } catch (error) {
    console.error("PENDING VENDORS ERROR:", error);
  }
};
const approveVendorAccount = async (id) => {
  try {
    await axios.put(
      `http://localhost:5000/api/auth/vendors/${id}/approve`
    );

    alert("Vendor approved successfully!");

    fetchPendingVendorAccounts();
  } catch (error) {
    console.error("APPROVE VENDOR ERROR:", error);

    alert(
      error.response?.data?.message || "Failed to approve vendor"
    );
  }
};
const filteredVendors = vendors.filter((vendor) => {
  const matchesSearch =
    vendor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.category.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesStatus =
    statusFilter === 'All' || vendor.status === statusFilter;

  return matchesSearch && matchesStatus;
});
const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
  const vendorData = {
    company: formData.company,
    contact: formData.contact,
    email: formData.email,
    category: formData.category,
  };

  if (editingVendor) {
    // Edit existing vendor
      console.log(
    "UPDATE URL:",
    `http://localhost:5000/api/vendors/${editingVendor._id}`
  );
    await axios.put(
  `http://localhost:5000/api/vendors/${editingVendor._id}`,
  vendorData
);
  } else {
    // Add new vendor
    await axios.post(API_URL, vendorData);
  }

  // Refresh vendor list
  fetchVendors();

  // Reset form
  setFormData({
    company: '',
    contact: '',
    email: '',
    category: '',
  });

  // Exit edit mode
  setEditingVendor(null);

  // Close modal
  setShowModal(false);
} catch (error) {
  console.error("UPDATE ERROR:", error);

  if (error.response) {
    console.error("STATUS:", error.response.status);
    console.error("DATA:", error.response.data);
    alert(
      `Failed to save vendor: ${
        error.response.data.message || error.response.status
      }`
    );
  } else {
    console.error("MESSAGE:", error.message);
    alert(`Failed to save vendor: ${error.message}`);
  }
}
};
const handleRejectClick = (vendor) => {
  setRejectingVendor(vendor);
  setRejectionReason('');
  setShowRejectModal(true);
};
const updateStatus = async (id, status, rejectionReason = '') => {
  try {
    await axios.put(`http://localhost:5000/api/vendors/${id}/status`, {
      status,
      rejectionReason,
    });

    fetchVendors();
  } catch (error) {
    console.error('STATUS UPDATE ERROR:', error);
    alert('Failed to update status');
  }
};

const handleView = (vendor) => {
  setViewingVendor(vendor);
};

//handle edit pencil
const handleEdit = (vendor) => {
  setEditingVendor(vendor);

  setFormData({
    company: vendor.company,
    contact: vendor.contact,
    email: vendor.email,
    category: vendor.category,
  });

  setShowModal(true);
};

const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    'Are you sure you want to delete this vendor?'
  );

  if (!confirmDelete) return;

  try {
    await axios.delete(`http://localhost:5000/api/vendors/${id}`);
    fetchVendors();
  } catch (error) {
    console.error(error);
    alert('Failed to delete vendor');
  }
};

const updateRating = async (id, rating) => {
  try {
    await axios.put(`http://localhost:5000/api/vendors/${id}/rating`, {
      rating,
    });

    fetchVendors();
  } catch (error) {
    console.error(error);
    alert('Failed to update rating');
  }
};

const exportPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('ProcureFlow Vendor Report', 14, 20);

  doc.setFontSize(11);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 28);

  autoTable(doc, {
    startY: 35,
    head: [['Company', 'Contact', 'Email', 'Category', 'Status']],
    body: filteredVendors.map((vendor) => [
      vendor.company,
      vendor.contact,
      vendor.email,
      vendor.category,
      vendor.status,
    ]),
    styles: {
      fontSize: 10,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [37, 99, 235],
    },
  });

  doc.save('ProcureFlow_Vendor_Report.pdf');
};
  const statusClass = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      {/* Header */}
     <div className="flex items-center justify-between mb-8">
  <div>
    <h1 className="text-3xl font-bold text-slate-900">Vendor Management</h1>
    <p className="text-slate-600 mt-1">
      Manage vendor onboarding, approvals, and performance.
    </p>
  </div>

  <div className="flex items-center gap-3">
    <button
      onClick={exportPDF}
      className="flex items-center gap-2 border border-slate-300 px-5 py-3 rounded-xl font-semibold hover:bg-slate-100 transition"
    >
      Export PDF
    </button>

    <button
      onClick={() => setShowModal(true)}
      className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
    >
      <Plus className="w-5 h-5" />
      Add Vendor
    </button>
  </div>
</div>

{/* Pending Vendor Accounts */}
{pendingVendorAccounts.length > 0 && (
  <div className="bg-white rounded-2xl border border-yellow-200 shadow-sm p-6 mb-6">

    <div className="flex items-center justify-between mb-5">
      <div>
        <h2 className="text-xl font-bold text-slate-900">
          Pending Vendor Approvals
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Review vendor accounts before granting access to ProcureFlow.
        </p>
      </div>

      <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-semibold">
        {pendingVendorAccounts.length} Pending
      </span>
    </div>

    <div className="space-y-3">

      {pendingVendorAccounts.map((vendor) => (
        <div
          key={vendor._id}
          className="flex items-center justify-between border border-slate-200 rounded-xl p-4 hover:bg-slate-50 transition"
        >

          <div>
            <h3 className="font-semibold text-slate-900">
              {vendor.name}
            </h3>

            <p className="text-sm text-slate-500">
              {vendor.companyName || "Company not provided"}
            </p>

            <p className="text-sm text-slate-500">
              {vendor.email}
            </p>
          </div>

          <div className="flex items-center gap-3">

            <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold">
              Pending
            </span>

            <button
  onClick={() => approveVendorAccount(vendor._id)}
  className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
>
  Approve
</button>

            <button
              className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition"
            >
              Reject
            </button>

          </div>

        </div>
      ))}

    </div>
  </div>
)}

      {/* Search + Filter */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-6 flex items-center justify-between">
        <div className="flex items-center bg-slate-100 rounded-xl px-4 py-2 w-96">
          <Search className="w-5 h-5 text-slate-500" />
         <input
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  placeholder="Search vendors by company, email, or category..."
  className="bg-transparent outline-none ml-2 w-full text-slate-700"
/>
        </div>

        <div className="flex items-center gap-2 border border-slate-300 px-4 py-2 rounded-xl bg-white">
  <Filter className="w-4 h-4 text-slate-500" />
  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    className="outline-none bg-transparent text-slate-700"
  >
    <option value="All">All Status</option>
    <option value="Pending">Pending</option>
    <option value="Approved">Approved</option>
    <option value="Rejected">Rejected</option>
  </select>
</div>
      </div>

      {/* Vendor Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr className="text-left text-slate-600">
              <th className="px-6 py-4">Vendor ID</th>
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4">Contact</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Rating</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredVendors.map((vendor) => (
              <tr
                key={vendor.id}
                className="border-t border-slate-200 hover:bg-slate-50 transition"
              >
                <td className="px-6 py-4 font-medium text-slate-900">
                  {vendor.id}
                </td>

                <td className="px-6 py-4">
                  <div>
                    <p className="font-semibold text-slate-900">
                      {vendor.company}
                    </p>
                    <p className="text-sm text-slate-500">
                      {vendor.email}
                    </p>
                  </div>
                </td>

                <td className="px-6 py-4 text-slate-700">
                  {vendor.contact}
                </td>

                <td className="px-6 py-4 text-slate-700">
                  {vendor.category}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${statusClass(
                      vendor.status
                    )}`}
                  >
                    {vendor.status}
                  </span>
                </td>

               <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                   <button
                      key={star}
                      onClick={() => updateRating(vendor._id, star)}
                      className="text-xl"
                      >
                        {star <= vendor.rating ? '⭐' : '☆'}
                  </button>
    ))}
  </div>
</td>

                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
  <button
    onClick={() => updateStatus(vendor._id, 'Approved')}
    className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
  >
    Approve
  </button>

  <button
   onClick={() => handleRejectClick(vendor)}
    className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
  >
    Reject
  </button>

    <button
 onClick={() => handleView(vendor)}
  className="p-2 border border-slate-300 rounded-lg hover:bg-slate-100"
  title="View Vendor"
>
  <Eye className="w-4 h-4 text-slate-700" />
</button>

  <button
    onClick={() => handleEdit(vendor)}
    className="p-2 border border-slate-300 rounded-lg hover:bg-slate-100"
  >
    <Pencil className="w-4 h-4 text-slate-700" />
  </button>

  <button
  onClick={() => handleDelete(vendor._id)}
  className="p-2 border border-red-300 rounded-lg hover:bg-red-50"
>
  <Trash2 className="w-4 h-4 text-red-600" />
</button>
</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl">

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            {editingVendor ? "Edit Vendor" : "Add Vendor"}
          </h2>

          <p className="text-slate-500 mt-1">
            {editingVendor
              ? "Update vendor information"
              : "Add a new vendor to ProcureFlow"}
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setShowModal(false);
            setEditingVendor(null);
            setFormData({
              company: "",
              contact: "",
              email: "",
              category: "",
            });
          }}
        >
          <X className="w-6 h-6 text-slate-500" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Company Name
          </label>

          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Enter company name"
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Contact Person
          </label>

          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Enter contact person"
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="vendor@example.com"
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Category
          </label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">Select category</option>
            <option value="IT Hardware">IT Hardware</option>
            <option value="Software">Software</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Industrial">Industrial</option>
            <option value="Services">Services</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-3">

          <button
            type="button"
            onClick={() => {
              setShowModal(false);
              setEditingVendor(null);
              setFormData({
                company: "",
                contact: "",
                email: "",
                category: "",
              });
            }}
            className="px-5 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
          >
            {editingVendor ? "Update Vendor" : "Add Vendor"}
          </button>

        </div>

      </form>
    </div>
  </div>
)}
      
  {viewingVendor && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl">
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Vendor Details
          </h2>
          <p className="text-slate-500 mt-1">
            Complete vendor information
          </p>
        </div>

        <button onClick={() => setViewingVendor(null)}>
          <X className="w-6 h-6 text-slate-500" />
        </button>
      </div>

      <div className="space-y-4">

        <div>
          <p className="text-sm text-slate-500">Company</p>
          <p className="text-lg font-semibold text-slate-900">
            {viewingVendor.company}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Contact Person</p>
          <p className="text-lg font-semibold text-slate-900">
            {viewingVendor.contact}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Email</p>
          <p className="text-lg font-semibold text-slate-900">
            {viewingVendor.email}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Category</p>
          <p className="text-lg font-semibold text-slate-900">
            {viewingVendor.category}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Status</p>
          <span
            className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${statusClass(
              viewingVendor.status
            )}`}
          >
            {viewingVendor.status}
          </span>
        </div>

        <div>
          <p className="text-sm text-slate-500">Rating</p>
          <p className="text-lg mt-1">
            {"⭐".repeat(viewingVendor.rating || 0)}
            {"☆".repeat(5 - (viewingVendor.rating || 0))}
          </p>
        </div>

      </div>

      <div className="flex justify-end mt-8">
        <button
          onClick={() => setViewingVendor(null)}
          className="px-5 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800"
        >
          Close
        </button>
      </div>

    </div>
  </div>
)}
{showRejectModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl">

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Reject Vendor
          </h2>

          <p className="text-slate-500 mt-1">
            {rejectingVendor?.company}
          </p>
        </div>

        <button onClick={() => setShowRejectModal(false)}>
          <X className="w-6 h-6 text-slate-500" />
        </button>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Reason for Rejection
        </label>

        <textarea
          value={rejectionReason}
          onChange={(e) => setRejectionReason(e.target.value)}
          placeholder="Enter the reason for rejecting this vendor..."
          rows="5"
          className="w-full px-4 py-3 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-red-500 resize-none"
        />
      </div>

      <div className="flex justify-end gap-3 mt-6">

        <button
          type="button"
          onClick={() => setShowRejectModal(false)}
          className="px-5 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          type="button"
          disabled={!rejectionReason.trim()}
          onClick={() => {
            updateStatus(
              rejectingVendor._id,
              'Rejected',
              rejectionReason
            );

            setShowRejectModal(false);
          }}
          className="px-5 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Confirm Rejection
        </button>

      </div>

    </div>
  </div>
)}
    </div>
  );
}

export default VendorManagement;