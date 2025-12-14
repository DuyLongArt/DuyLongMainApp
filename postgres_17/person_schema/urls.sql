CREATE TABLE urls (
    url_id SERIAL PRIMARY KEY,
    
    -- FIX: Changed 'person.persons(id)' to 'persons(person_id)' 
    -- Assuming 'persons' is the table and 'person_id' is the primary key column name.
    -- If your table is 'person.persons' and the PK is 'id', then your original was correct.
    account_id INTEGER REFERENCES accounts(account_id) ON DELETE SET NULL, 
    
    url_full TEXT NOT NULL,
    url_title VARCHAR(255),
    
    -- FIX: Adjusted the CHECK list to better reflect common values/comment logic
    url_type VARCHAR(50) DEFAULT 'external_website' 
        CHECK (url_type IN ('external_website', 'device_website', 'social', 'image', 'iot_device','other')),
    
    url_description TEXT,
    
    domain_name VARCHAR(255) NOT NULL,
    
    -- No change needed, but set as a simple and explicit default
    path_part TEXT NOT NULL DEFAULT '/', 
    
    -- FIX: PROTOCOL constraint includes an explicit empty string which is usually not ideal for a protocol field
    -- Removing the empty string from the CHECK list, as a protocol should always be one of the specified types.
    protocol VARCHAR(10) NOT NULL DEFAULT 'https' 
        CHECK (protocol IN ('http', 'https', 'ftp', 'ws')),
        
    -- Added a specific constraint name for clarity
    port_number INTEGER 
        CONSTRAINT check_port_range CHECK (port_number BETWEEN 1 AND 65535),
    
    category VARCHAR(100) NOT NULL DEFAULT 'general' 
        CHECK (category IN ('social', 'professional', 'personal', 'reference', 'tool', 'entertainment', 'general')),
        
    is_active BOOLEAN NOT NULL DEFAULT true,
    click_count INTEGER NOT NULL DEFAULT 0,
    
    -- TIMESTAMPTZ is the correct type for time zone aware tracking
    last_accessed_at TIMESTAMPTZ, 
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    -- Good practice: use a trigger or set the default value only for the first insert
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    
    CONSTRAINT valid_domain CHECK (LENGTH(TRIM(domain_name)) > 0)
    
    -- (Optional) Example of a more robust URL check (left commented out)
    -- CONSTRAINT valid_url_format CHECK (url_full ~* '^(https?|ftp|ws)://[^\s/$.?#].[^\s]*$')
);