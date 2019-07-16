// import debug from 'debug';

import pool from '../db';

// const consol.log = debug('Resetting Migrations');

(async function migrateReset() {
  const client = await pool.connect();
  try {
    console.log('rolling back migrations...');
    await client.query('DROP TABLE IF EXISTS properties CASCADE');
    await client.query('DROP TABLE IF EXISTS flaggedproperties  CASCADE');
    await client.query('DROP TABLE IF EXISTS users CASCADE');
  } catch (error) {
    console.log(error);
  } finally {
    await client.release();
    console.log('migration rollback is complete');
  }
}());
