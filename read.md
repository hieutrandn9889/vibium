# Setup MCP server
npm install -g @anthropic-ai/claude-code

# check version
claude --version

# Setup mcp config
claude mcp add vibium "npx -y vibium --project-path D:\AI\vibiumTest"
# Result 
File modified: C:\Users\hieu.tran8\.claude.json [project: D:\AI\vibiumTest]

# check mcp 
claude mcp list