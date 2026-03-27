# Copilot Instructions

## WebDriver BiDi

This project uses WebDriver BiDi (Bidirectional Protocol) for browser automation. BiDi is a wire protocol that enables bidirectional communication between the automation client and the browser, providing:

- **Bidirectional messaging**: Commands flow from client to browser, while events flow from browser to client
- **Native WebSocket support**: Uses WebSocket for efficient, low-latency communication
- **No HTTP overhead**: Direct socket connection between client and browser

Vibium implements WebDriver BiDi to:
- Launch Chrome via chromedriver with BiDi protocol
- Connect to browser via WebSocket
- Send commands (navigate, click, etc.) and receive events (log, console, etc.)

### Checking WebDriver BiDi Usage
```bash
npx vibium bidi-test    # Test BiDi connection
npx vibium launch-test # Launch browser via BiDi
npx vibium ws-test     # Test WebSocket connection
```

## Vibium CLI Usage

This project uses Vibium for browser automation. Use the following commands:

### Navigation
```bash
npx vibium go <url>           # Navigate to URL (with visible browser)
npx vibium go <url> --headless  # Navigate in headless mode
npx vibium title              # Get page title
npx vibium url                # Get current URL
npx vibium back               # Go back
npx vibium forward            # Go forward
npx vibium reload              # Reload page
```

### Taking Screenshots
```bash
npx vibium screenshot -o filename.png    # Save screenshot
npx vibium screenshot -o filename.png --full-page  # Full page screenshot
```

### Discovering Elements
```bash
npx vibium map                    # Map all interactive elements
npx vibium map --selector "nav"   # Map elements in specific section
npx vibium find text "Sign In"    # Find element by text
npx vibium find label "Email"     # Find input by label
npx vibium find role button       # Find by ARIA role
```

### Interacting with Elements
```bash
npx vibium click "@e1"            # Click element by ref
npx vibium fill "@e1" "text"     # Fill input field
npx vibium type "@e1" "text"     # Type into field (append)
npx vibium hover "@e1"           # Hover over element
npx vibium scroll                # Scroll page
```

### Reading Content
```bash
npx vibium text                  # Get all page text
npx vibium text "h1"             # Get text of specific element
npx vibium html                  # Get page HTML
npx vibium eval "JS expression"  # Run JavaScript
```

### Waiting
```bash
npx vibium wait load             # Wait for page load
npx vibium wait url "/dashboard" # Wait for URL
npx vibium wait ".modal"         # Wait for element
npx vibium sleep 2000           # Sleep for 2 seconds
```

### Session Management
```bash
npx vibium start                 # Start browser session
npx vibium stop                  # Stop browser session
npx vibium daemon start          # Start background browser
npx vibium daemon stop           # Stop daemon
```

### Storage
```bash
npx vibium storage -o auth.json           # Save cookies/storage
npx vibium storage restore auth.json      # Restore saved state
```

## Common Patterns

1. **Simple navigation**:
   ```bash
   npx vibium go https://example.com && npx vibium screenshot -o page.png
   ```

2. **Interactive workflow**:
   ```bash
   npx vibium go https://example.com
   npx vibium map
   npx vibium click "@e1"
   npx vibium screenshot -o after.png
   ```

3. **Fill form**:
   ```bash
   npx vibium go https://example.com/login
   npx vibium fill "input[name=email]" "user@example.com"
   npx vibium fill "input[name=password]" "secret"
   npx vibium click "button[type=submit]"
   ```

## Known Issues

- If you get "connection aborted" errors, kill stale processes:
  ```bash
  taskkill /F /IM vibium.exe /IM chromedriver.exe
  ```

## API (Programmatic Usage)

```typescript
import { browser } from './index.js';

const vibe = await browser.launch({ headless: false });
await vibe.go('https://enouvo.com');
const screenshot = await vibe.screenshot();
await vibe.quit();
```

### Available Methods
- `browser.launch(options?)` - Launch browser
- `page.go(url)` - Navigate
- `page.find(selector)` - Find element
- `page.screenshot()` - Get screenshot as Buffer
- `page.quit()` - Close browser

## Testing

### Running Tests

```bash
# Run enouvo.com website test (CLI-based, recommended)
npm run testEnouvoWebsite

# Run JS tests
npm run testJs
npm run testEnouvo

# Run TypeScript tests
npm run testTs
npm run testEnouvoTs
```

### Writing Tests

**CLI-based test (using spawn):**
```javascript
import { spawn } from 'child_process';

async function runVibium(args) {
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

// Example test
await runVibium(['start']);
await runVibium(['go', 'https://enouvo.com']);
const result = await runVibium(['title']);
await runVibium(['stop']);
```

**Programmatic test:**
```typescript
import { browser } from './index.js';

const vibe = await browser.launch({ headless: false });
await vibe.go('https://enouvo.com');
const screenshot = await vibe.screenshot();
await vibe.quit();
```
