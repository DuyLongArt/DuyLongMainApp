-- Improved PostgreSQL Schema for Person Management System
-- This schema addresses naming consistency, foreign key relationships, and data integrity

-- Drop schema if exists and recreate
DROP SCHEMA IF EXISTS person CASCADE;
CREATE SCHEMA person AUTHORIZATION pg_database_owner;
COMMENT ON SCHEMA person IS 'Person management system with improved structure and consistency';

-- =============================================================================
-- ENUMS AND TYPES
-- =============================================================================

-- Consolidated role enum (removed duplicate role_data)
CREATE TYPE person.user_role AS ENUM ('user', 'admin', 'moderator', 'guest');

-- Post status enum
CREATE TYPE person.post_status AS ENUM ('draft', 'published', 'archived', 'deleted');

-- Email status enum
CREATE TYPE person.email_status AS ENUM ('pending', 'verified', 'bounced', 'disabled');

-- Currency enum for better data integrity
CREATE TYPE person.currency_type AS ENUM ('USD', 'EUR', 'VND', 'JPY', 'GBP', 'CNY');

-- Skill level enum
CREATE TYPE person.skill_level AS ENUM ('beginner', 'intermediate', 'advanced', 'expert');

-- =============================================================================
-- CORE TABLES
-- =============================================================================

-- Main person table (improved with audit fields)
CREATE TABLE person.persons (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    full_name VARCHAR(255) GENERATED ALWAYS AS (first_name || ' ' || last_name) STORED,
    date_of_birth DATE,
    gender VARCHAR(20) CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
    phone_number VARCHAR(20),
    profile_image_url TEXT,
    is_active BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    
    CONSTRAINT valid_birth_date CHECK (date_of_birth <= CURRENT_DATE),
    CONSTRAINT valid_names CHECK (LENGTH(TRIM(first_name)) > 0 AND LENGTH(TRIM(last_name)) > 0)
);

