const mongoose = require("mongoose");

const quotationSchema = new mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    vendorName: {
      type: String,
      required: true,
    },

    companyName: {
      type: String,
      required: true,
    },

    product: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    unitPrice: {
      type: Number,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    deliveryDays: {
      type: Number,
      required: true,
    },

    validUntil: {
      type: Date,
      required: true,
    },

    notes: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "Submitted",
        "Under Review",
        "Selected",
        "Rejected",
      ],
      default: "Submitted",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Quotation", quotationSchema);