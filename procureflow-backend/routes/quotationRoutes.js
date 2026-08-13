const express = require("express");
const Quotation = require("../models/Quotation");

const router = express.Router();

// =====================================================
// SUBMIT QUOTATION
// =====================================================
router.post("/", async (req, res) => {
  try {
    const {
      vendorId,
      vendorName,
      companyName,
      product,
      quantity,
      unitPrice,
      deliveryDays,
      validUntil,
      notes,
    } = req.body;

    if (
      !vendorId ||
      !vendorName ||
      !companyName ||
      !product ||
      !quantity ||
      !unitPrice ||
      !deliveryDays ||
      !validUntil
    ) {
      return res.status(400).json({
        message: "Please fill all required quotation fields",
      });
    }

    const totalAmount =
      Number(quantity) * Number(unitPrice);

    const quotation = await Quotation.create({
      vendorId,
      vendorName,
      companyName,
      product,
      quantity,
      unitPrice,
      totalAmount,
      deliveryDays,
      validUntil,
      notes: notes || "",
    });

    res.status(201).json({
      message: "Quotation submitted successfully",
      quotation,
    });

  } catch (error) {
    console.error("QUOTATION ERROR:", error);

    res.status(500).json({
      message: "Server error while submitting quotation",
    });
  }
});


// =====================================================
// GET ALL QUOTATIONS
// =====================================================
router.get("/", async (req, res) => {
  try {
    const quotations = await Quotation.find()
      .sort({ createdAt: -1 });

    res.json(quotations);

  } catch (error) {
    console.error("GET QUOTATIONS ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch quotations",
    });
  }
});


// =====================================================
// COMPARE QUOTATIONS
// =====================================================
// =====================================================
// COMPARE QUOTATIONS
// =====================================================
router.get("/compare/:product", async (req, res) => {
  try {
    const product = req.params.product;

    const quotations = await Quotation.find({
      product: {
        $regex: `^${product.trim()}$`,
        $options: "i",
      },
      status: {
        $in: ["Submitted", "Under Review", "Selected"],
      },
    });

    if (quotations.length === 0) {
      return res.status(404).json({
        message: "No quotations found for this product",
      });
    }

    // Lowest price
    const lowestPrice = Math.min(
      ...quotations.map((q) => q.totalAmount)
    );

    // Fastest delivery
    const fastestDelivery = Math.min(
      ...quotations.map((q) => q.deliveryDays)
    );

    // Calculate score
    const scoredQuotations = quotations.map((q) => {
      const priceScore =
        (lowestPrice / q.totalAmount) * 60;

      const deliveryScore =
        (fastestDelivery / q.deliveryDays) * 40;

      const score = priceScore + deliveryScore;

      return {
        ...q.toObject(),
        score: Number(score.toFixed(2)),
      };
    });

    // Highest score first
    scoredQuotations.sort(
      (a, b) => b.score - a.score
    );

    res.json({
      product,
      recommendedVendor: scoredQuotations[0],
      quotations: scoredQuotations,
    });
  } catch (error) {
    console.error("COMPARE QUOTATIONS ERROR:", error);

    res.status(500).json({
      message: "Failed to compare quotations",
    });
  }
});


// =====================================================
// SELECT VENDOR
// =====================================================
router.put("/select/:id", async (req, res) => {
  try {
    const quotationId = req.params.id;

    // Find quotation
    const selectedQuotation =
      await Quotation.findById(quotationId);

    if (!selectedQuotation) {
      return res.status(404).json({
        message: "Quotation not found",
      });
    }

    // Prevent selecting an already selected quotation
    if (selectedQuotation.status === "Selected") {
      return res.status(400).json({
        message: "This vendor is already selected",
      });
    }

    // Reject other quotations
    await Quotation.updateMany(
      {
        product: selectedQuotation.product,
        _id: { $ne: selectedQuotation._id },
        status: {
  $in: ["Submitted", "Under Review", "Selected"],
},
      },
      {
        $set: {
          status: "Rejected",
        },
      }
    );

    // Select current quotation
    selectedQuotation.status = "Selected";

    await selectedQuotation.save();

    res.json({
      message: "Vendor selected successfully",
      quotation: selectedQuotation,
    });

  } catch (error) {
    console.error("SELECT VENDOR ERROR:", error);

    res.status(500).json({
      message: "Failed to select vendor",
    });
  }
});


module.exports = router;