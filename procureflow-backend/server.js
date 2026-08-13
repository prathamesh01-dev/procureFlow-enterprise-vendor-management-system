
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/db');
const vendorRoutes = require('./routes/vendorRoutes');
const purchaseOrderRoutes = require('./routes/purchaseOrderRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes');
const quotationRoutes = require("./routes/quotationRoutes");



console.log("EMAIL USER:", process.env.EMAIL_USER);
console.log("EMAIL PASS EXISTS:", !!process.env.EMAIL_PASS);

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/vendors', vendorRoutes);
app.use('/api/purchase-orders', purchaseOrderRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use("/api/quotations", quotationRoutes);
app.get('/', (req, res) => {
  res.json({ message: 'ProcureFlow Backend Running Successfully' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});