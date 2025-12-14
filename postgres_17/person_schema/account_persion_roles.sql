-- Create schema
CREATE SCHEMA IF NOT EXISTS person;

-- Create roles table
CREATE TABLE IF NOT EXISTS person.roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_role_name (role_name)
);

-- Create accounts table (required for foreign key)
CREATE TABLE IF NOT EXISTS person.accounts (
    account_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create account_roles table
CREATE TABLE IF NOT EXISTS account_roles (
    account_role_id BIGSERIAL PRIMARY KEY,
    account_id INT NOT NULL,
    role_id INT NOT NULL,
    assigned_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (account_id, role_id),
    INDEX idx_account_id (account_id),
    INDEX idx_role_id (role_id),

    CONSTRAINT fk_account_roles_account 
        FOREIGN KEY (account_id) 
        REFERENCES person.accounts(account_id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE,

    CONSTRAINT fk_account_roles_role 
        FOREIGN KEY (role_id) 
        REFERENCES person.roles(role_id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE
);
