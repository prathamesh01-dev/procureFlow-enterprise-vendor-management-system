const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();

router.post('/send', async (req, res) => {
  try {
    const { name, email, company, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        message: 'Name, email and message are required'
      });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Contact Request - ${company || 'ProcureFlow'}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>New Contact Request</h2>

          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company || 'Not provided'}</p>

          <p><strong>Message:</strong></p>
          <p>${message}</p>

          <hr />

          <p style="color: #64748b;">
            Sent from ProcureFlow Contact Form
          </p>
        </div>
      `
    });

    res.status(200).json({
      success: true,
      message: 'Message sent successfully'
    });

  } catch (error) {
    console.error('CONTACT EMAIL ERROR:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to send message'
    });
  }
});

module.exports = router;