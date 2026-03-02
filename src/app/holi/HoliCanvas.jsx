// src/app/holi/HoliCanvas.jsx
// ✅ Mobile-first — Only Gulal (tap) + Pichkari (auto). No dust/bubbles.
'use client';

import { useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from 'react';

export const HOLI_COLORS = [
  '#FF1744', '#F50057', '#D500F9', '#651FFF',
  '#2979FF', '#00E676', '#FFEA00', '#FF9100',
  '#FF6D00', '#E040FB', '#00B0FF', '#76FF03',
  '#FF4081', '#7C4DFF', '#FFAB40', '#69F0AE',
];

function rnd(min, max) { return min + Math.random() * (max - min); }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

// ── Device tier ───────────────────────────────────────────────────
function getDeviceTier() {
  if (typeof navigator === 'undefined') return 'mid';
  const cores = navigator.hardwareConcurrency || 2;
  const mem = navigator.deviceMemory || 2;
  if (cores <= 2 || mem <= 1) return 'ultra-low';
  if (cores <= 4 || mem <= 2) return 'low';
  if (cores <= 6 || mem <= 4) return 'mid';
  return 'high';
}

const TIER = getDeviceTier();

const CONFIG = {
  'ultra-low': { maxParticles: 60,  gulalCount: 6,  pichInterval: 4000, pichDrops: 10,  frameSkip: 2 },
  'low':       { maxParticles: 140, gulalCount: 10, pichInterval: 3000, pichDrops: 16, frameSkip: 1 },
  'mid':       { maxParticles: 250, gulalCount: 18, pichInterval: 2200, pichDrops: 24, frameSkip: 0 },
  'high':      { maxParticles: 400, gulalCount: 26, pichInterval: 1800, pichDrops: 32, frameSkip: 0 },
}[TIER];

// ── Store logical (CSS) size separately — never derive from canvas.width ──
let logicalW = 0;
let logicalH = 0;

// ─── GulalPuff ────────────────────────────────────────────────────
class GulalPuff {
  constructor(x, y, color) {
    this.rgb = hexToRgb(color);
    this.x = x + rnd(-20, 20);
    this.y = y + rnd(-8, 8);
    this.r = rnd(12, TIER === 'ultra-low' ? 22 : 38);
    this.vx = rnd(-2.2, 2.2);
    this.vy = rnd(-4.5, -1.8);
    this.ax = rnd(-0.03, 0.03);
    this.ay = -0.07;
    this.alpha = rnd(0.55, 0.8);
    this.decay = rnd(0.014, 0.024);
    this.rDecay = rnd(0.06, 0.14);
    this.done = false;
  }

  update() {
    this.vx += this.ax;
    this.vy += this.ay;
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= this.decay;
    this.r -= this.rDecay;
    if (this.alpha <= 0 || this.r <= 0) this.done = true;
  }

  draw(ctx) {
    if (this.done) return;
    const { r, g, b } = this.rgb;
    const rad = Math.max(this.r, 0.5);

    ctx.globalAlpha = this.alpha * 0.3;
    ctx.beginPath();
    ctx.arc(this.x, this.y, rad * 1.4, 0, Math.PI * 2);
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fill();

    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, rad * 0.6, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalAlpha = 1;
  }
}

// ─── PichkariDrop ─────────────────────────────────────────────────
class PichkariDrop {
  constructor(x, y, angle, speed, color) {
    this.rgb = hexToRgb(color);
    this.x = x;
    this.y = y;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.gravity = 0.12;           // ✅ Lower gravity — water goes HIGHER before falling
    this.r = rnd(6, 12);           // ✅ Bigger drops
    this.alpha = rnd(0.55, 0.85);  // ✅ More visible
    this.decay = rnd(0.006, 0.012); // ✅ Slower fade — stays on screen longer
    this.trail = [];
    this.maxTrail = TIER === 'ultra-low' ? 3 : (TIER === 'low' ? 5 : 8); // ✅ Longer trail
    this.done = false;
  }

  update() {
    this.trail.push(this.x, this.y);
    if (this.trail.length > this.maxTrail * 2) {
      this.trail.splice(0, 2);
    }
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= this.decay;
    if (this.alpha <= 0 || this.y > logicalH + 40 || this.x < -40 || this.x > logicalW + 40) {
      this.done = true;
    }
  }

  draw(ctx) {
    if (this.done) return;
    const { r, g, b } = this.rgb;
    const colorStr = `rgb(${r},${g},${b})`;

    const len = this.trail.length / 2;
    for (let i = 0; i < len; i++) {
      const frac = (i + 1) / (len + 1);
      ctx.globalAlpha = this.alpha * frac * 0.5;  // ✅ More visible trail
      ctx.beginPath();
      ctx.arc(this.trail[i * 2], this.trail[i * 2 + 1], this.r * frac * 0.7, 0, Math.PI * 2); // ✅ Bigger trail dots
      ctx.fillStyle = colorStr;
      ctx.fill();
    }

    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = colorStr;
    ctx.fill();

    ctx.globalAlpha = 1;
  }
}

// ─── Main Canvas Component ────────────────────────────────────────
const HoliCanvas = forwardRef(function HoliCanvas({ active }, ref) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const rafRef = useRef(null);
  const pichkariTimerRef = useRef(null);
  const activeRef = useRef(active);
  const frameCountRef = useRef(0);
  const isRunningRef = useRef(false);
  const canvasSizedRef = useRef(false);

  useEffect(() => { activeRef.current = active; }, [active]);

  // ── Resize: store logical size in module-level vars ──
  const sizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (w === 0 || h === 0) return;

    logicalW = w;
    logicalH = h;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    canvasSizedRef.current = true;
  }, []);

  const addParticles = useCallback((newOnes) => {
    const arr = particlesRef.current;
    const total = arr.length + newOnes.length;
    if (total > CONFIG.maxParticles) {
      arr.splice(0, total - CONFIG.maxParticles);
    }
    arr.push(...newOnes);
    startLoop();
  }, []);

  const spawnGulalAt = useCallback((x, y) => {
    const color = pick(HOLI_COLORS);
    const batch = [];
    for (let i = 0; i < CONFIG.gulalCount; i++) {
      batch.push(new GulalPuff(x, y, color));
      if (i % 4 === 0) batch.push(new GulalPuff(x, y, pick(HOLI_COLORS)));
    }
    addParticles(batch);
  }, [addParticles]);

  useImperativeHandle(ref, () => ({
    spawnGulal(x, y) { spawnGulalAt(x, y); },
  }), [spawnGulalAt]);

  // ✅ Pichkari — uses logicalW/logicalH (always correct on mobile)
  const spawnPichkari = useCallback(() => {
    if (!canvasSizedRef.current || logicalW === 0 || logicalH === 0) return;

    const color = pick(HOLI_COLORS);
    const ox = rnd(logicalW * 0.08, logicalW * 0.92);
    const oy = rnd(logicalH * 0.82, logicalH * 0.95);  // ✅ Spawn from lower — looks like ground
    const angleBase = rnd(-Math.PI * 0.78, -Math.PI * 0.22); // ✅ Mostly upward
    const batch = [];
    for (let i = 0; i < CONFIG.pichDrops; i++) {
      const angle = angleBase + rnd(-0.18, 0.18);
      const speed = rnd(9, 18);  // ✅ Much faster — reaches top half of screen
      batch.push(new PichkariDrop(ox, oy, angle, speed, color));
    }
    addParticles(batch);
  }, [addParticles]);

  // ── Render loop ──
  const startLoop = useCallback(() => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;

    const canvas = canvasRef.current;
    if (!canvas) { isRunningRef.current = false; return; }
    const ctx = canvas.getContext('2d', { alpha: true });

    const loop = () => {
      const particles = particlesRef.current;

      if (particles.length === 0 && !activeRef.current) {
        ctx.clearRect(0, 0, logicalW, logicalH);
        isRunningRef.current = false;
        return;
      }

      frameCountRef.current++;

      if (CONFIG.frameSkip > 0 && frameCountRef.current % (CONFIG.frameSkip + 1) !== 0) {
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      ctx.clearRect(0, 0, logicalW, logicalH);

      const alive = [];
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.update();
        if (!p.done) {
          p.draw(ctx);
          alive.push(p);
        }
      }
      particlesRef.current = alive;

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
  }, []);

  // ── Setup canvas + resize ──
  useEffect(() => {
    sizeCanvas();

    let resizeTimer;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(sizeCanvas, 150);
    };
    window.addEventListener('resize', debouncedResize);

    // ✅ Mobile: orientation change needs extra delay for viewport to settle
    const handleOrientation = () => setTimeout(sizeCanvas, 300);
    window.addEventListener('orientationchange', handleOrientation);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', debouncedResize);
      window.removeEventListener('orientationchange', handleOrientation);
      isRunningRef.current = false;
    };
  }, [sizeCanvas]);

  // ── Auto pichkari when active ──
  useEffect(() => {
    if (!active) {
      clearInterval(pichkariTimerRef.current);
      return;
    }

    // ✅ Mobile fix: Wait for canvas to be properly sized before spawning
    // Lazy-loaded component on mobile might not have dimensions on first render
    let retryRaf;
    let started = false;

    const waitAndStart = () => {
      if (started) return;
      if (canvasSizedRef.current && logicalW > 0 && logicalH > 0) {
        started = true;
        startLoop();
        spawnPichkari(); // first one immediately
        pichkariTimerRef.current = setInterval(spawnPichkari, CONFIG.pichInterval);
      } else {
        // Not ready — retry next frame
        retryRaf = requestAnimationFrame(waitAndStart);
      }
    };

    // Small delay for Suspense/lazy mount to settle
    const startTimer = setTimeout(waitAndStart, 50);

    return () => {
      clearTimeout(startTimer);
      cancelAnimationFrame(retryRaf);
      clearInterval(pichkariTimerRef.current);
    };
  }, [active, spawnPichkari, startLoop]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 25,
      }}
    />
  );
});

export default HoliCanvas;