-- Email addresses (normalized, one-to-many with person)
CREATE TABLE person.email_addresses (
    id SERIAL PRIMARY KEY,
    person_id INTEGER NOT NULL REFERENCES person.persons(id) ON DELETE CASCADE,
    email_address VARCHAR(320) NOT NULL, -- RFC 5321 max length
    email_type VARCHAR(50) DEFAULT 'personal' CHECK (email_type IN ('personal', 'work', 'other')),
    is_primary BOOLEAN DEFAULT false NOT NULL,
    status person.email_status DEFAULT 'pending' NOT NULL,
    verified_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    
    CONSTRAINT valid_email_format CHECK (email_address ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT unique_email UNIQUE (email_address)
);

-- User accounts (separated from person for security)
CREATE TABLE person.user_accounts (
    id SERIAL PRIMARY KEY,
    person_id INTEGER NOT NULL REFERENCES person.persons(id) ON DELETE CASCADE,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL, -- bcrypt hash
    primary_email_id INTEGER REFERENCES person.email_addresses(id),
    role person.user_role DEFAULT 'user' NOT NULL,
    is_locked BOOLEAN DEFAULT false NOT NULL,
    failed_login_attempts INTEGER DEFAULT 0 NOT NULL,
    last_login_at TIMESTAMPTZ,
    password_changed_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    
    CONSTRAINT valid_username CHECK (username ~* '^[a-zA-Z0-9_]{3,50}$'),
    CONSTRAINT valid_failed_attempts CHECK (failed_login_attempts >= 0 AND failed_login_attempts <= 10)
);

-- =============================================================================
-- PROFILE AND PERSONAL INFORMATION
-- =============================================================================

-- Personal information (consolidated and normalized)
CREATE TABLE person.profiles (
    id SERIAL PRIMARY KEY,
    person_id INTEGER NOT NULL REFERENCES person.persons(id) ON DELETE CASCADE,
    bio TEXT,
    occupation VARCHAR(255),
    education_level VARCHAR(100),
    location VARCHAR(255),
    website_url TEXT,
    linkedin_url TEXT,
    github_url TEXT,
    timezone VARCHAR(100) DEFAULT 'UTC',
    preferred_language VARCHAR(10) DEFAULT 'en',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    
    CONSTRAINT unique_person_profile UNIQUE (person_id),
    CONSTRAINT valid_website_url CHECK (website_url IS NULL OR website_url ~* '^https?://'),
    CONSTRAINT valid_timezone CHECK (timezone IS NOT NULL)
);

-- Skills (normalized with proper relationships)
CREATE TABLE person.skills (
    id SERIAL PRIMARY KEY,
    person_id INTEGER NOT NULL REFERENCES person.persons(id) ON DELETE CASCADE,
    skill_name VARCHAR(255) NOT NULL,
    skill_category VARCHAR(100),
    proficiency_level person.skill_level DEFAULT 'beginner' NOT NULL,
    years_of_experience INTEGER DEFAULT 0,
    description TEXT,
    is_featured BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    
    CONSTRAINT valid_skill_name CHECK (LENGTH(TRIM(skill_name)) > 0),
    CONSTRAINT valid_experience_years CHECK (years_of_experience >= 0 AND years_of_experience <= 80),
    CONSTRAINT unique_person_skill UNIQUE (person_id, skill_name)
);

-- =============================================================================
-- FINANCIAL INFORMATION
-- =============================================================================

-- Financial accounts (improved with currency support)
CREATE TABLE person.financial_accounts (
    id SERIAL PRIMARY KEY,
    person_id INTEGER NOT NULL REFERENCES person.persons(id) ON DELETE CASCADE,
    account_name VARCHAR(255) NOT NULL,
    account_type VARCHAR(50) DEFAULT 'checking' 
        CHECK (account_type IN ('checking', 'savings', 'investment', 'credit', 'cash', 'other')),
    balance DECIMAL(15,2) DEFAULT 0.00 NOT NULL,
    currency person.currency_type DEFAULT 'USD' NOT NULL,
    is_primary BOOLEAN DEFAULT false NOT NULL,
    is_active BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    
    CONSTRAINT valid_account_name CHECK (LENGTH(TRIM(account_name)) > 0)
);

-- Assets/Properties (improved structure)
CREATE TABLE person.assets (
    id SERIAL PRIMARY KEY,
    person_id INTEGER NOT NULL REFERENCES person.persons(id) ON DELETE CASCADE,
    asset_name VARCHAR(255) NOT NULL,
    asset_category VARCHAR(100) NOT NULL 
        CHECK (asset_category IN ('real_estate', 'vehicle', 'electronics', 'jewelry', 'art', 'collectibles', 'other')),
    purchase_date DATE,
    purchase_price DECIMAL(15,2),
    current_estimated_value DECIMAL(15,2),
    currency person.currency_type DEFAULT 'USD' NOT NULL,
    condition VARCHAR(50) DEFAULT 'good' 
        CHECK (condition IN ('excellent', 'very_good', 'good', 'fair', 'poor')),
    location VARCHAR(255),
    notes TEXT,
    is_insured BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    
    CONSTRAINT valid_asset_name CHECK (LENGTH(TRIM(asset_name)) > 0),
    CONSTRAINT valid_purchase_price CHECK (purchase_price IS NULL OR purchase_price >= 0),
    CONSTRAINT valid_current_value CHECK (current_estimated_value IS NULL OR current_estimated_value >= 0)
);

-- =============================================================================
-- GOALS AND PLANNING
-- =============================================================================

-- Goals/Plans (improved with status tracking)
CREATE TABLE person.goals (
    id SERIAL PRIMARY KEY,
    person_id INTEGER NOT NULL REFERENCES person.persons(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) DEFAULT 'personal' 
        CHECK (category IN ('personal', 'professional', 'financial', 'health', 'education', 'relationship', 'other')),
    priority INTEGER DEFAULT 3 CHECK (priority BETWEEN 1 AND 5), -- 1=highest, 5=lowest
    status VARCHAR(50) DEFAULT 'active' 
        CHECK (status IN ('planning', 'active', 'on_hold', 'completed', 'cancelled')),
    target_date DATE,
    completion_date DATE,
    progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage BETWEEN 0 AND 100),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    
    CONSTRAINT valid_goal_title CHECK (LENGTH(TRIM(title)) > 0),
    CONSTRAINT valid_target_date CHECK (target_date IS NULL OR target_date >= CURRENT_DATE),
    CONSTRAINT valid_completion_logic CHECK (
        (status = 'completed' AND completion_date IS NOT NULL AND progress_percentage = 100) OR
        (status != 'completed' AND (completion_date IS NULL OR completion_date IS NOT NULL))
    )
);

-- Habits (linked to goals, improved tracking)
CREATE TABLE person.habits (
    id SERIAL PRIMARY KEY,
    person_id INTEGER NOT NULL REFERENCES person.persons(id) ON DELETE CASCADE,
    goal_id INTEGER REFERENCES person.goals(id) ON DELETE SET NULL,
    habit_name VARCHAR(255) NOT NULL,
    description TEXT,
    frequency VARCHAR(50) NOT NULL 
        CHECK (frequency IN ('daily', 'weekly', 'monthly', 'custom')),
    frequency_details JSONB, -- For custom frequencies
    target_count INTEGER DEFAULT 1, -- How many times per frequency period
    is_active BOOLEAN DEFAULT true NOT NULL,
    started_date DATE DEFAULT CURRENT_DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    
    CONSTRAINT valid_habit_name CHECK (LENGTH(TRIM(habit_name)) > 0),
    CONSTRAINT valid_target_count CHECK (target_count > 0)
);

