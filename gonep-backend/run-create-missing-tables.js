#!/usr/bin/env node

/**
 * Wrapper script to run create-missing-tables.js
 * This ensures the script uses the correct env file
 */

// Since create-missing-tables.js uses ES modules, we need to import it
// But Node.js doesn't support top-level await in CommonJS, so we'll just
// run it directly. The file already has the proper env setup now.
import('./create-missing-tables.js').catch(console.error);




