// src/app/holi/HoliAnimations.jsx
'use client';
import { useMemo, useState, useEffect } from 'react';

export const HOLI_COLORS = [
  '#FF1744', '#F50057', '#D500F9', '#651FFF',
  '#2979FF', '#00E676', '#FFEA00', '#FF9100',
  '#FF6D00', '#E040FB', '#00E5FF', '#76FF03',
  '#FF4081', '#7C4DFF', '#18FFFF', '#69F0AE',
];

export function ColorSplash({ x, y, color, size }) {
  return (
    <div
      className="holi-splash"
      style={{
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, ${color}66 35%, transparent 70%)`,
      }}
    />
  );
}

export function Particle({ x, y, color, delay }) {
  const angle = Math.random() * Math.PI * 2;
  const dist = 30 + Math.random() * 100;
  const tx = Math.cos(angle) * dist;
  const ty = Math.sin(angle) * dist;
  const size = 3 + Math.random() * 8;

  return (
    <div
      className="holi-particle"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        background: color,
        animationDelay: `${delay}s`,
        '--tx': `${tx}px`,
        '--ty': `${ty}px`,
      }}
    />
  );
}

// ── Fixed: Math.random() only runs client-side after mount ──
export function FloatingGulal() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const gulals = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        color: HOLI_COLORS[i % HOLI_COLORS.length],
        left: Math.random() * 100,
        size: 50 + Math.random() * 70,
        duration: 6 + Math.random() * 10,
        delay: i * 0.4,
        opacity: 0.55 + Math.random() * 0.25,
      })),
    []
  );

  // Render nothing on server — avoids hydration mismatch
  if (!mounted) return null;

  return (
    <>
      {gulals.map((g) => (
        <div
          key={g.id}
          className="holi-gulal"
          style={{
            left: `${g.left}%`,
            width: g.size,
            height: g.size,
            background: `radial-gradient(circle, ${g.color}, transparent)`,
            animationDuration: `${g.duration}s`,
            animationDelay: `${g.delay}s`,
            opacity: g.opacity,
            filter: 'blur(6px)',
          }}
        />
      ))}
    </>
  );
}