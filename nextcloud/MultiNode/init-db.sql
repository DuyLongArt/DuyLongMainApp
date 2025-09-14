-- PostgreSQL Initialization Script for Nextcloud
-- This script optimizes PostgreSQL for Nextcloud usage

-- Create extensions that Nextcloud can benefit from
CREATE EXTENSION IF NOT EXISTS btree_gin;
CREATE EXTENSION IF NOT EXISTS btree_gist;
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS unaccent;

-- Set timezone
SET timezone = 'UTC';

-- Optimize PostgreSQL settings for Nextcloud
ALTER SYSTEM SET shared_buffers = '256MB';
ALTER SYSTEM SET effective_cache_size = '1GB';
ALTER SYSTEM SET maintenance_work_mem = '64MB';
ALTER SYSTEM SET checkpoint_completion_target = 0.9;
ALTER SYSTEM SET wal_buffers = '16MB';
ALTER SYSTEM SET default_statistics_target = 100;
ALTER SYSTEM SET random_page_cost = 1.1;
ALTER SYSTEM SET effective_io_concurrency = 200;

-- Configure autovacuum for better performance with Nextcloud
ALTER SYSTEM SET autovacuum = on;
ALTER SYSTEM SET autovacuum_max_workers = 3;
ALTER SYSTEM SET autovacuum_naptime = '1min';
ALTER SYSTEM SET autovacuum_vacuum_threshold = 50;
ALTER SYSTEM SET autovacuum_analyze_threshold = 50;
ALTER SYSTEM SET autovacuum_vacuum_scale_factor = 0.1;
ALTER SYSTEM SET autovacuum_analyze_scale_factor = 0.05;

-- Configure logging
ALTER SYSTEM SET log_min_duration_statement = 1000;
ALTER SYSTEM SET log_checkpoints = on;
ALTER SYSTEM SET log_connections = on;
ALTER SYSTEM SET log_disconnections = on;
ALTER SYSTEM SET log_lock_waits = on;

-- Performance optimizations for Nextcloud workload
ALTER SYSTEM SET synchronous_commit = off;
ALTER SYSTEM SET wal_compression = on;
ALTER SYSTEM SET full_page_writes = off;

-- Reload configuration
SELECT pg_reload_conf();

-- Create a function to optimize Nextcloud tables after installation
CREATE OR REPLACE FUNCTION optimize_nextcloud_tables()
RETURNS void AS $$
DECLARE
    table_name text;
BEGIN
    -- Loop through all tables and create appropriate indexes
    FOR table_name IN 
        SELECT schemaname||'.'||tablename 
        FROM pg_tables 
        WHERE schemaname = 'public'
    LOOP
        -- Analyze table for better query planning
        EXECUTE 'ANALYZE ' || table_name;
    END LOOP;
    
    -- Create additional indexes for better performance
    -- These will be created only if the tables exist
    
    -- Optimize file cache table
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'oc_filecache') THEN
        CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_filecache_parent_name ON oc_filecache(parent, name);
        CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_filecache_storage_path ON oc_filecache(storage, path);
        CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_filecache_mtime ON oc_filecache(mtime);
    END IF;
    
    -- Optimize activity table
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'oc_activity') THEN
        CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_activity_timestamp ON oc_activity(timestamp);
        CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_activity_affecteduser ON oc_activity(affecteduser);
    END IF;
    
    -- Optimize share table
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'oc_share') THEN
        CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_share_owner_item ON oc_share(uid_owner, item_source);
        CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_share_with ON oc_share(share_with);
    END IF;
    
END;
$$ LANGUAGE plpgsql;

-- Grant necessary permissions to nextcloud user
GRANT ALL PRIVILEGES ON DATABASE nextcloud TO nextcloud;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO nextcloud;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO nextcloud;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO nextcloud;

-- Set default privileges for future objects
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO nextcloud;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO nextcloud;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO nextcloud;

-- Create a maintenance function for regular optimization
CREATE OR REPLACE FUNCTION nextcloud_maintenance()
RETURNS void AS $$
BEGIN
    -- Update table statistics
    ANALYZE;
    
    -- Vacuum tables to reclaim space
    VACUUM (ANALYZE, VERBOSE);
    
    -- Reindex if needed (uncomment for weekly maintenance)
    -- REINDEX DATABASE nextcloud;
    
    RAISE NOTICE 'Nextcloud maintenance completed at %', now();
END;
$$ LANGUAGE plpgsql;

-- Create a function to check database health
CREATE OR REPLACE FUNCTION nextcloud_health_check()
RETURNS TABLE (
    metric text,
    value text,
    status text
) AS $$
BEGIN
    -- Database size
    RETURN QUERY
    SELECT 
        'Database Size' as metric,
        pg_size_pretty(pg_database_size(current_database())) as value,
        'OK' as status;
    
    -- Active connections
    RETURN QUERY
    SELECT 
        'Active Connections' as metric,
        count(*)::text as value,
        CASE WHEN count(*) < 100 THEN 'OK' ELSE 'WARNING' END as status
    FROM pg_stat_activity 
    WHERE state = 'active';
    
    -- Cache hit ratio
    RETURN QUERY
    SELECT 
        'Cache Hit Ratio' as metric,
        round((sum(blks_hit) * 100.0 / (sum(blks_hit) + sum(blks_read))), 2)::text || '%' as value,
        CASE 
            WHEN round((sum(blks_hit) * 100.0 / (sum(blks_hit) + sum(blks_read))), 2) > 95 THEN 'OK'
            WHEN round((sum(blks_hit) * 100.0 / (sum(blks_hit) + sum(blks_read))), 2) > 90 THEN 'WARNING'
            ELSE 'CRITICAL'
        END as status
    FROM pg_stat_database 
    WHERE datname = current_database();
    
END;
$$ LANGUAGE plpgsql;