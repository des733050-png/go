import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigration() {
  try {
    // Database connection
    const connection = await mysql.createConnection({
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'gonep',
      multipleStatements: true
    });

    console.log('✅ Connected to MySQL database');

    // Read the migration file
    const migrationPath = path.join(__dirname, 'src/database/migrations/0000_spooky_smiling_tiger.sql');
    const sqlContent = fs.readFileSync(migrationPath, 'utf8');

    console.log('📄 Reading migration file...');

    // Split the SQL by statement breakpoints
    const statements = sqlContent.split('--> statement-breakpoint').map(stmt => stmt.trim()).filter(stmt => stmt.length > 0);

    console.log(`🔧 Found ${statements.length} SQL statements to execute`);

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.trim()) {
        console.log(`📝 Executing statement ${i + 1}/${statements.length}...`);
        try {
          await connection.execute(statement);
          console.log(`✅ Statement ${i + 1} executed successfully`);
        } catch (error) {
          console.error(`❌ Error executing statement ${i + 1}:`, error.message);
        }
      }
    }

    // Check if tables were created
    const [tables] = await connection.execute('SHOW TABLES');
    console.log('\n📊 Tables in database:');
    tables.forEach(table => {
      console.log(`  - ${Object.values(table)[0]}`);
    });

    await connection.end();
    console.log('\n🎉 Migration completed!');

  } catch (error) {
    console.error('❌ Migration failed:', error.message);
  }
}

runMigration();
