const express = require('express');
const router = express.Router();

const Invoice = require('../models/Invoice');

// GET all invoices
router.get('/', async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .populate('vendor', 'company email')
      .populate('purchaseOrder', 'poNumber')
      .sort({ createdAt: -1 });

    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create invoice
router.post('/', async (req, res) => {
  try {
    const invoice = new Invoice(req.body);
    const savedInvoice = await invoice.save();

    res.status(201).json(savedInvoice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE invoice status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;

    const updatedInvoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedInvoice) {
      return res.status(404).json({
        message: 'Invoice not found',
      });
    }

    res.json(updatedInvoice);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;