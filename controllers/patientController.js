const pool = require('../db/pool');

const createPatient = async (req, res) => {
  try {
    const clinicId = req.headers['clinic-id'];
    if (!clinicId) return res.status(400).json({ error: 'مرفوض: يجب تحديد العيادة أولاً' });
    const { name, phone_number, date_of_birth } = req.body;
    const result = await pool.query(
      'INSERT INTO patients (clinic_id, name, phone_number, date_of_birth) VALUES ($1, $2, $3, $4) RETURNING *',
      [clinicId, name, phone_number, date_of_birth]
    );
    res.json({ message: 'تم تسجيل المريض بنجاح', patient: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'حدث خطأ' });
  }
};

module.exports = { createPatient };