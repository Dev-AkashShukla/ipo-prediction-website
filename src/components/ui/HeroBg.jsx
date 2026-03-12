'use client';
// src/components/ui/HeroBg.jsx
// Canvas starts AFTER mount — no SSR mismatch, no blank flash

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

    const CANDLE_W   = 14;
    const WICK_W     = 1.5;
    const GAP        = 6;
    const STEP       = CANDLE_W + GAP;
    const SCROLL_SPD = 0.55;
    const VOL_ZONE   = 0.15;
    const CHART_PAD_T = 0.08;
    const CHART_PAD_B = 0.06;
    const VOLATILITY = 0.0045;
    const BASE_PRICE = 263000;

    const BULL_BODY = '#26a69a';
    const BEAR_BODY = '#ef5350';
    const BULL_VOL  = '#26a69a44';
    const BEAR_VOL  = '#ef535044';
    const GRID_COLOR = '#e2e8f0';
    const LINE_COLOR = '#2563eb';

    let candles = [];
    let scrollOffset = 0;

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

    function toY(price, minP, maxP, chartTop, chartH) {
      if (maxP === minP) return chartTop + chartH / 2;
      return chartTop + chartH - ((price - minP) / (maxP - minP)) * chartH;
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      const volH    = H * VOL_ZONE;
      const chartH  = H * (1 - VOL_ZONE - CHART_PAD_T - CHART_PAD_B);
      const chartTop = H * CHART_PAD_T;
      const volTop  = chartTop + chartH + H * CHART_PAD_B;

      let minP = Infinity, maxP = -Infinity, maxVol = 0;
      candles.forEach(c => {
        if (c.low  < minP) minP = c.low;
        if (c.high > maxP) maxP = c.high;
        const v = Math.abs(c.close - c.open);
        if (v > maxVol) maxVol = v;
      });
      const priceRange = maxP - minP || 1;
      minP -= priceRange * 0.05;
      maxP += priceRange * 0.05;

      ctx.save();
      ctx.strokeStyle = GRID_COLOR;
      ctx.lineWidth   = 0.6;
      ctx.globalAlpha = 0.6;
      for (let g = 0; g <= 6; g++) {
        const y = chartTop + (g / 6) * chartH;
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }
      ctx.globalAlpha = 0.3;
      ctx.beginPath(); ctx.moveTo(0, volTop); ctx.lineTo(W, volTop); ctx.stroke();
      ctx.restore();

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

      candles.forEach((c, i) => {
        const x = i * STEP - scrollOffset + CANDLE_W / 2;
        if (x < -STEP * 2 || x > W + STEP * 2) return;

        const bull    = c.close >= c.open;
        const bodyCol = bull ? BULL_BODY : BEAR_BODY;
        const volCol  = bull ? BULL_VOL  : BEAR_VOL;

        const oY = toY(c.open,  minP, maxP, chartTop, chartH);
        const cY = toY(c.close, minP, maxP, chartTop, chartH);
        const hY = toY(c.high,  minP, maxP, chartTop, chartH);
        const lY = toY(c.low,   minP, maxP, chartTop, chartH);

        const bodyTop = Math.min(oY, cY);
        const bodyH   = Math.max(Math.abs(cY - oY), 1.5);

        const fadeW = W * 0.07;
        const fadeL = Math.min(1, x / fadeW);
        const fadeR = Math.min(1, (W - x) / fadeW);
        const alpha = Math.max(0, Math.min(fadeL, fadeR));

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.strokeStyle = bodyCol;
        ctx.lineWidth   = WICK_W;
        ctx.moveTo(x, hY); ctx.lineTo(x, lY); ctx.stroke();
        ctx.fillStyle = bodyCol;
        ctx.fillRect(x - CANDLE_W / 2, bodyTop, CANDLE_W, bodyH);
        const volFrac = maxVol > 0 ? Math.abs(c.close - c.open) / maxVol : 0;
        const barH    = Math.max(2, volFrac * volH * 0.88);
        ctx.fillStyle = volCol;
        ctx.globalAlpha = alpha * 0.85;
        ctx.fillRect(x - CANDLE_W / 2, volTop + volH - barH, CANDLE_W, barH);
        ctx.restore();
      });
    }

    function frame() {
      if (!running) return;
      scrollOffset += SCROLL_SPD;
      if (scrollOffset >= STEP) {
        scrollOffset -= STEP;
        candles.shift();
        candles.push(genCandle(candles[candles.length - 1].close));
      }
      draw();
      raf = requestAnimationFrame(frame);
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W   = canvas.offsetWidth;
      H   = canvas.offsetHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initCandles();
    }

    const onVisibility = () => {
      if (document.hidden) { cancelAnimationFrame(raf); }
      else { raf = requestAnimationFrame(frame); }
    };

    // ✅ requestIdleCallback — canvas starts after critical content renders
    const startCanvas = () => {
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(canvas);
      document.addEventListener('visibilitychange', onVisibility);
      raf = requestAnimationFrame(frame);
      return ro;
    };

    let ro;
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(() => { ro = startCanvas(); });
      return () => {
        running = false;
        cancelIdleCallback(id);
        cancelAnimationFrame(raf);
        ro?.disconnect();
        document.removeEventListener('visibilitychange', onVisibility);
      };
    } else {
      // Fallback for Safari
      const t = setTimeout(() => { ro = startCanvas(); }, 100);
      return () => {
        running = false;
        clearTimeout(t);
        cancelAnimationFrame(raf);
        ro?.disconnect();
        document.removeEventListener('visibilitychange', onVisibility);
      };
    }
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