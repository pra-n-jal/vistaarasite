const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

// Check broken anchor links
const hrefMatches = [];
const hrefRegex = /href="#([^"]+)"/g;
let m;
while ((m = hrefRegex.exec(html)) !== null) {
  hrefMatches.push(m[1]);
}

const idMatches = new Set();
const idRegex = /id="([^"]+)"/g;
while ((m = idRegex.exec(html)) !== null) {
  idMatches.add(m[1]);
}

const broken = hrefMatches.filter(h => !idMatches.has(h));
console.log('Total anchor links:', hrefMatches.length);
console.log('Broken anchor links:', broken);

// Check emoji regex
const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
const lines = html.split('\n');
const emojiLines = [];
lines.forEach((l, i) => {
  if (emojiRegex.test(l)) emojiLines.push(i + 1);
});
console.log('Emoji lines count:', emojiLines.length);
if (emojiLines.length > 0) console.log('Emoji lines:', emojiLines);

// Check double slash in user-visible copy
const doubleSlashMatches = [];
lines.forEach((l, i) => {
  const trimmed = l.trim();
  if (trimmed.startsWith('//') || (trimmed.includes('//') && !trimmed.includes('http://') && !trimmed.includes('https://') && !trimmed.includes('/*') && !trimmed.includes('//fonts'))) {
    // Check if it's inside script or style
    doubleSlashMatches.push({ line: i + 1, content: trimmed });
  }
});
console.log('Double slash occurrences count:', doubleSlashMatches.length);

console.log('Audit complete.');
