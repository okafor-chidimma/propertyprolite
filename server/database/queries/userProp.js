const getSamePropAdvQuery = `SELECT a.id, a.status, a.price, a.country, 
          a.state, a.city, a.address, a.no_of_rooms, a.type,
          a.fraud, a.adv_desc, a.adv_purpose, a.duration, a.image_url, a.created_on,
          b.email as owner_email, b.phone_number as owner_phone_number 
          FROM properties as a, users as b WHERE a.owner = b.id 
          AND a.type = $1`;
const getAllPropAdvQuery = `SELECT a.id, a.status, a.price, a.country, 
          a.state, a.city, a.address, a.no_of_rooms, a.type,
          a.fraud, a.adv_desc, a.adv_purpose, a.duration, a.image_url, a.created_on,
          b.email as owner_email, b.phone_number as owner_phone_number 
          FROM properties as a, users as b WHERE a.owner = b.id 
          AND a.status <> $1`;
const getPropertyQuery = `SELECT a.id, a.status, a.price, a.country, 
          a.state, a.city, a.address, a.no_of_rooms, a.type,
          a.fraud, a.adv_desc, a.adv_purpose, a.duration, a.image_url, a.created_on,
          b.email as owner_email, b.phone_number as owner_phone_number 
          FROM properties as a, users as b WHERE a.owner = b.id 
          AND a.id = $1 AND a.status <> $2`;
const getPropFraudQuery = `SELECT fraud FROM properties WHERE id = $1`;
const updatePropertyQuery = `UPDATE properties SET fraud = true WHERE id = $1`;
const insertProp = `INSERT INTO flaggedProperties (property_id, reason, 
          location, description) VALUES ($1, $2, $3, $4) RETURNING *`;
export default {
  getSamePropAdvQuery,
  getAllPropAdvQuery,
  getPropertyQuery,
  getPropFraudQuery,
  updatePropertyQuery,
  insertProp,
};
