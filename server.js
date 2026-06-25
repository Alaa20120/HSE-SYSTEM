const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const os = require('os');
const LocalDB = require('./localdb');

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory Session Manager & Active Session Tracker
const sessions = {}; // token -> { email, name, role }
const activeUsers = {}; // email -> { email, name, role, ip, userAgent, lastActive }

// Seed default users if users collection is empty
async function seedUsers() {
  try {
    const users = await LocalDB.getAll('users');
    if (users.length === 0) {
      console.log("[INFO] Seeding default users...");
      const defaultUsers = [
        {
          email: "ashrf@aban.com",
          name: "Ashraf (Manager)",
          role: "admin",
          passwordHash: crypto.createHash('sha256').update("ashrf@aban").digest('hex')
        },
        {
          email: "alaa@aban.com",
          name: "Alaa (Manager)",
          role: "admin",
          passwordHash: crypto.createHash('sha256').update("alaa@aban").digest('hex')
        },
        {
          email: "abdulah@aban.com",
          name: "Abdullah",
          role: "user",
          passwordHash: crypto.createHash('sha256').update("abdulah@aban").digest('hex')
        }
      ];
      for (const u of defaultUsers) {
        await LocalDB.insert('users', u);
      }
      console.log("[INFO] Seeded 3 users successfully.");
    }
  } catch (err) {
    console.error("Failed to seed users:", err);
  }
}

// Auth Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: "Access denied. Token missing." });
  }
  
  const user = sessions[token];
  if (!user) {
    return res.status(403).json({ error: "Access denied. Invalid or expired session." });
  }
  
  // Attach user profile to request
  req.user = user;
  
  // Mark user as active from their API request
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
  const userAgent = req.headers['user-agent'] || 'Unknown Device';
  activeUsers[user.email] = {
    email: user.email,
    name: user.name,
    role: user.role,
    ip: ip.replace('::ffff:', ''),
    userAgent,
    lastActive: Date.now()
  };
  
  next();
}

// Admin-only Access Middleware
function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: "Access denied. Admin privileges required." });
  }
  next();
}

// Activity Logging Middleware
async function logUserActivity(req, res, next) {
  // Only intercept modifying requests (POST, PUT, DELETE) that are not auth endpoints
  if (['POST', 'PUT', 'DELETE'].includes(req.method) && !req.path.startsWith('/api/auth/')) {
    const originalSend = res.send;
    
    res.send = function (data) {
      res.send = originalSend;
      res.send(data);
      
      // Execute logging asynchronously after request completes successfully
      if (res.statusCode >= 200 && res.statusCode < 300 && req.user) {
        try {
          const parsedData = JSON.parse(data);
          let actionText = '';
          const pathParts = req.path.split('/');
          const collection = pathParts[2]; // e.g. 'workers', 'ptws', 'activities'
          
          let recordIdentifier = parsedData.id || req.params.id || '';
          if (collection === 'workers') {
            recordIdentifier = parsedData.name ? `${parsedData.name} (${parsedData.code})` : recordIdentifier;
          } else if (collection === 'ptws') {
            recordIdentifier = parsedData.permitNo ? `Permit No ${parsedData.permitNo}` : recordIdentifier;
          } else if (collection === 'activities') {
            recordIdentifier = parsedData.activityName ? `Activity: "${parsedData.activityName}"` : recordIdentifier;
          } else if (collection === 'memos') {
            recordIdentifier = parsedData.subject ? `Memo: "${parsedData.subject}"` : recordIdentifier;
          }
          
          if (req.method === 'POST') {
            actionText = `Created ${collection} record: ${recordIdentifier}`;
          } else if (req.method === 'PUT') {
            actionText = `Updated ${collection} record ID ${req.params.id || parsedData.id}`;
          } else if (req.method === 'DELETE') {
            actionText = `Deleted ${collection} record ID ${req.params.id}`;
          }
          
          if (actionText) {
            LocalDB.insert('activity_logs', {
              email: req.user.email,
              name: req.user.name,
              action: actionText,
              timestamp: new Date().toISOString()
            }).catch(err => console.error("Failed to insert activity log:", err));
          }
        } catch (e) {
          // Ignore parsing errors (e.g. if response is not JSON)
        }
      }
    };
  }
  next();
}

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Protect all /api endpoints except /api/auth/login
app.use('/api', (req, res, next) => {
  if (req.path === '/auth/login') {
    return next();
  }
  return authenticateToken(req, res, next);
});

