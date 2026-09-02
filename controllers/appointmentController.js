const pool = require('../db/pool');

const createAppointment = async (req, res) => {
  try {
    const clinicId = req.headers['clinic-id'];
    if (!clinicId) return res.status(400).json({ error: 'مرفوض: يجب تحديد العيادة أولاً' });
    const { patient_id, provider_id, chair_id, start_time, end_time } = req.body;
    const result = await pool.query(
      `INSERT INTO appointments (clinic_id, patient_id, provider_id, chair_id, start_time, end_time, status) VALUES ($1, $2, $3, $4, $5, $6, 'scheduled') RETURNING *`,
      [clinicId, patient_id, provider_id, chair_id, start_time, end_time]
    );
    res.json({ message: 'تم حجز الموعد بنجاح', appointment: result.rows[0] });
  } catch (err) {
    if (err.code === '23P01') return res.status(409).json({ error: 'مرفوض: يوجد تعارض، الكرسي أو الطبيب مشغول في هذا الوقت' });
    res.status(500).json({ error: 'حدث خطأ' });
  }
};

module.exports = { createAppointment };