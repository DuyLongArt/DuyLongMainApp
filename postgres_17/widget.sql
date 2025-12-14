CREATE TABLE permission_map (
    -- Primary key with auto-increment for better performance
    permission_map_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    
    -- Foreign key references
    widget_id INT NOT NULL,
    account_id INT NOT NULL,
    
    -- Use ENUM for limited status values (adjust values as needed)
    status ENUM('PUBLIC', 'ACTIVE', 'PRIVATE', 'ARCHIVED') NOT NULL DEFAULT 'ACTIVE',
    
    -- More descriptive permission system
    permission TINYINT UNSIGNED NOT NULL DEFAULT 0,
    -- Alternative: permission ENUM('none', 'read', 'write', 'admin') NOT NULL DEFAULT 'read',
    
    -- Audit timestamps
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Unique constraint to prevent duplicates
    UNIQUE KEY uk_person_widget (account_id, widget_id),
    
    -- Indexes for better query performance
    INDEX idx_widget_id (widget_id),
    INDEX idx_account_id (account_id),
    INDEX idx_status (status),
    
    -- Foreign key constraints (uncomment if parent tables exist)
    -- CONSTRAINT fk_widget FOREIGN KEY (widget_id) REFERENCES widgets(id) ON DELETE CASCADE,
    -- CONSTRAINT fk_person FOREIGN KEY (account_id) REFERENCES persons(id) ON DELETE CASCADE,
    
    -- Optional: Add check constraint for permission range
    CONSTRAINT chk_permission CHECK (permission BETWEEN 0 AND 255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


SELECT * FROM accounts a
JOIN  persions p ON a.account_id=p.account_id
JOIN person_widget_permissions pm ON a.account_id=pm.account_id;