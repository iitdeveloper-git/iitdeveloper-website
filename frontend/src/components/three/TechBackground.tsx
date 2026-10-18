'use client';

import { useEffect, useRef } from 'react';

export default function TechBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fixed architectural grid: preserve the canvas and brand colors without
    // random particles or a continuous background render loop.
    const draw = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.clearRect(0, 0, width, height);
      const accent = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim() || '#FFB162';
      ctx.strokeStyle = accent;
      ctx.fillStyle = accent;
      ctx.lineWidth = 1;
      for (let row = 0; row < 5; row++) {
        for (let column = 0; column < 10; column++) {
          const x = (column + 0.5) * width / 10;
          const y = (row + 0.5) * height / 5;
          ctx.beginPath();
          ctx.moveTo(x, y);
          if (column < 9) ctx.lineTo(x + width / 10, y);
          ctx.moveTo(x, y);
          if (row < 4 && column % 3 === row % 3) ctx.lineTo(x, y + height / 5);
          ctx.globalAlpha = 0.25;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.globalAlpha = 0.7;
          ctx.fill();
        }
      }
    };
    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    draw();
    return () => observer.disconnect();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.6 }}
    />
  );
}
