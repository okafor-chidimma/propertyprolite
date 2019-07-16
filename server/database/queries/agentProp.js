const insertPropertyQuery = `INSERT INTO properties
      (owner, status, price, country, state, city, address, 
      no_of_rooms, fraud, type, adv_desc, adv_purpose, 
      duration, image_url, public_id)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING id, status, price, country, state, city, address, 
      no_of_rooms, type, adv_desc, adv_purpose, duration, image_url, created_on`;
const updateAllProperty = `UPDATE properties SET status = $1, price = $2,
      country = $3, state = $4, city = $5, address = $6, no_of_rooms = $7, 
      fraud = $8, type = $9, adv_desc = $10, adv_purpose = $11,
      duration = $12, image_url = $13, public_id = $14 
      WHERE id = $15 AND owner = $16
      RETURNING id, status, price, country, state, 
      city, address, no_of_rooms, type, adv_desc, adv_purpose, 
      duration, image_url, created_on`;
const updatePropertyStat = `UPDATE properties SET status = $1 
      WHERE id = $2 AND owner = $3 RETURNING id, status, price, country, state, 
      city, address, no_of_rooms, type, adv_desc, adv_purpose, 
      duration, image_url, created_on`;
const getpublicId = `SELECT public_id FROM properties 
      WHERE id = $1 and owner = $2`;
const deleteProperty = `DELETE FROM properties 
      WHERE id = $1 AND owner = $2`;
const getAllPropAdvQuery = `SELECT a.id, a.status, a.price, a.country, 
      a.state, a.city, a.address, a.no_of_rooms, a.type,
      a.adv_desc, a.adv_purpose, a.duration, a.image_url, a.created_on
      FROM properties as a WHERE owner = $1`;
const getPropertyQuery = `SELECT a.id, a.status, a.price, a.country, 
      a.state, a.city, a.address, a.no_of_rooms, a.type,
      a.adv_desc, a.adv_purpose, a.duration, a.image_url, a.created_on
      FROM properties as a WHERE a.id = $1 AND a.owner = $2`;

export default {
  insertPropertyQuery,
  updateAllProperty,
  updatePropertyStat,
  getpublicId,
  deleteProperty,
  getAllPropAdvQuery,
  getPropertyQuery
};
