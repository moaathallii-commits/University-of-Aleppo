<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>جامعة حلب - الهندسة الإلكترونية | محاكي الدوائر v7.0 (الموسوعة الهندسية + محرك الصوتيات)</title>
  <meta name="theme-color" content="#0f172a">
  <link rel="manifest" href="./manifest.json">
  <link rel="apple-touch-icon" href="./1000233248.jpg">
  <style>
    :root {
      --bg-dark: #0f172a;
      --bg-panel: #1e293b;
      --bg-card: #334155;
      --accent-green: #10b981;
      --accent-cyan: #06b6d4;
      --accent-amber: #f59e0b;
      --accent-red: #ef4444;
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --grid-line: rgba(148, 163, 184, 0.12);
      --border-soft: rgba(255, 255, 255, 0.1);
    }

    body.solarpunk-light {
      --bg-dark: #f4fbf7;
      --bg-panel: #e2f2ea;
      --bg-card: #ffffff;
      --accent-green: #059669;
      --accent-cyan: #0284c7;
      --accent-amber: #d97706;
      --accent-red: #dc2626;
      --text-main: #064e3b;
      --text-muted: #475569;
      --grid-line: rgba(5, 150, 105, 0.14);
      --border-soft: rgba(5, 150, 105, 0.22);
    }

    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    body, html {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-color: var(--bg-dark);
      color: var(--text-main);
      user-select: none;
      -webkit-user-select: none;
      transition: background-color 0.25s, color 0.25s;
    }

    #globalAnnouncementBanner {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 26px;
      background: linear-gradient(90deg, #f59e0b, #10b981);
      color: #020617;
      font-size: 11px;
      font-weight: 700;
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 150;
      padding: 0 10px;
    }

    .top-bar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 56px;
      background: var(--bg-panel);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px;
      border-bottom: 1px solid var(--border-soft);
      z-index: 100;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .brand img {
      width: 38px;
      height: 38px;
      border-radius: 9px;
      border: 1px solid var(--accent-cyan);
      object-fit: cover;
    }

    .brand-title h1 {
      font-size: 13px;
      font-weight: 700;
      color: var(--accent-green);
      line-height: 1.2;
    }

    .brand-title .meta-row {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 10px;
      color: var(--text-muted);
    }

    .conn-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--accent-green);
      display: inline-block;
    }
    .conn-dot.offline {
      background: var(--accent-amber);
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 5px;
      flex-wrap: wrap;
    }

    .btn {
      background: var(--bg-card);
      color: var(--text-main);
      border: 1px solid var(--border-soft);
      padding: 6px 9px;
      border-radius: 8px;
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      transition: all 0.15s ease;
    }

    .btn:active { transform: scale(0.95); }
    .btn-primary { background: linear-gradient(135deg, var(--accent-green), #059669); color: #fff; border: none; }
    .btn-cyan { background: linear-gradient(135deg, var(--accent-cyan), #0284c7); color: #fff; border: none; }
    .btn-danger { background: rgba(239, 68, 68, 0.18); color: #ef4444; border-color: var(--accent-red); }
    .btn-secret {
      background: linear-gradient(135deg, #f59e0b, #b45309);
      color: #fff;
      border: none;
      display: none;
      box-shadow: 0 0 12px rgba(245, 158, 11, 0.5);
    }

    .quick-ribbon {
      position: fixed;
      top: 62px;
      right: 10px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      z-index: 82;
    }

    .ribbon-btn {
      width: 35px;
      height: 35px;
      border-radius: 9px;
      background: var(--bg-panel);
      border: 1px solid var(--border-soft);
      color: var(--text-main);
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,0.25);
    }

    .ribbon-btn.active {
      border-color: var(--accent-cyan);
      background: rgba(6, 182, 212, 0.2);
    }

    #workspace-container {
      position: fixed;
      top: 56px;
      bottom: 106px;
      left: 0;
      right: 0;
      overflow: hidden;
    }

    #circuitCanvas {
      width: 100%;
      height: 100%;
      touch-action: none;
      display: block;
      background-color: var(--bg-dark);
    }

    .scope-panel {
      position: fixed;
      top: 62px;
      left: 10px;
      width: 250px;
      background: var(--bg-panel);
      border: 1px solid var(--accent-cyan);
      border-radius: 12px;
      padding: 8px;
      z-index: 80;
      box-shadow: 0 8px 24px rgba(0,0,0,0.35);
      transition: transform 0.25s ease;
    }

    .scope-panel.collapsed {
      transform: translateX(-220px);
    }

    .scope-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
      color: var(--accent-cyan);
      margin-bottom: 5px;
      font-weight: 700;
    }

    #scopeCanvas {
      width: 100%;
      height: 82px;
      background: #020617;
      border-radius: 6px;
      border: 1px solid rgba(6, 182, 212, 0.3);
    }

    .telemetry-bar {
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      margin-top: 4px;
      color: var(--text-muted);
    }

    .multimeter-widget {
      position: fixed;
      top: 205px;
      left: 10px;
      width: 215px;
      background: var(--bg-panel);
      border: 2px solid var(--accent-amber);
      border-radius: 12px;
      padding: 8px;
      z-index: 81;
      display: none;
      box-shadow: 0 8px 20px rgba(0,0,0,0.4);
    }

    .dmm-screen {
      background: #0f172a;
      color: #34d399;
      font-family: monospace;
      font-size: 12px;
      padding: 6px;
      border-radius: 6px;
      text-align: center;
      margin: 5px 0;
      border: 1px solid rgba(255,255,255,0.1);
      line-height: 1.4;
    }

    .inspector-bar {
      position: fixed;
      bottom: 112px;
      left: 10px;
      right: 10px;
      background: var(--bg-panel);
      border: 1px solid var(--accent-green);
      border-radius: 12px;
      padding: 9px 12px;
      display: none;
      flex-direction: column;
      gap: 7px;
      z-index: 85;
      box-shadow: 0 6px 20px rgba(0,0,0,0.45);
    }

    .inspector-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      flex-wrap: wrap;
    }

    .inspector-bar input[type="number"] {
      width: 82px;
      padding: 4px 6px;
      border-radius: 6px;
      border: 1px solid var(--accent-cyan);
      background: var(--bg-dark);
      color: var(--text-main);
      font-size: 12px;
      text-align: center;
    }

    .inspector-bar input[type="range"] {
      flex: 1;
      accent-color: var(--accent-green);
      cursor: pointer;
    }

    .wire-color-swatch {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      cursor: pointer;
      border: 2px solid transparent;
    }
    .wire-color-swatch.selected {
      border-color: #fff;
      transform: scale(1.15);
    }

    /* الدرج السفلي متعدد التصنيفات للموسوعة الإلكترونية الشاملة (35+ قطعة) */
    .bottom-dock {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: 106px;
      background: var(--bg-panel);
      border-top: 1px solid var(--border-soft);
      display: flex;
      flex-direction: column;
      z-index: 100;
    }

    .category-bar {
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 4px 10px;
      border-bottom: 1px solid var(--border-soft);
      overflow-x: auto;
      height: 36px;
    }

    .cat-tab {
      background: var(--bg-dark);
      color: var(--text-muted);
      border: 1px solid var(--border-soft);
      padding: 3px 10px;
      border-radius: 99px;
      font-size: 11px;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.15s;
    }

    .cat-tab.active {
      background: var(--accent-cyan);
      color: #fff;
      border-color: var(--accent-cyan);
    }

    .bottom-toolbar {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 7px;
      padding: 0 10px;
      overflow-x: auto;
    }

    .tool-item {
      min-width: 68px;
      height: 56px;
      background: var(--bg-card);
      border: 1px solid var(--border-soft);
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      color: var(--text-main);
      cursor: pointer;
      flex-shrink: 0;
      padding: 2px 5px;
      text-align: center;
    }

    .tool-item.active {
      border-color: var(--accent-green);
      background: rgba(16, 185, 129, 0.2);
      color: var(--accent-green);
    }

    .tool-item span.icon {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 2px;
    }

    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(2, 6, 23, 0.85);
      backdrop-filter: blur(6px);
      display: none;
      align-items: center;
      justify-content: center;
      padding: 14px;
      z-index: 200;
    }

    .modal-overlay.active { display: flex; }

    .modal-card {
      background: var(--bg-panel);
      border: 1px solid var(--border-soft);
      border-radius: 16px;
      width: 100%;
      max-width: 560px;
      max-height: 90vh;
      overflow-y: auto;
      padding: 18px;
      position: relative;
      box-shadow: 0 20px 50px rgba(0,0,0,0.6);
    }

    .modal-card.fullscreen-admin {
      max-width: 98vw;
      width: 98vw;
      height: 94vh;
      max-height: 94vh;
      display: flex;
      flex-direction: column;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid var(--border-soft);
    }

    .form-group { margin-bottom: 12px; }
    .form-group label { display: block; font-size: 12px; margin-bottom: 4px; color: var(--text-muted); }
    .form-control {
      width: 100%;
      padding: 9px 11px;
      background: var(--bg-dark);
      border: 1px solid var(--border-soft);
      border-radius: 8px;
      color: var(--text-main);
      font-size: 13px;
    }

    .project-card {
      background: var(--bg-dark);
      border: 1px solid var(--border-soft);
      border-radius: 10px;
      padding: 10px;
      margin-bottom: 8px;
    }

    .badge {
      padding: 2px 7px;
      border-radius: 99px;
      font-size: 10px;
      font-weight: bold;
    }
    .badge-public { background: rgba(16, 185, 129, 0.2); color: #10b981; }
    .badge-private { background: rgba(148, 163, 184, 0.2); color: var(--text-muted); }

    .admin-tabs {
      display: flex;
      gap: 6px;
      margin-bottom: 12px;
      overflow-x: auto;
      padding-bottom: 4px;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
      gap: 8px;
      margin-bottom: 12px;
    }

    .stat-box {
      background: var(--bg-dark);
      border: 1px solid rgba(6, 182, 212, 0.25);
      border-radius: 10px;
      padding: 8px;
      text-align: center;
    }
    .stat-box .num { font-size: 18px; font-weight: 800; color: var(--accent-cyan); }
    .stat-box .lbl { font-size: 10px; color: var(--text-muted); }

    .cyber-watermark {
      position: absolute;
      bottom: 12px;
      left: 12px;
      opacity: 0.14;
      pointer-events: none;
      width: 110px;
      height: 110px;
    }

    #toastBox {
      position: fixed;
      top: 64px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--bg-panel);
      color: var(--text-main);
      border-right: 4px solid var(--accent-green);
      padding: 10px 16px;
      border-radius: 8px;
      font-size: 12px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.5);
      z-index: 300;
      display: none;
    }
  </style>