-- =============================================================================
-- BLOG SYSTEM
-- =============================================================================

-- Blog posts (improved with SEO and versioning)
CREATE TABLE person.blog_posts (
    id SERIAL PRIMARY KEY,
    author_id INTEGER NOT NULL REFERENCES person.persons(id) ON DELETE RESTRICT,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image_url TEXT,
    status person.post_status DEFAULT 'draft' NOT NULL,
    is_featured BOOLEAN DEFAULT false NOT NULL,
    view_count INTEGER DEFAULT 0 NOT NULL,
    like_count INTEGER DEFAULT 0 NOT NULL,
    published_at TIMESTAMPTZ,
    scheduled_for TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    
    CONSTRAINT valid_title CHECK (LENGTH(TRIM(title)) > 0),
    CONSTRAINT valid_slug CHECK (slug ~* '^[a-z0-9-]+$'),
    CONSTRAINT valid_content CHECK (LENGTH(TRIM(content)) > 0),
    CONSTRAINT valid_publish_logic CHECK (
        (status = 'published' AND published_at IS NOT NULL) OR
        (status != 'published')
    )
);

-- =============================================================================
-- URL AND WIDGET SYSTEM
-- =============================================================================

-- URLs (improved with validation and categorization)
CREATE TABLE person.urls (
    id SERIAL PRIMARY KEY,
    person_id INTEGER REFERENCES person.persons(id) ON DELETE SET NULL,
    url_full TEXT NOT NULL,
    url_title VARCHAR(255),
    url_description TEXT,
    domain_name VARCHAR(255) NOT NULL,
    path_part TEXT DEFAULT '/' NOT NULL,
    protocol VARCHAR(10) DEFAULT 'https' CHECK (protocol IN ('http', 'https', 'ftp')) NOT NULL,
    port_number INTEGER CHECK (port_number BETWEEN 1 AND 65535),
    category VARCHAR(100) DEFAULT 'general' 
        CHECK (category IN ('social', 'professional', 'personal', 'reference', 'tool', 'entertainment', 'general')),
    is_public BOOLEAN DEFAULT true NOT NULL,
    is_active BOOLEAN DEFAULT true NOT NULL,
    click_count INTEGER DEFAULT 0 NOT NULL,
    last_accessed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    
    CONSTRAINT valid_url_format CHECK (url_full ~* '^https?://[^\s/$.?#].[^\s]*$'),
    CONSTRAINT valid_domain CHECK (LENGTH(TRIM(domain_name)) > 0)
);

-- Widgets (improved with configuration support)
CREATE TABLE person.widgets (
    id SERIAL PRIMARY KEY,
    person_id INTEGER NOT NULL REFERENCES person.persons(id) ON DELETE CASCADE,
    widget_name VARCHAR(255) NOT NULL,
    widget_type VARCHAR(100) NOT NULL 
        CHECK (widget_type IN ('url_shortener', 'calendar', 'weather', 'notes', 'links', 'social_feed', 'custom')),
    configuration JSONB NOT NULL DEFAULT '{}',
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    
    CONSTRAINT valid_widget_name CHECK (LENGTH(TRIM(widget_name)) > 0),
    CONSTRAINT unique_person_widget_name UNIQUE (person_id, widget_name)
);

-- =============================================================================
-- INDEXES FOR PERFORMANCE
-- =============================================================================

-- Person-related indexes
CREATE INDEX idx_persons_full_name ON person.persons USING gin(to_tsvector('english', full_name));
CREATE INDEX idx_persons_active ON person.persons (is_active) WHERE is_active = true;
CREATE INDEX idx_persons_birth_year ON person.persons (EXTRACT(YEAR FROM date_of_birth));

-- Email indexes
CREATE INDEX idx_emails_person_id ON person.email_addresses (person_id);
CREATE INDEX idx_emails_primary ON person.email_addresses (person_id, is_primary) WHERE is_primary = true;
CREATE INDEX idx_emails_status ON person.email_addresses (status);

-- Account security indexes
CREATE INDEX idx_accounts_username ON person.user_accounts (username);
CREATE INDEX idx_accounts_person_id ON person.user_accounts (person_id);
CREATE INDEX idx_accounts_role ON person.user_accounts (role);
CREATE INDEX idx_accounts_locked ON person.user_accounts (is_locked) WHERE is_locked = true;

