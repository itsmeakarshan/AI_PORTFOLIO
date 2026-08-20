/**
 * Local Development Server for Portfolio + Gemini AI Chatbot
 * Serves static files and handles /api/chat serverless endpoint using Node.js
 */

const http = require("http");
const fs = require("fs");
const path = require("path");

// Load .env file variables into process.env
if (fs.existsSync(".env")) {
  const envText = fs.readFileSync(".env", "utf8");
  envText.split("\n").forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const idx = trimmed.indexOf("=");
      if (idx !== -1) {
        const key = trimmed.substring(0, idx).trim();
        const val = trimmed.substring(idx + 1).trim();
        if (key && val) {
          process.env[key] = val;
        }
      }
    }
  });
}

const chatHandler = require("./api/chat.js").default;
const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".mp4": "video/mp4",
  ".pdf": "application/pdf",
  ".json": "application/json",
  ".ico": "image/x-icon"
};

const server = http.createServer((req, res) => {
  // Mock Vercel response helper functions if needed
  res.status = function (code) {
    res.statusCode = code;
    return this;
  };

  res.json = function (obj) {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(obj));
    return this;
  };

  // Route /api/chat requests to Vercel Serverless function handler
  if (req.url.startsWith("/api/chat")) {
    if (req.method === "POST") {
      let body = "";
      req.on("data", chunk => { body += chunk; });
      req.on("end", async () => {
        try {
          req.body = JSON.parse(body || "{}");
        } catch (e) {
          req.body = {};
        }
        try {
          await chatHandler(req, res);
        } catch (err) {
          console.error("API Handler Error:", err);
          res.status(500).json({ error: "Server handler error", message: err.message });
        }
      });
      return;
    } else {
      return chatHandler(req, res);
    }
  }

  // Serve static files with HTTP Range Request support for HTML5 video scrubbing
  let safePath = req.url.split("?")[0];
  if (safePath === "/") safePath = "/index.html";

  try {
    safePath = decodeURIComponent(safePath);
  } catch (e) {}

  const filePath = path.join(__dirname, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      return res.end("404 Not Found");
    }

    const ext = path.extname(filePath).toLowerCase();
    const mimeType = MIME_TYPES[ext] || "application/octet-stream";
    const fileSize = stats.size;
    const range = req.headers.range;

    // Range Request handling for video scrubbing (HTTP 206 Partial Content)
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      if (start >= fileSize || end >= fileSize) {
        res.writeHead(416, { "Content-Range": `bytes */${fileSize}` });
        return res.end();
      }

      const chunkSize = (end - start) + 1;
      const fileStream = fs.createReadStream(filePath, { start, end });

      res.writeHead(206, {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": mimeType
      });

      fileStream.pipe(res);
    } else {
      res.writeHead(200, {
        "Content-Length": fileSize,
        "Accept-Ranges": "bytes",
        "Content-Type": mimeType
      });

      fs.createReadStream(filePath).pipe(res);
    }
  });
});

server.listen(PORT, () => {
  console.log(`\n🚀 Portfolio & Gemini AI Assistant Server running at: http://localhost:${PORT}\n`);
});
