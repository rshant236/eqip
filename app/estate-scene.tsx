'use client';

import { useEffect, useRef, useState } from 'react';

type Point = readonly [number, number, number];
type Route = { points: Point[]; color: string; period: number };

const routes: Route[] = [
  { points: [[-193, 60, 1], [-100, 60, 1], [-100, 123, 1], [61, 123, 1], [61, 37, 1], [167, 37, 1]], color: '#49c5ff', period: 4700 },
  { points: [[34, -193, 1], [34, -124, 1], [123, -124, 1], [123, -62, 1], [184, -62, 1]], color: '#79e6ff', period: 6700 },
  { points: [[-165, -166, 1], [-165, -29, 1], [-58, -29, 1], [-58, 37, 1], [61, 37, 1], [61, 176, 1]], color: '#87ffef', period: 5900 },
  { points: [[-115, -99, 1], [-27, -99, 1], [-27, -57, 1], [67, -57, 1], [67, -23, 1], [162, -23, 1]], color: '#4db4ff', period: 5400 },
];

const structures = [
  [-126, -121, 34, 28, 23], [-82, -135, 29, 42, 14], [-38, -146, 39, 37, 30],
  [57, -176, 22, 30, 18], [78, -107, 32, 38, 37], [134, -100, 31, 28, 19],
  [-150, -78, 30, 29, 31], [-110, -64, 36, 25, 49], [-64, -74, 23, 24, 24],
  [-14, -77, 33, 35, 52], [28, -88, 31, 31, 86], [79, -84, 31, 24, 61], [143, -49, 32, 21, 43],
  [-145, -16, 26, 35, 25], [-98, -17, 29, 36, 60], [-49, -16, 37, 35, 116],
  [2, -41, 47, 45, 150], [65, -43, 44, 42, 103], [127, -9, 39, 27, 39],
  [-155, 66, 41, 37, 22], [-95, 66, 29, 42, 38], [-56, 52, 48, 38, 68],
  [5, 29, 36, 40, 52], [73, 47, 31, 35, 75], [119, 58, 29, 44, 28],
  [-127, 126, 30, 33, 19], [-48, 112, 29, 34, 28], [10, 118, 32, 28, 19],
  [80, 108, 39, 36, 33], [139, 123, 32, 27, 17],
].sort(([x1, y1], [x2, y2]) => x1 + y1 - x2 - y2);

function drawEstate(canvas: HTMLCanvasElement, foreground: HTMLCanvasElement, width: number, height: number) {
  canvas.width = width;
  canvas.height = height;
  let context = canvas.getContext('2d')!;
  const scale = Math.min(width / 625, height / 405);
  const originX = width * 0.5;
  const originY = height * 0.61;
  const project = ([x, y, z]: Point) => [originX + (x - y) * 0.866 * scale, originY + ((x + y) * 0.42 - z) * scale] as const;

  function line(points: readonly Point[], color: string, weight: number, fill?: string) {
    context.beginPath();
    points.forEach((point, index) => {
      const [x, y] = project(point);
      if (index === 0) context.moveTo(x, y);
      else context.lineTo(x, y);
    });
    if (fill) {
      context.closePath();
      context.fillStyle = fill;
      context.fill();
    }
    context.strokeStyle = color;
    context.lineWidth = weight * scale;
    context.stroke();
  }

  function box(x: number, y: number, w: number, d: number, z: number, depth: number, accent = false) {
    const top = z + depth;
    const outline = accent ? '#4285ac' : '#284f6a';
    line([[x, y + d, z], [x + w, y + d, z], [x + w, y + d, top], [x, y + d, top]], outline, 0.65, accent ? '#153753' : '#0d2134');
    line([[x + w, y, z], [x + w, y + d, z], [x + w, y + d, top], [x + w, y, top]], outline, 0.65, accent ? '#0b293e' : '#0a192a');
    line([[x, y, top], [x + w, y, top], [x + w, y + d, top], [x, y + d, top]], outline, 0.7, accent ? '#1c4961' : '#142d43');
  }

  const [glowX, glowY] = project([0, 0, 10]);
  const glow = context.createRadialGradient(glowX, glowY, 0, glowX, glowY, 305 * scale);
  glow.addColorStop(0, '#11405b85');
  glow.addColorStop(0.62, '#0e253768');
  glow.addColorStop(1, '#0e253700');
  context.fillStyle = glow;
  context.fillRect(0, 0, width, height);
  for (let offset = -256; offset <= 256; offset += 16) {
    line([[-256, offset, -30], [256, offset, -30]], '#42678020', 0.65);
    line([[offset, -256, -30], [offset, 256, -30]], '#42678020', 0.65);
  }
  box(-189, -189, 378, 378, -23, 15);
  box(-192, -192, 384, 384, -8, 8);
  for (let offset = -176; offset <= 176; offset += 16) {
    line([[-187, offset, 0], [187, offset, 0]], '#42678045', 0.55);
    line([[offset, -187, 0], [offset, 187, 0]], '#42678045', 0.55);
  }
  for (let offset = -175; offset < 180; offset += 8) {
    line([[offset, 192.4, -15], [offset + 3, 192.4, -15]], (offset % 24 === -7) ? '#6bcfff' : '#34627c', 0.7);
  }
  for (const route of routes) {
    line(route.points, route.color + '70', 1.3);
    for (const point of route.points) {
      const [x, y] = project(point);
      context.fillStyle = route.color;
      context.fillRect(x - scale, y - scale, 2 * scale, 2 * scale);
    }
  }
  foreground.width = width;
  foreground.height = height;
  context = foreground.getContext('2d')!;
  for (const [x, y, w, d, tower] of structures) {
    const accent = tower > 62;
    box(x - 3, y - 3, w + 6, d + 6, 0, 3, accent);
    box(x, y, w, d, 3, tower, accent);
    for (let level = 11; level < tower; level += 8) {
      const lit = (level + w) % 13 < 4;
      line([[x + 4, y + d + 0.2, level], [x + w - 4, y + d + 0.2, level]], lit ? '#5ab8e3' : '#305774', lit ? 0.92 : 0.5);
      line([[x + w + 0.2, y + 4, level], [x + w + 0.2, y + d - 4, level]], lit ? '#4f94b6' : '#25445b', 0.55);
    }
    if (accent) {
      box(x + 4, y + 4, w - 8, d - 8, tower + 3, 4, true);
      line([[x + 9, y + d - 9, tower + 7.2], [x + w - 9, y + d - 9, tower + 7.2]], '#8ae9ff', 1.3);
      line([[x + w - 9, y + d - 9, tower + 7.2], [x + w - 9, y + 9, tower + 7.2]], '#63bbdc', 0.85);
    }
  }

  return routes.map((route, index) => {
    // At each turn, keep the light travelling at the same speed.
    const points = route.points.map((point) => project([point[0], point[1], point[2] + 5]));
    const segments = points.slice(1).map(([x, y], i) => {
      const start = points[i];
      return { start, dx: x - start[0], dy: y - start[1], length: Math.hypot(x - start[0], y - start[1]) };
    });
    const length = segments.reduce((sum, segment) => sum + segment.length, 0);
    return { ...route, segments, length, offset: index * 0.24, scale };
  });
}

