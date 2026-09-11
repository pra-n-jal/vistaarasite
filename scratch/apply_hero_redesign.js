const fs = require('fs');

const originalHtml = fs.readFileSync('index.html', 'utf8');
fs.writeFileSync('index.html.bak', originalHtml);

const lines = originalHtml.split('\n');

// 1. Replace lines 100 to 305 (0-indexed, so slice(0, 100) + heroReplacement + slice(306))
const heroReplacement = `    <!-- ========================================================================
         EDITORIAL BRUTALIST HERO: SPLIT-SCREEN INVERTED MONUMENT
         ======================================================================== -->
    <section class="editorial-hero" id="hero">
      
      <!-- Upper Zone: Dark Grayscale Photography & Lead Hierarchy -->
      <div class="hero-upper-zone">
        
        <!-- Left Column: Vertical Index Nav + Lead + Tagline + Monumental VISTAARA Title -->
        <div class="hero-upper-left">
          
          <!-- Mini Left Vertical Nav Strip (Matches Reference Left Column) -->
          <nav class="hero-vertical-nav" aria-label="Hero Index">
            <a href="#hero" class="hero-nav-item">HOME</a>
            <a href="#tracks" class="hero-nav-item">TRACKS</a>
            <a href="#evaluator" class="hero-nav-item">EVALUATOR</a>
            <a href="#timeline" class="hero-nav-item">SCHEDULE</a>
            <a href="#manifesto" class="hero-nav-item">MANIFESTO</a>
            <a href="#terminal" class="hero-nav-item">TERMINAL</a>
            <button type="button" class="hero-nav-item open-register-modal-btn">PASS</button>
          </nav>

          <!-- Lead Editorial Paragraph & Monumental VISTAARA Title -->
          <div class="hero-lead-block">
            <p class="hero-editorial-lead">
              A BRUTAL, BEAUTIFUL SPRINT ACROSS SYSTEMS, ARCHITECTURE, AND THE EDGE OF PRODUCTION CODE.
            </p>
            <div class="hero-tagline-mono">
              ENDURE. ARCHITECT. SHIP.
            </div>
            <!-- Colossal Condensed Headline -->
            <h1 class="hero-monumental-title">VISTAARA</h1>
          </div>

        </div>

        <!-- Right Column: Upper Half of Monumental 100 in High-Volt Acid Neon -->
        <div class="hero-upper-right">
          <div class="monumental-number num-upper" aria-label="100">100</div>
        </div>

      </div>

      <!-- Lower Zone: Solid High-Volt Acid Neon Block + Split Inverted Number -->
      <div class="hero-lower-zone">
        
        <!-- Left Solid Acid Neon Block -->
        <div class="hero-lower-left-neon">
          <p class="neon-manifesto-text">
            NATIONAL STUDENT HACKATHON IS RAW, HONEST, AND UNCOMPROMISING. <strong>VISTAARA 2026</strong> EXPOSES YOUR GRIT, TESTS YOUR ARCHITECTURE, AND SHAPES YOUR PRODUCTION CRAFT. THIS EVENT CELEBRATES ENDURANCE, PUSHING YOU TO SHIP REAL WORKING PLATFORMS.
          </p>

          <!-- Live Countdown to Sprint Day -->
          <div class="neon-countdown-module">
            <div class="neon-countdown-label">COUNTDOWN TO SPRINT DAY</div>
            <div class="neon-countdown-digits" id="heroMonumentCountdown">
              <span id="heroNeonDays">28</span> : <span id="heroNeonHours">05</span> : <span id="heroNeonMins">07</span> : <span id="heroNeonSecs">50</span>
            </div>
          </div>

          <!-- Direct Claim Action -->
          <div class="neon-cta-row">
            <button class="neon-claim-btn open-register-modal-btn" type="button">
              <span>CLAIM BUILDER PASS [OPENS 7 OCT]</span>
              <span class="neon-btn-arrow">↗</span>
            </button>
            <a href="#tracks" class="neon-explore-link">EXPLORE TRACKS →</a>
          </div>
        </div>

        <!-- Right Split Inverted Number -->
        <div class="hero-lower-right-split">
          <!-- Left portion of 100: Neon Background with Black Digits -->
          <div class="split-half-neon">
            <div class="monumental-number num-lower-black" aria-hidden="true">100</div>
          </div>
          <!-- Right portion of 100: Dark Background with Neon Digits -->
          <div class="split-half-dark">
            <div class="monumental-number num-lower-neon" aria-hidden="true">100</div>
          </div>
        </div>

      </div>

    </section>

    <!-- Full-Width Horizontal Triptych Strip: BUILD • SOLVE • CONNECT -->
    <section class="triptych-banner" aria-label="Vistaara Core Pillars">
      <div class="triptych-col triptych-build" tabindex="0">
        <img src="assets/strip-build.jpg" alt="Build" class="triptych-bg-img">
        <div class="triptych-overlay"></div>
        <div class="triptych-word">BUILD</div>
      </div>
      <div class="triptych-col triptych-solve" tabindex="0">
        <img src="assets/strip-solve.jpg" alt="Solve" class="triptych-bg-img">
        <div class="triptych-overlay"></div>
        <div class="triptych-word">SOLVE</div>
      </div>
      <div class="triptych-col triptych-connect" tabindex="0">
        <img src="assets/strip-connect.jpg" alt="Connect" class="triptych-bg-img">
        <div class="triptych-overlay"></div>
        <div class="triptych-word">CONNECT</div>
      </div>
    </section>

    <!-- ========================================================================
         INTERACTIVE BUILDER TERMINAL & PASS GATEWAY (Preserves Full Functionality)
         ======================================================================== -->
    <section class="command-terminal-section" id="terminal">
      <div class="command-terminal-container">
        
        <div class="command-terminal-head">
          <div>
            <div class="hud-badge" style="margin-bottom: 8px;">
              <span class="radar-pulse"></span>
              <span>VERIFICATION ENGINE · GATEWAY ACTIVE</span>
            </div>
            <h2 class="command-terminal-title">COMMAND CONSOLE &amp; PASS GATEWAY</h2>
            <p class="command-terminal-desc">Inspect configuration, verify team access codes, and generate official high-res digital builder credentials.</p>
          </div>
          <div style="display: flex; gap: 10px; align-items: center;">
            <div class="coordinates-badge">
              <span>28°38'N 77°13'E • <span id="heroLiveClock">--:--:-- IST</span></span>
            </div>
            <button class="sound-chip-btn" id="audioToggleBtn" type="button" title="Toggle Sound FX" aria-label="Toggle Sound Effects">
              <span class="audio-icon">VOL</span>
              <span class="sound-label">AUDIO FX</span>
            </button>
          </div>
        </div>

        <!-- Terminal Card Bracket -->
        <div class="hero-terminal-card bracket" style="margin: 0 auto; max-width: 100%;">
          <div class="terminal-tape-corner">DO NOT CROSS • BUILDER DECK</div>
          
          <div class="terminal-header">
            <div class="terminal-controls">
              <span class="terminal-dot dot-red"></span>
              <span class="terminal-dot dot-yellow"></span>
              <span class="terminal-dot dot-green"></span>
            </div>
            <div class="terminal-nav-tabs">
              <button class="terminal-tab-btn active" id="termTabManifest" type="button">MANIFEST</button>
              <button class="terminal-tab-btn" id="termTabPass" type="button">CLAIM PASS</button>
              <button class="terminal-tab-btn" id="termTabBadge" type="button" style="display: none;">YOUR PASS</button>
            </div>
            <div class="terminal-status-badge">REGISTRATION OPEN</div>
          </div>

          <!-- View 1: Interactive System Manifest -->
          <div class="terminal-body" id="termViewManifest">
            
            <!-- Metrics Grid -->
            <div class="terminal-metric-grid">
              <div class="terminal-metric-box">
                <div class="terminal-metric-label">ELIGIBILITY</div>
                <div class="terminal-metric-val" style="color: var(--neon);">Ages 14–26</div>
              </div>
              <div class="terminal-metric-box">
                <div class="terminal-metric-label">SCALE &amp; CAPACITY</div>
                <div class="terminal-metric-val">200–300 Builders</div>
              </div>
              <div class="terminal-metric-box">
                <div class="terminal-metric-label">CORE DISCIPLINES</div>
                <div class="terminal-metric-val" style="color: var(--neon);">App &amp; Web</div>
              </div>
              <div class="terminal-metric-box">
                <div class="terminal-metric-label">INTELLECTUAL PROPERTY</div>
                <div class="terminal-metric-val">100% Builder-Owned</div>
              </div>
            </div>

            <!-- 4 Stages Progress Row (Clickable) -->
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <span style="font-family: var(--font-mono); font-size: 0.68rem; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.04em;">
                  EXPERIENTIAL SPRINT ROADMAP:
                </span>
                <span style="font-family: var(--font-mono); font-size: 0.62rem; color: var(--neon); font-weight: 700;">
                  CLICK STAGE TO INSPECT
                </span>
              </div>
              <div class="terminal-stage-row">
                <div class="terminal-stage-chip" data-stage="1" tabindex="0" role="button" aria-label="Stage 1 Explore">
                  <div class="terminal-stage-num">STAGE 01</div>
                  <div class="terminal-stage-name">EXPLORE</div>
                </div>
                <div class="terminal-stage-chip active" data-stage="2" tabindex="0" role="button" aria-label="Stage 2 Build">
                  <div class="terminal-stage-num">STAGE 02</div>
                  <div class="terminal-stage-name">BUILD</div>
                </div>
                <div class="terminal-stage-chip" data-stage="3" tabindex="0" role="button" aria-label="Stage 3 Connect">
                  <div class="terminal-stage-num">STAGE 03</div>
                  <div class="terminal-stage-name">CONNECT</div>
                </div>
                <div class="terminal-stage-chip" data-stage="4" tabindex="0" role="button" aria-label="Stage 4 Demo">
                  <div class="terminal-stage-num">STAGE 04</div>
                  <div class="terminal-stage-name">DEMO</div>
                </div>
              </div>
            </div>

            <!-- Live Configuration Code Block -->
            <div class="terminal-code-block" id="terminalCodeOutput">
              <div><span class="code-kw">const</span> vistaaraConfig = {</div>
              <div>&nbsp;&nbsp;edition: <span class="code-str">"National Student Hackathon 2026"</span>,</div>
              <div>&nbsp;&nbsp;tracks: [<span class="code-str">"App Development"</span>, <span class="code-str">"Web Development"</span>],</div>
              <div>&nbsp;&nbsp;focusThemes: <span class="code-val">10</span>, <span class="code-str">/* AI, Cloud, CyberSec, FinTech... */</span></div>
              <div>&nbsp;&nbsp;mentorship: <span class="code-str">"15+ Tech Leaders &amp; Founders"</span>,</div>
              <div>&nbsp;&nbsp;output: <span class="code-str">"Live Working Prototypes"</span></div>
              <div>};</div>
            </div>

            <div style="display: flex; gap: 10px; margin-top: 4px;">
              <button class="neon-claim-btn open-register-modal-btn" id="heroClaimPassBtn" style="flex: 1; justify-content: center;" type="button">
                <span>Claim Builder Pass [Opens 7 Oct]</span>
                <span>→</span>
              </button>
            </div>

          </div>

          <!-- View 2: Terminal Inline Builder Pass Generator -->
          <div class="terminal-body" id="termViewPass" style="display: none;">
            
            <!-- 7 Oct 2026 Date Gating Notice & Countdown HUD -->
            <div class="pass-date-gate-banner" id="termDateGateBanner">
              <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 6px;">
                <div class="gate-status-pill locked" id="termGateStatusPill">
                  <span class="gate-status-dot"></span>
                  <span id="termGateStatusText">TURNS ON 7 OCT 2026 ONWARDS</span>
                </div>
                <div style="display: flex; gap: 6px;">
                  <button type="button" class="gate-toggle-preview-btn" id="termTogglePreviewBtn">
                    Preview / Test Mode
                  </button>
                  <button type="button" class="term-mini-demo-btn" id="termQuickDemoBtn">
                    Demo Code
                  </button>
                </div>
              </div>

              <div class="gate-title" id="termGateTitle">
                BUILDER PASS GATEWAY OPENS 7 OCTOBER 2026
              </div>

              <p class="gate-desc" id="termGateDesc">
                Unique verification codes are dispatched via mail 10 days before the event (7 October 2026). Pass claiming officially turns on on <strong>7 October 2026 onwards</strong>.
              </p>

              <div class="gate-countdown-bar" id="termCountdownBar">
                <div class="count-unit"><span class="count-val" id="termCountDays">00</span><span class="count-lbl">DAYS</span></div>
                <div class="count-unit"><span class="count-val" id="termCountHours">00</span><span class="count-lbl">HOURS</span></div>
                <div class="count-unit"><span class="count-val" id="termCountMins">00</span><span class="count-lbl">MINS</span></div>
                <div class="count-unit"><span class="count-val" id="termCountSecs">00</span><span class="count-lbl">SECS</span></div>
              </div>

              <div class="gate-warning-note" id="termGateWarningNote">
                Pass minting is date-gated. Use Preview Mode to test your pass configuration before 7 Oct 2026.
              </div>
            </div>

            <!-- Pass Claim Input Form -->
            <div style="display: flex; flex-direction: column; gap: 10px;">
              <div>
                <label style="display: block; font-family: var(--font-mono); font-size: 0.65rem; color: #cbd5e1; text-transform: uppercase; margin-bottom: 4px;">
                  Unique Mail Code (Dispatched 10 Days Prior):
                </label>
                <input type="text" id="termPassCode" class="term-input" placeholder="e.g. VST-8842-X7" value="VST-2026-X89">
              </div>

              <div>
                <label style="display: block; font-family: var(--font-mono); font-size: 0.65rem; color: #cbd5e1; text-transform: uppercase; margin-bottom: 4px;">
                  Registered Team Name:
                </label>
                <input type="text" id="termTeamName" class="term-input" placeholder="e.g. Orbit Builders" value="ORBIT BUILDERS">
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                <div>
                  <label style="display: block; font-family: var(--font-mono); font-size: 0.65rem; color: #cbd5e1; text-transform: uppercase; margin-bottom: 4px;">
                    Track Category:
                  </label>
                  <select id="termTrackSelect" class="term-input">
                    <option value="App Development Track">App Development</option>
                    <option value="Web Development Track">Web Development</option>
                    <option value="Emerging Systems &amp; AI">Emerging Systems &amp; AI</option>
                  </select>
                </div>
                <div>
                  <label style="display: block; font-family: var(--font-mono); font-size: 0.65rem; color: #cbd5e1; text-transform: uppercase; margin-bottom: 4px;">
                    Focus Theme:
                  </label>
                  <select id="termThemeSelect" class="term-input">
                    <option value="AI Central">AI Central</option>
                    <option value="Cyber Security">Cyber Security</option>
                    <option value="Cloud Computing">Cloud Computing</option>
                    <option value="FinTech">FinTech</option>
                    <option value="Blockchain">Blockchain</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="IoT">IoT</option>
                    <option value="Web3">Web3</option>
                    <option value="Education">Education</option>
                    <option value="Sustainability">Sustainability</option>
                  </select>
                </div>
              </div>
            </div>

            <div style="display: flex; gap: 8px; margin-top: 14px;">
              <button class="neon-claim-btn" id="termGeneratePassBtn" style="flex: 1; justify-content: center;" type="button">
                <span id="termGeneratePassBtnContent">Generate Official Pass →</span>
              </button>
            </div>

          </div>

          <!-- View 3: Live In-Terminal VIP Builder Badge Display -->
          <div class="terminal-body" id="termViewBadge" style="display: none;">
            <div class="term-badge-wrapper">
              <div class="term-badge-header">
                <img src="assets/logo.png" alt="Vistaar Logo" style="height: 32px; width: auto; object-fit: contain; filter: drop-shadow(0 0 8px rgba(217, 255, 0, 0.4));">
                <div>
                  <div style="font-family: var(--font-display); font-size: 0.95rem; font-weight: 900; color: #fff;">VISTAARA 2026</div>
                  <div style="font-family: var(--font-mono); font-size: 0.58rem; color: var(--neon); font-weight: 700;">VIP BUILDER CREDENTIAL</div>
                </div>
                <span class="badge-serial-stencil" id="termPassCardSerial" style="margin-left: auto; font-size: 0.72rem;">VST-2026-X89</span>
              </div>

              <div class="term-badge-body" style="margin-top: 10px;">
                <div class="badge-field-label">TEAM CALL-SIGN</div>
                <div class="badge-team-hero" id="termPassCardTeam" style="font-size: 1.45rem; line-height: 1.1;">ORBIT BUILDERS</div>
                
                <div class="badge-tag-pills" style="margin: 6px 0;">
                  <span class="badge-tag-track" id="termPassCardTrack" style="font-size: 0.62rem;">APP DEVELOPMENT</span>
                  <span class="badge-tag-theme" id="termPassCardTheme" style="font-size: 0.62rem;">AI CENTRAL</span>
                </div>

                <div style="display: grid; grid-template-columns: 1fr auto; gap: 12px; align-items: center; margin-top: 8px;">
                  <div style="font-family: var(--font-mono); font-size: 0.65rem; color: #94a3b8; display: flex; flex-direction: column; gap: 4px;">
                    <div>LEAD: <strong id="termPassCardCaptain" style="color: #fff;">ARYAN SHARMA</strong></div>
                    <div>STATUS: <strong style="color: #4ade80;">10-DAY MAIL VERIFIED</strong></div>
                    <div>ACCESS: <span style="color: #e2e8f0;">ALL ARENA &amp; MAKER LABS</span></div>
                  </div>

                  <!-- Mini QR Code Matrix -->
                  <div class="scannable-qr-wrap" style="width: 85px; height: 85px; padding: 4px;">
                    <div class="qr-laser-scanner"></div>
                    <svg class="badge-qr-svg" viewBox="0 0 120 120" width="75" height="75" aria-label="Official Pass QR Code">
                      <rect width="120" height="120" fill="#ffffff" rx="3"/>
                      <rect x="10" y="10" width="34" height="34" fill="#0c101c"/>
                      <rect x="16" y="16" width="22" height="22" fill="#ffffff"/>
                      <rect x="21" y="21" width="12" height="12" fill="#D9FF00"/>
                      <rect x="76" y="10" width="34" height="34" fill="#0c101c"/>
                      <rect x="82" y="16" width="22" height="22" fill="#ffffff"/>
                      <rect x="87" y="21" width="12" height="12" fill="#D9FF00"/>
                      <rect x="10" y="76" width="34" height="34" fill="#0c101c"/>
                      <rect x="16" y="82" width="22" height="22" fill="#ffffff"/>
                      <rect x="21" y="87" width="12" height="12" fill="#D9FF00"/>
                      <rect x="52" y="14" width="16" height="8" fill="#D9FF00"/>
                      <rect x="52" y="28" width="8" height="14" fill="#D9FF00"/>
                      <rect x="50" y="50" width="20" height="20" fill="#D9FF00"/>
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Terminal Pass Actions -->
              <div style="display: flex; gap: 8px; margin-top: 12px; flex-wrap: wrap;">
                <button class="neon-claim-btn" id="termDownloadBadgeBtn" style="flex: 1; min-width: 140px; justify-content: center;" type="button">
                  <span>Download Pass ↓</span>
                </button>
                <button class="term-mini-demo-btn" id="termOpenModalBtn" type="button" style="padding: 8px 12px; font-size: 0.75rem;">
                  Fullscreen Modal ↗
                </button>
                <button class="term-mini-demo-btn" id="termEditPassBtn" type="button" style="padding: 8px 10px; font-size: 0.75rem; border-color: #64748b; color: #94a3b8;">
                  ← Edit
                </button>
              </div>
            </div>
          </div>

        </div>

        <!-- Clean Minimalist Stats & Countdown Strip -->
        <div class="hero-stats-strip" style="margin-top: 32px;">
          <div class="stat-item">
            <span class="stat-value" style="color: var(--neon); font-size: 1.5rem;">TO BE ANNOUNCED</span>
            <span class="stat-label">Prize Pool &amp; Seed Grants</span>
          </div>
          <div class="stat-item">
            <span class="stat-value" style="color: #FFFFFF;">200–300</span>
            <span class="stat-label">Student Builders (Ages 14–26)</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">50+ TEAMS</span>
            <span class="stat-label">Original App &amp; Web Products</span>
          </div>
          <div class="stat-item">
            <span class="stat-value" style="color: var(--neon);">15+ MENTORS</span>
            <span class="stat-label">10+ Tech Companies &amp; Founders</span>
          </div>
          <div class="countdown-box">
            <div class="countdown-label">
              <span>T-MINUS HACKATHON LAUNCH</span>
              <span class="radar-pulse" style="width: 5px; height: 5px; background: var(--neon);"></span>
            </div>
            <div class="countdown-digits">
              <div class="countdown-unit"><span id="cntDays">42</span><span class="unit-name">DAYS</span></div>
              <span>:</span>
              <div class="countdown-unit"><span id="cntHours">08</span><span class="unit-name">HRS</span></div>
              <span>:</span>
              <div class="countdown-unit"><span id="cntMins">30</span><span class="unit-name">MIN</span></div>
              <span>:</span>
              <div class="countdown-unit"><span id="cntSecs" style="color: var(--neon);">00</span><span class="unit-name">SEC</span></div>
            </div>
          </div>
        </div>

      </div>
    </section>`;

