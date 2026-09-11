const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');
const isCRLF = content.includes('\r\n');
const lines = content.split(/\r?\n/);

console.log('Index 551 (Line 552):', lines[551]);
console.log('Index 552 (Line 553):', lines[552]);
console.log('Index 556 (Line 557):', lines[556]);

const replacement = [
  '        <span>ZERO CORPORATE SLOP</span>',
  '        <span>•</span>',
  '        <span>PURE PRODUCTION PROTOTYPES</span>',
  '      </div>',
  '    </div>',
  '',
  '    <!-- ========================================================================',
  '         TRACKS SECTION: EDITORIAL BRUTALIST PANELS',
  '         ======================================================================== -->',
  '    <section id="tracks">',
  '      <div class="site-container">',
  '        ',
  '        <div class="editorial-section-header" style="padding: 0 0 32px 0; margin-bottom: 24px;">',
  '          <div class="editorial-header-left">',
  '            <h2 class="editorial-mega-title">',
  '              TRACKS DESIGNED<br>TO TEST YOU',
  '            </h2>',
  '          </div>',
  '          <div class="editorial-header-right">',
  '            <p class="editorial-header-desc">',
  '              CHOOSE THE TRACK THAT PUSHES YOU, DRIVES YOU, AND MATCHES THE CHALLENGE YOU\'RE READY TO FACE. 100% BUILDER-OWNED INTELLECTUAL PROPERTY.',
  '            </p>',
  '            <div class="editorial-header-meta">',
  '              <span>48 HOURS</span> • <span>50+ TEAMS</span> • <span>PRODUCTION DEPLOY</span>',
  '            </div>',
  '          </div>',
  '        </div>',
  '',
  '        <div class="division-tabs-bar">',
  '          <button class="division-tab-btn active" data-division="app" type="button">',
  '            <span>01: App Development Track</span>',
  '          </button>',
  '          <button class="division-tab-btn" data-division="web" type="button">',
  '            <span>02: Web Development Track</span>',
  '          </button>',
  '          <button class="division-tab-btn" data-division="open" type="button">',
  '            <span>03: Open Innovation &amp; Emerging Tech</span>',
  '          </button>',
  '        </div>'
];

// Replace from line 552 (index 551) to line 557 (index 556) inclusive
const newLines = [
  ...lines.slice(0, 551),
  ...replacement,
  ...lines.slice(557)
];

const joiner = isCRLF ? '\r\n' : '\n';
fs.writeFileSync('index.html', newLines.join(joiner), 'utf8');
console.log('Successfully repaired tracks section and hazard ribbon via array slicing!');