// Apply activity logger on all modifying API calls
app.use('/api', logUserActivity);

// Setup Directories for main permit documents, photos, and reports
const UPLOADS_DIR = path.join(__dirname, 'uploads', 'ptw');
const MAIN_DIR = path.join(__dirname, 'uploads', 'ptw', 'main');
const PHOTOS_DIR = path.join(__dirname, 'uploads', 'ptw', 'photos');
const REPORTS_DIR = path.join(__dirname, 'uploads', 'ptw', 'reports');

[MAIN_DIR, PHOTOS_DIR, REPORTS_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Serve public static folder
app.use(express.static(path.join(__dirname, 'public')));
// Serve uploads folder so browser can view/download uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure Advanced Multer for handling multiple upload fields (permit document, photos, reports)
const advancedStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'ptwFile') {
      cb(null, MAIN_DIR);
    } else if (file.fieldname === 'ptwPhotos') {
      cb(null, PHOTOS_DIR);
    } else if (file.fieldname === 'ptwReports') {
      cb(null, REPORTS_DIR);
    } else {
      cb(null, UPLOADS_DIR);
    }
  },
  filename: function (req, file, cb) {
    const fileExt = path.extname(file.originalname);
    const safeName = path.basename(file.originalname, fileExt)
      .replace(/[^a-zA-Z0-9]/g, '_')
      .substring(0, 30);
    cb(null, `${file.fieldname}_${Date.now()}_${safeName}${fileExt}`);
  }
});

const uploadFields = multer({
  storage: advancedStorage,
  limits: { fileSize: 20 * 1024 * 1024 } // 20MB limit
}).fields([
  { name: 'ptwFile', maxCount: 1 },
  { name: 'ptwPhotos', maxCount: 10 },
  { name: 'ptwReports', maxCount: 10 }
]);

// Helper for sending error responses
const handleError = (res, error, msg = "Internal server error") => {
  console.error(error);
  res.status(500).json({ error: msg, details: error.message });
};

function todayDateString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function parseDateOnly(dateStr) {
  if (!dateStr) return null;
  const match = String(dateStr).match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) {
    const parsed = new Date(dateStr);
    return isNaN(parsed.getTime()) ? null : parsed;
  }
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

function resolvePublicUploadPath(publicPath) {
  if (!publicPath) return null;
  const relativePath = String(publicPath).replace(/^\/+/, '').replace(/\//g, path.sep);
  return path.join(__dirname, relativePath);
}

function deletePhysicalFile(publicPath) {
  const physicalPath = resolvePublicUploadPath(publicPath);
  if (physicalPath && fs.existsSync(physicalPath)) {
    try { fs.unlinkSync(physicalPath); } catch (_) {}
  }
}

function collectFileMetadata(files = [], publicDir) {
  return files.map(file => ({
    name: file.originalname,
    path: `${publicDir}/${file.filename}`,
    fileType: file.mimetype
  }));
}

// ==========================================
// AUTHENTICATION ROUTES
// ==========================================

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password, loginType } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    
    // Find user by email
    const users = await LocalDB.getAll('users');
    const user = users.find(u => String(u.email).toLowerCase() === String(email).toLowerCase().trim());
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    
    // Validate password hash
    const inputHash = crypto.createHash('sha256').update(password).digest('hex');
    if (user.passwordHash !== inputHash) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Role verification based on login gateway chosen
    if (loginType === 'manager' && user.role !== 'admin') {
      return res.status(403).json({ error: "Access Denied: Standard accounts cannot log in to the Manager Command Center." });
    }
    
    // Generate secure session token
    const token = crypto.randomBytes(32).toString('hex');
    sessions[token] = {
      email: user.email,
      name: user.name,
      role: user.role
    };
    
    // Track active state
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    const userAgent = req.headers['user-agent'] || 'Unknown Device';
    activeUsers[user.email] = {
      email: user.email,
      name: user.name,
      role: user.role,
      ip: ip.replace('::ffff:', ''),
      userAgent,
      lastActive: Date.now()
    };
    
    // Create login activity log
    await LocalDB.insert('activity_logs', {
      email: user.email,
      name: user.name,
      action: `Logged into the system`,
      timestamp: new Date().toISOString()
    });
    
    res.json({
      token,
      email: user.email,
      name: user.name,
      role: user.role
    });
  } catch (err) {
    handleError(res, err, "Failed to login");
  }
});

