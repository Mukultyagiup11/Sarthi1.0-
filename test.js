import 'dotenv/config';
import connection from '../Sarthi-App/src/database/utils/connection.js';

const environment = process.env.NODE_ENV || 'local';

async function testConnection() {
  let pool;

  try {
    pool = connection.getReaderConnection(environment);

   const [rows] = await pool.query(
  'SELECT DATABASE() AS database_name, NOW() AS db_time'
);

    console.log('Database connected successfully!');
    console.log(rows[0]);
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exitCode = 1;
  } finally {
    if (pool) {
      await pool.end();
    }
  }
}

testConnection();