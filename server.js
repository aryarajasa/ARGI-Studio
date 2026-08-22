const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const DIR = path.resolve(__dirname);
const DATA_DIR = path.join(DIR, 'data');
const UPLOADS_DIR = path.join(DIR, 'assets', 'uploads');
const AUTH_FILE = path.join(DATA_DIR, 'auth.json');
const PROJECTS_FILE = path.join(DATA_DIR, 'projects.json');
const ARTICLES_FILE = path.join(DATA_DIR, 'articles.json');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');

// Ensure data and uploads directories exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

if (!fs.existsSync(AUTH_FILE)) {
  fs.writeFileSync(AUTH_FILE, JSON.stringify({ passcode: "argi2026", updatedAt: new Date().toISOString() }, null, 2));
}

if (!fs.existsSync(INQUIRIES_FILE)) {
  fs.writeFileSync(INQUIRIES_FILE, JSON.stringify([], null, 2));
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
  '.webmanifest': 'application/manifest+json',
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

      // 3. Media Upload API
      if (reqPath === '/api/upload' && req.method === 'POST') {
        const body = await readRequestBody(req);
        if (!body.data) {
          return sendJson(res, 400, { success: false, message: 'No file data received' });
        }

        // Parse Data URL: data:image/png;base64,....
        let base64Data = body.data;
        let ext = '.png';
        
        if (base64Data.includes(';base64,')) {
          const parts = base64Data.split(';base64,');
          const mime = parts[0].replace('data:', '');
          base64Data = parts[1];
          
          if (mime.includes('jpeg') || mime.includes('jpg')) ext = '.jpg';
          else if (mime.includes('png')) ext = '.png';
          else if (mime.includes('webp')) ext = '.webp';
          else if (mime.includes('svg')) ext = '.svg';
          else if (mime.includes('gif')) ext = '.gif';
          else if (mime.includes('mp4')) ext = '.mp4';
          else if (mime.includes('avif')) ext = '.avif';
        }

        const rawName = (body.filename || 'media').toLowerCase().replace(/[^a-z0-9_-]/g, '_');
        const cleanName = path.parse(rawName).name || 'asset';
        const finalFilename = `upload_${Date.now()}_${cleanName}${ext}`;
        const targetPath = path.join(UPLOADS_DIR, finalFilename);

        const buffer = Buffer.from(base64Data, 'base64');
        fs.writeFileSync(targetPath, buffer);

        const relativeUrl = `assets/uploads/${finalFilename}`;
        return sendJson(res, 200, {
          success: true,
          url: relativeUrl,
          filename: finalFilename,
          size: buffer.length,
          message: 'Media uploaded successfully'
        });
      }

      // 4. Projects API
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

      // 5. Articles API
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

      // 6. Inquiries API
      if (reqPath === '/api/inquiries') {
        if (req.method === 'GET') {
          if (!fs.existsSync(INQUIRIES_FILE)) {
            return sendJson(res, 200, []);
          }
          const inquiries = JSON.parse(fs.readFileSync(INQUIRIES_FILE, 'utf-8'));
          return sendJson(res, 200, inquiries);
        }

        if (req.method === 'POST') {
          const body = await readRequestBody(req);
          const inquiries = fs.existsSync(INQUIRIES_FILE) ? JSON.parse(fs.readFileSync(INQUIRIES_FILE, 'utf-8')) : [];
          const newInquiry = {
            id: 'inq_' + Date.now(),
            date: new Date().toISOString(),
            clientName: body.name || body.clientName || 'Anonymous',
            clientEmail: body.email || body.clientEmail || '',
            disciplines: body.disciplines || [],
            details: body.details || body.message || '',
            status: 'new'
          };
          inquiries.unshift(newInquiry);
          fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), 'utf-8');
          return sendJson(res, 200, { success: true, message: 'Inquiry received and logged', inquiry: newInquiry });
        }
      }

      return sendJson(res, 404, { error: 'Endpoint not found' });
    } catch (err) {
      console.error('API Error:', err);
      return sendJson(res, 500, { error: err.message || 'Internal Server Error' });
    }
  }

  // --- STATIC FILE SERVING & CLEAN URL REWRITES ---
  if (reqPath === '/') reqPath = '/index.html';
  else if (reqPath.startsWith('/project/') || reqPath === '/project') reqPath = '/project.html';
  else if (reqPath.startsWith('/article/') || reqPath === '/article' || reqPath.startsWith('/journal/') || reqPath === '/journal') reqPath = '/article.html';

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
