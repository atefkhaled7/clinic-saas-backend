require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/clinics', require('./routes/clinicRoutes'));
app.use('/api/staff', require('./routes/staffRoutes'));
app.use('/api/patients', require('./routes/patientRoutes'));
app.use('/api/chairs', require('./routes/chairRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));
app.use('/api/invoices', require('./routes/invoiceRoutes'));

// تشغيل السيرفر
app.listen(port, () => {
  console.log(`🚀 السيرفر شغال ومستعد لاستقبال الطلبات على بورت ${port}`);
});