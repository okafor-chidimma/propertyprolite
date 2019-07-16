import Passcode from '../../helpers/Passcode';
import pool from '../db';

let userPassword;
let adminPassword;
let agentPassword1;
let agentPassword2;

(async function seedDb() {
  const { encryptPassword } = Passcode;
  try {
    userPassword = await encryptPassword('userpassword');
    console.log(userPassword, 'userpassword');
    agentPassword1 = await encryptPassword('agentpassword1');
    console.log(agentPassword1, 'userpassword');
    agentPassword2 = await encryptPassword('agentpassword2');
    console.log(agentPassword2, 'userpassword');
    adminPassword = await encryptPassword('adminpassword');
    console.log(adminPassword, 'userpassword');
  } catch (error) {
    console.log(error, 'password');
  }
  const user = `INSERT INTO users(first_name, last_name, 
                  email, password, address, type, is_admin, phone_number)
                  VALUES('Chika', 'Igwe', 'chikaigwe@yahoo.com', 
                  '${userPassword}', 'No 5 Kanu Street Abuja', 'user', 
                  false, '07044332255')`;

  const agent1 = `INSERT INTO users(first_name, last_name, email, 
          password, address, type, is_admin, phone_number)
                  VALUES('Emeka', 'Ike', 'emekaike@yahoo.com', 
                  '${agentPassword1}', 'No 5 Ugonma Street Enugu', 
                  'agent', false, '07044332205')`;
  const agent2 = `INSERT INTO users(first_name, last_name, email, 
                password, address, type, is_admin, phone_number)
                  VALUES('chidimma', 'okafor', 'chidimma.okafor.c@gmail.com', 
                  '${agentPassword2}', 'No 5 Ugonma Street Enugus', 'agent', 
                  true, '07039119707')`;


  const admin = `INSERT INTO users(first_name, last_name, email, password, 
                  address, type, is_admin, phone_number)
                  VALUES('Ifeanyi', 'Ike', 'ifeanyiike@gmail.com', 
                  '${adminPassword}', 'No 5 Ugonma Street Abia', 'admin', 
                  true, '09088766678')`;

  const property1 = `INSERT INTO properties(owner, status, price, country, 
                    state, city, address, no_of_rooms, fraud, type, 
                    adv_desc, adv_purpose, duration, image_url, public_id)
                    VALUES(2, 'Available', 6844.22, 'Nigeria', 
                    'Anambra', 'Awka', 'No 4 Abaji Street', 3, false, 
                    'duplex', 'it is a little duplex', 'rent', '2 Years', 
                    'http://res.cloudinary.com/okafor-chidimma/image/upload/v1562108668/ybxnh9g2jlkiho1ubpq2.jpg', 
                    'uugggfdfggfb')`;

  const property2 = `INSERT INTO properties(owner, status, price, country, 
                    state, city, address, no_of_rooms, fraud, type, 
                    adv_desc, adv_purpose, duration, image_url, public_id)
                    VALUES(2, 'Available', 16844.22, 'Nigeria', 
                    'FCT', 'Abuja', 'No 4 gana Street', 2, false, 
                    'flat', 'Flats in an estate','sale', '', 
                    'http://res.cloudinary.com/okafor-chidimma/image/upload/v1562108620/upmagwkejxcgfcjgwzgq.jpg', 
                    'uugggfdfggfb')`;

  const property3 = `INSERT INTO properties(owner, status, price, country, 
                    state, city, address, no_of_rooms, fraud, 
                    type, adv_desc, adv_purpose, duration, image_url, public_id)
                    VALUES(3, 'Available', 16855.22, 'Nigeria', 'FCT', 
                    'Abuja', 'No 4 ganadd Street', 2, false, 'self-contained', 
                    'self-contained in an estate','sale', '', 
                    'http://res.cloudinary.com/okafor-chidimma/image/upload/v1562108620/upmagwkejxcgfcjgwzgq.jpg', 
                    'uugggfdfggfb')`;

  const property4 = `INSERT INTO properties(owner, status, price, country, 
                    state, city, address, no_of_rooms, fraud, type, adv_desc, 
                    adv_purpose, duration, image_url, public_id)
                    VALUES(3, 'Available', 1844.22, 'Nigeria', 
                    'Benue', 'Abuja', 'No 4 gobe Street', 2, false, 
                    'bungalow', 'Bungalows in an estate','rent', '5 months', 
                    'http://res.cloudinary.com/okafor-chidimma/image/upload/v1562108620/upmagwkejxcgfcjgwzgq.jpg', 
                    'uugggfdfggfb')`;

  const flaggedProperty1 = `INSERT INTO flaggedproperties
                        (property_id, location, reason, description)
                      VALUES(1, 'Abuja', 'illegal ownership', 
                      'I am the real owner of the house')`;
  const flaggedProperty2 = `INSERT INTO flaggedproperties
                      (property_id, location, reason, description)
                      VALUES(2, 'Abuja', 'illegal ownership', 
                      'I am the real owner of the house')`;
  const flaggedProperty3 = `INSERT INTO flaggedproperties
                        (property_id, location, reason, description)
                        VALUES(3, 'Abuja', 'illegal ownership', 
                        'I know real owner of the house')`;
  const flaggedProperty4 = `INSERT INTO flaggedproperties
                        (property_id, location, reason, description)
                        VALUES(4, 'Abuja', 'illegal ownership', 
                        'I am the real owner of the house')`;

  const client = await pool.connect();
  try {
    console.log('inserting into users');
    await client.query(user);
    await client.query(agent1);
    await client.query(agent2);
    await client.query(admin);
    console.log('inserting into properties');
    await client.query(property1);
    await client.query(property2);
    await client.query(property3);
    await client.query(property4);
    console.log('inserting into flaggedproperties');
    await client.query(flaggedProperty1);
    await client.query(flaggedProperty2);
    await client.query(flaggedProperty3);
    await client.query(flaggedProperty4);
  } catch (error) {
    console.log(error, 'connect error');
  } finally {
    await client.release();
  }
}());
