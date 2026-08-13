const express = require('express');
const router = express.Router();
const Vendor = require('../models/Vendor');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("EMAIL CONFIG ERROR:", error);
  } else {
    console.log("EMAIL SERVER READY");
  }
});

// GET all vendors
router.get('/', async (req, res) => {
  try {
    const vendors = await Vendor.find().sort({ createdAt: -1 });
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create vendor
router.post('/', async (req, res) => {
  try {
    const vendor = new Vendor(req.body);
    const savedVendor = await vendor.save();
    res.status(201).json(savedVendor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET vendor statistics
router.get('/stats', async (req, res) => {
  try {
    const totalVendors = await Vendor.countDocuments();

    const pending = await Vendor.countDocuments({ status: 'Pending' });
    const approved = await Vendor.countDocuments({ status: 'Approved' });
    const rejected = await Vendor.countDocuments({ status: 'Rejected' });

    const ratings = await Vendor.find({}, 'rating');

    const averageRating =
      ratings.length === 0
        ? 0
        : (
            ratings.reduce((sum, item) => sum + item.rating, 0) /
            ratings.length
          ).toFixed(1);

    res.json({
      totalVendors,
      pending,
      approved,
      rejected,
      averageRating,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// UPDATE vendor status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;

    const vendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    // Email bhejne ki koshish karo, but fail ho to approval mat rokna
    if (status === 'Approved') {
  console.log('APPROVAL EMAIL TRIGGERED');
  console.log('Sending email to:', vendor.email);

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: vendor.email,
      subject: 'ProcureFlow - Vendor Approval Confirmation',
      html: `
        <h2>Congratulations ${vendor.contact}!</h2>
        <p>
          Your vendor profile for <b>${vendor.company}</b>
          has been approved in ProcureFlow.
        </p>
      `,
    });

    console.log('EMAIL SENT SUCCESSFULLY');
    console.log('Message ID:', info.messageId);

  } catch (emailError) {
    console.error('EMAIL SENDING FAILED:', emailError);
  }
}

    res.json(vendor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});
// UPDATE vendor details



// DELETE vendor
router.delete('/:id', async (req, res) => {
  try {
    await Vendor.findByIdAndDelete(req.params.id);
    res.json({ message: 'Vendor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE vendor rating
router.put('/:id/rating', async (req, res) => {
  try {
    const { rating } = req.body;

    const updatedVendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      { rating },
      { new: true }
    );

    res.json(updatedVendor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;