export default function EstateScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const restartRef = useRef<() => void>(() => {});
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d');
    if (!context) return;
    const backdrop = document.createElement('canvas');
    const foreground = document.createElement('canvas');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let rendered: ReturnType<typeof drawEstate> = [];
    let frame = 0;
    let elapsed = 0;
    let last = 0;
    let visible = false;

    function paint() {
      if (!context) return;
      context.clearRect(0, 0, backdrop.width, backdrop.height);
      context.drawImage(backdrop, 0, 0);
      for (const route of rendered) {
        for (let tail = 0; tail < 7; tail++) {
          const progress = (elapsed / route.period + route.offset - tail * 0.009 + 1) % 1;
          let distance = route.length * progress;
          for (const { start, dx, dy, length } of route.segments) {
            if (distance <= length) {
              const x = start[0] + dx * distance / length;
              const y = start[1] + dy * distance / length;
              context.beginPath();
              context.arc(x, y, Math.max(0.6, (2.25 - tail * 0.18) * route.scale), 0, Math.PI * 2);
              context.globalAlpha = 1 - tail / 7;
              context.fillStyle = tail === 0 ? '#d6f8ff' : route.color;
              context.fill();
              break;
            }
            distance -= length;
          }
        }
      }
      context.globalAlpha = 1;
      context.drawImage(foreground, 0, 0);
    }

    function tick(now: number) {
      frame = 0;
      if (!visible || pausedRef.current || motion.matches || document.hidden) {
        last = 0;
        return;
      }
      if (now - last >= 30) {
        elapsed += last ? Math.min(now - last, 45) : 0;
        paint();
        last = now;
      }
      frame = requestAnimationFrame(tick);
    }

    function resume() {
      if (!frame && visible && !pausedRef.current && !motion.matches && !document.hidden) frame = requestAnimationFrame(tick);
    }

    function resize() {
      const element = canvasRef.current;
      if (!element) return;
      const ratio = Math.min(window.devicePixelRatio, 1.6);
      const { width, height } = element.getBoundingClientRect();
      const w = Math.max(1, Math.round(width * ratio));
      const h = Math.max(1, Math.round(height * ratio));
      if (rendered.length && element.width === w && element.height === h) return;
      element.width = w;
      element.height = h;
      rendered = drawEstate(backdrop, foreground, w, h);
      paint();
    }

    resize();
    const sizes = new ResizeObserver(resize);
    sizes.observe(canvas);
    const viewport = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      resume();
    });
    viewport.observe(canvas);
    motion.addEventListener('change', resume);
    document.addEventListener('visibilitychange', resume);
    restartRef.current = resume;
    return () => {
      cancelAnimationFrame(frame);
      sizes.disconnect();
      viewport.disconnect();
      motion.removeEventListener('change', resume);
      document.removeEventListener('visibilitychange', resume);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="estate-scene" aria-hidden="true" />
      <button type="button" className="estate-motion" onClick={() => {
        pausedRef.current = !pausedRef.current;
        setPaused(pausedRef.current);
        restartRef.current();
      }}>
        <span className="motion-icon" data-paused={paused} aria-hidden="true" />
        {paused ? 'Play animation' : 'Pause animation'}
      </button>
    </>
  );
}
