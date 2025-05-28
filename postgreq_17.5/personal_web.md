psql -U duylong duylongdb
-- Create database
CREATE DATABASE personal_web;

-- Connect to the database (use \c personal_web in psql)
-- Note: "USE" statement doesn't exist in PostgreSQL

-- Show tables (after creation)
SELECT * FROM information_schema.tables WHERE table_schema = 'public';

-- Create person table
CREATE TABLE person (
    id INT NOT NULL PRIMARY KEY,
    name VARCHAR(255),
    birthday DATE,
    sex VARCHAR(15)
);

CREATE TABLE personal_information (
    id SERIAL PRIMARY KEY,  -- SERIAL replaces AUTO_INCREMENT
    name VARCHAR(255),
    major VARCHAR(255),
    person_id INT,
    FOREIGN KEY (person_id) REFERENCES person(id)
);

CREATE TABLE personal_skill (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(2047),  -- PostgreSQL handles UTF-8 by default
    level VARCHAR(255),
    personal_information_id INT,
    FOREIGN KEY (personal_information_id) REFERENCES personal_information(id)
);

CREATE TABLE personal_property (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    category VARCHAR(255),
    person_id INT,
    FOREIGN KEY (person_id) REFERENCES person(id)
);

CREATE TABLE personal_stuff (
    id INT NOT NULL PRIMARY KEY,
    name VARCHAR(255),
    buy_day DATE,
    price FLOAT,
    personal_property_id INT,
    FOREIGN KEY (personal_property_id) REFERENCES personal_property(id)
);

CREATE TABLE personal_plan (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(2047),
    start_date DATE,
    deadline DATE,
    person_id INT,
    FOREIGN KEY (person_id) REFERENCES person(id)
);

CREATE TABLE personal_habit (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    frequency VARCHAR(255),
    person_plan_id INT,
    FOREIGN KEY (person_plan_id) REFERENCES person(id)
);

CREATE TABLE personal_money (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(2047),
    balance FLOAT,
    person_id INT,
    FOREIGN KEY (person_id) REFERENCES person(id)
);