const newLines = [
  ...lines.slice(0, 100),
  heroReplacement,
  ...lines.slice(306)
];

let updatedHtml = newLines.join('\n');

// 2. Add the Editorial Section Header to Tracks & Themes
const oldTracksHeader = `<div class="section-title-wrap text-center">
        <div class="section-eyebrow">CHALLENGE DOMAINS</div>
        <h2 class="section-heading">Tracks & 10 Focus Themes</h2>
        <p class="section-desc">
          Pick one primary discipline. Explore 10 high-impact problem themes across modern consumer, enterprise, and deep-tech spaces.
        </p>
      </div>`;

const newTracksHeader = `<div class="editorial-section-header" id="tracksHeader">
        <div class="editorial-header-left">
          <h2 class="editorial-mega-title">
            TRACKS DESIGNED<br>TO TEST YOU
          </h2>
        </div>
        <div class="editorial-header-right">
          <p class="editorial-header-desc">
            CHOOSE THE TRACK THAT PUSHES YOU, DRIVES YOU, AND MATCHES THE CHALLENGE YOU'RE READY TO FACE. 100% BUILDER-OWNED INTELLECTUAL PROPERTY.
          </p>
          <div class="editorial-header-meta">
            <span>48 HOURS</span> • <span>50+ TEAMS</span> • <span>PRODUCTION DEPLOY</span>
          </div>
        </div>
      </div>`;

