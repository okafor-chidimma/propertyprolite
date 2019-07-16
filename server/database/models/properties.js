const properties = `CREATE TABLE IF NOT EXISTS properties(
    id SERIAL PRIMARY KEY,
    owner INTEGER REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    status VARCHAR(50) DEFAULT('Available'),
    price FLOAT,
    country VARCHAR(50),
    state VARCHAR(50),
    city VARCHAR(50),
    address VARCHAR(50),
    no_of_rooms INTEGER,
    type VARCHAR(20) ,
    fraud BOOLEAN DEFAULT false,
    adv_desc VARCHAR(100),
    adv_purpose VARCHAR(50),
    duration VARCHAR(50),
    image_url VARCHAR(200),
    public_id VARCHAR (200),
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
export default properties;