app.post('/api/auth/logout', authenticateToken, async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token) {
      delete sessions[token];
    }
    
    // Also remove from active users in memory
    if (req.user && req.user.email) {
      delete activeUsers[req.user.email];
    }
    
    res.json({ message: "Logged out successfully" });
  } catch (err) {
    handleError(res, err, "Failed to logout");
  }
});

app.get('/api/auth/heartbeat', authenticateToken, (req, res) => {
  // authenticateToken already updates activeUsers[user.email].lastActive
  res.json({ status: "ok", role: req.user.role });
});

// ==========================================
// ADMIN / CONTROL PANEL ROUTES
// ==========================================

app.get('/api/admin/active-sessions', authenticateToken, requireAdmin, (req, res) => {
  const threshold = Date.now() - 60 * 1000; // 60 seconds of inactivity
  const list = Object.values(activeUsers).filter(u => u.lastActive > threshold);
  res.json(list);
});

app.get('/api/admin/activity-logs', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const logs = await LocalDB.getAll('activity_logs');
    // Sort logs by date descending and return last 50
    const sorted = logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 50);
    res.json(sorted);
  } catch (err) {
    handleError(res, err, "Failed to load activity logs");
  }
});

// ==========================================
// API ROUTES: WORKERS
// ==========================================
app.get('/api/workers', async (req, res) => {
  try {
    const workers = await LocalDB.getAll('workers');
    res.json(workers);
  } catch (err) {
    handleError(res, err, "Failed to load workers");
  }
});

app.post('/api/workers', async (req, res) => {
  try {
    const { name, code, jobTitle, site, status, trainingCompleted } = req.body;
    if (!name || !code) {
      return res.status(400).json({ error: "Worker Name and ID/Code are required" });
    }
    const newWorker = await LocalDB.insert('workers', {
      name,
      code,
      jobTitle: jobTitle || 'Worker',
      site: site || 'Unassigned',
      status: status || 'Active',
      trainingCompleted: Array.isArray(trainingCompleted) ? trainingCompleted : []
    });
    res.status(201).json(newWorker);
  } catch (err) {
    handleError(res, err, "Failed to add worker");
  }
});

