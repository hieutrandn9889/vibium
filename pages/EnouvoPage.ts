// pages/EnouvoPage.ts - Page Object for https://enouvo.com
import { PageObject } from './base/PageObject.js';

export class EnouvoPage extends PageObject {
    constructor() {
        super('https://enouvo.com');
    }

    async getMainHeading(): Promise<string> {
        return this.getText('h1');
    }

    async getAllText(): Promise<string> {
        return this.getText('body');
    }

    async captureScreen(filename?: string): Promise<void> {
        await this.screenshot(filename || 'enouvo.png');
    }
}