if (updatedHtml.includes(oldTracksHeader)) {
  updatedHtml = updatedHtml.replace(oldTracksHeader, newTracksHeader);
  console.log('Replaced tracks header');
} else {
  console.log('Tracks header not found directly, will check alternative pattern');
}

// 3. Add the "FROM PROTOTYPE TO PRODUCTION DEPLOY" Showcase Section before Schedule or after Tracks
const showcaseSection = `
    <!-- ========================================================================
         FROM PROTOTYPE TO PRODUCTION DEPLOY SHOWCASE (Reference Match)
         ======================================================================== -->
    <section class="showcase-editorial-section" id="manifesto">
      <div class="site-container">
        <h2 class="showcase-editorial-title">
          FROM PROTOTYPE TO<br>PRODUCTION DEPLOY
        </h2>
        <div class="showcase-grid-cards">
          <div class="showcase-card-panel">
            <div class="showcase-card-num">01 / ARCHITECTURE</div>
            <h3 class="showcase-card-head">RAW CODE OVER SLIDE DECKS</h3>
            <p class="showcase-card-body">
              We do not judge pitch presentations. Evaluators inspect git commits, pull requests, docker containers, and production endpoints. If it doesn't build and run live, it doesn't count.
            </p>
          </div>

          <div class="showcase-card-panel">
            <div class="showcase-card-num">02 / MENTORSHIP</div>
            <h3 class="showcase-card-head">DIRECT DESK CODE REVIEWS</h3>
            <p class="showcase-card-body">
              15+ senior founders and staff engineers walk the floor. No generic keynotes—get direct 1-on-1 code reviews, architecture teardowns, and database scaling feedback.
            </p>
          </div>

          <div class="showcase-card-panel">
            <div class="showcase-card-num">03 / OWNERSHIP</div>
            <h3 class="showcase-card-head">100% BUILDER-OWNED IP</h3>
            <p class="showcase-card-body">
              Everything you design, architect, and commit remains 100% yours. Sponsors and organizers claim zero equity and zero rights over student codebases.
            </p>
          </div>

          <div class="showcase-card-panel">
            <div class="showcase-card-num">04 / DISPATCH</div>
            <h3 class="showcase-card-head">PASS GATEWAY OPENS 7 OCT</h3>
            <p class="showcase-card-body">
              Unique verification codes are dispatched to vetted teams via mail 10 days before the sprint. Digital builder passes unlock hardware desks, cloud credits, and physical venue access.
            </p>
          </div>
        </div>
      </div>
    </section>
`;

