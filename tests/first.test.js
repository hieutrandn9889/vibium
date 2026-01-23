// tests/first.test.js

// 1. Nhập toàn bộ đối tượng xuất khẩu mặc định (default export)
import * as vibium from '../index.js'; // Import from local index.js

// 2. Trích xuất đối tượng 'browser' hoặc 'browserSync'
// Đối với Async API:
const browser = vibium.browser;
const fs = await import('fs/promises')

// Đối với Sync API (Nếu bạn chọn dùng nó):
// const browserSync = vibium.browserSync; 


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
    const png = await vibe.screenshot()
    
    await fs.writeFile('screenshot.png', png)
    await vibe.quit();
}

runTest().catch(err => console.error("An error occurred during test:", err));