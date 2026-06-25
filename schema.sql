-- HSE Safety Control System - Relational SQL Schema Setup

-- 1. Users / Authentication Table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Workers Directory Table
CREATE TABLE IF NOT EXISTS workers (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    code TEXT UNIQUE NOT NULL,
    "jobTitle" TEXT DEFAULT 'Worker',
    site TEXT DEFAULT 'Unassigned',
    status TEXT DEFAULT 'Active',
    "trainingCompleted" JSONB DEFAULT '[]'::jsonb,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Daily Activities Log Table
CREATE TABLE IF NOT EXISTS activities (
    id SERIAL PRIMARY KEY,
    date TEXT NOT NULL,
    site TEXT NOT NULL,
    "activityName" TEXT NOT NULL,
    supervisor TEXT DEFAULT 'N/A',
    status TEXT DEFAULT 'Planned',
    "workersInvolved" JSONB DEFAULT '[]'::jsonb,
    "hazardsIdentified" TEXT DEFAULT '',
    "actionsTaken" TEXT DEFAULT '',
    "ptwId" TEXT,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Permits to Work (PTW) Table
CREATE TABLE IF NOT EXISTS ptws (
    id SERIAL PRIMARY KEY,
    "permitNo" TEXT UNIQUE NOT NULL,
    type TEXT NOT NULL,
    "issueDate" TEXT NOT NULL,
    "expiryDate" TEXT DEFAULT '',
    site TEXT DEFAULT 'Unassigned',
    description TEXT DEFAULT '',
    status TEXT DEFAULT 'Active',
    "fileName" TEXT,
    "filePath" TEXT,
    "fileType" TEXT,
    photos JSONB DEFAULT '[]'::jsonb,
    reports JSONB DEFAULT '[]'::jsonb,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Safety Memos Table
CREATE TABLE IF NOT EXISTS memos (
    id SERIAL PRIMARY KEY,
    type TEXT NOT NULL,
    date TEXT NOT NULL,
    "targetType" TEXT,
    "targetName" TEXT,
    subject TEXT NOT NULL,
    description TEXT DEFAULT '',
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Risk Assessments (JSA) Table
CREATE TABLE IF NOT EXISTS risk_assessments (
    id SERIAL PRIMARY KEY,
    activity TEXT NOT NULL,
    date TEXT NOT NULL,
    assessor TEXT NOT NULL,
    site TEXT DEFAULT 'Unassigned',
    hazards JSONB DEFAULT '[]'::jsonb,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Training Sessions Table
CREATE TABLE IF NOT EXISTS training (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    trainer TEXT NOT NULL,
    site TEXT DEFAULT 'Unassigned',
    duration TEXT DEFAULT '',
    attendees JSONB DEFAULT '[]'::jsonb,
    remarks TEXT DEFAULT '',
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Near Miss Reports Table
CREATE TABLE IF NOT EXISTS near_misses (
    id SERIAL PRIMARY KEY,
    date TEXT NOT NULL,
    time TEXT DEFAULT '00:00',
    site TEXT NOT NULL,
    description TEXT NOT NULL,
    "potentialSeverity" TEXT DEFAULT 'Low',
    "correctiveAction" TEXT DEFAULT '',
    reporter TEXT DEFAULT 'Anonymous',
    status TEXT DEFAULT 'Open',
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 9. System Activity Logs Table
CREATE TABLE IF NOT EXISTS activity_logs (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL,
    name TEXT NOT NULL,
    action TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Equipment Register
CREATE TABLE IF NOT EXISTS equipment (
    id SERIAL PRIMARY KEY,
    "equipmentNo" TEXT UNIQUE NOT NULL,
    type TEXT NOT NULL,
    manufacturer TEXT,
    capacity TEXT,
    "inspectionDate" TEXT,
    "colorCode" TEXT,
    "thirdPartyCert" TEXT,
    status TEXT DEFAULT 'Fit',
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Safety Tools Store Register
CREATE TABLE IF NOT EXISTS store (
    id SERIAL PRIMARY KEY,
    "itemName" TEXT NOT NULL,
    "serialNo" TEXT,
    quantity NUMERIC DEFAULT 0,
    "lastInspectionDate" TEXT,
    status TEXT DEFAULT 'Safe',
    description TEXT,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 12. Maintenance Register
CREATE TABLE IF NOT EXISTS maintenance (
    id SERIAL PRIMARY KEY,
    "equipmentName" TEXT NOT NULL,
    type TEXT NOT NULL,
    date TEXT NOT NULL,
    executor TEXT NOT NULL,
    "nextDate" TEXT,
    notes TEXT,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 13. Incident Log Register
CREATE TABLE IF NOT EXISTS incidents (
    id SERIAL PRIMARY KEY,
    "incidentNo" TEXT UNIQUE NOT NULL,
    date TEXT NOT NULL,
    location TEXT NOT NULL,
    "injuryType" TEXT NOT NULL,
    "injuredPerson" TEXT,
    "downtimeDays" NUMERIC DEFAULT 0,
    "investigationResults" TEXT,
    "correctiveActions" TEXT,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 14. Safe Working Hours Register
CREATE TABLE IF NOT EXISTS safe_hours (
    id SERIAL PRIMARY KEY,
    date TEXT NOT NULL,
    "workerCount" NUMERIC DEFAULT 0,
    "dailyHours" NUMERIC DEFAULT 0,
    "monthlyHours" NUMERIC DEFAULT 0,
    "incidentCount" NUMERIC DEFAULT 0,
    "safeDays" NUMERIC DEFAULT 0,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 15. Emergency Response Teams Register
CREATE TABLE IF NOT EXISTS emergency_teams (
    id SERIAL PRIMARY KEY,
    "teamType" TEXT NOT NULL,
    members TEXT NOT NULL,
    certificates TEXT,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 16. Pre-Operation Checklist
CREATE TABLE IF NOT EXISTS checklists_pre_op (
    id SERIAL PRIMARY KEY,
    "equipmentNo" TEXT NOT NULL,
    code TEXT NOT NULL,
    date TEXT NOT NULL,
    leakage TEXT,
    "abnormalSounds" TEXT,
    "tiresCondition" TEXT,
    "brakesCondition" TEXT,
    "warningDevices" TEXT,
    hydraulics TEXT,
    "fireExtinguisher" TEXT,
    notes TEXT,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 17. Equipment Readiness Checklist
CREATE TABLE IF NOT EXISTS checklists_readiness (
    id SERIAL PRIMARY KEY,
    "equipmentId" TEXT NOT NULL,
    date TEXT NOT NULL,
    "safetySwitches" TEXT,
    "emergencyStop" TEXT,
    "guardRails" TEXT,
    earthing TEXT,
    "operatingPanels" TEXT,
    "structuralIntegrity" TEXT,
    "operatorCert" TEXT,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 18. Worker Safety Checklist
CREATE TABLE IF NOT EXISTS checklists_workers (
    id SERIAL PRIMARY KEY,
    "taskTitle" TEXT NOT NULL,
    date TEXT NOT NULL,
    supervisor TEXT,
    "ppeCheck" TEXT,
    "hazardsCleared" TEXT,
    "toolCheck" TEXT,
    "briefingDone" TEXT,
    "medicalCert" TEXT,
    "incidentPlan" TEXT,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 19. Emergency Drill Checklist
CREATE TABLE IF NOT EXISTS checklists_emergency (
    id SERIAL PRIMARY KEY,
    date TEXT NOT NULL,
    location TEXT NOT NULL,
    "drillType" TEXT NOT NULL,
    "responseMinutes" NUMERIC DEFAULT 0,
    "evacuationSuccess" TEXT,
    "alarmsTriggered" TEXT,
    "firstAidBox" TEXT,
    "assemblyPointCount" NUMERIC DEFAULT 0,
    remarks TEXT,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 20. Tool Box Talk (TBT) Checklist
CREATE TABLE IF NOT EXISTS checklists_tbt (
    id SERIAL PRIMARY KEY,
    "taskTitle" TEXT NOT NULL,
    date TEXT NOT NULL,
    "presentCount" NUMERIC DEFAULT 0,
    instructor TEXT NOT NULL,
    "topicsDiscussed" TEXT,
    "workersFeedback" TEXT,
    "ppeRequired" TEXT,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 21. Attendance & Site Exit Checklist
CREATE TABLE IF NOT EXISTS checklists_attendance (
    id SERIAL PRIMARY KEY,
    date TEXT NOT NULL,
    "totalStaff" NUMERIC DEFAULT 0,
    absentees NUMERIC DEFAULT 0,
    "signIns" NUMERIC DEFAULT 0,
    "signOuts" NUMERIC DEFAULT 0,
    "overtimeHours" NUMERIC DEFAULT 0,
    "visitorLogs" TEXT,
    "incidentLog" TEXT,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 22. Method Statement Safety Plan
CREATE TABLE IF NOT EXISTS plans_method_statement (
    id SERIAL PRIMARY KEY,
    "activityDescription" TEXT NOT NULL,
    date TEXT NOT NULL,
    "proposedSteps" TEXT,
    "riskRank" TEXT,
    hazards TEXT,
    "ppeRequired" TEXT,
    "supervisionLevel" TEXT,
    "emergencyContacts" TEXT,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 23. Critical Lifting Safety Plan
CREATE TABLE IF NOT EXISTS plans_lifting (
    id SERIAL PRIMARY KEY,
    "loadWeight" TEXT NOT NULL,
    date TEXT NOT NULL,
    "craneCapacity" TEXT,
    "riggingPlan" TEXT,
    "centerOfGravity" TEXT,
    "windSpeedLimit" TEXT,
    "liftingSupervisor" TEXT,
    "criticalRating" TEXT,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 24. Emergency Action Safety Plan
CREATE TABLE IF NOT EXISTS plans_emergency (
    id SERIAL PRIMARY KEY,
    hazards TEXT NOT NULL,
    date TEXT NOT NULL,
    scenario TEXT NOT NULL,
    "responseCoordinator" TEXT,
    "assemblyPoint" TEXT,
    "hospitalRef" TEXT,
    "emergencyCallSystem" TEXT,
    "evacuationMap" TEXT,
    "equipmentRequired" TEXT,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================================
-- DISABLE ROW LEVEL SECURITY (RLS) ON ALL TABLES
-- (Allows the API server backend anonymous read/write access)
-- ========================================================
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE workers DISABLE ROW LEVEL SECURITY;
ALTER TABLE activities DISABLE ROW LEVEL SECURITY;
ALTER TABLE ptws DISABLE ROW LEVEL SECURITY;
ALTER TABLE memos DISABLE ROW LEVEL SECURITY;
ALTER TABLE risk_assessments DISABLE ROW LEVEL SECURITY;
ALTER TABLE training DISABLE ROW LEVEL SECURITY;
ALTER TABLE near_misses DISABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs DISABLE ROW LEVEL SECURITY;
ALTER TABLE equipment DISABLE ROW LEVEL SECURITY;
ALTER TABLE store DISABLE ROW LEVEL SECURITY;
ALTER TABLE maintenance DISABLE ROW LEVEL SECURITY;
ALTER TABLE incidents DISABLE ROW LEVEL SECURITY;
ALTER TABLE safe_hours DISABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_teams DISABLE ROW LEVEL SECURITY;
ALTER TABLE checklists_pre_op DISABLE ROW LEVEL SECURITY;
ALTER TABLE checklists_readiness DISABLE ROW LEVEL SECURITY;
ALTER TABLE checklists_workers DISABLE ROW LEVEL SECURITY;
ALTER TABLE checklists_emergency DISABLE ROW LEVEL SECURITY;
ALTER TABLE checklists_tbt DISABLE ROW LEVEL SECURITY;
ALTER TABLE checklists_attendance DISABLE ROW LEVEL SECURITY;
ALTER TABLE plans_method_statement DISABLE ROW LEVEL SECURITY;
ALTER TABLE plans_lifting DISABLE ROW LEVEL SECURITY;
ALTER TABLE plans_emergency DISABLE ROW LEVEL SECURITY;
