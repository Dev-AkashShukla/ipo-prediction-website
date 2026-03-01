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

// ─── Particle types ────────────────────────────────────────────────────────

/**
 * GulalPuff — A single powder particle for the gulal cloud on tap.
 * Moves with upward drift + sideways spread, fades and shrinks.
 */
class GulalPuff {
  constructor(x, y, color) {
    const rgb = hexToRgb(color);
    this.x = x + rnd(-18, 18);
    this.y = y + rnd(-10, 10);
    this.r = rnd(6, 22);
    this.vx = rnd(-2.5, 2.5);
    this.vy = rnd(-3.5, -0.8);  // upward
    this.ax = rnd(-0.05, 0.05); // slight wind drift
    this.ay = -0.04;             // keep floating up slowly
    this.alpha = rnd(0.55, 0.8);
    this.decay = rnd(0.012, 0.022);
    this.rDecay = rnd(0.08, 0.18);
    this.rgb = rgb;
    this.blur = rnd(3, 9);
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
    ctx.save();
    ctx.filter = `blur(${this.blur}px)`;
    const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
    grad.addColorStop(0, `rgba(${this.rgb.r},${this.rgb.g},${this.rgb.b},${this.alpha})`);
    grad.addColorStop(0.5, `rgba(${this.rgb.r},${this.rgb.g},${this.rgb.b},${this.alpha * 0.5})`);
    grad.addColorStop(1, `rgba(${this.rgb.r},${this.rgb.g},${this.rgb.b},0)`);
    ctx.beginPath();
    ctx.arc(this.x, this.y, Math.max(this.r, 0.1), 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.restore();
  }
}

/**
 * PichkariDrop — A single droplet in a pichkari water stream arc.
 * Follows a parabolic arc (gravity pulled), leaves a trail.
 */
class PichkariDrop {
  constructor(x, y, angle, speed, color) {
    const rgb = hexToRgb(color);
    this.x = x;
    this.y = y;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.gravity = 0.18;
    this.r = rnd(2.5, 5.5);
    this.alpha = rnd(0.6, 0.85);
    this.decay = rnd(0.008, 0.015);
    this.rgb = rgb;
    this.trail = [];
    this.maxTrail = 8;
    this.done = false;
    this.outOfBounds = false;
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
    // Draw trail
    for (let i = 0; i < this.trail.length; i++) {
      const t = this.trail[i];
      const a = (this.alpha * (i / this.trail.length)) * 0.5;
      const r = this.r * (i / this.trail.length) * 0.7;
      ctx.beginPath();
      ctx.arc(t.x, t.y, Math.max(r, 0.1), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.rgb.r},${this.rgb.g},${this.rgb.b},${a})`;
      ctx.fill();
    }
    // Head
    ctx.save();
    ctx.filter = 'blur(1px)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, Math.max(this.r, 0.1), 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.rgb.r},${this.rgb.g},${this.rgb.b},${this.alpha})`;
    ctx.fill();
    ctx.restore();
  }
}

/**
 * FloatingDust — Ambient tiny gulal particles floating upward always.
 * Simulates gulal powder drifting in air.
 */
class FloatingDust {
  constructor(W, H) {
    const color = pick(HOLI_COLORS);
    const rgb = hexToRgb(color);
    this.x = rnd(0, W);
    this.y = rnd(H * 0.2, H + 60);
    this.r = rnd(4, 18);
    this.vx = rnd(-0.4, 0.4);
    this.vy = rnd(-0.6, -0.15);
    this.alpha = rnd(0.08, 0.25);
    this.maxAlpha = this.alpha;
    this.decay = rnd(0.0003, 0.0008);
    this.rgb = rgb;
    this.blur = rnd(4, 12);
    this.wobble = rnd(0, Math.PI * 2);
    this.wobbleSpeed = rnd(0.01, 0.03);
    this.done = false;
  }

  update() {
    this.wobble += this.wobbleSpeed;
    this.x += this.vx + Math.sin(this.wobble) * 0.3;
    this.y += this.vy;
    this.alpha -= this.decay;
    if (this.alpha <= 0) this.done = true;
  }

  draw(ctx) {
    ctx.save();
    ctx.filter = `blur(${this.blur}px)`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, Math.max(this.r, 0.1), 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.rgb.r},${this.rgb.g},${this.rgb.b},${this.alpha})`;
    ctx.fill();
    ctx.restore();
  }
}

// ─── Main Canvas Component ─────────────────────────────────────────────────

const HoliCanvas = forwardRef(function HoliCanvas({ active }, ref) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const rafRef = useRef(null);
  const pichkariTimerRef = useRef(null);
  const dustTimerRef = useRef(null);

  // Expose spawnGulal for parent (tap/click)
  useImperativeHandle(ref, () => ({
    spawnGulal(x, y) {
      spawnGulalAt(x, y);
    },
  }));

  const spawnGulalAt = useCallback((x, y) => {
    const color = pick(HOLI_COLORS);
    const count = 28 + Math.floor(Math.random() * 18);
    for (let i = 0; i < count; i++) {
      particlesRef.current.push(new GulalPuff(x, y, color));
      // add a second color ring
      if (i % 3 === 0) {
        particlesRef.current.push(new GulalPuff(x, y, pick(HOLI_COLORS)));
      }
    }
  }, []);

  const spawnPichkari = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const W = canvas.width;
    const H = canvas.height;
    const color = pick(HOLI_COLORS);

    // Random origin on edges (left/right/bottom-corners)
    const side = Math.random() < 0.5 ? 'left' : 'right';
    let ox, oy, angleBase;
    if (side === 'left') {
      ox = rnd(-10, 30);
      oy = rnd(H * 0.4, H + 10);
      angleBase = rnd(-Math.PI * 0.55, -Math.PI * 0.25); // upper-right arc
    } else {
      ox = rnd(W - 30, W + 10);
      oy = rnd(H * 0.4, H + 10);
      angleBase = rnd(-Math.PI * 0.75, -Math.PI * 0.45); // upper-left arc
    }

    const dropCount = 18 + Math.floor(Math.random() * 12);
    for (let i = 0; i < dropCount; i++) {
      const angle = angleBase + rnd(-0.18, 0.18);
      const speed = rnd(5, 11);
      // stagger launch slightly
      setTimeout(() => {
        particlesRef.current.push(new PichkariDrop(ox, oy, angle, speed, color));
      }, i * 22);
    }
  }, []);

  const spawnDust = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    particlesRef.current.push(new FloatingDust(canvas.width, canvas.height));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Seed initial dust
    for (let i = 0; i < 30; i++) {
      particlesRef.current.push(new FloatingDust(canvas.width, canvas.height));
    }

    const loop = () => {
      const W = canvas.width;
      const H = canvas.height;

      // Semi-transparent clear — gives motion blur / trail feel
      ctx.clearRect(0, 0, W, H);

      particlesRef.current = particlesRef.current.filter(p => !p.done);

      for (const p of particlesRef.current) {
        if (p instanceof PichkariDrop) p.update(W, H);
        else p.update();
        p.draw(ctx);
      }

      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Start/stop auto pichkari + dust when active changes
  useEffect(() => {
    if (active) {
      // Auto pichkari every 2.2s
      pichkariTimerRef.current = setInterval(spawnPichkari, 2200);
      spawnPichkari(); // fire one immediately

      // Keep dust alive
      dustTimerRef.current = setInterval(spawnDust, 400);
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
        zIndex: 5,
      }}
    />
  );
});

export default HoliCanvas;