-- Blog performance indexes
CREATE INDEX idx_blog_posts_author ON person.blog_posts (author_id);
CREATE INDEX idx_blog_posts_status ON person.blog_posts (status);
CREATE INDEX idx_blog_posts_published ON person.blog_posts (published_at DESC) WHERE status = 'published';
CREATE INDEX idx_blog_posts_slug ON person.blog_posts (slug);

-- Financial indexes
CREATE INDEX idx_financial_accounts_person ON person.financial_accounts (person_id);
CREATE INDEX idx_assets_person_category ON person.assets (person_id, asset_category);

-- Goal and habit indexes
CREATE INDEX idx_goals_person_status ON person.goals (person_id, status);
CREATE INDEX idx_goals_target_date ON person.goals (target_date) WHERE target_date IS NOT NULL;
CREATE INDEX idx_habits_person_active ON person.habits (person_id, is_active);

-- =============================================================================
-- TRIGGERS FOR AUDIT TRAILS
-- =============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION person.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply update triggers to all tables with updated_at columns
CREATE TRIGGER update_persons_updated_at 
    BEFORE UPDATE ON person.persons 
    FOR EACH ROW EXECUTE FUNCTION person.update_updated_at_column();

CREATE TRIGGER update_user_accounts_updated_at 
    BEFORE UPDATE ON person.user_accounts 
    FOR EACH ROW EXECUTE FUNCTION person.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at 
    BEFORE UPDATE ON person.profiles 
    FOR EACH ROW EXECUTE FUNCTION person.update_updated_at_column();

CREATE TRIGGER update_skills_updated_at 
    BEFORE UPDATE ON person.skills 
    FOR EACH ROW EXECUTE FUNCTION person.update_updated_at_column();

CREATE TRIGGER update_financial_accounts_updated_at 
    BEFORE UPDATE ON person.financial_accounts 
    FOR EACH ROW EXECUTE FUNCTION person.update_updated_at_column();

CREATE TRIGGER update_assets_updated_at 
    BEFORE UPDATE ON person.assets 
    FOR EACH ROW EXECUTE FUNCTION person.update_updated_at_column();

CREATE TRIGGER update_goals_updated_at 
    BEFORE UPDATE ON person.goals 
    FOR EACH ROW EXECUTE FUNCTION person.update_updated_at_column();

CREATE TRIGGER update_habits_updated_at 
    BEFORE UPDATE ON person.habits 
    FOR EACH ROW EXECUTE FUNCTION person.update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at 
    BEFORE UPDATE ON person.blog_posts 
    FOR EACH ROW EXECUTE FUNCTION person.update_updated_at_column();

CREATE TRIGGER update_urls_updated_at 
    BEFORE UPDATE ON person.urls 
    FOR EACH ROW EXECUTE FUNCTION person.update_updated_at_column();

CREATE TRIGGER update_widgets_updated_at 
    BEFORE UPDATE ON person.widgets 
    FOR EACH ROW EXECUTE FUNCTION person.update_updated_at_column();

-- =============================================================================
-- VIEWS FOR COMMON QUERIES
-- =============================================================================

-- Complete person profile view
CREATE VIEW person.v_person_profiles AS
SELECT 
    p.id,
    p.full_name,
    p.first_name,
    p.last_name,
    p.date_of_birth,
    p.gender,
    p.phone_number,
    p.is_active,
    pr.bio,
    pr.occupation,
    pr.education_level,
    pr.location,
    pr.website_url,
    (SELECT email_address FROM person.email_addresses 
     WHERE person_id = p.id AND is_primary = true LIMIT 1) as primary_email,
    (SELECT COUNT(*) FROM person.skills WHERE person_id = p.id) as skill_count,
    (SELECT COUNT(*) FROM person.goals WHERE person_id = p.id AND status = 'active') as active_goals,
    p.created_at,
    p.updated_at
FROM person.persons p
LEFT JOIN person.profiles pr ON p.id = pr.person_id
WHERE p.is_active = true;

-- =============================================================================
-- SAMPLE DATA AND COMMENTS
-- =============================================================================

COMMENT ON SCHEMA person IS 'Comprehensive person management system with improved data integrity and performance';
COMMENT ON TABLE person.persons IS 'Core person entity with basic demographic information';
COMMENT ON TABLE person.email_addresses IS 'Normalized email storage with verification status';
COMMENT ON TABLE person.user_accounts IS 'Authentication and authorization data separated from person data';
COMMENT ON VIEW person.v_person_profiles IS 'Consolidated view of person information for common queries';

-- Set permissions
ALTER SCHEMA person OWNER TO duylong;
GRANT ALL ON SCHEMA person TO duylong;
GRANT USAGE ON SCHEMA person TO PUBLIC;