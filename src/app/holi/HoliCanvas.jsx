// src/app/holi/HoliCanvas.jsx
// ✅ OPTIMIZED — No per-frame RadialGradient, proper pause/resume, ultra-low-end skip
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

// ── Device tier detection ─────────────────────────────────────────
function getDeviceTier() {
  if (typeof navigator === 'undefined') return 'mid';
  const cores = navigator.hardwareConcurrency || 2;
  const mem = navigator.deviceMemory || 2;
  // Ultra low — skip canvas entirely (or minimal)
  if (cores <= 2 || mem <= 1) return 'ultra-low';
  // Low — reduced particles, frame skip
  if (cores <= 4 || mem <= 2) return 'low';
  // Mid — moderate particles
  if (cores <= 6 || mem <= 4) return 'mid';
  // High — full experience
  return 'high';
}

const TIER = getDeviceTier();

// ── Tier-based config ─────────────────────────────────────────────
const CONFIG = {
  'ultra-low': { maxParticles: 40,  gulalCount: 6,   dustInterval: 1500, pichInterval: 5000, seedDust: 5,  pichDrops: 6,  frameSkip: 2 },
  'low':       { maxParticles: 80,  gulalCount: 10,  dustInterval: 900,  pichInterval: 3500, seedDust: 10, pichDrops: 10, frameSkip: 1 },
  'mid':       { maxParticles: 160, gulalCount: 18,  dustInterval: 500,  pichInterval: 2500, seedDust: 20, pichDrops: 16, frameSkip: 0 },
  'high':      { maxParticles: 280, gulalCount: 26,  dustInterval: 400,  pichInterval: 2200, seedDust: 30, pichDrops: 22, frameSkip: 0 },
}[TIER];

// ─── GulalPuff — simple circle + globalAlpha (NO gradient per frame) ──
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

    // ✅ FIX: Simple filled circle with globalAlpha — no RadialGradient creation
    // Draw two concentric circles for soft edge effect (much cheaper than gradient)
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

// ─── PichkariDrop — simplified water droplet ─────────────────────
class PichkariDrop {
  constructor(x, y, angle, speed, color) {
    this.rgb = hexToRgb(color);
    this.x = x;
    this.y = y;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.gravity = 0.18;
    this.r = rnd(5, 9);
    this.alpha = rnd(0.5, 0.75);
    this.decay = rnd(0.01, 0.018);
    // ✅ Trail simplified — store only last 3-4 positions, no objects
    this.trail = [];
    this.maxTrail = TIER === 'ultra-low' ? 2 : (TIER === 'low' ? 3 : 5);
    this.done = false;
  }

  update(W, H) {
    this.trail.push(this.x, this.y); // flat array: [x1,y1,x2,y2,...]
    if (this.trail.length > this.maxTrail * 2) {
      this.trail.splice(0, 2);
    }
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= this.decay;
    if (this.alpha <= 0 || this.y > H + 40 || this.x < -40 || this.x > W + 40) this.done = true;
  }

  draw(ctx) {
    if (this.done) return;
    const { r, g, b } = this.rgb;
    const colorStr = `rgb(${r},${g},${b})`;

    // Trail — simple dots
    const len = this.trail.length / 2;
    for (let i = 0; i < len; i++) {
      const frac = (i + 1) / (len + 1);
      ctx.globalAlpha = this.alpha * frac * 0.4;
      ctx.beginPath();
      ctx.arc(this.trail[i * 2], this.trail[i * 2 + 1], this.r * frac * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = colorStr;
      ctx.fill();
    }

    // Main drop
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = colorStr;
    ctx.fill();

    ctx.globalAlpha = 1;
  }
}

// ─── FloatingDust — ambient powder (simplified) ───────────────────
class FloatingDust {
  constructor(W, H) {
    const rgb = hexToRgb(pick(HOLI_COLORS));
    this.x = rnd(0, W);
    this.y = rnd(H * 0.2, H + 60);
    this.r = rnd(5, TIER === 'ultra-low' ? 10 : 18);
    this.vx = rnd(-0.35, 0.35);
    this.vy = rnd(-0.55, -0.12);
    this.alpha = rnd(0.06, 0.18);
    this.decay = rnd(0.0003, 0.0008);
    this.rgb = rgb;
    this.wobble = rnd(0, Math.PI * 2);
    this.wobbleSpeed = rnd(0.012, 0.03);
    this.done = false;
  }

