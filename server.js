const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const DIR = path.resolve(__dirname);
const DATA_DIR = path.join(DIR, 'data');
const AUTH_FILE = path.join(DATA_DIR, 'auth.json');
const PROJECTS_FILE = path.join(DATA_DIR, 'projects.json');
const ARTICLES_FILE = path.join(DATA_DIR, 'articles.json');

// Ensure data directory and auth config exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

if (!fs.existsSync(AUTH_FILE)) {
  fs.writeFileSync(AUTH_FILE, JSON.stringify({ passcode: "argi2026", updatedAt: new Date().toISOString() }, null, 2));
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.avif': 'image/avif',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

const readRequestBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
};

const sendJson = (res, statusCode, data) => {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data));
};

const server = http.createServer(async (req, res) => {
  const urlParts = req.url.split('?');
  let reqPath = decodeURI(urlParts[0]);

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    return res.end();
  }

  // --- API ROUTES ---
  if (reqPath.startsWith('/api/')) {
    try {
      // 1. Password Verification
      if (reqPath === '/api/auth/verify' && req.method === 'POST') {
        const body = await readRequestBody(req);
        const authData = JSON.parse(fs.readFileSync(AUTH_FILE, 'utf-8'));
        if (body.passcode === authData.passcode) {
          return sendJson(res, 200, { success: true, token: Buffer.from(body.passcode).toString('base64'), message: 'Authenticated' });
        } else {
          return sendJson(res, 401, { success: false, message: 'Invalid Studio Passcode' });
        }
      }

      // 2. Change Passcode
      if (reqPath === '/api/auth/change-password' && req.method === 'POST') {
        const body = await readRequestBody(req);
        const authData = JSON.parse(fs.readFileSync(AUTH_FILE, 'utf-8'));
        if (body.currentPasscode !== authData.passcode) {
          return sendJson(res, 401, { success: false, message: 'Current passcode is incorrect' });
        }
        if (!body.newPasscode || body.newPasscode.length < 4) {
          return sendJson(res, 400, { success: false, message: 'New passcode must be at least 4 characters' });
        }
        authData.passcode = body.newPasscode;
        authData.updatedAt = new Date().toISOString();
        fs.writeFileSync(AUTH_FILE, JSON.stringify(authData, null, 2));
        return sendJson(res, 200, { success: true, message: 'Passcode updated successfully' });
      }

      // 3. Projects API
      if (reqPath === '/api/projects') {
        if (req.method === 'GET') {
          if (!fs.existsSync(PROJECTS_FILE)) {
            return sendJson(res, 200, {});
          }
          const projects = JSON.parse(fs.readFileSync(PROJECTS_FILE, 'utf-8'));
          return sendJson(res, 200, projects);
        }

        if (req.method === 'POST') {
          const body = await readRequestBody(req);
          fs.writeFileSync(PROJECTS_FILE, JSON.stringify(body, null, 2), 'utf-8');
          return sendJson(res, 200, { success: true, message: 'Projects saved successfully', count: Object.keys(body).length });
        }
      }

      // 4. Articles API
      if (reqPath === '/api/articles') {
        if (req.method === 'GET') {
          if (!fs.existsSync(ARTICLES_FILE)) {
            return sendJson(res, 200, {});
          }
          const articles = JSON.parse(fs.readFileSync(ARTICLES_FILE, 'utf-8'));
          return sendJson(res, 200, articles);
        }

        if (req.method === 'POST') {
          const body = await readRequestBody(req);
          fs.writeFileSync(ARTICLES_FILE, JSON.stringify(body, null, 2), 'utf-8');
          return sendJson(res, 200, { success: true, message: 'Articles saved successfully', count: Object.keys(body).length });
        }
      }

      return sendJson(res, 404, { error: 'Endpoint not found' });
    } catch (err) {
      console.error('API Error:', err);
      return sendJson(res, 500, { error: err.message || 'Internal Server Error' });
    }
  }

  // --- STATIC FILE SERVING ---
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(DIR, reqPath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`ARGI Studio local server running at: http://localhost:${PORT}`);
});