</head>
<body>

  <!-- شريط الإعلانات العامة السحابي -->
  <div id="globalAnnouncementBanner"></div>

  <!-- تنبيه عائم -->
  <div id="toastBox"></div>

  <!-- الشريط العلوي -->
  <header class="top-bar" id="topBar">
    <div class="brand">
      <img src="./1000233248.jpg" alt="شعار جامعة حلب" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 fill=%22%230f172a%22/><circle cx=%2250%22 cy=%2250%22 r=%2235%22 stroke=%22%2310b981%22 stroke-width=%224%22 fill=%22none%22/></svg>'">
      <div class="brand-title">
        <h1>جامعة حلب - الهندسة الإلكترونية</h1>
        <div class="meta-row">
          <span class="conn-dot" id="connDot"></span>
          <span id="connText">متصل</span>
          <span>|</span>
          <span id="studentHeaderBadge">غير مسجل</span>
          <span id="forkAttributionBadge" style="color:var(--accent-amber); font-weight:bold;"></span>
        </div>
      </div>
    </div>

    <div class="nav-actions">
      <button id="secretRoomBtn" class="btn btn-secret" onclick="playSFX('tap'); openModal('secretRoomModal')">★ الغرفة السرية</button>
      <button class="btn" onclick="playSFX('tap'); openModal('templatesModal')">قوالب جاهزة</button>
      <button class="btn btn-cyan" onclick="playSFX('tap'); openRepositoryModal()">المستودع والبحث</button>
      <button class="btn btn-primary" onclick="playSFX('tap'); openSaveProjectModal()">حفظ</button>
      <button id="simToggleBtn" class="btn" onclick="toggleSimulation()">▶ تشغيل</button>
    </div>
  </header>

  <!-- راسم الإشارة العائم (Mini-Oscilloscope) -->
  <div class="scope-panel" id="scopePanel">
    <div class="scope-header">
      <span>راسم الإشارة اللحظي (True MNA v7)</span>
      <button class="btn" style="padding:2px 6px; font-size:10px;" onclick="playSFX('tap'); document.getElementById('scopePanel').classList.toggle('collapsed')">طي/فتح</button>
    </div>
    <canvas id="scopeCanvas" width="230" height="82"></canvas>
    <div class="telemetry-bar">
      <span id="maxVoltReadout">أعلى جهد: 0.00V</span>
      <span id="simStatusReadout" style="color:var(--accent-green);">جاهز</span>
    </div>
  </div>

  <!-- أداة المقياس المتعدد اللحظي و RMS (Live DMM) -->
  <div class="multimeter-widget" id="multimeterWidget">
    <div style="display:flex; justify-content:space-between; align-items:center; font-size:11px; color:var(--accent-amber); font-weight:bold;">
      <span>📟 المقياس المتعدد اللحظي (DMM)</span>
      <button class="btn" style="padding:1px 5px; font-size:10px;" onclick="toggleMultimeter()">✖</button>
    </div>
    <div class="dmm-screen" id="dmmScreen">ΔV(inst) = 0.000 V<br>V(RMS) = 0.000 V</div>
    <div style="font-size:10px; color:var(--text-muted); text-align:center;">
      المس أي عقدتين لقراءة الجهد اللحظي والفعال بالوقت الفعلي
    </div>
  </div>

  <!-- شريط الأدوات الجانبي السريع للطالب (مع زر كتم/تفعيل الصوتيات البرمجية 🔊) -->
  <aside class="quick-ribbon">
    <button class="ribbon-btn active" id="soundToggleBtn" title="تفعيل/كتم المؤثرات الصوتية (Web Audio SFX)" onclick="toggleSoundEngine()">🔊</button>
    <button class="ribbon-btn" title="تراجع (Undo)" onclick="undoAction()">↶</button>
    <button class="ribbon-btn" title="إعادة (Redo)" onclick="redoAction()">↷</button>
    <button class="ribbon-btn" title="تدوير العنصر 360° (Rotate 90°)" onclick="rotateSelectedComponent()">↻</button>
    <button class="ribbon-btn" title="تكبير (+)" onclick="zoomWorkspace(0.15)">＋</button>
    <button class="ribbon-btn" title="تصغير (-)" onclick="zoomWorkspace(-0.15)">－</button>
    <button class="ribbon-btn" title="إعادة ضبط الرؤية" onclick="resetViewport()">🎯</button>
    <button class="ribbon-btn" id="dmmRibbonBtn" title="المقياس المتعدد اللحظي (DMM)" onclick="toggleMultimeter()">📟</button>
    <button class="ribbon-btn" id="gridRibbonBtn" title="إظهار/إخفاء الشبكة" onclick="toggleGridDisplay()">▦</button>
    <button class="ribbon-btn" title="الوضع الفاتح Solarpunk / الداكن" onclick="toggleSolarpunkTheme()">☀️</button>
    <button class="ribbon-btn" title="تصدير صورة التقرير (PNG)" onclick="exportCircuitImage()">📸</button>
  </aside>

  <!-- مساحة العمل (Canvas) -->
  <main id="workspace-container">
    <canvas id="circuitCanvas"></canvas>
  </main>

  <!-- شريط فحص وتعديل العنصر المحدد مع ميزة المعاينة الواقعية للقطعة -->
  <div class="inspector-bar" id="inspectorBar">
    <div class="inspector-row">
      <div style="display:flex; align-items:center; gap:8px;">
        <div id="inspRealisticIcon" style="width:36px; height:36px; background:#0f172a; border-radius:6px; border:1px solid var(--accent-cyan); display:flex; align-items:center; justify-content:center; font-size:16px;" title="المظهر الواقعي في المخبر">🔌</div>
        <div>
          <strong id="inspCompName" style="color:var(--accent-cyan); font-size:13px;">مقاومة R1</strong>
          <div style="font-size:10px; color:var(--accent-amber);" id="inspRealisticDesc">قطعة كربونية قياسية</div>
          <span id="inspNodeVoltage" style="font-size:11px; color:var(--text-muted);"></span>
        </div>
      </div>
      <div style="display:flex; align-items:center; gap:5px;">
        <label style="font-size:11px;">القيمة:</label>
        <input type="number" id="inspValueInput" step="any" oninput="updateSelectedComponentValue(this.value)">
        <span id="inspUnitLabel" style="font-size:12px; color:var(--accent-green);">Ω</span>
        <button class="btn btn-cyan" onclick="rotateSelectedComponent()">↻ تدوير 90°</button>
        <button class="btn btn-danger" onclick="deleteSelectedComponent()">حذف</button>
      </div>
    </div>
    <div class="inspector-row">
      <span style="font-size:11px; color:var(--text-muted);">تمرير سريع للقيمة:</span>
      <input type="range" id="inspRangeSlider" min="1" max="10000" step="1" oninput="updateSelectedComponentValue(this.value)">
      <div style="display:flex; align-items:center; gap:5px;">
        <span style="font-size:11px; color:var(--text-muted);">لون السلك:</span>
        <div class="wire-color-swatch selected" style="background:#10b981;" onclick="setWireColor('#10b981', this)" title="أخضر قياسي"></div>
        <div class="wire-color-swatch" style="background:#ef4444;" onclick="setWireColor('#ef4444', this)" title="أحمر (موجب VCC)"></div>
        <div class="wire-color-swatch" style="background:#38bdf8;" onclick="setWireColor('#38bdf8', this)" title="أزرق (إشارة)"></div>
        <div class="wire-color-swatch" style="background:#f59e0b;" onclick="setWireColor('#f59e0b', this)" title="ذهبي (قياس)"></div>
        <div class="wire-color-swatch" style="background:#94a3b8;" onclick="setWireColor('#94a3b8', this)" title="رمادي (أرضي GND)"></div>
      </div>
    </div>
  </div>

  <!-- الدرج السفلي المقسم إلى 5 عائلات إلكترونية شاملة (أكثر من 38 قطعة هندسية) -->
  <footer class="bottom-dock">
    <div class="category-bar">
      <button class="cat-tab active" onclick="switchComponentCategory('CAT_SOURCES', this)">⚡ أدوات ومنابع (10)</button>
      <button class="cat-tab" onclick="switchComponentCategory('CAT_PASSIVE', this)">⌇ مقاومات ومكثفات وحساسات (10)</button>
      <button class="cat-tab" onclick="switchComponentCategory('CAT_LEDS', this)">💡 ليدات وديودات وضوئيات (11)</button>
      <button class="cat-tab" onclick="switchComponentCategory('CAT_ACTIVE', this)">🎛️ ترانزستورات ومفاتيح وصوتيات (11)</button>
      <button class="cat-tab" onclick="switchComponentCategory('CAT_LOGIC', this)">🔢 بوابات منطقية وأجهزة قياس (9)</button>
    </div>
    <div class="bottom-toolbar" id="dynamicToolbar"></div>
  </footer>

  <!-- 1. نافذة تسجيل الدخول لأول مرة -->
  <div class="modal-overlay" id="onboardingModal">
    <div class="modal-card">
      <div class="modal-header">
        <h2 style="font-size:17px; color:var(--accent-green);">تسجيل بيانات الطالب - جامعة حلب</h2>
      </div>
      <p style="font-size:13px; color:var(--text-muted); margin-bottom:14px;">
        مرحباً بك في مختبر محاكاة الدوائر الإلكترونية. يُرجى إدخال اسمك الثلاثي ورقمك الجامعي لمرة واحدة فقط لربط مستودع مشاريعك السحابي.
      </p>
      <div class="form-group">
        <label>الاسم الثلاثي (باللغة العربية):</label>
        <input type="text" id="fullNameInput" class="form-control" placeholder="مثال: أحمد محمد الأحمد">
      </div>
      <div class="form-group">
        <label>الرقم الجامعي (6 خانات رقمية):</label>
        <input type="text" id="uniIdInput" class="form-control" placeholder="مثال: 240512" inputmode="numeric">
      </div>
      <div id="onboardingError" style="color:var(--accent-red); font-size:12px; margin-bottom:10px; display:none;"></div>
      <button class="btn btn-primary" style="width:100%; justify-content:center; padding:11px;" onclick="handleOnboardingSubmit()">
        تأكيد الدخول وحفظ الهوية الجامعية
      </button>
    </div>
  </div>

  <!-- 2. نافذة نماذج الدوائر الجاهزة -->
  <div class="modal-overlay" id="templatesModal">
    <div class="modal-card">
      <div class="modal-header">
        <h3 style="font-size:15px; color:var(--accent-green);">نماذج دوائر هندسية قياسية جاهزة</h3>
        <button class="btn" onclick="closeModal('templatesModal')">إغلاق</button>
      </div>
      <div class="project-card">
        <strong>1. مرشح تمرير منخفض (RC Low-Pass Filter)</strong>
        <p style="font-size:11px; color:var(--text-muted); margin:4px 0 8px;">منبع متناوب AC مع مقاومة ومكثف لمشاهدة شحن وتفريغ المكثف وفرق الطور الحقيقي.</p>
        <button class="btn btn-cyan" onclick="loadCircuitTemplate('RC_FILTER')">تحميل الدائرة</button>
      </div>
      <div class="project-card">
        <strong>2. مقوم نصف موجة حقيقي (True Half-Wave Rectifier 0.7V)</strong>
        <p style="font-size:11px; color:var(--text-muted); margin:4px 0 8px;">منبع متناوب مع ديود سيليكوني يقص النصف السالب للموجة تماماً.</p>
        <button class="btn btn-cyan" onclick="loadCircuitTemplate('RECTIFIER')">تحميل الدائرة</button>
      </div>
      <div class="project-card">
        <strong>3. دارة إنذار ضوئي وصوتي بالليد والجرس (LED & Piezo Buzzer Circuit)</strong>
        <p style="font-size:11px; color:var(--text-muted); margin:4px 0 8px;">بطارية 9V مع مفتاح، مقاومة حماية، ليد أحمر متوهج، وجرس بيزو يصدر رنيناً صوتياً عند إغلاق المفتاح.</p>
        <button class="btn btn-cyan" onclick="loadCircuitTemplate('LED_BUZZER')">تحميل الدائرة</button>
      </div>
      <div class="project-card">
        <strong>4. دارة طنين تسلسلية (RLC Series Resonance)</strong>
        <p style="font-size:11px; color:var(--text-muted); margin:4px 0 8px;">منبع متناوب مع مقاومة ووشيعة ومكثف لدراسة الرنين وتبادل الطاقة.</p>
        <button class="btn btn-cyan" onclick="loadCircuitTemplate('RLC_RESONANCE')">تحميل الدائرة</button>
      </div>
    </div>
  </div>

  <!-- 3. نافذة حفظ المشروع -->
  <div class="modal-overlay" id="saveProjectModal">
    <div class="modal-card">
      <div class="modal-header">
        <h3 style="font-size:16px;">حفظ الدائرة في المستودع السحابي</h3>
        <button class="btn" onclick="closeModal('saveProjectModal')">إغلاق</button>
      </div>
      <div class="form-group">
        <label>اسم المشروع / الدائرة:</label>
        <input type="text" id="projectTitleInput" class="form-control" placeholder="مثال: دارة مقوم نصف موجي مع مرشح سعوي">
      </div>
      <div class="form-group" style="display:flex; align-items:center; gap:8px;">
        <input type="checkbox" id="projectPublicToggle" checked style="width:18px; height:18px;">
        <label for="projectPublicToggle" style="margin:0; cursor:pointer;">السماح لباقي الطلاب برؤية ونسخ المشروع (عام)</label>
      </div>
      <button class="btn btn-primary" style="width:100%; justify-content:center; padding:10px;" onclick="saveCurrentProject()">
        حفظ ومزامنة مع السحابة
      </button>
    </div>
  </div>

  <!-- 4. نافذة مستودع المشاريع والبحث الذكي -->
  <div class="modal-overlay" id="repoModal">
    <div class="modal-card">
      <div class="modal-header">
        <h3 style="font-size:16px; color:var(--accent-cyan);">مستودع مشاريع الطلاب والبحث الذكي</h3>
        <button class="btn" onclick="closeModal('repoModal')">إغلاق</button>
      </div>
      <div class="form-group">
        <input type="text" id="smartSearchInput" class="form-control" placeholder="ابحث باسم المشروع أو اسم الطالب أو الرقم الجامعي..." oninput="renderRepositoryList()">
      </div>
      <div id="repoProjectsList" style="max-height:58vh; overflow-y:auto;"></div>
    </div>
  </div>

  <!-- 5. نافذة الغرفة السرية بملء الشاشة -->
  <div class="modal-overlay" id="secretRoomModal">
    <div class="modal-card fullscreen-admin" style="border-color:var(--accent-amber);">
      <svg class="cyber-watermark" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <path d="M60 100 L60 45 M60 75 L35 50 M60 65 L85 40 M60 50 L45 30 M60 50 L75 30" stroke="#10b981" stroke-width="3" fill="none"/>
        <circle cx="35" cy="50" r="4" fill="#06b6d4"/>
        <circle cx="85" cy="40" r="4" fill="#06b6d4"/>
        <circle cx="45" cy="30" r="4" fill="#10b981"/>
        <circle cx="75" cy="30" r="4" fill="#10b981"/>
        <text x="42" y="114" fill="#f59e0b" font-size="14" font-weight="bold">319</text>
      </svg>

      <div class="modal-header">
        <div>
          <h3 style="font-size:16px; color:var(--accent-amber);">★ غرفة القيادة السرية - الإدارة الهندسية الشاملة</h3>
          <span style="font-size:11px; color:var(--text-muted);">المسؤول: معاذ حسين العلي (1461997)</span>
        </div>
        <div style="display:flex; gap:6px; flex-wrap:wrap;">
          <button class="btn btn-cyan" onclick="exportStudentsToCSV()">📥 تصدير الطلاب CSV</button>
          <button class="btn" onclick="exportDatabaseBackupJSON()">💾 نسخ احتياطي JSON</button>
          <button class="btn btn-danger" onclick="lockAllProjectsForExams()">🔒 إغلاق شامل للامتحانات</button>
          <button class="btn" onclick="closeModal('secretRoomModal')">إغلاق ✖</button>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-box">
          <div class="num" id="statTotalUsers">0</div>
          <div class="lbl">إجمالي الطلاب</div>
        </div>
        <div class="stat-box">
          <div class="num" id="statTotalProjects">0</div>
          <div class="lbl">إجمالي المشاريع</div>
        </div>
        <div class="stat-box">
          <div class="num" id="statBannedUsers" style="color:var(--accent-red);">0</div>
          <div class="lbl">المحظورون</div>
        </div>
        <div class="stat-box">
          <div class="num" id="statReportsCount" style="color:var(--accent-amber);">0</div>
          <div class="lbl">التبليغات المعلقة</div>
        </div>
        <div class="stat-box">
          <div class="num" id="statQuotaReads" style="color:var(--accent-green);">0.04%</div>
          <div class="lbl">استهلاك Spark اليومي</div>
        </div>
      </div>

      <div style="display:flex; gap:6px; margin-bottom:10px;">
        <input type="text" id="adminAnnouncementInput" class="form-control" style="padding:6px 10px; font-size:12px;" placeholder="اكتب إعلاناً عاماً يُبث سحابياً أعلى شاشة جميع طلاب الكلية...">
        <button class="btn btn-primary" onclick="publishGlobalAnnouncement()">📢 بث الإعلان السحابي</button>
        <button class="btn btn-danger" onclick="clearGlobalAnnouncement()">إخفاء</button>
      </div>

      <div class="admin-tabs">
        <button class="btn btn-cyan" onclick="switchAdminTab('USERS')">👥 سجل الطلاب النشطين</button>
        <button class="btn" onclick="switchAdminTab('BANNED')">🚫 قائمة المحظورين</button>
        <button class="btn" onclick="switchAdminTab('PROJECTS')">📂 محكمة المشاريع والتعليقات</button>
        <button class="btn" onclick="switchAdminTab('REPORTS')">🚩 طابور التبليغات (<span id="tabReportBadge">0</span>)</button>
      </div>

      <div style="display:flex; gap:6px; margin-bottom:10px; flex-wrap:wrap; align-items:center;">
        <input type="text" id="adminSearchInput" class="form-control" style="flex:1; min-width:180px; padding:6px 10px; font-size:12px;" placeholder="بحث إداري بالاسم أو الرقم الجامعي أو اسم المشروع..." oninput="renderSecretRoomDashboard()">
        <select id="adminSortSelect" class="form-control" style="width:150px; padding:6px; font-size:12px;" onchange="renderSecretRoomDashboard()">
          <option value="NEWEST">الترتيب: الأحدث</option>
          <option value="RATING">الترتيب: الأعلى تقييماً</option>
          <option value="COMMENTS">الترتيب: الأكثر تعليقاً</option>
        </select>
        <button class="btn btn-danger" onclick="executeBulkBanSelected()">حظر المحددين ☑</button>
        <button class="btn btn-danger" onclick="executeBulkDeleteSelected()">حذف المحددين ☑</button>
      </div>

      <div id="adminDynamicViewport" style="flex:1; overflow-y:auto; padding-right:4px;"></div>
    </div>
  </div>

  <!-- 6. نافذة معاينة الدائرة قبل الحذف -->
  <div class="modal-overlay" id="adminPreviewModal">
    <div class="modal-card">
      <div class="modal-header">
        <h3 style="font-size:15px; color:var(--accent-cyan);" id="previewModalTitle">معاينة محتوى المشروع</h3>
        <button class="btn" onclick="closeModal('adminPreviewModal')">إغلاق</button>
      </div>
      <div id="previewModalBody" style="font-size:12px; line-height:1.6;"></div>
    </div>
  </div>

  <!-- محرك التطبيق والـ Web Worker والـ Web Audio SFX والـ Firebase -->
  <script type="module">
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
    import { 
      getFirestore, collection, doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, 
      query, where, onSnapshot, enableIndexedDbPersistence 
    } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
    import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

    // ============================================================================
    // 1. محرك الصوتيات التفاعلي البرمجي (Web Audio API ASMR & Lab SFX Engine)
    // ============================================================================
    let soundEnabled = true;
    let audioCtx = null;

    function getAudioContext() {
      if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) audioCtx = new AudioContextClass();
      }
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume().catch(() => {});
      }
      return audioCtx;
    }

    window.toggleSoundEngine = function() {
      soundEnabled = !soundEnabled;
      const btn = document.getElementById('soundToggleBtn');
      btn.innerText = soundEnabled ? '🔊' : '🔇';
      btn.classList.toggle('active', soundEnabled);
      if (soundEnabled) playSFX('tap');
      showToast(soundEnabled ? "تم تفعيل المؤثرات الصوتية المخبرية 🔊" : "تم كتم المؤثرات الصوتية 🔇");
    };

    window.playSFX = function(type) {
      if (!soundEnabled) return;
      const ctxAudio = getAudioContext();
      if (!ctxAudio) return;

      const now = ctxAudio.currentTime;
      const osc = ctxAudio.createOscillator();
      const gain = ctxAudio.createGain();
      osc.connect(gain);
      gain.connect(ctxAudio.destination);

      if (type === 'tap') {
        // نقرة واجهة ناعمة جداً (UI Micro-click)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(220, now + 0.03);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
        osc.start(now);
        osc.stop(now + 0.03);
      } else if (type === 'drop') {
        // صوت إفلات مغناطيسي للقطعة الإلكترونية على الشبكة
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(280, now);
        osc.frequency.exponentialRampToValueAtTime(580, now + 0.065);
        gain.gain.setValueAtTime(0.14, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.065);
        osc.start(now);
        osc.stop(now + 0.065);
      } else if (type === 'wire') {
        // صوت التحام السلك بالقطب (Crisp Spark Snap)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(750, now);
        osc.frequency.exponentialRampToValueAtTime(1180, now + 0.05);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'switch') {
        // طقطقة ميكانيكية للمفتاح أو الريليه
        osc.type = 'square';
        osc.frequency.setValueAtTime(420, now);
        osc.frequency.setValueAtTime(640, now + 0.02);
        gain.gain.setValueAtTime(0.09, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
        osc.start(now);
        osc.stop(now + 0.045);
      } else if (type === 'rotate') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(520, now + 0.04);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
      } else if (type === 'delete') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(340, now);
        osc.frequency.exponentialRampToValueAtTime(110, now + 0.08);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'buzzer_beep') {
        // رنين الجرس الإلكتروني Piezo Buzzer عند مرور تيار فيه أثناء المحاكاة
        osc.type = 'square';
        osc.frequency.setValueAtTime(2200, now);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.055);
        osc.start(now);
        osc.stop(now + 0.055);
      } else if (type === 'error') {
        // صوت إنذار القصر الكهربائي أو انصهار الفيوز
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(155, now);
        osc.frequency.setValueAtTime(115, now + 0.11);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.26);
        osc.start(now);
        osc.stop(now + 0.26);
      }
    };

    // ============================================================================
    // 2. موسوعة القطع الإلكترونية الشاملة (38+ أداة وقطعة هندسية مصنفة في 5 عائلات)
    // ============================================================================
    const COMPONENT_CATALOG = {
      CAT_SOURCES: [
        { tool: 'SELECT', icon: '✥', label: 'تحريك/تحديد' },
        { tool: 'PAN', icon: '✋', label: 'تحريك الشاشة' },
        { tool: 'WIRE', icon: '╱', label: 'سلك توصيل' },
        { tool: 'GND', icon: '⏚', label: 'تأريض GND' },
        { tool: 'DC_SOURCE', icon: '⎓', label: 'منبع DC', defVal: 5, unit: 'V', sym: 'DC', rIcon: '⚡', rDesc: 'منبع تغذية مستمر مخبري (DC Power Supply)' },
        { tool: 'BATTERY_9V', icon: '🔋', label: 'بطارية 9V', defVal: 9, unit: 'V', sym: 'BAT', rIcon: '🔋', rDesc: 'بطارية قلوية قياسية 9 فولت (9V Alkaline Battery)' },
        { tool: 'AC_SOURCE', icon: '∿', label: 'منبع متناوب AC', defVal: 10, unit: 'V', sym: 'AC', rIcon: '〰️', rDesc: 'مولد إشارات جيبية (AC Function Generator)' },
        { tool: 'SQUARE_SOURCE', icon: '⊓⊔', label: 'موجة مربعة PWM', defVal: 5, unit: 'V', sym: 'SQR', rIcon: '📟', rDesc: 'مولد نبضات مربعة وميقاتية (Square Wave Clock)' },
        { tool: 'PULSE_SOURCE', icon: ' pulse', label: 'منبع نبضي Pulse', defVal: 5, unit: 'V', sym: 'PLS', rIcon: '⚡', rDesc: 'مولد نبضات سريعة (Pulse Generator)' },
        { tool: 'CURRENT_SOURCE', icon: 'up', label: 'منبع تيار I', defVal: 0.02, unit: 'A', sym: 'I_SRC', rIcon: '🔄', rDesc: 'منبع تيار مستمر ثابت (Constant Current Source)' }
      ],
      CAT_PASSIVE: [
        { tool: 'RESISTOR', icon: '⌇', label: 'مقاومة ثابتة R', defVal: 1000, unit: 'Ω', sym: 'R', rIcon: '🟫', rDesc: 'مقاومة كربونية حلقية (Axial Carbon Resistor)' },
        { tool: 'POT', icon: '🎛️', label: 'مقاومة متغيرة Pot', defVal: 5000, unit: 'Ω', sym: 'POT', rIcon: '🎛️', rDesc: 'بوتنشومتر دوار ثلاثي الأطراف (Rotary Potentiometer)' },
        { tool: 'LDR', icon: '☀️⌇', label: 'مقاومة ضوئية LDR', defVal: 2500, unit: 'Ω', sym: 'LDR', rIcon: '☀️', rDesc: 'حساس شدة إضاءة كبريتيد الكادميوم (Photoresistor LDR)' },
        { tool: 'THERMISTOR', icon: '🌡️⌇', label: 'حساس حرارة NTC', defVal: 10000, unit: 'Ω', sym: 'NTC', rIcon: '🌡️', rDesc: 'مقاومة حرارية ذات معامل سالب (NTC Thermistor)' },
        { tool: 'CAPACITOR', icon: '⊣⊢', label: 'مكثف سيراميكي C', defVal: 0.0001, unit: 'F', sym: 'C', rIcon: '🟠', rDesc: 'مكثف عدسي سيراميكي غير مستقطب (Ceramic Disc Cap)' },
        { tool: 'ELEC_CAP', icon: '⊣(⊢', label: 'مكثف كيميائي +C', defVal: 0.001, unit: 'F', sym: 'C_EL', rIcon: '🛢️', rDesc: 'مكثف كيميائي ألمنيوم مستقطب (Electrolytic Capacitor)' },
        { tool: 'INDUCTOR', icon: '➿', label: 'وشيعة / ملف L', defVal: 0.2, unit: 'H', sym: 'L', rIcon: '🌀', rDesc: 'وشيعة قلب فيريت سلكية (Ferrite Core Inductor)' },
        { tool: 'TRANSFORMER', icon: '⌇||⌇', label: 'محولة كهربائية', defVal: 220, unit: 'Ω', sym: 'TR', rIcon: '🧱', rDesc: 'محولة خافضة للجهد بقلب حديدي (Step-Down Transformer)' },
        { tool: 'FUSE', icon: 'infty', label: 'صمامة حماية Fuse', defVal: 0.5, unit: 'A', sym: 'FUSE', rIcon: '🧪', rDesc: 'فيوز زجاجي لحماية الدارة من التيار الزائد (Glass Fuse)' },
        { tool: 'CRYSTAL', icon: '▭|▭', label: 'كريستالة كوارتز', defVal: 16, unit: 'MHz', sym: 'XTAL', rIcon: '🪙', rDesc: 'مهتز كريستالي لتوليد الترددات الدقيقة (Quartz Crystal)' }
      ],
      CAT_LEDS: [
        { tool: 'DIODE', icon: '⊳|', label: 'ديود سيليكون 1N4007', defVal: 0.7, unit: 'V', sym: 'D', rIcon: '⚫', rDesc: 'ديود تقويم سيليكوني قياسي (1N4007 Rectifier Diode)' },
        { tool: 'SCHOTTKY', icon: '⊳∫', label: 'ديود شوتكي سريع', defVal: 0.3, unit: 'V', sym: 'D_SCH', rIcon: '⚫', rDesc: 'ديود شوتكي ذو هبوط جهد منخفض 0.3V (Schottky Diode)' },
        { tool: 'ZENER', icon: '⊳◂', label: 'ديود زينر 5.1V', defVal: 5.1, unit: 'V', sym: 'DZ', rIcon: '🟠', rDesc: 'ديود زينر زجاجي لتثبيت وتنظيم الجهد (Zener Regulator)' },
        { tool: 'LED_RED', icon: '🔴', label: 'ليد أحمر Red', defVal: 2.0, unit: 'V', sym: 'LED_R', glow: '#ef4444', rIcon: '🔴', rDesc: 'ثنائي باعث للضوء الأحمر 5mm (Red LED Vf=2.0V)' },
        { tool: 'LED_GREEN', icon: '🟢', label: 'ليد أخضر Green', defVal: 2.1, unit: 'V', sym: 'LED_G', glow: '#10b981', rIcon: '🟢', rDesc: 'ثنائي باعث للضوء الأخضر 5mm (Green LED Vf=2.1V)' },
        { tool: 'LED_BLUE', icon: '🔵', label: 'ليد أزرق Blue', defVal: 2.8, unit: 'V', sym: 'LED_B', glow: '#38bdf8', rIcon: '🔵', rDesc: 'ثنائي باعث للضوء الأزرق عالي السطوع (Blue LED Vf=2.8V)' },
        { tool: 'LED_YELLOW', icon: '🟡', label: 'ليد أصفر Yellow', defVal: 2.0, unit: 'V', sym: 'LED_Y', glow: '#facc15', rIcon: '🟡', rDesc: 'ثنائي باعث للضوء الأصفر (Yellow Indicator LED Vf=2.0V)' },
        { tool: 'LED_WHITE', icon: '⚪', label: 'ليد أبيض White', defVal: 3.0, unit: 'V', sym: 'LED_W', glow: '#f8fafc', rIcon: '⚪', rDesc: 'ثنائي إضاءة أبيض ناصع (White Power LED Vf=3.0V)' },
        { tool: 'RGB_LED', icon: '🌈', label: 'ليد متعدد RGB', defVal: 2.4, unit: 'V', sym: 'RGB', glow: '#c084fc', rIcon: '🌈', rDesc: 'ليد ذكي متعدد الألوان (RGB Full-Color LED)' },
        { tool: 'SEVEN_SEG', icon: '8️⃣', label: 'شاشة 7-Segment', defVal: 2.0, unit: 'V', sym: '7SEG', glow: '#ef4444', rIcon: '8️⃣', rDesc: 'وحدة إظهار رقمية سباعية القطع (7-Segment Display)' },
        { tool: 'PHOTO_DIODE', icon: '☀️⊳|', label: 'فوتوديود مستقبل', defVal: 0.6, unit: 'V', sym: 'PD', rIcon: '👁️', rDesc: 'ثنائي ضوئي حساس للأشعة تحت الحمراء (Photodiode)' }
      ],
      CAT_ACTIVE: [
        { tool: 'NPN_BJT', icon: ' transistor', label: 'ترانزستور NPN 2N2222', defVal: 100, unit: 'β', sym: 'NPN', rIcon: '🕷️', rDesc: 'ترانزستور ثنائي القطبية NPN للتضخيم والقيادة (2N2222)' },
        { tool: 'PNP_BJT', icon: ' transistor', label: 'ترانزستور PNP 2N3906', defVal: 100, unit: 'β', sym: 'PNP', rIcon: '🕷️', rDesc: 'ترانزستور ثنائي القطبية PNP (2N3906 BJT)' },
        { tool: 'NMOS', icon: ' mosfet', label: 'موسفت N-MOSFET', defVal: 0.05, unit: 'Ω', sym: 'NMOS', rIcon: '🔲', rDesc: 'ترانزستور أثر الحقل للمفاتيح الاستطاعية (IRFZ44N N-MOS)' },
        { tool: 'PMOS', icon: ' mosfet', label: 'موسفت P-MOSFET', defVal: 0.08, unit: 'Ω', sym: 'PMOS', rIcon: '🔲', rDesc: 'ترانزستور أثر الحقل قناة P (P-Channel MOSFET)' },
        { tool: 'OPAMP', icon: '▷', label: 'مضخم عمليات LM741', defVal: 10, unit: 'Gain', sym: 'OPAMP', rIcon: '芯片', rDesc: 'دارة متكاملة لمضخم العمليات التماثلي (LM741 Op-Amp)' },
        { tool: 'SWITCH', icon: '🔌', label: 'مفتاح قاطع SPST', defVal: 1, unit: 'State', sym: 'SW', rIcon: '🎚️', rDesc: 'مفتاح ميكانيكي فصل/وصل (Toggle Switch ON/OFF)' },
        { tool: 'PUSH_BUTTON', icon: '🔘', label: 'زر ضاغط Push', defVal: 0, unit: 'State', sym: 'BTN', rIcon: '🔘', rDesc: 'زر ضغط لحظي لوحات التجارب (Tactile Push Button)' },
        { tool: 'RELAY', icon: '🧲🔌', label: 'ريليه كهرومغناطيسية', defVal: 1, unit: 'State', sym: 'RLY', rIcon: '🟦', rDesc: 'مرحّل كهرومغناطيسي للعزل والتحكم (5V Relay Module)' },
        { tool: 'BUZZER', icon: '🔔', label: 'جرس بيزو صوتي', defVal: 2000, unit: 'Hz', sym: 'BUZ', rIcon: '🔊', rDesc: 'طناّن بيزو يصدر رنيناً حقيقياً عند تغذيته (Active Buzzer)' },
        { tool: 'LAMP', icon: '💡', label: 'مصباح توهجي Lamp', defVal: 60, unit: 'Ω', sym: 'LAMP', glow: '#fde047', rIcon: '💡', rDesc: 'مصباح فتيل يتوهج بشدة حسب الاستطاعة (Incandescent Lamp)' },
        { tool: 'DC_MOTOR', icon: '⚙️', label: 'محرك مستمر Motor', defVal: 40, unit: 'Ω', sym: 'MTR', rIcon: '⚙️', rDesc: 'محرك تيار مستمر مصغر ( hobby DC Brushed Motor)' }
      ],
      CAT_LOGIC: [
        { tool: 'LOGIC_HIGH', icon: '1️⃣', label: 'منطق عالي High (5V)', defVal: 5, unit: 'V', sym: 'HI_1', rIcon: '🟩', rDesc: 'مستوى منطقي رقمي 1 (TTL Logic High +5V)' },
        { tool: 'LOGIC_LOW', icon: '0️⃣', label: 'منطق منخفض Low (0V)', defVal: 0, unit: 'V', sym: 'LO_0', rIcon: '⬛', rDesc: 'مستوى منطقي رقمي 0 (TTL Logic Low 0V)' },
        { tool: 'NOT_GATE', icon: '▷o', label: 'بوابة عكس NOT', defVal: 5, unit: 'V', sym: 'NOT', rIcon: '🧮', rDesc: 'بوابة النفي المنطقي (74HC04 Inverter Gate)' },
        { tool: 'AND_GATE', icon: 'D&', label: 'بوابة و AND', defVal: 5, unit: 'V', sym: 'AND', rIcon: '🧮', rDesc: 'بوابة الضرب المنطقي (74HC08 AND Gate)' },
        { tool: 'OR_GATE', icon: '≥1', label: 'بوابة أو OR', defVal: 5, unit: 'V', sym: 'OR', rIcon: '🧮', rDesc: 'بوابة الجمع المنطقي (74HC32 OR Gate)' },
        { tool: 'XOR_GATE', icon: '=1', label: 'بوابة XOR', defVal: 5, unit: 'V', sym: 'XOR', rIcon: '🧮', rDesc: 'بوابة أو الحصرية (74HC86 Exclusive-OR Gate)' },
        { tool: 'VOLTMETER', icon: 'ⓥ', label: 'مقياس فولت V', defVal: 10000000, unit: 'Ω', sym: 'VM', rIcon: '📟', rDesc: 'فولتميتر رقمي ذو ممانعة دخل عالية جداً (Voltmeter)' },
        { tool: 'AMMETER', icon: 'ⓐ', label: 'مقياس أمبير A', defVal: 0.01, unit: 'Ω', sym: 'AM', rIcon: '📟', rDesc: 'أمبيرمتر تسلسلي ذو مقاومة داخلية صفريّة (Ammeter)' },
        { tool: 'CLEAR', icon: '✖', label: 'مسح الدارة' }
      ]
    };

    // فهرس موحد للوصول السريع لخصائص أي قطعة
    const ALL_COMPONENTS_META = {};
    Object.values(COMPONENT_CATALOG).forEach(list => {
      list.forEach(item => { ALL_COMPONENTS_META[item.tool] = item; });
    });

    let activeCategory = 'CAT_SOURCES';

    window.switchComponentCategory = function(catKey, tabEl) {
      playSFX('tap');
      activeCategory = catKey;
      document.querySelectorAll('.cat-tab').forEach(b => b.classList.remove('active'));
      if (tabEl) tabEl.classList.add('active');
      renderCategoryToolbar();
    };

    function renderCategoryToolbar() {
      const container = document.getElementById('dynamicToolbar');
      const items = COMPONENT_CATALOG[activeCategory] || [];
      container.innerHTML = items.map(item => {
        if (item.tool === 'CLEAR') {
          return `
            <div class="tool-item" onclick="playSFX('delete'); clearCircuitWorkspace()">
              <span class="icon" style="color:var(--accent-red);">${item.icon}</span>
              <span>${item.label}</span>
            </div>
          `;
        }
        const isAct = currentTool === item.tool ? 'active' : '';
        return `
          <div class="tool-item ${isAct}" data-tool="${item.tool}" onclick="selectTool('${item.tool}', this)">
            <span class="icon">${item.icon}</span>
            <span>${item.label}</span>
          </div>
        `;
      }).join('');
    }

    function escapeHTML(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    const firebaseConfig = {
      apiKey: "AIzaSyAg9os96KdhaHveSpi5GmHFCOM_oo2s8h0",
      authDomain: "university-of-aleppo-76524.firebaseapp.com",
      projectId: "university-of-aleppo-76524",
      storageBucket: "university-of-aleppo-76524.firebasestorage.app",
      messagingSenderId: "408206107153",
      appId: "1:408206107153:web:1a32d51991137ac32e47b0"
    };

    let db = null;
    let auth = null;
    let isFirebaseReady = false;
    let firebaseOpsCount = 6;
    let activeAuthUid = null;

    try {
      const app = initializeApp(firebaseConfig);
      db = getFirestore(app);
      auth = getAuth(app);
      enableIndexedDbPersistence(db).catch(() => {});

      onAuthStateChanged(auth, (user) => {
        if (user) {
          activeAuthUid = user.uid;
          isFirebaseReady = true;
          attachCloudRealtimeListeners();
          syncCurrentUserWithCloud();
        } else {
          signInAnonymously(auth).catch((err) => console.warn("Auth warning:", err));
        }
      });
    } catch (e) {
      console.warn("Offline Mode Active");
    }

    function updateConnectivityIndicator() {
      const dot = document.getElementById('connDot');
      const txt = document.getElementById('connText');
      if (navigator.onLine) {
        dot.classList.remove('offline');
        txt.innerText = 'متصل بالسحابة';
      } else {
        dot.classList.add('offline');
        txt.innerText = 'وضع محلي (بدون نت)';
      }
    }
    window.addEventListener('online', updateConnectivityIndicator);
    window.addEventListener('offline', updateConnectivityIndicator);

    function attachCloudRealtimeListeners() {
      if (!isFirebaseReady || !db) return;

      const publicQ = query(collection(db, "projects"), where("isPublic", "==", true));
      onSnapshot(publicQ, (snap) => {
        firebaseOpsCount++;
        const cloudProjs = [];
        snap.forEach(d => cloudProjs.push(d.data()));
        mergeCloudProjectsWithLocal(cloudProjs);
      }, () => {});

      if (currentUser && currentUser.uid) {
        const ownerQ = query(collection(db, "projects"), where("ownerId", "==", currentUser.uid));
        onSnapshot(ownerQ, (snap) => {
          firebaseOpsCount++;
          const ownProjs = [];
          snap.forEach(d => ownProjs.push(d.data()));
          mergeCloudProjectsWithLocal(ownProjs);
        }, () => {});
      }

      onSnapshot(doc(db, "announcements", "global"), (snap) => {
        firebaseOpsCount++;
        if (snap.exists() && snap.data().text) {
          localStorage.setItem('aleppo_ee_announcement', snap.data().text);
        } else {
          localStorage.removeItem('aleppo_ee_announcement');
        }
        loadGlobalAnnouncementBanner();
      }, () => {});

      onSnapshot(collection(db, "users"), (snap) => {
        firebaseOpsCount++;
        const cloudUsers = [];
        snap.forEach(d => cloudUsers.push(d.data()));
        if (cloudUsers.length > 0) {
          setLocalUsers(cloudUsers);
          if (currentUser) {
            const myCloudRecord = cloudUsers.find(u => u.uid === currentUser.uid || u.universityId === currentUser.universityId);
            if (myCloudRecord && myCloudRecord.isBanned) {
              currentUser.isBanned = true;
              localStorage.setItem('aleppo_ee_user', JSON.stringify(currentUser));
              showToast("⛔ تم حظر حسابك من قبل إدارة الكلية.");
            }
          }
          if (document.getElementById('secretRoomModal').classList.contains('active')) renderSecretRoomDashboard();
        }
      }, () => {});

      onSnapshot(collection(db, "reports"), (snap) => {
        firebaseOpsCount++;
        const cloudReports = [];
        snap.forEach(d => cloudReports.push(d.data()));
        setLocalReports(cloudReports);
        if (document.getElementById('secretRoomModal').classList.contains('active')) renderSecretRoomDashboard();
      }, () => {});
    }

    function mergeCloudProjectsWithLocal(incomingList) {
      const currentLocal = getLocalProjects();
      const map = new Map();
      currentLocal.forEach(p => map.set(p.id, p));
      incomingList.forEach(p => map.set(p.id, p));
      const combined = Array.from(map.values());
      setLocalProjects(combined);
      if (document.getElementById('repoModal').classList.contains('active')) renderRepositoryList();
      if (document.getElementById('secretRoomModal').classList.contains('active')) renderSecretRoomDashboard();
    }

    async function syncCurrentUserWithCloud() {
      if (!currentUser || !isFirebaseReady || !activeAuthUid) return;
      currentUser.uid = activeAuthUid;
      currentUser.lastLoginAt = Date.now();
      localStorage.setItem('aleppo_ee_user', JSON.stringify(currentUser));
      saveUserToLocalRegistry(currentUser);
      try {
        await setDoc(doc(db, "users", activeAuthUid), currentUser, { merge: true });
      } catch (e) {}
    }

    let currentUser = JSON.parse(localStorage.getItem('aleppo_ee_user')) || null;

    function initUserSession() {
      updateConnectivityIndicator();
      loadGlobalAnnouncementBanner();

      if (!currentUser) {
        document.getElementById('onboardingModal').classList.add('active');
      } else {
        if (currentUser.isBanned) {
          showToast("⛔ تم حظر حسابك من قِبل إدارة الكلية.");
          return;
        }
        currentUser.lastLoginAt = Date.now();
        localStorage.setItem('aleppo_ee_user', JSON.stringify(currentUser));
        saveUserToLocalRegistry(currentUser);
        applyUserUI(currentUser);
      }
      seedInitialDemoData();
    }

    window.handleOnboardingSubmit = async function() {
      const fullName = document.getElementById('fullNameInput').value.trim();
      const uniId = document.getElementById('uniIdInput').value.trim();
      const errBox = document.getElementById('onboardingError');
      errBox.style.display = 'none';

      const nameRegex = /^[\u0621-\u064A]+\s+[\u0621-\u064A]+\s+[\u0621-\u064A]+.*$/;
      if (!nameRegex.test(fullName)) {
        playSFX('error');
        errBox.innerText = "يرجى إدخال الاسم الثلاثي باللغة العربية بشكل صحيح.";
        errBox.style.display = 'block';
        return;
      }

      const isAdminTriggered = (fullName === "معاذ حسين العلي" && uniId === "1461997");
      const studentIdRegex = /^\d{6}$/;

      if (!isAdminTriggered && !studentIdRegex.test(uniId)) {
        playSFX('error');
        errBox.innerText = "الرقم الجامعي غير صالح. يجب أن يتكون من 6 أرقام فقط تطابق نظام جامعة حلب.";
        errBox.style.display = 'block';
        return;
      }

      const uid = activeAuthUid || ("usr_" + uniId);
      currentUser = {
        uid,
        fullName,
        universityId: uniId,
        role: isAdminTriggered ? "admin" : "student",
        isBanned: false,
        createdAt: Date.now(),
        lastLoginAt: Date.now()
      };

      localStorage.setItem('aleppo_ee_user', JSON.stringify(currentUser));
      saveUserToLocalRegistry(currentUser);

      if (isFirebaseReady && activeAuthUid) {
        try {
          firebaseOpsCount++;
          await setDoc(doc(db, "users", activeAuthUid), currentUser, { merge: true });
        } catch (e) {}
      }

      document.getElementById('onboardingModal').classList.remove('active');
      applyUserUI(currentUser);
      playSFX('wire');
      triggerHaptic(40);
      showToast(isAdminTriggered ? "مرحباً بك يا مهندس معاذ في لوحة التحكم الهندسية ★" : "تم تسجيل دخولك بنجاح!");
      attachCloudRealtimeListeners();
    };

    function applyUserUI(user) {
      document.getElementById('studentHeaderBadge').innerText = `${user.fullName} (${user.universityId})`;
      if (user.role === 'admin' || (user.fullName === "معاذ حسين العلي" && user.universityId === "1461997")) {
        document.getElementById('secretRoomBtn').style.display = 'inline-flex';
      }
    }

    function triggerHaptic(ms = 18) {
      if (navigator.vibrate) {
        try { navigator.vibrate(ms); } catch (e) {}
      }
    }

    // ============================================================================
    // 3. محرك المحاكاة الرياضي الموسع في الـ Web Worker (يدعم كافة القطع الـ 38+)
    // ============================================================================
    const workerCode = `
      let prevCapVoltages = {};
      let prevIndCurrents = {};
      const FIXED_DT = 0.02;

      function isPointOnOrthogonalWire(px, py, w) {
        const minX = Math.min(w.x1, w.x2);
        const maxX = Math.max(w.x1, w.x2);
        if (py === w.y1 && px >= minX && px <= maxX) return true;

        const minY = Math.min(w.y1, w.y2);
        const maxY = Math.max(w.y1, w.y2);
        if (px === w.x2 && py >= minY && py <= maxY) return true;

        return false;
      }

      self.onmessage = function(e) {
        const { components, wires, time, resetState } = e.data;

        if (resetState) {
          prevCapVoltages = {};
          prevIndCurrents = {};
        }

        const dt = FIXED_DT;

        const gndComp = components.find(c => c.type === 'GND');
        if (!gndComp) {
          self.postMessage({
            success: false,
            errorCode: 'NO_GND',
            culpritIds: components.map(c => c.id),
            message: 'يرجى إضافة نقطة تأريض (GND) واحدة على الأقل لتشغيل المحاكاة.'
          });
          return;
        }

        const parent = {};
        function find(i) {
          if (parent[i] === undefined) parent[i] = i;
          if (parent[i] === i) return i;
          return parent[i] = find(parent[i]);
        }
        function union(i, j) {
          const rootI = find(i);
          const rootJ = find(j);
          if (rootI !== rootJ) parent[rootI] = rootJ;
        }

        const terminals = [];
        components.forEach(c => {
          c.pins.forEach((pin, idx) => {
            const key = c.id + '_' + idx;
            terminals.push({ key, x: pin.x, y: pin.y, compId: c.id, pinIdx: idx });
          });
        });

        for (let i = 0; i < terminals.length; i++) {
          for (let j = i + 1; j < terminals.length; j++) {
            if (terminals[i].x === terminals[j].x && terminals[i].y === terminals[j].y) {
              union(terminals[i].key, terminals[j].key);
            }
          }
        }

        wires.forEach((w, wIdx) => {
          const wKey = 'wire_' + wIdx;
          terminals.forEach(t => {
            if (isPointOnOrthogonalWire(t.x, t.y, w)) {
              union(t.key, wKey);
            }
          });
          wires.forEach((w2, w2Idx) => {
            if (wIdx >= w2Idx) return;
            if (
              isPointOnOrthogonalWire(w2.x1, w2.y1, w) ||
              isPointOnOrthogonalWire(w2.x2, w2.y2, w) ||
              isPointOnOrthogonalWire(w.x1, w.y1, w2) ||
              isPointOnOrthogonalWire(w.x2, w.y2, w2)
            ) {
              union(wKey, 'wire_' + w2Idx);
            }
          });
        });

        const gndRoot = find(gndComp.id + '_0');
        const nodeMap = {};
        let nodeCounter = 1;

        terminals.forEach(t => {
          const root = find(t.key);
          if (root === gndRoot) {
            nodeMap[t.key] = 0;
          } else {
            if (!nodeMap[root]) nodeMap[root] = nodeCounter++;
            nodeMap[t.key] = nodeMap[root];
          }
        });

        const N = nodeCounter - 1;
        if (N === 0) {
          self.postMessage({ success: true, pinVoltages: {}, maxV: 0, culpritIds: [], activeBuzzers: [] });
          return;
        }

        const VOLTAGE_SOURCE_TYPES = ['DC_SOURCE', 'BATTERY_9V', 'AC_SOURCE', 'SQUARE_SOURCE', 'PULSE_SOURCE', 'LOGIC_HIGH', 'LOGIC_LOW'];
        const shortCircuitCulprits = [];
        components.forEach(c => {
          if (VOLTAGE_SOURCE_TYPES.includes(c.type)) {
            const n1 = nodeMap[c.id + '_0'] || 0;
            const n2 = nodeMap[c.id + '_1'] || 0;
            if (n1 === n2) shortCircuitCulprits.push(c.id);
          }
        });

        if (shortCircuitCulprits.length > 0) {
          self.postMessage({
            success: false,
            errorCode: 'SHORT_CIRCUIT',
            culpritIds: shortCircuitCulprits,
            message: 'تحذير: قصر كهربائي مباشر! تم تمييز المنبع المتضرر باللون الأحمر الوامض.'
          });
          return;
        }

        let V = new Float64Array(N);
        const NONLINEAR_TYPES = ['DIODE', 'SCHOTTKY', 'ZENER', 'PHOTO_DIODE', 'LED_RED', 'LED_GREEN', 'LED_BLUE', 'LED_YELLOW', 'LED_WHITE', 'RGB_LED', 'SEVEN_SEG', 'NPN_BJT', 'PNP_BJT', 'NMOS', 'PMOS'];
        const hasNonlinear = components.some(c => NONLINEAR_TYPES.includes(c.type));
        const maxIter = hasNonlinear ? 12 : 1;

        for (let iter = 0; iter < maxIter; iter++) {
          const G = Array.from({ length: N }, () => new Float64Array(N));
          const I = new Float64Array(N);

          for (let i = 0; i < N; i++) G[i][i] += 1e-12;

          components.forEach(c => {
            if (c.type === 'GND') return;
            const n1 = nodeMap[c.id + '_0'] || 0;
            const n2 = nodeMap[c.id + '_1'] || 0;

            const addConductance = (g) => {
              if (n1 > 0) G[n1 - 1][n1 - 1] += g;
              if (n2 > 0) G[n2 - 1][n2 - 1] += g;
              if (n1 > 0 && n2 > 0) {
                G[n1 - 1][n2 - 1] -= g;
                G[n2 - 1][n1 - 1] -= g;
              }
            };

            const addCurrentSource = (iVal) => {
              if (n1 > 0) I[n1 - 1] += iVal;
              if (n2 > 0) I[n2 - 1] -= iVal;
            };

            // 1. العناصر الأومية والحساسات والمصابيح والمحركات وأجهزة القياس
            if (['RESISTOR', 'POT', 'LDR', 'THERMISTOR', 'LAMP', 'DC_MOTOR', 'TRANSFORMER', 'VOLTMETER', 'AMMETER'].includes(c.type)) {
              const R = Math.max(c.value || 100, 1e-3);
              addConductance(1 / R);
            }
            // 2. الجرس الصوتي Piezo Buzzer
            else if (c.type === 'BUZZER') {
              addConductance(1 / 150); // ممانعة الجرس الفعالة 150 أوم
            }
            // 3. الصمامة Fuse (مقاومة صغيرة جداً 0.05 أوم ما لم تنصهر)
            else if (c.type === 'FUSE') {
              const R = c.blown ? 1e9 : 0.05;
              addConductance(1 / R);
            }
            // 4. المفاتيح والريليهات
            else if (['SWITCH', 'PUSH_BUTTON', 'RELAY'].includes(c.type)) {
              const isClosed = (c.value === 1);
              const R = isClosed ? 0.005 : 1e9;
              addConductance(1 / R);
            }
            // 5. المكثفات والكريستال
            else if (['CAPACITOR', 'ELEC_CAP', 'CRYSTAL'].includes(c.type)) {
              const C = c.type === 'CRYSTAL' ? 0.00005 : Math.max(c.value || 1e-5, 1e-12);
              const gEq = C / dt;
              const vPrev = prevCapVoltages[c.id] || 0;
              addConductance(gEq);
              addCurrentSource(gEq * vPrev);
            }
            // 6. الوشيعة Inductor
            else if (c.type === 'INDUCTOR') {
              const L = Math.max(c.value || 0.1, 1e-6);
              const gEq = dt / L;
              const iPrev = prevIndCurrents[c.id] || 0;
              addConductance(gEq);
              addCurrentSource(-iPrev);
            }
            // 7. الديودات والليدات والترانزستورات (ثنائيات الوصلة والأثر)
            else if (NONLINEAR_TYPES.includes(c.type)) {
              const vAnode = n1 > 0 ? V[n1 - 1] : 0;
              const vCathode = n2 > 0 ? V[n2 - 1] : 0;
              const vDiff = vAnode - vCathode;

              if (c.type === 'ZENER') {
                const vZ = c.value || 5.1;
                if (vDiff >= 0.7) {
                  const gFwd = 1 / 5;
                  addConductance(gFwd);
                  addCurrentSource(gFwd * 0.7);
                } else if (vDiff <= -vZ) {
                  const gZ = 1 / 5;
                  addConductance(gZ);
                  addCurrentSource(-gZ * vZ);
                } else {
                  addConductance(1e-9);
                }
              } else {
                const vfMap = {
                  'DIODE': 0.7, 'SCHOTTKY': 0.3, 'PHOTO_DIODE': 0.6,
                  'LED_RED': 2.0, 'LED_YELLOW': 2.0, 'LED_GREEN': 2.1,
                  'RGB_LED': 2.4, 'SEVEN_SEG': 2.0, 'LED_BLUE': 2.8, 'LED_WHITE': 3.0,
                  'NPN_BJT': 0.7, 'PNP_BJT': 0.7, 'NMOS': 1.5, 'PMOS': 1.5
                };
                const vTh = vfMap[c.type] || 0.7;
                const rOn = c.type.startsWith('LED') ? 15 : 5;
                if (vDiff >= vTh) {
                  const gFwd = 1 / rOn;
                  addConductance(gFwd);
                  addCurrentSource(gFwd * vTh);
                } else {
                  addConductance(1e-9);
                }
              }
            }
            // 8. مضخم العمليات والبوابات المنطقية
            else if (['OPAMP', 'NOT_GATE', 'AND_GATE', 'OR_GATE', 'XOR_GATE'].includes(c.type)) {
              const vIn = n1 > 0 ? V[n1 - 1] : 0;
              let vOutTarget = 0;
              if (c.type === 'OPAMP') {
                vOutTarget = Math.max(-12, Math.min(12, vIn * (c.value || 5)));
              } else if (c.type === 'NOT_GATE') {
                vOutTarget = vIn > 2.2 ? 0 : 5;
              } else {
                vOutTarget = vIn > 2.2 ? 5 : 0;
              }
              addConductance(1e-6); // دخل عالي الممانعة
              if (n2 > 0) {
                const gOut = 1 / 10;
                G[n2 - 1][n2 - 1] += gOut;
                I[n2 - 1] += vOutTarget * gOut;
              }
            }
            // 9. منبع التيار المستقل
            else if (c.type === 'CURRENT_SOURCE') {
              addConductance(1e-9);
              addCurrentSource(c.value || 0.02);
            }
            // 10. منابع الجهد المستمرة والمتناوبة والنبضية والمنطقية
            else if (VOLTAGE_SOURCE_TYPES.includes(c.type)) {
              let Vval = c.value || 5;
              if (c.type === 'BATTERY_9V') Vval = c.value || 9;
              else if (c.type === 'LOGIC_HIGH') Vval = 5;
              else if (c.type === 'LOGIC_LOW') Vval = 0;
              else if (c.type === 'AC_SOURCE') Vval = (c.value || 10) * Math.sin(2 * Math.PI * 2 * time);
              else if (c.type === 'SQUARE_SOURCE') Vval = (Math.sin(2 * Math.PI * 2 * time) >= 0) ? (c.value || 5) : -(c.value || 5);
              else if (c.type === 'PULSE_SOURCE') Vval = ((time * 2) % 1 < 0.3) ? (c.value || 5) : 0;

              const rInternal = 0.001;
              const gSource = 1 / rInternal;
              addConductance(gSource);
              addCurrentSource(Vval * gSource);
            }
          });

          for (let i = 0; i < N; i++) {
            let maxRow = i;
            for (let k = i + 1; k < N; k++) {
              if (Math.abs(G[k][i]) > Math.abs(G[maxRow][i])) maxRow = k;
            }
            const tmpG = G[i]; G[i] = G[maxRow]; G[maxRow] = tmpG;
            const tmpI = I[i]; I[i] = I[maxRow]; I[maxRow] = tmpI;

            const pivot = G[i][i] || 1e-12;
            for (let k = i + 1; k < N; k++) {
              const factor = G[k][i] / pivot;
              I[k] -= factor * I[i];
              for (let j = i; j < N; j++) {
                G[k][j] -= factor * G[i][j];
              }
            }
          }

          const nextV = new Float64Array(N);
          for (let i = N - 1; i >= 0; i--) {
            let sum = I[i];
            for (let j = i + 1; j < N; j++) {
              sum -= G[i][j] * nextV[j];
            }
            nextV[i] = sum / (G[i][i] || 1e-12);
          }
          V = nextV;
        }

        const activeBuzzers = [];
        components.forEach(c => {
          const n1 = nodeMap[c.id + '_0'] || 0;
          const n2 = nodeMap[c.id + '_1'] || 0;
          const v1 = n1 > 0 ? V[n1 - 1] : 0;
          const v2 = n2 > 0 ? V[n2 - 1] : 0;
          const vBranch = v1 - v2;

          if (c.type === 'CAPACITOR' || c.type === 'ELEC_CAP' || c.type === 'CRYSTAL') {
            prevCapVoltages[c.id] = vBranch;
          } else if (c.type === 'INDUCTOR') {
            const L = Math.max(c.value || 0.1, 1e-6);
            prevIndCurrents[c.id] = (prevIndCurrents[c.id] || 0) + (dt / L) * vBranch;
          } else if (c.type === 'BUZZER' && Math.abs(vBranch) >= 1.5) {
            activeBuzzers.push(c.id);
          }
        });

        const pinVoltages = {};
        let maxAbsV = 0;
        terminals.forEach(t => {
          const nodeIdx = nodeMap[t.key];
          const vVal = nodeIdx === 0 ? 0 : V[nodeIdx - 1];
          pinVoltages[t.key] = vVal;
          if (Math.abs(vVal) > maxAbsV) maxAbsV = Math.abs(vVal);
        });

        self.postMessage({
          success: true,
          pinVoltages,
          maxV: maxAbsV,
          culpritIds: [],
          activeBuzzers
        });
      };
    `;

    const workerBlob = new Blob([workerCode], { type: 'application/javascript' });
    const solverWorker = new Worker(URL.createObjectURL(workerBlob));

    const canvas = document.getElementById('circuitCanvas');
    const ctx = canvas.getContext('2d');
    const GRID_SIZE = 24;

    let currentTool = 'SELECT';
    let components = [];
    let wires = [];
    let selectedComponent = null;
    let draggingComponent = null;
    let wireStartPin = null;
    let activeWireColor = '#10b981';
    let pointerPos = { x: 0, y: 0 };
    let isSimulating = false;
    let simTime = 0;
    let latestPinVoltages = {};
    let errorCulpritIds = [];
    let scopeHistory = new Array(115).fill(0);

    let cameraZoom = 1.0;
    let cameraPan = { x: 0, y: 0 };
    let isPanning = false;
    let panStartOrigin = { x: 0, y: 0 };
    let showGrid = true;
    let cachedGridColor = 'rgba(148, 163, 184, 0.12)';

    let dmmActive = false;
    let dmmPinKeyA = null;
    let dmmPinKeyB = null;
    let dmmRmsBuffer = [];

    let undoStack = [];
    let redoStack = [];

    function pushHistorySnapshot() {
      undoStack.push(JSON.stringify({ components, wires }));
      if (undoStack.length > 30) undoStack.shift();
      redoStack = [];
    }

    window.undoAction = function() {
      if (undoStack.length === 0) {
        showToast("لا توجد خطوات سابقة للتراجع عنها.");
        return;
      }
      playSFX('tap');
      redoStack.push(JSON.stringify({ components, wires }));
      const prev = JSON.parse(undoStack.pop());
      components = prev.components;
      wires = prev.wires;
      selectedComponent = null;
      triggerHaptic(15);
      updateInspectorUI();
      triggerSingleSolve(true);
      drawWorkspace();
    };

    window.redoAction = function() {
      if (redoStack.length === 0) {
        showToast("لا توجد خطوات لإعادتها.");
        return;
      }
      playSFX('tap');
      undoStack.push(JSON.stringify({ components, wires }));
      const next = JSON.parse(redoStack.pop());
      components = next.components;
      wires = next.wires;
      selectedComponent = null;
      triggerHaptic(15);
      updateInspectorUI();
      triggerSingleSolve(true);
      drawWorkspace();
    };

    window.rotateSelectedComponent = function() {
      if (!selectedComponent || selectedComponent.type === 'GND') {
        showToast("اختر عنصراً أولاً لتدويره 90 درجة.");
        return;
      }
      playSFX('rotate');
      pushHistorySnapshot();
      const oldPins = selectedComponent.pins.map(p => ({ ...p }));
      selectedComponent.rotation = ((selectedComponent.rotation || 0) + 90) % 360;
      updateComponentPins(selectedComponent);

      wires.forEach(w => {
        oldPins.forEach((op, idx) => {
          if (w.x1 === op.x && w.y1 === op.y) {
            w.x1 = selectedComponent.pins[idx].x;
            w.y1 = selectedComponent.pins[idx].y;
          }
          if (w.x2 === op.x && w.y2 === op.y) {
            w.x2 = selectedComponent.pins[idx].x;
            w.y2 = selectedComponent.pins[idx].y;
          }
        });
      });

      triggerHaptic(20);
      triggerSingleSolve();
      drawWorkspace();
    };

    window.zoomWorkspace = function(delta) {
      playSFX('tap');
      cameraZoom = Math.min(2.2, Math.max(0.5, cameraZoom + delta));
      drawWorkspace();
    };

    window.resetViewport = function() {
      playSFX('tap');
      cameraZoom = 1.0;
      cameraPan = { x: 0, y: 0 };
      drawWorkspace();
      showToast("تمت إعادة ضبط زاوية الرؤية (100%)");
    };

    window.toggleGridDisplay = function() {
      playSFX('tap');
      showGrid = !showGrid;
      document.getElementById('gridRibbonBtn').classList.toggle('active', !showGrid);
      drawWorkspace();
    };

    window.toggleSolarpunkTheme = function() {
      playSFX('tap');
      document.body.classList.toggle('solarpunk-light');
      cachedGridColor = document.body.classList.contains('solarpunk-light')
        ? 'rgba(5, 150, 105, 0.14)'
        : 'rgba(148, 163, 184, 0.12)';
      drawWorkspace();
      showToast(document.body.classList.contains('solarpunk-light') ? "تم تفعيل الوضع النهاري الساطع (Solarpunk Light) ☀️" : "تم تفعيل الوضع الليلي الداكن 🌙");
    };

    window.toggleMultimeter = function() {
      playSFX('tap');
      dmmActive = !dmmActive;
      document.getElementById('multimeterWidget').style.display = dmmActive ? 'block' : 'none';
      document.getElementById('dmmRibbonBtn').classList.toggle('active', dmmActive);
      if (dmmActive) {
        dmmPinKeyA = null;
        dmmPinKeyB = null;
        dmmRmsBuffer = [];
        showToast("المس أي قطبين في الدائرة لربط مجسات المقياس المتعدد اللحظي.");
      }
    };

    function updateLiveMultimeterReadout() {
      if (!dmmActive) return;
      const screen = document.getElementById('dmmScreen');
      if (dmmPinKeyA && !dmmPinKeyB) {
        const va = latestPinVoltages[dmmPinKeyA] || 0;
        screen.innerHTML = `مجس 1 (${dmmPinKeyA}): ${va.toFixed(2)}V<br><span style="color:#f59e0b;">المس القطب الثاني...</span>`;
      } else if (dmmPinKeyA && dmmPinKeyB) {
        const va = latestPinVoltages[dmmPinKeyA] || 0;
        const vb = latestPinVoltages[dmmPinKeyB] || 0;
        const diff = va - vb;
        dmmRmsBuffer.push(diff * diff);
        if (dmmRmsBuffer.length > 40) dmmRmsBuffer.shift();
        const meanSq = dmmRmsBuffer.reduce((a, b) => a + b, 0) / dmmRmsBuffer.length;
        const vRms = Math.sqrt(meanSq);
        screen.innerHTML = `ΔV(inst) = ${diff.toFixed(3)} V<br>V(RMS) = ${vRms.toFixed(3)} V`;
      }
    }

    window.setWireColor = function(color, el) {
      playSFX('tap');
      activeWireColor = color;
      document.querySelectorAll('.wire-color-swatch').forEach(s => s.classList.remove('selected'));
      if (el) el.classList.add('selected');
      showToast("تم تغيير لون السلك الجديد.");
    };

    window.exportCircuitImage = function() {
      playSFX('wire');
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement('a');
      link.download = `Aleppo_EE_Circuit_${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      showToast("تم حفظ صورة الدائرة لإرفاقها في تقرير المختبر 📸");
    };

    function resizeCanvas() {
      const container = document.getElementById('workspace-container');
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      drawWorkspace();
    }
    window.addEventListener('resize', resizeCanvas);

    function snapToGrid(val) {
      return Math.round(val / GRID_SIZE) * GRID_SIZE;
    }

    function screenToWorld(sx, sy) {
      return {
        x: (sx - cameraPan.x) / cameraZoom,
        y: (sy - cameraPan.y) / cameraZoom
      };
    }

    window.loadCircuitTemplate = function(type) {
      playSFX('drop');
      pushHistorySnapshot();
      const cx = snapToGrid(window.innerWidth / 2);
      const cy = snapToGrid((window.innerHeight - 160) / 2);

      if (type === 'RC_FILTER') {
        components = [
          { id: 'V1', type: 'AC_SOURCE', x: cx - 72, y: cy, value: 10, unit: 'V', rotation: 90, pins: [] },
          { id: 'R1', type: 'RESISTOR', x: cx, y: cy - 48, value: 200, unit: 'Ω', rotation: 0, pins: [] },
          { id: 'C1', type: 'CAPACITOR', x: cx + 72, y: cy, value: 0.0005, unit: 'F', rotation: 90, pins: [] },
          { id: 'GND1', type: 'GND', x: cx, y: cy + 72, value: 0, unit: '', rotation: 0, pins: [] }
        ];
      } else if (type === 'RECTIFIER') {
        components = [
          { id: 'VAC', type: 'AC_SOURCE', x: cx - 72, y: cy, value: 12, unit: 'V', rotation: 90, pins: [] },
          { id: 'D1', type: 'DIODE', x: cx, y: cy - 48, value: 0.7, unit: 'V', rotation: 0, pins: [] },
          { id: 'RL', type: 'RESISTOR', x: cx + 72, y: cy, value: 1000, unit: 'Ω', rotation: 90, pins: [] },
          { id: 'GND1', type: 'GND', x: cx, y: cy + 72, value: 0, unit: '', rotation: 0, pins: [] }
        ];
      } else if (type === 'LED_BUZZER') {
        components = [
          { id: 'BAT1', type: 'BATTERY_9V', x: cx - 96, y: cy, value: 9, unit: 'V', rotation: 90, pins: [] },
          { id: 'SW1', type: 'SWITCH', x: cx - 24, y: cy - 48, value: 1, unit: 'State', rotation: 0, pins: [] },
          { id: 'R1', type: 'RESISTOR', x: cx + 48, y: cy - 48, value: 220, unit: 'Ω', rotation: 0, pins: [] },
          { id: 'LED1', type: 'LED_RED', x: cx + 96, y: cy, value: 2.0, unit: 'V', rotation: 90, pins: [] },
          { id: 'GND1', type: 'GND', x: cx, y: cy + 72, value: 0, unit: '', rotation: 0, pins: [] }
        ];
      } else if (type === 'RLC_RESONANCE') {
        components = [
          { id: 'VAC', type: 'AC_SOURCE', x: cx - 96, y: cy, value: 10, unit: 'V', rotation: 90, pins: [] },
          { id: 'R1', type: 'RESISTOR', x: cx - 24, y: cy - 48, value: 100, unit: 'Ω', rotation: 0, pins: [] },
          { id: 'L1', type: 'INDUCTOR', x: cx + 48, y: cy - 48, value: 0.2, unit: 'H', rotation: 0, pins: [] },
          { id: 'C1', type: 'CAPACITOR', x: cx + 96, y: cy, value: 0.0005, unit: 'F', rotation: 90, pins: [] },
          { id: 'GND1', type: 'GND', x: cx, y: cy + 72, value: 0, unit: '', rotation: 0, pins: [] }
        ];
      }

      components.forEach(updateComponentPins);

      if (type === 'RLC_RESONANCE' || type === 'LED_BUZZER') {
        wires = [
          { x1: components[0].pins[0].x, y1: components[0].pins[0].y, x2: components[1].pins[0].x, y2: components[1].pins[0].y, color: '#ef4444' },
          { x1: components[1].pins[1].x, y1: components[1].pins[1].y, x2: components[2].pins[0].x, y2: components[2].pins[0].y, color: '#f59e0b' },
          { x1: components[2].pins[1].x, y1: components[2].pins[1].y, x2: components[3].pins[0].x, y2: components[3].pins[0].y, color: '#38bdf8' },
          { x1: components[0].pins[1].x, y1: components[0].pins[1].y, x2: components[4].pins[0].x, y2: components[4].pins[0].y, color: '#94a3b8' },
          { x1: components[3].pins[1].x, y1: components[3].pins[1].y, x2: components[4].pins[0].x, y2: components[4].pins[0].y, color: '#94a3b8' }
        ];
      } else {
        wires = [
          { x1: components[0].pins[0].x, y1: components[0].pins[0].y, x2: components[1].pins[0].x, y2: components[1].pins[0].y, color: '#ef4444' },
          { x1: components[1].pins[1].x, y1: components[1].pins[1].y, x2: components[2].pins[0].x, y2: components[2].pins[0].y, color: '#38bdf8' },
          { x1: components[0].pins[1].x, y1: components[0].pins[1].y, x2: components[3].pins[0].x, y2: components[3].pins[0].y, color: '#94a3b8' },
          { x1: components[2].pins[1].x, y1: components[2].pins[1].y, x2: components[3].pins[0].x, y2: components[3].pins[0].y, color: '#94a3b8' }
        ];
      }

      closeModal('templatesModal');
      triggerSingleSolve(true);
      drawWorkspace();
      showToast("تم تحميل الدائرة القياسية بنجاح!");
    };

    function updateComponentPins(comp) {
      if (comp.type === 'GND') {
        comp.pins = [{ x: comp.x, y: comp.y - GRID_SIZE }];
      } else {
        const rot = (comp.rotation || 0) % 360;
        if (rot === 90) {
          comp.pins = [
            { x: comp.x, y: comp.y - GRID_SIZE * 2 },
            { x: comp.x, y: comp.y + GRID_SIZE * 2 }
          ];
        } else if (rot === 180) {
          comp.pins = [
            { x: comp.x + GRID_SIZE * 2, y: comp.y },
            { x: comp.x - GRID_SIZE * 2, y: comp.y }
          ];
        } else if (rot === 270) {
          comp.pins = [
            { x: comp.x, y: comp.y + GRID_SIZE * 2 },
            { x: comp.x, y: comp.y - GRID_SIZE * 2 }
          ];
        } else {
          comp.pins = [
            { x: comp.x - GRID_SIZE * 2, y: comp.y },
            { x: comp.x + GRID_SIZE * 2, y: comp.y }
          ];
        }
      }
    }

    window.selectTool = function(toolName, el) {
      playSFX('tap');
      currentTool = toolName;
      wireStartPin = null;
      document.querySelectorAll('.tool-item').forEach(item => item.classList.remove('active'));
      if (el) el.classList.add('active');
    };

    function findNearestPin(wx, wy, maxRadius = 38) {
      let best = null;
      let minDist = maxRadius;
      components.forEach(c => {
        c.pins.forEach((p, idx) => {
          const d = Math.hypot(p.x - wx, p.y - wy);
          if (d < minDist) {
            minDist = d;
            best = { x: p.x, y: p.y, compId: c.id, pinIdx: idx };
          }
        });
      });
      return best;
    }

    function findComponentAt(wx, wy) {
      return components.find(c => Math.hypot(c.x - wx, c.y - wy) < 36);
    }

    function getPointerCoords(e) {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const rawX = clientX - rect.left;
      const rawY = clientY - rect.top;
      const world = screenToWorld(rawX, rawY);
      return { rawX, rawY, x: world.x, y: world.y };
    }

    let lastTapTime = 0;
    let lastTapPos = { x: 0, y: 0 };

    canvas.addEventListener('pointerdown', (e) => {
      const pos = getPointerCoords(e);
      pointerPos = { x: snapToGrid(pos.x), y: snapToGrid(pos.y) };

      const now = Date.now();
      const tapDist = Math.hypot(pos.x - lastTapPos.x, pos.y - lastTapPos.y);
      const isDoubleTap = ((now - lastTapTime) < 320) && (tapDist < 25);
      lastTapTime = now;
      lastTapPos = { x: pos.x, y: pos.y };

      if (dmmActive) {
        const pin = findNearestPin(pos.x, pos.y, 45);
        if (pin) {
          playSFX('wire');
          const key = pin.compId + '_' + pin.pinIdx;
          if (!dmmPinKeyA || (dmmPinKeyA && dmmPinKeyB)) {
            dmmPinKeyA = key;
            dmmPinKeyB = null;
            dmmRmsBuffer = [];
          } else {
            dmmPinKeyB = key;
          }
          updateLiveMultimeterReadout();
          triggerHaptic(25);
          return;
        }
      }

      if (currentTool === 'PAN') {
        isPanning = true;
        panStartOrigin = { x: pos.rawX - cameraPan.x, y: pos.rawY - cameraPan.y };
        return;
      }

      if (currentTool === 'SELECT') {
        const clickedComp = findComponentAt(pos.x, pos.y);
        selectedComponent = clickedComp || null;
        draggingComponent = clickedComp || null;
        if (clickedComp) {
          if (['SWITCH', 'PUSH_BUTTON', 'RELAY'].includes(clickedComp.type)) {
            clickedComp.value = clickedComp.value === 1 ? 0 : 1;
            playSFX('switch');
            triggerSingleSolve();
          } else {
            playSFX('tap');
          }
          pushHistorySnapshot();
        }
        updateInspectorUI();
        if (isDoubleTap && clickedComp && clickedComp.type !== 'GND') {
          document.getElementById('inspValueInput').focus();
          triggerHaptic(30);
        }
      } else if (currentTool === 'WIRE') {
        const pin = findNearestPin(pos.x, pos.y);
        const startPoint = pin ? { x: pin.x, y: pin.y } : { x: snapToGrid(pos.x), y: snapToGrid(pos.y) };
        if (!wireStartPin) {
          wireStartPin = startPoint;
          playSFX('tap');
          triggerHaptic(15);
        } else {
          if (wireStartPin.x !== startPoint.x || wireStartPin.y !== startPoint.y) {
            pushHistorySnapshot();
            wires.push({
              x1: wireStartPin.x,
              y1: wireStartPin.y,
              x2: startPoint.x,
              y2: startPoint.y,
              color: activeWireColor
            });
            playSFX('wire');
            triggerHaptic(35);
            triggerSingleSolve();
          }
          wireStartPin = null;
        }
      } else {
        pushHistorySnapshot();
        const meta = ALL_COMPONENTS_META[currentTool] || { defVal: 5, unit: '' };
        const idPrefix = (meta.sym || currentTool.slice(0, 2));
        const newComp = {
          id: idPrefix + (components.length + 1) + '_' + Math.floor(Math.random() * 99),
          type: currentTool,
          x: snapToGrid(pos.x),
          y: snapToGrid(pos.y),
          rotation: 0,
          value: meta.defVal !== undefined ? meta.defVal : 5,
          unit: meta.unit || '',
          pins: []
        };
        updateComponentPins(newComp);
        components.push(newComp);
        selectedComponent = newComp;
        playSFX('drop');
        triggerHaptic(25);
        updateInspectorUI();
        currentTool = 'SELECT';
        renderCategoryToolbar();
        triggerSingleSolve();
      }
      drawWorkspace();
    });

    canvas.addEventListener('pointermove', (e) => {
      const pos = getPointerCoords(e);
      if (isPanning) {
        cameraPan.x = pos.rawX - panStartOrigin.x;
        cameraPan.y = pos.rawY - panStartOrigin.y;
        drawWorkspace();
        return;
      }

      pointerPos = { x: snapToGrid(pos.x), y: snapToGrid(pos.y) };
      if (draggingComponent && currentTool === 'SELECT') {
        const oldPins = draggingComponent.pins.map(p => ({ ...p }));
        draggingComponent.x = snapToGrid(pos.x);
        draggingComponent.y = snapToGrid(pos.y);
        updateComponentPins(draggingComponent);

        wires.forEach(w => {
          oldPins.forEach((op, idx) => {
            if (w.x1 === op.x && w.y1 === op.y) {
              w.x1 = draggingComponent.pins[idx].x;
              w.y1 = draggingComponent.pins[idx].y;
            }
            if (w.x2 === op.x && w.y2 === op.y) {
              w.x2 = draggingComponent.pins[idx].x;
              w.y2 = draggingComponent.pins[idx].y;
            }
          });
        });
        drawWorkspace();
      } else if (wireStartPin) {
        drawWorkspace();
      }
    });

    canvas.addEventListener('pointerup', () => {
      isPanning = false;
      if (draggingComponent) {
        draggingComponent = null;
        triggerHaptic(12);
        triggerSingleSolve();
      }
    });

    function updateInspectorUI() {
      const bar = document.getElementById('inspectorBar');
      if (!selectedComponent || selectedComponent.type === 'GND') {
        bar.style.display = 'none';
        return;
      }
      bar.style.display = 'flex';
      const meta = ALL_COMPONENTS_META[selectedComponent.type] || {};
      document.getElementById('inspCompName').innerText = `${meta.label || selectedComponent.type} (${selectedComponent.id})`;
      document.getElementById('inspValueInput').value = selectedComponent.value;
      document.getElementById('inspUnitLabel').innerText = selectedComponent.unit;

      document.getElementById('inspRealisticIcon').innerHTML = meta.rIcon || '🔌';
      document.getElementById('inspRealisticDesc').innerText = meta.rDesc || 'قطعة إلكترونية قياسية';

      const slider = document.getElementById('inspRangeSlider');
      const t = selectedComponent.type;
      if (['RESISTOR', 'POT', 'LDR', 'THERMISTOR'].includes(t)) {
        slider.min = 10; slider.max = 50000; slider.step = 10;
      } else if (['CAPACITOR', 'ELEC_CAP'].includes(t)) {
        slider.min = 0.00001; slider.max = 0.005; slider.step = 0.00001;
      } else if (t === 'INDUCTOR') {
        slider.min = 0.01; slider.max = 2.0; slider.step = 0.01;
      } else if (['SWITCH', 'PUSH_BUTTON', 'RELAY'].includes(t)) {
        slider.min = 0; slider.max = 1; slider.step = 1;
      } else {
        slider.min = 0.2; slider.max = 50; slider.step = 0.2;
      }
      slider.value = selectedComponent.value;

      const v0 = latestPinVoltages[selectedComponent.id + '_0'];
      const v1 = latestPinVoltages[selectedComponent.id + '_1'];
      if (v0 !== undefined && v1 !== undefined) {
        document.getElementById('inspNodeVoltage').innerText = `ΔV = ${(v0 - v1).toFixed(2)}V`;
      } else {
        document.getElementById('inspNodeVoltage').innerText = '';
      }
    }

    window.updateSelectedComponentValue = function(val) {
      if (!selectedComponent) return;
      const parsed = parseFloat(val);
      selectedComponent.value = isNaN(parsed) ? 0 : parsed;
      document.getElementById('inspValueInput').value = selectedComponent.value;
      document.getElementById('inspRangeSlider').value = selectedComponent.value;
      triggerSingleSolve();
      drawWorkspace();
    };

    window.deleteSelectedComponent = function() {
      if (!selectedComponent) return;
      playSFX('delete');
      pushHistorySnapshot();
      const pinCoords = selectedComponent.pins;
      wires = wires.filter(w => {
        const touchStart = pinCoords.some(p => p.x === w.x1 && p.y === w.y1);
        const touchEnd = pinCoords.some(p => p.x === w.x2 && p.y === w.y2);
        return !(touchStart || touchEnd);
      });
      components = components.filter(c => c.id !== selectedComponent.id);
      selectedComponent = null;
      updateInspectorUI();
      triggerSingleSolve(true);
      drawWorkspace();
    };

    window.clearCircuitWorkspace = function() {
      if (!confirm("هل تريد مسح جميع العناصر والأسلاك من مساحة العمل؟")) return;
      pushHistorySnapshot();
      components = [];
      wires = [];
      selectedComponent = null;
      latestPinVoltages = {};
      errorCulpritIds = [];
      document.getElementById('forkAttributionBadge').innerText = '';
      updateInspectorUI();
      drawWorkspace();
    };

    // الرسم مع وهج الليدات الحقيقي (Real-Time LED & Lamp Glow Effect)
    function drawWorkspace() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(cameraPan.x, cameraPan.y);
      ctx.scale(cameraZoom, cameraZoom);

      if (showGrid) {
        ctx.strokeStyle = cachedGridColor;
        ctx.lineWidth = 1;
        const startX = snapToGrid(-cameraPan.x / cameraZoom) - GRID_SIZE * 2;
        const endX = startX + (canvas.width / cameraZoom) + GRID_SIZE * 4;
        const startY = snapToGrid(-cameraPan.y / cameraZoom) - GRID_SIZE * 2;
        const endY = startY + (canvas.height / cameraZoom) + GRID_SIZE * 4;

        for (let x = startX; x < endX; x += GRID_SIZE) {
          ctx.beginPath(); ctx.moveTo(x, startY); ctx.lineTo(x, endY); ctx.stroke();
        }
        for (let y = startY; y < endY; y += GRID_SIZE) {
          ctx.beginPath(); ctx.moveTo(startX, y); ctx.lineTo(endX, y); ctx.stroke();
        }
      }

      wires.forEach(w => {
        ctx.strokeStyle = w.color || '#10b981';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(w.x1, w.y1);
        ctx.lineTo(w.x2, w.y1);
        ctx.lineTo(w.x2, w.y2);
        ctx.stroke();
      });

      if (wireStartPin) {
        ctx.strokeStyle = activeWireColor;
        ctx.setLineDash([6, 4]);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(wireStartPin.x, wireStartPin.y);
        ctx.lineTo(pointerPos.x, wireStartPin.y);
        ctx.lineTo(pointerPos.x, pointerPos.y);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      components.forEach(c => {
        ctx.save();
        const isSel = selectedComponent && selectedComponent.id === c.id;
        const isErrorCulprit = errorCulpritIds.includes(c.id);
        const meta = ALL_COMPONENTS_META[c.type] || {};

        // حساب فرق الجهد لتفعيل إضاءة الليدات والمصباح
        const v0 = latestPinVoltages[c.id + '_0'] || 0;
        const v1 = latestPinVoltages[c.id + '_1'] || 0;
        const vDiff = v0 - v1;
        const isGlowing = meta.glow && (
          (c.type === 'LAMP' && Math.abs(vDiff) >= 1.5) ||
          (c.type !== 'LAMP' && vDiff >= (c.value || 1.8))
        );

        if (isErrorCulprit) {
          ctx.strokeStyle = '#ef4444';
          ctx.shadowColor = '#ef4444';
          ctx.shadowBlur = 16;
          ctx.lineWidth = 3.5;
        } else if (isGlowing) {
          ctx.strokeStyle = meta.glow;
          ctx.shadowColor = meta.glow;
          ctx.shadowBlur = 22;
          ctx.lineWidth = 3;
        } else {
          ctx.strokeStyle = isSel ? '#f59e0b' : (document.body.classList.contains('solarpunk-light') ? '#064e3b' : '#f8fafc');
          ctx.lineWidth = isSel ? 3 : 2;
        }

        ctx.fillStyle = isGlowing ? meta.glow : (document.body.classList.contains('solarpunk-light') ? '#ffffff' : '#1e293b');

        if (c.type !== 'GND') {
          ctx.beginPath();
          ctx.moveTo(c.pins[0].x, c.pins[0].y);
          ctx.lineTo(c.pins[1].x, c.pins[1].y);
          ctx.stroke();

          const rot = (c.rotation || 0) % 360;
          const isVertical = (rot === 90 || rot === 270);
          const bw = isVertical ? 30 : 52;
          const bh = isVertical ? 52 : 30;
          ctx.fillRect(c.x - bw / 2, c.y - bh / 2, bw, bh);
          ctx.strokeRect(c.x - bw / 2, c.y - bh / 2, bw, bh);

          ctx.shadowBlur = 0;
          ctx.fillStyle = isGlowing ? '#020617' : (isErrorCulprit ? '#ef4444' : '#38bdf8');
          ctx.font = 'bold 10px sans-serif';
          ctx.textAlign = 'center';

          let labelTxt = `${meta.sym || c.type}`;
          if (['SWITCH', 'PUSH_BUTTON', 'RELAY'].includes(c.type)) {
            labelTxt = `${meta.sym}:${c.value === 1 ? 'ON' : 'OFF'}`;
          } else if (['CAPACITOR', 'ELEC_CAP'].includes(c.type)) {
            labelTxt = `${meta.sym}:${(c.value * 1e6).toFixed(0)}µF`;
          } else if (c.unit) {
            labelTxt = `${meta.sym}:${c.value}${c.unit}`;
          }
          ctx.fillText(labelTxt, c.x, c.y + 4);

          ctx.fillStyle = '#f59e0b';
          ctx.font = 'bold 11px sans-serif';
          if (['DC_SOURCE', 'BATTERY_9V', 'AC_SOURCE', 'SQUARE_SOURCE', 'PULSE_SOURCE', 'ELEC_CAP'].includes(c.type)) {
            ctx.fillText('+', c.pins[0].x + (isVertical ? 0 : 10), c.pins[0].y + (isVertical ? -10 : 4));
            ctx.fillText('-', c.pins[1].x + (isVertical ? 0 : 10), c.pins[1].y + (isVertical ? 14 : 4));
          } else if (['DIODE', 'SCHOTTKY', 'ZENER', 'PHOTO_DIODE'].includes(c.type) || c.type.startsWith('LED')) {
            ctx.fillText('A', c.pins[0].x + (isVertical ? 0 : 10), c.pins[0].y + (isVertical ? -8 : 4));
            ctx.fillText('K', c.pins[1].x + (isVertical ? 0 : 10), c.pins[1].y + (isVertical ? 14 : 4));
          }
        } else {
          ctx.beginPath();
          ctx.moveTo(c.pins[0].x, c.pins[0].y);
          ctx.lineTo(c.x, c.y);
          ctx.moveTo(c.x - 14, c.y); ctx.lineTo(c.x + 14, c.y);
          ctx.moveTo(c.x - 9, c.y + 5); ctx.lineTo(c.x + 9, c.y + 5);
          ctx.moveTo(c.x - 4, c.y + 10); ctx.lineTo(c.x + 4, c.y + 10);
          ctx.stroke();
        }

        c.pins.forEach((p, idx) => {
          const pinKey = c.id + '_' + idx;
          ctx.fillStyle = (pinKey === dmmPinKeyA || pinKey === dmmPinKeyB) ? '#f59e0b' : '#06b6d4';
          ctx.beginPath();
          ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
          ctx.fill();

          const v = latestPinVoltages[pinKey];
          if (v !== undefined && isSimulating) {
            ctx.fillStyle = '#10b981';
            ctx.font = 'bold 10px sans-serif';
            ctx.fillText(v.toFixed(1) + 'V', p.x - 10, p.y - 8);
          }
        });

        ctx.restore();
      });

      ctx.restore();
    }

    let lastBuzzerBeepTime = 0;

    solverWorker.onmessage = function(e) {
      const res = e.data;
      const statusEl = document.getElementById('simStatusReadout');
      errorCulpritIds = res.culpritIds || [];

      if (!res.success) {
        statusEl.style.color = '#ef4444';
        statusEl.innerText = res.errorCode;
        playSFX('error');
        showToast(res.message);
        triggerHaptic(80);
        if (isSimulating) toggleSimulation();
        drawWorkspace();
        return;
      }

      statusEl.style.color = '#10b981';
      statusEl.innerText = 'مستقر (True MNA v7)';
      latestPinVoltages = res.pinVoltages;
      document.getElementById('maxVoltReadout').innerText = `أعلى جهد: ${res.maxV.toFixed(2)}V`;

      // إذا كان هناك جرس Buzzer يمر فيه تيار والداراة قيد التشغيل، أصدر رنين الجرس
      if (isSimulating && res.activeBuzzers && res.activeBuzzers.length > 0) {
        const now = Date.now();
        if (now - lastBuzzerBeepTime > 180) {
          playSFX('buzzer_beep');
          lastBuzzerBeepTime = now;
        }
      }

      let probeKey = null;
      if (selectedComponent && selectedComponent.type !== 'GND') {
        probeKey = selectedComponent.id + '_0';
      } else if (components.length >= 3) {
        probeKey = components[2].id + '_0';
      } else {
        probeKey = Object.keys(res.pinVoltages).find(k => res.pinVoltages[k] !== 0);
      }

      const sampleV = (probeKey && res.pinVoltages[probeKey] !== undefined) ? res.pinVoltages[probeKey] : 0;
      scopeHistory.push(sampleV);
      if (scopeHistory.length > 115) scopeHistory.shift();

      updateLiveMultimeterReadout();
      drawOscilloscope();
      updateInspectorUI();
      drawWorkspace();
    };

    function triggerSingleSolve(resetState = false) {
      solverWorker.postMessage({ components, wires, time: simTime, resetState });
    }

    window.toggleSimulation = function() {
      playSFX('switch');
      isSimulating = !isSimulating;
      const btn = document.getElementById('simToggleBtn');
      if (isSimulating) {
        btn.innerText = '⏸ إيقاف';
        btn.classList.add('btn-primary');
        requestAnimationFrame(simulationLoop);
      } else {
        btn.innerText = '▶ تشغيل';
        btn.classList.remove('btn-primary');
      }
    };

    function simulationLoop() {
      if (!isSimulating) return;
      simTime += 0.02;
      solverWorker.postMessage({ components, wires, time: simTime, resetState: false });
      setTimeout(() => requestAnimationFrame(simulationLoop), 60);
    }

    function drawOscilloscope() {
      const sCanvas = document.getElementById('scopeCanvas');
      const sCtx = sCanvas.getContext('2d');
      sCtx.clearRect(0, 0, sCanvas.width, sCanvas.height);

      sCtx.strokeStyle = 'rgba(255,255,255,0.15)';
      sCtx.beginPath();
      sCtx.moveTo(0, sCanvas.height / 2);
      sCtx.lineTo(sCanvas.width, sCanvas.height / 2);
      sCtx.stroke();

      sCtx.strokeStyle = '#00ff88';
      sCtx.lineWidth = 2;
      sCtx.beginPath();
      scopeHistory.forEach((v, i) => {
        const x = (i / 115) * sCanvas.width;
        const y = (sCanvas.height / 2) - (v * 2.8);
        const clampedY = Math.max(4, Math.min(sCanvas.height - 4, y));
        if (i === 0) sCtx.moveTo(x, clampedY);
        else sCtx.lineTo(x, clampedY);
      });
      sCtx.stroke();
    }

    function getLocalProjects() {
      return JSON.parse(localStorage.getItem('aleppo_ee_projects') || '[]');
    }
    function setLocalProjects(list) {
      localStorage.setItem('aleppo_ee_projects', JSON.stringify(list));
    }
    function getLocalUsers() {
      return JSON.parse(localStorage.getItem('aleppo_ee_users_reg') || '[]');
    }
    function setLocalUsers(list) {
      localStorage.setItem('aleppo_ee_users_reg', JSON.stringify(list));
    }
    function getLocalReports() {
      return JSON.parse(localStorage.getItem('aleppo_ee_reports') || '[]');
    }
    function setLocalReports(list) {
      localStorage.setItem('aleppo_ee_reports', JSON.stringify(list));
    }

    function saveUserToLocalRegistry(u) {
      const users = getLocalUsers();
      const idx = users.findIndex(item => item.uid === u.uid || item.universityId === u.universityId);
      if (idx >= 0) users[idx] = u;
      else users.push(u);
      setLocalUsers(users);
    }

    function seedInitialDemoData() {
      if (getLocalProjects().length > 0) return;

      const demoProjects = [
        {
          id: 'proj_demo_1',
          title: 'مرشح تمرير منخفض RC - السنة الثانية',
          ownerId: 'usr_220411',
          ownerName: 'عمر خالد الحسن',
          universityId: '220411',
          forkedFrom: null,
          isPublic: true,
          ratings: [{ uid: 'usr_1', score: 5 }],
          comments: [
            { id: 'c_101', sender: 'سارة المحمد', text: 'شرح واضح جداً لاستجابة التردد', time: Date.now() - 60000 }
          ],
          schema: { components, wires },
          updatedAt: Date.now() - 3600000
        }
      ];
      setLocalProjects(demoProjects);

      const demoUsers = [
        { uid: 'usr_220411', fullName: 'عمر خالد الحسن', universityId: '220411', role: 'student', isBanned: false, lastLoginAt: Date.now() - 1800000 },
        { uid: 'usr_230819', fullName: 'مازن عبد القادر', universityId: '230819', role: 'student', isBanned: false, lastLoginAt: Date.now() - 86400000 }
      ];
      if (currentUser) demoUsers.push(currentUser);
      setLocalUsers(demoUsers);
    }

    window.openSaveProjectModal = function() {
      if (!currentUser) {
        openModal('onboardingModal');
        return;
      }
      openModal('saveProjectModal');
    };

    let currentForkedFromAuthor = null;

    window.saveCurrentProject = async function() {
      const title = escapeHTML(document.getElementById('projectTitleInput').value.trim());
      const isPublic = document.getElementById('projectPublicToggle').checked;
      if (!title) {
        playSFX('error');
        showToast("يرجى كتابة اسم المشروع أولاً.");
        return;
      }

      const proj = {
        id: 'proj_' + Date.now(),
        title,
        ownerId: activeAuthUid || currentUser.uid,
        ownerName: escapeHTML(currentUser.fullName),
        universityId: escapeHTML(currentUser.universityId),
        forkedFrom: currentForkedFromAuthor ? escapeHTML(currentForkedFromAuthor) : null,
        isPublic,
        ratings: [],
        comments: [],
        schema: JSON.parse(JSON.stringify({ components, wires })),
        updatedAt: Date.now()
      };

      const list = getLocalProjects();
      list.unshift(proj);
      setLocalProjects(list);

      if (isFirebaseReady) {
        try {
          firebaseOpsCount++;
          await setDoc(doc(db, "projects", proj.id), proj);
        } catch (e) {}
      }

      playSFX('wire');
      closeModal('saveProjectModal');
      document.getElementById('projectTitleInput').value = '';
      showToast("تم حفظ الدائرة ومزامنتها سحابياً بنجاح!");
    };

    window.openRepositoryModal = function() {
      renderRepositoryList();
      openModal('repoModal');
    };

    window.renderRepositoryList = function() {
      const container = document.getElementById('repoProjectsList');
      const queryText = (document.getElementById('smartSearchInput').value || '').trim().toLowerCase();
      const allProjects = getLocalProjects();

      const visible = allProjects.filter(p => {
        const canSee = p.isPublic || (currentUser && (p.ownerId === currentUser.uid || p.universityId === currentUser.universityId));
        if (!canSee) return false;
        if (!queryText) return true;
        return p.title.toLowerCase().includes(queryText) ||
               p.ownerName.toLowerCase().includes(queryText) ||
               (p.universityId && p.universityId.includes(queryText));
      });

      if (visible.length === 0) {
        container.innerHTML = `<p style="text-align:center; color:var(--text-muted); padding:20px;">لا توجد مشاريع مطابقة للبحث.</p>`;
        return;
      }

      container.innerHTML = visible.map(p => {
        const avgRating = p.ratings && p.ratings.length
          ? (p.ratings.reduce((acc, r) => acc + r.score, 0) / p.ratings.length).toFixed(1)
          : 'جديد';
        const isOwner = currentUser && (p.ownerId === currentUser.uid || p.universityId === currentUser.universityId);
        const safeTitle = escapeHTML(p.title);
        const safeOwner = escapeHTML(p.ownerName);
        const safeUniId = escapeHTML(p.universityId);
        const forkBadge = p.forkedFrom ? `<div style="font-size:10px; color:var(--accent-amber);">🔄 مقتبس من: ${escapeHTML(p.forkedFrom)}</div>` : '';

        const commentsHtml = (p.comments || []).map(c => `
          <div style="background:rgba(255,255,255,0.03); padding:4px 8px; border-radius:6px; margin-bottom:4px; display:flex; justify-content:space-between; font-size:11px;">
            <span><strong>${escapeHTML(c.sender)}:</strong> ${escapeHTML(c.text)}</span>
          </div>
        `).join('');

        return `
          <div class="project-card">
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
              <div>
                <strong style="font-size:14px; color:var(--accent-green);">${safeTitle}</strong>
                <div style="font-size:11px; color:var(--text-muted);">الطالب: ${safeOwner} (${safeUniId}) | التقييم: ★ ${avgRating}</div>
                ${forkBadge}
              </div>
              <span class="badge ${p.isPublic ? 'badge-public' : 'badge-private'}">${p.isPublic ? 'عام' : 'خاص'}</span>
            </div>

            <div style="display:flex; gap:6px; flex-wrap:wrap; margin-top:8px;">
              <button class="btn btn-cyan" onclick="forkAndLoadProject('${p.id}')">نسخ وتجربة (Fork)</button>
              <button class="btn" onclick="rateProject('${p.id}', 5)">★ تقييم 5</button>
              <button class="btn btn-danger" onclick="reportProjectToAdmin('${p.id}')">🚩 تبليغ للإدارة</button>
              ${isOwner ? `<button class="btn" onclick="toggleProjectPrivacy('${p.id}')">تبديل الخصوصية</button>` : ''}
            </div>

            <div style="margin-top:8px; padding-top:8px; border-top:1px dashed var(--border-soft);">
              <div style="font-size:11px; color:var(--text-muted); margin-bottom:4px;">آخر 5 تعليقات (FIFO):</div>
              ${commentsHtml || '<div style="font-size:11px; color:var(--text-muted);">لا توجد تعليقات بعد.</div>'}
              <div style="display:flex; gap:6px; margin-top:6px;">
                <input type="text" id="comm_in_${p.id}" class="form-control" style="padding:5px 8px; font-size:12px;" placeholder="أضف تعليقاً هندسياً...">
                <button class="btn btn-primary" onclick="addCommentFIFO('${p.id}')">إرسال</button>
              </div>
            </div>
          </div>
        `;
      }).join('');
    };

    window.forkAndLoadProject = function(projId) {
      const proj = getLocalProjects().find(p => p.id === projId);
      if (!proj) return;
      playSFX('drop');
      pushHistorySnapshot();
      const deepClone = JSON.parse(JSON.stringify(proj.schema));
      components = deepClone.components || [];
      components.forEach(updateComponentPins);
      wires = deepClone.wires || [];
      selectedComponent = null;
      currentForkedFromAuthor = `${proj.ownerName} (${proj.universityId})`;
      document.getElementById('forkAttributionBadge').innerText = `| مقتبس من: ${proj.ownerName}`;
      updateInspectorUI();
      closeModal('repoModal');
      triggerSingleSolve(true);
      drawWorkspace();
      showToast(`تم اقتباس وتحميل مشروع الطالب: ${proj.ownerName}`);
    };

    window.reportProjectToAdmin = async function(projId) {
      const reason = escapeHTML(prompt("يرجى كتابة سبب التبليغ (مثال: مشروع مسروق أو تعليق غير لائق):"));
      if (!reason) return;
      const proj = getLocalProjects().find(p => p.id === projId);
      if (!proj) return;

      const newReport = {
        id: 'rep_' + Date.now(),
        projectId: proj.id,
        projectTitle: escapeHTML(proj.title),
        ownerName: escapeHTML(proj.ownerName),
        reporterName: currentUser ? escapeHTML(currentUser.fullName) : 'طالب',
        reason,
        time: Date.now()
      };

      const reports = getLocalReports();
      reports.unshift(newReport);
      setLocalReports(reports);

      if (isFirebaseReady) {
        try { await setDoc(doc(db, "reports", newReport.id), newReport); } catch (e) {}
      }
      playSFX('tap');
      showToast("تم إرسال البلاغ سحابياً إلى الغرفة السرية للمراجعة.");
    };

    window.toggleProjectPrivacy = async function(projId) {
      const list = getLocalProjects();
      const p = list.find(item => item.id === projId);
      if (p) {
        playSFX('switch');
        p.isPublic = !p.isPublic;
        setLocalProjects(list);
        renderRepositoryList();
        if (isFirebaseReady) {
          try { await setDoc(doc(db, "projects", p.id), p, { merge: true }); } catch (e) {}
        }
      }
    };

    window.rateProject = async function(projId, score) {
      if (!currentUser) return;
      const list = getLocalProjects();
      const p = list.find(item => item.id === projId);
      if (!p) return;
      p.ratings = p.ratings || [];
      if (p.ratings.some(r => r.uid === currentUser.uid)) {
        showToast("لقد قمت بتقييم هذا المشروع مسبقاً.");
        return;
      }
      playSFX('wire');
      p.ratings.push({ uid: currentUser.uid, score });
      setLocalProjects(list);
      renderRepositoryList();
      if (isFirebaseReady) {
        try { await setDoc(doc(db, "projects", p.id), { ratings: p.ratings }, { merge: true }); } catch (e) {}
      }
      showToast("تم تسجيل تقييمك بنجاح!");
    };

    window.addCommentFIFO = async function(projId) {
      if (!currentUser) return;
      const inputEl = document.getElementById('comm_in_' + projId);
      const text = escapeHTML(inputEl.value.trim());
      if (!text) return;

      const list = getLocalProjects();
      const p = list.find(item => item.id === projId);
      if (!p) return;

      p.comments = p.comments || [];
      p.comments.push({
        id: 'c_' + Date.now(),
        sender: escapeHTML(currentUser.fullName),
        text,
        time: Date.now()
      });

      while (p.comments.length > 5) {
        p.comments.shift();
      }

      playSFX('tap');
      setLocalProjects(list);
      renderRepositoryList();
      if (isFirebaseReady) {
        try { await setDoc(doc(db, "projects", p.id), { comments: p.comments }, { merge: true }); } catch (e) {}
      }
    };

    let currentAdminTab = 'USERS';

    window.switchAdminTab = function(tabName) {
      playSFX('tap');
      currentAdminTab = tabName;
      renderSecretRoomDashboard();
    };

    window.renderSecretRoomDashboard = function() {
      const users = getLocalUsers();
      const projects = getLocalProjects();
      const reports = getLocalReports();
      const bannedUsers = users.filter(u => u.isBanned);
      const searchQ = (document.getElementById('adminSearchInput').value || '').trim().toLowerCase();
      const sortMode = document.getElementById('adminSortSelect').value;

      document.getElementById('statTotalUsers').innerText = users.length;
      document.getElementById('statTotalProjects').innerText = projects.length;
      document.getElementById('statBannedUsers').innerText = bannedUsers.length;
      document.getElementById('statReportsCount').innerText = reports.length;
      document.getElementById('tabReportBadge').innerText = reports.length;
      document.getElementById('statQuotaReads').innerText = ((firebaseOpsCount / 50000) * 100).toFixed(2) + '%';

      const viewport = document.getElementById('adminDynamicViewport');

      if (currentAdminTab === 'USERS' || currentAdminTab === 'BANNED') {
        const targetList = (currentAdminTab === 'BANNED' ? bannedUsers : users).filter(u => {
          if (!searchQ) return true;
          return u.fullName.toLowerCase().includes(searchQ) || u.universityId.includes(searchQ);
        });

        viewport.innerHTML = targetList.map(u => {
          const lastSeen = u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleString('ar-SY') : 'غير معروف';
          const safeName = escapeHTML(u.fullName);
          const safeUni = escapeHTML(u.universityId);
          return `
            <div class="project-card" style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap;">
              <div style="display:flex; align-items:center; gap:8px;">
                <input type="checkbox" class="admin-bulk-user" value="${u.uid}" style="width:16px; height:16px;">
                <div>
                  <strong style="font-size:13px;">${safeName}</strong>
                  <span style="font-size:11px; color:var(--text-muted);">(${safeUni})</span>
                  ${u.isBanned ? '<span class="badge" style="background:rgba(239,68,68,0.2); color:#ef4444;">محظور</span>' : ''}
                  <div style="font-size:10px; color:var(--text-muted);">آخر نشاط (Audit Log): ${lastSeen}</div>
                </div>
              </div>
              <div style="display:flex; gap:5px; flex-wrap:wrap;">
                <button class="btn" onclick="adminEditUserData('${u.uid}')">✏️ تعديل البيانات</button>
                <button class="btn" onclick="adminToggleBan('${u.uid}')">${u.isBanned ? 'فك الحظر' : 'حظر'}</button>
                <button class="btn btn-danger" onclick="adminCascadingDeleteUser('${u.uid}')">حذف نهائي</button>
              </div>
            </div>
          `;
        }).join('') || '<p style="text-align:center; color:var(--text-muted); padding:16px;">لا توجد سجلات مطابقة.</p>';

      } else if (currentAdminTab === 'PROJECTS') {
        let filteredProjs = projects.filter(p => {
          if (!searchQ) return true;
          return p.title.toLowerCase().includes(searchQ) || p.ownerName.toLowerCase().includes(searchQ);
        });

        if (sortMode === 'RATING') {
          filteredProjs.sort((a, b) => (b.ratings?.length || 0) - (a.ratings?.length || 0));
        } else if (sortMode === 'COMMENTS') {
          filteredProjs.sort((a, b) => (b.comments?.length || 0) - (a.comments?.length || 0));
        } else {
          filteredProjs.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
        }

        viewport.innerHTML = filteredProjs.map(p => {
          const safeTitle = escapeHTML(p.title);
          const safeOwner = escapeHTML(p.ownerName);
          const safeUni = escapeHTML(p.universityId);

          const commentsModerationHtml = (p.comments || []).map((c, cIdx) => `
            <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.04); padding:3px 6px; border-radius:4px; margin-top:3px; font-size:11px;">
              <span><strong>${escapeHTML(c.sender)}:</strong> ${escapeHTML(c.text)}</span>
              <button class="btn btn-danger" style="padding:1px 5px; font-size:9px;" onclick="adminDeleteSingleComment('${p.id}', ${cIdx})">حذف التعليق ✖</button>
            </div>
          `).join('');

          return `
            <div class="project-card">
              <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px;">
                <div style="display:flex; align-items:center; gap:8px;">
                  <input type="checkbox" class="admin-bulk-proj" value="${p.id}" style="width:16px; height:16px;">
                  <div>
                    <strong style="font-size:13px; color:var(--accent-green);">${safeTitle}</strong>
                    <div style="font-size:11px; color:var(--text-muted);">الطالب: ${safeOwner} (${safeUni}) | الحالة: ${p.isPublic ? 'عام' : 'خاص'}</div>
                  </div>
                </div>
                <div style="display:flex; gap:5px;">
                  <button class="btn btn-cyan" onclick="adminPreviewProject('${p.id}')">👁️ معاينة الدائرة</button>
                  <button class="btn btn-danger" onclick="adminDeleteProject('${p.id}')">حذف المشروع</button>
                </div>
              </div>
              ${commentsModerationHtml ? `<div style="margin-top:6px; padding-top:6px; border-top:1px dashed var(--border-soft);">${commentsModerationHtml}</div>` : ''}
            </div>
          `;
        }).join('') || '<p style="text-align:center; color:var(--text-muted); padding:16px;">لا توجد مشاريع.</p>';

      } else if (currentAdminTab === 'REPORTS') {
        viewport.innerHTML = reports.map(r => `
          <div class="project-card" style="border-color:var(--accent-amber); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
            <div>
              <strong style="color:var(--accent-amber); font-size:13px;">🚩 بلاغ على مشروع: ${escapeHTML(r.projectTitle)} (${escapeHTML(r.ownerName)})</strong>
              <div style="font-size:12px;">السبب: ${escapeHTML(r.reason)}</div>
              <div style="font-size:10px; color:var(--text-muted);">المُبلّغ: ${escapeHTML(r.reporterName)}</div>
            </div>
            <div style="display:flex; gap:6px;">
              <button class="btn btn-cyan" onclick="adminPreviewProject('${r.projectId}')">معاينة</button>
              <button class="btn btn-danger" onclick="adminDeleteProject('${r.projectId}'); dismissReport('${r.id}')">حذف المشروع</button>
              <button class="btn" onclick="dismissReport('${r.id}')">تجاهل البلاغ ✓</button>
            </div>
          </div>
        `).join('') || '<p style="text-align:center; color:var(--text-muted); padding:16px;">لا توجد تبليغات معلقة.</p>';
      }
    };

    window.adminEditUserData = async function(uid) {
      const users = getLocalUsers();
      const u = users.find(item => item.uid === uid);
      if (!u) return;
      const newName = escapeHTML(prompt("تعديل الاسم الثلاثي للطالب:", u.fullName));
      if (!newName) return;
      const newUniId = escapeHTML(prompt("تعديل الرقم الجامعي (6 خانات):", u.universityId));
      if (!newUniId) return;

      u.fullName = newName.trim();
      u.universityId = newUniId.trim();
      setLocalUsers(users);
      renderSecretRoomDashboard();
      if (isFirebaseReady) {
        try { await setDoc(doc(db, "users", u.uid), u, { merge: true }); } catch (e) {}
      }
      showToast("تم تحديث بيانات الطالب سحابياً.");
    };

    window.adminPreviewProject = function(projId) {
      const p = getLocalProjects().find(item => item.id === projId);
      if (!p) {
        showToast("المشروع غير موجود.");
        return;
      }
      const comps = p.schema?.components || [];
      const ws = p.schema?.wires || [];
      document.getElementById('previewModalTitle').innerText = `معاينة: ${p.title}`;
      document.getElementById('previewModalBody').innerHTML = `
        <p><strong>المالك:</strong> ${escapeHTML(p.ownerName)} (${escapeHTML(p.universityId)})</p>
        <p><strong>عدد العناصر الإلكترونية:</strong> ${comps.length} عنصر | <strong>عدد الأسلاك:</strong> ${ws.length} سلك</p>
        <div style="margin:8px 0; padding:8px; background:var(--bg-dark); border-radius:8px;">
          ${comps.map(c => `<span class="badge badge-public" style="margin:2px; display:inline-block;">${c.type} (${c.value}${c.unit})</span>`).join('')}
        </div>
        <button class="btn btn-primary" style="width:100%; justify-content:center; margin-top:8px;" onclick="closeModal('adminPreviewModal'); closeModal('secretRoomModal'); forkAndLoadProject('${p.id}')">
          فتح الدائرة في المحاكي لفحصها عملياً
        </button>
      `;
      openModal('adminPreviewModal');
    };

    window.adminDeleteSingleComment = async function(projId, commentIdx) {
      const list = getLocalProjects();
      const p = list.find(item => item.id === projId);
      if (p && p.comments) {
        p.comments.splice(commentIdx, 1);
        setLocalProjects(list);
        renderSecretRoomDashboard();
        if (isFirebaseReady) {
          try { await setDoc(doc(db, "projects", p.id), { comments: p.comments }, { merge: true }); } catch (e) {}
        }
        playSFX('delete');
        showToast("تم حذف التعليق بنجاح.");
      }
    };

    window.dismissReport = async function(repId) {
      const list = getLocalReports().filter(r => r.id !== repId);
      setLocalReports(list);
      renderSecretRoomDashboard();
      if (isFirebaseReady) {
        try { await deleteDoc(doc(db, "reports", repId)); } catch (e) {}
      }
    };

    window.executeBulkBanSelected = async function() {
      const checked = Array.from(document.querySelectorAll('.admin-bulk-user:checked')).map(el => el.value);
      if (checked.length === 0) {
        showToast("يرجى تحديد طالب واحد على الأقل.");
        return;
      }
      const users = getLocalUsers();
      for (const u of users) {
        if (checked.includes(u.uid) && (!currentUser || u.universityId !== "1461997")) {
          u.isBanned = true;
          if (isFirebaseReady) {
            try { await setDoc(doc(db, "users", u.uid), { isBanned: true }, { merge: true }); } catch (e) {}
          }
        }
      }
      setLocalUsers(users);
      renderSecretRoomDashboard();
      showToast(`تم حظر ${checked.length} طلاب دفعة واحدة.`);
    };

    window.executeBulkDeleteSelected = async function() {
      const checkedUsers = Array.from(document.querySelectorAll('.admin-bulk-user:checked')).map(el => el.value);
      const checkedProjs = Array.from(document.querySelectorAll('.admin-bulk-proj:checked')).map(el => el.value);
      if (checkedUsers.length === 0 && checkedProjs.length === 0) {
        showToast("يرجى تحديد عناصر للحذف أولاً.");
        return;
      }
      if (!confirm("تأكيد الحذف الجماعي النهائي للعناصر المحددة؟")) return;

      if (checkedUsers.length > 0) {
        const users = getLocalUsers().filter(u => !checkedUsers.includes(u.uid) || u.universityId === "1461997");
        setLocalUsers(users);
        const projs = getLocalProjects().filter(p => !checkedUsers.includes(p.ownerId));
        setLocalProjects(projs);
        if (isFirebaseReady) {
          for (const uid of checkedUsers) {
            try { await deleteDoc(doc(db, "users", uid)); } catch (e) {}
          }
        }
      }
      if (checkedProjs.length > 0) {
        const projs = getLocalProjects().filter(p => !checkedProjs.includes(p.id));
        setLocalProjects(projs);
        if (isFirebaseReady) {
          for (const pid of checkedProjs) {
            try { await deleteDoc(doc(db, "projects", pid)); } catch (e) {}
          }
        }
      }
      playSFX('delete');
      renderSecretRoomDashboard();
      showToast("تم تنفيذ الحذف الجماعي السحابي بنجاح.");
    };

    window.publishGlobalAnnouncement = async function() {
      const txt = escapeHTML(document.getElementById('adminAnnouncementInput').value.trim());
      if (!txt) return;
      localStorage.setItem('aleppo_ee_announcement', txt);
      loadGlobalAnnouncementBanner();
      if (isFirebaseReady) {
        try { await setDoc(doc(db, "announcements", "global"), { text: txt, updatedAt: Date.now() }); } catch (e) {}
      }
      playSFX('wire');
      showToast("تم بث الإعلان العام سحابياً لجميع طلاب الكلية 📢");
    };

    window.clearGlobalAnnouncement = async function() {
      localStorage.removeItem('aleppo_ee_announcement');
      loadGlobalAnnouncementBanner();
      if (isFirebaseReady) {
        try { await setDoc(doc(db, "announcements", "global"), { text: "", updatedAt: Date.now() }); } catch (e) {}
      }
      showToast("تم إخفاء الإعلان العام.");
    };

    function loadGlobalAnnouncementBanner() {
      const txt = localStorage.getItem('aleppo_ee_announcement');
      const banner = document.getElementById('globalAnnouncementBanner');
      const topBar = document.getElementById('topBar');
      if (txt) {
        banner.innerText = `📢 إعلان عمادة الهندسة الإلكترونية: ${txt}`;
        banner.style.display = 'flex';
        topBar.style.top = '26px';
      } else {
        banner.style.display = 'none';
        topBar.style.top = '0px';
      }
    }

    window.exportStudentsToCSV = function() {
      const users = getLocalUsers();
      let csvContent = "\uFEFFالاسم الثلاثي,الرقم الجامعي,الدور,حالة الحظر,آخر دخول\n";
      users.forEach(u => {
        const lastDate = u.lastLoginAt ? new Date(u.lastLoginAt).toISOString() : '';
        csvContent += `"${u.fullName}","${u.universityId}","${u.role}","${u.isBanned ? 'محظور' : 'نشط'}","${lastDate}"\n`;
      });
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `Aleppo_EE_Students_${Date.now()}.csv`;
      link.click();
      showToast("تم تصدير قائمة الطلاب بصيغة CSV بنجاح 📥");
    };

    window.exportDatabaseBackupJSON = function() {
      const backup = {
        exportedAt: new Date().toISOString(),
        exportedBy: "معاذ حسين العلي (1461997)",
        users: getLocalUsers(),
        projects: getLocalProjects(),
        reports: getLocalReports()
      };
      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `Aleppo_EE_Full_Backup_${Date.now()}.json`;
      link.click();
      showToast("تم تحميل النسخة الاحتياطية الشاملة (JSON) 💾");
    };

    window.lockAllProjectsForExams = async function() {
      if (!confirm("طوارئ الامتحانات: سيتم تحويل جميع مشاريع الطلاب العامة إلى (خاصة) فوراً لمنع الغش. هل أنت متأكد؟")) return;
      const list = getLocalProjects();
      for (const p of list) {
        p.isPublic = false;
        if (isFirebaseReady) {
          try { await setDoc(doc(db, "projects", p.id), { isPublic: false }, { merge: true }); } catch (e) {}
        }
      }
      setLocalProjects(list);
      renderSecretRoomDashboard();
      showToast("🔒 تم إغلاق جميع المشاريع العامة سحابياً وتفعيل وضع الامتحانات!");
    };

    window.adminToggleBan = async function(targetUid) {
      const users = getLocalUsers();
      const target = users.find(u => u.uid === targetUid);
      if (!target) return;
      if (target.universityId === "1461997") {
        showToast("عملية مرفوضة: لا يمكنك حظر حساب الإدارة الخاص بك.");
        return;
      }
      target.isBanned = !target.isBanned;
      setLocalUsers(users);
      renderSecretRoomDashboard();
      if (isFirebaseReady) {
        try { await setDoc(doc(db, "users", target.uid), { isBanned: target.isBanned }, { merge: true }); } catch (e) {}
      }
      showToast(`تم تحديث حالة الطالب سحابياً: ${target.fullName}`);
    };

    window.adminCascadingDeleteUser = async function(targetUid) {
      const users = getLocalUsers();
      const target = users.find(u => u.uid === targetUid);
      if (target && target.universityId === "1461997") {
        showToast("لا يمكنك حذف حساب المسؤول.");
        return;
      }
      if (!confirm("تحذير: سيتم حذف الطالب وجميع مشاريعه نهائياً. هل أنت متأكد؟")) return;

      const userProjs = getLocalProjects().filter(p => p.ownerId === targetUid);
      setLocalUsers(users.filter(u => u.uid !== targetUid));
      setLocalProjects(getLocalProjects().filter(p => p.ownerId !== targetUid));
      renderSecretRoomDashboard();

      if (isFirebaseReady) {
        try {
          await deleteDoc(doc(db, "users", targetUid));
          for (const up of userProjs) {
            await deleteDoc(doc(db, "projects", up.id));
          }
        } catch (e) {}
      }
      showToast("تم مسح الطالب ومشاريعه من السحابة وسجلات الكلية.");
    };

    window.adminDeleteProject = async function(projId) {
      setLocalProjects(getLocalProjects().filter(p => p.id !== projId));
      renderSecretRoomDashboard();
      if (isFirebaseReady) {
        try { await deleteDoc(doc(db, "projects", projId)); } catch (e) {}
      }
      showToast("تم حذف المشروع سحابياً بنجاح.");
    };

    window.openModal = function(id) {
      if (id === 'secretRoomModal') renderSecretRoomDashboard();
      document.getElementById(id).classList.add('active');
    };

    window.closeModal = function(id) {
      playSFX('tap');
      document.getElementById(id).classList.remove('active');
    };

    window.showToast = function(msg) {
      const box = document.getElementById('toastBox');
      box.innerText = msg;
      box.style.display = 'block';
      clearTimeout(window._toastTimer);
      window._toastTimer = setTimeout(() => { box.style.display = 'none'; }, 3600);
    };

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').catch(() => {});
      });
    }

    window.addEventListener('DOMContentLoaded', () => {
      renderCategoryToolbar();
      loadCircuitTemplate('LED_BUZZER');
      resizeCanvas();
      initUserSession();
      triggerSingleSolve(true);
    });
  </script>
</body>
</html>