app.put('/api/workers/:id', async (req, res) => {
  try {
    const updated = await LocalDB.update('workers', req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    handleError(res, err, "Failed to update worker");
  }
});

app.delete('/api/workers/:id', async (req, res) => {
  try {
    const success = await LocalDB.delete('workers', req.params.id);
    if (!success) return res.status(404).json({ error: "Worker not found" });
    res.json({ message: "Worker deleted successfully" });
  } catch (err) {
    handleError(res, err, "Failed to delete worker");
  }
});


// ==========================================
// API ROUTES: DAILY ACTIVITIES
// ==========================================
app.get('/api/activities', async (req, res) => {
  try {
    const activities = await LocalDB.getAll('activities');
    res.json(activities);
  } catch (err) {
    handleError(res, err, "Failed to load activities");
  }
});

app.post('/api/activities', async (req, res) => {
  try {
    const { date, site, activityName, supervisor, status, workersInvolved, hazardsIdentified, actionsTaken, ptwId } = req.body;
    if (!date || !activityName || !site) {
      return res.status(400).json({ error: "Date, Site, and Activity Name are required" });
    }
    const newActivity = await LocalDB.insert('activities', {
      date,
      site,
      activityName,
      supervisor: supervisor || 'N/A',
      status: status || 'Planned',
      workersInvolved: Array.isArray(workersInvolved) ? workersInvolved : [],
      hazardsIdentified: hazardsIdentified || '',
      actionsTaken: actionsTaken || '',
      ptwId: ptwId || null
    });
    res.status(201).json(newActivity);
  } catch (err) {
    handleError(res, err, "Failed to create activity");
  }
});

app.put('/api/activities/:id', async (req, res) => {
  try {
    const updated = await LocalDB.update('activities', req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    handleError(res, err, "Failed to update activity");
  }
});

app.delete('/api/activities/:id', async (req, res) => {
  try {
    const success = await LocalDB.delete('activities', req.params.id);
    if (!success) return res.status(404).json({ error: "Activity not found" });
    res.json({ message: "Activity deleted successfully" });
  } catch (err) {
    handleError(res, err, "Failed to delete activity");
  }
});


// ==========================================
// API ROUTES: PERMIT TO WORK (PTW)
// ==========================================
app.get('/api/ptws', async (req, res) => {
  try {
    const ptws = await LocalDB.getAll('ptws');
    res.json(ptws);
  } catch (err) {
    handleError(res, err, "Failed to load PTWs");
  }
});

// Advanced Multi-file Upload endpoint
app.post('/api/ptws/upload', (req, res) => {
  uploadFields(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: "Multer upload error", details: err.message });
    } else if (err) {
      return res.status(500).json({ error: "Unknown upload error", details: err.message });
    }

    try {
      const { permitNo, type, issueDate, expiryDate, site, description, status } = req.body;
      if (!permitNo || !type) {
        // Cleanup uploaded files if bad request
        if (req.files) {
          if (req.files.ptwFile && req.files.ptwFile[0]) {
            try { fs.unlinkSync(req.files.ptwFile[0].path); } catch (_) {}
          }
          if (req.files.ptwPhotos) {
            req.files.ptwPhotos.forEach(p => {
              try { fs.unlinkSync(p.path); } catch (_) {}
            });
          }
          if (req.files.ptwReports) {
            req.files.ptwReports.forEach(r => {
              try { fs.unlinkSync(r.path); } catch (_) {}
            });
          }
        }
        return res.status(400).json({ error: "Permit Number and Type are required" });
      }

      // Collect main file details
      let mainFile = null;
      if (req.files && req.files.ptwFile && req.files.ptwFile[0]) {
        const file = req.files.ptwFile[0];
        mainFile = {
          fileName: file.originalname,
          filePath: `/uploads/ptw/main/${file.filename}`,
          fileType: file.mimetype
        };
      } else {
        return res.status(400).json({ error: "Permit main document file is required" });
      }

      // Collect photo details
      const photos = [];
      if (req.files && req.files.ptwPhotos) {
        req.files.ptwPhotos.forEach(file => {
          photos.push({
            name: file.originalname,
            path: `/uploads/ptw/photos/${file.filename}`
          });
        });
      }

      // Collect report details
      const reports = [];
      if (req.files && req.files.ptwReports) {
        req.files.ptwReports.forEach(file => {
          reports.push({
            name: file.originalname,
            path: `/uploads/ptw/reports/${file.filename}`
          });
        });
      }

      const newPtw = await LocalDB.insert('ptws', {
        permitNo,
        type,
        issueDate: issueDate || todayDateString(),
        expiryDate: expiryDate || '',
        site: site || 'Unassigned',
        description: description || '',
        status: status || 'Active',
        fileName: mainFile.fileName,
        filePath: mainFile.filePath,
        fileType: mainFile.fileType,
        photos,
        reports
      });

      res.status(201).json(newPtw);
    } catch (dbErr) {
      handleError(res, dbErr, "Failed to save advanced PTW record");
    }
  });
});

app.put('/api/ptws/:id/upload', (req, res) => {
  uploadFields(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: "Multer upload error", details: err.message });
    } else if (err) {
      return res.status(500).json({ error: "Unknown upload error", details: err.message });
    }

    try {
      const existing = await LocalDB.getById('ptws', req.params.id);
      if (!existing) return res.status(404).json({ error: "PTW not found" });

      const { permitNo, type, issueDate, expiryDate, site, description, status } = req.body;
      if (!permitNo || !type) {
        return res.status(400).json({ error: "Permit Number and Type are required" });
      }

      const nextRecord = {
        ...existing,
        permitNo,
        type,
        issueDate: issueDate || existing.issueDate || todayDateString(),
        expiryDate: expiryDate || '',
        site: site || existing.site || 'Unassigned',
        description: description || '',
        status: status || existing.status || 'Active',
        photos: Array.isArray(existing.photos) ? [...existing.photos] : [],
        reports: Array.isArray(existing.reports) ? [...existing.reports] : []
      };

      if (req.files && req.files.ptwFile && req.files.ptwFile[0]) {
        const file = req.files.ptwFile[0];
        deletePhysicalFile(existing.filePath);
        nextRecord.fileName = file.originalname;
        nextRecord.filePath = `/uploads/ptw/main/${file.filename}`;
        nextRecord.fileType = file.mimetype;
      }

      if (!nextRecord.filePath) {
        return res.status(400).json({ error: "Permit main document file is required" });
      }

      if (req.files && req.files.ptwPhotos) {
        nextRecord.photos.push(...collectFileMetadata(req.files.ptwPhotos, '/uploads/ptw/photos'));
      }

      if (req.files && req.files.ptwReports) {
        nextRecord.reports.push(...collectFileMetadata(req.files.ptwReports, '/uploads/ptw/reports'));
      }

      const updated = await LocalDB.update('ptws', req.params.id, nextRecord);
      res.json(updated);
    } catch (dbErr) {
      handleError(res, dbErr, "Failed to update PTW files");
    }
  });
});

