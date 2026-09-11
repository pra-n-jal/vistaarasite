/**
 * VISTAARA 2026 - OFFICIAL INTERACTIVE ENGINE
 * National Student Hackathon
 * Tagline: Build. Solve. Connect.
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeSwitcher();
  initAudio();
  initHUDClocks();
  initCustomCursor();
  initScrollProgress();
  initMobileMenu();
  initDateGating();
  initHeroTerminal();
  initDivisionTabs();
  initScoreCalculator();
  initFAQ();
  initRegistrationModal();
  initMarquee();
});

/* ==========================================================================
   1. PROCEDURAL WEB AUDIO SYNTHESIZER (Cyber Robotic Bleeps)
   ========================================================================== */
let audioCtx = null;
let soundEnabled = true;

function initAudio() {
  const audioBtn = document.getElementById('audioToggleBtn');
  
  function getAudioCtx() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      audioBtn.classList.toggle('sound-on', soundEnabled);
      const icon = audioBtn.querySelector('.audio-icon');
      if (icon) {
        icon.innerHTML = soundEnabled ? 'VOL' : 'MUTE';
      }
      if (soundEnabled) playChirpSound('happy');
    });
  }

  const interactives = document.querySelectorAll('button, a, .stepper-btn, .division-tab-btn, .preset-chip-btn');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (soundEnabled) playHoverSound();
    });
    el.addEventListener('click', () => {
      if (soundEnabled) playClickSound();
    });
  });
}

function playHoverSound() {
  try {
    if (!soundEnabled) return;
    const ctx = audioCtx || (window.AudioContext && new (window.AudioContext || window.webkitAudioContext)());
    if (!ctx) return;
    audioCtx = ctx;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.035);
    
    gain.gain.setValueAtTime(0.012, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.035);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.035);
  } catch (e) {}
}

function playClickSound() {
  try {
    if (!soundEnabled) return;
    const ctx = audioCtx || (window.AudioContext && new (window.AudioContext || window.webkitAudioContext)());
    if (!ctx) return;
    audioCtx = ctx;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(540, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1020, ctx.currentTime + 0.06);
    
    gain.gain.setValueAtTime(0.035, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.06);
  } catch (e) {}
}

function playChirpSound(mood = 'happy') {
  try {
    if (!soundEnabled) return;
    const ctx = audioCtx || (window.AudioContext && new (window.AudioContext || window.webkitAudioContext)());
    if (!ctx) return;
    audioCtx = ctx;

    const moodFreqs = {
      happy: [659.25, 880, 1174.66],
      excited: [523.25, 659.25, 783.99, 1046.5, 1318.5],
      focused: [440, 554.37, 659.25],
      cheering: [587.33, 739.99, 880, 1174.66],
      curious: [493.88, 659.25, 987.77]
    };

    const notes = moodFreqs[mood] || moodFreqs.happy;
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = ctx.currentTime + index * 0.045;
      
      osc.type = (mood === 'focused') ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      
      gain.gain.setValueAtTime(0.03, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.09);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(startTime);
      osc.stop(startTime + 0.09);
    });
  } catch (e) {}
}

function playSuccessSound() {
  try {
    if (!soundEnabled) return;
    const ctx = audioCtx || (window.AudioContext && new (window.AudioContext || window.webkitAudioContext)());
    if (!ctx) return;
    audioCtx = ctx;
    
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = ctx.currentTime + index * 0.06;
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      
      gain.gain.setValueAtTime(0.035, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.14);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(startTime);
      osc.stop(startTime + 0.14);
    });
  } catch (e) {}
}

/* ==========================================================================
   2. LIVE DELHI HUD CLOCK & T-MINUS COUNTDOWN
   ========================================================================== */
function initHUDClocks() {
  const clockEl = document.getElementById('heroLiveClock');
  const topbar = document.getElementById('topbar');
  
  function updateClock() {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const ist = new Date(utc + (3600000 * 5.5));
    
    const h = String(ist.getHours()).padStart(2, '0');
    const m = String(ist.getMinutes()).padStart(2, '0');
    const s = String(ist.getSeconds()).padStart(2, '0');
    
    if (clockEl) {
      clockEl.textContent = `${h}:${m}:${s} IST`;
    }
  }
  setInterval(updateClock, 1000);
  updateClock();

  if (topbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        topbar.classList.add('scrolled');
      } else {
        topbar.classList.remove('scrolled');
      }
    });
  }

  function updateCountdown() {
    const target = new Date('2026-12-12T09:00:00+05:30').getTime();
    const now = new Date().getTime();
    const diff = Math.max(0, target - now);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);
    
    const dEl = document.getElementById('cntDays');
    const hEl = document.getElementById('cntHours');
    const mEl = document.getElementById('cntMins');
    const sEl = document.getElementById('cntSecs');
    
    if (dEl) dEl.textContent = String(days).padStart(2, '0');
    if (hEl) hEl.textContent = String(hours).padStart(2, '0');
    if (mEl) mEl.textContent = String(mins).padStart(2, '0');
    if (sEl) sEl.textContent = String(secs).padStart(2, '0');
  }
  setInterval(updateCountdown, 1000);
  updateCountdown();
}

/* ==========================================================================
   3. CUSTOM CURSOR, SCROLL PROGRESS & MOBILE MENU
   ========================================================================== */
function initCustomCursor() {
  const dot = document.querySelector('.custom-cursor-dot');
  const ring = document.querySelector('.custom-cursor-ring');
  
  if (!dot || !ring) return;
  
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });
  
  function renderRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(renderRing);
  }
  renderRing();
  
  const hoverTargets = document.querySelectorAll('a, button, input, select, .division-tab-btn, .stepper-btn, .preset-chip-btn');
  hoverTargets.forEach(target => {
    target.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    target.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

function initScrollProgress() {
  const progressBar = document.getElementById('scrollProgressBar');
  if (!progressBar) return;
  
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  });
}

function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileNavDrawer');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (menuBtn && drawer) {
    menuBtn.addEventListener('click', () => {
      const isOpen = drawer.classList.contains('open');
      drawer.classList.toggle('open', !isOpen);
      menuBtn.textContent = isOpen ? 'MENU' : 'CLOSE';
      if (soundEnabled) playClickSound();
    });

    links.forEach(l => {
      l.addEventListener('click', () => {
        drawer.classList.remove('open');
        menuBtn.textContent = 'MENU';
      });
    });
  }
}



function initDivisionTabs() {
  const tabs = document.querySelectorAll('.division-tab-btn, .gc-track-tab');
  const panes = document.querySelectorAll('.division-content-pane, .gc-track-pane');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const div = tab.getAttribute('data-division');
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      panes.forEach(pane => {
        const isMatch = pane.id === `divPane-${div}`;
        pane.classList.toggle('active', isMatch);
        pane.style.display = isMatch ? 'block' : 'none';
      });

      if (soundEnabled) playClickSound();
    });
  });
}

/* ==========================================================================
   9. VISTAARA 100-POINT RUBRIC EVALUATOR
   ========================================================================== */
