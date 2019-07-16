const flaggedproperties = `CREATE TABLE IF NOT EXISTS flaggedproperties(
    id SERIAL PRIMARY KEY,
    property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE ON UPDATE CASCADE UNIQUE,
    location VARCHAR(150),
    reason VARCHAR(150),
    description VARCHAR(150),
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
export default flaggedproperties;
