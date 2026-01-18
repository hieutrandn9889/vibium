// index.js - Main entry point for the vibium library
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Import Vibium using CommonJS to work around ESM module resolution issues
const { browser, browserSync } = require('vibium');

// Re-export the actual Vibium library
export default {
  browser,
  browserSync
};

// Named exports
export { browser, browserSync };