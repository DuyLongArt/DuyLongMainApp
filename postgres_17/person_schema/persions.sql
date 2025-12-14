-- Create schema
CREATE SCHEMA IF NOT EXISTS person;

-- Create roles table
CREATE TABLE IF NOT EXISTS user.roles (
    role_id BIGSERIAL PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create persons table
CREATE TABLE IF NOT EXISTS user.persons (
    person_id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    full_name VARCHAR(200),
    date_of_birth DATE,
    phone VARCHAR(20),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create accounts table
CREATE TABLE user.accounts (
    account_id BIGSERIAL NOT NULL,
    role_name VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    person_id BIGINT NULL,
    CONSTRAINT accounts_pkey PRIMARY KEY (account_id),
    CONSTRAINT accounts_email_key UNIQUE (email),
    CONSTRAINT accounts_person_id_key UNIQUE (person_id),
    CONSTRAINT accounts_role_name_key UNIQUE (role_name),
    CONSTRAINT accounts_username_key UNIQUE (username),
    CONSTRAINT accounts_person_id_fkey FOREIGN KEY (person_id)
        REFERENCES person.persons (person_id)
        ON UPDATE CASCADE
        ON DELETE SET DEFAULT
) TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS idx_role_name ON person.accounts USING btree (role_name) TABLESPACE pg_default;

-- Create account_roles junction table
CREATE TABLE IF NOT EXISTS user.account_roles (
    account_role_id BIGSERIAL PRIMARY KEY,
    account_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,
    assigned_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (account_id, role_id),

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

-- Create indexes
CREATE INDEX idx_account_id ON person.account_roles(account_id);
CREATE INDEX idx_role_id ON person.account_roles(role_id);
CREATE INDEX idx_first_name ON person.persons(first_name);
CREATE INDEX idx_last_name ON person.persons(last_name);
CREATE INDEX idx_full_name ON person.persons(full_name);
