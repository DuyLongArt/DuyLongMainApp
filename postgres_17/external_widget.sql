-- ====================================
-- Widget Management System - SQL Schema
-- ====================================

-- 1. Accounts Table
CREATE TABLE accounts (
    account_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    
    INDEX idx_email (email),
    INDEX idx_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Persons Table (Profile information)
CREATE TABLE persons (
    person_id INT AUTO_INCREMENT PRIMARY KEY,
    account_id INT NOT NULL UNIQUE,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    display_name VARCHAR(200),
    avatar_url VARCHAR(500),
    bio TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_person_account FOREIGN KEY (account_id) 
        REFERENCES accounts(account_id) ON DELETE CASCADE,
    
    INDEX idx_account_id (account_id),
    INDEX idx_display_name (display_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. External Widgets Table
CREATE TABLE external_widgets (
    widget_id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    image_url VARCHAR(500),
    host VARCHAR(255) NOT NULL,
    protocol VARCHAR(10) NOT NULL DEFAULT 'https',
    port INT DEFAULT 443,
    ip_address VARCHAR(45) NULL,  -- IPv4 or IPv6
    widget_type ENUM('video', 'image', 'document', 'embed', 'other') DEFAULT 'other',
    date_added TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by INT NOT NULL,
    is_public BOOLEAN NOT NULL DEFAULT FALSE,
    view_count INT UNSIGNED DEFAULT 0,
    
    CONSTRAINT fk_widget_creator FOREIGN KEY (created_by) 
        REFERENCES accounts(account_id) ON DELETE CASCADE,
    
    INDEX idx_host (host),
    INDEX idx_created_by (created_by),
    INDEX idx_date_added (date_added),
    INDEX idx_widget_type (widget_type),
    INDEX idx_is_public (is_public)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Person Widget Permissions Table
CREATE TABLE person_widget_permissions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    widget_id VARCHAR(50) NOT NULL,
    account_id INT NOT NULL,
    status ENUM('PUBLIC', 'ACTIVE', 'PRIVATE', 'ARCHIVED') NOT NULL DEFAULT 'ACTIVE',
    permission TINYINT UNSIGNED NOT NULL DEFAULT 0,
    -- Permission levels: 0=none, 1=view, 2=edit, 3=admin, 4=owner
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    UNIQUE KEY uk_person_widget (account_id, widget_id),
    
    CONSTRAINT fk_permission_widget FOREIGN KEY (widget_id) 
        REFERENCES external_widgets(widget_id) ON DELETE CASCADE,
    CONSTRAINT fk_permission_account FOREIGN KEY (account_id) 
        REFERENCES accounts(account_id) ON DELETE CASCADE,
    CONSTRAINT chk_permission CHECK (permission BETWEEN 0 AND 255),
    
    INDEX idx_widget_id (widget_id),
    INDEX idx_account_id (account_id),
    INDEX idx_status (status),
    INDEX idx_permission (permission)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Widget Categories Table (Optional)
CREATE TABLE widget_categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon_url VARCHAR(500),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Widget Category Mapping Table
CREATE TABLE widget_category_mapping (
    widget_id VARCHAR(50) NOT NULL,
    category_id INT NOT NULL,
    
    PRIMARY KEY (widget_id, category_id),
    
    CONSTRAINT fk_mapping_widget FOREIGN KEY (widget_id) 
        REFERENCES external_widgets(widget_id) ON DELETE CASCADE,
    CONSTRAINT fk_mapping_category FOREIGN KEY (category_id) 
        REFERENCES widget_categories(category_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================
-- SAMPLE QUERIES
-- ====================================

-- Query 1: Get all widgets for a specific account with permissions
-- (Fixed your original query)
SELECT 
    a.account_id,
    a.username,
    a.email,
    p.display_name,
    ew.widget_id,
    ew.name AS widget_name,
    ew.url,
    ew.image_url,
    ew.host,
    ew.protocol,
    ew.date_added,
    pwp.permission,
    pwp.status
FROM accounts a
JOIN persons p ON a.account_id = p.account_id
JOIN person_widget_permissions pwp ON a.account_id = pwp.account_id
JOIN external_widgets ew ON pwp.widget_id = ew.widget_id
WHERE a.account_id = 1  -- Replace with actual account_id
ORDER BY ew.date_added DESC;

-- Query 2: Get widgets owned by a user
SELECT 
    ew.*,
    a.username AS owner_username
FROM external_widgets ew
JOIN accounts a ON ew.created_by = a.account_id
WHERE a.account_id = 1;

-- Query 3: Get public widgets
SELECT * FROM external_widgets
WHERE is_public = TRUE
ORDER BY date_added DESC;

-- Query 4: Get shared widgets (with specific permission level)
SELECT 
    ew.*,
    pwp.permission,
    pwp.status,
    a.username AS shared_with
FROM external_widgets ew
JOIN person_widget_permissions pwp ON ew.widget_id = pwp.widget_id
JOIN accounts a ON pwp.account_id = a.account_id
WHERE ew.created_by != pwp.account_id  -- Not the owner
AND pwp.status = 'ACTIVE'
AND pwp.permission >= 1;  -- At least view permission

-- Query 5: Widget statistics per user
SELECT 
    a.account_id,
    a.username,
    COUNT(DISTINCT ew.widget_id) AS total_widgets_owned,
    COUNT(DISTINCT pwp.widget_id) AS total_widgets_accessible,
    SUM(ew.view_count) AS total_views
FROM accounts a
LEFT JOIN external_widgets ew ON a.account_id = ew.created_by
LEFT JOIN person_widget_permissions pwp ON a.account_id = pwp.account_id
GROUP BY a.account_id, a.username;

-- ====================================
-- SAMPLE DATA INSERTION
-- ====================================

-- Insert sample account
INSERT INTO accounts (username, email, password_hash) 
VALUES ('john_doe', 'john@example.com', '$2y$10$hashedpassword');

-- Insert person profile
INSERT INTO persons (account_id, first_name, last_name, display_name)
VALUES (1, 'John', 'Doe', 'John Doe');

-- Insert sample widgets (matching your Flutter code structure)
INSERT INTO external_widgets (widget_id, name, url, image_url, host, protocol, port, created_by, widget_type)
VALUES 
('EW1', 'Video Player 1', 'watch?v=lA_o1dvXCU8&list=RDlA_o1dvXCU8&index=1', 
 'https://picsum.photos/id/101/200/300', 'www.youtube.com', 'https', 443, 1, 'video'),
('EW2', 'Video Player 2', 'watch?v=lA_o1dvXCU8&list=RDlA_o1dvXCU8&index=2', 
 'https://picsum.photos/id/102/200/300', 'www.google.com', 'https', 443, 1, 'video');

-- Grant permissions
INSERT INTO person_widget_permissions (widget_id, account_id, status, permission)
VALUES 
('EW1', 1, 'ACTIVE', 4),  -- Owner permission
('EW2', 1, 'ACTIVE', 4);  -- Owner permission