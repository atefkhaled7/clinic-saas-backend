const pool = require('../db/pool');

const createChair = async (req, res) => {
  try {
    const clinicId = req.headers['clinic-id'];
    if (!clinicId) return res.status(400).json({ error: 'مرفوض: يجب تحديد العيادة أولاً' });
    const { name } = req.body;
    const result = await pool.query('INSERT INTO chairs (clinic_id, name) VALUES ($1, $2) RETURNING *', [clinicId, name]);
    res.json({ message: 'تم إضافة الكرسي بنجاح', chair: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'حدث خطأ' });
  }
};

module.exports = { createChair };