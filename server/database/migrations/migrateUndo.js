import pool from '../db';

(async function migrateReset() {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS properties CASCADE');
    await client.query('DROP TABLE IF EXISTS flaggedproperties  CASCADE');
    await client.query('DROP TABLE IF EXISTS users CASCADE');
  } catch (error) {
    console.log(error);
  } finally {
    await client.release();
  }
}());
