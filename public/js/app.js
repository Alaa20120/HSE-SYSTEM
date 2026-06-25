// HSE Safety System Core Controller Logic
const API_URL = ''; // Local relative paths

// Active User Session State
let currentUser = null; // { email, name, role, token }
let heartbeatInterval = null;
let adminPollingInterval = null;

// Global Fetch Interceptor to inject Authorization header
const originalFetch = window.fetch;
window.fetch = function (resource, options = {}) {
  const token = localStorage.getItem('hse_session_token');
  if (token && resource.toString().startsWith('/api/')) {
    options.headers = options.headers || {};
    if (options.headers instanceof Headers) {
      options.headers.set('Authorization', `Bearer ${token}`);
    } else if (Array.isArray(options.headers)) {
      const hasAuth = options.headers.some(h => h[0].toLowerCase() === 'authorization');
      if (!hasAuth) options.headers.push(['Authorization', `Bearer ${token}`]);
    } else {
      options.headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return originalFetch(resource, options).then(response => {
    // Auto-logout if token is rejected (except during login check itself)
    if ((response.status === 401 || response.status === 403) && !resource.toString().includes('/api/auth/login')) {
      handleLogout();
    }
    return response;
  });
};

// Local client-side cache
let hseData = {
  workers: [],
  activities: [],
  ptws: [],
  nearMisses: [],
  trainings: [],
  riskAssessments: [],
  // 1. Registers
  equipment: [],
  store: [],
  maintenance: [],
  incidents: [],
  'safe-hours': [],
  'emergency-teams': [],
  // 2. Checklists
  'pre-operation': [],
  'equipment-readiness': [],
  'task-workers': [],
  'emergency-checklists': [],
  'tbt-register': [],
  'attendance-exit': [],
  // 3. Plans
  'method-statements': [],
  'lifting-plans': [],
  'emergency-plans': [],
  memos: []
};

// Track which generic section/record is being edited
let genericEditState = { section: null, id: null };

// State for active views and edit modes
let currentSection = 'dashboard';
let currentHazardsList = []; // Temp holder for risk assessment builder rows
let safetyChartInstance = null;

// Initial application load
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

async function initApp() {
  applyTheme();
  translateUI();
  setupModalDismissers();
  
  // Set default dates for report screen
  const today = toLocalDateInputValue();
  const lastMonthStr = addDaysToLocalDateInputValue(-30);
  
  const sDate = document.getElementById('rep_startDate');
  const eDate = document.getElementById('rep_endDate');
  if (sDate && eDate) {
    sDate.value = lastMonthStr;
    eDate.value = today;
  }

  // Session Check
  const token = localStorage.getItem('hse_session_token');
  if (!token) {
    // Show login screen overlay
    const loginContainer = document.getElementById('login-container');
    if (loginContainer) {
      loginContainer.innerHTML = renderLoginOverlay();
    }
  } else {
    currentUser = {
      email: localStorage.getItem('hse_user_email'),
      name: localStorage.getItem('hse_user_name'),
      role: localStorage.getItem('hse_user_role'),
      token: token
    };
    setupAuthenticatedState();
    await loadAllData();
    const savedLoginType = localStorage.getItem('hse_login_type') || 'work';
    if (currentUser.role === 'admin' && savedLoginType === 'manager') {
      navigate('admin');
    } else {
      navigate('dashboard');
    }
  }
}

// Authentication Logic and Handlers
async function handleLoginSubmit(event) {
  event.preventDefault();
  const emailEl = document.getElementById('login-email');
  const passwordEl = document.getElementById('login-password');
  const typeEl = document.getElementById('login-type');
  const errorBox = document.getElementById('login-error-box');
  const submitBtn = document.getElementById('login-submit-btn');
  
  if (!emailEl || !passwordEl) return;
  
  const email = emailEl.value;
  const password = passwordEl.value;
  const loginType = typeEl ? typeEl.value : 'work';
  
  if (errorBox) errorBox.style.display = 'none';
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
  }
  
  try {
    const response = await originalFetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, loginType })
    });
    
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "Login failed");
    }
    
    localStorage.setItem('hse_session_token', result.token);
    localStorage.setItem('hse_user_email', result.email);
    localStorage.setItem('hse_user_name', result.name);
    localStorage.setItem('hse_user_role', result.role);
    localStorage.setItem('hse_login_type', loginType);
    
    currentUser = result;
    
    // Clear login overlay
    const loginContainer = document.getElementById('login-container');
    if (loginContainer) loginContainer.innerHTML = '';
    
    setupAuthenticatedState();
    await loadAllData();
    if (currentUser.role === 'admin' && loginType === 'manager') {
      navigate('admin');
    } else {
      navigate('dashboard');
    }
  } catch (err) {
    console.error("Login failure:", err);
    if (errorBox) {
      errorBox.textContent = err.message || "Invalid credentials. Please try again.";
      errorBox.style.display = 'block';
    }
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-right-to-bracket"></i> Sign In';
    }
  }
}

function setupAuthenticatedState() {
  const userHeader = document.getElementById('user-header-profile');
  const userAvatar = document.getElementById('user-avatar');
  const userDisplayName = document.getElementById('user-display-name');
  
  if (userHeader && currentUser) {
    userHeader.style.display = 'flex';
    if (userAvatar) userAvatar.textContent = String(currentUser.name).substring(0, 1).toUpperCase();
    if (userDisplayName) userDisplayName.textContent = currentUser.name;
  }
  
  const sidebarUser = document.getElementById('sidebar-user-info');
  const sidebarUsername = document.getElementById('sidebar-username');
  const logoutBtn = document.getElementById('sidebar-logout-btn');
  const themeBtn = document.getElementById('sidebar-theme-btn');
  
  if (sidebarUser && currentUser) {
    sidebarUser.style.display = 'block';
    if (sidebarUsername) sidebarUsername.textContent = currentUser.name;
  }
  if (logoutBtn) logoutBtn.style.display = 'block';
  if (themeBtn) themeBtn.style.display = 'block';
  
  const adminNav = document.getElementById('nav-admin');
  if (adminNav) {
    if (currentUser && currentUser.role === 'admin') {
      adminNav.style.display = 'flex';
    } else {
      adminNav.style.display = 'none';
    }
  }
  
  if (typeof applyPlatformSeparation === 'function') {
    applyPlatformSeparation();
  }
  
  startHeartbeat();
}

async function handleLogout() {
  stopHeartbeat();
  stopAdminPolling();
  
  try {
    const token = localStorage.getItem('hse_session_token');
    if (token) {
      await originalFetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
    }
  } catch (_) {}
  
  localStorage.removeItem('hse_session_token');
  localStorage.removeItem('hse_user_email');
  localStorage.removeItem('hse_user_name');
  localStorage.removeItem('hse_user_role');
  localStorage.removeItem('hse_login_type');
  currentUser = null;
  
  const userHeader = document.getElementById('user-header-profile');
  if (userHeader) userHeader.style.display = 'none';
  
  const sidebarUser = document.getElementById('sidebar-user-info');
  if (sidebarUser) sidebarUser.style.display = 'none';
  
  const logoutBtn = document.getElementById('sidebar-logout-btn');
  if (logoutBtn) logoutBtn.style.display = 'none';
  
  const themeBtn = document.getElementById('sidebar-theme-btn');
  if (themeBtn) themeBtn.style.display = 'none';
  
  const adminNav = document.getElementById('nav-admin');
  if (adminNav) adminNav.style.display = 'none';
  
  const loginContainer = document.getElementById('login-container');
  if (loginContainer) {
    loginContainer.innerHTML = renderLoginOverlay();
  }
}

function startHeartbeat() {
  stopHeartbeat();
  sendPing();
  heartbeatInterval = setInterval(sendPing, 15000);
}

function stopHeartbeat() {
  if (heartbeatInterval) {
    clearInterval(heartbeatInterval);
    heartbeatInterval = null;
  }
}

async function sendPing() {
  try {
    await fetch('/api/auth/heartbeat');
  } catch (_) {}
}

