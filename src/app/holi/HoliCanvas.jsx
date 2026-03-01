// src/app/holi/HoliCanvas.jsx
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

// ── Detect low-end device ─────────────────────────────────────────────────
function isLowEnd() {
  if (typeof navigator === 'undefined') return false;
  const cores = navigator.hardwareConcurrency || 2;
  const mem = navigator.deviceMemory || 2; // GB, Chrome only
  return cores <= 4 || mem <= 2;
}

const LOW_END = isLowEnd();

// ── Particle caps ─────────────────────────────────────────────────────────
const MAX_PARTICLES = LOW_END ? 120 : 280;
const GULAL_COUNT   = LOW_END ? 14  : 26;   // per tap
const DUST_INTERVAL = LOW_END ? 700 : 400;
const PICH_INTERVAL = LOW_END ? 3200 : 2200;

// ─── GulalPuff — powdery cloud particle (NO ctx.filter for perf) ──────────
class GulalPuff {
  constructor(x, y, color) {
    const rgb = hexToRgb(color);
    this.x = x + rnd(-20, 20);
    this.y = y + rnd(-8, 8);
    this.r = rnd(14, LOW_END ? 28 : 42);
    this.vx = rnd(-2.2, 2.2);
    this.vy = rnd(-4.5, -1.8);   // more upward → nicer gulal feel
    this.ax = rnd(-0.03, 0.03);
    this.ay = -0.07;              // stronger lift
    this.alpha = rnd(0.65, 0.9);
    this.decay = rnd(0.012, 0.020);
    this.rDecay = rnd(0.05, 0.12);
    this.rgb = rgb;
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
    // Radial gradient gives soft powder look without expensive blur filter
    const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, Math.max(this.r, 0.1));
    const { r, g, b } = this.rgb;
    grad.addColorStop(0,   `rgba(${r},${g},${b},${this.alpha})`);
    grad.addColorStop(0.55,`rgba(${r},${g},${b},${this.alpha * 0.45})`);
    grad.addColorStop(1,   `rgba(${r},${g},${b},0)`);
    ctx.beginPath();
    ctx.arc(this.x, this.y, Math.max(this.r, 0.1), 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
  }
}

// ─── PichkariDrop — water arc droplet (trail trimmed for perf) ───────────
class PichkariDrop {
  constructor(x, y, angle, speed, color) {
    const rgb = hexToRgb(color);
    this.x = x;
    this.y = y;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.gravity = 0.18;
    this.r = rnd(5.5, 10);
    this.alpha = rnd(0.55, 0.8);
    this.decay = rnd(0.009, 0.016);
    this.rgb = rgb;
    this.trail = [];
    this.maxTrail = LOW_END ? 4 : 7;
    this.done = false;
  }

  update(W, H) {
    this.trail.push({ x: this.x, y: this.y });
    if (this.trail.length > this.maxTrail) this.trail.shift();
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= this.decay;
    if (this.alpha <= 0 || this.y > H + 40 || this.x < -40 || this.x > W + 40) this.done = true;
  }

  draw(ctx) {
    const { r, g, b } = this.rgb;
    for (let i = 0; i < this.trail.length; i++) {
      const t = this.trail[i];
      const frac = i / this.trail.length;
      ctx.beginPath();
      ctx.arc(t.x, t.y, Math.max(this.r * frac * 0.7, 0.1), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r},${g},${b},${this.alpha * frac * 0.5})`;
      ctx.fill();
    }
    ctx.beginPath();
    ctx.arc(this.x, this.y, Math.max(this.r, 0.1), 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${r},${g},${b},${this.alpha})`;
    ctx.fill();
  }
}

// ─── FloatingDust — ambient gulal powder drifting upward (no blur) ────────
class FloatingDust {
  constructor(W, H) {
    const color = pick(HOLI_COLORS);
    const rgb = hexToRgb(color);
    this.x = rnd(0, W);
    this.y = rnd(H * 0.2, H + 60);
    this.r = rnd(5, LOW_END ? 14 : 20);
    this.vx = rnd(-0.35, 0.35);
    this.vy = rnd(-0.55, -0.12);
    this.alpha = rnd(0.07, 0.2);
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
    // Simple circle — radial gradient replaces blur
    const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, Math.max(this.r, 0.1));
    const { r, g, b } = this.rgb;
    grad.addColorStop(0, `rgba(${r},${g},${b},${this.alpha})`);
    grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
    ctx.beginPath();
    ctx.arc(this.x, this.y, Math.max(this.r, 0.1), 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
  }
}

// ─── Main Canvas Component ────────────────────────────────────────────────
const HoliCanvas = forwardRef(function HoliCanvas({ active }, ref) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const rafRef = useRef(null);
  const pichkariTimerRef = useRef(null);
  const dustTimerRef = useRef(null);

  const addParticles = useCallback((newOnes) => {
    const arr = particlesRef.current;
    // Enforce cap — drop oldest if over limit
    const total = arr.length + newOnes.length;
    if (total > MAX_PARTICLES) {
      arr.splice(0, total - MAX_PARTICLES);
    }
    arr.push(...newOnes);
  }, []);

  const spawnGulalAt = useCallback((x, y) => {
    const color = pick(HOLI_COLORS);
    const batch = [];
    for (let i = 0; i < GULAL_COUNT; i++) {
      batch.push(new GulalPuff(x, y, color));
      // Every 4th particle gets a second colour accent
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
    // Spawn from bottom of screen, arc upward — fully on screen
    const ox = rnd(W * 0.1, W * 0.9);
    const oy = rnd(H * 0.75, H * 0.92);
    // Angle range: shoots upward in a wide arc
    const angleBase = rnd(-Math.PI * 0.85, -Math.PI * 0.15);
    const dropCount = LOW_END ? 14 : 22;
    const batch = [];
    for (let i = 0; i < dropCount; i++) {
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

  // ── Render loop ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Seed initial ambient dust (fewer on low-end)
    const seedCount = LOW_END ? 15 : 30;
    for (let i = 0; i < seedCount; i++) {
      particlesRef.current.push(new FloatingDust(canvas.width, canvas.height));
    }

    const loop = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      const alive = [];
      for (const p of particlesRef.current) {
        if (p instanceof PichkariDrop) p.update(W, H); else p.update();
        if (!p.done) { p.draw(ctx); alive.push(p); }
      }
      particlesRef.current = alive;
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // ── Auto pichkari + dust: only when greeting screen active ──
  useEffect(() => {
    if (active) {
      spawnPichkari();
      pichkariTimerRef.current = setInterval(spawnPichkari, PICH_INTERVAL);
      dustTimerRef.current    = setInterval(spawnDust, DUST_INTERVAL);
    } else {
      clearInterval(pichkariTimerRef.current);
      clearInterval(dustTimerRef.current);
    }
    return () => {
      clearInterval(pichkariTimerRef.current);
      clearInterval(dustTimerRef.current);
    };
  }, [active, spawnPichkari, spawnDust]);

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