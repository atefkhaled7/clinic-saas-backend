const pool = require('../db/pool');

// دالة جلب العيادات
const getClinics = async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name, subdomain, email FROM clinics");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "حدث خطأ أثناء جلب البيانات" });
  }
};

// دالة إضافة عيادة
const createClinic = async (req, res) => {
  try {
    const { name, subdomain, email } = req.body;
    const result = await pool.query(
      'INSERT INTO clinics (name, subdomain, email) VALUES ($1, $2, $3) RETURNING *',
      [name, subdomain, email]
    );
    res.json({ message: 'تمت إضافة العيادة بنجاح', clinic: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'حدث خطأ أثناء إضافة العيادة' });
  }
};

module.exports = { getClinics, createClinic };