app.put('/api/ptws/:id', async (req, res) => {
  try {
    const updated = await LocalDB.update('ptws', req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    handleError(res, err, "Failed to update PTW record");
  }
});

app.delete('/api/ptws/:id', async (req, res) => {
  try {
    const ptw = await LocalDB.getById('ptws', req.params.id);
    if (!ptw) return res.status(404).json({ error: "PTW not found" });

    // Try deleting the physical main permit file
    if (ptw.filePath) {
      deletePhysicalFile(ptw.filePath);
    }

    // Try deleting JSA/site photos
    if (Array.isArray(ptw.photos)) {
      ptw.photos.forEach(photo => {
        deletePhysicalFile(photo.path);
      });
    }

    // Try deleting reports
    if (Array.isArray(ptw.reports)) {
      ptw.reports.forEach(report => {
        deletePhysicalFile(report.path);
      });
    }

    await LocalDB.delete('ptws', req.params.id);
    res.json({ message: "PTW record and physical files deleted successfully" });
  } catch (err) {
    handleError(res, err, "Failed to delete PTW record");
  }
});


// ==========================================
// SCALED SAFETY SYSTEM CRUD ENDPOINTS
// ==========================================

function registerCrudRoutes(app, endpoint, collectionName, requiredFields = []) {
  app.get(`/api/${endpoint}`, async (req, res) => {
    try {
      const items = await LocalDB.getAll(collectionName);
      res.json(items);
    } catch (err) {
      handleError(res, err, `Failed to load ${collectionName}`);
    }
  });

  app.post(`/api/${endpoint}`, async (req, res) => {
    try {
      for (const field of requiredFields) {
        if (!req.body[field]) {
          return res.status(400).json({ error: `Field '${field}' is required` });
        }
      }
      const newItem = await LocalDB.insert(collectionName, req.body);
      res.status(201).json(newItem);
    } catch (err) {
      handleError(res, err, `Failed to create ${collectionName}`);
    }
  });

  app.put(`/api/${endpoint}/:id`, async (req, res) => {
    try {
      const updated = await LocalDB.update(collectionName, req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      handleError(res, err, `Failed to update ${collectionName}`);
    }
  });

  app.delete(`/api/${endpoint}/:id`, async (req, res) => {
    try {
      const success = await LocalDB.delete(collectionName, req.params.id);
      if (!success) return res.status(404).json({ error: `${collectionName} not found` });
      res.json({ message: `${collectionName} deleted successfully` });
    } catch (err) {
      handleError(res, err, `Failed to delete ${collectionName}`);
    }
  });
}

// 1. Registers
registerCrudRoutes(app, 'equipment', 'equipment', ['equipmentNo', 'type']);
registerCrudRoutes(app, 'store', 'store', ['itemName', 'status']);
registerCrudRoutes(app, 'maintenance', 'maintenance', ['equipmentName', 'date']);
registerCrudRoutes(app, 'incidents', 'incidents', ['incidentNo', 'date']);
registerCrudRoutes(app, 'safe-hours', 'safe_hours', ['date']);
registerCrudRoutes(app, 'emergency-teams', 'emergency_teams', ['teamType']);

// 2. Checklists
registerCrudRoutes(app, 'pre-operation', 'checklists_pre_op', ['equipmentNo', 'date']);
registerCrudRoutes(app, 'equipment-readiness', 'checklists_readiness', ['equipmentId', 'date']);
registerCrudRoutes(app, 'task-workers', 'checklists_workers', ['taskTitle', 'date']);
registerCrudRoutes(app, 'emergency-checklists', 'checklists_emergency', ['date']);
registerCrudRoutes(app, 'tbt-register', 'checklists_tbt', ['taskTitle', 'date']);
registerCrudRoutes(app, 'attendance-exit', 'checklists_attendance', ['date']);

// 3. Plans
registerCrudRoutes(app, 'method-statements', 'plans_method_statement', ['activityDescription', 'date']);
registerCrudRoutes(app, 'lifting-plans', 'plans_lifting', ['loadWeight', 'date']);
registerCrudRoutes(app, 'emergency-plans', 'plans_emergency', ['hazards', 'date']);
registerCrudRoutes(app, 'memos', 'memos', ['subject', 'date']);


// ==========================================
// API ROUTES: RISK ASSESSMENTS
// ==========================================
app.get('/api/risk-assessments', async (req, res) => {
  try {
    const assessments = await LocalDB.getAll('risk_assessments');
    res.json(assessments);
  } catch (err) {
    handleError(res, err, "Failed to load risk assessments");
  }
});

app.post('/api/risk-assessments', async (req, res) => {
  try {
    const { activity, date, assessor, site, hazards } = req.body;
    if (!activity || !date || !assessor) {
      return res.status(400).json({ error: "Activity title, Date, and Assessor name are required" });
    }
    const newAssessment = await LocalDB.insert('risk_assessments', {
      activity,
      date,
      assessor,
      site: site || 'Unassigned',
      hazards: Array.isArray(hazards) ? hazards : [] // Array of { id, step, hazard, consequence, initialL, initialS, initialR, controls, residualL, residualS, residualR, actionParty }
    });
    res.status(201).json(newAssessment);
  } catch (err) {
    handleError(res, err, "Failed to create risk assessment");
  }
});

app.put('/api/risk-assessments/:id', async (req, res) => {
  try {
    const updated = await LocalDB.update('risk_assessments', req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    handleError(res, err, "Failed to update risk assessment");
  }
});

app.delete('/api/risk-assessments/:id', async (req, res) => {
  try {
    const success = await LocalDB.delete('risk_assessments', req.params.id);
    if (!success) return res.status(404).json({ error: "Assessment not found" });
    res.json({ message: "Assessment deleted successfully" });
  } catch (err) {
    handleError(res, err, "Failed to delete assessment");
  }
});


// ==========================================
// API ROUTES: TRAINING LOGS
// ==========================================
app.get('/api/trainings', async (req, res) => {
  try {
    const trainings = await LocalDB.getAll('training');
    res.json(trainings);
  } catch (err) {
    handleError(res, err, "Failed to load training sessions");
  }
});

app.post('/api/trainings', async (req, res) => {
  try {
    const { title, date, trainer, site, duration, attendees, remarks } = req.body;
    if (!title || !date || !trainer) {
      return res.status(400).json({ error: "Title, Date, and Trainer are required" });
    }
    const newTraining = await LocalDB.insert('training', {
      title,
      date,
      trainer,
      site: site || 'Unassigned',
      duration: duration || '',
      attendees: Array.isArray(attendees) ? attendees : [], // Worker IDs
      remarks: remarks || ''
    });
    res.status(201).json(newTraining);
  } catch (err) {
    handleError(res, err, "Failed to log training session");
  }
});

app.put('/api/trainings/:id', async (req, res) => {
  try {
    const updated = await LocalDB.update('training', req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    handleError(res, err, "Failed to update training session");
  }
});

app.delete('/api/trainings/:id', async (req, res) => {
  try {
    const success = await LocalDB.delete('training', req.params.id);
    if (!success) return res.status(404).json({ error: "Training not found" });
    res.json({ message: "Training log deleted successfully" });
  } catch (err) {
    handleError(res, err, "Failed to delete training log");
  }
});


// ==========================================
// API ROUTES: NEAR MISS REPORTS
// ==========================================
app.get('/api/near-misses', async (req, res) => {
  try {
    const nearMisses = await LocalDB.getAll('near_misses');
    res.json(nearMisses);
  } catch (err) {
    handleError(res, err, "Failed to load near misses");
  }
});

app.post('/api/near-misses', async (req, res) => {
  try {
    const { date, time, site, description, potentialSeverity, correctiveAction, reporter, status } = req.body;
    if (!date || !description || !site) {
      return res.status(400).json({ error: "Date, Site, and Description are required" });
    }
    const newNearMiss = await LocalDB.insert('near_misses', {
      date,
      time: time || '00:00',
      site,
      description,
      potentialSeverity: potentialSeverity || 'Low', // Low, Medium, High
      correctiveAction: correctiveAction || '',
      reporter: reporter || 'Anonymous',
      status: status || 'Open' // Open, Investigating, Closed
    });
    res.status(201).json(newNearMiss);
  } catch (err) {
    handleError(res, err, "Failed to record near miss");
  }
});

app.put('/api/near-misses/:id', async (req, res) => {
  try {
    const updated = await LocalDB.update('near_misses', req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    handleError(res, err, "Failed to update near miss");
  }
});

app.delete('/api/near-misses/:id', async (req, res) => {
  try {
    const success = await LocalDB.delete('near_misses', req.params.id);
    if (!success) return res.status(404).json({ error: "Near miss record not found" });
    res.json({ message: "Near miss deleted successfully" });
  } catch (err) {
    handleError(res, err, "Failed to delete near miss record");
  }
});


// ==========================================
// API ROUTES: REPORTS AND ANALYTICS
// ==========================================
app.get('/api/reports/summary', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      return res.status(400).json({ error: "startDate and endDate parameters are required" });
    }

    const start = parseDateOnly(startDate);
    const end = parseDateOnly(endDate);

    if (!start || !end) {
      return res.status(400).json({ error: "Invalid startDate or endDate" });
    }

    const [activities, ptws, trainings, nearMisses, workers] = await Promise.all([
      LocalDB.getAll('activities'),
      LocalDB.getAll('ptws'),
      LocalDB.getAll('training'),
      LocalDB.getAll('near_misses'),
      LocalDB.getAll('workers')
    ]);

    // Filter helper
    const isWithinRange = (dateStr) => {
      if (!dateStr) return false;
      const d = parseDateOnly(dateStr);
      if (!d) return false;
      return d >= start && d <= end;
    };

    const filteredActivities = activities.filter(a => isWithinRange(a.date));
    const filteredPtws = ptws.filter(p => isWithinRange(p.issueDate));
    const filteredTrainings = trainings.filter(t => isWithinRange(t.date));
    const filteredNearMisses = nearMisses.filter(n => isWithinRange(n.date));

    // Calculate details
    const activeSites = [...new Set([
      ...filteredActivities.map(a => a.site),
      ...filteredPtws.map(p => p.site),
      ...filteredNearMisses.map(n => n.site)
    ])].filter(Boolean);

    // Sum details
    const summary = {
      period: { startDate, endDate },
      counts: {
        activities: filteredActivities.length,
        ptws: filteredPtws.length,
        trainings: filteredTrainings.length,
        nearMisses: filteredNearMisses.length,
        activeWorkers: workers.filter(w => w.status === 'Active').length
      },
      activities: filteredActivities,
      ptws: filteredPtws,
      trainings: filteredTrainings,
      nearMisses: filteredNearMisses,
      sites: activeSites
    };

    res.json(summary);
  } catch (err) {
    handleError(res, err, "Failed to generate report summary");
  }
});

// Helper to get local network IP addresses
function getLocalIpAddresses() {
  const interfaces = os.networkInterfaces();
  const addresses = [];
  for (const interfaceName in interfaces) {
    for (const iface of interfaces[interfaceName]) {
      // Skip loopback and non-IPv4 addresses
      if (iface.family === 'IPv4' && !iface.internal) {
        addresses.push(iface.address);
      }
    }
  }
  return addresses;
}

// Start the server
app.listen(PORT, '0.0.0.0', async () => {
  await seedUsers();
  const localIps = getLocalIpAddresses();
  console.log(`=======================================================`);
  console.log(` HSE SAFETY SYSTEM SERVER ACTIVE                       `);
  console.log(` Running locally on: http://localhost:${PORT}        `);
  localIps.forEach(ip => {
    console.log(` Running on network: http://${ip}:${PORT}           `);
  });
  console.log(` Press Ctrl+C to terminate the server                  `);
  console.log(`=======================================================`);
});
