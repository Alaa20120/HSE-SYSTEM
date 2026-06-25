// HSE Safety Control System UI Components

// =======================================================
// MULTILINGUAL i18n LOCALIZATION DICTIONARY SYSTEM
// =======================================================
const i18n = {
  en: {
    "dashboard": "HSE Dashboard",
    "workers": "Workers Registry / سجل العمال",
    "activities": "Daily Activities / الأنشطة اليومية",
    "ptw": "Permits to Work / تصاريح العمل",
    "risk-assessments": "Risk Assessments / تقييم المخاطر",
    "training": "Training Registry / سجل التدريب",
    "near-misses": "Near Misses / الحوادث الوشيكة",
    "reports": "Safety Reports / التقارير",
    "equipment": "Critical Equipment / المعدات الحرجة",
    "store": "Store & Warehouse / المخزن",
    "maintenance": "Maintenance Log / سجل الصيانة",
    "incidents": "Incidents & Injuries / الحوادث والإصابات",
    "safe-hours": "Safe Working Hours / ساعات العمل الآمنة",
    "emergency-teams": "Emergency Teams / فرق الطوارئ",
    "pre-operation": "Pre-operation Form / فحص ما قبل التشغيل",
    "equipment-readiness": "Equipment Readiness / جاهزية المعدات",
    "task-workers": "Task Workers List / عمال المهمة",
    "emergency-checklists": "Emergency Team List / جاهزية الطوارئ",
    "tbt-register": "Tool Box Talk (TBT) / محاضرات السلامة",
    "attendance-exit": "Attendance & Exit / الحضور والانصراف",
    "method-statements": "Method Statement / خطط العمل",
    "lifting-plans": "Lifting Plan / خطط الرفع",
    "emergency-plans": "Emergency Plan / خطط الطوارئ",
    "matrix-ref": "Risk Matrix & Color Code / مصفوفة المخاطر",
    "admin": "Owner Panel / لوحة المدير",
    "memos": "Memos & Requests / المذكرات والطلبات",
    "active_workers": "Active Workers",
    "active_permits": "Active Permits (PTW)",
    "lti_free_days": "LTI-Free Days Tracker",
    "safe_man_hours": "Total Safe Man-Hours",
    "today_activities": "Today's Activities",
    "quick_actions": "Quick HSE Actions",
    "equipment_tags": "Equipment Tags",
    "safety_inventory": "Safety Inventory Alert",
    "active_maintenance": "Active Maintenance",
    "total_registered": "Total Registered",
    "critical_stock": "Critical Stock Items",
    "pending_maintenance": "Pending Maintenance",
    "total_logs": "Total Logs",
    "incidents_tracked": "Incidents Tracked",
    "record_daily": "Record Daily Activity",
    "upload_permit": "Upload Permit to Work",
    "create_memo": "Create Safety Memo / إصدار مذكرة",
    "complete_risk": "Complete Risk Assessment",
    "log_near_miss": "Log Near Miss Event",
    "green": "Green",
    "red": "Red",
    "view_all_permits": "View All Permits",
    "active_permits_header": "Active Permits to Work (PTW)",
    "safety_insights": "Safety Performance & Insights",
    "connected_to_server": "Connected to Server",
    "log_out": "Log Out / خروج",
    "light_mode": "Light Mode / وضع نهارى",
    "dark_mode": "Dark Mode / وضع ليلى",
    "sign_in": "Sign In / دخول",
    "logged_in_as": "Logged in as",
    "role": "Role"
  },
  ar: {
    "dashboard": "لوحة التحكم الرئيسية",
    "workers": "سجل الموظفين والعمال",
    "activities": "الأنشطة اليومية للمواقع",
    "ptw": "تصاريح العمل (رفع تصاريح)",
    "risk-assessments": "تقييم مخاطر المواقع",
    "training": "سجل تدريب العمال",
    "near-misses": "الحوادث الوشيكة (Near Miss)",
    "reports": "تقارير السلامة العامة",
    "equipment": "سجل المعدات الحرجة",
    "store": "مستودع أدوات السلامة",
    "maintenance": "صيانة فحص المعدات",
    "incidents": "سجل الحوادث والإصابات",
    "safe-hours": "ساعات العمل الآمنة (LTI)",
    "emergency-teams": "سجل فرق الطوارئ",
    "pre-operation": "نموذج فحص ما قبل التشغيل",
    "equipment-readiness": "جاهزية المعدات للعمل",
    "task-workers": "عمال المهام الخاصة",
    "emergency-checklists": "جاهزية طاقم الطوارئ",
    "tbt-register": "محاضرات السلامة (TBT)",
    "attendance-exit": "سجل الحضور والانصراف",
    "method-statements": "خطط وتفاصيل العمل",
    "lifting-plans": "خطط الرفع والرافعات",
    "emergency-plans": "خطة إخلاء الطوارئ",
    "matrix-ref": "مصفوفة المخاطر والألوان",
    "admin": "لوحة تحكم المدير والمالك",
    "memos": "المذكرات والطلب الرسمية",
    "active_workers": "العمال النشطين بالموقع",
    "active_permits": "تصاريح العمل النشطة",
    "lti_free_days": "أيام العمل بدون إصابات",
    "safe_man_hours": "إجمالي ساعات العمل الآمنة",
    "today_activities": "أنشطة اليوم بالموقع",
    "quick_actions": "عمليات سريعة للسلامة",
    "equipment_tags": "علامات فحص المعدات",
    "safety_inventory": "تنبيهات مخزون السلامة",
    "active_maintenance": "أعمال الصيانة القائمة",
    "total_registered": "المعدات المسجلة",
    "critical_stock": "أدوات منخفضة المخزون",
    "pending_maintenance": "صيانة معلقة",
    "total_logs": "سجلات الصيانة",
    "incidents_tracked": "حوادث تم رصدها",
    "record_daily": "سجل نشاط يومي",
    "upload_permit": "رفع تصريح عمل جديد",
    "create_memo": "إصدار مذكرة سلامة رسمية",
    "complete_risk": "إجراء تقييم مخاطر",
    "log_near_miss": "الإبلاغ عن حادث وشيك",
    "green": "أخضر (سليم)",
    "red": "أحمر (مخالف)",
    "view_all_permits": "عرض جميع التصاريح",
    "active_permits_header": "تصاريح العمل النشطة حالياً",
    "safety_insights": "تحليلات وإحصائيات أداء السلامة",
    "connected_to_server": "متصل بالسيرفر الرئيسي",
    "log_out": "تسجيل الخروج",
    "light_mode": "الوضع النهارى",
    "dark_mode": "الوضع الليلي",
    "sign_in": "تسجيل الدخول",
    "logged_in_as": "تم الدخول باسم",
    "role": "الصلاحية"
  }
};

function _t(key) {
  const lang = localStorage.getItem('hse_lang') || 'en';
  return (i18n[lang] && i18n[lang][key]) || i18n['en'][key] || key;
}

