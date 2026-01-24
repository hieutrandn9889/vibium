// tests/enouvo.test.js - Enouvo.com automation test using Vibium
import * as vibium from '../../index.js';

const browser = vibium.browser;

async function runTest() {
    console.log("🚀 Launching Vibium browser...");
    const vibe = await browser.launch({
        headless: false  // Set to false to see the browser in action
    });

    try {
        console.log("🌐 Navigating to enouvo.com...");
        await vibe.go("https://enouvo.com");

        // Wait for page to load
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log("🔍 Looking for Home menu...");
        // Try to find the Home link in the navigation
        const homeLink = await vibe.find('a[href="/"]', { timeout: 5000 });

        console.log("🖱️ Clicking Home menu...");
        await homeLink.click();

        // Wait for navigation to complete
        await new Promise(resolve => setTimeout(resolve, 1500));

        console.log("📸 Taking screenshot...");
        const screenshot = await vibe.screenshot();

        // Save screenshot
        const fs = await import('fs');
        fs.writeFileSync('enouvo_home.png', screenshot);
        console.log("✅ Screenshot saved as enouvo_home.png");

        // Test passed - we successfully navigated and clicked Home
        console.log("✅ TEST PASSED: Successfully navigated to enouvo.com and clicked Home menu");
        console.log("   Screenshot captured for verification");

    } catch (error) {
        console.error("❌ Test error occurred:", error.message);
        console.error(error);
    } finally {
        console.log("🔚 Closing browser...");
        await vibe.quit();
        console.log("✅ Test completed.");
    }
}

runTest().catch(err => console.error("An error occurred during test:", err));