// Admin Real-Time Feed Data Fetching and Polling
async function loadAdminData() {
  if (!currentUser || currentUser.role !== 'admin' || currentSection !== 'admin') return;
  try {
    const [sessionsRes, logsRes, ptwsRes, memosRes] = await Promise.all([
      fetch('/api/admin/active-sessions'),
      fetch('/api/admin/activity-logs'),
      fetch('/api/ptws'),
      fetch('/api/memos')
    ]);
    
    if (sessionsRes.ok && logsRes.ok) {
      const activeSessions = await sessionsRes.json();
      const activityLogs = await logsRes.json();
      const ptws = ptwsRes.ok ? await ptwsRes.json() : [];
      const memos = memosRes.ok ? await memosRes.json() : [];
      
      const container = document.getElementById('admin-section');
      if (container && currentSection === 'admin') {
        container.innerHTML = renderManagerPortal(activeSessions, activityLogs, ptws, memos, hseData);
      }
    }
  } catch (err) {
    console.error("Admin command center data polling failure:", err);
  }
}

function startAdminPolling() {
  stopAdminPolling();
  adminPollingInterval = setInterval(loadAdminData, 5000);
}

function stopAdminPolling() {
  if (adminPollingInterval) {
    clearInterval(adminPollingInterval);
    adminPollingInterval = null;
  }
}

function refreshAdminData() {
  loadAdminData();
}

// Fetch all collections from local backend
async function loadAllData() {
  try {
    const [workersRes, activitiesRes, ptwsRes, nearMissesRes, trainingsRes, riskRes,
           equipRes, storeRes, maintRes, incidentsRes, safeHoursRes, eteamsRes,
           preOpRes, eqReadRes, taskWorkersRes, emerChkRes, tbtRes, attendRes,
           methodRes, liftingRes, emerPlanRes, memosRes] = await Promise.all([
      fetch('/api/workers'),
      fetch('/api/activities'),
      fetch('/api/ptws'),
      fetch('/api/near-misses'),
      fetch('/api/trainings'),
      fetch('/api/risk-assessments'),
      fetch('/api/equipment'),
      fetch('/api/store'),
      fetch('/api/maintenance'),
      fetch('/api/incidents'),
      fetch('/api/safe-hours'),
      fetch('/api/emergency-teams'),
      fetch('/api/pre-operation'),
      fetch('/api/equipment-readiness'),
      fetch('/api/task-workers'),
      fetch('/api/emergency-checklists'),
      fetch('/api/tbt-register'),
      fetch('/api/attendance-exit'),
      fetch('/api/method-statements'),
      fetch('/api/lifting-plans'),
      fetch('/api/emergency-plans'),
      fetch('/api/memos')
    ]);

    hseData.workers          = await workersRes.json();
    hseData.activities       = await activitiesRes.json();
    hseData.ptws             = await ptwsRes.json();
    hseData.nearMisses       = await nearMissesRes.json();
    hseData.trainings        = await trainingsRes.json();
    hseData.riskAssessments  = await riskRes.json();
    hseData.equipment        = await equipRes.json();
    hseData.store            = await storeRes.json();
    hseData.maintenance      = await maintRes.json();
    hseData.incidents        = await incidentsRes.json();
    hseData['safe-hours']         = await safeHoursRes.json();
    hseData['emergency-teams']    = await eteamsRes.json();
    hseData['pre-operation']      = await preOpRes.json();
    hseData['equipment-readiness']= await eqReadRes.json();
    hseData['task-workers']       = await taskWorkersRes.json();
    hseData['emergency-checklists']= await emerChkRes.json();
    hseData['tbt-register']       = await tbtRes.json();
    hseData['attendance-exit']    = await attendRes.json();
    hseData['method-statements']  = await methodRes.json();
    hseData['lifting-plans']      = await liftingRes.json();
    hseData['emergency-plans']    = await emerPlanRes.json();
    hseData.memos            = memosRes.ok ? await memosRes.json() : [];

    // Refresh modal dropdown selectors if needed
    updateFormSelectors();
  } catch (err) {
    console.error("Critical: Failed to load backend data", err);
    alert("Could not connect to the local server. Make sure node server.js is running.");
  }
}

// Navigation Router
function navigate(sectionId) {
  // Close mobile sidebar drawer if it was open
  const sidebar = document.querySelector('.sidebar');
  if (sidebar && sidebar.classList.contains('open')) {
    sidebar.classList.remove('open');
  }

  // Access control check for Admin/Owner Panel
  if (sectionId === 'admin') {
    if (!currentUser || currentUser.role !== 'admin') {
      alert("Access Denied: Only managers can access the Owner Panel.");
      navigate('dashboard');
      return;
    }
  }

  currentSection = sectionId;
  
  // Stop admin polling if we move away from the admin panel
  if (sectionId !== 'admin') {
    stopAdminPolling();
  }

  // Update nav UI active styles
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('onclick') === `navigate('${sectionId}')`) {
      item.classList.add('active');
    }
  });

  // Apply separation of Manager Oversight vs HSE Work Platform
  if (typeof applyPlatformSeparation === 'function') {
    applyPlatformSeparation();
  }

  // Toggle content sections
  document.querySelectorAll('.content-section').forEach(sec => {
    sec.classList.remove('active');
  });

  const targetSec = document.getElementById(`${sectionId}-section`);
  if (targetSec) {
    targetSec.classList.add('active');
  }

  // Render view
  renderView(sectionId);
}

// Render dynamic content for active tab
function renderView(sectionId) {
  const container = document.getElementById(`${sectionId}-section`);
  if (!container) return;

  // Update the sticky header title
  const titleMap = {
    dashboard: { title: 'HSE Dashboard', sub: 'Safety metrics and daily controls overview' },
    workers: { title: 'Workers Registry / سجل العمال', sub: 'Manage all registered site workers' },
    activities: { title: 'Daily Activities / الأنشطة اليومية', sub: 'Log daily work operations and hazards' },
    ptw: { title: 'Permits to Work / تصاريح العمل', sub: 'Upload, track and manage all work permits' },
    'risk-assessments': { title: 'Risk Assessments / تقييم المخاطر', sub: 'Identify and control site hazards' },
    training: { title: 'Training Registry / سجل التدريب', sub: 'HSE training sessions and attendees' },
    'near-misses': { title: 'Near Misses / الحوادث الوشيكة', sub: 'Report and track near-miss incidents' },
    reports: { title: 'Safety Reports / التقارير', sub: 'Generate period-based HSE summaries' },
    equipment: { title: 'Critical Equipment / المعدات الحرجة', sub: 'Inspection status, color tags, and certifications' },
    store: { title: 'Store & Warehouse / المخزن', sub: 'Safety tools, assets, and inspection schedule' },
    maintenance: { title: 'Maintenance Log / سجل الصيانة', sub: 'Track all equipment maintenance records' },
    incidents: { title: 'Incidents & Injuries / الحوادث والإصابات', sub: 'Incident register, LTI tracking, and corrective actions' },
    'safe-hours': { title: 'Safe Working Hours / ساعات العمل الآمنة', sub: 'Monthly man-hours and LTI-free days tracker' },
    'emergency-teams': { title: 'Emergency Teams / فرق الطوارئ', sub: 'Firefighting, First-Aid, and Evacuation team register' },
    'pre-operation': { title: 'Pre-operation Checklist / فحص ما قبل التشغيل', sub: 'Daily equipment inspection before work starts' },
    'equipment-readiness': { title: 'Equipment Readiness / جاهزية المعدات للمهمة', sub: 'Confirm equipment is suitable for each task' },
    'task-workers': { title: 'Task Workers List / قائمة عمال المهمة', sub: 'Assign and verify workers per task or operation' },
    'emergency-checklists': { title: 'Emergency Team Readiness / جاهزية فرق الطوارئ', sub: 'Periodic check of emergency team readiness' },
    'tbt-register': { title: 'Tool Box Talk / محاضرات السلامة', sub: 'Pre-work safety briefings and TBT sessions register' },
    'attendance-exit': { title: 'Attendance & Exit / الحضور والانصراف', sub: 'Daily gate attendance and exit log' },
    'method-statements': { title: 'Method Statements / خطط العمل', sub: 'Work execution plans and step-by-step procedures' },
    'lifting-plans': { title: 'Lifting Plans / خطط الرفع', sub: 'Critical lifting operations with crane and rigging data' },
    'emergency-plans': { title: 'Emergency Plans / خطط الطوارئ', sub: 'Site emergency response and evacuation plans' },
    'matrix-ref': { title: 'Risk Matrix & Color Code / مصفوفة المخاطر', sub: 'Reference guide for risk assessment and equipment color tags' },
    admin: { title: 'Owner Control Panel / لوحة تحكم المالك', sub: 'Monitor active sessions and track system operations logs' },
    memos: { title: 'Safety Memos & Requests / سجل المذكرات والطلبات', sub: 'Issue, view, save, and print worksite safety memos' }
  };

  const info = titleMap[sectionId];
  if (info) {
    const titleEl = document.getElementById('header-title');
    const subEl = document.getElementById('header-subtitle');
    if (titleEl) titleEl.textContent = info.title;
    if (subEl) subEl.textContent = info.sub;
  }

  // Sections handled by specific components
  const specificSections = [
    'dashboard', 'workers', 'activities', 'ptw',
    'risk-assessments', 'training', 'near-misses', 'reports', 'matrix-ref', 'admin', 'memos'
  ];

  if (!specificSections.includes(sectionId)) {
    // Generic sections driven by HSE_SCHEMAS
    const data = hseData[sectionId] || [];
    container.innerHTML = renderListTable(sectionId, data);
    return;
  }

  switch(sectionId) {
    case 'dashboard':
      container.innerHTML = renderDashboard(hseData);
      renderDashboardCharts();
      break;
    case 'workers':
      container.innerHTML = renderWorkers(hseData.workers);
      break;
    case 'activities':
      container.innerHTML = renderActivities(hseData.activities, hseData.ptws, hseData.workers);
      break;
    case 'ptw':
      container.innerHTML = renderPtws(hseData.ptws);
      break;
    case 'risk-assessments':
      container.innerHTML = renderRiskAssessmentsList(hseData.riskAssessments);
      break;
    case 'training':
      container.innerHTML = renderTrainingLogs(hseData.trainings, hseData.workers);
      break;
    case 'near-misses':
      container.innerHTML = renderNearMisses(hseData.nearMisses);
      break;
    case 'reports':
      container.innerHTML = renderReportsDashboard();
      break;
    case 'matrix-ref':
      container.innerHTML = renderMatrixRef();
      break;
    case 'admin':
      container.innerHTML = `
        <div style="text-align:center; padding:50px; color:var(--text-secondary);">
          <i class="fas fa-spinner fa-spin" style="font-size:2.5rem; margin-bottom:12px; color:var(--accent);"></i>
          <p>Loading owner dashboard logs and active pings...</p>
        </div>`;
      loadAdminData();
      startAdminPolling();
      break;
    case 'memos':
      container.innerHTML = renderMemosList(hseData.memos);
      break;
  }
}

