const users = `CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    address VARCHAR(100),
    email VARCHAR(50) UNIQUE,
    password VARCHAR(100),
    type VARCHAR(30),
    is_admin BOOLEAN DEFAULT false,
    phone_number VARCHAR(30) UNIQUE,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`;
export default users;