// Insert showcaseSection before </main>
if (updatedHtml.includes('</main>')) {
  updatedHtml = updatedHtml.replace('</main>', showcaseSection + '\n  </main>');
  console.log('Inserted showcase section before </main>');
}

// 4. Replace old footer with editorial brutalist footer
const newFooter = `  <!-- ========================================================================
       EDITORIAL BRUTALIST FOOTER WITH GIANT LETTERMARK "V" BLOCK
       ======================================================================== -->
  <footer class="editorial-footer">
    <div class="site-container">
      <div class="footer-editorial-grid">
        <!-- Col 1: Small Badge + Brand -->
        <div class="footer-col-brand">
          <div class="footer-badge-box">100</div>
          <div class="footer-brand-title">VISTAARA</div>
          <p class="footer-brand-tagline">ENDURE. ARCHITECT. SHIP.</p>
          <div style="margin-top: 14px; font-family: var(--font-mono); font-size: 0.72rem; color: var(--neon);">
            28°38'N 77°13'E • NEW DELHI, INDIA — HYBRID
          </div>
        </div>
        
        <!-- Col 2: Navigation -->
        <div class="footer-col-links">
          <div class="footer-col-head">NAVIGATION</div>
          <a href="#hero">HOME</a>
          <a href="#tracks">TRACKS</a>
          <a href="#evaluator">EVALUATOR</a>
          <a href="#timeline">SCHEDULE</a>
          <a href="#prizes">PRIZES</a>
          <a href="#terminal">PASS TERMINAL</a>
          <a href="#" class="open-register-modal-btn">CLAIM PASS</a>
        </div>
        
        <!-- Col 3: Support & Resources -->
        <div class="footer-col-links">
          <div class="footer-col-head">SUPPORT &amp; LEGAL</div>
          <a href="#faq">FAQ</a>
          <a href="mailto:build@vistaara.org">CONTACT</a>
          <a href="#tracks">CHALLENGES</a>
          <a href="#manifesto">MANIFESTO</a>
          <a href="#" class="open-register-modal-btn">VERIFY CODE</a>
        </div>
      </div>

      <!-- Bottom Row with Monumental V Block -->
      <div class="footer-bottom-row">
        <div class="footer-legal-copy">
          <span>VISTAARA © 2026</span>
          <span>•</span>
          <a href="#">PRIVACY POLICY</a>
          <span>•</span>
          <a href="#">TERMS &amp; CONDITIONS</a>
          <span>•</span>
          <span>BUILD. SOLVE. CONNECT.</span>
        </div>
        
        <!-- Monumental Square Neon Lettermark "V" Block -->
        <div class="footer-giant-lettermark" aria-hidden="true">
          <span>V</span>
        </div>
      </div>
    </div>
  </footer>`;

const footerRegex = /<footer class="site-footer">[\s\S]*?<\/footer>/;
if (footerRegex.test(updatedHtml)) {
  updatedHtml = updatedHtml.replace(footerRegex, newFooter);
  console.log('Replaced footer with editorial brutalist footer');
} else {
  console.log('Footer regex did not match, will inspect');
}

fs.writeFileSync('index.html', updatedHtml, 'utf8');
console.log('Successfully updated index.html');