  update() {
    this.wobble += this.wobbleSpeed;
    this.x += this.vx + Math.sin(this.wobble) * 0.28;
    this.y += this.vy;
    this.alpha -= this.decay;
    if (this.alpha <= 0) this.done = true;
  }

  draw(ctx) {
    if (this.done) return;
    const { r, g, b } = this.rgb;
    // ✅ Simple circle — no gradient
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fill();

    // Soft halo (one extra circle, still cheaper than gradient)
    ctx.globalAlpha = this.alpha * 0.3;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r * 1.6, 0, Math.PI * 2);
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
  const dustTimerRef = useRef(null);
  const activeRef = useRef(active);
  const frameCountRef = useRef(0);
  const isRunningRef = useRef(false);

  // Keep activeRef in sync
  useEffect(() => { activeRef.current = active; }, [active]);

  const addParticles = useCallback((newOnes) => {
    const arr = particlesRef.current;
    const total = arr.length + newOnes.length;
    if (total > CONFIG.maxParticles) {
      arr.splice(0, total - CONFIG.maxParticles);
    }
    arr.push(...newOnes);
    // ✅ FIX: If loop was paused (no particles + not active), restart it
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

  const spawnPichkari = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const W = canvas.width;
    const H = canvas.height;
    const color = pick(HOLI_COLORS);
    const ox = rnd(W * 0.1, W * 0.9);
    const oy = rnd(H * 0.75, H * 0.92);
    const angleBase = rnd(-Math.PI * 0.85, -Math.PI * 0.15);
    const batch = [];
    for (let i = 0; i < CONFIG.pichDrops; i++) {
      const angle = angleBase + rnd(-0.22, 0.22);
      const speed = rnd(5, 12);
      batch.push(new PichkariDrop(ox, oy, angle, speed, color));
    }
    addParticles(batch);
  }, [addParticles]);

  const spawnDust = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    addParticles([new FloatingDust(canvas.width, canvas.height)]);
  }, [addParticles]);

  // ── Smart render loop — pauses when nothing to render ──
  const startLoop = useCallback(() => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;

    const canvas = canvasRef.current;
    if (!canvas) { isRunningRef.current = false; return; }
    const ctx = canvas.getContext('2d', { alpha: true });

    const loop = () => {
      const particles = particlesRef.current;

      // ✅ FIX: If no particles and not active, STOP the loop entirely
      if (particles.length === 0 && !activeRef.current) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        isRunningRef.current = false;
        return; // Don't schedule next frame
      }

      frameCountRef.current++;

      // ✅ Frame skip for ultra-low / low devices
      if (CONFIG.frameSkip > 0 && frameCountRef.current % (CONFIG.frameSkip + 1) !== 0) {
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const alive = [];
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p instanceof PichkariDrop) p.update(W, H); else p.update();
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
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      // ✅ Use devicePixelRatio for sharp rendering but cap at 2x for performance
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      const ctx = canvas.getContext('2d');
      ctx.scale(dpr, dpr);
    };
    resize();

    // ✅ Debounced resize — don't fire on every pixel
    let resizeTimer;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    };
    window.addEventListener('resize', debouncedResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', debouncedResize);
      isRunningRef.current = false;
    };
  }, []);

  // ── Auto effects: only when greeting screen active ──
  useEffect(() => {
    if (active) {
      // Seed dust
      const canvas = canvasRef.current;
      if (canvas) {
        const w = canvas.width / (Math.min(window.devicePixelRatio || 1, 2));
        const h = canvas.height / (Math.min(window.devicePixelRatio || 1, 2));
        for (let i = 0; i < CONFIG.seedDust; i++) {
          particlesRef.current.push(new FloatingDust(w, h));
        }
      }

      // Start loop + auto effects
      startLoop();
      spawnPichkari();
      pichkariTimerRef.current = setInterval(spawnPichkari, CONFIG.pichInterval);
      dustTimerRef.current = setInterval(spawnDust, CONFIG.dustInterval);
    } else {
      clearInterval(pichkariTimerRef.current);
      clearInterval(dustTimerRef.current);
      // Loop will auto-stop when particles die out
    }
    return () => {
      clearInterval(pichkariTimerRef.current);
      clearInterval(dustTimerRef.current);
    };
  }, [active, spawnPichkari, spawnDust, startLoop]);

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