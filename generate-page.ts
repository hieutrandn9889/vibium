// generate-page.ts - Generate Page Object and Test from URL
import { spawn } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

const url = process.argv[2] || 'https://enouvo.com';
const pageName = process.argv[3] || url.replace(/https?:\/\//, '').split('.')[0];
const className = pageName.charAt(0).toUpperCase() + pageName.slice(1).replace(/-/g, '');

async function runVibium(args: string[]): Promise<{ code: number; stdout: string; stderr: string }> {
    return new Promise((resolve) => {
        const proc = spawn('npx', ['vibium', ...args], { 
            shell: true,
            stdio: ['pipe', 'pipe', 'pipe']
        });
        let stdout = '';
        let stderr = '';
        proc.stdout.on('data', (d: Buffer) => stdout += d.toString());
        proc.stderr.on('data', (d: Buffer) => stderr += d.toString());
        proc.on('close', (code: number) => resolve({ code, stdout, stderr }));
    });
}

async function analyzePage(): Promise<{ title: string; url: string }> {
    console.log(`🔍 Analyzing: ${url}`);
    
    await runVibium(['start']);
    await runVibium(['go', url]);
    await new Promise((r: Function) => setTimeout(r, 2000));
    
    const titleResult = await runVibium(['title']);
    const title = titleResult.stdout.trim();
    
    await runVibium(['screenshot', '-o', `${pageName}.png`]);
    await runVibium(['stop']);
    
    console.log(`   Title: ${title}`);
    console.log(`   Screenshot: ${pageName}.png`);
    
    return { title, url };
}

const pageContent = `// pages/${className}Page.ts - Page Object for ${url}
import { PageObject } from './base/PageObject.js';

export class ${className}Page extends PageObject {
    constructor() {
        super('${url}');
    }

    async getMainHeading(): Promise<string> {
        return this.getText('h1');
    }

    async getAllText(): Promise<string> {
        return this.getText('body');
    }

    async captureScreen(filename?: string): Promise<void> {
        await this.screenshot(filename || '${pageName}.png');
    }
}
`;

const testContent = `// tests/TS/${pageName}-pom.test.ts - POM Test for ${url}
import { ${className}Page } from '../pages/${className}Page.js';

async function runTest() {
    console.log("🚀 Starting POM test for ${url}...");
    
    const page = new ${className}Page();
    
    console.log("📂 Opening page...");
    await page.open();
    
    console.log("📄 Getting title...");
    const title = await page.getTitle();
    console.log("   Title:", title);
    
    console.log("📝 Getting main heading...");
    const heading = await page.getMainHeading();
    console.log("   Heading:", heading.trim().slice(0, 50));
    
    console.log("📸 Taking screenshot...");
    await page.captureScreen();
    
    console.log("🔚 Closing page...");
    await page.close();
    
    console.log("✅ POM Test PASSED for ${url}");
}

runTest().catch(err => console.error("❌ Error:", err));`;

const pagesDir = path.join(process.cwd(), 'pages');
const baseDir = path.join(pagesDir, 'base');

if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
}

analyzePage().then(({ title, url }) => {
    fs.writeFileSync(path.join(pagesDir, `${className}Page.ts`), pageContent);
    console.log(`\\n📝 Created: pages/${className}Page.ts`);
    
    fs.writeFileSync(path.join(process.cwd(), 'tests', 'TS', `${pageName}-pom.test.ts`), testContent);
    console.log(`📝 Created: tests/TS/${pageName}-pom.test.ts`);
    
    const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
    const scriptName = `test:pom:${pageName}`;
    if (!pkg.scripts[scriptName]) {
        pkg.scripts[scriptName] = `tsx tests/TS/${pageName}-pom.test.ts`;
        fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2));
        console.log(`📝 Added script: npm run ${scriptName}`);
    }
    
    console.log("\\n✅ Done! Run with: npm run " + scriptName);
}).catch(err => console.error("❌ Error:", err));