
import pool from '../db';
import users from '../models/users';
import properties from '../models/properties';
import flaggedproperties from '../models/flaggedproperties';

(async function migrate() {
  const client = await pool.connect();
  try {
    await client.query(users);
    await client.query(properties);
    await client.query(flaggedproperties);
  } catch (error) {
    console.log(error);
  } finally {
    await client.release();
  }
}());
// console.log(process.env);
