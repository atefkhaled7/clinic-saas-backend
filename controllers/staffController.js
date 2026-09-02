const pool = require('../db/pool');

const getStaff = async (req, res) => {
  try {
    const clinicId = req.headers['clinic-id'];
    if (!clinicId) return res.status(400).json({ error: 'مرفوض: يجب تحديد العيادة أولاً' });
    const result = await pool.query('SELECT id, name, role, email FROM staff WHERE clinic_id = $1', [clinicId]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'حدث خطأ' });
  }
};

const createStaff = async (req, res) => {
  try {
    const { clinic_id, name, role, email } = req.body;
    const result = await pool.query(
      'INSERT INTO staff (clinic_id, name, role, email) VALUES ($1, $2, $3, $4) RETURNING *',
      [clinic_id, name, role, email]
    );
    res.json({ message: 'تم تعيين الدكتور بنجاح', staff: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'حدث خطأ' });
  }
};

module.exports = { getStaff, createStaff };