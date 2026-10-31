import http from "node:http";
import path from "node:path";
import { readFile } from "node:fs/promises";

const root = process.cwd();
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
};

const server = http.createServer(async (request, response) => {
  if (!["GET", "HEAD"].includes(request.method)) {
    response.writeHead(405, { Allow: "GET, HEAD" }).end();
    return;
  }
  try {
    const url = new URL(request.url, "http://localhost");
    const pathname = decodeURIComponent(url.pathname);
    const relative = pathname === "/" ? "Riscly.html" : pathname.slice(1);
    const file = path.resolve(root, relative);
    const parts = path.relative(root, file).split(path.sep);
    if (parts.some((part) => part.startsWith(".")) || !types[path.extname(file)]) {
      response.writeHead(404).end("Not found");
      return;
    }
    const body = await readFile(file);
    response.writeHead(200, {
      "Content-Type": types[path.extname(file)],
      "X-Content-Type-Options": "nosniff",
    });
    response.end(request.method === "HEAD" ? undefined : body);
  } catch {
    response.writeHead(404).end("Not found");
  }
});

server.on("error", (error) => {
  console.error(`Could not start Riscly: ${error.message}`);
  process.exitCode = 1;
});
server.listen(4173, "127.0.0.1", () => {
  console.log("Riscly: http://localhost:4173 (Ctrl+C to stop)");
});
