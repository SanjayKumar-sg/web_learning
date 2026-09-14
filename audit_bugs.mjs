import puppeteer from 'puppeteer';

const DELAY = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function audit() {
  console.log('=== STARTING COMPREHENSIVE BUG AUDIT ===\n');

  const browser = await puppeteer.launch({
    headless: true,
    pipe: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage']
  });

  const consoleLogs = [];
  const pageErrors = [];
  const networkFails = [];

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  page.on('console', msg => {
    const text = msg.text();
    const type = msg.type();
    consoleLogs.push({ type, text });
    if (type === 'error' || type === 'warning') {
      console.log(`[Browser ${type.toUpperCase()}]: ${text}`);
    }
  });

  page.on('pageerror', err => {
    pageErrors.push(err.message);
    console.log(`[PAGE ERROR]: ${err.message}`);
  });

  page.on('requestfailed', req => {
    networkFails.push({ url: req.url(), failure: req.failure()?.errorText });
    console.log(`[NETWORK FAIL]: ${req.url()} (${req.failure()?.errorText})`);
  });

  // 1. Audit Homepage Load
  console.log('--- Checking Homepage Load ---');
  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle0' });
  await DELAY(1000);

  // Check for missing images
  const brokenImages = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    return imgs
      .filter(img => !img.complete || img.naturalWidth === 0)
      .map(img => ({ src: img.src, alt: img.alt }));
  });
  console.log('Broken images on Homepage:', brokenImages);

  // 2. Audit Door Interaction & Wizard States
  console.log('\n--- Checking Door Hover & Selection ---');
  const doors = await page.$$('[role="button"]');
  console.log(`Found ${doors.length} clickable doors/buttons`);

  if (doors[0]) {
    await doors[0].hover();
    await DELAY(500);
    await doors[0].click();
    await DELAY(1000);
  }

  // 3. Audit Scroll Modal (PathwayScrollJourney)
  console.log('\n--- Checking PathwayScrollJourney Modal ---');
  const scrollModal = await page.$('[role="dialog"]');
  console.log('Scroll Modal opened:', !!scrollModal);

  // Switch tabs in scroll modal to verify multi-tab parchment
  const switched = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const pythonBtn = btns.find(b => b.textContent.includes('PYTHON'));
    if (pythonBtn) {
      pythonBtn.click();
      return true;
    }
    return false;
  });
  console.log('Switched to Python tab:', switched);
  await DELAY(500);

  // Switch back to JavaScript active pathway
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const jsBtn = btns.find(b => b.textContent.includes('JAVASCRIPT'));
    if (jsBtn) jsBtn.click();
  });
  await DELAY(500);

  // Click START LEARNING button to enter RoadmapView
  console.log('\n--- Transitioning to RoadmapView ---');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const startBtn = btns.find(b => b.textContent.includes('START LEARNING') || b.textContent.includes('ENTER COURSE'));
    if (startBtn) startBtn.click();
  });
  await DELAY(3000); // wait for 2200ms transition

  // 4. Audit JavaScript Roadmap Overworld
  console.log('\n--- Checking RoadmapView Overworld ---');
  const roadmapMain = await page.$('main[aria-label*="Overworld"]');
  console.log('Roadmap main mounted:', !!roadmapMain);

  // Check broken images in RoadmapView (Wizard avatar, etc.)
  const brokenRoadmapImgs = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    return imgs
      .filter(img => !img.complete || img.naturalWidth === 0)
      .map(img => ({ src: img.src, alt: img.alt }));
  });
  console.log('Broken images on Roadmap:', brokenRoadmapImgs);

  // Check character positions and SVG elements
  const roadmapStats = await page.evaluate(() => {
    return {
      totalStations: document.querySelectorAll('#milestoneStations > g').length,
      hasCat: !!document.querySelector('svg [class*="animate-"]'),
      hasHUD: !!document.querySelector('header'),
      hasGuide: !!document.querySelector('aside[aria-label*="Guide"]'),
      engineState: window.__roadmapTest?.state
    };
  });
  console.log('Roadmap Engine Stats:', roadmapStats);

  // 5. Test Island Clicks & Keyboard Progression
  console.log('\n--- Testing Island Clicks & Keyboard (HTML -> CSS) ---');
  // Click HTML milestone
  await page.evaluate(() => {
    const stations = Array.from(document.querySelectorAll('#milestoneStations > g'));
    const htmlStation = stations.find(s => s.textContent.includes('HTML'));
    if (htmlStation) htmlStation.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  await DELAY(1800);

  // Keyboard Enter on CSS milestone
  await page.evaluate(() => {
    const stations = Array.from(document.querySelectorAll('#milestoneStations > g'));
    const cssStation = stations.find(s => s.textContent.includes('CSS'));
    if (cssStation) {
      cssStation.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    }
  });
  await DELAY(1800);

  const stateAfterClicks = await page.evaluate(() => window.__roadmapTest?.state);
  console.log('State after HTML + CSS completed:', {
    completedMilestones: stateAfterClicks?.completedMilestones,
    catPositionId: stateAfterClicks?.catPositionId,
    activeMilestoneId: stateAfterClicks?.activeMilestoneId,
    totalXp: stateAfterClicks?.totalXp
  });

  // Test Recap Dialogue on Node 1 (HTML)
  console.log('\n--- Testing Recap Dialogue on Node 01 (HTML) ---');
  await page.evaluate(() => {
    const stations = Array.from(document.querySelectorAll('#milestoneStations > g'));
    const htmlStation = stations.find(s => s.textContent.includes('HTML'));
    if (htmlStation) htmlStation.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  await DELAY(600);

  const recapButtonText = await page.evaluate(() => {
    const guideBtns = Array.from(document.querySelectorAll('aside button'));
    return guideBtns.map(b => b.textContent.trim());
  });
  console.log('Wizard Guide Buttons during Recap:', recapButtonText);

  // 6. Test Single-Frame Roadmap View
  console.log('\n--- Testing Single-Frame Roadmap Modal ---');
  await page.evaluate(() => {
    if (window.__roadmapTest?.setShowSingleFrameRoadmap) {
      window.__roadmapTest.setShowSingleFrameRoadmap(true);
    }
  });
  await DELAY(800);

  const sfRoadmapMounted = await page.$('[aria-labelledby="single-frame-map-title"]');
  console.log('Single Frame Map Mounted:', !!sfRoadmapMounted);

  const sfStations = await page.evaluate(() => {
    return {
      islandsCount: document.querySelectorAll('svg ellipse').length,
      hasLoreCard: !!document.querySelector('[aria-labelledby="single-frame-map-title"] [class*="max-w-sm"]'),
      title: document.querySelector('#single-frame-map-title')?.textContent
    };
  });
  console.log('Single Frame Map Stats:', sfStations);

  // Close Single-Frame Roadmap
  await page.evaluate(() => {
    if (window.__roadmapTest?.setShowSingleFrameRoadmap) {
      window.__roadmapTest.setShowSingleFrameRoadmap(false);
    }
  });
  await DELAY(500);

  // 7. Test Mobile Viewport Responsiveness
  console.log('\n--- Testing Mobile Viewport (375x667) ---');
  await page.setViewport({ width: 375, height: 667 });
  await DELAY(800);

  const mobileOverflows = await page.evaluate(() => {
    return {
      windowWidth: window.innerWidth,
      bodyScrollWidth: document.body.scrollWidth,
      hasHorizontalOverflow: document.body.scrollWidth > window.innerWidth,
      hudVisible: !!document.querySelector('header'),
      guideVisible: !!document.querySelector('aside[aria-label*="Guide"]')
    };
  });
  console.log('Mobile Responsiveness on Roadmap:', mobileOverflows);

  // 8. Test Return to Hall & Reset
  console.log('\n--- Testing Return to Hall ---');
  await page.setViewport({ width: 1440, height: 900 });
  await page.evaluate(() => {
    const hallBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('RETURN TO GREAT HALL') || b.textContent.includes('HALL'));
    if (hallBtn) hallBtn.click();
  });
  await DELAY(1000);

  const backOnHome = await page.$('[aria-label*="Main Navigation"]');
  console.log('Successfully returned to Homepage Great Hall:', !!backOnHome);

  const heroCardStats = await page.evaluate(() => {
    return document.querySelector('section')?.textContent?.replace(/\s+/g, ' ').trim();
  });
  console.log('HeroCard text after return to Great Hall:', heroCardStats);

  // Check mobile navbar drawer on homepage
  await page.setViewport({ width: 375, height: 667 });
  await DELAY(500);
  const mobileMenuBtn = await page.$('button[aria-label*="navigation menu"]');
  if (mobileMenuBtn) {
    await mobileMenuBtn.click();
    await DELAY(400);
    const drawerOpen = await page.$('.animate-in.fade-in');
    console.log('Mobile Navigation Drawer opens on Homepage:', !!drawerOpen);
  }

  await browser.close();

  console.log('\n=== AUDIT SUMMARY ===');
  console.log('Total Page Errors:', pageErrors.length);
  console.log('Total Network Fails:', networkFails.length);
  console.log('Total Console Warnings/Errors:', consoleLogs.filter(l => l.type === 'error' || l.type === 'warning').length);
}

audit().catch(e => console.error('Audit script failed:', e));