function initScoreCalculator() {
  const state = {
    autoNear: 10,    // Problem Relevance & Depth (0-15)
    autoFar: 10,     // User Research & Market Validation (0-15)
    teleNear: 14,    // Clean Architecture & Modularity (0-20)
    teleFar: 8,      // API, Cloud & AI Integration (0-10)
    teleSig: 12,     // UI/UX Intuition & Responsive Design (0-15)
    teleHang: 8,     // Mentor Review & Code Defense (0-10)
    safetyBonus: 4   // Live Demo Pitch Polish Bonus (0-10)
  };

  const steppers = document.querySelectorAll('.stepper-btn, .gc-stepper-btn');
  const presetBtns = document.querySelectorAll('.preset-chip-btn, .gc-preset-chip');

  function calculateScore() {
    // Stage 01: Problem Framing & Real-World Impact (Max 30)
    const impactScore = state.autoNear + state.autoFar;
    // Stage 02: Technical Architecture & Code Quality (Max 40)
    const techScore = state.teleNear + state.teleFar;
    // Stage 03 & 04: UI/UX Polish, Mentor Validation & Demo (Max 30)
    const demoScore = state.teleSig + state.teleHang + state.safetyBonus;

    const total = impactScore + techScore + demoScore; // Max 100

    const totalEl = document.getElementById('calcTotalScore');
    const autoEl = document.getElementById('calcAutoScore');
    const teleEl = document.getElementById('calcTeleopScore');
    const endEl = document.getElementById('calcEndgameScore');
    const rankBadge = document.getElementById('calcRankBadge');
    const feedbackMsg = document.getElementById('calcFeedbackMsg');

    if (totalEl) totalEl.textContent = total;
    if (autoEl) autoEl.textContent = impactScore;
    if (teleEl) teleEl.textContent = techScore;
    if (endEl) endEl.textContent = demoScore;

    if (rankBadge) {
      if (total >= 85) {
        rankBadge.textContent = 'GRAND CHAMPION TIER';
        rankBadge.style.background = 'var(--vst-mint)';
        rankBadge.style.color = '#080808';
        if (feedbackMsg) feedbackMsg.textContent = 'Grand Champion Standing: verified market need, robust clean code architecture, and high-craft UX.';
      } else if (total >= 70) {
        rankBadge.textContent = 'ACCELERATOR FINALIST';
        rankBadge.style.background = '#27272A';
        rankBadge.style.color = '#FFFFFF';
        if (feedbackMsg) feedbackMsg.textContent = 'Accelerator Finalist Standing: strong technical architecture. Refine live prototype demo and mentor defense.';
      } else if (total >= 50) {
        rankBadge.textContent = 'PRODUCTION READY';
        rankBadge.style.background = 'var(--vst-mint)';
        rankBadge.style.color = '#080808';
        if (feedbackMsg) feedbackMsg.textContent = 'Production Ready: solid foundation. Leverage Stage 03 mentor reviews to tighten API resilience and UX flows.';
      } else {
        rankBadge.textContent = 'PROTOTYPE SPRINT';
        rankBadge.style.background = '#18181B';
        rankBadge.style.color = '#E4E4E7';
        if (feedbackMsg) feedbackMsg.textContent = 'Prototype Sprint: prioritize an essential user problem and complete the core MVP flow.';
      }
    }
  }

  steppers.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-key');
      const action = btn.getAttribute('data-action');
      const min = parseInt(btn.getAttribute('data-min'), 10);
      const max = parseInt(btn.getAttribute('data-max'), 10);

      if (state[key] !== undefined) {
        if (action === 'inc' && state[key] < max) {
          state[key]++;
        } else if (action === 'dec' && state[key] > min) {
          state[key]--;
        }

        const valEl = document.getElementById(`val-${key}`);
        if (valEl) valEl.textContent = state[key];

        calculateScore();
        if (soundEnabled) playClickSound();
      }
    });
  });

  presetBtns.forEach(p => {
    p.addEventListener('click', () => {
      const preset = p.getAttribute('data-preset');
      if (preset === 'auto') {
        // Deep Tech & AI Focus
        state.autoNear = 11;
        state.autoFar = 12;
        state.teleNear = 19;
        state.teleFar = 19;
        state.teleSig = 12;
        state.teleHang = 9;
        state.safetyBonus = 4;
      } else if (preset === 'combat') {
        // Product & UX Heavy
        state.autoNear = 14;
        state.autoFar = 13;
        state.teleNear = 16;
        state.teleFar = 15;
        state.teleSig = 15;
        state.teleHang = 9;
        state.safetyBonus = 5;
      } else if (preset === 'max') {
        // Grand Champion Ceiling (Perfect 100)
        state.autoNear = 15;
        state.autoFar = 15;
        state.teleNear = 20;
        state.teleFar = 20;
        state.teleSig = 15;
        state.teleHang = 10;
        state.safetyBonus = 5;
      }

      Object.keys(state).forEach(k => {
        const el = document.getElementById(`val-${k}`);
        if (el) el.textContent = state[k];
      });

      calculateScore();
      if (soundEnabled) playSuccessSound();
    });
  });

  calculateScore();
}

function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  const searchInput = document.getElementById('faqSearchInput');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
      if (soundEnabled) playClickSound();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      faqItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(q) ? 'block' : 'none';
      });
    });
  }
}

/* ==========================================================================
   10. INTERACTIVE HERO TERMINAL (Stage Config & Inline Pass Gateway)
   ========================================================================== */
