-- 1. Table for physical locations (e.g., room, floor, building)

-- 2. Table for the electrical devices
CREATE TABLE devices (
    duylong_id SERIAL PRIMARY KEY,
    uiid BIGINT,
    device_id VARCHAR(100),
    device_name VARCHAR(100) NOT NULL,
    model_name VARCHAR(100) NOT NULL,
    serial_number VARCHAR(50) UNIQUE,
    device_type VARCHAR(50), -- e.g., 'Breaker', 'Light Switch', 'Motor', 'IOT'
    website_url_id BIGINT,
    is_operational BOOLEAN NOT NULL DEFAULT TRUE,
    price DECIMAL(10,2),
    installation_date DATE,
   
    device_image_url_id BIGINT,


    rated_voltage_v INTEGER,
    rated_current_a DECIMAL(10, 2),
    
    -- Foreign Key linking device to its location
    location_id INTEGER REFERENCES locations(location_id) ON DELETE SET NULL
);

-- 3. Table for tracking maintenance and repair
CREATE TABLE maintenance_logs (
    log_id SERIAL PRIMARY KEY,
    device_id INTEGER REFERENCES devices(device_id) ON DELETE CASCADE,
    maintenance_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    task_performed TEXT NOT NULL, -- Description of the work done
    technician_name VARCHAR(100),
    cost DECIMAL(10, 2),
    was_repaired BOOLEAN NOT NULL DEFAULT FALSE
);









CREATE TABLE devices (
    device_id SERIAL PRIMARY KEY,
    device_name VARCHAR(100) NOT NULL,
    model_name VARCHAR(100) NOT NULL,
    serial_number VARCHAR(50) UNIQUE NOT NULL,
    device_type VARCHAR(50) NOT NULL, -- e.g., 'Breaker', 'Light Switch', 'Motor'
    manufacturer VARCHAR(100),
    
    -- Operational Status
    -- is_operational BOOLEAN NOT NULL DEFAULT TRUE,
    operational_status VARCHAR(20) DEFAULT 'active' CHECK (operational_status IN ('active', 'inactive', 'maintenance', 'retired')),
    
    -- Financial Information
    price DECIMAL(12,2) CHECK (price >= 0),
    currency_unit DEFAULT 'VND' check (currency_unit=='VND'),
    warranty_expiry_date DATE,
    
    -- Installation Details
    installation_date DATE,
    installed_by VARCHAR(100),
    ower_id BIGINT,
    -- last_maintenance_date DATE,
    -- next_maintenance_date DATE,
    
    -- Technical Specifications
    rated_voltage_v DECIMAL(10,2) CHECK (rated_voltage_v > 0),
    rated_current_a DECIMAL(10,2) CHECK (rated_current_a > 0),
    rated_power_w DECIMAL(10,2) CHECK (rated_power_w >= 0),
    frequency_hz DECIMAL(5,2),
    phase_type VARCHAR(20), -- e.g., 'Single Phase', 'Three Phase'
    
    -- Media and Documentation
    device_image_url TEXT, -- Store URL/path instead of binary data
    website_url TEXT,
    specifications_json JSONB, -- For flexible additional specs
    
    -- Location and Organization
    location_id INTEGER REFERENCES locations(location_id) ON DELETE SET NULL,
    
    -- Audit Fields
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    notes TEXT,
    
    -- Constraints
    CONSTRAINT valid_maintenance_dates CHECK (
        next_maintenance_date IS NULL OR 
        last_maintenance_date IS NULL OR 
        next_maintenance_date >= last_maintenance_date
    )
);

-- Indexes for better query performance
CREATE INDEX idx_devices_location ON devices(location_id);
CREATE INDEX idx_devices_type ON devices(device_type);
CREATE INDEX idx_devices_operational ON devices(is_operational);
CREATE INDEX idx_devices_status ON devices(operational_status);
CREATE INDEX idx_devices_serial ON devices(serial_number);

-- Trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_devices_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_devices_timestamp
    BEFORE UPDATE ON devices
    FOR EACH ROW
    EXECUTE FUNCTION update_devices_timestamp();

-- Optional: Create a view for operational devices
CREATE VIEW operational_devices AS
SELECT 
    d.*,
    l.location_name
FROM devices d
LEFT JOIN locations l ON d.location_id = l.location_id
WHERE d.is_operational = TRUE 
  AND d.operational_status = 'active';