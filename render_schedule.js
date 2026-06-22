/**
 * render_schedule.js
 * ------------------
 * Macht einen 1200x1600 Screenshot eines Templates und speichert ihn als PNG.
 *
 * Voraussetzungen (einmalig):
 *   npm install playwright
 *   npx playwright install chromium
 *
 * Verwendung:
 *   node render_schedule.js --template 1
 *   node render_schedule.js --template 2
 *   node render_schedule.js --template 1 --output mein-raum.png
 */

/*
Verwendung jetzt:


node render_schedule.js --template 1   # → template01-output.png
node render_schedule.js --template 2   # → template02-output.png

# Optional eigener Output-Name:
node render_schedule.js --template 1 --output mein-raum.png
Neues Template hinzufügen: einfach in der TEMPLATES-Map oben eintragen:


const TEMPLATES = {
  1: 'template01/room-schedule.html',
  2: 'template02/room-blocked.html',
  3: 'template03/room-vacation.html',
  4: 'template04/...',   // ← hier ergänzen
};

 */
const { chromium } = require('playwright');
const path = require('path');

// ── Templates ────────────────────────────────────────────────────────────────
const TEMPLATES = {
  1: 'template01/room-schedule.html',
  2: 'template02/room-blocked.html',
  3: 'template03/room-vacation.html',
  4: 'template04/room-maintenance.html',
  5: 'template05/room-exam.html',
  6: 'template06/room-free.html',
};
// ─────────────────────────────────────────────────────────────────────────────

function getArg(flag) {
  const idx = process.argv.indexOf(flag);
  return idx !== -1 ? process.argv[idx + 1] : null;
}

const templateId = getArg('--template') ?? '1';
const templateFile = TEMPLATES[templateId];

if (!templateFile) {
  console.error(`[render] Unbekanntes Template: "${templateId}". Verfügbar: ${Object.keys(TEMPLATES).join(', ')}`);
  process.exit(1);
}

const CONFIG = {
  input:  getArg('--input') ?? templateFile,
  output: getArg('--output') ?? `template${templateId.padStart(2, '0')}-output.png`,
  width:  1200,
  height: 1600,
  waitMs: 1500,
};

async function renderToPng() {
  const inputPath  = path.resolve(CONFIG.input);
  const outputPath = path.resolve(CONFIG.output);
  const fileUrl    = `file://${inputPath}`;

  console.log(`[render] Template: ${templateId} (${CONFIG.input})`);
  console.log(`[render] Output:   ${outputPath}`);
  console.log(`[render] Größe:    ${CONFIG.width}x${CONFIG.height}px`);

  const browser = await chromium.launch();

  try {
    const page = await browser.newPage();

    await page.setViewportSize({ width: CONFIG.width, height: CONFIG.height });
    await page.goto(fileUrl, { waitUntil: 'networkidle' });
    await page.waitForTimeout(CONFIG.waitMs);

    await page.screenshot({
      path:     outputPath,
      fullPage: false,
      clip: { x: 0, y: 0, width: CONFIG.width, height: CONFIG.height },
    });

    console.log(`[render] ✓ Gespeichert: ${outputPath}`);

  } finally {
    await browser.close();
  }
}

renderToPng().catch(err => {
  console.error('[render] Fehler:', err.message);
  process.exit(1);
});
