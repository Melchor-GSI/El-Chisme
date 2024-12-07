import { db } from '../../src/lib/db';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import dotenv from 'dotenv';

dotenv.config()

const migrateDatabase = async (): Promise<void> => {
    console.log('🚀 Starting database migration...');

    try {
        await migrate(db, { migrationsFolder: 'migrations' });
        console.log('✅ Successfully completed the database migration.');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error during the database migration:', error);
        process.exit(1);
    }
};

migrateDatabase();