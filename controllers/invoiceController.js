const pool = require("../db/pool");

const createInvoice = async (req, res) => {
  try {
    const clinicId = req.headers["clinic-id"];
    if (!clinicId)
      return res.status(400).json({ error: "مرفوض: يجب تحديد العيادة أولاً" });

    // استلام الـ appointment_id من الواجهة
    const { appointment_id, patient_id, total_amount, paid_amount } = req.body;

    const balance_due = total_amount - paid_amount;
    const status =
      balance_due <= 0 ? "paid" : paid_amount > 0 ? "partial" : "unpaid";

    // إضافته في جملة الإدخال لقاعدة البيانات
    const result = await pool.query(
      `INSERT INTO invoices (clinic_id, appointment_id, patient_id, total_amount, paid_amount, balance_due, status) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        clinicId,
        appointment_id,
        patient_id,
        total_amount,
        paid_amount,
        balance_due,
        status,
      ]
    );

    res.json({ message: "تم إصدار الفاتورة بنجاح", invoice: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "حدث خطأ أثناء إصدار الفاتورة" });
  }
};

module.exports = { createInvoice };
