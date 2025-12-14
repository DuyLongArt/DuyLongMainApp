

CREATE TABLE accounts (
    account_id INT AUTO_INCREMENT PRIMARY KEY,
    
    -- Foreign key to mail table
    mail INT,
    
    -- Username (unique identifier)
    username VARCHAR(50) NOT NULL UNIQUE,
    
    -- Foreign key to person table
    first_name INT,
    
    -- Account details
    alias VARCHAR(100) NOT NULL,
    account_pass VARCHAR(255) NOT NULL,
    account_role VARCHAR(50),
    
    -- Timestamps
    
                        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                        last_login TIMESTAMP WITH TIME ZONE,     
    
    -- Account status
    is_enabled BOOLEAN DEFAULT TRUE,
    
    -- Indexes for better query performance
    INDEX idx_username (username),
    INDEX idx_mail (mail),
    INDEX idx_first_name (first_name),
    INDEX idx_role (role),
    INDEX idx_is_enabled (is_enabled),
    INDEX idx_created_at (created_at),
    
    -- Foreign key constraints
    CONSTRAINT fk_account_mail 
        FOREIGN KEY (mail) 
        REFERENCES person.mails(mail_id) 
        ON DELETE SET NULL 
        ON UPDATE CASCADE,
    
    CONSTRAINT fk_account_person 
        FOREIGN KEY (first_name) 
        REFERENCES person.persons(person_id) 
        ON DELETE SET NULL 
        ON UPDATE CASCADE
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE UNIQUE INDEX idx_accounts_mail ON accounts (mail);