// Render Dashboard Analytics Charts
function renderDashboardCharts() {
  const canvas = document.getElementById('safetyChart');
  const permitCanvas = document.getElementById('permitChart');
  if (!canvas) return;

  // Double check if Chart.js library is loaded
  if (typeof Chart === 'undefined') {
    canvas.parentElement.innerHTML = `
      <div style="text-align:center; padding:20px; color:var(--text-secondary); grid-column: 1 / -1;">
        <i class="fas fa-chart-line" style="font-size:2.5rem; margin-bottom:8px;"></i>
        <p>Dashboard charts are active. Visual chart needs internet connection to fetch Chart.js CDN.</p>
        <div style="font-size:0.85rem; margin-top:8px;">
          Registered Metrics: Active Workers (${hseData.workers.filter(w=>w.status==='Active').length}) | 
          Open Incidents (${hseData.nearMisses.filter(n=>n.status!=='Closed').length})
        </div>
      </div>`;
    return;
  }

  const ctx = canvas.getContext('2d');
  
  // Aggregate Near Misses per month (or last 6 months)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const nearMissCounts = new Array(12).fill(0);
  const trainingCounts = new Array(12).fill(0);

  hseData.nearMisses.forEach(nm => {
    if (!nm.date) return;
    const date = parseDateOnly(nm.date);
    if (!date) return;
    const m = date.getMonth();
    nearMissCounts[m]++;
  });

  hseData.trainings.forEach(t => {
    if (!t.date) return;
    const date = parseDateOnly(t.date);
    if (!date) return;
    const m = date.getMonth();
    trainingCounts[m]++;
  });

  // Current year monthly charts
  const currentMonthIdx = new Date().getMonth();
  // Slice last 6 months
  const chartLabels = [];
  const chartNearMiss = [];
  const chartTraining = [];

  for (let i = 5; i >= 0; i--) {
    let idx = currentMonthIdx - i;
    if (idx < 0) idx += 12;
    chartLabels.push(months[idx]);
    chartNearMiss.push(nearMissCounts[idx]);
    chartTraining.push(trainingCounts[idx]);
  }

  if (safetyChartInstance) {
    safetyChartInstance.destroy();
  }

  const isAr = (localStorage.getItem('hse_lang') || 'en') === 'ar';

  safetyChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: chartLabels,
      datasets: [
        {
          label: isAr ? 'الحوادث الوشيكة' : 'Near Miss Incidents',
          data: chartNearMiss,
          backgroundColor: 'rgba(244, 63, 94, 0.6)',
          borderColor: 'rgba(244, 63, 94, 1)',
          borderWidth: 1.5,
          borderRadius: 6
        },
        {
          label: isAr ? 'الدورات التدريبية' : 'Training Sessions',
          data: chartTraining,
          backgroundColor: 'rgba(16, 185, 129, 0.6)',
          borderColor: 'rgba(16, 185, 129, 1)',
          borderWidth: 1.5,
          borderRadius: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: 'var(--text-secondary)', font: { family: 'Outfit' } }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: { color: 'var(--text-secondary)' }
        },
        y: {
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: { color: 'var(--text-secondary)', stepSize: 1 }
        }
      }
    }
  });

  // Doughnut Chart for Permit distribution
  if (permitCanvas) {
    const permitCtx = permitCanvas.getContext('2d');
    
    // Aggregate PTWs by type
    const ptwTypes = {};
    hseData.ptws.forEach(p => {
      const type = p.type || (isAr ? 'أخرى' : 'Other');
      ptwTypes[type] = (ptwTypes[type] || 0) + 1;
    });

    const permitLabels = Object.keys(ptwTypes);
    const permitData = Object.values(ptwTypes);

    // Destroy old instance if exists
    if (window.permitChartInstance) {
      window.permitChartInstance.destroy();
    }

    const premiumColors = [
      'rgba(244, 63, 94, 0.7)',  // Rose
      'rgba(14, 165, 233, 0.7)', // Sky
      'rgba(245, 158, 11, 0.7)',  // Amber
      'rgba(99, 102, 241, 0.7)',  // Indigo
      'rgba(16, 185, 129, 0.7)',  // Emerald
      'rgba(168, 85, 247, 0.7)'   // Purple
    ];

    const premiumBorders = [
      'rgba(244, 63, 94, 1)',
      'rgba(14, 165, 233, 1)',
      'rgba(245, 158, 11, 1)',
      'rgba(99, 102, 241, 1)',
      'rgba(16, 185, 129, 1)',
      'rgba(168, 85, 247, 1)'
    ];

    if (permitLabels.length === 0) {
      // Add a placeholder label if no permits exist
      permitLabels.push(isAr ? 'لا توجد تصاريح' : 'No Permits');
      permitData.push(1);
      premiumColors[0] = 'rgba(148, 163, 184, 0.2)'; // Slate mute
      premiumBorders[0] = 'rgba(148, 163, 184, 0.5)';
    }

    window.permitChartInstance = new Chart(permitCtx, {
      type: 'doughnut',
      data: {
        labels: permitLabels,
        datasets: [{
          data: permitData,
          backgroundColor: premiumColors.slice(0, permitLabels.length),
          borderColor: premiumBorders.slice(0, permitLabels.length),
          borderWidth: 1.5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              color: 'var(--text-secondary)',
              font: { family: 'Outfit', size: 10 }
            }
          },
          title: {
            display: true,
            text: isAr ? 'توزيع تصاريح العمل حسب النوع' : 'PTW Work Types Distribution',
            color: 'var(--text-primary)',
            font: { family: 'Outfit', weight: 'bold', size: 12 }
          }
        },
        cutout: '60%'
      }
    });
  }
}

// Modal Toggle Helpers
function showModal(modalId, editId = null) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  modal.classList.add('active');
  
  // Handle specific form modifications for edits
  if (editId) {
    loadFormForEdit(modalId, editId);
  } else if (modalId !== 'genericFormModal') {
    resetModalForm(modalId);
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
  }
}

function setupModalDismissers() {
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal.id);
      }
    });
  });
}

