import Passcode from '../../helpers/Passcode';
import pool from '../db';

let agentPassword1;

(async function seedDb() {
  const { encryptPassword } = Passcode;
  try {
    agentPassword1 = await encryptPassword('userpassword');
    console.log(agentPassword1, 'userpassword');
  } catch (error) {
    console.log(error, 'password');
  }

  console.log(agentPassword1, 'outside');


  const agent1 = `INSERT INTO users(first_name, last_name, email, 
          password, address, type, is_admin, phone_number)
                  VALUES('Emeka', 'Ike', 'emekaike@yahoo.com', 
                  '${agentPassword1}', 'No 5 Ugonma Street Enugu', 
                  'agent', false, '07044332205')`;

  const property1 = `INSERT INTO properties(owner, status, price, country, 
                    state, city, address, no_of_rooms, fraud, type, 
                    adv_desc, adv_purpose, duration, image_url, public_id)
                    VALUES(1, 'Available', 6844.22, 'Nigeria', 
                    'Anambra', 'Awka', 'No 4 Abaji Street', 3, false, 
                    'duplex', 'it is a little duplex', 'rent', '2 Years', 
                    'http://res.cloudinary.com/okafor-chidimma/image/upload/v1562108668/ybxnh9g2jlkiho1ubpq2.jpg', 
                    'uugggfdfggfb')`;
  const flaggedProperty1 = `INSERT INTO flaggedproperties
                        (property_id, location, reason, description)
                      VALUES(1, 'Abuja', 'illegal ownership', 
                      'I am the real owner of the house')`;

  const client = await pool.connect();
  try {
    console.log('inserting into users');

    await client.query(agent1);

    console.log('inserting into properties');
    await client.query(property1);

    console.log('inserting into flaggedproperties');
    await client.query(flaggedProperty1);
  } catch (error) {
    console.log(error, 'connect error');
  } finally {
    await client.release();
  }
}());
