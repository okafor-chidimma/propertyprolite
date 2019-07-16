
import pool from '../db';
import users from '../models/users';
import properties from '../models/properties';
import flaggedproperties from '../models/flaggedproperties';

(async function migrate() {
  console.log('migrating...');
  const client = await pool.connect();
  try {
    console.log('migrating users...');
    await client.query(users);

    console.log('migrating properties...');
    await client.query(properties);

    console.log('migrating flagged properties...');
    await client.query(flaggedproperties);
  } catch (error) {
    console.log(error);
  } finally {
    await client.release();
    console.log('migration is complete');
  }
}());
// console.log(process.env);
