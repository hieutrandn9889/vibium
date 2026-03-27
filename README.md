# Vibium Project

Browser automation library for AI agents using the Vibium package.

## Overview

This project provides browser automation capabilities using the Vibium library. It includes TypeScript configuration, example tests, and MCP (Model Context Protocol) integration for Claude.

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
| `npm run mcp:list` | List MCP servers |
| `npm run mcp:add:vibium` | Add Vibium MCP server |

## Quick Start

```typescript
import { browser } from './index.js';

const vibe = await browser.launch({ headless: false });
await vibe.go('https://enouvo.com');
const screenshot = await vibe.screenshot();
await vibe.quit();
```

## API

- `browser.launch(options?)` - Launch a new browser instance
- `page.go(url)` - Navigate to URL
- `page.find(selector, options?)` - Find element by selector
- `page.screenshot()` - Take screenshot (returns Buffer)
- `page.quit()` - Close browser

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
├── index.ts          # Main entry point
├── index.js          # Compiled output
├── tsconfig.json     # TypeScript configuration
├── package.json      # Dependencies
├── tests/
│   ├── JS/           # JavaScript test files
│   └── TS/           # TypeScript test files
└── dist/             # Compiled output directory
```

## Dependencies

- `vibium` - Browser automation library
- `@vibium/win32-x64` - Windows platform support (optional)
- `typescript` - TypeScript compiler
- `tsx` - TypeScript executor