const express = require('express');
const router = express.Router();

const PurchaseOrder = require('../models/PurchaseOrder');

// GET all purchase orders
router.get('/', async (req, res) => {
  try {
    const orders = await PurchaseOrder.find()
      .populate('vendor', 'company email')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create purchase order
router.post('/', async (req, res) => {
  try {
    const order = new PurchaseOrder(req.body);
    const savedOrder = await order.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update purchase order
router.put('/:id', async (req, res) => {
  try {
    const updatedOrder = await PurchaseOrder.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Purchase order not found' });
    }

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// UPDATE purchase order status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;

    const updatedOrder = await PurchaseOrder.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        message: 'Purchase order not found',
      });
    }

    res.json(updatedOrder);

  } catch (error) {
    console.error('Purchase order status update error:', error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// DELETE purchase order
router.delete('/:id', async (req, res) => {
  try {
    await PurchaseOrder.findByIdAndDelete(req.params.id);

    res.json({ message: 'Purchase order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// AUTO GENERATE PURCHASE ORDER FROM QUOTATION
router.post("/generate-from-quotation", async (req, res) => {
  try {
    const {
      vendorId,
      vendorName,
      companyName,
      product,
      quantity,
      unitPrice,
      totalAmount,
      deliveryDays,
    } = req.body;

    if (
      !vendorId ||
      !vendorName ||
      !companyName ||
      !product ||
      !quantity ||
      !unitPrice ||
      !totalAmount ||
      !deliveryDays
    ) {
      return res.status(400).json({
        message: "Missing quotation data",
      });
    }

    // Generate PO Number
    const count = await PurchaseOrder.countDocuments();

    const poNumber = `PO-${new Date().getFullYear()}-${String(
      count + 1
    ).padStart(3, "0")}`;

    const purchaseOrder = await PurchaseOrder.create({
      poNumber,
      vendor: vendorId,
      vendorName,
      companyName,
      product,
      quantity,
      unitPrice,
      totalAmount,
      deliveryDays,
      status: "Pending",
    });

    res.status(201).json({
      message: "Purchase Order generated successfully",
      purchaseOrder,
    });

  } catch (error) {
    console.error("PO GENERATION ERROR:", error);

    res.status(500).json({
      message: "Failed to generate purchase order",
    });
  }
});

module.exports = router;