# Vibium Project Setup

## Overview

This project uses **Vibium** for browser automation, which implements **WebDriver BiDi** (Bidirectional) protocol for communicating with the browser. WebDriver BiDi enables bidirectional messaging between the client and browser via WebSocket, providing efficient, low-latency browser control.

## Installation

```bash
npm install
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run build` | Compile TypeScript to JavaScript |
| `npm run dev` | Run index.ts with tsx |
| `npm run start` | Run compiled JavaScript |
| `npm run testJs` | Run JavaScript tests |
| `npm run testTs` | Run TypeScript tests |
| `npm run testEnouvo` | Run enouvo.com automation test (JS) |
| `npm run testEnouvoTs` | Run enouvo.com automation test (TS) |
| `npm run testEnouvoWebsite` | Run enouvo.com website test (CLI-based) |
| `npm run test:pom:enouvo` | Run POM-based test for enouvo.com |
| `npm run mcp:list` | List MCP servers |
| `npm run mcp:add:vibium` | Add Vibium MCP server |

## Page Object Model (POM)

This project implements the **Page Object Model** design pattern for maintainable and scalable test automation.

### Generate New Page Object

```bash
node generate-page.cjs <url> <page-name>
```

Example:
```bash
node generate-page.cjs https://google.com google
```

This creates:
- `pages/GooglePage.ts` - Page Object class
- `tests/TS/google-pom.test.ts` - Test file
- Script `npm run test:pom:google`

### Page Object Structure

```
pages/
├── base/
│   └── PageObject.ts    # Base class with common methods
└── EnouvoPage.ts       # Specific page object
```

### Base PageObject Methods

```typescript
async open()           // Start browser and navigate to URL
async close()          // Stop browser
async getTitle()       // Get page title
async getText(selector) // Get element text
async click(selector)  // Click element
async fill(selector, value) // Fill input
async screenshot(filename?) // Take screenshot and move to specified path
async wait(ms)          // Wait for milliseconds
async find(selector)   // Find element
async reload()         // Reload page
async back()           // Navigate back
async forward()        // Navigate forward
```

### Custom Page Object Example

```typescript
import { PageObject } from './base/PageObject.js';

export class MyPage extends PageObject {
    constructor() {
        super('https://example.com');
    }

    async login(username: string, password: string) {
        await this.fill('#username', username);
        await this.fill('#password', password);
        await this.click('button[type="submit"]');
    }
}
```

## Quick Start

```typescript
import { browser } from './index.js';

const vibe = await browser.launch({ headless: false });
await vibe.go('https://enouvo.com');
const screenshot = await vibe.screenshot();
await vibe.quit();
```

## CLI Usage

```bash
# Navigate to a URL (headless)
npx vibium go https://enouvo.com --headless

# Navigate with visible browser
npx vibium go https://enouvo.com

# Take screenshot
npx vibium screenshot -o screenshot.png

# Get page title
npx vibium title

# Map interactive elements
npx vibium map
```

## MCP Setup

To use with Claude CLI:

```bash
# Add Vibium MCP server
claude mcp add vibium "npx -y vibium --project-path D:\AI\vibiumTest"

# List MCP servers
claude mcp list
```

## Project Structure

```
├── index.ts                 # Main entry point (uses Vibium with WebDriver BiDi)
├── tsconfig.json            # TypeScript configuration
├── package.json             # Dependencies
├── generate-page.cjs        # Generate POM from URL
├── create-test.cjs          # Generate CLI test from URL
├── pages/                   # Page Object Model (TypeScript)
│   ├── base/
│   │   └── PageObject.ts   # Base class for all page objects
│   └── EnouvoPage.ts       # Example page object
├── tests/
│   └── TS/                 # TypeScript test files
│       ├── first.test.ts   # Basic test
│       ├── enouvo.test.ts  # Enouvo test (CLI-based)
│       └── enouvo-pom.test.ts  # POM-based test
├── INSTRUCTION.md          # Detailed CLI usage instructions
├── SETUP.md                # This file
├── picture/                # Directory for screenshots
└── dist/                   # Compiled output directory
```

## Dependencies

- `vibium` - Browser automation library using WebDriver BiDi protocol
- `@vibium/win32-x64` - Windows platform support (optional)
- `typescript` - TypeScript compiler
- `tsx` - TypeScript executor

## WebDriver BiDi

Vibium uses WebDriver BiDi (Bidirectional) protocol to communicate with the browser:

- **BiDi connection**: Browser is launched via chromedriver with BiDi protocol enabled
- **WebSocket**: Communication happens over WebSocket for bidirectional messaging
- **Commands & Events**: Send commands to browser, receive events (console, logs, etc.)

### Testing BiDi Connection
```bash
# Test BiDi connection
npx vibium bidi-test

# Launch browser and get BiDi WebSocket URL
npx vibium launch-test

# Test WebSocket
npx vibium ws-test
```
