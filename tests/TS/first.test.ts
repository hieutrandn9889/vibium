// tests/first.test.ts
import * as vibium from '../../index.js'; // Import from local index.js

// Define types for the vibium objects
interface VibiumElement {
  text: () => Promise<string>;
  click: () => Promise<void>;
  type: (text: string) => Promise<void>;
}

interface VibiumBrowserInstance {
  go: (url: string) => Promise<void>;
  find: (selector: string, options?: any) => Promise<VibiumElement>;
  screenshot: () => Promise<Buffer>;
  quit: () => Promise<void>;
}

interface VibiumBrowser {
  launch: (options?: any) => Promise<VibiumBrowserInstance>;
}

// Trích xuất đối tượng 'browser' hoặc 'browserSync'
// Đối với Async API:
const browser = vibium.browser as VibiumBrowser;

async function runTest() {
    console.log("Launching Vibium browser...");
    const vibe = await browser.launch();
    
    await vibe.go("https://momo.vn");
    console.log("Navigated to momo.com");
    
    const heading = await vibe.find("h1");
    
    const text = await heading.text();
    if (text === "Tiện ích và dịch vụ") {
        console.log("TEST PASSED: Found correct heading text.");
    } else {
        console.error("TEST FAILED: Incorrect heading text.");
    }
    const png = await vibe.screenshot();
    
    const fs = await import('fs/promises');
    await fs.writeFile('screenshot.png', png);
    await vibe.quit();
}

runTest().catch(err => console.error("An error occurred during test:", err));