// Dynamic Populate Select Option Inputs in Forms
function updateFormSelectors() {
  // Update PTW Select options in Activity log modal
  const actPtwSelect = document.getElementById('act_ptwId');
  if (actPtwSelect) {
    actPtwSelect.innerHTML = `<option value="">No Associated Permit</option>` + 
      hseData.ptws.map(p => `<option value="${p.id}">${p.permitNo} (${p.site})</option>`).join('');
  }

  // Update Worker list checkboxes in Activity modal and Training modal
  const actWorkersDiv = document.getElementById('act_workers_list');
  if (actWorkersDiv) {
    actWorkersDiv.innerHTML = hseData.workers.map(w => `
      <label class="checkbox-option">
        <input type="checkbox" name="act_workers" value="${w.id}">
        <span>${w.name} (${w.jobTitle} - ${w.site})</span>
      </label>
    `).join('') || '<p style="color:var(--text-muted); font-size:0.85rem; padding:8px;">No workers registered</p>';
  }

  const trWorkersDiv = document.getElementById('tr_workers_list');
  if (trWorkersDiv) {
    trWorkersDiv.innerHTML = hseData.workers.map(w => `
      <label class="checkbox-option">
        <input type="checkbox" name="tr_workers" value="${w.id}">
        <span>${w.name} (${w.jobTitle})</span>
      </label>
    `).join('') || '<p style="color:var(--text-muted); font-size:0.85rem; padding:8px;">No workers registered</p>';
  }
}

// Reset form elements
function resetModalForm(modalId) {
  const form = document.querySelector(`#${modalId} form`);
  if (!form) return;
  
  form.reset();
  form.removeAttribute('data-edit-id');
  
  // Set default dates where applicable
  const dateInputs = form.querySelectorAll('input[type="date"]');
  const todayStr = toLocalDateInputValue();
  dateInputs.forEach(input => {
    if (!input.value) {
      input.value = todayStr;
    }
  });

  // Clear file upload label containers
  const fileLabel = document.getElementById('ptwFileLabel');
  if (fileLabel) {
    fileLabel.innerHTML = `<i class="fas fa-cloud-arrow-up upload-icon"></i><div class="upload-text">Drag & drop permit file or <span>browse</span></div>`;
  }
  const photosLabel = document.getElementById('ptwPhotosLabel');
  if (photosLabel) {
    photosLabel.innerHTML = `<i class="fas fa-camera upload-icon"></i><div class="upload-text">Click or drag photos (multiple allowed)</div>`;
  }
  const reportsLabel = document.getElementById('ptwReportsLabel');
  if (reportsLabel) {
    reportsLabel.innerHTML = `<i class="fas fa-file-shield upload-icon"></i><div class="upload-text">Attach audit sheets or gas tests (multiple allowed)</div>`;
  }
}

function getInputValue(id) {
  const input = document.getElementById(id);
  return input ? input.value.trim() : '';
}

