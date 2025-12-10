/**
 * API Server Entry Point
 */

import { createServer } from "http";

const PORT = process.env.PORT || 3001;

const server = createServer((req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host}`);
  
  if (url.pathname === "/api/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok" }));
    return;
  }
  
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not Found");
});

server.listen(PORT, () => {
  console.log(`🚀 API server running at http://localhost:${PORT}`);
});

