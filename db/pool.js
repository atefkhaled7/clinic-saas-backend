const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ خطأ في الاتصال بقاعدة البيانات:', err.stack);
  } else {
    console.log('✅ تم الاتصال بخزنة PostgreSQL بنجاح!');
    release();
  }
});

module.exports = pool;