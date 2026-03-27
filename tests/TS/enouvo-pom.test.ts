// tests/TS/enouvo-pom.test.ts - POM Test for https://enouvo.com
import { EnouvoPage } from '../../pages/EnouvoPage.js';
import path from 'path';
import process from 'process';

async function runTest() {
    console.log("🚀 Starting POM test for https://enouvo.com...");
    
    const page = new EnouvoPage();
    
    console.log("📂 Opening page...");
    await page.open();
    
    console.log("📄 Getting title...");
    const title = await page.getTitle();
    console.log("   Title:", title);
    
    console.log("📝 Getting main heading...");
    const heading = await page.getMainHeading();
    console.log("   Heading:", heading.trim().slice(0, 50));
    
    console.log("📸 Taking screenshot...");
    await page.captureScreen(path.join(process.cwd(), 'picture', 'enouvo.png'));
    
    console.log("🔚 Closing page...");
    await page.close();
    
    console.log("✅ POM Test PASSED for https://enouvo.com");
}

runTest().catch(err => console.error("❌ Error:", err));