// List Filter Helpers
function filterWorkersList() {
  const site = document.getElementById('workerSiteFilter').value;
  const search = document.getElementById('workerSearchInput').value.toLowerCase();
  
  document.querySelectorAll('.worker-row').forEach(row => {
    const rowSite = row.getAttribute('data-site');
    const rowName = row.getAttribute('data-name');
    
    const matchesSite = !site || rowSite === site;
    const matchesSearch = !search || rowName.includes(search);
    
    if (matchesSite && matchesSearch) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

function filterActivitiesList() {
  const dateVal = document.getElementById('activityDateFilter').value;
  const site = document.getElementById('activitySiteFilter').value;
  
  document.querySelectorAll('.activity-row').forEach(row => {
    const rowDate = row.getAttribute('data-date');
    const rowSite = row.getAttribute('data-site');
    
    const matchesDate = !dateVal || rowDate === dateVal;
    const matchesSite = !site || rowSite === site;
    
    if (matchesDate && matchesSite) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

function filterPtwsList() {
  const site = document.getElementById('ptwSiteFilter').value;
  const status = document.getElementById('ptwStatusFilter').value;
  
  document.querySelectorAll('.ptw-row').forEach(row => {
    const rowSite = row.getAttribute('data-site');
    const rowStatus = row.getAttribute('data-status');
    
    const matchesSite = !site || rowSite === site;
    const matchesStatus = !status || rowStatus === status;
    
    if (matchesSite && matchesStatus) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}


// ==========================================
// CRUD: WORKERS REGISTRY
// ==========================================
async function submitWorkerForm(event) {
  event.preventDefault();
  const form = event.target;
  const editId = form.getAttribute('data-edit-id');
  
  const payload = {
    name: document.getElementById('w_name').value,
    code: document.getElementById('w_code').value,
    jobTitle: document.getElementById('w_jobTitle').value,
    site: document.getElementById('w_site').value,
    status: document.getElementById('w_status').value
  };

  try {
    let res;
    if (editId) {
      res = await fetch(`/api/workers/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } else {
      res = await fetch('/api/workers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }

    if (!res.ok) throw new Error(await res.text());
    
    closeModal('workerModal');
    await loadAllData();
    navigate('workers');
  } catch (err) {
    alert("Worker registration error: " + err.message);
  }
}

async function editWorker(id) {
  const worker = hseData.workers.find(w => w.id === id);
  if (!worker) return;

  showModal('workerModal', id);
}

async function deleteWorker(id) {
  if (!confirm("Are you sure you want to delete this worker registry?")) return;
  try {
    const res = await fetch(`/api/workers/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error("Delete failed");
    await loadAllData();
    navigate('workers');
  } catch (err) {
    alert(err.message);
  }
}


// ==========================================
// CRUD: DAILY ACTIVITIES
// ==========================================
async function submitActivityForm(event) {
  event.preventDefault();
  const form = event.target;
  const editId = form.getAttribute('data-edit-id');

  // Collect checked worker IDs
  const checkedWorkers = [];
  form.querySelectorAll('input[name="act_workers"]:checked').forEach(cb => {
    checkedWorkers.push(parseInt(cb.value, 10));
  });

  const payload = {
    date: document.getElementById('act_date').value,
    site: document.getElementById('act_site').value,
    activityName: document.getElementById('act_activityName').value,
    supervisor: document.getElementById('act_supervisor').value,
    status: document.getElementById('act_status').value,
    ptwId: document.getElementById('act_ptwId').value || null,
    workersInvolved: checkedWorkers,
    hazardsIdentified: document.getElementById('act_hazardsIdentified').value,
    actionsTaken: document.getElementById('act_actionsTaken').value
  };

  try {
    let res;
    if (editId) {
      res = await fetch(`/api/activities/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } else {
      res = await fetch('/api/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }

    if (!res.ok) throw new Error(await res.text());
    
    closeModal('activityModal');
    await loadAllData();
    navigate('activities');
  } catch (err) {
    alert("Failed to save activity log: " + err.message);
  }
}

async function editActivity(id) {
  const act = hseData.activities.find(a => a.id === id);
  if (!act) return;

  showModal('activityModal', id);
}

async function deleteActivity(id) {
  if (!confirm("Are you sure you want to delete this activity log?")) return;
  try {
    const res = await fetch(`/api/activities/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error("Delete failed");
    await loadAllData();
    navigate('activities');
  } catch (err) {
    alert(err.message);
  }
}


// ==========================================
// CRUD: PERMITS TO WORK (PTW) UPLOADS
// ==========================================
function handlePtwFileSelected(input) {
  const label = document.getElementById('ptwFileLabel');
  if (input.files && input.files[0]) {
    label.innerHTML = `
      <i class="fas fa-file-pdf" style="font-size:2rem; color:var(--accent);"></i>
      <div class="upload-text" style="color:var(--text-primary); font-weight:600; margin-top:8px;">
        ${input.files[0].name}
      </div>
      <div style="font-size:0.75rem; color:var(--text-muted);">Click or drag new file to change</div>
    `;
  }
}

function handlePtwPhotosSelected(input) {
  const label = document.getElementById('ptwPhotosLabel');
  if (!label) return;
  if (input.files && input.files.length > 0) {
    const names = Array.from(input.files).map(f => f.name).join(', ');
    label.innerHTML = `
      <i class="fas fa-camera" style="font-size:1.5rem; color:var(--success);"></i>
      <div class="upload-text" style="color:var(--text-primary); font-weight:600; margin-top:6px;">
        ${input.files.length} photo(s) selected
      </div>
      <div style="font-size:0.7rem; color:var(--text-muted); margin-top:4px; word-break:break-all;">${names}</div>
    `;
  }
}

function handlePtwReportsSelected(input) {
  const label = document.getElementById('ptwReportsLabel');
  if (!label) return;
  if (input.files && input.files.length > 0) {
    const names = Array.from(input.files).map(f => f.name).join(', ');
    label.innerHTML = `
      <i class="fas fa-file-shield" style="font-size:1.5rem; color:var(--info);"></i>
      <div class="upload-text" style="color:var(--text-primary); font-weight:600; margin-top:6px;">
        ${input.files.length} report file(s) selected
      </div>
      <div style="font-size:0.7rem; color:var(--text-muted); margin-top:4px; word-break:break-all;">${names}</div>
    `;
  }
}

async function submitPtwForm(event) {
  event.preventDefault();
  const form = event.target;
  const editId = form.getAttribute('data-edit-id');
  const fileInput = document.getElementById('ptwFile');
  const photosInput = document.getElementById('ptwPhotos');
  const reportsInput = document.getElementById('ptwReports');

  // New upload requires main file
  if (!editId && !fileInput.files.length) {
    alert('Please choose a PTW document file to upload / يرجى اختيار ملف التصريح');
    return;
  }

  // Build multipart form with all three file fields
  const formData = new FormData();
  formData.append('permitNo',    document.getElementById('ptw_permitNo').value);
  formData.append('type',        document.getElementById('ptw_type').value);
  formData.append('issueDate',   document.getElementById('ptw_issueDate').value);
  formData.append('expiryDate',  document.getElementById('ptw_expiryDate').value);
  formData.append('site',        document.getElementById('ptw_site').value);
  formData.append('description', document.getElementById('ptw_description').value);
  formData.append('status',      document.getElementById('ptw_status').value);

  if (fileInput.files.length)    formData.append('ptwFile', fileInput.files[0]);
  if (photosInput  && photosInput.files.length)  Array.from(photosInput.files).forEach(f  => formData.append('ptwPhotos',  f));
  if (reportsInput && reportsInput.files.length) Array.from(reportsInput.files).forEach(f => formData.append('ptwReports', f));

  try {
    const url = editId ? `/api/ptws/${editId}/upload` : '/api/ptws/upload';
    const method = editId ? 'PUT' : 'POST';
    const res = await fetch(url, { method, body: formData });
    if (!res.ok) throw new Error(await res.text());

    closeModal('ptwModal');
    await loadAllData();
    navigate('ptw');
  } catch (err) {
    alert('Error uploading Permit: ' + err.message);
  }
}

// Toggle a permit between Active / Closed status
async function togglePtwStatus(id, currentStatus) {
  const newStatus = currentStatus === 'Active' ? 'Closed' : 'Active';
  try {
    const res = await fetch(`/api/ptws/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    if (!res.ok) throw new Error(await res.text());
    await loadAllData();
    navigate('ptw');
  } catch (err) {
    alert('Failed to update permit status: ' + err.message);
  }
}

async function editPtw(id) {
  const p = hseData.ptws.find(item => item.id === id);
  if (!p) return;

  showModal('ptwModal', id);
  // Hide file-input required alert for edits
  const uploadContainer = document.querySelector('.upload-container');
  if (uploadContainer) {
    const textLabel = uploadContainer.querySelector('.upload-text');
    if (textLabel) {
      textLabel.innerHTML = `Keep original file: <strong>${p.fileName}</strong>. Or click to <span>replace</span>`;
    }
  }
}

async function deletePtw(id) {
  if (!confirm("Are you sure you want to delete this PTW record and its local physical file?")) return;
  try {
    const res = await fetch(`/api/ptws/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error("Delete failed");
    await loadAllData();
    navigate('ptw');
  } catch (err) {
    alert(err.message);
  }
}

// ==========================================
// SIDEBAR ACCORDION TOGGLE
// ==========================================
function toggleNavGroup(headerEl) {
  headerEl.classList.toggle('open');
  const subMenu = headerEl.nextElementSibling;
  if (subMenu && subMenu.classList.contains('nav-sub-menu')) {
    subMenu.classList.toggle('open');
  }
}


// ==========================================
// CRUD: TRAINING SESSIONS
// ==========================================
async function submitTrainingForm(event) {
  event.preventDefault();
  const form = event.target;
  const editId = form.getAttribute('data-edit-id');

  const attendeeIds = [];
  form.querySelectorAll('input[name="tr_workers"]:checked').forEach(cb => {
    attendeeIds.push(parseInt(cb.value, 10));
  });

  const payload = {
    title: document.getElementById('tr_title').value,
    date: document.getElementById('tr_date').value,
    trainer: document.getElementById('tr_trainer').value,
    site: document.getElementById('tr_site').value,
    duration: document.getElementById('tr_duration').value,
    remarks: document.getElementById('tr_remarks').value,
    attendees: attendeeIds
  };

  try {
    let res;
    if (editId) {
      res = await fetch(`/api/trainings/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } else {
      res = await fetch('/api/trainings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }

    if (!res.ok) throw new Error(await res.text());

    // Also auto-update training list names inside individual workers!
    // We update workers' training records if they attended this class
    await syncWorkersTraining(payload.title, attendeeIds);

    closeModal('trainingModal');
    await loadAllData();
    navigate('training');
  } catch (err) {
    alert("Training recording error: " + err.message);
  }
}

// Sync worker checklist to assign their training names automatically
async function syncWorkersTraining(trainingTitle, attendeeIds) {
  for (const id of attendeeIds) {
    const worker = hseData.workers.find(w => w.id === id);
    if (worker) {
      const currentList = Array.isArray(worker.trainingCompleted) ? worker.trainingCompleted : [];
      if (!currentList.includes(trainingTitle)) {
        currentList.push(trainingTitle);
        await fetch(`/api/workers/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ trainingCompleted: currentList })
        });
      }
    }
  }
}

async function editTraining(id) {
  showModal('trainingModal', id);
}

async function deleteTraining(id) {
  if (!confirm("Are you sure you want to delete this training record?")) return;
  try {
    const res = await fetch(`/api/trainings/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error("Delete failed");
    await loadAllData();
    navigate('training');
  } catch (err) {
    alert(err.message);
  }
}


// ==========================================
// CRUD: NEAR MISS REPORTS
// ==========================================
async function submitNearMissForm(event) {
  event.preventDefault();
  const form = event.target;
  const editId = form.getAttribute('data-edit-id');

  const payload = {
    date: document.getElementById('nm_date').value,
    time: document.getElementById('nm_time').value,
    site: document.getElementById('nm_site').value,
    description: document.getElementById('nm_description').value,
    potentialSeverity: document.getElementById('nm_potentialSeverity').value,
    correctiveAction: document.getElementById('nm_correctiveAction').value,
    reporter: document.getElementById('nm_reporter').value,
    status: document.getElementById('nm_status').value
  };

  try {
    let res;
    if (editId) {
      res = await fetch(`/api/near-misses/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } else {
      res = await fetch('/api/near-misses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }

    if (!res.ok) throw new Error(await res.text());
    
    closeModal('nearMissModal');
    await loadAllData();
    navigate('near-misses');
  } catch (err) {
    alert("Error logging incident: " + err.message);
  }
}

async function editNearMiss(id) {
  showModal('nearMissModal', id);
}

async function deleteNearMiss(id) {
  if (!confirm("Are you sure you want to delete this near miss log?")) return;
  try {
    const res = await fetch(`/api/near-misses/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error("Delete failed");
    await loadAllData();
    navigate('near-misses');
  } catch (err) {
    alert(err.message);
  }
}


// ==========================================
// DYNAMIC EDIT LOADER (Populates Form Data)
// ==========================================
function loadFormForEdit(modalId, editId) {
  const form = document.querySelector(`#${modalId} form`);
  if (!form) return;

  form.setAttribute('data-edit-id', editId);
  
  if (modalId === 'workerModal') {
    const w = hseData.workers.find(item => item.id === editId);
    if (w) {
      document.getElementById('w_name').value = w.name;
      document.getElementById('w_code').value = w.code;
      document.getElementById('w_jobTitle').value = w.jobTitle;
      document.getElementById('w_site').value = w.site;
      document.getElementById('w_status').value = w.status;
    }
  } else if (modalId === 'activityModal') {
    const a = hseData.activities.find(item => item.id === editId);
    if (a) {
      document.getElementById('act_date').value = a.date;
      document.getElementById('act_site').value = a.site;
      document.getElementById('act_activityName').value = a.activityName;
      document.getElementById('act_supervisor').value = a.supervisor;
      document.getElementById('act_status').value = a.status;
      document.getElementById('act_ptwId').value = a.ptwId || '';
      document.getElementById('act_hazardsIdentified').value = a.hazardsIdentified || '';
      document.getElementById('act_actionsTaken').value = a.actionsTaken || '';
      
      // Select appropriate worker checkboxes
      form.querySelectorAll('input[name="act_workers"]').forEach(cb => {
        cb.checked = a.workersInvolved.includes(parseInt(cb.value, 10));
      });
    }
  } else if (modalId === 'ptwModal') {
    const p = hseData.ptws.find(item => item.id === editId);
    if (p) {
      document.getElementById('ptw_permitNo').value = p.permitNo;
      document.getElementById('ptw_type').value = p.type;
      document.getElementById('ptw_issueDate').value = p.issueDate;
      document.getElementById('ptw_expiryDate').value = p.expiryDate;
      document.getElementById('ptw_site').value = p.site;
      document.getElementById('ptw_description').value = p.description;
      document.getElementById('ptw_status').value = p.status;
    }
  } else if (modalId === 'trainingModal') {
    const t = hseData.trainings.find(item => item.id === editId);
    if (t) {
      document.getElementById('tr_title').value = t.title;
      document.getElementById('tr_date').value = t.date;
      document.getElementById('tr_trainer').value = t.trainer;
      document.getElementById('tr_site').value = t.site;
      document.getElementById('tr_duration').value = t.duration;
      document.getElementById('tr_remarks').value = t.remarks;

      form.querySelectorAll('input[name="tr_workers"]').forEach(cb => {
        cb.checked = t.attendees.includes(parseInt(cb.value, 10));
      });
    }
  } else if (modalId === 'nearMissModal') {
    const n = hseData.nearMisses.find(item => item.id === editId);
    if (n) {
      document.getElementById('nm_date').value = n.date;
      document.getElementById('nm_time').value = n.time;
      document.getElementById('nm_site').value = n.site;
      document.getElementById('nm_description').value = n.description;
      document.getElementById('nm_potentialSeverity').value = n.potentialSeverity;
      document.getElementById('nm_correctiveAction').value = n.correctiveAction || '';
      document.getElementById('nm_reporter').value = n.reporter || '';
      document.getElementById('nm_status').value = n.status;
    }
  }
}


// ==========================================
// GENERIC CRUD FOR ALL HSE SCHEMA SECTIONS
// ==========================================

/**
 * Open the generic form modal to create a new record.
 */
function initNewGenericRecord(section) {
  const schema = HSE_SCHEMAS[section];
  if (!schema) return;

  genericEditState = { section, id: null };

  document.getElementById('genericModalTitle').textContent = `New Record — ${schema.title}`;
  document.getElementById('genericFormSubmitBtn').textContent = 'Save Record / حفظ';

  // Inject dynamic form fields
  const body = document.getElementById('genericFormBody');
  body.innerHTML = `<div class="form-grid">${buildGenericFormHtml(section)}</div>`;

  // Auto-fill today's date for date fields
  const todayStr = toLocalDateInputValue();
  body.querySelectorAll('input[type="date"]').forEach(el => {
    if (!el.value) el.value = todayStr;
  });

  showModal('genericFormModal');
}

/**
 * Open the generic form modal to edit an existing record.
 */
function editGenericRecord(section, id) {
  const schema = HSE_SCHEMAS[section];
  if (!schema) return;

  const record = (hseData[section] || []).find(r => r.id === id);
  if (!record) return;

  genericEditState = { section, id };

  document.getElementById('genericModalTitle').textContent = `Edit Record — ${schema.title}`;
  document.getElementById('genericFormSubmitBtn').textContent = 'Update Record / تحديث';

  const body = document.getElementById('genericFormBody');
  body.innerHTML = `<div class="form-grid">${buildGenericFormHtml(section, record)}</div>`;

  showModal('genericFormModal');
}

/**
 * Submit handler for genericFormModal — handles both create and update.
 */
async function submitGenericForm(event) {
  event.preventDefault();
  const { section, id } = genericEditState;
  if (!section) return;

  const schema = HSE_SCHEMAS[section];
  if (!schema) return;

  // Collect all field values from the injected form
  const payload = {};
  schema.fields.forEach(field => {
    const el = document.getElementById(`gen_${field.id}`);
    if (el) payload[field.id] = el.value;
  });

  try {
    let res;
    if (id) {
      // Update existing
      res = await fetch(`/api/${section}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } else {
      // Create new
      res = await fetch(`/api/${section}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(errText);
    }

    closeModal('genericFormModal');
    await loadAllData();
    navigate(section);
  } catch (err) {
    alert('Error saving record: ' + err.message);
  }
}

/**
 * Delete a record from any generic section.
 */
async function deleteGenericRecord(section, id) {
  if (!confirm('هل أنت متأكد من الحذف؟ / Are you sure you want to delete this record?')) return;
  try {
    const res = await fetch(`/api/${section}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Delete failed');
    await loadAllData();
    navigate(section);
  } catch (err) {
    alert('Delete error: ' + err.message);
  }
}

/**
 * View printable version of a plan / checklist record.
 */
function viewPrintGeneric(section, id) {
  const record = (hseData[section] || []).find(r => r.id === id);
  if (!record) return;

  // Render printable view inside the section container
  const container = document.getElementById(`${section}-section`);
  if (container) {
    container.innerHTML = renderPrintableLayout(section, record);
  }
}


// ==========================================
// INTERACTIVE RISK ASSESSMENT LOGIC
// ==========================================
function initNewRiskAssessment() {
  currentHazardsList = [];
  const container = document.getElementById('risk-assessments-section');
  container.innerHTML = renderRiskAssessmentBuilder();
  addHazardRow(); // Add first blank hazard row by default
}

function showMatrixHelp(l, s) {
  const score = l * s;
  let severity = "";
  let likelihood = "";
  
  if (l === 1) likelihood = "Rare (1)";
  else if (l === 2) likelihood = "Unlikely (2)";
  else if (l === 3) likelihood = "Possible (3)";
  else if (l === 4) likelihood = "Likely (4)";
  else if (l === 5) likelihood = "Almost Certain (5)";

  if (s === 1) severity = "Negligible (1)";
  else if (s === 2) severity = "Minor (2)";
  else if (s === 3) severity = "Moderate (3)";
  else if (s === 4) severity = "Major (4)";
  else if (s === 5) severity = "Catastrophic (5)";

  let assessment = "";
  if (score <= 4) assessment = "LOW RISK - Routine operations under standard controls.";
  else if (score <= 9) assessment = "MEDIUM RISK - Supervisor review and toolbox talk required.";
  else if (score <= 16) assessment = "HIGH RISK - Enhanced controls, method statement, and HSE approval required.";
  else assessment = "CRITICAL RISK - Stop work until the risk is reduced and formally approved.";

  document.getElementById('matrix-help-box').innerHTML = `
    <strong>Likelihood:</strong> ${likelihood} &times; <strong>Severity:</strong> ${severity} = 
    <strong>Score: ${score}</strong> (${assessment})
  `;
}

function addHazardRow(data = null) {
  const wrapper = document.getElementById('hazards-rows-wrapper');
  if (!wrapper) return;

  const index = wrapper.querySelectorAll('.hazard-row-card').length + 1;
  const card = document.createElement('div');
  card.className = 'hazard-row-card';
  card.setAttribute('data-idx', index);

  card.innerHTML = `
    <div class="hazard-row-header">
      <span class="hazard-row-num">Hazard Analysis Block #${index}</span>
      <button type="button" class="btn btn-danger" style="padding:4px 8px; font-size:0.75rem;" onclick="removeHazardRow(this)">
        <i class="fas fa-trash"></i> Remove
      </button>
    </div>
    <div class="form-grid" style="grid-template-columns: repeat(3, 1fr);">
      <div class="form-group">
        <label>Job Step Description</label>
        <input type="text" class="h_step" value="${data ? data.step : ''}" required placeholder="e.g. Scaffolding erection">
      </div>
      <div class="form-group">
        <label>Identified Hazard</label>
        <input type="text" class="h_hazard" value="${data ? data.hazard : ''}" required placeholder="e.g. Falling materials, structural collapse">
      </div>
      <div class="form-group">
        <label>Potential Consequence</label>
        <input type="text" class="h_consequence" value="${data ? data.consequence : ''}" required placeholder="e.g. Bone fracture, fatality">
      </div>
    </div>

    <!-- Calculations: Initial Risk -->
    <div class="form-grid" style="grid-template-columns: repeat(3, 1fr); margin-top:10px; background:rgba(255,255,255,0.01); padding:10px; border-radius:6px;">
      <div class="form-group">
        <label>Initial Likelihood (1-5)</label>
        <select class="h_initialL" onchange="calcCardRisk(${index})">
          ${[1,2,3,4,5].map(n => `<option value="${n}" ${data && data.initialL == n ? 'selected' : ''}>${n}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label>Initial Severity (1-5)</label>
        <select class="h_initialS" onchange="calcCardRisk(${index})">
          ${[1,2,3,4,5].map(n => `<option value="${n}" ${data && data.initialS == n ? 'selected' : ''}>${n}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label>Calculated Initial Risk Score</label>
        <div class="calc-output-box" style="margin-top:6px;">
          <span class="h_initialR_badge">${getRiskBadge(data ? data.initialR : 1)}</span>
        </div>
      </div>
    </div>

    <!-- Mitigation measures -->
    <div class="form-grid" style="grid-template-columns: 2fr 1fr; margin-top:10px;">
      <div class="form-group">
        <label>Control / Mitigating Measures</label>
        <textarea class="h_controls" required placeholder="e.g. Harness double-lanyards hooked, safety netting underneath, toe-boards setup">${data ? data.controls : ''}</textarea>
      </div>
      <div class="form-group">
        <label>Action / Assignee Party</label>
        <input type="text" class="h_actionParty" value="${data ? data.actionParty : ''}" required placeholder="e.g. Scaffolding Foreman">
      </div>
    </div>

    <!-- Calculations: Residual Risk -->
    <div class="form-grid" style="grid-template-columns: repeat(3, 1fr); margin-top:10px; background:rgba(16,185,129,0.02); padding:10px; border-radius:6px;">
      <div class="form-group">
        <label>Residual Likelihood (1-5)</label>
        <select class="h_residualL" onchange="calcCardRisk(${index})">
          ${[1,2,3,4,5].map(n => `<option value="${n}" ${data && data.residualL == n ? 'selected' : ''}>${n}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label>Residual Severity (1-5)</label>
        <select class="h_residualS" onchange="calcCardRisk(${index})">
          ${[1,2,3,4,5].map(n => `<option value="${n}" ${data && data.residualS == n ? 'selected' : ''}>${n}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label>Calculated Residual Risk Score</label>
        <div class="calc-output-box" style="margin-top:6px;">
          <span class="h_residualR_badge">${getRiskBadge(data ? data.residualR : 1)}</span>
        </div>
      </div>
    </div>
  `;

  wrapper.appendChild(card);
  calcCardRisk(index);
}

function removeHazardRow(btn) {
  const card = btn.closest('.hazard-row-card');
  if (card) {
    card.remove();
    // Reindex remaining rows
    const wrapper = document.getElementById('hazards-rows-wrapper');
    const remainingCards = wrapper.querySelectorAll('.hazard-row-card');
    remainingCards.forEach((c, i) => {
      const newIdx = i + 1;
      c.setAttribute('data-idx', newIdx);
      c.querySelector('.hazard-row-num').innerText = `Hazard Analysis Block #${newIdx}`;
    });
  }
}

// Live Card score calculations
function calcCardRisk(idx) {
  const card = document.querySelector(`.hazard-row-card[data-idx="${idx}"]`);
  if (!card) return;

  const initL = parseInt(card.querySelector('.h_initialL').value, 10);
  const initS = parseInt(card.querySelector('.h_initialS').value, 10);
  const initR = initL * initS;
  card.querySelector('.h_initialR_badge').innerHTML = getRiskBadge(initR);

  const resL = parseInt(card.querySelector('.h_residualL').value, 10);
  const resS = parseInt(card.querySelector('.h_residualS').value, 10);
  const resR = resL * resS;
  card.querySelector('.h_residualR_badge').innerHTML = getRiskBadge(resR);
}

async function saveRiskAssessment(event, editId = null) {
  event.preventDefault();
  
  const activity = document.getElementById('ra_activity').value;
  const date = document.getElementById('ra_date').value;
  const assessor = document.getElementById('ra_assessor').value;
  const site = document.getElementById('ra_site').value;

  // Build hazards rows array from DOM
  const hazardRows = [];
  document.querySelectorAll('.hazard-row-card').forEach((card, i) => {
    const initL = parseInt(card.querySelector('.h_initialL').value, 10);
    const initS = parseInt(card.querySelector('.h_initialS').value, 10);
    const resL = parseInt(card.querySelector('.h_residualL').value, 10);
    const resS = parseInt(card.querySelector('.h_residualS').value, 10);

    hazardRows.push({
      id: i + 1,
      step: card.querySelector('.h_step').value,
      hazard: card.querySelector('.h_hazard').value,
      consequence: card.querySelector('.h_consequence').value,
      initialL: initL,
      initialS: initS,
      initialR: initL * initS,
      controls: card.querySelector('.h_controls').value,
      residualL: resL,
      residualS: resS,
      residualR: resL * resS,
      actionParty: card.querySelector('.h_actionParty').value
    });
  });

  if (hazardRows.length === 0) {
    alert("Please add at least one Hazard Row to complete risk assessment");
    return;
  }

  const payload = { activity, date, assessor, site, hazards: hazardRows };

  try {
    let res;
    if (editId) {
      res = await fetch(`/api/risk-assessments/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } else {
      res = await fetch('/api/risk-assessments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }

    if (!res.ok) throw new Error(await res.text());
    
    await loadAllData();
    navigate('risk-assessments');
  } catch (err) {
    alert("Error saving risk assessment data: " + err.message);
  }
}

async function editRisk(id) {
  const ra = hseData.riskAssessments.find(item => item.id === id);
  if (!ra) return;

  const container = document.getElementById('risk-assessments-section');
  container.innerHTML = renderRiskAssessmentBuilder(ra);
  
  // Clear any default rows and inject existing cards
  const wrapper = document.getElementById('hazards-rows-wrapper');
  wrapper.innerHTML = '';
  ra.hazards.forEach(hazardItem => {
    addHazardRow(hazardItem);
  });
}

async function deleteRisk(id) {
  if (!confirm("Are you sure you want to delete this risk assessment database record?")) return;
  try {
    const res = await fetch(`/api/risk-assessments/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error("Delete failed");
    await loadAllData();
    navigate('risk-assessments');
  } catch (err) {
    alert(err.message);
  }
}

function viewPrintRisk(id) {
  const ra = hseData.riskAssessments.find(item => item.id === id);
  if (!ra) return;

  const container = document.getElementById('risk-assessments-section');
  // Pass calculation outputs
  container.innerHTML = renderPrintableRiskAssessment(ra, ra.hazards);
}


// ==========================================
// REPORT PRESETS AND GENERATOR
// ==========================================
function presetReportDates(preset) {
  const sDate = document.getElementById('rep_startDate');
  const eDate = document.getElementById('rep_endDate');
  if (!sDate || !eDate) return;

  const today = new Date();
  const todayStr = toLocalDateInputValue(today);
  
  if (preset === 'day') {
    sDate.value = todayStr;
    eDate.value = todayStr;
  } else if (preset === 'week') {
    const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    // Go to Sunday or Monday
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Monday
    startOfWeek.setDate(diff);
    sDate.value = toLocalDateInputValue(startOfWeek);
    eDate.value = todayStr;
  } else if (preset === 'month') {
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    sDate.value = toLocalDateInputValue(firstDay);
    eDate.value = todayStr;
  }
}

async function generatePeriodReport() {
  const startDate = document.getElementById('rep_startDate').value;
  const endDate = document.getElementById('rep_endDate').value;
  if (!startDate || !endDate) {
    alert("Please select both Start Date and End Date");
    return;
  }

  try {
    const res = await fetch(`/api/reports/summary?startDate=${startDate}&endDate=${endDate}`);
    if (!res.ok) throw new Error("Failed to generate report on the server");
    
    const summaryData = await res.json();
    document.getElementById('reportOutputContainer').innerHTML = renderGeneratedReport(summaryData);
  } catch (err) {
    alert(err.message);
  }
}

// ==========================================
// SAFETY MEMOS AND REQUESTS OPERATIONS
// ==========================================
async function submitMemoForm(event) {
  event.preventDefault();
  const type = document.getElementById('memo_type').value;
  const date = document.getElementById('memo_date').value;
  const targetType = document.getElementById('memo_target_type').value;
  const targetName = document.getElementById('memo_target_name').value;
  const subject = document.getElementById('memo_subject').value;
  const description = document.getElementById('memo_description').value;

  try {
    const response = await fetch('/api/memos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, date, targetType, targetName, subject, description })
    });

    if (!response.ok) throw new Error("Failed to save memo on the server");

    const newMemo = await response.json();
    
    // Add to cached cache
    hseData.memos.push(newMemo);

    // Reset and close form
    closeModal('memoModal');
    document.getElementById('memoModal').querySelector('form').reset();
    toggleMemoTargetPlaceholder(); // reset labels

    // Reload active view
    if (currentSection === 'memos') {
      renderView('memos');
    } else if (currentSection === 'admin') {
      loadAdminData();
    }

    // Instantly trigger printing view
    printMemoRecord(newMemo.id);

  } catch (err) {
    console.error("Memo save failure:", err);
    alert(err.message);
  }
}

function printMemoRecord(id) {
  const memo = hseData.memos.find(m => String(m.id) === String(id));
  if (!memo) {
    alert("Safety memo record not found!");
    return;
  }

  const printArea = document.getElementById('memo-print-area');
  if (printArea) {
    printArea.innerHTML = renderMemoPrintSheet(memo);
    
    // Add print indicators to DOM
    document.body.classList.add('printing-memo');
    printArea.classList.remove('no-print');
    
    // Delay print dialog slightly to let browser update layout and flush css classes
    setTimeout(() => {
      window.print();
      
      // Revert states once print dialog completes
      document.body.classList.remove('printing-memo');
      printArea.classList.add('no-print');
    }, 150);
  }
}

async function deleteMemoRecord(id) {
  if (!confirm("Are you sure you want to delete this memo? \nهل أنت متأكد من حذف هذه المذكرة؟")) return;
  try {
    const response = await fetch(`/api/memos/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error("Failed to delete memo record on server");

    hseData.memos = hseData.memos.filter(m => String(m.id) !== String(id));

    if (currentSection === 'memos') {
      renderView('memos');
    } else if (currentSection === 'admin') {
      loadAdminData();
    }
  } catch (err) {
    console.error("Memo delete failure:", err);
    alert(err.message);
  }
}

function toggleMemoTargetPlaceholder() {
  const targetType = document.getElementById('memo_target_type').value;
  const labelEl = document.getElementById('memo_target_label');
  const inputEl = document.getElementById('memo_target_name');
  if (!labelEl || !inputEl) return;

  if (targetType === 'Person') {
    labelEl.textContent = "Person Name / الاسم *";
    inputEl.placeholder = "e.g. John Doe";
  } else {
    labelEl.textContent = "Worksite Location / الموقع *";
    inputEl.placeholder = "e.g. Sector-4 Scaffold";
  }
}

function switchToManagerPlatform() {
  localStorage.setItem('hse_login_type', 'manager');
  navigate('admin');
}

function switchToWorkPlatform() {
  localStorage.setItem('hse_login_type', 'work');
  navigate('dashboard');
}

// Language and Translation Controllers
function toggleLanguage() {
  const currentLang = localStorage.getItem('hse_lang') || 'en';
  const newLang = currentLang === 'en' ? 'ar' : 'en';
  localStorage.setItem('hse_lang', newLang);
  translateUI();
}

function translateUI() {
  const lang = localStorage.getItem('hse_lang') || 'en';
  const isAr = lang === 'ar';
  
  // Set HTML dir and lang attributes
  document.documentElement.dir = isAr ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;
  
  if (isAr) {
    document.body.classList.add('rtl-layout');
  } else {
    document.body.classList.remove('rtl-layout');
  }

  // Update language button text
  const langBtnText = document.getElementById('lang-btn-text');
  if (langBtnText) {
    langBtnText.textContent = isAr ? 'English' : 'عربي';
  }

  // Update header admin button text
  const headerAdminBtnText = document.getElementById('header-admin-btn-text');
  if (headerAdminBtnText) {
    headerAdminBtnText.textContent = isAr ? 'لوحة المدير' : 'Manager Portal';
  }

  // Translate sidebar nav items
  document.querySelectorAll('.nav-item').forEach(item => {
    const span = item.querySelector('span');
    if (!span) return;
    
    const onclickStr = item.getAttribute('onclick') || '';
    const match = onclickStr.match(/navigate\('([^']+)'\)/);
    if (match && match[1]) {
      const key = match[1];
      span.textContent = _t(key);
    }
  });

  // Translate Sidebar Headers / Group Titles
  document.querySelectorAll('.nav-group-header .group-title span').forEach(span => {
    const text = span.textContent || '';
    if (text.includes('السجلات') || text.includes('Registers')) {
      span.textContent = isAr ? '1- السجلات' : '1- Registers';
    } else if (text.includes('القوائم') || text.includes('Checklists')) {
      span.textContent = isAr ? '2- القوائم' : '2- Checklists';
    } else if (text.includes('الخطط') || text.includes('Plans')) {
      span.textContent = isAr ? '3- الخطط' : '3- Plans';
    }
  });

  // Update theme switcher button text
  const themeText = document.getElementById('theme-btn-text');
  const themeBtn = document.getElementById('sidebar-theme-btn');
  if (themeText) {
    const currentTheme = localStorage.getItem('hse_theme') || 'dark';
    if (currentTheme === 'light') {
      themeText.textContent = isAr ? 'الوضع الليلى' : 'Dark Mode';
      if (themeBtn) {
        themeBtn.querySelector('i').className = 'fas fa-moon';
      }
    } else {
      themeText.textContent = isAr ? 'الوضع النهارى' : 'Light Mode';
      if (themeBtn) {
        themeBtn.querySelector('i').className = 'fas fa-sun';
      }
    }
  }

  // Translate active SPA view if logged in
  if (currentUser) {
    if (typeof applyPlatformSeparation === 'function') {
      applyPlatformSeparation();
    }
    renderView(currentSection);
  } else {
    // Re-render login overlay in correct language
    const loginContainer = document.getElementById('login-container');
    if (loginContainer && loginContainer.innerHTML !== '') {
      const typeEl = document.getElementById('login-type');
      const activeTab = typeEl ? typeEl.value : 'work';
      loginContainer.innerHTML = renderLoginOverlay(activeTab);
    }
  }
}

// Light & Dark Themes Controllers
function toggleTheme() {
  const currentTheme = localStorage.getItem('hse_theme') || 'dark';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('hse_theme', newTheme);
  applyTheme();
  translateUI();
}

// Apply theme to document body
function applyTheme() {
  const theme = localStorage.getItem('hse_theme') || 'dark';
  if (theme === 'light') {
    document.body.classList.add('light-theme');
  } else {
    document.body.classList.remove('light-theme');
  }
}

// Mobile sidebar sliding drawer toggle
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    sidebar.classList.toggle('open');
  }
}

// Switch Login Gateways
function switchLoginTab(tab) {
  const container = document.getElementById('login-container');
  if (container) {
    container.innerHTML = renderLoginOverlay(tab);
  }
}

// Isolates Manager Panel sidebar items from Work Platform sidebar items
function applyPlatformSeparation() {
  const loginType = localStorage.getItem('hse_login_type') || 'work';
  const isAdmin = currentUser && currentUser.role === 'admin';
  const sidebar = document.querySelector('.sidebar');
  
  if (!sidebar) return;

  const navItems = sidebar.querySelectorAll('.nav-menu > li, .nav-menu > ul');
  const headerAdminBtn = document.getElementById('header-admin-btn');
  
  // Show header switcher button ONLY if user is admin and is currently in Work mode
  if (headerAdminBtn) {
    if (isAdmin && loginType === 'work') {
      headerAdminBtn.style.display = 'inline-flex';
    } else {
      headerAdminBtn.style.display = 'none';
    }
  }

  if (isAdmin && loginType === 'manager') {
    // Manager Platform Mode: Hide all standard sidebar menus
    navItems.forEach(item => {
      item.style.display = 'none';
    });
  } else {
    // Standard Work Platform Mode: Show all standard menus
    navItems.forEach(item => {
      // Revert display back to standard stylesheet settings
      if (item.tagName.toLowerCase() === 'ul' && item.classList.contains('nav-sub-menu')) {
        item.style.display = '';
      } else {
        item.style.display = 'flex';
      }
    });
  }
}

window.toggleLanguage = toggleLanguage;
window.toggleTheme = toggleTheme;
window.toggleSidebar = toggleSidebar;
window.switchLoginTab = switchLoginTab;
window.switchToManagerPlatform = switchToManagerPlatform;
window.switchToWorkPlatform = switchToWorkPlatform;
window.applyPlatformSeparation = applyPlatformSeparation;
