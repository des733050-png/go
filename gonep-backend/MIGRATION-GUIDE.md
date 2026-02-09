# Database Migration Guide

## Issue Diagnosis: Missing `placement` Column

### Problem
The application is throwing an error: `Unknown column 'placement' in 'field list'` when querying the `demo_videos` table.

### Root Cause
The `demo_videos` table was created without the `placement` column, but the application code (Drizzle schema) expects it to exist. The migration that adds this column (Migration 9 in `consolidated_migration.sql`) may not have been executed.

### Impact on Production
- **API Endpoint Failure**: `/api/video/placement/:placement` endpoint fails with 500 error
- **Frontend Issues**: Homepage hero video section may not display videos
- **Data Integrity**: Videos cannot be filtered by placement (e.g., 'homepage-hero', 'about-section')
- **User Experience**: Users may see empty video sections or error messages

### Solution

#### Quick Fix (Recommended)
Run the placement column fix script:

```bash
npm run migrate:fix-placement
```

Or directly:
```bash
node fix-placement-column.js
```

This script will:
1. Check if the `demo_videos` table exists
2. Check if the `placement` column exists
3. Add the column if missing
4. Create the necessary index

#### Full Migration
If you need to run all migrations from scratch:

```bash
# Run consolidated migration (all migrations in one file)
npm run migrate:consolidated

# OR run complete migration (creates all tables)
npm run migrate:complete
```

## Available Migration Scripts

### SQL Migration Scripts

1. **Consolidated Migration** (`run-consolidated-migration.js`)
   - Runs all migrations from `migration-packages/consolidated_migration.sql`
   - Includes all 10 migrations in correct order
   - **Usage**: `npm run migrate:consolidated` or `node run-consolidated-migration.js`

2. **Complete Migration** (`run-complete-migration.js`)
   - Runs the complete migration from `complete-migration.sql`
   - Creates all 34 tables from scratch
   - **Usage**: `npm run migrate:complete` or `node run-complete-migration.js`

3. **Fix Placement Column** (`fix-placement-column.js`)
   - Quick fix for the missing `placement` column
   - Safe to run multiple times (idempotent)
   - **Usage**: `npm run migrate:fix-placement` or `node fix-placement-column.js`

### JavaScript Migration Scripts

1. **Create Blog Tables** (`run-create-blog-tables.js`)
   - Creates blog-related tables (categories, authors, posts, comments)
   - **Usage**: `npm run create:blog` or `node run-create-blog-tables.js`

2. **Create Missing Tables** (`create-missing-tables.js`)
   - Creates demo_requests and newsletter_subscribers tables
   - **Usage**: `npm run migrate:update` or `node create-missing-tables.js`

3. **Create Admin User** (`run-create-admin.js`)
   - Creates an admin user via API
   - **Usage**: `npm run create:admin` or `node run-create-admin.js`

## Environment Configuration

All migration scripts use environment variables from the `env` file:

- `DATABASE_URL` (preferred) - Full MySQL connection string
- OR individual variables:
  - `DB_HOST`
  - `DB_PORT`
  - `DB_USERNAME`
  - `DB_PASSWORD`
  - `DB_NAME`

## Migration Order

If running migrations manually, follow this order:

1. **First**: Run complete migration or consolidated migration
   ```bash
   npm run migrate:complete
   ```

2. **Then**: Fix any missing columns
   ```bash
   npm run migrate:fix-placement
   ```

3. **Finally**: Create admin user (if needed)
   ```bash
   npm run create:admin
   ```

## Verification

After running migrations, verify the `placement` column exists:

```sql
DESCRIBE demo_videos;
```

You should see the `placement` column with:
- Type: `varchar(100)`
- Default: `'general'`
- Position: After `category`

## Troubleshooting

### Error: "Column already exists"
- This is safe to ignore - the column was already added
- The script is idempotent and can be run multiple times

### Error: "Table doesn't exist"
- Run the complete migration first: `npm run migrate:complete`

### Error: "Connection refused"
- Check your database credentials in the `env` file
- Ensure the database server is running
- Verify network connectivity

### Error: "Access denied"
- Check database user permissions
- Ensure the user has CREATE, ALTER, and INDEX privileges

## Production Deployment

For production deployments:

1. **Backup your database first!**
   ```bash
   mysqldump -u [user] -p [database] > backup.sql
   ```

2. Run the fix script:
   ```bash
   npm run migrate:fix-placement
   ```

3. Verify the fix:
   ```bash
   npm run db:status
   ```

4. Test the API endpoint:
   ```bash
   curl https://your-api.com/api/video/placement/homepage-hero
   ```

## Notes

- All migration scripts are idempotent (safe to run multiple times)
- Scripts use `CREATE TABLE IF NOT EXISTS` and `ALTER TABLE` with existence checks
- The `placement` column is required for the video placement feature
- Default value for `placement` is `'general'` if not specified