function initHeroTerminal() {
  const stageChips = document.querySelectorAll('.terminal-stage-chip');
  const codeOutput = document.getElementById('terminalCodeOutput');
  const tabManifest = document.getElementById('termTabManifest');
  const tabPass = document.getElementById('termTabPass');
  const tabBadge = document.getElementById('termTabBadge');
  const viewManifest = document.getElementById('termViewManifest');
  const viewPass = document.getElementById('termViewPass');
  const viewBadge = document.getElementById('termViewBadge');
  const quickDemoBtn = document.getElementById('termQuickDemoBtn');
  const termGenBtn = document.getElementById('termGeneratePassBtn');
  const heroClaimBtn = document.getElementById('heroClaimPassBtn');
  const termOpenModalBtn = document.getElementById('termOpenModalBtn');
  const termDownloadPassBtn = document.getElementById('termDownloadPassBtn');
  const termEditPassBtn = document.getElementById('termEditPassBtn');

  // Helper: Switch active view inside terminal
  function switchTermTab(tabName) {
    [tabManifest, tabPass, tabBadge].forEach(t => t && t.classList.remove('active'));
    [viewManifest, viewPass, viewBadge].forEach(v => {
      if (v) v.style.display = 'none';
    });

    if (tabName === 'manifest') {
      if (tabManifest) tabManifest.classList.add('active');
      if (viewManifest) viewManifest.style.display = 'flex';
    } else if (tabName === 'pass') {
      if (tabPass) tabPass.classList.add('active');
      if (viewPass) viewPass.style.display = 'flex';
      const input = document.getElementById('termTeamName') || document.getElementById('termPassCode');
      if (input) input.focus();
    } else if (tabName === 'badge') {
      if (tabBadge) {
        tabBadge.style.display = 'inline-block';
        tabBadge.classList.add('active');
      }
      if (viewBadge) viewBadge.style.display = 'flex';
    }
    if (soundEnabled) playClickSound();
  }

  // Stage Config Objects for Terminal Code Visualizer
  const stageConfigs = {
    '1': `<div><span class="code-kw">const</span> stage01_Explore = {</div>
<div>&nbsp;&nbsp;phase: <span class="code-str">"Stage 01 — Problem Discovery"</span>,</div>
<div>&nbsp;&nbsp;deliverable: <span class="code-str">"Problem Framing & Team Calibration"</span>,</div>
<div>&nbsp;&nbsp;sessions: [<span class="code-str">"Founder Keynotes"</span>, <span class="code-str">"Starter Repos"</span>],</div>
<div>&nbsp;&nbsp;accessCodeWindow: <span class="code-str">"Registration & Mail Dispatch: 15 Sept 2026 Onwards"</span>,</div>
<div>&nbsp;&nbsp;status: <span class="code-str">"PRE-LAUNCH DISPATCH READY"</span></div>
<div>};</div>`,
    '2': `<div><span class="code-kw">const</span> stage02_Build = {</div>
<div>&nbsp;&nbsp;phase: <span class="code-str">"Stage 02 — Product Sprint"</span>,</div>
<div>&nbsp;&nbsp;deliverable: <span class="code-str">"36-Hour Rapid Engineering Marathon"</span>,</div>
<div>&nbsp;&nbsp;tracks: [<span class="code-str">"App Development"</span>, <span class="code-str">"Web Development"</span>],</div>
<div>&nbsp;&nbsp;checkpoints: [<span class="code-str">"Architecture Defense"</span>, <span class="code-str">"API Hardening"</span>],</div>
<div>&nbsp;&nbsp;status: <span class="code-str">"CORE SPRINT ACTIVE"</span></div>
<div>};</div>`,
    '3': `<div><span class="code-kw">const</span> stage03_Connect = {</div>
<div>&nbsp;&nbsp;phase: <span class="code-str">"Stage 03 — Mentor Hub & Validation"</span>,</div>
<div>&nbsp;&nbsp;deliverable: <span class="code-str">"1-on-1 Code Audits & Founder Reviews"</span>,</div>
<div>&nbsp;&nbsp;mentors: <span class="code-str">"15+ Tech Leaders & CTOs"</span>,</div>
<div>&nbsp;&nbsp;advisoryRatio: <span class="code-str">"1 Mentor per 3 Teams"</span>,</div>
<div>&nbsp;&nbsp;status: <span class="code-str">"SECURITY & UX DEFENSE"</span></div>
<div>};</div>`,
    '4': `<div><span class="code-kw">const</span> stage04_Demo = {</div>
<div>&nbsp;&nbsp;phase: <span class="code-str">"Stage 04 — Grand Finale Demo Day"</span>,</div>
<div>&nbsp;&nbsp;deliverable: <span class="code-str">"Live 3-Min Prototype & 2-Min Jury Defense"</span>,</div>
<div>&nbsp;&nbsp;rubric: <span class="code-str">"100-Point Objective Scoring System"</span>,</div>
<div>&nbsp;&nbsp;awards: [<span class="code-str">"Equity-Free Grants"</span>, <span class="code-str">"Cloud Credits"</span>],</div>
<div>&nbsp;&nbsp;status: <span class="code-str">"MAINSTAGE CHAMPIONSHIP"</span></div>
<div>};</div>`
  };

  // Interactive Stage Chip Selection
  stageChips.forEach(chip => {
    chip.addEventListener('click', () => {
      stageChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const stageId = chip.getAttribute('data-stage') || '2';
      if (codeOutput && stageConfigs[stageId]) {
        codeOutput.innerHTML = stageConfigs[stageId];
      }
      if (soundEnabled) playClickSound();
    });
  });

  // Tab Event Listeners
  if (tabManifest) tabManifest.addEventListener('click', () => switchTermTab('manifest'));
  if (tabPass) tabPass.addEventListener('click', () => switchTermTab('pass'));
  if (tabBadge) tabBadge.addEventListener('click', () => switchTermTab('badge'));

  // Hero Claim Pass Button inside Terminal View 1
  if (heroClaimBtn) {
    heroClaimBtn.addEventListener('click', (e) => {
      e.preventDefault();
      switchTermTab('pass');
    });
  }

  // Quick Demo Code Filler in Terminal
  if (quickDemoBtn) {
    quickDemoBtn.addEventListener('click', () => {
      if (typeof window.activatePassPreviewMode === 'function') {
        window.activatePassPreviewMode();
      }
      const termCodeInput = document.getElementById('termUniqueCode') || document.getElementById('termPassCode');
      if (termCodeInput) {
        termCodeInput.value = 'VST-2026-PASS';
        termCodeInput.style.borderColor = 'var(--gc-cyan)';
      }
      const bName = document.getElementById('termBuilderName');
      if (bName && !bName.value) bName.value = 'Alex Chen';
      const tName = document.getElementById('termTeamName');
      if (tName && !tName.value) tName.value = 'HyperKernel';
      const tCat = document.getElementById('termCategory');
      if (tCat) tCat.value = 'App Development';
      if (soundEnabled) playSuccessSound();
    });
  }

  // Terminal "Generate Official Pass →" Action
  if (termGenBtn) {
    termGenBtn.addEventListener('click', () => {
      if (typeof window.isPassReleaseActive === 'function' && !window.isPassReleaseActive()) {
        if (typeof window.flashGateNotice === 'function') window.flashGateNotice();
        alert('Official squad registration and Builder Pass generator opens on 15 September 2026 onwards.\n\nClick "Preview / Test Mode" or "Use Demo Code" to test pass generation ahead of time.');
        return;
      }
      const code = document.getElementById('termUniqueCode')?.value.trim() || document.getElementById('termPassCode')?.value.trim() || 'VST-2026-PASS';
      const team = document.getElementById('termTeamName')?.value.trim() || 'ORBIT BUILDERS';
      const track = document.getElementById('termCategory')?.value || document.getElementById('termTrackSelect')?.value || 'App Development Track';
      const theme = document.getElementById('termThemeSelect')?.value || 'AI Central';
      const captain = document.getElementById('termBuilderName')?.value.trim() || 'ARYAN SHARMA';
      const school = 'INDIAN INSTITUTE OF TECHNOLOGY';

      // Clean display names
      const cleanTrack = track.replace(/\s*Track.*$/i, '').toUpperCase();
      const cleanTheme = theme.replace(/\s*\(.*$/i, '').toUpperCase();
      const formattedSerial = code.toUpperCase().startsWith('VST-') ? code.toUpperCase() : `VST-${code.toUpperCase()}`;

      // Populate In-Terminal Badge Elements
      const termTeam = document.getElementById('termPassCardTeam');
      const termTrack = document.getElementById('termPassCardTrack');
      const termTheme = document.getElementById('termPassCardTheme');
      const termSerial = document.getElementById('termPassCardSerial');

      if (termTeam) termTeam.textContent = team.toUpperCase();
      if (termTrack) termTrack.textContent = cleanTrack;
      if (termTheme) termTheme.textContent = cleanTheme;
      if (termSerial) termSerial.textContent = formattedSerial;

      // Sync into modal inputs and trigger modal pass generation
      const regCodeInput = document.getElementById('regPassCode');
      const regTeamInput = document.getElementById('regTeamName');
      const regDivSelect = document.getElementById('regDivision');
      const regAllSelect = document.getElementById('regAlliance');
      const regCaptInput = document.getElementById('regCaptain');

      if (regCodeInput) regCodeInput.value = code;
      if (regTeamInput) regTeamInput.value = team;
      if (regDivSelect) regDivSelect.value = track;
      if (regAllSelect) regAllSelect.value = theme;
      if (regCaptInput) regCaptInput.value = captain;

      if (typeof window.executePassGeneration === 'function') {
        window.executePassGeneration();
      }

      // Also render directly to terminal pass canvas
      const inlineCanvas = document.getElementById('termPassCanvas');
      if (inlineCanvas && typeof generatePassCanvas === 'function') {
        const generated = generatePassCanvas({ team, track: cleanTrack, theme: cleanTheme, serial: formattedSerial, code, captain, school });
        inlineCanvas.width = generated.width;
        inlineCanvas.height = generated.height;
        const ictx = inlineCanvas.getContext('2d');
        ictx.drawImage(generated, 0, 0);
      }

      // Switch terminal immediately to View 3 (Live Badge Display)
      switchTermTab('badge');
      if (soundEnabled) playSuccessSound();
    });
  }

  // Fullscreen Modal Button from Terminal Badge
  if (termOpenModalBtn) {
    termOpenModalBtn.addEventListener('click', () => {
      if (typeof window.openVistaaraModal === 'function') {
        window.openVistaaraModal(2);
      }
    });
  }

  // Download Button from Terminal Badge
  if (termDownloadPassBtn) {
    termDownloadPassBtn.addEventListener('click', () => {
      const modalDownloadBtn = document.getElementById('downloadPassBtn');
      if (modalDownloadBtn) {
        modalDownloadBtn.click();
      }
    });
  }

  // Edit Button from Terminal Badge
  if (termEditPassBtn) {
    termEditPassBtn.addEventListener('click', () => {
      switchTermTab('pass');
    });
  }
}

/* ==========================================================================
   11. REGISTRATION MODAL & DIGITAL BUILDER PASS GENERATOR
   ========================================================================== */
function initRegistrationModal() {
  const modal = document.getElementById('registrationModal');
  const openBtns = document.querySelectorAll('.open-register-modal-btn');
  const closeBtn = document.getElementById('modalCloseBtn');
  const submitBtn = document.getElementById('submitRegBtn');
  const fillDemoBtn = document.getElementById('fillDemoCodeBtn');
  const editPassBtn = document.getElementById('editPassBtn');
  const copySerialBtn = document.getElementById('copyPassSerialBtn');
  const printPassBtn = document.getElementById('printPassBtn');
  const downloadPassBtn = document.getElementById('downloadPassBtn');

  const step1 = document.getElementById('modalStep1');
  const step2 = document.getElementById('modalStep2');
  const pill1 = document.getElementById('modalPill1');
  const pill2 = document.getElementById('modalPill2');
  const badgeCard = document.getElementById('passTicketCard');

  function showStep(stepNum) {
    if (stepNum === 1) {
      if (step1) step1.style.display = 'block';
      if (step2) step2.style.display = 'none';
      if (pill1) pill1.classList.add('active');
      if (pill2) pill2.classList.remove('active');
    } else {
      if (step1) step1.style.display = 'none';
      if (step2) step2.style.display = 'block';
      if (pill1) pill1.classList.remove('active');
      if (pill2) pill2.classList.add('active');
      attach3DTilt();
    }
  }

  function openModal(targetStep = 1) {
    if (modal) {
      modal.classList.add('open');
      modal.classList.add('active');
      showStep(targetStep);
      if (soundEnabled) playClickSound();
    }
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove('open');
      modal.classList.remove('active');
    }
  }

  window.openVistaaraModal = openModal;
  window.closeVistaaraModal = closeModal;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(1);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && (modal.classList.contains('open') || modal.classList.contains('active'))) {
      closeModal();
    }
  });

  // Autofill Demo Code helper
  if (fillDemoBtn) {
    fillDemoBtn.addEventListener('click', () => {
      if (typeof window.activatePassPreviewMode === 'function') {
        window.activatePassPreviewMode();
      }
      const codeInput = document.getElementById('regPassCode');
      if (codeInput) {
        codeInput.value = 'VST-2026-PASS';
        codeInput.focus();
        codeInput.style.borderColor = 'var(--blueprint)';
      }
      if (soundEnabled) playSuccessSound();
    });
  }

  // Interactive 3D Card Tilt Tracking on Mouse Move
  function attach3DTilt() {
    if (!badgeCard) return;
    badgeCard.onmousemove = (e) => {
      const rect = badgeCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -9;
      const rotateY = ((x - centerX) / centerX) * 9;
      badgeCard.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.01, 1.01, 1.01)`;
    };

    badgeCard.onmouseleave = () => {
      badgeCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    };
  }

  // Core Pass Generation Logic
  function executePassGeneration() {
    if (typeof window.isPassReleaseActive === 'function' && !window.isPassReleaseActive()) {
      if (typeof window.flashGateNotice === 'function') window.flashGateNotice();
      alert('Official squad registration and Builder Pass generator opens on 15 September 2026 onwards.\n\nClick "Unlock Demo Preview" or "Use Demo Code" to test pass generation ahead of time.');
      return;
    }

    const codeInput = document.getElementById('regPassCode');
    const teamInput = document.getElementById('regTeamName');
    const divSelect = document.getElementById('regDivision');
    const allSelect = document.getElementById('regAlliance');
    const captInput = document.getElementById('regCaptain');
    const schoolInput = document.getElementById('regSchool');

    const passCode = codeInput?.value.trim() || 'VST-2026-PASS';
    const teamName = teamInput?.value.trim() || 'ORBIT BUILDERS';
    const division = divSelect?.value || 'App Development Track';
    const alliance = allSelect?.value || 'AI Central';
    const captain = captInput?.value.trim() || 'ARYAN SHARMA';
    const school = schoolInput?.value.trim() || 'INDIAN INSTITUTE OF TECHNOLOGY';

    if (!passCode) {
      alert('Please enter your unique verification code sent via mail 10 days before the event (or click "Use Demo Code").');
      if (codeInput) codeInput.focus();
      return;
    }

    if (!teamName) {
      alert('Please enter your registered team name.');
      if (teamInput) teamInput.focus();
      return;
    }

    // Populate Pass Elements
    const passTeam = document.getElementById('passCardTeam');
    const passDiv = document.getElementById('passCardDivision');
    const passAll = document.getElementById('passCardAlliance');
    const passSchool = document.getElementById('passCardSchool');
    const passCapt = document.getElementById('passCardCaptain');
    const passSerial = document.getElementById('passCardSerial');
    const passCodeVal = document.getElementById('passCardCodeVal');

    const formattedSerial = passCode.toUpperCase().startsWith('VST-') ? passCode.toUpperCase() : `VST-${passCode.toUpperCase()}`;

    // Clean track name
    const cleanTrack = division.replace(/\s*Track.*$/i, '').toUpperCase();
    const cleanTheme = alliance.replace(/\s*\(.*$/i, '').toUpperCase();

    if (passTeam) passTeam.textContent = teamName.toUpperCase();
    if (passDiv) passDiv.textContent = cleanTrack;
    if (passAll) passAll.textContent = cleanTheme;
    if (passSchool) passSchool.textContent = school.toUpperCase();
    if (passCapt) passCapt.textContent = captain.toUpperCase();
    if (passSerial) passSerial.textContent = formattedSerial;
    if (passCodeVal) passCodeVal.textContent = passCode.toUpperCase();

    // Also sync into Hero Terminal Badge Elements
    const termTeam = document.getElementById('termPassCardTeam');
    const termTrack = document.getElementById('termPassCardTrack');
    const termTheme = document.getElementById('termPassCardTheme');
    const termSerial = document.getElementById('termPassCardSerial');
    if (termTeam) termTeam.textContent = teamName.toUpperCase();
    if (termTrack) termTrack.textContent = cleanTrack;
    if (termTheme) termTheme.textContent = cleanTheme;
    if (termSerial) termSerial.textContent = formattedSerial;

    const inlineCanvas = document.getElementById('termPassCanvas');
    if (inlineCanvas && typeof generatePassCanvas === 'function') {
      const generated = generatePassCanvas({ team: teamName, track: cleanTrack, theme: cleanTheme, serial: formattedSerial, code: passCode, captain, school });
      inlineCanvas.width = generated.width;
      inlineCanvas.height = generated.height;
      const ictx = inlineCanvas.getContext('2d');
      ictx.drawImage(generated, 0, 0);
    }

    showStep(2);
    if (soundEnabled) playSuccessSound();
  }

  window.executePassGeneration = executePassGeneration;

  if (submitBtn) {
    submitBtn.addEventListener('click', executePassGeneration);
  }

  if (editPassBtn) {
    editPassBtn.addEventListener('click', () => {
      showStep(1);
      if (soundEnabled) playClickSound();
    });
  }

  // Copy Pass Serial to Clipboard
  if (copySerialBtn) {
    copySerialBtn.addEventListener('click', () => {
      const serial = document.getElementById('passCardSerial')?.textContent.trim() || 'VST-2026-PASS';
      if (navigator.clipboard) {
        navigator.clipboard.writeText(serial).then(() => {
          const originalText = copySerialBtn.textContent;
          copySerialBtn.textContent = 'COPIED!';
          setTimeout(() => { copySerialBtn.textContent = originalText; }, 2000);
        });
      } else {
        alert(`Pass Serial: ${serial}`);
      }
      if (soundEnabled) playSuccessSound();
    });
  }

  // Print Pass Action
  if (printPassBtn) {
    printPassBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // High-Resolution Canvas PNG Pass Export
  if (downloadPassBtn) {
    downloadPassBtn.addEventListener('click', () => {
      const team = document.getElementById('passCardTeam')?.textContent || 'ORBIT BUILDERS';
      const track = document.getElementById('passCardDivision')?.textContent || 'APP DEVELOPMENT';
      const theme = document.getElementById('passCardAlliance')?.textContent || 'AI CENTRAL';
      const serial = document.getElementById('passCardSerial')?.textContent || 'VST-2026-PASS';
      const code = document.getElementById('passCardCodeVal')?.textContent || 'VST-2026-PASS';
      const captain = document.getElementById('passCardCaptain')?.textContent || 'ARYAN SHARMA';
      const school = document.getElementById('passCardSchool')?.textContent || 'INDIAN INSTITUTE OF TECHNOLOGY';

      const canvas = generatePassCanvas({ team, track, theme, serial, code, captain, school });
      
      canvas.toBlob(blob => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const slug = team.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        a.href = url;
        a.download = `vistaara-builder-pass-${slug}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });

      if (soundEnabled) playSuccessSound();
    });
  }
}

