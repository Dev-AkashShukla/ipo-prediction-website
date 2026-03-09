'use client';
// src/components/home/HeroBg.jsx
// ── TradingView-style Full Canvas Candlestick Background ──
// Large candles filling the full viewport height, scrolling left like a live chart

import { useEffect, useRef } from 'react';

export default function HeroBg() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let W = 0, H = 0, dpr = 1;
    let raf = null;
    let running = true;

    // ── Config ─────────────────────────────────────────────────────
    const CANDLE_W    = 14;      // body width  (px, logical)
    const WICK_W      = 1.5;     // wick stroke width
    const GAP         = 6;       // gap between candles
    const STEP        = CANDLE_W + GAP;
    const SCROLL_SPD  = 0.55;    // px per frame
    const VOL_ZONE    = 0.15;    // bottom 15% = volume bars
    const CHART_PAD_T = 0.08;    // top padding fraction
    const CHART_PAD_B = 0.06;    // bottom padding (above volume) fraction
    const VOLATILITY  = 0.0045;
    const BASE_PRICE  = 263000;

    // Bull / Bear colors matching the screenshot (green / red)
    const BULL_BODY  = '#26a69a';   // teal-green
    const BEAR_BODY  = '#ef5350';   // red
    const BULL_VOL   = '#26a69a44';
    const BEAR_VOL   = '#ef535044';
    const GRID_COLOR = '#e2e8f0';
    const LINE_COLOR = '#2563eb';

    // ── State ──────────────────────────────────────────────────────
    let candles = [];
    let scrollOffset = 0;

    // ── OHLC generator (random walk) ──────────────────────────────
    function genCandle(prevClose) {
      const maxMove = prevClose * VOLATILITY;
      const move    = (Math.random() * 2 - 1) * maxMove;
      const open    = prevClose;
      const close   = Math.max(prevClose * 0.97, prevClose + move);
      const wickExt = Math.abs(move) * (0.4 + Math.random());
      const high    = Math.max(open, close) + wickExt;
      const low     = Math.min(open, close) - wickExt;
      return { open, high, low, close };
    }

    function initCandles() {
      const count = Math.ceil(W / STEP) + 10;
      candles = [];
      let price = BASE_PRICE;
      for (let i = 0; i < count; i++) {
        const c = genCandle(price);
        candles.push(c);
        price = c.close;
      }
      scrollOffset = 0;
    }

    // ── Price → pixel Y ───────────────────────────────────────────
    function toY(price, minP, maxP, chartTop, chartH) {
      if (maxP === minP) return chartTop + chartH / 2;
      return chartTop + chartH - ((price - minP) / (maxP - minP)) * chartH;
    }

    // ── Draw ───────────────────────────────────────────────────────
    function draw() {
      ctx.clearRect(0, 0, W, H);

      const volH    = H * VOL_ZONE;
      const chartH  = H * (1 - VOL_ZONE - CHART_PAD_T - CHART_PAD_B);
      const chartTop = H * CHART_PAD_T;
      const volTop  = chartTop + chartH + H * CHART_PAD_B;

      // Price range across visible candles
      let minP = Infinity, maxP = -Infinity, maxVol = 0;
      candles.forEach(c => {
        if (c.low  < minP) minP = c.low;
        if (c.high > maxP) maxP = c.high;
        const v = Math.abs(c.close - c.open);
        if (v > maxVol) maxVol = v;
      });
      // Tiny padding so candles don't touch edges
      const priceRange = maxP - minP || 1;
      minP -= priceRange * 0.05;
      maxP += priceRange * 0.05;

      // ── Grid lines ──────────────────────────────────────────────
      ctx.save();
      ctx.strokeStyle = GRID_COLOR;
      ctx.lineWidth   = 0.6;
      ctx.globalAlpha = 0.6;
      const gridLines = 6;
      for (let g = 0; g <= gridLines; g++) {
        const y = chartTop + (g / gridLines) * chartH;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }
      // Volume separator line
      ctx.globalAlpha = 0.3;
      ctx.beginPath();
      ctx.moveTo(0, volTop);
      ctx.lineTo(W, volTop);
      ctx.stroke();
      ctx.restore();

      // ── Close-price line (subtle glow) ──────────────────────────
      ctx.save();
      ctx.strokeStyle = LINE_COLOR;
      ctx.lineWidth   = 1.5;
      ctx.globalAlpha = 0.25;
      ctx.shadowColor = LINE_COLOR;
      ctx.shadowBlur  = 8;
      ctx.beginPath();
      let lineStarted = false;
      candles.forEach((c, i) => {
        const x = i * STEP - scrollOffset + CANDLE_W / 2;
        if (x < -STEP || x > W + STEP) return;
        const y = toY(c.close, minP, maxP, chartTop, chartH);
        if (!lineStarted) { ctx.moveTo(x, y); lineStarted = true; }
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.restore();

      // ── Candles + Volume bars ────────────────────────────────────
      candles.forEach((c, i) => {
        const x = i * STEP - scrollOffset + CANDLE_W / 2;
        if (x < -STEP * 2 || x > W + STEP * 2) return;

        const bull     = c.close >= c.open;
        const bodyCol  = bull ? BULL_BODY : BEAR_BODY;
        const volCol   = bull ? BULL_VOL  : BEAR_VOL;

        const oY = toY(c.open,  minP, maxP, chartTop, chartH);
        const cY = toY(c.close, minP, maxP, chartTop, chartH);
        const hY = toY(c.high,  minP, maxP, chartTop, chartH);
        const lY = toY(c.low,   minP, maxP, chartTop, chartH);

        const bodyTop = Math.min(oY, cY);
        const bodyH   = Math.max(Math.abs(cY - oY), 1.5);

        // Edge fade (left & right margins)
        const fadeW  = W * 0.07;
        const fadeL  = Math.min(1, x / fadeW);
        const fadeR  = Math.min(1, (W - x) / fadeW);
        const alpha  = Math.max(0, Math.min(fadeL, fadeR));

        ctx.save();
        ctx.globalAlpha = alpha;

        // Wick
        ctx.beginPath();
        ctx.strokeStyle = bodyCol;
        ctx.lineWidth   = WICK_W;
        ctx.moveTo(x, hY);
        ctx.lineTo(x, lY);
        ctx.stroke();

        // Body (filled for bull, outlined-ish for bear — like TradingView default)
        if (bull) {
          ctx.fillStyle = bodyCol;
          ctx.fillRect(x - CANDLE_W / 2, bodyTop, CANDLE_W, bodyH);
        } else {
          // Bear: solid fill slightly transparent
          ctx.fillStyle = bodyCol;
          ctx.fillRect(x - CANDLE_W / 2, bodyTop, CANDLE_W, bodyH);
        }

        // Volume bar
        const volFrac = maxVol > 0 ? Math.abs(c.close - c.open) / maxVol : 0;
        const barH    = Math.max(2, volFrac * volH * 0.88);
        ctx.fillStyle = volCol;
        ctx.globalAlpha = alpha * 0.85;
        ctx.fillRect(x - CANDLE_W / 2, volTop + volH - barH, CANDLE_W, barH);

        ctx.restore();
      });
    }

    // ── Animation loop ─────────────────────────────────────────────
    function frame() {
      if (!running) return;

      scrollOffset += SCROLL_SPD;

      // Recycle candles: shift left when first candle scrolls out
      if (scrollOffset >= STEP) {
        scrollOffset -= STEP;
        candles.shift();
        const last = candles[candles.length - 1].close;
        candles.push(genCandle(last));
      }

      draw();
      raf = requestAnimationFrame(frame);
    }

    // ── Resize ─────────────────────────────────────────────────────
    function resize() {
      dpr    = Math.min(window.devicePixelRatio || 1, 2);
      W      = canvas.offsetWidth;
      H      = canvas.offsetHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initCandles();
    }

    // ── Pause on hidden tab ────────────────────────────────────────
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        raf = requestAnimationFrame(frame);
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    document.addEventListener('visibilitychange', onVisibility);
    raf = requestAnimationFrame(frame);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.18 }}
    />
  );
}