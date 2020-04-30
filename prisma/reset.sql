DO $$
DECLARE tablenames text;
BEGIN    
    tablenames := string_agg('"' || tablename || '"', ', ') 
        FROM pg_tables WHERE schemaname = 'public';
    EXECUTE 'DROP TABLE ' || tablenames;
END; $$

DO $$ BEGIN
    DROP TYPE "Role" CASCADE;
    CREATE TYPE "Role" AS ENUM ('USER', 'CATERER', 'ADMIN');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;


DO $$ BEGIN
    DROP TYPE "Status" CASCADE;
    CREATE TYPE "Status" AS ENUM ('PENDING', 'PROCESSING', 'DISPATCHED', 'FULFILLED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;