/* Helper: Render Ultra-High-Resolution Futuristic VIP Builder Pass on Canvas */
function generatePassCanvas(data) {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 640;
  const ctx = canvas.getContext('2d');

  const activeTheme = document.documentElement.getAttribute('data-theme') || 'earth-moss';
  const themeColors = {
    'earth-moss': { 
      bg1: '#181C13', bg2: '#0A0C08', 
      border: '#84934A', accent: '#84934A', cyan: '#5A1622', 
      grid: 'rgba(132, 147, 74, 0.12)', pillTrack: 'rgba(132, 147, 74, 0.25)'
    },
    'gotham-dark': { 
      bg1: '#141416', bg2: '#050505', 
      border: '#F59E0B', accent: '#F59E0B', cyan: '#F59E0B', 
      grid: 'rgba(245, 158, 11, 0.08)', pillTrack: 'rgba(245, 158, 11, 0.25)'
    },
    'cyber-teal': { 
      bg1: '#092328', bg2: '#040E10', 
      border: '#2A835F', accent: '#8BBB92', cyan: '#2A835F', 
      grid: 'rgba(42, 131, 95, 0.12)', pillTrack: 'rgba(139, 187, 146, 0.25)'
    },
    'electric-punk': { 
      bg1: '#121218', bg2: '#0D0D11', 
      border: '#CCFF00', accent: '#FF007F', cyan: '#CCFF00', 
      grid: 'rgba(204, 255, 0, 0.12)', pillTrack: 'rgba(255, 26, 130, 0.25)'
    }
  };
  const theme = themeColors[activeTheme] || themeColors['earth-moss'];

  // 1. Dark Radial Background
  const bgGrad = ctx.createRadialGradient(600, 100, 50, 600, 320, 680);
  bgGrad.addColorStop(0, theme.bg1);
  bgGrad.addColorStop(1, theme.bg2);
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1200, 640);

  // 2. Cyber Circuit Grid Pattern
  ctx.strokeStyle = theme.grid;
  ctx.lineWidth = 1;
  for (let x = 0; x < 1200; x += 24) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 640);
    ctx.stroke();
  }
  for (let y = 0; y < 640; y += 24) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1200, y);
    ctx.stroke();
  }

  // 3. Metallic Outer Border
  ctx.strokeStyle = theme.border;
  ctx.lineWidth = 3;
  ctx.strokeRect(16, 16, 1168, 608);

  // Accent Line at Very Top
  ctx.fillStyle = theme.accent;
  ctx.fillRect(16, 16, 1168, 8);

  // 4. Lanyard Mount Simulation at Top Center
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.roundRect(550, 28, 100, 14, 7);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // 5. Official Logo Asset & Brand Titles
  const pxX = 48;
  const pxY = 64;
  const logoEl = document.querySelector('.hero-official-logo') || document.querySelector('.header-brand-logo');
  if (logoEl && logoEl.complete && logoEl.naturalWidth > 0) {
    ctx.drawImage(logoEl, pxX, pxY - 10, 68, 44);
  } else {
    ctx.fillStyle = theme.border;
    ctx.fillRect(pxX, pxY, 14, 14);
    ctx.fillStyle = theme.accent;
    ctx.fillRect(pxX + 16, pxY, 14, 14);
    ctx.fillStyle = theme.cyan;
    ctx.fillRect(pxX, pxY + 16, 14, 14);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(pxX + 16, pxY + 16, 14, 14);
  }

  // 6. Brand Titles
  ctx.font = '900 28px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('VISTAARA 2026', pxX + 78, pxY + 16);

  ctx.font = 'bold 12px "Space Mono", monospace';
  ctx.fillStyle = theme.cyan;
  ctx.fillText('OFFICIAL VIP BUILDER CREDENTIAL', pxX + 78, pxY + 34);

  // 7. Right Tier Badge & Stencil Serial
  ctx.font = 'bold 13px "Space Mono", monospace';
  ctx.fillStyle = theme.accent;
  ctx.textAlign = 'right';
  ctx.fillText('TIER: ALL-ARENA VIP', 1140, 78);

  ctx.font = '900 20px "Space Mono", monospace';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(data.serial, 1140, 104);
  ctx.textAlign = 'left';

  // 8. Micro-divider dashed line
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.setLineDash([6, 6]);
  ctx.beginPath();
  ctx.moveTo(48, 128);
  ctx.lineTo(1152, 128);
  ctx.stroke();
  ctx.setLineDash([]);

  // 9. Left Column: Registered Builder Team
  ctx.font = 'bold 13px "Space Mono", monospace';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('REGISTERED BUILDER TEAM', 48, 165);

  ctx.font = '900 44px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = theme.cyan;
  ctx.shadowBlur = 14;
  ctx.fillText(data.team, 48, 218);
  ctx.shadowBlur = 0;

  // 10. Track & Theme Tag Pills
  // Track Tag
  ctx.fillStyle = theme.pillTrack;
  ctx.strokeStyle = theme.cyan;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(48, 240, 220, 32, 4);
  ctx.fill();
  ctx.stroke();
  ctx.font = 'bold 12px "Space Mono", monospace';
  ctx.fillStyle = theme.cyan;
  ctx.fillText(data.track, 60, 261);

  // Theme Tag
  ctx.fillStyle = 'rgba(255, 183, 3, 0.15)';
  ctx.strokeStyle = theme.accent;
  ctx.beginPath();
  ctx.roundRect(280, 240, 200, 32, 4);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = theme.accent;
  ctx.fillText(data.theme, 292, 261);

  // 11. Metadata Specs Box
  ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(48, 294, 760, 110, 6);
  ctx.fill();
  ctx.stroke();

  // Specs Rows
  ctx.font = '11px "Space Mono", monospace';
  ctx.fillStyle = '#64748b';
  ctx.fillText('LEAD BUILDER', 68, 326);
  ctx.fillText('AFFILIATION', 440, 326);

  ctx.font = 'bold 14px "Space Mono", monospace';
  ctx.fillStyle = '#f8fafc';
  ctx.fillText(data.captain, 68, 348);
  ctx.fillText(data.school, 440, 348);

  ctx.font = '11px "Space Mono", monospace';
  ctx.fillStyle = '#64748b';
  ctx.fillText('STATION ACCESS', 68, 376);
  ctx.fillText('SECURITY STATE', 440, 376);

  ctx.font = 'bold 13px "Space Mono", monospace';
  ctx.fillStyle = '#f8fafc';
  ctx.fillText('MAKER LABS & ARENA', 68, 394);
  ctx.fillStyle = '#4ade80';
  ctx.fillText('10-DAY MAIL VERIFIED', 440, 394);

  // 12. Security Verification Key Bar
  ctx.fillStyle = 'rgba(34, 197, 94, 0.12)';
  ctx.strokeStyle = '#22c55e';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(48, 424, 760, 38, 4);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#22c55e';
  ctx.beginPath();
  ctx.arc(68, 443, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.font = 'bold 12px "Space Mono", monospace';
  ctx.fillStyle = '#4ade80';
  ctx.fillText(`REGISTRY KEY: ${data.code} • DISPATCHED 10 DAYS PRE-EVENT • AUTH: SHA256-VALIDATED`, 84, 447);

  // 13. Right Column: Scannable QR Matrix
  const qrX = 890;
  const qrY = 160;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.roundRect(qrX, qrY, 240, 240, 8);
  ctx.fill();

  // Corner reticles around QR
  ctx.strokeStyle = theme.cyan;
  ctx.lineWidth = 3;
  // Top-left
  ctx.beginPath(); ctx.moveTo(qrX - 8, qrY + 16); ctx.lineTo(qrX - 8, qrY - 8); ctx.lineTo(qrX + 16, qrY - 8); ctx.stroke();
  // Top-right
  ctx.beginPath(); ctx.moveTo(qrX + 224, qrY - 8); ctx.lineTo(qrX + 248, qrY - 8); ctx.lineTo(qrX + 248, qrY + 16); ctx.stroke();
  // Bottom-left
  ctx.beginPath(); ctx.moveTo(qrX - 8, qrY + 224); ctx.lineTo(qrX - 8, qrY + 248); ctx.lineTo(qrX + 16, qrY + 248); ctx.stroke();
  // Bottom-right
  ctx.beginPath(); ctx.moveTo(qrX + 224, qrY + 248); ctx.lineTo(qrX + 248, qrY + 248); ctx.lineTo(qrX + 248, qrY + 224); ctx.stroke();

  // Draw QR Blocks
  ctx.fillStyle = '#0c101c';
  // 3 Large outer position markers
  ctx.fillRect(qrX + 20, qrY + 20, 60, 60);
  ctx.fillStyle = '#ffffff'; ctx.fillRect(qrX + 30, qrY + 30, 40, 40);
  ctx.fillStyle = theme.border; ctx.fillRect(qrX + 40, qrY + 40, 20, 20);

  ctx.fillStyle = '#0c101c';
  ctx.fillRect(qrX + 160, qrY + 20, 60, 60);
  ctx.fillStyle = '#ffffff'; ctx.fillRect(qrX + 170, qrY + 30, 40, 40);
  ctx.fillStyle = theme.border; ctx.fillRect(qrX + 180, qrY + 40, 20, 20);

  ctx.fillStyle = '#0c101c';
  ctx.fillRect(qrX + 20, qrY + 160, 60, 60);
  ctx.fillStyle = '#ffffff'; ctx.fillRect(qrX + 30, qrY + 170, 40, 40);
  ctx.fillStyle = theme.border; ctx.fillRect(qrX + 40, qrY + 180, 20, 20);

  // Internal Data Pattern Blocks
  ctx.fillStyle = '#0c101c';
  ctx.fillRect(qrX + 100, qrY + 30, 36, 16);
  ctx.fillStyle = theme.accent;
  ctx.fillRect(qrX + 100, qrY + 60, 24, 24);
  ctx.fillStyle = theme.cyan;
  ctx.fillRect(qrX + 140, qrY + 100, 40, 20);
  ctx.fillStyle = '#0c101c';
  ctx.fillRect(qrX + 30, qrY + 100, 30, 40);
  ctx.fillStyle = theme.border;
  ctx.fillRect(qrX + 90, qrY + 100, 36, 36);
  ctx.fillStyle = '#0c101c';
  ctx.fillRect(qrX + 100, qrY + 160, 40, 20);
  ctx.fillStyle = theme.accent;
  ctx.fillRect(qrX + 160, qrY + 160, 50, 40);

  // Laser Scan Line
  ctx.strokeStyle = theme.cyan;
  ctx.lineWidth = 3;
  ctx.shadowColor = theme.cyan;
  ctx.shadowBlur = 10;
  ctx.beginPath();
  ctx.moveTo(qrX + 10, qrY + 120);
  ctx.lineTo(qrX + 230, qrY + 120);
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Scan text under QR
  ctx.font = 'bold 11px "Space Mono", monospace';
  ctx.fillStyle = theme.cyan;
  ctx.textAlign = 'center';
  ctx.fillText('SCAN FOR STAGE 01 CHECK-IN', qrX + 120, qrY + 268);
  ctx.textAlign = 'left';

  // 14. Barcode Simulation
  const bcX = qrX + 10;
  const bcY = qrY + 288;
  const barPattern = [2, 1, 3, 1, 4, 2, 1, 3, 2, 1, 4, 1, 2, 3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 2, 2, 1, 3, 1, 4, 2, 1, 3, 2, 1, 4];
  let curX = bcX;
  ctx.fillStyle = '#ffffff';
  for (let i = 0; i < barPattern.length; i++) {
    const w = barPattern[i];
    ctx.fillRect(curX, bcY, w, 22);
    curX += w + 2;
  }
  ctx.font = '10px "Space Mono", monospace';
  ctx.fillStyle = '#94a3b8';
  ctx.textAlign = 'center';
  ctx.fillText('*VST-2026-BUILDER-PASS*', qrX + 120, bcY + 36);
  ctx.textAlign = 'left';

  // 15. Ticket Stub Perforated Notch & Line
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.setLineDash([8, 8]);
  ctx.beginPath();
  ctx.moveTo(48, 560);
  ctx.lineTo(1152, 560);
  ctx.stroke();
  ctx.setLineDash([]);

  // Notches
  ctx.fillStyle = theme.bg2;
  ctx.strokeStyle = theme.border;
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(16, 560, 14, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.arc(1184, 560, 14, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

  // 16. Bottom Telemetry Bar
  ctx.font = 'bold 11px "Space Mono", monospace';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('VENUE: 28°38\'N 77°13\'E NEW DELHI • STAGE PROTOCOL: ALL ACCESS', 48, 594);

  ctx.textAlign = 'right';
  ctx.fillStyle = theme.accent;
  ctx.fillText('NON-TRANSFERABLE BUILDER PASS • VISTAARA 2026', 1152, 594);
  ctx.textAlign = 'left';

  return canvas;
}

/* ==========================================================================
   12. MARQUEE DUPLICATION
   ========================================================================== */
function initMarquee() {
  const track = document.getElementById('partnerMarqueeTrack');
  if (!track) return;
  const clone = track.innerHTML;
  track.innerHTML += clone;
}

/* ==========================================================================
   13. INTERACTIVE 4-THEME SWITCHER ENGINE
   Palettes:
   1. Earth Moss & Terracotta (DEFAULT): Chartreuse, Forest Moss, Terracotta Wine
   2. Gotham Dark: Pitch Void, Industrial Graphite, Signal Amber
   3. Cyber Teal: Deep Midnight, Pine Teal, Vivid Cyber Jade, Mint Sage
   4. Electric Punk: Cobalt, Acid Neon Volt, Hot Magenta
   ========================================================================== */
function initThemeSwitcher() {
  const triggerBtn = document.getElementById('themeToggleBtn');
  const menu = document.getElementById('themeDropdownMenu');
  const optionBtns = document.querySelectorAll('.vst-theme-option-btn');
  const dockPills = document.querySelectorAll('.theme-dock-pill');
  const activeLabel = document.getElementById('currentThemeLabel');
  const activeDot = document.getElementById('activeThemeDot');
  const themeLink = document.getElementById('vstThemeLink');

  const themeMeta = {
    'earth-moss': {
      name: 'MOSS & EARTH',
      css: 'themes/theme-earth-moss.css',
      dotClass: 'dot-earth-moss'
    },
    'gotham-dark': {
      name: 'GOTHAM DARK',
      css: 'themes/theme-gotham-dark.css',
      dotClass: 'dot-gotham-dark'
    },
    'cyber-teal': {
      name: 'CYBER TEAL',
      css: 'themes/theme-cyber-teal.css',
      dotClass: 'dot-cyber-teal'
    },
    'electric-punk': {
      name: 'ELECTRIC PUNK',
      css: 'themes/theme-electric-punk.css',
      dotClass: 'dot-electric-punk'
    }
  };

  function applyTheme(themeKey, isUserAction) {
    if (!themeMeta[themeKey]) themeKey = 'earth-moss';
    const meta = themeMeta[themeKey];

    document.documentElement.setAttribute('data-theme', themeKey);
    try {
      localStorage.setItem('vistaara_theme', themeKey);
    } catch (e) {}

    if (themeLink && themeLink.getAttribute('href') !== meta.css) {
      themeLink.setAttribute('href', meta.css);
    }

    if (activeLabel) activeLabel.textContent = meta.name;
    if (activeDot) {
      activeDot.className = `theme-dot ${meta.dotClass}`;
    }

    optionBtns.forEach(btn => {
      const isMatch = btn.getAttribute('data-theme') === themeKey;
      btn.classList.toggle('active', isMatch);
      const checkMark = btn.querySelector('.theme-check-mark');
      if (checkMark) {
        checkMark.textContent = isMatch ? 'ACTIVE' : '';
      }
    });

    dockPills.forEach(pill => {
      pill.classList.toggle('active', pill.getAttribute('data-theme') === themeKey);
    });

    // If a generated pass exists or modal is open, re-render pass preview to match active theme
    const modalStep2 = document.getElementById('modalStep2');
    if (modalStep2 && modalStep2.style.display !== 'none' && typeof window.lastPassData !== 'undefined') {
      try {
        const previewCanvas = document.getElementById('passPreviewCanvas');
        if (previewCanvas) {
          const freshCanvas = generatePassCanvas(window.lastPassData);
          const pctx = previewCanvas.getContext('2d');
          pctx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
          pctx.drawImage(freshCanvas, 0, 0, previewCanvas.width, previewCanvas.height);
        }
      } catch (e) {}
    }

    if (isUserAction && soundEnabled) {
      playSuccessSound();
    }
  }

  // Determine initial theme: default to 'earth-moss'
  let currentTheme = 'earth-moss';
  try {
    const saved = localStorage.getItem('vistaara_theme');
    if (saved && themeMeta[saved]) currentTheme = saved;
  } catch (e) {}
  applyTheme(currentTheme, false);

  // Navbar Trigger Button Toggle
  if (triggerBtn && menu) {
    triggerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = menu.classList.contains('open');
      menu.classList.toggle('open', !isOpen);
      triggerBtn.setAttribute('aria-expanded', !isOpen);
      if (soundEnabled) playClickSound();
    });

    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && e.target !== triggerBtn) {
        menu.classList.remove('open');
        triggerBtn.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        menu.classList.remove('open');
        triggerBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Option buttons in dropdown and mobile drawer
  optionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selected = btn.getAttribute('data-theme');
      if (selected) {
        applyTheme(selected, true);
        if (menu) menu.classList.remove('open');
        if (triggerBtn) triggerBtn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Floating dock pills
  dockPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const selected = pill.getAttribute('data-theme');
      if (selected) {
        applyTheme(selected, true);
        if (menu) menu.classList.remove('open');
        if (triggerBtn) triggerBtn.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

/* ==========================================================================
   12. DATE GATING & LIVE COUNTDOWN: ACTIVATES 15 SEPT 2026 ONWARDS
   ========================================================================== */
const PASS_RELEASE_DATE = new Date('2026-09-15T00:00:00+05:30');

// Allow developer / demo preview simulation
let passPreviewMode = sessionStorage.getItem('vistaara_pass_preview') === 'true';

function isPassReleaseActive() {
  if (passPreviewMode) return true;
  return new Date() >= PASS_RELEASE_DATE;
}

window.isPassReleaseActive = isPassReleaseActive;

function activatePassPreviewMode() {
  passPreviewMode = true;
  sessionStorage.setItem('vistaara_pass_preview', 'true');
  updateDateGatingUI();
}

window.activatePassPreviewMode = activatePassPreviewMode;

function flashGateNotice() {
  const modalBanner = document.getElementById('modalDateGateBanner');
  const termBanner = document.getElementById('termDateGateBanner');
  [modalBanner, termBanner].forEach(b => {
    if (b) {
      b.classList.remove('gate-attention');
      void b.offsetWidth; // trigger reflow
      b.classList.add('gate-attention');
    }
  });
}

window.flashGateNotice = flashGateNotice;

function updateDateGatingUI() {
  const isLive = new Date() >= PASS_RELEASE_DATE;

  // Diff calculation
  const diff = PASS_RELEASE_DATE.getTime() - Date.now();
  const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  const hours = Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24));
  const mins = Math.max(0, Math.floor((diff / (1000 * 60)) % 60));
  const secs = Math.max(0, Math.floor((diff / 1000) % 60));

  const pad = n => String(n).padStart(2, '0');

  // Update countdown elements
  const modalDays = document.getElementById('modalCountDays');
  const modalHours = document.getElementById('modalCountHours');
  const modalMins = document.getElementById('modalCountMins');
  const modalSecs = document.getElementById('modalCountSecs');
  if (modalDays) modalDays.textContent = pad(days);
  if (modalHours) modalHours.textContent = pad(hours);
  if (modalMins) modalMins.textContent = pad(mins);
  if (modalSecs) modalSecs.textContent = pad(secs);

  const termDays = document.getElementById('termCountDays');
  const termHours = document.getElementById('termCountHours');
  const termMins = document.getElementById('termCountMins');
  const termSecs = document.getElementById('termCountSecs');
  if (termDays) termDays.textContent = pad(days);
  if (termHours) termHours.textContent = pad(hours);
  if (termMins) termMins.textContent = pad(mins);
  if (termSecs) termSecs.textContent = pad(secs);

  // Update Banners
  const modalBanner = document.getElementById('modalDateGateBanner');
  const termBanner = document.getElementById('termDateGateBanner');
  const modalPill = document.getElementById('modalGateStatusPill');
  const termPill = document.getElementById('termGateStatusPill');
  const modalPillText = document.getElementById('modalGateStatusText');
  const termPillText = document.getElementById('termGateStatusText');
  const modalTitle = document.getElementById('modalGateTitle');
  const termTitle = document.getElementById('termGateTitle');
  const modalDesc = document.getElementById('modalGateDesc');
  const termDesc = document.getElementById('termGateDesc');
  const modalPreviewBtn = document.getElementById('modalTogglePreviewBtn');
  const termPreviewBtn = document.getElementById('termTogglePreviewBtn');

  const modalSubmitContent = document.getElementById('submitRegBtnContent');
  const modalSubmitBtn = document.getElementById('submitRegBtn');
  const termSubmitContent = document.getElementById('termGeneratePassBtnContent');
  const termSubmitBtn = document.getElementById('termGeneratePassBtn');

  if (isLive) {
    // 15 Sept 2026 onwards: fully live
    if (modalBanner) modalBanner.className = 'pass-date-gate-banner live-active';
    if (termBanner) termBanner.className = 'pass-date-gate-banner live-active';
    if (modalPill) modalPill.className = 'gate-status-pill live';
    if (termPill) termPill.className = 'gate-status-pill live';

    if (modalPillText) modalPillText.textContent = 'STATUS: REGISTRATION ACTIVE (15 SEPT 2026+)';
    if (termPillText) termPillText.textContent = 'STATUS: REGISTRATION ACTIVE (15 SEPT 2026+)';
    if (modalTitle) modalTitle.textContent = 'OFFICIAL SQUAD REGISTRATION ACTIVE';
    if (termTitle) termTitle.textContent = 'OFFICIAL SQUAD REGISTRATION ACTIVE';
    if (modalDesc) modalDesc.innerHTML = 'Official registration and verification codes dispatched on <strong>15 September 2026</strong> are active. Authenticate your code below to claim your VIP Builder Pass.';
    if (termDesc) termDesc.innerHTML = 'Official registration and verification codes dispatched on <strong>15 September 2026</strong> are active. Enter your code below to generate your pass.';
    if (modalPreviewBtn) modalPreviewBtn.style.display = 'none';
    if (termPreviewBtn) termPreviewBtn.style.display = 'none';

    if (modalSubmitBtn) modalSubmitBtn.classList.remove('btn-locked-state');
    if (modalSubmitContent) modalSubmitContent.textContent = 'Verify Code & Generate Builder Pass →';
    if (termSubmitBtn) termSubmitBtn.classList.remove('btn-locked-state');
    if (termSubmitContent) termSubmitContent.textContent = 'Generate Official Pass →';
  } else if (passPreviewMode) {
    // Preview simulation mode
    if (modalBanner) modalBanner.className = 'pass-date-gate-banner preview-active';
    if (termBanner) termBanner.className = 'pass-date-gate-banner preview-active';
    if (modalPill) modalPill.className = 'gate-status-pill preview';
    if (termPill) termPill.className = 'gate-status-pill preview';

    if (modalPillText) modalPillText.textContent = 'PREVIEW MODE ACTIVE (SIMULATING 15 SEPT+)';
    if (termPillText) termPillText.textContent = 'PREVIEW MODE ACTIVE (SIMULATING 15 SEPT+)';
    if (modalTitle) modalTitle.textContent = 'DEVELOPER PREVIEW: PASS GENERATOR UNLOCKED';
    if (termTitle) termTitle.textContent = 'DEVELOPER PREVIEW: PASS GENERATOR UNLOCKED';
    if (modalDesc) modalDesc.innerHTML = 'Preview mode is active for testing before the official <strong>15 September 2026</strong> launch. All inputs and official pass generation are unlocked.';
    if (termDesc) termDesc.innerHTML = 'Preview mode is active for testing before the official <strong>15 September 2026</strong> launch. Pass generation is unlocked.';
    if (modalPreviewBtn) {
      modalPreviewBtn.style.display = 'inline-block';
      modalPreviewBtn.textContent = 'Lock Portal (15 Sept State)';
    }
    if (termPreviewBtn) {
      termPreviewBtn.style.display = 'inline-block';
      termPreviewBtn.textContent = 'Lock Portal';
    }

    if (modalSubmitBtn) modalSubmitBtn.classList.remove('btn-locked-state');
    if (modalSubmitContent) modalSubmitContent.textContent = 'Verify Code & Generate Builder Pass →';
    if (termSubmitBtn) termSubmitBtn.classList.remove('btn-locked-state');
    if (termSubmitContent) termSubmitContent.textContent = 'Generate Official Pass →';
  } else {
    // Locked until 15 Sept 2026
    if (modalBanner) modalBanner.className = 'pass-date-gate-banner';
    if (termBanner) termBanner.className = 'pass-date-gate-banner';
    if (modalPill) modalPill.className = 'gate-status-pill locked';
    if (termPill) termPill.className = 'gate-status-pill locked';

    if (modalPillText) modalPillText.textContent = 'OPENS 15 SEPT 2026 ONWARDS';
    if (termPillText) termPillText.textContent = 'TURNS ON 15 SEPT 2026 ONWARDS';
    if (modalTitle) modalTitle.textContent = 'REGISTRATION & BUILDER PASS CLAIMING OPENS 15 SEPTEMBER 2026';
    if (termTitle) termTitle.textContent = 'REGISTRATION & PASS GATEWAY OPENS 15 SEPTEMBER 2026';
    if (modalDesc) modalDesc.innerHTML = 'As per official guidelines, squad registration and unique team verification codes open on <strong>15 September 2026</strong>. The builder pass generator officially <strong>turns on on 15 September 2026 onwards</strong>. Check your registered inbox on 15 September to obtain your code and issue your official VIP Builder Credential.';
    if (termDesc) termDesc.innerHTML = 'Official squad registration and verification codes open on <strong>15 September 2026 onwards</strong>.';
    if (modalPreviewBtn) {
      modalPreviewBtn.style.display = 'inline-block';
      modalPreviewBtn.textContent = 'Unlock Demo Preview';
    }
    if (termPreviewBtn) {
      termPreviewBtn.style.display = 'inline-block';
      termPreviewBtn.textContent = 'Preview / Test Mode';
    }

    if (modalSubmitBtn) modalSubmitBtn.classList.add('btn-locked-state');
    if (modalSubmitContent) modalSubmitContent.textContent = 'Locked Until 15 Sept 2026 (Preview with Demo)';
    if (termSubmitBtn) termSubmitBtn.classList.add('btn-locked-state');
    if (termSubmitContent) termSubmitContent.textContent = 'Locked Until 15 Sept 2026';
  }
}

function togglePassPreviewMode() {
  passPreviewMode = !passPreviewMode;
  sessionStorage.setItem('vistaara_pass_preview', passPreviewMode ? 'true' : 'false');
  updateDateGatingUI();
  if (soundEnabled) playClickSound();
}

function initDateGating() {
  updateDateGatingUI();
  setInterval(updateDateGatingUI, 1000);

  const modalPreviewBtn = document.getElementById('modalTogglePreviewBtn');
  const termPreviewBtn = document.getElementById('termTogglePreviewBtn');

  if (modalPreviewBtn) {
    modalPreviewBtn.addEventListener('click', togglePassPreviewMode);
  }
  if (termPreviewBtn) {
    termPreviewBtn.addEventListener('click', togglePassPreviewMode);
  }
}
