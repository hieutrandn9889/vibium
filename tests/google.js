// tests/google.js - Google search demo using Vibium 0.1.3
import { browser } from './index.js';

async function runDemo() {
    // 1. Khởi tạo Vibium (Tự động tải Driver nếu thiếu ở bản 0.1.3)
    const vibe = await browser.launch({
        headless: false  // Set to false to see the browser in action
    });

    try {
        console.log("🚀 Đang truy cập Google...");
        await vibe.go('https://www.google.com');

        // 2. Tương tác với cơ chế Auto-wait mới của 0.1.3
        // Vibium tự động chờ phần tử sẵn sàng trước khi tương tác
        const searchBox = await vibe.find('textarea[name="q"]');
        await searchBox.type('Vibium automation framework 0.1.3');
        
        // Submit the search by pressing Enter on the search box
        await searchBox.type('\n'); // This simulates pressing Enter

        console.log("📸 Đang chụp ảnh màn hình cho AI phân tích...");
        // Tính năng screenshot được tối ưu dung lượng trong bản này
        const screenshot = await vibe.screenshot();
        // Since Vibium returns a Buffer, we save it differently than Puppeteer
        const fs = await import('fs');
        fs.writeFileSync('search_result.png', screenshot);

        // 4. Lấy danh sách tiêu đề các bài viết (Trích xuất dữ liệu)
        // Wait a bit for results to load
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Find elements with h3 tags (Google search result titles)
        const h3Elements = [];
        try {
            // Try to get the first few search result titles
            for (let i = 1; i <= 5; i++) {
                try {
                    // Using nth-child selector to get specific results
                    const selector = `#search div[data-hveid]:nth-child(${i}) h3`;
                    const element = await vibe.find(selector, { timeout: 5000 });
                    const title = await element.text();
                    if (title && title.trim() !== '') {
                        h3Elements.push(title);
                    }
                } catch (e) {
                    // If specific selector fails, try general h3
                    try {
                        const selector = `#search h3:nth-of-type(${i})`;
                        const element = await vibe.find(selector, { timeout: 2000 });
                        const title = await element.text();
                        if (title && title.trim() !== '') {
                            h3Elements.push(title);
                        }
                    } catch (e2) {
                        // Skip if element not found
                        continue;
                    }
                }
            }
        } catch (e) {
            console.log("Could not extract search results:", e.message);
        }

        console.log("🔍 Kết quả tìm thấy:");
        if (h3Elements.length > 0) {
            h3Elements.forEach((title, i) => console.log(`${i + 1}. ${title}`));
        } else {
            console.log("No search results found with the expected selectors.");
        }

    } catch (error) {
        console.error("❌ Có lỗi xảy ra:", error);
    } finally {
        await vibe.quit();
        console.log("✅ Hoàn thành Demo.");
    }
}

// Run the demo
runDemo().catch(console.error);