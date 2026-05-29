/**
 * render_schedule.js
 * ------------------
 * Macht einen 1200x1600 Screenshot der Raumanzeige und speichert ihn als PNG.
 *
 * Voraussetzungen (einmalig):
 *   npm install playwright
 *   npx playwright install chromium
 *
 * Verwendung:
 *   node render_schedule.js
 *   node render_schedule.js --input /pfad/zu/room-schedule.html
 *   node render_schedule.js --input /pfad/zu/room-schedule.html --output mein-raum.png
 */

const { chromium } = require('playwright');
const path = require('path');

// ── Konfiguration ────────────────────────────────────────────────────────────
const CONFIG = {
  input:  process.argv.includes('--input')
            ? process.argv[process.argv.indexOf('--input') + 1]
            : 'room-schedule.html',

  output: process.argv.includes('--output')
            ? process.argv[process.argv.indexOf('--output') + 1]
            : 'room-schedule.png',

  width:  1200,
  height: 1600,
  waitMs: 1500,   // Zeit fuer QR-Code + Fonts
};
// ─────────────────────────────────────────────────────────────────────────────

async function renderToPng() {
  const inputPath  = path.resolve(CONFIG.input);
  const outputPath = path.resolve(CONFIG.output);
  const fileUrl    = `file://${inputPath}`;

  console.log(`[render] Input:   ${inputPath}`);
  console.log(`[render] Output:  ${outputPath}`);
  console.log(`[render] Groesse: ${CONFIG.width}x${CONFIG.height}px`);

  const browser = await chromium.launch();

  try {
    const page = await browser.newPage();

    await page.setViewportSize({
      width:  CONFIG.width,
      height: CONFIG.height,
    });

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
