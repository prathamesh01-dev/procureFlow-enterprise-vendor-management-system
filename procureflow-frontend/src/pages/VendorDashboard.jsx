import { useState } from "react";
import axios from "axios";

function VendorDashboard() {
  const [showQuotationForm, setShowQuotationForm] = useState(false);

  const [formData, setFormData] = useState({
    product: "",
    quantity: "",
    unitPrice: "",
    deliveryDays: "",
    validUntil: "",
    notes: "",
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
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      alert("Vendor session not found. Please login again.");
      return;
    }

    const quotationData = {
      vendorId: storedUser.id,
      vendorName: storedUser.name,
      companyName: storedUser.companyName,

      product: formData.product,
      quantity: Number(formData.quantity),
      unitPrice: Number(formData.unitPrice),
      deliveryDays: Number(formData.deliveryDays),
      validUntil: formData.validUntil,
      notes: formData.notes,
    };

    console.log("QUOTATION DATA:", quotationData);

    await axios.post(
      "http://localhost:5000/api/quotations",
      quotationData
    );

    alert("Quotation submitted successfully!");

    setFormData({
      product: "",
      quantity: "",
      unitPrice: "",
      deliveryDays: "",
      validUntil: "",
      notes: "",
    });

    setShowQuotationForm(false);

  } catch (error) {
    console.error("QUOTATION SUBMIT ERROR:", error);

    alert(
      error.response?.data?.message ||
      "Failed to submit quotation"
    );
  }
};

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Vendor Dashboard
            </h1>

            <p className="mt-2 text-slate-600">
              Welcome to your ProcureFlow vendor workspace.
            </p>
          </div>

          <button
            onClick={() => setShowQuotationForm(true)}
            className="bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            + Submit Quotation
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <p className="text-sm text-slate-500">
              Account Status
            </p>

            <h2 className="mt-2 text-2xl font-bold text-green-600">
              Approved
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <p className="text-sm text-slate-500">
              Quotations
            </p>

            <h2 className="mt-2 text-2xl font-bold text-slate-900">
              0
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <p className="text-sm text-slate-500">
              Purchase Orders
            </p>

            <h2 className="mt-2 text-2xl font-bold text-slate-900">
              0
            </h2>
          </div>

        </div>

        {/* Quotation Section */}
        <div className="mt-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

          <h2 className="text-xl font-bold text-slate-900">
            Quotation Management
          </h2>

          <p className="text-slate-500 mt-1">
            Submit and manage your quotations for procurement requirements.
          </p>

          <div className="mt-6 border border-dashed border-slate-300 rounded-xl p-10 text-center">
            <p className="text-slate-500">
              No quotations submitted yet.
            </p>

            <button
              onClick={() => setShowQuotationForm(true)}
              className="mt-4 text-blue-600 font-semibold hover:underline"
            >
              Submit your first quotation →
            </button>
          </div>

        </div>

        {/* Quotation Modal */}
        {showQuotationForm && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">

            <div className="bg-white rounded-3xl p-8 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">

              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Submit Quotation
                  </h2>

                  <p className="text-slate-500 mt-1">
                    Enter your quotation details below.
                  </p>
                </div>

                <button
                  onClick={() => setShowQuotationForm(false)}
                  className="text-slate-500 text-2xl hover:text-slate-900"
                >
                  ×
                </button>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* Product */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Product / Service
                  </label>

                  <input
                    type="text"
                    name="product"
                    value={formData.product}
                    onChange={handleChange}
                    placeholder="Enter product or service"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Quantity + Unit Price */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Quantity
                    </label>

                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      placeholder="e.g. 100"
                      min="1"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Unit Price (₹)
                    </label>

                    <input
                      type="number"
                      name="unitPrice"
                      value={formData.unitPrice}
                      onChange={handleChange}
                      placeholder="e.g. 500"
                      min="0"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                </div>

                {/* Delivery + Validity */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Delivery Time (Days)
                    </label>

                    <input
                      type="number"
                      name="deliveryDays"
                      value={formData.deliveryDays}
                      onChange={handleChange}
                      placeholder="e.g. 15"
                      min="1"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Quotation Valid Until
                    </label>

                    <input
                      type="date"
                      name="validUntil"
                      value={formData.validUntil}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Additional Notes
                  </label>

                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Add any additional information..."
                    rows="4"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 pt-3">

                  <button
                    type="button"
                    onClick={() => setShowQuotationForm(false)}
                    className="px-5 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
                  >
                    Submit Quotation
                  </button>

                </div>

              </form>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default VendorDashboard;