const checkEmail = `SELECT email FROM users WHERE email = $1`;
const insertUserQuery = `INSERT INTO users (first_name, last_name, address, 
                        email, password, type, is_admin, phone_number)
                        VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, first_name, 
                        last_name, email, type, phone_number, address, is_admin`;
const signIn = `SELECT * FROM users WHERE email = $1`;

export default {
  checkEmail,
  insertUserQuery,
  signIn
};
