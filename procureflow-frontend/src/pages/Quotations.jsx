import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://procureflow-enterprise-vendor-management-e2a6.onrender.com//api/quotations";

function Quotations() {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [comparison, setComparison] = useState(null);
  const [comparing, setComparing] = useState(false);
  const [selecting, setSelecting] = useState(false);

  useEffect(() => {
    fetchQuotations();
  }, []);

  // =========================
  // FETCH QUOTATIONS
  // =========================

  const fetchQuotations = async () => {
    try {
      const res = await axios.get(API_URL);
      setQuotations(res.data);
    } catch (error) {
      console.error("FETCH QUOTATIONS ERROR:", error);
      alert("Failed to load quotations");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // COMPARE QUOTATIONS
  // =========================

  const compareQuotations = async (product) => {
    try {
      setComparing(true);

      const res = await axios.get(
        `${API_URL}/compare/${encodeURIComponent(product)}`
      );

      setComparison(res.data);
    } catch (error) {
      console.error("COMPARE ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Failed to compare quotations"
      );
    } finally {
      setComparing(false);
    }
  };
  const generatePurchaseOrder = async (vendor) => {
  try {
    await axios.post(
      "https://procureflow-enterprise-vendor-management-e2a6.onrender.com//api/purchase-orders/generate-from-quotation",
      {
        vendorId: vendor.vendorId,
        vendorName: vendor.vendorName,
        companyName: vendor.companyName,
        product: vendor.product,
        quantity: vendor.quantity,
        unitPrice: vendor.unitPrice,
        totalAmount: vendor.totalAmount,
        deliveryDays: vendor.deliveryDays,
      }
    );

    alert("Purchase Order generated successfully!");

    // Optional: refresh quotations
    fetchQuotations();

  } catch (error) {
    console.error("PO GENERATION ERROR:", error);

    alert(
      error.response?.data?.message ||
      "Failed to generate Purchase Order"
    );
  }
};

  // =========================
  // SELECT VENDOR
  // =========================

  const selectVendor = async (quotationId, companyName) => {
    const confirmed = window.confirm(
      `Are you sure you want to select ${companyName} as the vendor?\n\nAll other active quotations for this product will be rejected.`
    );

    if (!confirmed) {
      return;
    }

    try {
      setSelecting(true);

      const res = await axios.put(
        `${API_URL}/select/${quotationId}`
      );

      alert(
        res.data.message || "Vendor selected successfully!"
      );

      // Refresh quotations
      await fetchQuotations();

      // Close comparison
      setComparison(null);

    } catch (error) {
      console.error("SELECT VENDOR ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Failed to select vendor"
      );
    } finally {
      setSelecting(false);
    }
  };

  // =========================
  // CLOSE COMPARISON
  // =========================

  const closeComparison = () => {
    setComparison(null);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto">

        {/* =========================
            HEADER
        ========================= */}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Quotations
          </h1>

          <p className="mt-2 text-slate-600">
            Review and compare vendor quotations.
          </p>
        </div>

        {/* =========================
            STATS
        ========================= */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          {/* Total */}

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <p className="text-sm text-slate-500">
              Total Quotations
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              {quotations.length}
            </h2>
          </div>

          {/* Under Review */}

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <p className="text-sm text-slate-500">
              Under Review
            </p>

            <h2 className="mt-2 text-3xl font-bold text-yellow-600">
              {
                quotations.filter(
                  (q) =>
                    q.status === "Submitted" ||
                    q.status === "Under Review"
                ).length
              }
            </h2>
          </div>

          {/* Selected */}

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <p className="text-sm text-slate-500">
              Selected
            </p>

            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {
                quotations.filter(
                  (q) => q.status === "Selected"
                ).length
              }
            </h2>
          </div>

        </div>

        {/* =========================
            QUOTATION TABLE
        ========================= */}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

          {loading ? (
            <div className="p-10 text-center text-slate-500">
              Loading quotations...
            </div>
          ) : quotations.length === 0 ? (
            <div className="p-10 text-center text-slate-500">
              No quotations submitted yet.
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-slate-50">

                  <tr className="text-left text-slate-600">

                    <th className="px-6 py-4">
                      Company
                    </th>

                    <th className="px-6 py-4">
                      Product
                    </th>

                    <th className="px-6 py-4">
                      Quantity
                    </th>

                    <th className="px-6 py-4">
                      Unit Price
                    </th>

                    <th className="px-6 py-4">
                      Total Amount
                    </th>

                    <th className="px-6 py-4">
                      Delivery
                    </th>

                    <th className="px-6 py-4">
                      Status
                    </th>

                    <th className="px-6 py-4">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {quotations.map((quotation) => (

                    <tr
                      key={quotation._id}
                      className="border-t border-slate-200 hover:bg-slate-50 transition"
                    >

                      {/* COMPANY */}

                      <td className="px-6 py-4">

                        <div>

                          <p className="font-semibold text-slate-900">
                            {quotation.companyName}
                          </p>

                          <p className="text-sm text-slate-500">
                            {quotation.vendorName}
                          </p>

                        </div>

                      </td>

                      {/* PRODUCT */}

                      <td className="px-6 py-4 font-medium text-slate-800">
                        {quotation.product}
                      </td>

                      {/* QUANTITY */}

                      <td className="px-6 py-4 text-slate-700">
                        {quotation.quantity}
                      </td>

                      {/* UNIT PRICE */}

                      <td className="px-6 py-4 text-slate-700">
                        ₹
                        {Number(
                          quotation.unitPrice
                        ).toLocaleString()}
                      </td>

                      {/* TOTAL */}

                      <td className="px-6 py-4 font-semibold text-slate-900">
                        ₹
                        {Number(
                          quotation.totalAmount
                        ).toLocaleString()}
                      </td>

                      {/* DELIVERY */}

                      <td className="px-6 py-4 text-slate-700">
                        {quotation.deliveryDays} days
                      </td>

                      {/* STATUS */}

                      <td className="px-6 py-4">

                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            quotation.status === "Selected"
                              ? "bg-green-100 text-green-700"
                              : quotation.status === "Rejected"
                              ? "bg-red-100 text-red-700"
                              : quotation.status === "Under Review"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {quotation.status}
                        </span>

                      </td>

                      {/* ACTION */}

                      <td className="px-6 py-4">

                        <div className="flex gap-2">

                          {/* Compare */}

                          {quotation.status !== "Rejected" && (
                              <button
                                onClick={() =>
                                  compareQuotations(
                                    quotation.product
                                  )
                                }
                                disabled={comparing}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                              >
                                {comparing
                                  ? "Comparing..."
                                  : "Compare"}
                              </button>
                            )}

                          {/* Select */}

                          {quotation.status !== "Rejected" && (
                            <button
                              onClick={() =>
                                selectVendor(
                                  quotation._id,
                                  quotation.companyName
                                )
                              }
                              disabled={
                                selecting ||
                                quotation.status === "Selected"
                              }
                              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                                quotation.status === "Selected"
                                  ? "bg-green-100 text-green-700 cursor-not-allowed"
                                  : "bg-green-600 text-white hover:bg-green-700"
                              }`}
                            >
                              {quotation.status === "Selected"
                                ? "Selected"
                                : selecting
                                ? "Selecting..."
                                : "Select Vendor"}
                            </button>
                          )}

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>
          )}

        </div>

        {/* =========================
            COMPARISON RESULT
        ========================= */}

        {comparison && (
          <div className="mt-8 bg-white rounded-2xl border border-blue-200 shadow-sm p-6">

            {/* HEADER */}

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-2xl font-bold text-slate-900">
                  Best Vendor Recommendation
                </h2>

                <p className="text-slate-500 mt-1">
                  Product: {comparison.product}
                </p>

              </div>

              <button
                onClick={closeComparison}
                className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100"
              >
                Close
              </button>

            </div>

            {/* RECOMMENDED VENDOR */}

            <div className="mt-6 bg-green-50 border border-green-200 rounded-2xl p-6">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-green-700 font-semibold">
                    ⭐ RECOMMENDED VENDOR
                  </p>

                  <h3 className="text-2xl font-bold text-slate-900 mt-1">
                    {comparison.recommendedVendor.companyName}
                  </h3>

                  <p className="text-slate-600 mt-1">
                    {comparison.recommendedVendor.vendorName}
                  </p>

                </div>

                <div className="text-right">

                  <p className="text-sm text-slate-500">
                    Overall Score
                  </p>

                  <p className="text-3xl font-bold text-green-600">
                    {comparison.recommendedVendor.score}
                  </p>

                  <p className="text-xs text-slate-500">
                    / 100
                  </p>

                </div>

              </div>

              {/* RECOMMENDED DETAILS */}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

                <div className="bg-white rounded-xl p-4 border border-green-100">

                  <p className="text-sm text-slate-500">
                    Total Amount
                  </p>

                  <p className="text-xl font-bold text-slate-900 mt-1">
                    ₹
                    {Number(
                      comparison.recommendedVendor.totalAmount
                    ).toLocaleString()}
                  </p>

                </div>

                <div className="bg-white rounded-xl p-4 border border-green-100">

                  <p className="text-sm text-slate-500">
                    Delivery Time
                  </p>

                  <p className="text-xl font-bold text-slate-900 mt-1">
                    {comparison.recommendedVendor.deliveryDays} days
                  </p>

                </div>

                <div className="bg-white rounded-xl p-4 border border-green-100">

                  <p className="text-sm text-slate-500">
                    Unit Price
                  </p>

                  <p className="text-xl font-bold text-slate-900 mt-1">
                    ₹
                    {Number(
                      comparison.recommendedVendor.unitPrice
                    ).toLocaleString()}
                  </p>

                </div>

              </div>
                    <div className="mt-6">
  <button
    onClick={() =>
      generatePurchaseOrder(comparison.recommendedVendor)
    }
    className="px-5 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
  >
    Select Vendor & Generate PO
  </button>
</div>
              {/* SELECT RECOMMENDED VENDOR */}

              <div className="mt-6 flex justify-end">

                <button
                  onClick={() =>
                    selectVendor(
                      comparison.recommendedVendor._id,
                      comparison.recommendedVendor.companyName
                    )
                  }
                  disabled={selecting}
                  className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition disabled:opacity-50"
                >
                  {selecting
                    ? "Selecting Vendor..."
                    : "✓ Select Recommended Vendor"}
                </button>

              </div>

            </div>

            {/* COMPARISON RESULTS */}

            <div className="mt-8">

              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Vendor Comparison
              </h3>

              <div className="space-y-3">

                {comparison.quotations.map((q, index) => (

                  <div
                    key={q._id}
                    className={`flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 rounded-xl border ${
                      q._id ===
                      comparison.recommendedVendor._id
                        ? "bg-green-50 border-green-300"
                        : "bg-slate-50 border-slate-200"
                    }`}
                  >

                    <div>

                      <div className="flex items-center gap-3">

                        <span className="font-bold text-slate-500">
                          #{index + 1}
                        </span>

                        <p className="font-semibold text-slate-900">
                          {q.companyName}
                        </p>

                        {q._id ===
                          comparison.recommendedVendor._id && (
                          <span className="px-2 py-1 bg-green-600 text-white text-xs rounded-full">
                            Recommended
                          </span>
                        )}

                      </div>

                      <p className="text-sm text-slate-500 mt-1">
                        Vendor: {q.vendorName}
                      </p>

                    </div>

                    <div className="grid grid-cols-3 gap-6 text-sm">

                      <div>

                        <p className="text-slate-500">
                          Total
                        </p>

                        <p className="font-bold text-slate-900">
                          ₹
                          {Number(
                            q.totalAmount
                          ).toLocaleString()}
                        </p>

                      </div>

                      <div>

                        <p className="text-slate-500">
                          Delivery
                        </p>

                        <p className="font-bold text-slate-900">
                          {q.deliveryDays} days
                        </p>

                      </div>

                      <div>

                        <p className="text-slate-500">
                          Score
                        </p>

                        <p
                          className={`font-bold ${
                            q._id ===
                            comparison.recommendedVendor._id
                              ? "text-green-600"
                              : "text-blue-600"
                          }`}
                        >
                          {q.score}
                        </p>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            </div>

            {/* SCORING INFO */}

            <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl">

              <p className="text-sm text-blue-800">
                <strong>How the recommendation works:</strong>{" "}
                The system considers quotation price and delivery
                time. Price carries 60% weight and delivery time
                carries 40% weight.
              </p>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default Quotations;