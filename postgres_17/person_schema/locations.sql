CREATE TABLE locations (
    location_id SERIAL PRIMARY KEY,
    location_name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT
);