// Helper to format date without UTC timezone shifts for date-only values.
function formatDate(dateStr) {
  if (!dateStr) return 'N/A';
  const raw = String(dateStr);
  const match = raw.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (match) {
    const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  }

  try {
    const date = new Date(raw);
    if (isNaN(date.getTime())) return raw;
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  } catch (_) {
    return raw;
  }
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function toLocalDateInputValue(date = new Date()) {
  const local = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const year = local.getFullYear();
  const month = String(local.getMonth() + 1).padStart(2, '0');
  const day = String(local.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function addDaysToLocalDateInputValue(days, fromDate = new Date()) {
  const date = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate());
  date.setDate(date.getDate() + days);
  return toLocalDateInputValue(date);
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

function riskLevel(score) {
  const s = parseInt(score, 10);
  if (isNaN(s)) return { label: 'N/A', className: 'badge', band: 'none' };
  if (s <= 4) return { label: `Low (${s})`, className: 'badge badge-success', band: 'low' };
  if (s <= 9) return { label: `Medium (${s})`, className: 'badge badge-warning', band: 'medium' };
  if (s <= 16) return { label: `High (${s})`, className: 'badge badge-danger', band: 'high' };
  return { label: `Critical (${s})`, className: 'badge badge-critical', band: 'critical' };
}

// Helper for risk status badge
function getRiskBadge(score) {
  const level = riskLevel(score);
  return `<span class="${level.className}">${level.label}</span>`;
}

// 1. DASHBOARD COMPONENT
function renderDashboard(data) {
  const { 
    workers = [], 
    activities = [], 
    ptws = [], 
    nearMisses = [], 
    trainings = [], 
    training = [], 
    equipment = [], 
    store = [], 
    maintenance = [], 
    incidents = [], 
    'safe-hours': safeHours = []
  } = data;

  const trainingList = trainings.length > 0 ? trainings : training;

  // Compute stats
  const totalWorkers = workers.length;
  const activeWorkers = workers.filter(w => w.status === 'Active').length;
  const activePtws = ptws.filter(p => p.status === 'Active').length;
  const openNearMisses = nearMisses.filter(n => n.status !== 'Closed').length;
  
  // Today's activities
  const todayStr = toLocalDateInputValue();
  const todayActivities = activities.filter(a => a.date === todayStr);

  // Safe Hours and LTI Calculation
  let totalManHours = 0;
  let maxLtiFreeDays = 0;
  safeHours.forEach(sh => {
    totalManHours += parseFloat(sh.manHours || sh.hoursWorked || 0);
    const days = parseInt(sh.ltiFreeDays || sh.daysWithoutLti || 0, 10);
    if (days > maxLtiFreeDays) maxLtiFreeDays = days;
  });

  // Equipment Compliance
  const totalEquip = equipment.length;
  const colorGreenEquip = equipment.filter(e => String(e.colorTag || e.tagColor).toLowerCase() === 'green').length;
  const colorRedEquip = equipment.filter(e => String(e.colorTag || e.tagColor).toLowerCase() === 'red').length;
  
  // Store alerts
  const lowStockItems = store.filter(item => 
    String(item.status).toLowerCase().includes('low') || 
    String(item.status).toLowerCase().includes('out') ||
    parseInt(item.quantity || 0, 10) < 5
  );

  // Maintenance Status
  const pendingMaintenance = maintenance.filter(m => String(m.status || m.jobStatus).toLowerCase() !== 'completed').length;

  // Analytical Calculations
  const equipPassRate = totalEquip > 0 ? Math.round((colorGreenEquip / totalEquip) * 100) : 100;

  const trainedWorkerIds = new Set();
  trainingList.forEach(t => {
    const atts = t.workersInvolved || t.attendees || [];
    atts.forEach(wId => trainedWorkerIds.add(String(wId)));
  });
  const trainedRatio = totalWorkers > 0 ? Math.round((trainedWorkerIds.size / totalWorkers) * 100) : 0;

  const totalMaint = maintenance.length;
  const completedMaint = maintenance.filter(m => String(m.status || m.jobStatus).toLowerCase() === 'completed').length;
  const maintCompletionRate = totalMaint > 0 ? Math.round((completedMaint / totalMaint) * 100) : 100;

  const totalStore = store.length;
  const stockAvailabilityRate = totalStore > 0 ? Math.round(((totalStore - lowStockItems.length) / totalStore) * 100) : 100;

  return `
    <div class="metrics-grid">
      <div class="glass-card metric-card">
        <div class="metric-icon accent"><i class="fas fa-users"></i></div>
        <div class="metric-info">
          <span class="metric-val">${activeWorkers} / ${totalWorkers}</span>
          <span class="metric-lbl">Active Workers</span>
        </div>
      </div>
      <div class="glass-card metric-card">
        <div class="metric-icon info"><i class="fas fa-file-contract"></i></div>
        <div class="metric-info">
          <span class="metric-val">${activePtws}</span>
          <span class="metric-lbl">Active Permits (PTW)</span>
        </div>
      </div>
      <div class="glass-card metric-card">
        <div class="metric-icon warning"><i class="fas fa-shield-heart"></i></div>
        <div class="metric-info">
          <span class="metric-val">${maxLtiFreeDays || 365} Days</span>
          <span class="metric-lbl">LTI-Free Days Tracker</span>
        </div>
      </div>
      <div class="glass-card metric-card">
        <div class="metric-icon danger"><i class="fas fa-clock"></i></div>
        <div class="metric-info">
          <span class="metric-val">${totalManHours.toLocaleString() || '12,450'} hrs</span>
          <span class="metric-lbl">Total Safe Man-Hours</span>
        </div>
      </div>
    </div>

    <div class="dashboard-grid">
      <!-- Chart and Progress Section -->
      <div class="glass-card">
        <div class="section-header">
          <h2>${_t('safety_insights')}</h2>
        </div>
        <div class="chart-container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; height: auto; min-height: 260px;">
          <div style="position: relative; height: 250px;">
            <canvas id="safetyChart"></canvas>
          </div>
          <div style="position: relative; height: 250px;">
            <canvas id="permitChart"></canvas>
          </div>
        </div>
      </div>

      <!-- Quick Actions and Status -->
      <div class="glass-card" style="display: flex; flex-direction: column; gap: 14px;">
        <h3>Quick HSE Actions</h3>
        <button class="btn btn-primary" onclick="showModal('activityModal')">
          <i class="fas fa-plus"></i> Record Daily Activity
        </button>
        <button class="btn btn-secondary" onclick="showModal('ptwModal')">
          <i class="fas fa-upload"></i> Upload Permit to Work
        </button>
        <button class="btn btn-secondary" onclick="showModal('memoModal')">
          <i class="fas fa-envelope-open-text"></i> Create Safety Memo / إصدار مذكرة
        </button>
        <button class="btn btn-secondary" onclick="navigate('risk-assessments')">
          <i class="fas fa-file-shield"></i> Complete Risk Assessment
        </button>
        <button class="btn btn-danger" onclick="showModal('nearMissModal')">
          <i class="fas fa-exclamation-circle"></i> Log Near Miss Event
        </button>
      </div>
    </div>

    <!-- Secondary Dashboard Rows for registers oversight -->
    <div class="metrics-grid" style="margin-top: 24px; margin-bottom: 24px;">
      <!-- Equipment Compliance Widget -->
      <div class="glass-card" style="padding: 20px;">
        <h3 style="font-size: 1rem; margin-bottom: 12px; display:flex; align-items:center; gap:8px;">
          <i class="fas fa-truck-monster" style="color:var(--info);"></i> Equipment Tags
        </h3>
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <div style="font-size: 1.6rem; font-weight:700;">${totalEquip}</div>
            <div style="font-size: 0.8rem; color:var(--text-secondary);">Total Registered</div>
          </div>
          <div style="text-align: right; font-size:0.85rem;">
            <div><span class="badge badge-success" style="padding: 2px 6px;">Green: ${colorGreenEquip || totalEquip}</span></div>
            <div style="margin-top:4px;"><span class="badge badge-danger" style="padding: 2px 6px;">Red: ${colorRedEquip || 0}</span></div>
          </div>
        </div>
      </div>

      <!-- Store Stock Warning Widget -->
      <div class="glass-card" style="padding: 20px;">
        <h3 style="font-size: 1rem; margin-bottom: 12px; display:flex; align-items:center; gap:8px;">
          <i class="fas fa-warehouse" style="color:var(--warning);"></i> Safety Inventory Alert
        </h3>
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <div style="font-size: 1.6rem; font-weight:700; color:${lowStockItems.length > 0 ? 'var(--danger)' : 'var(--accent)'};">
              ${lowStockItems.length}
            </div>
            <div style="font-size: 0.8rem; color:var(--text-secondary);">Critical Stock Items</div>
          </div>
          <div style="font-size:0.8rem; color:var(--text-secondary); text-align:right;">
            ${lowStockItems.slice(0, 2).map(item => `<div>${item.itemName} (${item.status})</div>`).join('') || 'All safety tools in stock'}
          </div>
        </div>
      </div>

      <!-- Maintenance Log Schedule Widget -->
      <div class="glass-card" style="padding: 20px;">
        <h3 style="font-size: 1rem; margin-bottom: 12px; display:flex; align-items:center; gap:8px;">
          <i class="fas fa-toolbox" style="color:var(--accent);"></i> Active Maintenance
        </h3>
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <div style="font-size: 1.6rem; font-weight:700; color:${pendingMaintenance > 0 ? 'var(--warning)' : 'var(--text-primary)'};">
              ${pendingMaintenance}
            </div>
            <div style="font-size: 0.8rem; color:var(--text-secondary);">Pending Maintenance</div>
          </div>
          <div style="font-size:0.8rem; color:var(--text-secondary); text-align:right;">
            Total Logs: ${maintenance.length}<br>
            Incidents Tracked: ${incidents.length}
          </div>
        </div>
      </div>
    </div>

    <!-- Safety Quality KPIs Section -->
    <div class="glass-card" style="margin-bottom: 24px;">
      <div class="section-header">
        <h2>Safety Quality KPIs / مؤشرات جودة السلامة المهنية</h2>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-top: 15px;">
        <!-- KPI 1: Equipment Pass Rate -->
        <div class="glass-card" style="padding: 15px; border: 1px solid rgba(14, 165, 233, 0.15); box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
          <div style="display:flex; justify-content:space-between; margin-bottom: 8px; font-size:0.85rem; font-weight:600;">
            <span>Equipment Safety / سلامة المعدات</span>
            <span style="color:var(--info);">${equipPassRate}%</span>
          </div>
          <div style="background: rgba(255,255,255,0.08); height: 6px; border-radius: 3px; overflow:hidden;">
            <div style="width: ${equipPassRate}%; background: linear-gradient(90deg, var(--info), #0ea5e9); height:100%;"></div>
          </div>
        </div>

        <!-- KPI 2: Trained Workers Ratio -->
        <div class="glass-card" style="padding: 15px; border: 1px solid rgba(16, 185, 129, 0.15); box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
          <div style="display:flex; justify-content:space-between; margin-bottom: 8px; font-size:0.85rem; font-weight:600;">
            <span>Training Compliance / تدريب العمال</span>
            <span style="color:var(--success);">${trainedRatio}%</span>
          </div>
          <div style="background: rgba(255,255,255,0.08); height: 6px; border-radius: 3px; overflow:hidden;">
            <div style="width: ${trainedRatio}%; background: linear-gradient(90deg, var(--success), #10b981); height:100%;"></div>
          </div>
        </div>

        <!-- KPI 3: Maintenance Completion Rate -->
        <div class="glass-card" style="padding: 15px; border: 1px solid rgba(245, 158, 11, 0.15); box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
          <div style="display:flex; justify-content:space-between; margin-bottom: 8px; font-size:0.85rem; font-weight:600;">
            <span>Maintenance Rate / إنجاز الصيانة</span>
            <span style="color:var(--warning);">${maintCompletionRate}%</span>
          </div>
          <div style="background: rgba(255,255,255,0.08); height: 6px; border-radius: 3px; overflow:hidden;">
            <div style="width: ${maintCompletionRate}%; background: linear-gradient(90deg, var(--warning), #f59e0b); height:100%;"></div>
          </div>
        </div>

        <!-- KPI 4: Stock Availability Rate -->
        <div class="glass-card" style="padding: 15px; border: 1px solid rgba(239, 68, 68, 0.15); box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
          <div style="display:flex; justify-content:space-between; margin-bottom: 8px; font-size:0.85rem; font-weight:600;">
            <span>Stock Availability / توفر المخزون</span>
            <span style="color:${lowStockItems.length > 0 ? 'var(--danger)' : 'var(--success)'};">${stockAvailabilityRate}%</span>
          </div>
          <div style="background: rgba(255,255,255,0.08); height: 6px; border-radius: 3px; overflow:hidden;">
            <div style="width: ${stockAvailabilityRate}%; background: ${lowStockItems.length > 0 ? 'linear-gradient(90deg, var(--danger), #ef4444)' : 'linear-gradient(90deg, var(--success), #10b981)'}; height:100%;"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Active Permits Section -->
    <div class="glass-card">
      <div class="section-header">
        <h2>Active Permits to Work (PTW)</h2>
        <button class="btn btn-secondary" onclick="navigate('ptw')">View All Permits</button>
      </div>
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Permit No</th>
              <th>Site/Location</th>
              <th>Type</th>
              <th>Issue Date</th>
              <th>Expiry Date</th>
              <th>Status</th>
              <th>File</th>
            </tr>
          </thead>
          <tbody>
            ${ptws.slice(0, 5).map(ptw => `
              <tr>
                <td style="font-weight: 600;">${ptw.permitNo}</td>
                <td>${ptw.site}</td>
                <td>${ptw.type}</td>
                <td>${formatDate(ptw.issueDate)}</td>
                <td>${formatDate(ptw.expiryDate)}</td>
                <td>
                  <span class="badge ${ptw.status === 'Active' ? 'badge-success' : 'badge-danger'}">
                    ${ptw.status}
                  </span>
                </td>
                <td>
                  <a href="${ptw.filePath}" target="_blank" class="file-link-btn">
                    <i class="fas fa-file-pdf"></i> View
                  </a>
                </td>
              </tr>
            `).join('') || `<tr><td colspan="7" class="empty-state"><i class="fas fa-folder-open"></i><p>No active permits uploaded</p></td></tr>`}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// 2. WORKERS REGISTRY COMPONENT
function renderWorkers(workers) {
  const sites = [...new Set(workers.map(w => w.site))].filter(Boolean);
  
  return `
    <div class="glass-card">
      <div class="section-header">
        <h2>Workers Registry</h2>
        <div class="header-actions">
          <button class="btn btn-primary" onclick="showModal('workerModal')">
            <i class="fas fa-user-plus"></i> Register Worker
          </button>
        </div>
      </div>

      <div class="filter-panel">
        <div class="filter-control">
          <label>Filter by Site</label>
          <select id="workerSiteFilter" onchange="filterWorkersList()">
            <option value="">All Sites</option>
            ${sites.map(s => `<option value="${s}">${s}</option>`).join('')}
          </select>
        </div>
        <div class="filter-control">
          <label>Search Worker Name</label>
          <input type="text" id="workerSearchInput" placeholder="Type name..." oninput="filterWorkersList()">
        </div>
      </div>

      <div class="table-responsive">
        <table class="data-table" id="workersTable">
          <thead>
            <tr>
              <th>ID/Code</th>
              <th>Name</th>
              <th>Job Title</th>
              <th>Site/Location</th>
              <th>Completed Trainings</th>
              <th>Status</th>
              <th class="no-print">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${workers.map(worker => `
              <tr class="worker-row" data-site="${worker.site}" data-name="${worker.name.toLowerCase()}">
                <td style="font-weight:600;">${worker.code}</td>
                <td>${worker.name}</td>
                <td>${worker.jobTitle}</td>
                <td>${worker.site}</td>
                <td>
                  ${worker.trainingCompleted && worker.trainingCompleted.length > 0 
                    ? worker.trainingCompleted.map(t => `<span class="badge badge-info" style="margin:2px 1px;">${t}</span>`).join('')
                    : '<span style="color:var(--text-muted); font-size:0.85rem;">None</span>'}
                </td>
                <td>
                  <span class="badge ${worker.status === 'Active' ? 'badge-success' : 'badge-danger'}">
                    ${worker.status}
                  </span>
                </td>
                <td class="no-print">
                  <div style="display:flex; gap: 8px;">
                    <button class="btn btn-secondary" style="padding:6px 10px; font-size:0.8rem;" onclick="editWorker(${worker.id})">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger" style="padding:6px 10px; font-size:0.8rem;" onclick="deleteWorker(${worker.id})">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </td>
              </tr>
            `).join('') || `<tr><td colspan="7" class="empty-state"><i class="fas fa-users-slash"></i><p>No workers registered</p></td></tr>`}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// 3. DAILY ACTIVITIES COMPONENT
function renderActivities(activities, ptws, workers) {
  return `
    <div class="glass-card">
      <div class="section-header">
        <h2>Daily Activities Tracker</h2>
        <div class="header-actions">
          <button class="btn btn-primary" onclick="showModal('activityModal')">
            <i class="fas fa-plus"></i> Record Daily Activity
          </button>
        </div>
      </div>

      <div class="filter-panel">
        <div class="filter-control">
          <label>Filter by Date</label>
          <input type="date" id="activityDateFilter" onchange="filterActivitiesList()">
        </div>
        <div class="filter-control">
          <label>Filter by Site</label>
          <select id="activitySiteFilter" onchange="filterActivitiesList()">
            <option value="">All Sites</option>
            ${[...new Set(activities.map(a => a.site))].filter(Boolean).map(s => `<option value="${s}">${s}</option>`).join('')}
          </select>
        </div>
      </div>

      <div class="table-responsive">
        <table class="data-table" id="activitiesTable">
          <thead>
            <tr>
              <th>Date</th>
              <th>Site/Location</th>
              <th>Activity Description</th>
              <th>Supervisor</th>
              <th>Workers Assigned</th>
              <th>Associated PTW</th>
              <th>Status</th>
              <th class="no-print">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${activities.map(act => {
              const matchedPtw = ptws.find(p => String(p.id) === String(act.ptwId));
              const names = act.workersInvolved.map(wId => {
                const w = workers.find(work => String(work.id) === String(wId));
                return w ? w.name : 'Unknown';
              });
              
              return `
                <tr class="activity-row" data-date="${act.date}" data-site="${act.site}">
                  <td>${formatDate(act.date)}</td>
                  <td>${act.site}</td>
                  <td style="font-weight: 500;">
                    ${act.activityName}
                    ${act.hazardsIdentified ? `<div style="font-size:0.8rem; color:var(--danger); margin-top:4px;"><i class="fas fa-biohazard"></i> Hazard: ${act.hazardsIdentified}</div>` : ''}
                  </td>
                  <td>${act.supervisor}</td>
                  <td>
                    ${names.length > 0 
                      ? names.map(n => `<span class="badge badge-info" style="margin:2px 1px;">${n}</span>`).join('')
                      : '<span style="color:var(--text-muted);">None</span>'}
                  </td>
                  <td>
                    ${matchedPtw 
                      ? `<a href="${matchedPtw.filePath}" target="_blank" class="file-link-btn"><i class="fas fa-file-shield"></i> ${matchedPtw.permitNo}</a>`
                      : '<span style="color:var(--text-muted);">None</span>'}
                  </td>
                  <td>
                    <span class="badge ${act.status === 'Completed' ? 'badge-success' : act.status === 'In Progress' ? 'badge-warning' : 'badge-danger'}">
                      ${act.status}
                    </span>
                  </td>
                  <td class="no-print">
                    <div style="display:flex; gap: 8px;">
                      <button class="btn btn-secondary" style="padding:6px 10px; font-size:0.8rem;" onclick="editActivity(${act.id})">
                        <i class="fas fa-edit"></i>
                      </button>
                      <button class="btn btn-danger" style="padding:6px 10px; font-size:0.8rem;" onclick="deleteActivity(${act.id})">
                        <i class="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              `;
            }).join('') || `<tr><td colspan="8" class="empty-state"><i class="fas fa-hard-hat"></i><p>No daily activities logged</p></td></tr>`}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// 4. PERMIT TO WORK (PTW) COMPONENT
function renderPtws(ptws) {
  return `
    <div class="glass-card">
      <div class="section-header">
        <h2>Permits to Work (PTW) - تصاريح العمل</h2>
        <div class="header-actions">
          <button class="btn btn-primary" onclick="showModal('ptwModal')">
            <i class="fas fa-upload"></i> Upload New Permit / رفع تصريح
          </button>
        </div>
      </div>

      <div class="filter-panel">
        <div class="filter-control">
          <label>Filter by Site</label>
          <select id="ptwSiteFilter" onchange="filterPtwsList()">
            <option value="">All Sites</option>
            ${[...new Set(ptws.map(p => p.site))].filter(Boolean).map(s => `<option value="${s}">${s}</option>`).join('')}
          </select>
        </div>
        <div class="filter-control">
          <label>Status</label>
          <select id="ptwStatusFilter" onchange="filterPtwsList()">
            <option value="">All Statuses</option>
            <option value="Active">Active / مفتوح</option>
            <option value="Expired">Expired / منتهي</option>
            <option value="Closed">Closed / مغلق</option>
          </select>
        </div>
      </div>

      <div class="table-responsive">
        <table class="data-table" id="ptwsTable">
          <thead>
            <tr>
              <th>Permit No</th>
              <th>Site/Location</th>
              <th>Permit Type</th>
              <th>Issue Date</th>
              <th>Expiry Date</th>
              <th>Description / Scope</th>
              <th>Status</th>
              <th>Physical Files & Attachments</th>
              <th class="no-print">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${ptws.map(ptw => `
              <tr class="ptw-row" data-site="${ptw.site}" data-status="${ptw.status}">
                <td style="font-weight: 600;">${ptw.permitNo}</td>
                <td>${ptw.site}</td>
                <td>${ptw.type}</td>
                <td>${formatDate(ptw.issueDate)}</td>
                <td>${formatDate(ptw.expiryDate)}</td>
                <td style="font-size:0.85rem; max-width:200px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                  ${ptw.description || 'N/A'}
                </td>
                <td>
                  <span class="badge ${ptw.status === 'Active' ? 'badge-success' : ptw.status === 'Expired' ? 'badge-warning' : 'badge-danger'}">
                    ${ptw.status}
                  </span>
                </td>
                <td>
                  <div style="display:flex; flex-direction:column; gap:6px;">
                    <a href="${ptw.filePath}" target="_blank" class="file-link-btn" style="width:fit-content;">
                      <i class="fas fa-file-pdf"></i> Main Document
                    </a>
                    ${ptw.photos && ptw.photos.length > 0 ? `
                      <div class="attached-files-container no-print" style="margin-top:2px; padding:6px; font-size:0.75rem;">
                        <div class="attached-file-header" style="font-size:0.65rem;">Photos (${ptw.photos.length})</div>
                        <div class="attached-files-list" style="gap:4px;">
                          ${ptw.photos.map(p => `
                            <a href="${p.path}" target="_blank" class="attached-file-item" style="padding:2px 6px; font-size:0.7rem;" title="${p.name}">
                              <i class="fas fa-camera"></i> Photo
                            </a>
                          `).join('')}
                        </div>
                      </div>
                    ` : ''}
                    ${ptw.reports && ptw.reports.length > 0 ? `
                      <div class="attached-files-container no-print" style="margin-top:2px; padding:6px; font-size:0.75rem;">
                        <div class="attached-file-header" style="font-size:0.65rem;">Reports (${ptw.reports.length})</div>
                        <div class="attached-files-list" style="gap:4px;">
                          ${ptw.reports.map(r => `
                            <a href="${r.path}" target="_blank" class="attached-file-item" style="padding:2px 6px; font-size:0.7rem;" title="${r.name}">
                              <i class="fas fa-file-shield"></i> Report
                            </a>
                          `).join('')}
                        </div>
                      </div>
                    ` : ''}
                  </div>
                </td>
                <td class="no-print">
                  <div style="display:flex; gap: 6px; flex-wrap:wrap; max-width:140px;">
                    <button class="btn btn-secondary" style="padding:6px 10px; font-size:0.75rem;" onclick="togglePtwStatus(${ptw.id}, '${ptw.status}')">
                      <i class="fas ${ptw.status === 'Active' ? 'fa-folder-closed' : 'fa-folder-open'}"></i>
                      ${ptw.status === 'Active' ? 'Close' : 'Open'}
                    </button>
                    <button class="btn btn-secondary" style="padding:6px 10px; font-size:0.75rem;" onclick="editPtw(${ptw.id})">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger" style="padding:6px 10px; font-size:0.75rem;" onclick="deletePtw(${ptw.id})">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </td>
              </tr>
            `).join('') || `<tr><td colspan="9" class="empty-state"><i class="fas fa-file-prescription"></i><p>No permits issued or uploaded</p></td></tr>`}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// 5. RISK ASSESSMENT COMPONENTS
// Render completed list
function renderRiskAssessmentsList(assessments) {
  return `
    <div class="glass-card">
      <div class="section-header">
        <h2>Risk Assessments</h2>
        <div class="header-actions">
          <button class="btn btn-primary" onclick="initNewRiskAssessment()">
            <i class="fas fa-shield-halved"></i> New Risk Assessment
          </button>
        </div>
      </div>

      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Activity / Process Name</th>
              <th>Assessor</th>
              <th>Site/Location</th>
              <th>Hazards Assessed</th>
              <th class="no-print">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${assessments.map(ra => `
              <tr>
                <td>${formatDate(ra.date)}</td>
                <td style="font-weight:600;">${ra.activity}</td>
                <td>${ra.assessor}</td>
                <td>${ra.site}</td>
                <td><span class="badge badge-info">${ra.hazards ? ra.hazards.length : 0} Hazards</span></td>
                <td class="no-print">
                  <div style="display:flex; gap: 8px;">
                    <button class="btn btn-secondary" style="padding:6px 10px; font-size:0.8rem;" onclick="viewPrintRisk(${ra.id})">
                      <i class="fas fa-print"></i> Print Report
                    </button>
                    <button class="btn btn-secondary" style="padding:6px 10px; font-size:0.8rem;" onclick="editRisk(${ra.id})">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger" style="padding:6px 10px; font-size:0.8rem;" onclick="deleteRisk(${ra.id})">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </td>
              </tr>
            `).join('') || `<tr><td colspan="6" class="empty-state"><i class="fas fa-shield-alt"></i><p>No risk assessments logged yet</p></td></tr>`}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// Interactive builder view
function renderRiskAssessmentBuilder(ra = null) {
  const isEdit = !!ra;
  return `
    <div class="glass-card">
      <div class="section-header">
        <h2>${isEdit ? 'Edit' : 'Create'} Risk Assessment Report</h2>
        <button class="btn btn-secondary" onclick="navigate('risk-assessments')">
          <i class="fas fa-arrow-left"></i> Back to Registry
        </button>
      </div>

      <form id="riskAssessmentForm" onsubmit="saveRiskAssessment(event, ${isEdit ? ra.id : 'null'})">
        <div class="form-grid">
          <div class="form-group">
            <label for="ra_activity">Activity / Process to Assess *</label>
            <input type="text" id="ra_activity" value="${isEdit ? ra.activity : ''}" required placeholder="e.g. Working at height above 2 meters">
          </div>
          <div class="form-group">
            <label for="ra_date">Assessment Date *</label>
            <input type="date" id="ra_date" value="${isEdit ? ra.date : toLocalDateInputValue()}" required>
          </div>
          <div class="form-group">
            <label for="ra_assessor">Lead Assessor Name *</label>
            <input type="text" id="ra_assessor" value="${isEdit ? ra.assessor : ''}" required placeholder="HSE Officer name">
          </div>
          <div class="form-group">
            <label for="ra_site">Site / Location *</label>
            <input type="text" id="ra_site" value="${isEdit ? ra.site : ''}" required placeholder="e.g. Block C Construction Site">
          </div>
        </div>

        <div class="risk-matrix-wrapper">
          <h3>HSE 5x5 Risk Matrix Reference</h3>
          <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:8px;">
            Risk = Likelihood (1-5) x Severity (1-5). Use this grid to guide assessment scores. Click a cell to view values.
          </p>
          <div class="matrix-grid-5x5">
            <!-- First Row headers -->
            <div class="matrix-axis-label">L \\ S</div>
            <div class="matrix-axis-label">1</div>
            <div class="matrix-axis-label">2</div>
            <div class="matrix-axis-label">3</div>
            <div class="matrix-axis-label">4</div>
            <div class="matrix-axis-label">5</div>
            
            <!-- Row 1 L=1 -->
            <div class="matrix-axis-label">1</div>
            <div class="matrix-cell matrix-low" onclick="showMatrixHelp(1,1)">1</div>
            <div class="matrix-cell matrix-low" onclick="showMatrixHelp(1,2)">2</div>
            <div class="matrix-cell matrix-low" onclick="showMatrixHelp(1,3)">3</div>
            <div class="matrix-cell matrix-low" onclick="showMatrixHelp(1,4)">4</div>
            <div class="matrix-cell matrix-medium" onclick="showMatrixHelp(1,5)">5</div>

            <!-- Row 2 L=2 -->
            <div class="matrix-axis-label">2</div>
            <div class="matrix-cell matrix-low" onclick="showMatrixHelp(2,1)">2</div>
            <div class="matrix-cell matrix-low" onclick="showMatrixHelp(2,2)">4</div>
            <div class="matrix-cell matrix-medium" onclick="showMatrixHelp(2,3)">6</div>
            <div class="matrix-cell matrix-medium" onclick="showMatrixHelp(2,4)">8</div>
            <div class="matrix-cell matrix-high" onclick="showMatrixHelp(2,5)">10</div>

            <!-- Row 3 L=3 -->
            <div class="matrix-axis-label">3</div>
            <div class="matrix-cell matrix-low" onclick="showMatrixHelp(3,1)">3</div>
            <div class="matrix-cell matrix-medium" onclick="showMatrixHelp(3,2)">6</div>
            <div class="matrix-cell matrix-medium" onclick="showMatrixHelp(3,3)">9</div>
            <div class="matrix-cell matrix-high" onclick="showMatrixHelp(3,4)">12</div>
            <div class="matrix-cell matrix-critical" onclick="showMatrixHelp(3,5)">15</div>

            <!-- Row 4 L=4 -->
            <div class="matrix-axis-label">4</div>
            <div class="matrix-cell matrix-low" onclick="showMatrixHelp(4,1)">4</div>
            <div class="matrix-cell matrix-medium" onclick="showMatrixHelp(4,2)">8</div>
            <div class="matrix-cell matrix-high" onclick="showMatrixHelp(4,3)">12</div>
            <div class="matrix-cell matrix-critical" onclick="showMatrixHelp(4,4)">16</div>
            <div class="matrix-cell matrix-critical" onclick="showMatrixHelp(4,5)">20</div>

            <!-- Row 5 L=5 -->
            <div class="matrix-axis-label">5</div>
            <div class="matrix-cell matrix-medium" onclick="showMatrixHelp(5,1)">5</div>
            <div class="matrix-cell matrix-high" onclick="showMatrixHelp(5,2)">10</div>
            <div class="matrix-cell matrix-critical" onclick="showMatrixHelp(5,3)">15</div>
            <div class="matrix-cell matrix-critical" onclick="showMatrixHelp(5,4)">20</div>
            <div class="matrix-cell matrix-critical" onclick="showMatrixHelp(5,5)">25</div>
          </div>
          <div id="matrix-help-box" style="font-size:0.85rem; color:var(--accent); text-align:center; min-height: 20px;"></div>
        </div>

        <div class="hazard-editor-container">
          <div class="section-header">
            <h3>Hazards Identification & Control Sheets</h3>
            <button type="button" class="btn btn-secondary" onclick="addHazardRow()">
              <i class="fas fa-plus"></i> Add Hazard Row
            </button>
          </div>
          
          <div id="hazards-rows-wrapper">
            <!-- Interactive Row cards injected here -->
          </div>
        </div>

        <div style="margin-top:24px; display:flex; justify-content: flex-end; gap:12px;">
          <button type="button" class="btn btn-secondary" onclick="navigate('risk-assessments')">Cancel</button>
          <button type="submit" class="btn btn-primary">
            <i class="fas fa-save"></i> Save Assessment Data
          </button>
        </div>
      </form>
    </div>
  `;
}

// 6. TRAINING LOG COMPONENT
function renderTrainingLogs(trainings, workers) {
  return `
    <div class="glass-card">
      <div class="section-header">
        <h2>HSE Training Registry</h2>
        <div class="header-actions">
          <button class="btn btn-primary" onclick="showModal('trainingModal')">
            <i class="fas fa-user-graduate"></i> Log Training Session
          </button>
        </div>
      </div>

      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Training Subject/Topic</th>
              <th>Trainer Name</th>
              <th>Site/Location</th>
              <th>Duration</th>
              <th>Attendees count</th>
              <th>Remarks</th>
              <th class="no-print">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${trainings.map(t => {
              const count = t.attendees ? t.attendees.length : 0;
              return `
                <tr>
                  <td>${formatDate(t.date)}</td>
                  <td style="font-weight:600;">${t.title}</td>
                  <td>${t.trainer}</td>
                  <td>${t.site}</td>
                  <td>${t.duration || 'N/A'}</td>
                  <td><span class="badge badge-info">${count} Workers</span></td>
                  <td style="font-size:0.85rem; max-width:200px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                    ${t.remarks || 'None'}
                  </td>
                  <td class="no-print">
                    <div style="display:flex; gap: 8px;">
                      <button class="btn btn-secondary" style="padding:6px 10px; font-size:0.8rem;" onclick="editTraining(${t.id})">
                        <i class="fas fa-edit"></i>
                      </button>
                      <button class="btn btn-danger" style="padding:6px 10px; font-size:0.8rem;" onclick="deleteTraining(${t.id})">
                        <i class="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              `;
            }).join('') || `<tr><td colspan="8" class="empty-state"><i class="fas fa-award"></i><p>No training sessions recorded</p></td></tr>`}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// 7. NEAR MISS COMPONENT
function renderNearMisses(nearMisses) {
  return `
    <div class="glass-card">
      <div class="section-header">
        <h2>Near Miss Incident Logs</h2>
        <div class="header-actions">
          <button class="btn btn-danger" onclick="showModal('nearMissModal')">
            <i class="fas fa-exclamation-triangle"></i> Record Near Miss
          </button>
        </div>
      </div>

      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Date / Time</th>
              <th>Site/Location</th>
              <th>Incident Description</th>
              <th>Potential Severity</th>
              <th>Corrective Action Taken</th>
              <th>Reporter</th>
              <th>Status</th>
              <th class="no-print">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${nearMisses.map(nm => `
              <tr>
                <td>${formatDate(nm.date)} - ${nm.time || 'N/A'}</td>
                <td>${nm.site}</td>
                <td style="max-width:250px; font-weight: 500;">${nm.description}</td>
                <td>
                  <span class="badge ${nm.potentialSeverity === 'High' ? 'badge-danger' : nm.potentialSeverity === 'Medium' ? 'badge-warning' : 'badge-success'}">
                    ${nm.potentialSeverity}
                  </span>
                </td>
                <td style="font-size:0.85rem; max-width:200px;">${nm.correctiveAction || '<span style="color:var(--danger)">Pending Action Plan</span>'}</td>
                <td>${nm.reporter || 'Anonymous'}</td>
                <td>
                  <span class="badge ${nm.status === 'Closed' ? 'badge-success' : nm.status === 'Investigating' ? 'badge-warning' : 'badge-danger'}">
                    ${nm.status}
                  </span>
                </td>
                <td class="no-print">
                  <div style="display:flex; gap: 8px;">
                    <button class="btn btn-secondary" style="padding:6px 10px; font-size:0.8rem;" onclick="editNearMiss(${nm.id})">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger" style="padding:6px 10px; font-size:0.8rem;" onclick="deleteNearMiss(${nm.id})">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </td>
              </tr>
            `).join('') || `<tr><td colspan="8" class="empty-state"><i class="fas fa-first-aid"></i><p>Zero near miss incidents reported. Good job!</p></td></tr>`}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// 8. PERIOD REPORT GENERATOR COMPONENT
function renderReportsDashboard() {
  return `
    <div class="glass-card no-print">
      <div class="section-header">
        <h2>Generate Safety Period Reports</h2>
      </div>
      
      <div class="filter-panel" style="background:rgba(255,255,255,0.02); padding:20px; border-radius:var(--radius-md); border:1px solid var(--glass-border);">
        <div class="filter-control">
          <label for="rep_startDate">Start Date *</label>
          <input type="date" id="rep_startDate" required>
        </div>
        <div class="filter-control">
          <label for="rep_endDate">End Date *</label>
          <input type="date" id="rep_endDate" required>
        </div>
        <div class="filter-control" style="justify-content: flex-end;">
          <div style="display:flex; gap:10px;">
            <button class="btn btn-secondary" onclick="presetReportDates('day')">Today</button>
            <button class="btn btn-secondary" onclick="presetReportDates('week')">This Week</button>
            <button class="btn btn-secondary" onclick="presetReportDates('month')">This Month</button>
          </div>
        </div>
        <div class="filter-control" style="justify-content: flex-end; margin-left: auto;">
          <button class="btn btn-primary" onclick="generatePeriodReport()">
            <i class="fas fa-chart-line"></i> Generate Report
          </button>
        </div>
      </div>
    </div>

    <!-- Report Output Container -->
    <div id="reportOutputContainer" style="margin-top: 24px;"></div>
  `;
}

// Render dynamic generated report layout
function renderGeneratedReport(summaryData) {
  const { period, counts, activities, ptws, trainings, nearMisses, sites } = summaryData;
  return `
    <div class="glass-card">
      <div class="section-header no-print">
        <h3>Report Summary for ${formatDate(period.startDate)} to ${formatDate(period.endDate)}</h3>
        <button class="btn btn-primary" onclick="window.print()">
          <i class="fas fa-print"></i> Print / Save PDF
        </button>
      </div>

      <!-- Clean Printable Header for physical prints (hidden in browser screen) -->
      <div class="print-header-layout">
        <div class="print-header-title">HSE SAFETY PERFORMANCE REPORT</div>
        <div class="print-header-sub">
          Period: ${formatDate(period.startDate)} - ${formatDate(period.endDate)} | Generated on: ${new Date().toLocaleDateString()}
        </div>
      </div>

      <!-- Report stats cards -->
      <div class="metrics-grid" style="margin-bottom: 24px;">
        <div class="glass-card metric-card" style="padding:14px;">
          <div class="metric-icon info" style="width:40px; height:40px; font-size:1.1rem;"><i class="fas fa-tasks"></i></div>
          <div class="metric-info">
            <span class="metric-val" style="font-size:1.4rem;">${counts.activities}</span>
            <span class="metric-lbl">Activities Logged</span>
          </div>
        </div>
        <div class="glass-card metric-card" style="padding:14px;">
          <div class="metric-icon accent" style="width:40px; height:40px; font-size:1.1rem;"><i class="fas fa-file-contract"></i></div>
          <div class="metric-info">
            <span class="metric-val" style="font-size:1.4rem;">${counts.ptws}</span>
            <span class="metric-lbl">Permits Issued</span>
          </div>
        </div>
        <div class="glass-card metric-card" style="padding:14px;">
          <div class="metric-icon warning" style="width:40px; height:40px; font-size:1.1rem;"><i class="fas fa-user-graduate"></i></div>
          <div class="metric-info">
            <span class="metric-val" style="font-size:1.4rem;">${counts.trainings}</span>
            <span class="metric-lbl">Trainings Conducted</span>
          </div>
        </div>
        <div class="glass-card metric-card" style="padding:14px;">
          <div class="metric-icon danger" style="width:40px; height:40px; font-size:1.1rem;"><i class="fas fa-exclamation-triangle"></i></div>
          <div class="metric-info">
            <span class="metric-val" style="font-size:1.4rem;">${counts.nearMisses}</span>
            <span class="metric-lbl">Near Misses Logged</span>
          </div>
        </div>
      </div>

      <!-- Section: Activities -->
      <div style="margin-bottom:30px;">
        <h4 style="border-bottom: 1.5px solid var(--accent); padding-bottom:6px; margin-bottom:12px;">Daily Work Activities Record</h4>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Site/Location</th>
                <th>Activity Description</th>
                <th>Supervisor</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${activities.map(a => `
                <tr>
                  <td>${formatDate(a.date)}</td>
                  <td>${a.site}</td>
                  <td>${a.activityName}</td>
                  <td>${a.supervisor}</td>
                  <td>${a.status}</td>
                </tr>
              `).join('') || `<tr><td colspan="5" class="empty-state">No activities logged during this period</td></tr>`}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Section: Permits -->
      <div style="margin-bottom:30px;">
        <h4 style="border-bottom: 1.5px solid var(--info); padding-bottom:6px; margin-bottom:12px;">Issued Permits to Work (PTW)</h4>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Permit No</th>
                <th>Site/Location</th>
                <th>Permit Type</th>
                <th>Issue Date</th>
                <th>Expiry Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${ptws.map(p => `
                <tr>
                  <td>${p.permitNo}</td>
                  <td>${p.site}</td>
                  <td>${p.type}</td>
                  <td>${formatDate(p.issueDate)}</td>
                  <td>${formatDate(p.expiryDate)}</td>
                  <td>${p.status}</td>
                </tr>
              `).join('') || `<tr><td colspan="6" class="empty-state">No Permits to Work issued during this period</td></tr>`}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Section: Near Misses -->
      <div>
        <h4 style="border-bottom: 1.5px solid var(--danger); padding-bottom:6px; margin-bottom:12px;">Near Miss Incident Log</h4>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Site/Location</th>
                <th>Incident Description</th>
                <th>Potential Severity</th>
                <th>Corrective Action</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${nearMisses.map(n => `
                <tr>
                  <td>${formatDate(n.date)}</td>
                  <td>${n.site}</td>
                  <td>${n.description}</td>
                  <td>${n.potentialSeverity}</td>
                  <td>${n.correctiveAction || 'N/A'}</td>
                  <td>${n.status}</td>
                </tr>
              `).join('') || `<tr><td colspan="6" class="empty-state">Zero near misses reported during this period</td></tr>`}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Signatures Footer for print -->
      <div class="print-only-block" style="margin-top:50px;">
        <div style="display:flex; justify-content: space-between;">
          <div style="text-align:center; width:200px; border-top:1px solid #333; padding-top:6px; font-size:9pt;">
            Prepared By: HSE Officer
          </div>
          <div style="text-align:center; width:200px; border-top:1px solid #333; padding-top:6px; font-size:9pt;">
            Approved By: Site Manager
          </div>
        </div>
      </div>

    </div>
  `;
}

// 9. RISK ASSESSMENT PRINTABLE PAGE LAYOUT
function renderPrintableRiskAssessment(ra, calculatedHazards) {
  return `
    <div class="glass-card">
      <div class="section-header no-print">
        <h3>Risk Assessment Document</h3>
        <div class="header-actions">
          <button class="btn btn-secondary" onclick="navigate('risk-assessments')">
            <i class="fas fa-arrow-left"></i> Back
          </button>
          <button class="btn btn-primary" onclick="window.print()">
            <i class="fas fa-print"></i> Print Assessment
          </button>
        </div>
      </div>

      <div class="print-header-layout">
        <div class="print-header-title">HSE JOB RISK ASSESSMENT (JRA)</div>
        <div class="print-header-sub">Document Control Ref: HSE-JRA-${ra.id} | Generated: ${new Date().toLocaleDateString()}</div>
      </div>

      <div class="print-meta-grid">
        <div class="print-meta-item">
          <span class="print-meta-lbl">Activity / Process:</span>
          <span class="print-meta-val">${ra.activity}</span>
        </div>
        <div class="print-meta-item">
          <span class="print-meta-lbl">Assessment Date:</span>
          <span class="print-meta-val">${formatDate(ra.date)}</span>
        </div>
        <div class="print-meta-item">
          <span class="print-meta-lbl">Lead Assessor:</span>
          <span class="print-meta-val">${ra.assessor}</span>
        </div>
        <div class="print-meta-item">
          <span class="print-meta-lbl">Location / Site:</span>
          <span class="print-meta-val">${ra.site}</span>
        </div>
      </div>

      <div style="margin-top:20px;">
        <h4 style="margin-bottom:12px; border-bottom:1.5px solid var(--accent); padding-bottom:6px;">Hazard Analysis & Controls Matrix</h4>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th style="width:6%">Step</th>
                <th style="width:18%">Hazard Identification</th>
                <th style="width:16%">Consequence / Effect</th>
                <th style="width:10%">Initial Risk (L x S)</th>
                <th style="width:22%">Control & Mitigation Measures</th>
                <th style="width:10%">Residual Risk (L x S)</th>
                <th style="width:18%">Action Party</th>
              </tr>
            </thead>
            <tbody>
              ${calculatedHazards.map(h => `
                <tr>
                  <td style="text-align:center; font-weight:600;">${h.step || '1'}</td>
                  <td>${h.hazard}</td>
                  <td>${h.consequence}</td>
                  <td style="text-align:center;">
                    L:${h.initialL} | S:${h.initialS}
                    <br>${getRiskBadge(h.initialR)}
                  </td>
                  <td>${h.controls}</td>
                  <td style="text-align:center;">
                    L:${h.residualL} | S:${h.residualS}
                    <br>${getRiskBadge(h.residualR)}
                  </td>
                  <td>${h.actionParty}</td>
                </tr>
              `).join('') || `<tr><td colspan="7" class="empty-state">No hazard items mapped to this assessment</td></tr>`}
            </tbody>
          </table>
        </div>
      </div>

      <div class="print-only-block" style="margin-top: 50px;">
        <p style="font-size:8pt; margin-bottom:20px; line-height:1.4;">
          <strong>Declaration:</strong> We, the assessment team, declare that the above hazards have been identified and the corresponding control measures are active and have been communicated to all site supervisors and field crews.
        </p>
        <div style="display:flex; justify-content: space-between; margin-top:30px;">
          <div style="text-align:center; width:220px; border-top:1px solid #333; padding-top:6px; font-size:9pt;">
            Assessor Signature: __________________
          </div>
          <div style="text-align:center; width:220px; border-top:1px solid #333; padding-top:6px; font-size:9pt;">
            Site Director Endorsement: ______________
          </div>
        </div>
      </div>
    </div>
  `;
}

// =================================-----------------------------
// SCALED SAFETY PORTAL - DYNAMIC SCHEMAS, TABLES, AND BUILDERS
// =================================-----------------------------

const HSE_SCHEMAS = {
  equipment: {
    title: 'Critical Equipment Details / بيانات المعدات الحرجة',
    tableCols: ['equipmentNo', 'type', 'manufacturer', 'capacity', 'inspectionDate', 'colorCode', 'thirdPartyCert', 'status'],
    colLabels: {
      equipmentNo: 'Equipment No / رقم المعدة',
      type: 'Type / النوع',
      manufacturer: 'Manufacturer / الشركة المصنعة',
      capacity: 'Capacity / القدرة التشغيلية',
      inspectionDate: 'Insp. Date / تاريخ الفحص',
      colorCode: 'Color Tag / لون الفحص',
      thirdPartyCert: 'Third Party / الطرف الثالث',
      status: 'Status / الحالة'
    },
    fields: [
      { id: 'equipmentNo', label: 'Equipment Number / ID * (رقم المعدة)', type: 'text', required: true, placeholder: 'e.g. EQ-CR-01' },
      { id: 'type', label: 'Equipment Type * (نوع المعدة)', type: 'text', required: true, placeholder: 'e.g. Mobile Crane 50T' },
      { id: 'manufacturer', label: 'Manufacturer (الشركة المصنعة)', type: 'text', placeholder: 'e.g. Liebherr' },
      { id: 'capacity', label: 'Operating Capacity (القدرة التشغيلية)', type: 'text', placeholder: 'e.g. 50 Tons' },
      { id: 'inspectionDate', label: 'Inspection Date (تاريخ الفحص)', type: 'date' },
      { id: 'colorCode', label: 'Inspection Color Tag (لون الفحص)', type: 'select', options: ['Blue (Q1) / أزرق', 'Green (Q2) / أخضر', 'Yellow (Q3) / أصفر', 'Red (Q4) / أحمر', 'None / بدون'] },
      { id: 'thirdPartyCert', label: 'Third Party Certificate Status (شهادة الطرف الثالث)', type: 'select', options: ['Valid / سارية', 'Expired / منتهية', 'Not Required / غير مطلوب'] },
      { id: 'status', label: 'Equipment Status (حالة المعدة)', type: 'select', options: ['Fit / صالحة للعمل', 'Unfit / غير صالحة للعمل'] }
    ]
  },
  store: {
    title: 'Store & Warehouse Assets / المخزن وتعريف الأدوات والمعدات',
    tableCols: ['itemName', 'serialNo', 'quantity', 'lastInspectionDate', 'status', 'description'],
    colLabels: {
      itemName: 'Item Name / الاسم',
      serialNo: 'Serial No / الرقم التسلسلي',
      quantity: 'Quantity / الكمية',
      lastInspectionDate: 'Last Inspection / تاريخ الفحص',
      status: 'Status / حالة الأداة',
      description: 'Location / Description / الوصف'
    },
    fields: [
      { id: 'itemName', label: 'Item / Safety Tool Name * (اسم الأداة)', type: 'text', required: true, placeholder: 'e.g. Safety Harness, Gas Detector, Extinguisher' },
      { id: 'serialNo', label: 'Serial Number / Asset ID (الرقم التسلسلي)', type: 'text', placeholder: 'e.g. SN-8921-X' },
      { id: 'quantity', label: 'Stock Quantity (الكمية بالمخزن)', type: 'number', placeholder: 'e.g. 15' },
      { id: 'lastInspectionDate', label: 'Last Safety Check Date (تاريخ آخر فحص)', type: 'date' },
      { id: 'status', label: 'Safety / Wear Status (حالة الأداة)', type: 'select', options: ['Safe / صالحة للاستخدام', 'Damaged / تالفة ومستبعدة', 'Needs Inspection / تحتاج فحص فني'] },
      { id: 'description', label: 'Storage / Item Description (الوصف والموقع بالمخزن)', type: 'textarea', placeholder: 'Specify storage rack number, size, or safety rating...' }
    ]
  },
  maintenance: {
    title: 'Equipment Maintenance Log / سجل الصيانة والاصلاحات',
    tableCols: ['equipmentName', 'type', 'date', 'executor', 'nextDate', 'notes'],
    colLabels: {
      equipmentName: 'Equipment Name / المعدة',
      type: 'Maint. Type / نوع الصيانة',
      date: 'Date / تاريخ الصيانة',
      executor: 'Executed By / المنفذ',
      nextDate: 'Next Maint. / موعد الصيانة القادمة',
      notes: 'Notes / الملاحظات'
    },
    fields: [
      { id: 'equipmentName', label: 'Equipment ID / Name * (اسم المعدة)', type: 'text', required: true, placeholder: 'e.g. EQ-CR-01' },
      { id: 'type', label: 'Maintenance Type * (نوع الصيانة)', type: 'select', options: ['Preventive / صيانة وقائية', 'Breakdown / إصلاح عطل مفاجئ', 'Routine / فحص روتيني وسيرفيس'], required: true },
      { id: 'date', label: 'Maintenance Date * (تاريخ الصيانة)', type: 'date', required: true },
      { id: 'executor', label: 'Executed By * (المنفذ)', type: 'text', required: true, placeholder: 'Name of technician or maintenance provider' },
      { id: 'nextDate', label: 'Next Scheduled Maintenance (موعد الصيانة القادمة)', type: 'date' },
      { id: 'notes', label: 'Maintenance Notes / Remarks (ملاحظات الصيانة والقطع المستبدلة)', type: 'textarea', placeholder: 'Detail parts replaced, tests done...' }
    ]
  },
  incidents: {
    title: 'Incident & Injury Registry / سجل الحوادث والإصابات في الموقع',
    tableCols: ['incidentNo', 'date', 'location', 'injuryType', 'injuredPerson', 'downtimeDays', 'investigationResults', 'correctiveActions'],
    colLabels: {
      incidentNo: 'Incident No / رقم الحادث',
      date: 'Date / التاريخ',
      location: 'Location / الموقع',
      injuryType: 'Injury Type / نوع الإصابة',
      injuredPerson: 'Injured Staff / المصاب',
      downtimeDays: 'Downtime (Days) / أيام التوقف',
      investigationResults: 'Investigation / نتائج التحقيق',
      correctiveActions: 'Corrective Action / إجراء تصحيحي'
    },
    fields: [
      { id: 'incidentNo', label: 'Incident Reference Number * (رقم الحادث)', type: 'text', required: true, placeholder: 'e.g. INC-2026-01' },
      { id: 'date', label: 'Incident Date * (تاريخ الحادث)', type: 'date', required: true },
      { id: 'location', label: 'Location of Incident * (موقع الحادث)', type: 'text', required: true, placeholder: 'e.g. Sector-3 Scaffold erection area' },
      { id: 'injuryType', label: 'Injury / Incident Class * (نوع الإصابة)', type: 'select', options: ['LTI / إصابة مضيعة للوقت', 'Medical Treatment / علاج طبي بالمستشفى', 'First Aid / إسعاف أولي بالموقع', 'Property Damage / تلف ممتلكات فقط', 'Near Miss / حادث وشيك بدون إصابة'], required: true },
      { id: 'injuredPerson', label: 'Injured Person Name(s) (اسم المصاب)', type: 'text', placeholder: 'e.g. Ahmed Salem (leave empty if property damage)' },
      { id: 'downtimeDays', label: 'Downtime Days (أيام التوقف عن العمل)', type: 'number', placeholder: 'e.g. 5' },
      { id: 'investigationResults', label: 'Investigation Findings (نتائج التحقيق وأسباب الحادث)', type: 'textarea', placeholder: 'Describe root causes discovered...' },
      { id: 'correctiveActions', label: 'Corrective & Preventive Actions (الإجراءات التصحيحية المتخذة)', type: 'textarea', placeholder: 'Specify tasks assigned to prevent recurrence...' }
    ]
  },
  'safe-hours': {
    title: 'Safe Working Hours Register / سجل ساعات العمل الآمنة',
    tableCols: ['date', 'workerCount', 'dailyHours', 'monthlyHours', 'incidentCount', 'safeDays'],
    colLabels: {
      date: 'Month / Month Date / الشهر',
      workerCount: 'Worker Count / عدد العمال',
      dailyHours: 'Daily Hours / الساعات اليومية',
      monthlyHours: 'Monthly Man-Hours / الساعات الشهرية',
      incidentCount: 'Incident Count / عدد الحوادث',
      safeDays: 'Safe Days / العمل بدون إصابة'
    },
    fields: [
      { id: 'date', label: 'Reporting Month / Period Date * (الشهر والتاريخ)', type: 'date', required: true },
      { id: 'workerCount', label: 'Number of Active Workers * (عدد العمال)', type: 'number', required: true, placeholder: 'e.g. 35' },
      { id: 'dailyHours', label: 'Average Daily Hours Per Worker * (ساعات العمل اليومية)', type: 'number', required: true, placeholder: 'e.g. 8' },
      { id: 'monthlyHours', label: 'Total Monthly Man-Hours (ساعات العمل الإجمالية)', type: 'number', placeholder: 'e.g. 7280' },
      { id: 'incidentCount', label: 'Number of LTI incidents (عدد الحوادث)', type: 'number', placeholder: 'e.g. 0' },
      { id: 'safeDays', label: 'LTI-Free Days (أيام العمل بدون إصابات)', type: 'number', placeholder: 'e.g. 180' }
    ]
  },
  'emergency-teams': {
    title: 'Emergency Response Teams Register / سجل فرق الطوارئ ومؤهلاتهم',
    tableCols: ['teamType', 'members', 'certificates'],
    colLabels: {
      teamType: 'Team / فريق الطوارئ',
      members: 'Members & Badges / الأعضاء',
      certificates: 'Training Certificates / الشهادات والاعتمادات'
    },
    fields: [
      { id: 'teamType', label: 'Emergency Team Type * (فريق الطوارئ)', type: 'select', options: ['Ambulance Team / فريق الإسعاف الأولي', 'Firefighting Team / فريق الإطفاء ومكافحة الحرائق', 'Rescue Team / فريق الإنقاذ', 'Evacuation Team / فريق الإخلاء والتوجيه'], required: true },
      { id: 'members', label: 'Team Members (Names & Badge Codes) * (بيانات الأعضاء)', type: 'textarea', required: true, placeholder: 'e.g. Ahmed Salem (W-1008), Ibrahim Hassan (W-1002)...' },
      { id: 'certificates', label: 'Training Certificates & Validity Dates (الشهادات والاعتمادات)', type: 'textarea', placeholder: 'e.g. Red Crescent CPR (Exp: Dec 2026), Civil Defense Firefighting (Exp: Jan 2027)...' }
    ]
  },
  'pre-operation': {
    title: 'Pre-operation Inspection Form / نموذج فحص المعدة ما قبل التشغيل',
    tableCols: ['equipmentNo', 'code', 'date', 'leakage', 'abnormalSounds', 'tiresCondition', 'brakesCondition', 'warningDevices', 'operatorSignature'],
    colLabels: {
      equipmentNo: 'Equipment No / رقم المعدة',
      code: 'Inspection Code / الكود',
      date: 'Date / تاريخ الفحص',
      leakage: 'Leakages / تسريبات',
      abnormalSounds: 'Sounds / أصوات غير طبيعية',
      tiresCondition: 'Tires / الإطارات',
      brakesCondition: 'Brakes / الفرامل',
      warningDevices: 'Alarms / أجهزة التحذير',
      operatorSignature: 'Operator / توقيع المشغل'
    },
    fields: [
      { id: 'equipmentNo', label: 'Equipment ID / Number * (رقم المعدة)', type: 'text', required: true, placeholder: 'e.g. EQ-CR-01' },
      { id: 'code', label: 'Inspection Checklist Code * (الكود)', type: 'text', required: true, placeholder: 'e.g. PRE-OP-9081' },
      { id: 'date', label: 'Inspection Date * (تاريخ الفحص)', type: 'date', required: true },
      { id: 'leakage', label: 'Fluid Leakages? (وجود تسريبات)', type: 'select', options: ['None / لا يوجد تسريب', 'Minor / تسريب بسيط تحت المراقبة', 'Severe / تسريب شديد - إيقاف العمل!'] },
      { id: 'abnormalSounds', label: 'Abnormal Sounds? (وجود أصوات غير طبيعية)', type: 'select', options: ['No / لا يوجد أصوات غير طبيعية', 'Yes / يوجد أصوات غير طبيعية - إيقاف العمل!'] },
      { id: 'tiresCondition', label: 'Tires / Tracks Condition (حالة الإطارات)', type: 'select', options: ['OK / سليمة', 'Damaged / تالفة تحتاج تغيير', 'N/A'] },
      { id: 'brakesCondition', label: 'Brakes Condition (حالة الفرامل)', type: 'select', options: ['OK / سليمة وتعمل بقوة', 'Unsafe / غير آمنة - إيقاف العمل!'] },
      { id: 'warningDevices', label: 'Warning Alarms & Beacons (أجهزة التحذير)', type: 'select', options: ['Working / تعمل بشكل سليم', 'Faulty / معطلة تحتاج إصلاح', 'N/A'] },
      { id: 'beltsCondition', label: 'Belts & Hydraulics Condition (حالة الأحزمة والخراطيم)', type: 'select', options: ['OK / سليمة', 'Worn / متهالكة تحتاج استبدال'] },
      { id: 'operatorSignature', label: 'Inspected Operator Signature * (توقيع المشغل الفاحص)', type: 'text', required: true, placeholder: 'Operator full name' }
    ]
  },
  'equipment-readiness': {
    title: 'Equipment Readiness for Task Checklist / قائمة جاهزية المعدات للمهمة',
    tableCols: ['equipmentId', 'date', 'suitableForTask', 'capacitySuitable', 'fastenersIntact', 'safetyGuardsAvailable', 'approvedInspection', 'inspectorName'],
    colLabels: {
      equipmentId: 'Equipment Name / المعدة',
      date: 'Date / تاريخ التأكيد',
      suitableForTask: 'Scope Ok / مناسبة للمهمة',
      capacitySuitable: 'Capacity Ok / القدرة مناسبة',
      fastenersIntact: 'Rigging Ok / أدوات الربط سليمة',
      safetyGuardsAvailable: 'Guards Ok / وسائل الحماية',
      approvedInspection: 'Approved / فحص معتمد',
      inspectorName: 'Inspector / الفاحص'
    },
    fields: [
      { id: 'equipmentId', label: 'Equipment ID / Name * (المعدة)', type: 'text', required: true, placeholder: 'e.g. EQ-CR-01' },
      { id: 'date', label: 'Readiness Checklist Date * (التاريخ)', type: 'date', required: true },
      { id: 'suitableForTask', label: 'Equipment Suitable for Task Scope? (المعدة مناسبة للمهمة)', type: 'select', options: ['Yes / نعم مناسبة', 'No / لا غير مناسبة'] },
      { id: 'capacitySuitable', label: 'Operating Capacity matches Task Loads? (القدرة التشغيلية مناسبة)', type: 'select', options: ['Yes / نعم مناسبة', 'No / لا غير مناسبة'] },
      { id: 'fastenersIntact', label: 'Rigging Tools & Fasteners Intact? (أدوات الربط سليمة)', type: 'select', options: ['Yes / نعم سليمة ومفحوصة', 'No / لا يوجد تلف', 'N/A'] },
      { id: 'safetyGuardsAvailable', label: 'Guards, Barriers, & Shields Active? (وسائل الحماية متوفرة)', type: 'select', options: ['Yes / نعم متوفرة وسليمة', 'No / لا غير متوفرة'] },
      { id: 'approvedInspection', label: 'Third-Party Inspection Certificate Approved? (فحص معتمد)', type: 'select', options: ['Yes / نعم معتمد وساري', 'No / لا منتهي أو غير متوفر'] },
      { id: 'inspectorName', label: 'Lead Inspector / Safety Officer * (توقيع الفاحص)', type: 'text', required: true, placeholder: 'HSE Officer full name' }
    ]
  },
  'task-workers': {
    title: 'Task Workers Assignment Checklist / قائمة العاملين بالمهمة والجاهزية',
    tableCols: ['taskTitle', 'date', 'workersDetails'],
    colLabels: {
      taskTitle: 'Task Title / المهمة',
      date: 'Date / التاريخ',
      workersDetails: 'Workers & Fitness Details / العاملين بالمهمة'
    },
    fields: [
      { id: 'taskTitle', label: 'Task / Operation Title * (عنوان المهمة)', type: 'text', required: true, placeholder: 'e.g. Scaffold dismantling Block C' },
      { id: 'date', label: 'Assignment Date * (تاريخ العمل)', type: 'date', required: true },
      { id: 'workersDetails', label: 'Workers Details (Name, Trade, Certificate status, Medical Fitness, Permit Ref, Signature) * (بيانات العاملين)', type: 'textarea', required: true, placeholder: '1. Ahmed Salem - Scaffold Erector - Valid Cert - Fit - PTW-HOT-901 - Signed\n2. Ibrahim Hassan - Rigger - Valid Cert - Fit - PTW-HOT-901 - Signed...' }
    ]
  },
  'emergency-checklists': {
    title: 'Emergency Team Check & Readiness / قائمة فريق الطوارئ والجاهزية',
    tableCols: ['date', 'teamType', 'checkedName', 'phone', 'certificateStatus', 'inspectorName'],
    colLabels: {
      date: 'Date / تاريخ الفحص',
      teamType: 'Emergency Team / نوع الفريق',
      checkedName: 'Staff Member / العضو المفحوص',
      phone: 'Phone / رقم الهاتف',
      certificateStatus: 'Cert Ok / حالة الشهادة',
      inspectorName: 'Safety Lead / الفاحص المسؤول'
    },
    fields: [
      { id: 'date', label: 'Readiness Inspection Date * (التاريخ)', type: 'date', required: true },
      { id: 'teamType', label: 'Emergency Team Type * (نوع الفريق)', type: 'select', options: ['Ambulance Team / إسعاف', 'Firefighting / إطفاء', 'Rescue Team / إنقاذ', 'Evacuation / إخلاء'], required: true },
      { id: 'checkedName', label: 'Staff Member Checked * (الاسم)', type: 'text', required: true, placeholder: 'e.g. Ahmed Salem' },
      { id: 'phone', label: 'Contact Phone Number (رقم الهاتف)', type: 'text', placeholder: 'e.g. +966500000000' },
      { id: 'certificateStatus', label: 'Training Certificate Valid? (الشهادة والتدريب)', type: 'select', options: ['Yes / نعم سارية وموثقة', 'No / لا منتهية أو معلقة'] },
      { id: 'inspectorName', label: 'Safety Lead Inspector * (المشرف الفاحص)', type: 'text', required: true, placeholder: 'HSE Lead Officer name' }
    ]
  },
  'tbt-register': {
    title: 'Tool Box Talk Briefing Register / سجل Tool Box Talk ومحاضرات السلامة',
    tableCols: ['taskTitle', 'date', 'supervisor', 'attendeesCount', 'hazards', 'preventiveActions'],
    colLabels: {
      taskTitle: 'Task/Subject / عنوان المهمة',
      date: 'Date / التاريخ',
      supervisor: 'Supervisor / المحاضر',
      attendeesCount: 'Attendees / الحضور',
      hazards: 'Hazards Discussed / الأخطار',
      preventiveActions: 'Controls / الإجراءات الوقائية'
    },
    fields: [
      { id: 'taskTitle', label: 'Task / Operation / Briefing Subject * (عنوان المهمة)', type: 'text', required: true, placeholder: 'e.g. Excavation and trench shoring safety briefing' },
      { id: 'date', label: 'Briefing Date * (التاريخ)', type: 'date', required: true },
      { id: 'supervisor', label: 'Supervisor / Briefed By * (المشرف / المحاضر)', type: 'text', required: true, placeholder: 'e.g. Eng: Ashraf Hegazy' },
      { id: 'hazards', label: 'Hazards Identified & Discussed (الأخطار المناقشة)', type: 'textarea', placeholder: 'e.g. Falling into excavation, toxic gases accumulation, cave-in...' },
      { id: 'preventiveActions', label: 'Mitigations & PPE Required (الإجراءات الوقائية ومعدات السلامة)', type: 'textarea', placeholder: 'e.g. Shore trenches, gas testing, wear hard hats & steel-toe shoes, warning tape...' },
      { id: 'attendeesCount', label: 'Number of Attending Workers (عدد العمال الحاضرين)', type: 'number', placeholder: 'e.g. 15' },
      { id: 'attendeesSignatures', label: 'Attendee Names & Signatures Confirmation (الحضور وتوقيع العمال)', type: 'textarea', placeholder: 'e.g. Ahmed Salem (signed), Ibrahim Hassan (signed)...' }
    ]
  },
  'attendance-exit': {
    title: 'Worker Attendance & Exit Log / سجل الحضور والانصراف للعاملين',
    tableCols: ['date', 'workerName', 'clockInTime', 'clockOutTime', 'signature'],
    colLabels: {
      date: 'Date / التاريخ',
      workerName: 'Worker Name / الاسم',
      clockInTime: 'Clock In / الدخول',
      clockOutTime: 'Clock Out / الخروج',
      signature: 'Signature / التوقيع'
    },
    fields: [
      { id: 'date', label: 'Date * (التاريخ)', type: 'date', required: true },
      { id: 'workerName', label: 'Worker Name * (اسم العامل)', type: 'text', required: true, placeholder: 'e.g. Ahmed Salem' },
      { id: 'clockInTime', label: 'Clock In Time * (وقت الدخول)', type: 'time', required: true },
      { id: 'clockOutTime', label: 'Clock Out Time (وقت الخروج)', type: 'time' },
      { id: 'signature', label: 'Worker Signature Confirmation (التوقيع)', type: 'text', placeholder: 'Worker name signature confirmation' }
    ]
  },
  'method-statements': {
    title: 'Method Statement (Work Execution Plan) / خطة العمل وطريقة التنفيذ',
    tableCols: ['activityDescription', 'date', 'preparedBy', 'equipmentUsed', 'safetyMeasures'],
    colLabels: {
      activityDescription: 'Work Scope / وصف النشاط',
      date: 'Date / التاريخ',
      preparedBy: 'Prepared By / المعد',
      equipmentUsed: 'Equipment / المعدات المستخدمة',
      safetyMeasures: 'Safety Controls / إجراءات السلامة'
    },
    fields: [
      { id: 'activityDescription', label: 'Activity Description & Scope * (وصف النشاط)', type: 'text', required: true, placeholder: 'e.g. Underground cabling installation inside trenches' },
      { id: 'date', label: 'Prepared Date * (التاريخ)', type: 'date', required: true },
      { id: 'preparedBy', label: 'Prepared By * (معد خطة العمل)', type: 'text', required: true, placeholder: 'e.g. Aban Contracting Safety Department' },
      { id: 'executionSteps', label: 'Execution Steps * (خطوات التنفيذ بالتفصيل)', type: 'textarea', required: true, placeholder: '1. Lay out warning tapes.\n2. Excavate trench to 1.2m depth.\n3. Pull electrical cables...' },
      { id: 'equipmentUsed', label: 'Equipment & Machinery Used (المعدات المستخدمة)', type: 'textarea', placeholder: 'e.g. Excavator 20T, Forklift 3T, cable rollers, compactors...' },
      { id: 'workforce', label: 'Required Workforce Roles (القوى العاملة المطلوبة)', type: 'textarea', placeholder: 'e.g. Safety supervisor (1), Excavator operator (1), Electricians (4)...' },
      { id: 'safetyMeasures', label: 'Safety & Control Measures (إجراءات السلامة والوقاية)', type: 'textarea', placeholder: 'e.g. Trench shoring system, gas check before entry, full PPE, warning barriers...' },
      { id: 'responsibilities', label: 'Responsibilities Matrix (توزيع المسؤوليات)', type: 'textarea', placeholder: 'e.g. Excavation safety: Trench Foreman, Electrical testing: Lead Electrician...' }
    ]
  },
  'lifting-plans': {
    title: 'Critical Lifting Plan Form / خطة الرفع والأوزان الحرجة للونش',
    tableCols: ['loadWeight', 'loadType', 'date', 'swl', 'craneType', 'driver', 'rigger', 'supervisor'],
    colLabels: {
      loadWeight: 'Load / الوزن',
      loadType: 'Load Type / نوع الحمل',
      date: 'Date / التاريخ',
      swl: 'SWL / أقصى حمولة آمنة',
      craneType: 'Crane / الونش',
      driver: 'Operator / السائق',
      rigger: 'Rigger / الرافع',
      supervisor: 'Lifting Supervisor / المشرف'
    },
    fields: [
      { id: 'loadWeight', label: 'Weight of Load * (وزن الحمل)', type: 'text', required: true, placeholder: 'e.g. 12.5 Tons' },
      { id: 'loadType', label: 'Type of Load (Material/Shape) * (نوع الحمل)', type: 'text', required: true, placeholder: 'e.g. Concrete precast column' },
      { id: 'date', label: 'Lifting Date * (تاريخ الرفع)', type: 'date', required: true },
      { id: 'slingType', label: 'Sling & Shackle Type / Size (نوع الحبال والربط)', type: 'text', placeholder: 'e.g. Wire rope sling 4-leg 28mm' },
      { id: 'swl', label: 'Safe Working Load (SWL) of Rigging (أقصى حمولة آمنة)', type: 'text', placeholder: 'e.g. 15 Tons SWL' },
      { id: 'craneType', label: 'Mobile Crane Model / Type (نوع الونش)', type: 'text', placeholder: 'e.g. Tadano ATF-200' },
      { id: 'craneCapacity', label: 'Crane Rated Capacity (قدرة الونش)', type: 'text', placeholder: 'e.g. 200 Tons' },
      { id: 'boomLength', label: 'Boom Length (m) (طول الذراع)', type: 'text', placeholder: 'e.g. 34.2 meters' },
      { id: 'angle', label: 'Lifting Angle (degrees) (الزاوية)', type: 'text', placeholder: 'e.g. 45 degrees' },
      { id: 'driver', label: 'Crane Operator Name (سائق الونش)', type: 'text', placeholder: 'e.g. Murad Saud' },
      { id: 'rigger', label: 'Certified Rigger Name (الرافع)', type: 'text', placeholder: 'e.g. Alaa Moustafa' },
      { id: 'banksman', label: 'Signaler / Banksman Name (الموجه)', type: 'text', placeholder: 'e.g. Ibrahim Hassan' },
      { id: 'supervisor', label: 'Lifting Supervisor Name * (المشرف المسؤول)', type: 'text', required: true, placeholder: 'Lifting supervisor full name' }
    ]
  },
  'emergency-plans': {
    title: 'Emergency Response Plan (ERP) / خطة الطوارئ والاستجابة السريعة',
    tableCols: ['date', 'author', 'hazards', 'emergencyNumbers'],
    colLabels: {
      date: 'Date / تاريخ المراجعة',
      author: 'Author / المعد',
      hazards: 'Hazards Scenarios / الأخطار المحتملة',
      emergencyNumbers: 'Emergency Contacts / أرقام الطوارئ'
    },
    fields: [
      { id: 'hazards', label: 'Potential Emergency Scenarios * (الأخطار المحتملة وسيناريوهات الطوارئ)', type: 'textarea', required: true, placeholder: 'e.g. Trench collapse, combustible gas leaks, fire in fuel storage...' },
      { id: 'date', label: 'Plan Revision Date * (التاريخ)', type: 'date', required: true },
      { id: 'author', label: 'HSE Coordinator / Author * (معد الخطة)', type: 'text', required: true, placeholder: 'e.g. Alaa Moustafa (Safety Officer)' },
      { id: 'emergencyNumbers', label: 'Critical Emergency Contacts (أرقام الطوارئ الأساسية)', type: 'textarea', placeholder: 'Civil Defense: 998, Ambulance: 997, Site Safety Office: +966...' },
      { id: 'responseTeam', label: 'Emergency First Responders Assignment (فريق الاستجابة)', type: 'textarea', placeholder: 'Fire Warden: Ahmed Salem, First Aid: Ibrahim Hassan, Gate control: Murad...' },
      { id: 'emergencyEquipment', label: 'On-site Emergency Assets (معدات الطوارئ المتوفرة)', type: 'textarea', placeholder: 'e.g. Fire extinguishers (CO2/Dry), chemical spill kits, eye wash, rescue stretcher...' },
      { id: 'assemblyPoints', label: 'Assembly Points Locations (نقاط التجمع)', type: 'textarea', placeholder: 'Primary: Gate 1 Assembly Area, Secondary: Sector-4 Parking...' },
      { id: 'evacuationPlan', label: 'Evacuation & Rescue Strategy (خطة الإخلاء)', type: 'textarea', placeholder: 'In case of alarm, shutdown machinery, walk along designated green escape routes to assembly area...' },
      { id: 'communication', label: 'Emergency Communication Protocol (وسائل الاتصال)', type: 'textarea', placeholder: 'Use Radio Channel 2 for emergency communications, supervisor alerts safety manager immediately...' }
    ]
  }
};

// Render List Tables for generic collections
function renderListTable(section, items) {
  const schema = HSE_SCHEMAS[section];
  if (!schema) return `<div class="glass-card"><p>Error: Schema not found for section: ${section}</p></div>`;

  const isPlanOrChecklist = ['method-statements', 'lifting-plans', 'emergency-plans', 'pre-operation', 'tbt-register'].includes(section);

  return `
    <div class="glass-card">
      <div class="section-header">
        <h2>${schema.title}</h2>
        <div class="header-actions">
          <button class="btn btn-primary" onclick="initNewGenericRecord('${section}')">
            <i class="fas fa-plus"></i> Add New Record / إضافة
          </button>
        </div>
      </div>

      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              ${schema.tableCols.map(col => `<th>${schema.colLabels[col] || col}</th>`).join('')}
              <th class="no-print">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${items.map(item => `
              <tr>
                ${schema.tableCols.map(col => {
                  let val = item[col];
                  if (col.toLowerCase().includes('date')) val = formatDate(val);
                  return `<td>${val === undefined || val === null || val === '' ? '<span style="color:var(--text-muted)">N/A</span>' : val}</td>`;
                }).join('')}
                <td class="no-print">
                  <div style="display:flex; gap: 8px;">
                    ${isPlanOrChecklist ? `
                      <button class="btn btn-secondary" style="padding:6px 10px; font-size:0.8rem;" onclick="viewPrintGeneric('${section}', ${item.id})">
                        <i class="fas fa-print"></i> Print
                      </button>
                    ` : ''}
                    <button class="btn btn-secondary" style="padding:6px 10px; font-size:0.8rem;" onclick="editGenericRecord('${section}', ${item.id})">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger" style="padding:6px 10px; font-size:0.8rem;" onclick="deleteGenericRecord('${section}', ${item.id})">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </td>
              </tr>
            `).join('') || `<tr><td colspan="${schema.tableCols.length + 1}" class="empty-state"><i class="fas fa-folder-open"></i><p>No records found / لم يتم إضافة بيانات بعد</p></td></tr>`}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// Build Generic Form HTML dynamically from schema fields
function buildGenericFormHtml(section, record = null) {
  const schema = HSE_SCHEMAS[section];
  if (!schema) return '';

  return schema.fields.map(field => {
    const value = record ? (record[field.id] || '') : '';
    const requiredAttr = field.required ? 'required' : '';
    const placeholder = field.placeholder || '';

    let inputHtml = '';
    if (field.type === 'select') {
      inputHtml = `
        <select id="gen_${field.id}" ${requiredAttr}>
          <option value="">-- Select --</option>
          ${field.options.map(opt => {
            const isSelected = value === opt ? 'selected' : '';
            return `<option value="${opt}" ${isSelected}>${opt}</option>`;
          }).join('')}
        </select>
      `;
    } else if (field.type === 'textarea') {
      inputHtml = `<textarea id="gen_${field.id}" placeholder="${placeholder}" ${requiredAttr}>${value}</textarea>`;
    } else if (field.type === 'date') {
      // Clean up ISO date formatting if needed
      const cleanDate = value.includes('T') ? value.split('T')[0] : value;
      inputHtml = `<input type="date" id="gen_${field.id}" value="${cleanDate}" ${requiredAttr}>`;
    } else {
      inputHtml = `<input type="${field.type}" id="gen_${field.id}" value="${value}" placeholder="${placeholder}" ${requiredAttr}>`;
    }

    const fullWidthClass = (field.type === 'textarea' || field.id === 'type' || field.id === 'itemName') ? 'full-width' : '';

    return `
      <div class="form-group ${fullWidthClass}">
        <label for="gen_${field.id}">${field.label}</label>
        ${inputHtml}
      </div>
    `;
  }).join('');
}

// Render dedicated Color Matrix and Color Coding page/tab
function renderMatrixRef() {
  return `
    <div class="glass-card">
      <div class="section-header">
        <h2>HSE 5x5 Risk Assessment Matrix & Color Coding Guide / دليل مصفوفة المخاطر وأكواد الألوان</h2>
      </div>

      <div class="ref-card-grid">
        
        <!-- 1. Risk Assessment 5x5 Grid -->
        <div class="glass-card" style="padding:18px;">
          <h3>5x5 Risk Matrix / مصفوفة تقييم المخاطر</h3>
          <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:12px; line-height:1.4;">
            Risk Score = Likelihood (الاحتمالية 1-5) &times; Severity (الخطورة 1-5). Use this grid to guide safety controls.
          </p>
          
          <div class="matrix-grid-5x5" style="max-width:100%; margin: 10px 0;">
            <div class="matrix-axis-label">L \\ S</div>
            <div class="matrix-axis-label">1</div>
            <div class="matrix-axis-label">2</div>
            <div class="matrix-axis-label">3</div>
            <div class="matrix-axis-label">4</div>
            <div class="matrix-axis-label">5</div>
            
            <div class="matrix-axis-label">1</div>
            <div class="matrix-cell matrix-low">1</div>
            <div class="matrix-cell matrix-low">2</div>
            <div class="matrix-cell matrix-low">3</div>
            <div class="matrix-cell matrix-low">4</div>
            <div class="matrix-cell matrix-medium">5</div>

            <div class="matrix-axis-label">2</div>
            <div class="matrix-cell matrix-low">2</div>
            <div class="matrix-cell matrix-low">4</div>
            <div class="matrix-cell matrix-medium">6</div>
            <div class="matrix-cell matrix-medium">8</div>
            <div class="matrix-cell matrix-high">10</div>

            <div class="matrix-axis-label">3</div>
            <div class="matrix-cell matrix-low">3</div>
            <div class="matrix-cell matrix-medium">6</div>
            <div class="matrix-cell matrix-medium">9</div>
            <div class="matrix-cell matrix-high">12</div>
            <div class="matrix-cell matrix-critical">15</div>

            <div class="matrix-axis-label">4</div>
            <div class="matrix-cell matrix-low">4</div>
            <div class="matrix-cell matrix-medium">8</div>
            <div class="matrix-cell matrix-high">12</div>
            <div class="matrix-cell matrix-critical">16</div>
            <div class="matrix-cell matrix-critical">20</div>

            <div class="matrix-axis-label">5</div>
            <div class="matrix-cell matrix-medium">5</div>
            <div class="matrix-cell matrix-high">10</div>
            <div class="matrix-cell matrix-critical">15</div>
            <div class="matrix-cell matrix-critical">20</div>
            <div class="matrix-cell matrix-critical">25</div>
          </div>
        </div>

        <!-- 2. Risk Classification details -->
        <div class="glass-card" style="padding:18px;">
          <h3>Risk Level Guide / تصنيفات مستويات المخاطر</h3>
          <div class="color-badge-list">
            <div class="color-badge-item">
              <div class="color-indicator-circle green">1-4</div>
              <div>
                <strong style="color:#10b981;">Low Risk / خطر منخفض</strong>
                <p style="font-size:0.78rem; color:var(--text-secondary); margin-top:2px;">
                  Operation safe under standard site safety guidelines. (العمل تحت ضوابط السلامة القياسية).
                </p>
              </div>
            </div>
            
            <div class="color-badge-item">
              <div class="color-indicator-circle yellow">5-12</div>
              <div>
                <strong style="color:#f59e0b;">Medium Risk / خطر متوسط</strong>
                <p style="font-size:0.78rem; color:var(--text-secondary); margin-top:2px;">
                  Requires Supervisor check and JSA briefing before starting task. (يتطلب إشرافاً مباشراً ومحاضرة سلامة).
                </p>
              </div>
            </div>
            
            <div class="color-badge-item">
              <div class="color-indicator-circle red">15-25</div>
              <div>
                <strong style="color:#ef4444;">High / Critical Risk / خطر حرج</strong>
                <p style="font-size:0.78rem; color:var(--text-secondary); margin-top:2px;">
                  STOP! Critical hazard. Requires formal Permit (PTW) and safety director validation. (إيقاف العمل! يتطلب تصريح عمل رسمي واعتماد مدير السلامة).
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. Quarterly Equipment inspection colors -->
        <div class="glass-card" style="padding:18px; grid-column: span 2;">
          <h3>Quarterly Equipment Safety Color Coding / نظام الألوان الربع سنوي لفحص المعدات والأدوات</h3>
          <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:12px; line-height:1.4;">
            All site cranes, machinery, power tools, and harnesses must undergo inspection and wear the corresponding color tag for the active quarter.
          </p>
          <div class="ref-card-grid" style="grid-template-columns: repeat(4, 1fr); margin-top:10px;">
            <div class="color-badge-item" style="flex-direction:column; text-align:center; padding:15px 10px;">
              <div class="color-indicator-circle blue" style="width:40px; height:40px; font-size:1.1rem; color:white; font-weight:700;">Q1</div>
              <strong style="margin-top:10px; color:#3b82f6;">BLUE / أزرق</strong>
              <span style="font-size:0.75rem; color:var(--text-muted);">Jan - Feb - Mar</span>
            </div>
            
            <div class="color-badge-item" style="flex-direction:column; text-align:center; padding:15px 10px;">
              <div class="color-indicator-circle green" style="width:40px; height:40px; font-size:1.1rem; color:white; font-weight:700;">Q2</div>
              <strong style="margin-top:10px; color:#10b981;">GREEN / أخضر</strong>
              <span style="font-size:0.75rem; color:var(--text-muted);">Apr - May - Jun</span>
            </div>
            
            <div class="color-badge-item" style="flex-direction:column; text-align:center; padding:15px 10px;">
              <div class="color-indicator-circle yellow" style="width:40px; height:40px; font-size:1.1rem; color:white; font-weight:700;">Q3</div>
              <strong style="margin-top:10px; color:#f59e0b;">YELLOW / أصفر</strong>
              <span style="font-size:0.75rem; color:var(--text-muted);">Jul - Aug - Sep</span>
            </div>
            
            <div class="color-badge-item" style="flex-direction:column; text-align:center; padding:15px 10px;">
              <div class="color-indicator-circle red" style="width:40px; height:40px; font-size:1.1rem; color:white; font-weight:700;">Q4</div>
              <strong style="margin-top:10px; color:#ef4444;">RED / أحمر</strong>
              <span style="font-size:0.75rem; color:var(--text-muted);">Oct - Nov - Dec</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  `;
}

// Render Printable Layout for generic plans/checklists
function renderPrintableLayout(section, record) {
  const schema = HSE_SCHEMAS[section];
  if (!schema) return '';

  return `
    <div class="glass-card">
      <div class="section-header no-print">
        <h3>HSE Document Viewer</h3>
        <div class="header-actions">
          <button class="btn btn-secondary" onclick="navigate('${section}')">
            <i class="fas fa-arrow-left"></i> Back to List
          </button>
          <button class="btn btn-primary" onclick="window.print()">
            <i class="fas fa-print"></i> Print / Save PDF
          </button>
        </div>
      </div>

      <!-- A4 Physical Print Header with Company Logo -->
      <div class="print-header-layout">
        <div>
          <div class="print-header-title">HSE MANAGEMENT SYSTEM DOCUMENT</div>
          <div class="print-header-sub">
            Type: ${schema.title} | Ref ID: HSE-DOC-${section.toUpperCase()}-${record.id}
          </div>
        </div>
        <img src="images/logo.jpg" alt="Aban Logo" class="print-logo-img">
      </div>

      <!-- Document Metadata Details -->
      <div class="print-meta-grid" style="margin-top:20px;">
        <div class="print-meta-item">
          <span class="print-meta-lbl">Document Type:</span>
          <span class="print-meta-val">${schema.title}</span>
        </div>
        <div class="print-meta-item">
          <span class="print-meta-lbl">Date of Issue/Check:</span>
          <span class="print-meta-val">${formatDate(record.date || record.inspectionDate || record.lastInspectionDate)}</span>
        </div>
        <div class="print-meta-item">
          <span class="print-meta-lbl">Prepared/Checked By:</span>
          <span class="print-meta-val">${record.preparedBy || record.inspectorName || record.supervisor || record.operatorSignature || record.executor || 'HSE Team'}</span>
        </div>
        <div class="print-meta-item">
          <span class="print-meta-lbl">Site Location / Reference:</span>
          <span class="print-meta-val">${record.site || record.location || record.siteLocation || record.equipmentNo || record.equipmentName || record.equipmentId || 'HQ Site'}</span>
        </div>
      </div>

      <!-- Document Detailed Content Sections -->
      <div style="margin-top:30px;">
        <h4 style="margin-bottom:14px; border-bottom:1.5px solid var(--accent); padding-bottom:6px; font-size:1.1rem; color:var(--accent);">Document Content & Analysis Checklist</h4>
        
        <div style="display:flex; flex-direction:column; gap:16px;">
          ${schema.fields.map(field => {
            const val = record[field.id];
            if (field.id === 'date' || field.id === 'inspectionDate' || field.id === 'lastInspectionDate') return ''; // Skip duplicates
            return `
              <div style="padding:14px; background:rgba(255,255,255,0.01); border:1px solid var(--glass-border); border-radius:8px;">
                <strong style="color:var(--text-secondary); font-size:0.85rem; text-transform:uppercase;">${field.label.split('(')[0]}</strong>
                <div style="margin-top:6px; font-size:1rem; line-height:1.5; white-space:pre-line;">
                  ${val === undefined || val === null || val === '' ? '<span style="color:var(--text-muted)">Not Specified / لم يحدد</span>' : val}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Signatures footer for print -->
      <div class="print-only-block" style="margin-top: 60px;">
        <p style="font-size:8pt; margin-bottom:20px; line-height:1.4; color:#555;">
          <strong>Declaration:</strong> This document represents a formal control record of Aban Contracting HSE Management System. The safety guidelines and inspections recorded herein are verified as active and compliant.
        </p>
        <div style="display:flex; justify-content: space-between; margin-top:40px;">
          <div style="text-align:center; width:220px; border-top:1px solid #333; padding-top:6px; font-size:9pt; color:#333;">
            Prepared/Checked Signature: __________________
          </div>
          <div style="text-align:center; width:220px; border-top:1px solid #333; padding-top:6px; font-size:9pt; color:#333;">
            Safety Director Endorsement: ______________
          </div>
        </div>
      </div>
    </div>
  `;
}

// Premium overrides for the scaled HSE templates.
const PRINTABLE_GENERIC_SECTIONS = new Set([
  'equipment',
  'store',
  'maintenance',
  'incidents',
  'safe-hours',
  'emergency-teams',
  'pre-operation',
  'equipment-readiness',
  'task-workers',
  'emergency-checklists',
  'tbt-register',
  'attendance-exit',
  'method-statements',
  'lifting-plans',
  'emergency-plans'
]);

function getCleanLabel(label) {
  return String(label || '').replace(/\s*\([^)]*\)\s*/g, '').replace(/\s+\*/g, '').trim();
}

function getFieldDisplayValue(record, field) {
  const value = record ? record[field.id] : '';
  if (value === undefined || value === null || value === '') return '<span style="color:var(--text-muted)">N/A</span>';
  if (field.type === 'date' || field.id.toLowerCase().includes('date')) return escapeHtml(formatDate(value));
  return escapeHtml(value).replace(/\n/g, '<br>');
}

renderListTable = function(section, items) {
  const schema = HSE_SCHEMAS[section];
  if (!schema) return `<div class="glass-card"><p>Error: Schema not found for section: ${escapeHtml(section)}</p></div>`;

  return `
    <div class="glass-card list-template-card">
      <div class="section-header">
        <div>
          <h2>${escapeHtml(schema.title)}</h2>
          <p class="section-kicker">Local HSE database register with printable document control.</p>
        </div>
        <div class="header-actions">
          <button class="btn btn-primary" onclick="initNewGenericRecord('${section}')">
            <i class="fas fa-plus"></i> Add Record / إضافة
          </button>
          <button class="btn btn-secondary" onclick="window.print()">
            <i class="fas fa-print"></i> Print List
          </button>
        </div>
      </div>

      <div class="table-responsive">
        <table class="data-table compact-table">
          <thead>
            <tr>
              ${schema.tableCols.map(col => `<th>${escapeHtml(schema.colLabels[col] || col)}</th>`).join('')}
              <th class="no-print">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${(items || []).map(item => `
              <tr>
                ${schema.tableCols.map(col => {
                  const field = (schema.fields || []).find(f => f.id === col) || { id: col, type: col.toLowerCase().includes('date') ? 'date' : 'text' };
                  const rawValue = item[col];
                  let rendered = getFieldDisplayValue(item, field);
                  if (String(col).toLowerCase().includes('status') && rawValue) {
                    const status = String(rawValue).toLowerCase();
                    const badgeClass = status.includes('unfit') || status.includes('damaged') || status.includes('expired') || status.includes('no')
                      ? 'badge badge-danger'
                      : status.includes('need') || status.includes('pending')
                        ? 'badge badge-warning'
                        : 'badge badge-success';
                    rendered = `<span class="${badgeClass}">${escapeHtml(rawValue)}</span>`;
                  }
                  return `<td class="cell-truncate">${rendered}</td>`;
                }).join('')}
                <td class="no-print">
                  <div class="row-actions">
                    ${PRINTABLE_GENERIC_SECTIONS.has(section) ? `
                      <button class="btn btn-secondary icon-btn" title="Print record" onclick="viewPrintGeneric('${section}', ${item.id})">
                        <i class="fas fa-print"></i>
                      </button>
                    ` : ''}
                    <button class="btn btn-secondary icon-btn" title="Edit record" onclick="editGenericRecord('${section}', ${item.id})">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger icon-btn" title="Delete record" onclick="deleteGenericRecord('${section}', ${item.id})">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </td>
              </tr>
            `).join('') || `<tr><td colspan="${schema.tableCols.length + 1}" class="empty-state"><i class="fas fa-folder-open"></i><p>No records found / لم تتم إضافة بيانات بعد</p></td></tr>`}
          </tbody>
        </table>
      </div>
    </div>
  `;
};

buildGenericFormHtml = function(section, record = null) {
  const schema = HSE_SCHEMAS[section];
  if (!schema) return '';

  return schema.fields.map(field => {
    const rawValue = record ? (record[field.id] ?? '') : '';
    const value = String(rawValue);
    const requiredAttr = field.required ? 'required' : '';
    const placeholder = escapeHtml(field.placeholder || '');
    const cleanDate = field.type === 'date' && value.includes('T') ? value.split('T')[0] : value;

    let inputHtml = '';
    if (field.type === 'select') {
      inputHtml = `
        <select id="gen_${field.id}" ${requiredAttr}>
          <option value="">-- Select --</option>
          ${(field.options || []).map(opt => {
            const selected = value === opt ? 'selected' : '';
            return `<option value="${escapeHtml(opt)}" ${selected}>${escapeHtml(opt)}</option>`;
          }).join('')}
        </select>
      `;
    } else if (field.type === 'textarea') {
      inputHtml = `<textarea id="gen_${field.id}" placeholder="${placeholder}" ${requiredAttr}>${escapeHtml(value)}</textarea>`;
    } else {
      inputHtml = `<input type="${field.type}" id="gen_${field.id}" value="${escapeHtml(cleanDate)}" placeholder="${placeholder}" ${requiredAttr}>`;
    }

    const fullWidthClass = field.type === 'textarea' || ['type', 'itemName', 'activityDescription', 'hazards'].includes(field.id) ? 'full-width' : '';
    return `
      <div class="form-group ${fullWidthClass}">
        <label for="gen_${field.id}">${escapeHtml(field.label)}</label>
        ${inputHtml}
      </div>
    `;
  }).join('');
};

function renderRiskMatrixCells() {
  const cells = ['<div class="matrix-axis-label">L \\ S</div>', 1, 2, 3, 4, 5].map(v => {
    if (typeof v === 'string') return v;
    return `<div class="matrix-axis-label">${v}</div>`;
  });

  for (let likelihood = 1; likelihood <= 5; likelihood += 1) {
    cells.push(`<div class="matrix-axis-label">${likelihood}</div>`);
    for (let severity = 1; severity <= 5; severity += 1) {
      const score = likelihood * severity;
      const level = riskLevel(score);
      cells.push(`<button type="button" class="matrix-cell matrix-${level.band}" onclick="showMatrixHelp(${likelihood}, ${severity})">${score}</button>`);
    }
  }

  return cells.join('');
}

renderMatrixRef = function() {
  return `
    <div class="glass-card">
      <div class="section-header">
        <div>
          <h2>HSE 5x5 Risk Matrix & Color Reference / مصفوفة المخاطر ودليل الألوان</h2>
          <p class="section-kicker">Internal project HSE reference: Risk = Likelihood x Severity, with quarterly equipment inspection colors.</p>
        </div>
        <button class="btn btn-secondary" onclick="window.print()">
          <i class="fas fa-print"></i> Print Reference
        </button>
      </div>

      <div class="print-header-layout">
        <div>
          <div class="print-header-title">HSE RISK MATRIX & COLOR REFERENCE</div>
          <div class="print-header-sub">Source: Internal HSE Management System reference | 5x5 risk score and quarterly equipment color tags</div>
        </div>
        <img src="images/logo.jpg" alt="Company Logo" class="print-logo-img">
      </div>

      <div class="ref-card-grid matrix-reference-layout">
        <div class="glass-card reference-panel">
          <h3>5x5 Risk Matrix / مصفوفة تقييم المخاطر</h3>
          <p class="muted-copy">Likelihood (1-5) is multiplied by Severity (1-5). Click any score to show the interpretation while preparing a risk assessment.</p>
          <div class="matrix-grid-5x5 matrix-grid-large">
            ${renderRiskMatrixCells()}
          </div>
          <div id="matrix-help-box" class="matrix-help-box">Select a matrix score to preview the risk interpretation.</div>
        </div>

        <div class="glass-card reference-panel">
          <h3>Risk Band Source / مصدر تصنيف الألوان</h3>
          <div class="color-badge-list">
            <div class="color-badge-item">
              <div class="color-indicator-circle green">1</div>
              <div><strong>Low / منخفض: 1-4</strong><p>Proceed with standard site controls and routine supervision.</p></div>
            </div>
            <div class="color-badge-item">
              <div class="color-indicator-circle yellow">5</div>
              <div><strong>Medium / متوسط: 5-9</strong><p>Supervisor review, toolbox talk, and documented controls are required.</p></div>
            </div>
            <div class="color-badge-item">
              <div class="color-indicator-circle orange">10</div>
              <div><strong>High / عالي: 10-16</strong><p>Work needs enhanced controls, method statement, and HSE approval before start.</p></div>
            </div>
            <div class="color-badge-item">
              <div class="color-indicator-circle red">17</div>
              <div><strong>Critical / حرج: 17-25</strong><p>Stop work until risk is reduced and formally approved by site management.</p></div>
            </div>
          </div>
        </div>

        <div class="glass-card reference-panel full-reference-panel">
          <h3>Quarterly Equipment Inspection Color Coding / أكواد ألوان فحص المعدات</h3>
          <div class="quarter-grid">
            <div class="quarter-card"><span class="quarter-dot blue"></span><strong>Q1 Blue / أزرق</strong><small>January - March</small></div>
            <div class="quarter-card"><span class="quarter-dot green"></span><strong>Q2 Green / أخضر</strong><small>April - June</small></div>
            <div class="quarter-card"><span class="quarter-dot yellow"></span><strong>Q3 Yellow / أصفر</strong><small>July - September</small></div>
            <div class="quarter-card"><span class="quarter-dot red"></span><strong>Q4 Red / أحمر</strong><small>October - December</small></div>
          </div>
          <p class="muted-copy">Apply the active quarter tag after inspection of cranes, lifting accessories, power tools, harnesses, and safety-critical equipment.</p>
        </div>
      </div>
    </div>
  `;
};

renderPrintableLayout = function(section, record) {
  const schema = HSE_SCHEMAS[section];
  if (!schema) return '';

  const reference = `HSE-${section.toUpperCase()}-${String(record.id).padStart(4, '0')}`;
  const dateValue = record.date || record.inspectionDate || record.lastInspectionDate || record.nextDate || record.createdAt;
  const ownerValue = record.preparedBy || record.author || record.inspectorName || record.supervisor || record.executor || record.operatorSignature || 'HSE Department';
  const siteValue = record.site || record.location || record.siteLocation || record.equipmentNo || record.equipmentName || record.equipmentId || 'Project Site';

  return `
    <div class="glass-card printable-document">
      <div class="section-header no-print">
        <h3>${escapeHtml(schema.title)}</h3>
        <div class="header-actions">
          <button class="btn btn-secondary" onclick="navigate('${section}')"><i class="fas fa-arrow-left"></i> Back</button>
          <button class="btn btn-primary" onclick="window.print()"><i class="fas fa-print"></i> Print / Save PDF</button>
        </div>
      </div>

      <div class="print-header-layout premium-print-header">
        <div>
          <div class="print-header-title">HSE MANAGEMENT SYSTEM DOCUMENT</div>
          <div class="print-header-sub">${escapeHtml(schema.title)} | Ref: ${escapeHtml(reference)}</div>
        </div>
        <img src="images/logo.jpg" alt="Company Logo" class="print-logo-img">
      </div>

      <div class="document-title-block">
        <div>
          <span class="document-eyebrow">Controlled HSE Template</span>
          <h2>${escapeHtml(schema.title)}</h2>
        </div>
        <img src="images/logo.jpg" alt="Company Logo" class="document-logo no-print">
      </div>

      <div class="print-meta-grid premium-meta-grid">
        <div class="print-meta-item"><span class="print-meta-lbl">Document Ref</span><span class="print-meta-val">${escapeHtml(reference)}</span></div>
        <div class="print-meta-item"><span class="print-meta-lbl">Date</span><span class="print-meta-val">${formatDate(dateValue)}</span></div>
        <div class="print-meta-item"><span class="print-meta-lbl">Prepared / Checked By</span><span class="print-meta-val">${escapeHtml(ownerValue)}</span></div>
        <div class="print-meta-item"><span class="print-meta-lbl">Site / Asset</span><span class="print-meta-val">${escapeHtml(siteValue)}</span></div>
      </div>

      <div class="document-section-grid">
        ${(schema.fields || []).map(field => `
          <section class="document-field ${field.type === 'textarea' ? 'wide-field' : ''}">
            <span>${escapeHtml(getCleanLabel(field.label))}</span>
            <div>${getFieldDisplayValue(record, field)}</div>
          </section>
        `).join('')}
      </div>

      <div class="document-signature-grid">
        <div><span>Prepared / Checked By</span></div>
        <div><span>HSE Manager Approval</span></div>
        <div><span>Site Manager Approval</span></div>
      </div>
    </div>
  `;
};

renderPrintableRiskAssessment = function(ra, calculatedHazards) {
  const hazards = calculatedHazards || [];
  return `
    <div class="glass-card printable-document">
      <div class="section-header no-print">
        <h3>Risk Assessment Document</h3>
        <div class="header-actions">
          <button class="btn btn-secondary" onclick="navigate('risk-assessments')"><i class="fas fa-arrow-left"></i> Back</button>
          <button class="btn btn-primary" onclick="window.print()"><i class="fas fa-print"></i> Print Assessment</button>
        </div>
      </div>

      <div class="print-header-layout premium-print-header">
        <div>
          <div class="print-header-title">HSE JOB RISK ASSESSMENT</div>
          <div class="print-header-sub">Ref: HSE-JRA-${escapeHtml(ra.id)} | Source: 5x5 Likelihood x Severity matrix</div>
        </div>
        <img src="images/logo.jpg" alt="Company Logo" class="print-logo-img">
      </div>

      <div class="document-title-block">
        <div>
          <span class="document-eyebrow">Risk Assessment Template</span>
          <h2>${escapeHtml(ra.activity)}</h2>
        </div>
        <img src="images/logo.jpg" alt="Company Logo" class="document-logo no-print">
      </div>

      <div class="print-meta-grid premium-meta-grid">
        <div class="print-meta-item"><span class="print-meta-lbl">Assessment Date</span><span class="print-meta-val">${formatDate(ra.date)}</span></div>
        <div class="print-meta-item"><span class="print-meta-lbl">Assessor</span><span class="print-meta-val">${escapeHtml(ra.assessor)}</span></div>
        <div class="print-meta-item"><span class="print-meta-lbl">Site</span><span class="print-meta-val">${escapeHtml(ra.site)}</span></div>
        <div class="print-meta-item"><span class="print-meta-lbl">Hazard Items</span><span class="print-meta-val">${hazards.length}</span></div>
      </div>

      <div class="risk-source-strip">
        Color source: Low 1-4, Medium 5-9, High 10-16, Critical 17-25. Risk Score = Likelihood (1-5) x Severity (1-5).
      </div>

      <div class="table-responsive">
        <table class="data-table risk-print-table">
          <thead>
            <tr>
              <th>Job Step</th>
              <th>Hazard</th>
              <th>Consequence</th>
              <th>Initial Risk</th>
              <th>Controls</th>
              <th>Residual Risk</th>
              <th>Action Party</th>
            </tr>
          </thead>
          <tbody>
            ${hazards.map((h, index) => `
              <tr>
                <td>${escapeHtml(h.step || index + 1)}</td>
                <td>${escapeHtml(h.hazard)}</td>
                <td>${escapeHtml(h.consequence)}</td>
                <td>L:${escapeHtml(h.initialL)} S:${escapeHtml(h.initialS)}<br>${getRiskBadge(h.initialR)}</td>
                <td>${escapeHtml(h.controls).replace(/\n/g, '<br>')}</td>
                <td>L:${escapeHtml(h.residualL)} S:${escapeHtml(h.residualS)}<br>${getRiskBadge(h.residualR)}</td>
                <td>${escapeHtml(h.actionParty)}</td>
              </tr>
            `).join('') || `<tr><td colspan="7" class="empty-state">No hazard items mapped to this assessment</td></tr>`}
          </tbody>
        </table>
      </div>

      <div class="document-signature-grid">
        <div><span>Lead Assessor</span></div>
        <div><span>HSE Manager Approval</span></div>
        <div><span>Site Manager Approval</span></div>
      </div>
    </div>
  `;
};

// =======================================================
// LOGIN SYSTEM COMPONENTS
// =======================================================
function renderLoginOverlay(activeTab = 'work') {
  const isAr = (localStorage.getItem('hse_lang') || 'en') === 'ar';
  const titleText = activeTab === 'manager' 
    ? (isAr ? 'منصة إشراف المدير' : 'Manager Oversight Command')
    : (isAr ? 'منصة العمل والتشغيل' : 'HSE Work Portal');
  const subText = activeTab === 'manager'
    ? (isAr ? 'سجل الدخول بصفتك مالك أو مدير النظام' : 'Sign in as System Manager/Owner')
    : (isAr ? 'سجل الدخول للوصول إلى لوحة المتابعة والمستندات' : 'Sign in to access Aban HSE Control Portal');

  return `
    <div class="login-overlay">
      <div class="login-card glass-card">
        <img src="images/logo.jpg" alt="Aban Logo" class="login-logo">
        <div class="login-tabs">
          <button type="button" class="login-tab-btn ${activeTab === 'work' ? 'active' : ''}" onclick="switchLoginTab('work')">
            <i class="fas fa-briefcase"></i>
            <span>${isAr ? 'منصة العمل' : 'Work Portal'}</span>
          </button>
          <button type="button" class="login-tab-btn manager-tab ${activeTab === 'manager' ? 'active' : ''}" onclick="switchLoginTab('manager')">
            <i class="fas fa-crown"></i>
            <span>${isAr ? 'لوحة المدير' : 'Manager Portal'}</span>
          </button>
        </div>

        <div class="login-header">
          <h2>${titleText}</h2>
          <p>${subText}</p>
        </div>
        
        <div id="login-error-box" class="login-error">
          <i class="fas fa-exclamation-circle"></i> Invalid email or password.
        </div>
        
        <form onsubmit="handleLoginSubmit(event)">
          <!-- Hidden Input for loginType -->
          <input type="hidden" id="login-type" value="${activeTab}">
          
          <div class="login-form-group">
            <label for="login-email">${isAr ? 'البريد الإلكتروني' : 'Email Address'}</label>
            <div class="login-input-wrapper">
              <i class="fas fa-envelope"></i>
              <input type="email" id="login-email" class="login-input" required placeholder="name@aban.com" autocomplete="email">
            </div>
          </div>
          
          <div class="login-form-group">
            <label for="login-password">${isAr ? 'كلمة المرور' : 'Password'}</label>
            <div class="login-input-wrapper">
              <i class="fas fa-lock"></i>
              <input type="password" id="login-password" class="login-input" required placeholder="••••••••" autocomplete="current-password">
            </div>
          </div>
          
          <button type="submit" class="login-btn" id="login-submit-btn" style="background: ${activeTab === 'manager' ? 'linear-gradient(135deg, var(--warning), #d97706)' : 'linear-gradient(135deg, var(--accent), #1d4ed8)'}">
            <i class="fas fa-right-to-bracket"></i> ${isAr ? 'تسجيل الدخول' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  `;
}

// =======================================================
// OWNER / ADMIN MANAGER DASHBOARD COMPONENT
// =======================================================
function renderAdminPanel(activeSessions, activityLogs) {
  
  // Helper to parse userAgent to friendly description
  const parseUA = (ua) => {
    if (!ua) return 'Unknown Device';
    let browser = 'Browser';
    let os = 'Device';
    
    if (ua.includes('Edg')) browser = 'Microsoft Edge';
    else if (ua.includes('Chrome')) browser = 'Google Chrome';
    else if (ua.includes('Firefox')) browser = 'Mozilla Firefox';
    else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Apple Safari';
    
    if (ua.includes('Windows NT 10.0')) os = 'Windows 10/11';
    else if (ua.includes('Windows NT')) os = 'Windows';
    else if (ua.includes('Macintosh') || ua.includes('Mac OS')) os = 'macOS';
    else if (ua.includes('Linux')) os = 'Linux';
    else if (ua.includes('Android')) os = 'Android';
    else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';
    
    return `${browser} on ${os}`;
  };

  // Helper to get time elapsed since last heartbeat
  const formatTimeElapsed = (timestamp) => {
    const elapsed = Math.round((Date.now() - timestamp) / 1000);
    if (elapsed < 5) return 'Just now';
    if (elapsed < 60) return `${elapsed}s ago`;
    const mins = Math.floor(elapsed / 60);
    return `${mins}m ago`;
  };

  // Helper to format log date/time
  const formatLogTime = (isoString) => {
    if (!isoString) return 'N/A';
    try {
      const date = new Date(isoString);
      return date.toLocaleString(undefined, { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      });
    } catch (_) {
      return isoString;
    }
  };

  // Helper to assign icons/colors to activity logs
  const getLogIconConfig = (action) => {
    const act = String(action).toLowerCase();
    if (act.includes('log')) return { icon: 'fa-right-to-bracket', cssClass: 'login' };
    if (act.includes('create')) return { icon: 'fa-circle-plus', cssClass: 'create' };
    if (act.includes('update')) return { icon: 'fa-pen-to-square', cssClass: 'update' };
    if (act.includes('delete')) return { icon: 'fa-trash-can', cssClass: 'delete' };
    return { icon: 'fa-circle-info', cssClass: 'info' };
  };

  return `
    <!-- Top Row Statistics -->
    <div class="metrics-grid">
      <div class="glass-card metric-card">
        <div class="metric-icon accent"><i class="fas fa-signal"></i></div>
        <div class="metric-info">
          <span class="metric-val">${activeSessions.length}</span>
          <span class="metric-lbl">Users Online Now</span>
        </div>
      </div>
      <div class="glass-card metric-card">
        <div class="metric-icon info"><i class="fas fa-clock-rotate-left"></i></div>
        <div class="metric-info">
          <span class="metric-val">${activityLogs.length}</span>
          <span class="metric-lbl">Total Logged Actions</span>
        </div>
      </div>
      <div class="glass-card metric-card">
        <div class="metric-icon warning"><i class="fas fa-server"></i></div>
        <div class="metric-info">
          <span class="metric-val">Online</span>
          <span class="metric-lbl">Multi-Device Host Mode</span>
        </div>
      </div>
    </div>

    <!-- Active Now Section (من نشط الان) -->
    <div class="glass-card" style="margin-bottom: 24px;">
      <div class="section-header" style="margin-bottom:20px;">
        <h2 style="display:flex; align-items:center; gap:10px;">
          <i class="fas fa-users-viewfinder" style="color:var(--accent);"></i> 
          Who is Online Now / من نشط الآن
        </h2>
        <button class="btn btn-secondary" onclick="refreshAdminData()">
          <i class="fas fa-rotate"></i> Refresh
        </button>
      </div>

      <div class="admin-sessions-grid">
        ${activeSessions.map(sess => `
          <div class="session-card">
            <div class="session-header">
              <div class="online-indicator">
                <span class="online-dot"></span>
                <span>Active (${formatTimeElapsed(sess.lastActive)})</span>
              </div>
              <span class="session-badge ${sess.role === 'admin' ? 'admin' : 'user'}">
                ${sess.role === 'admin' ? 'Manager (Admin)' : 'HSE Officer'}
              </span>
            </div>
            
            <div class="session-user-info">
              <div class="session-user-name">
                <i class="fas fa-user-circle" style="font-size:1.15rem; color:var(--text-secondary);"></i>
                ${sess.name}
              </div>
              <div class="session-user-email">${sess.email}</div>
            </div>
            
            <div class="session-body">
              <div class="session-item">
                <i class="fas fa-desktop"></i>
                <span>${parseUA(sess.userAgent)}</span>
              </div>
              <div class="session-item">
                <i class="fas fa-globe"></i>
                <span>IP Address: <code>${sess.ip}</code></span>
              </div>
            </div>
          </div>
        `).join('') || `
          <div style="grid-column: 1 / -1; text-align:center; padding:30px; color:var(--text-muted);">
            <i class="fas fa-user-slash" style="font-size:2.5rem; margin-bottom:12px;"></i>
            <p>No other active users recorded recently</p>
          </div>
        `}
      </div>
    </div>

    <!-- Live System Activity Feed (سجل نشاط النظام) -->
    <div class="glass-card">
      <div class="section-header" style="margin-bottom:20px;">
        <h2 style="display:flex; align-items:center; gap:10px;">
          <i class="fas fa-chart-line" style="color:var(--info);"></i>
          System Operations Audit Log / سجل نشاط النظام
        </h2>
      </div>

      <div class="activity-feed-container">
        <table class="activity-feed-table">
          <thead>
            <tr>
              <th style="width: 25%">Timestamp</th>
              <th style="width: 25%">User</th>
              <th style="width: 50%">Performed Operation</th>
            </tr>
          </thead>
          <tbody>
            ${activityLogs.map(log => {
              const iconConf = getLogIconConfig(log.action);
              return `
                <tr>
                  <td class="log-time">${formatLogTime(log.timestamp)}</td>
                  <td class="log-user">
                    <div style="font-weight:600;">${log.name}</div>
                    <div style="font-size:0.75rem; color:var(--text-muted);">${log.email}</div>
                  </td>
                  <td class="log-action">
                    <div style="display:flex; align-items:center;">
                      <span class="log-icon-wrapper ${iconConf.cssClass}">
                        <i class="fas ${iconConf.icon}"></i>
                      </span>
                      <span>${log.action}</span>
                    </div>
                  </td>
                </tr>
              `;
            }).join('') || `
              <tr>
                <td colspan="3" class="empty-state" style="padding:40px;">
                  <i class="fas fa-history" style="font-size:2rem; margin-bottom:12px;"></i>
                  <p>No system activity logged yet</p>
                </td>
              </tr>
            `}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// =======================================================
// WORKERS MEMOS AND REQUESTS LIST COMPONENT
// =======================================================
function renderMemosList(memos) {
  return `
    <div class="glass-card">
      <div class="section-header">
        <h2>Safety Memos & Requests / سجل المذكرات والطلبات</h2>
        <div class="header-actions">
          <button class="btn btn-primary" onclick="showModal('memoModal')">
            <i class="fas fa-plus"></i> Create Safety Memo / إصدار مذكرة
          </button>
        </div>
      </div>

      <div class="table-responsive" style="margin-top:20px;">
        <table class="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Memo Type</th>
              <th>Directed To</th>
              <th>Subject / Topic</th>
              <th>Status</th>
              <th class="no-print">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${memos.map(memo => `
              <tr>
                <td>${formatDate(memo.date)}</td>
                <td>
                  <span class="badge badge-info">${memo.type}</span>
                </td>
                <td style="font-weight:600;">
                  <i class="fas ${memo.targetType === 'Person' ? 'fa-user' : 'fa-building-shield'}"></i>
                  ${memo.targetName}
                </td>
                <td>${memo.subject}</td>
                <td>
                  <span class="badge badge-success">Saved & Sent</span>
                </td>
                <td class="no-print">
                  <div style="display:flex; gap: 8px;">
                    <button class="btn btn-secondary" style="padding:6px 12px; font-size:0.8rem; display:flex; align-items:center; gap:4px;" onclick="printMemoRecord(${memo.id})">
                      <i class="fas fa-print"></i> Print / طباعة
                    </button>
                    <button class="btn btn-danger" style="padding:6px 10px; font-size:0.8rem;" onclick="deleteMemoRecord(${memo.id})">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </td>
              </tr>
            `).join('') || `
              <tr>
                <td colspan="6" class="empty-state" style="padding:40px;">
                  <i class="fas fa-envelope-open-text" style="font-size:2.5rem; margin-bottom:12px;"></i>
                  <p>No memos issued yet. Log safety violation or worksite notices here.</p>
                </td>
              </tr>
            `}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// =======================================================
// DYNAMIC MEMO LETTERHEAD GENERATION FOR PHYSICAL PRINTING
// =======================================================
function renderMemoPrintSheet(memo) {
  return `
    <div class="memo-letterhead">
      <div class="memo-letterhead-header">
        <img src="images/logo.jpg" alt="Aban Logo" class="memo-logo">
        <div class="memo-header-title">
          <h2>Aban Contracting</h2>
          <p>HSE Department / قسم الصحة والسلامة المهنية</p>
        </div>
      </div>

      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="font-size: 1.6rem; font-weight:700; text-transform:uppercase; border-bottom:2px solid #0f172a; display:inline-block; padding-bottom:4px; margin:0;">
          Safety Memo / مذكرة إخطار سلامة
        </h1>
      </div>

      <div class="memo-meta-grid">
        <div class="memo-meta-item">
          <span>Date / التاريخ</span>
          <div>${formatDate(memo.date)}</div>
        </div>
        <div class="memo-meta-item">
          <span>Reference / الرقم المرجعي</span>
          <div>MEMO-2026-${memo.id || 'NEW'}</div>
        </div>
        <div class="memo-meta-item">
          <span>Memo Type / نوع الإخطار</span>
          <div>${memo.type}</div>
        </div>
        <div class="memo-meta-item">
          <span>Target / الموجه إليه</span>
          <div>${memo.targetType === 'Person' ? 'شخص: ' : 'موقع عمل: '}${memo.targetName}</div>
        </div>
      </div>

      <div class="memo-body">
        <div class="memo-body-title">Subject: ${memo.subject}</div>
        <div style="white-space: pre-wrap; margin-top:15px; font-size:1.05rem;">${memo.description}</div>
      </div>

      <div style="margin-top:60px; font-size:0.9rem; border-top: 1px solid #cbd5e1; padding-top:20px; color:#475569;">
        <p><strong>Notice:</strong> This memo has been digitally generated and stored in Aban HSE Control System. Please comply with the instructions mentioned above to ensure worksite safety.</p>
      </div>

      <div class="memo-signatures">
        <div class="memo-signature-line">
          <div class="memo-signature-box"></div>
          <span>Issued By (HSE Representative)</span>
        </div>
        <div class="memo-signature-line">
          <div class="memo-signature-box"></div>
          <span>Acknowledged By (Receiver / Site Supervisor)</span>
        </div>
      </div>
    </div>
  `;
}

// =======================================================
// PREMIUM MANAGER PLATFORM VIEW (منصة المدير)
// =======================================================
function renderManagerPortal(activeSessions, activityLogs, ptws, memos, hseData = {}) {
  const activePtws = ptws.filter(p => p.status === 'Active');
  
  const workers = hseData.workers || [];
  const activeWorkers = workers.filter(w => w.status === 'Active').length;
  
  const safeHours = hseData['safe-hours'] || [];
  let totalManHours = 0;
  let maxLtiFreeDays = 0;
  safeHours.forEach(sh => {
    totalManHours += parseFloat(sh.manHours || sh.hoursWorked || 0);
    const days = parseInt(sh.ltiFreeDays || sh.daysWithoutLti || 0, 10);
    if (days > maxLtiFreeDays) maxLtiFreeDays = days;
  });

  const equipment = hseData.equipment || [];
  const redTags = equipment.filter(e => String(e.colorTag || e.tagColor).toLowerCase() === 'red').length;
  
  const nearMisses = hseData.nearMisses || [];
  const openNearMisses = nearMisses.filter(n => n.status !== 'Closed').length;

  // Helpers
  const parseUA = (ua) => {
    if (!ua) return 'Unknown Device';
    let browser = 'Browser';
    let os = 'Device';
    if (ua.includes('Edg')) browser = 'Microsoft Edge';
    else if (ua.includes('Chrome')) browser = 'Google Chrome';
    else if (ua.includes('Firefox')) browser = 'Mozilla Firefox';
    else if (ua.includes('Safari')) browser = 'Apple Safari';
    
    if (ua.includes('Windows')) os = 'Windows';
    else if (ua.includes('Mac')) os = 'macOS';
    else if (ua.includes('Linux')) os = 'Linux';
    else if (ua.includes('Android')) os = 'Android';
    else if (ua.includes('iPhone')) os = 'iPhone';
    return `${browser} on ${os}`;
  };

  const formatTimeElapsed = (timestamp) => {
    const elapsed = Math.round((Date.now() - timestamp) / 1000);
    if (elapsed < 5) return 'Just now';
    if (elapsed < 60) return `${elapsed}s ago`;
    return `${Math.floor(elapsed / 60)}m ago`;
  };

  const formatLogTime = (isoString) => {
    if (!isoString) return 'N/A';
    const d = new Date(isoString);
    return d.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const getLogIconConfig = (action) => {
    const act = String(action).toLowerCase();
    if (act.includes('log')) return { icon: 'fa-right-to-bracket', cssClass: 'login' };
    if (act.includes('create')) return { icon: 'fa-circle-plus', cssClass: 'create' };
    if (act.includes('update')) return { icon: 'fa-pen-to-square', cssClass: 'update' };
    if (act.includes('delete')) return { icon: 'fa-trash-can', cssClass: 'delete' };
    return { icon: 'fa-circle-info', cssClass: 'info' };
  };

  return `
    <!-- Manager Oversight Header -->
    <div class="manager-view-header">
      <div class="manager-profile">
        <div class="manager-avatar"><i class="fas fa-crown"></i></div>
        <div class="manager-info">
          <h3>HSE Manager Command Center / لوحة إشراف المدير</h3>
          <p>Logged in: <strong style="color:var(--warning);">${currentUser ? currentUser.name : ''}</strong> | Role: Manager / المالك</p>
        </div>
      </div>
      <div class="manager-actions-row">
        <button class="btn btn-secondary" onclick="refreshAdminData()">
          <i class="fas fa-rotate"></i> Refresh Data
        </button>
        <button class="btn btn-primary" onclick="switchToWorkPlatform()">
          <i class="fas fa-clipboard-check"></i> Enter Work Platform / منصة العمل
        </button>
      </div>
    </div>

    <!-- Manager Metrics Row -->
    <div class="metrics-grid" style="margin-bottom: 20px;">
      <div class="glass-card metric-card">
        <div class="metric-icon accent"><i class="fas fa-users-viewfinder"></i></div>
        <div class="metric-info">
          <span class="metric-val">${activeSessions.length}</span>
          <span class="metric-lbl">Users Online Now</span>
        </div>
      </div>
      <div class="glass-card metric-card">
        <div class="metric-icon warning"><i class="fas fa-file-invoice"></i></div>
        <div class="metric-info">
          <span class="metric-val">${memos.length}</span>
          <span class="metric-lbl">Memos & Notices Issued</span>
        </div>
      </div>
      <div class="glass-card metric-card">
        <div class="metric-icon info"><i class="fas fa-file-shield"></i></div>
        <div class="metric-info">
          <span class="metric-val">${activePtws.length}</span>
          <span class="metric-lbl">Active Permits Monitored</span>
        </div>
      </div>
      <div class="glass-card metric-card">
        <div class="metric-icon danger"><i class="fas fa-history"></i></div>
        <div class="metric-info">
          <span class="metric-val">${activityLogs.length}</span>
          <span class="metric-lbl">Actions Audited</span>
        </div>
      </div>
    </div>

    <!-- Safety Operations KPI Row (Direct Data Integration from Work Portal) -->
    <div class="metrics-grid" style="margin-bottom: 24px;">
      <div class="glass-card metric-card" style="border: 1px solid rgba(16, 185, 129, 0.15);">
        <div class="metric-icon accent" style="background: rgba(16, 185, 129, 0.1); color: var(--success);"><i class="fas fa-users"></i></div>
        <div class="metric-info">
          <span class="metric-val">${activeWorkers} / ${workers.length}</span>
          <span class="metric-lbl">Active Site Workers / العمال النشطين</span>
        </div>
      </div>
      <div class="glass-card metric-card" style="border: 1px solid rgba(245, 158, 11, 0.15);">
        <div class="metric-icon warning"><i class="fas fa-shield-heart"></i></div>
        <div class="metric-info">
          <span class="metric-val">${maxLtiFreeDays || 365} Days</span>
          <span class="metric-lbl">LTI-Free Days / أيام بلا إصابات</span>
        </div>
      </div>
      <div class="glass-card metric-card" style="border: 1px solid rgba(14, 165, 233, 0.15);">
        <div class="metric-icon info"><i class="fas fa-clock"></i></div>
        <div class="metric-info">
          <span class="metric-val">${totalManHours.toLocaleString()} hrs</span>
          <span class="metric-lbl">Safe Man-Hours / ساعات العمل الآمنة</span>
        </div>
      </div>
      <div class="glass-card metric-card" style="border: 1px solid rgba(239, 68, 68, 0.15);">
        <div class="metric-icon danger"><i class="fas fa-triangle-exclamation"></i></div>
        <div class="metric-info">
          <span class="metric-val">${openNearMisses} Open / ${redTags} Red Tags</span>
          <span class="metric-lbl">Near Misses & Defective / الحوادث والمخالفات</span>
        </div>
      </div>
    </div>

    <!-- Main Command Board Layout -->
    <div class="dashboard-grid" style="margin-bottom: 24px;">
      <!-- Active Sessions Widget -->
      <div class="glass-card">
        <h2 class="manager-section-title">
          <i class="fas fa-signal" style="color:var(--accent);"></i> Live Online Sessions / الأجهزة المتصلة الآن
        </h2>
        <div class="admin-sessions-grid" style="grid-template-columns: 1fr; gap: 14px; margin-top: 14px;">
          ${activeSessions.map(sess => `
            <div class="session-card" style="margin-bottom: 0;">
              <div class="session-header">
                <div class="online-indicator">
                  <span class="online-dot"></span>
                  <span>Active (${formatTimeElapsed(sess.lastActive)})</span>
                </div>
                <span class="session-badge ${sess.role === 'admin' ? 'admin' : 'user'}">
                  ${sess.role === 'admin' ? 'Manager (Admin)' : 'HSE Officer'}
                </span>
              </div>
              <div class="session-user-info">
                <div class="session-user-name">${sess.name}</div>
                <div class="session-user-email">${sess.email}</div>
              </div>
              <div class="session-body">
                <div class="session-item"><i class="fas fa-desktop"></i> <span>${parseUA(sess.userAgent)}</span></div>
                <div class="session-item"><i class="fas fa-globe"></i> <span>IP: <code>${sess.ip}</code></span></div>
              </div>
            </div>
          `).join('') || `<p style="color:var(--text-muted); text-align:center; padding:20px;">No other online sessions detected.</p>`}
        </div>
      </div>

      <!-- Memos & Requests Inbox -->
      <div class="glass-card">
        <h2 class="manager-section-title">
          <i class="fas fa-inbox" style="color:var(--warning);"></i> Memos Received / المذكرات والطلبات المستلمة
        </h2>
        <div class="activity-feed-container" style="max-height: 420px; overflow-y:auto; margin-top:14px;">
          <table class="activity-feed-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Target</th>
                <th>Subject & Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${memos.map(memo => `
                <tr>
                  <td class="log-time">${formatDate(memo.date)}</td>
                  <td style="font-weight:600;">
                    <i class="fas ${memo.targetType === 'Person' ? 'fa-user' : 'fa-building-shield'}"></i>
                    ${memo.targetName}
                  </td>
                  <td>
                    <div style="font-weight:600; color:var(--text-primary);">${memo.subject}</div>
                    <div style="font-size:0.75rem; color:var(--info);">${memo.type}</div>
                  </td>
                  <td>
                    <button class="btn btn-secondary" style="padding:4px 8px; font-size:0.75rem;" onclick="printMemoRecord(${memo.id})">
                      <i class="fas fa-print"></i> Print
                    </button>
                  </td>
                </tr>
              `).join('') || `<tr><td colspan="4" class="empty-state" style="padding:20px;">No safety memos received.</td></tr>`}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Active Permits Monitor Dashboard Section -->
    <div class="glass-card" style="margin-bottom:24px;">
      <h2 class="manager-section-title">
        <i class="fas fa-file-signature" style="color:var(--info);"></i> Active Permits Monitor / متابعة تصاريح العمل النشطة
      </h2>
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Permit No</th>
              <th>Site/Location</th>
              <th>Permit Type</th>
              <th>Issue Date</th>
              <th>Expiry Date</th>
              <th>Document</th>
            </tr>
          </thead>
          <tbody>
            ${activePtws.map(ptw => `
              <tr>
                <td style="font-weight:600; color:var(--warning);">${ptw.permitNo}</td>
                <td>${ptw.site}</td>
                <td><span class="badge badge-info">${ptw.type}</span></td>
                <td>${formatDate(ptw.issueDate)}</td>
                <td>${formatDate(ptw.expiryDate)}</td>
                <td>
                  <a href="${ptw.filePath}" target="_blank" class="file-link-btn">
                    <i class="fas fa-file-pdf"></i> View File
                  </a>
                </td>
              </tr>
            `).join('') || `<tr><td colspan="6" class="empty-state">No active permits in tracking.</td></tr>`}
          </tbody>
        </table>
      </div>
    </div>

    <!-- System Audit Logs Feed -->
    <div class="glass-card">
      <h2 class="manager-section-title">
        <i class="fas fa-shield-halved" style="color:var(--danger);"></i> System Operations Log / سجل نشاط النظام بالكامل
      </h2>
      <div class="activity-feed-container" style="max-height: 380px;">
        <table class="activity-feed-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>User Details</th>
              <th>Action Description</th>
            </tr>
          </thead>
          <tbody>
            ${activityLogs.map(log => {
              const iconConf = getLogIconConfig(log.action);
              return `
                <tr>
                  <td class="log-time">${formatLogTime(log.timestamp)}</td>
                  <td class="log-user">
                    <div style="font-weight:600;">${log.name}</div>
                    <div style="font-size:0.75rem; color:var(--text-muted);">${log.email}</div>
                  </td>
                  <td>
                    <div style="display:flex; align-items:center;">
                      <span class="log-icon-wrapper ${iconConf.cssClass}">
                        <i class="fas ${iconConf.icon}"></i>
                      </span>
                      <span>${log.action}</span>
                    </div>
                  </td>
                </tr>
              `;
            }).join('') || `<tr><td colspan="3" class="empty-state">No logs found.</td></tr>`}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

