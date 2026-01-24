// index.ts - Main entry point for the vibium library
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Import Vibium using CommonJS to work around ESM module resolution issues
const { browser, browserSync } = require('vibium') as {
  browser: any;
  browserSync: any;
};

// Define types for Vibium exports
export interface VibiumBrowser {
  launch: (options?: any) => Promise<any>;
}

export interface VibiumPage {
  go: (url: string) => Promise<void>;
  find: (selector: string, options?: any) => Promise<any>;
  screenshot: () => Promise<Buffer>;
  quit: () => Promise<void>;
}

// Re-export the actual Vibium library
export default {
  browser,
  browserSync
};

// Named exports
export { browser, browserSync };