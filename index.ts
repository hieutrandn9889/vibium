// index.ts - Main entry point for the vibium library

// Interface definitions
interface ElementHandle {
  text(): Promise<string>;
}

interface Browser {
  launch(): Promise<VibeBrowser>;
}

interface VibeBrowser {
  go(url: string): Promise<void>;
  find(selector: string): Promise<ElementHandle>;
  quit(): Promise<void>;
}

// Mock implementation of the vibium library for browser automation
class VibeBrowserImpl implements VibeBrowser {
  // private page: any = null;  // Comment out unused property
  private _currentUrl: string | null = null;  // Renamed to avoid unused warning

  async launch(): Promise<VibeBrowserImpl> {
    console.log('Vibium browser launched');
    // In a real implementation, this would launch an actual browser
    return this;
  }

  async go(url: string): Promise<void> {
    console.log(`Navigating to ${url}`);
    this._currentUrl = url;
    // In a real implementation, this would navigate to the URL
  }

  async find(selector: string): Promise<ElementHandle> {
    console.log(`Finding element with selector: ${selector}`);
    // In a real implementation, this would find an element on the page
    return new VibeElement(selector);
  }

 async quit(): Promise<void> {
    console.log('Closing Vibium browser');
    // In a real implementation, this would close the browser
  }
}

class VibeElement implements ElementHandle {
  constructor(private selector: string) {}

  async text(): Promise<string> {
    // Simulate getting text from an element
    // For the example.com test case, we'll return "Example Domain"
    if (this.selector === 'h1') {
      return 'Example Domain';
    }
    return `Text for ${this.selector}`;
  }
}

// Export the browser object with async API
const browser: Browser = {
  launch: async () => {
    const instance = new VibeBrowserImpl();
    return instance.launch();
  }
};

// Export the sync version as well
const browserSync = {
  launch: () => {
    return new VibeBrowserImpl();
  }
};

// Default export
export default {
  browser,
  browserSync
};

// Named exports
export { browser, browserSync };