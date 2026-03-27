// base/PageObject.ts - Base class for all page objects
import { spawn } from 'child_process';
import path from 'path';
import { promises as fs } from 'fs';

export class PageObject {
    protected url: string;

    constructor(url: string) {
        this.url = url;
    }

    protected async runVibium(args: string[]): Promise<{ code: number; stdout: string; stderr: string }> {
        return new Promise((resolve) => {
            const proc = spawn('npx', ['vibium', ...args], { 
                shell: true,
                stdio: ['pipe', 'pipe', 'pipe']
            });
            let stdout = '';
            let stderr = '';
            proc.stdout.on('data', d => stdout += d);
            proc.stderr.on('data', d => stderr += d);
            proc.on('close', code => resolve({ code, stdout, stderr }));
        });
    }

    async open(): Promise<void> {
        await this.runVibium(['start']);
        await this.runVibium(['go', this.url]);
        await new Promise(r => setTimeout(r, 2000));
    }

    async close(): Promise<void> {
        await this.runVibium(['stop']);
    }

    async getTitle(): Promise<string> {
        const result = await this.runVibium(['title']);
        return result.stdout.trim();
    }

    async getText(selector: string = 'body'): Promise<string> {
        const result = await this.runVibium(['text', selector]);
        return result.stdout;
    }

    async getUrl(): Promise<string> {
        const result = await this.runVibium(['url']);
        return result.stdout.trim();
    }

    async click(selector: string): Promise<void> {
        await this.runVibium(['click', selector]);
    }

    async fill(selector: string, value: string): Promise<void> {
        await this.runVibium(['fill', selector, value]);
    }

    async screenshot(filename?: string): Promise<void> {
        let vibiumCommandArgs = ['screenshot'];
        if (filename) {
            vibiumCommandArgs.push('-o', filename);
        }

        const result = await this.runVibium(vibiumCommandArgs);

        if (result.code !== 0) {
            console.error(`Error taking screenshot: ${result.stderr}`);
            throw new Error(`Failed to take screenshot: ${result.stderr}`);
        }

        const actualSavedPathMatch = result.stdout.match(/Screenshot saved to (.+)/);
        if (actualSavedPathMatch && filename) {
            const actualSavedPath = actualSavedPathMatch[1].trim();
            const desiredPath = path.resolve(filename);

            if (actualSavedPath !== desiredPath) {
                try {
                    await fs.mkdir(path.dirname(desiredPath), { recursive: true });
                    await fs.copyFile(actualSavedPath, desiredPath);
                    await fs.unlink(actualSavedPath); // Delete the original file
                    console.log(`Moved screenshot from "${actualSavedPath}" to "${desiredPath}"`);
                } catch (error) {
                    console.warn(`Could not move screenshot from "${actualSavedPath}" to "${desiredPath}": ${error.message}`);
                    // Fallback: If moving fails, at least the screenshot is in vibium's default location
                }
            }
        }
    }

    async wait(milliseconds: number): Promise<void> {
        await this.runVibium(['sleep', milliseconds.toString()]);
    }

    async find(selector: string): Promise<void> {
        await this.runVibium(['find', selector]);
    }

    async reload(): Promise<void> {
        await this.runVibium(['reload']);
    }

    async back(): Promise<void> {
        await this.runVibium(['back']);
    }

    async forward(): Promise<void> {
        await this.runVibium(['forward']);
    }
}