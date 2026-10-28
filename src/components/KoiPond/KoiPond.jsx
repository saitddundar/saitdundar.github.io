import React, { useRef, useEffect } from 'react';
import './KoiPond.css';

const FPS = 30;
const SS = 2;
const SLICES = 40;
const RAMP = " .`,:;~-+=*#%$@";
const TAU = Math.PI * 2;
const RAD = Math.PI / 180;
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const damp = (a, b, rate, dt) => a + (b - a) * (1 - Math.exp(-rate * dt));
const smooth = (a, b, x) => {
  const u = clamp((x - a) / (b - a), 0, 1);
  return u * u * (3 - 2 * u);
};
const pulse = (time, duration) =>
  smooth(0, 0.16, time) * (1 - smooth(duration - 0.24, duration, time));

const ANATOMY = {
  'koi-a': [
    [164, 55], [142, 99], [111, 159], [85, 222],
    [64, 290], [63, 359], [78, 428], [99, 485], [103, 534],
  ],
  'koi-b': [
    [246, 5], [216, 53], [178, 109], [135, 171],
    [104, 239], [84, 309], [82, 379], [112, 451], [164, 515],
    [219, 526], [277, 524], [333, 520], [386, 520],
  ],
};

function createSwimmers() {
  return [
    { src: 'koi-a', cropY: 55, x: 0.19, y: 0.56, h: 135 * RAD, baseLen: 56, phase: 0, seed: 0.7, pace: 0.31 },
    { src: 'koi-b', cropY: 0, x: 0.78, y: 0.68, h: 320 * RAD, baseLen: 72, phase: 2.8, seed: 3.2, pace: 0.27 },
    { src: 'koi-a', cropY: 55, x: 0.51, y: 0.81, h: 65 * RAD, baseLen: 44, phase: 5.1, seed: 5.8, pace: 0.35, flip: true },
  ].map((sw) => ({
    ...sw,
    len: sw.baseLen,
    curvature: 0,
    turnRate: 0,
    distance: 0,
    trail: [
      { distance: -2, heading: sw.h },
      { distance: 0, heading: sw.h },
    ],
    gaitClock: sw.seed * 0.28,
    bout: 0,
    burstDuration: 1.05,
    coastDuration: 1.6 + sw.seed * 0.09,
    beatHz: 1.1,
    activity: 0,
    finAngle: 0,
    randomState: 1 + Math.floor(Math.random() * 2147483646),
    goal: null,
    goalTime: 0,
    navigationTime: 0,
    requestedTurn: 0,
    turnMemory: 0,
    speed: 0,
    wake: 0,
    off: new Float32Array(SLICES + 1),
    points: Array.from({ length: SLICES + 1 }, () => ({ x: 0, y: 0 })),
    edges: Array.from({ length: SLICES + 1 }, () => ({ lx: 0, ly: 0, rx: 0, ry: 0 })),
  }));
}

function random(sw) {
  sw.randomState = (sw.randomState * 48271) % 2147483647;
  return (sw.randomState - 1) / 2147483646;
}

function chooseGoal(sw, cols, rows, ASPECT, waterTop) {
  const L = sw.len;
  sw.goal = {
    x: cols * (0.12 + random(sw) * 0.76),
    y: waterTop + (rows * ASPECT - waterTop) * (0.15 + random(sw) * 0.7),
  };
  sw.goalTime = 16 + random(sw) * 12;
}

function chooseCourse(sw, swimmers, cols, rows, ASPECT, waterTop) {
  const L = sw.len;
  const travel = L * 0.1;
  const height = waterTop ? Math.max(rows * ASPECT, waterTop + L * 4.4) : rows * ASPECT;
  const dt = travel / Math.max(sw.speed, L * 0.6);
  let paths = [{ x: sw.x, y: sw.y * ASPECT, h: sw.h, curve: sw.curvature, cost: 0, first: 0 }];
  for (let depth = 0; depth < 7; depth++) {
    const next = [];
    for (const path of paths)
      for (const requested of [-1.2, -0.6, 0, 0.6, 1.2]) {
        let { x, y, h, curve, cost } = path;
        for (let i = 0; i < 7; i++) {
          curve = damp(curve, requested, 2.4, dt);
          const yaw = (curve * travel) / L;
          x += Math.sin(h + yaw * 0.5) * travel;
          y -= Math.cos(h + yaw * 0.5) * travel;
          h += yaw;
          const dx = Math.max(0, -L * 0.2 - x, x - (cols + L * 0.2)) / L;
          const dy = Math.max(0, waterTop + L * 0.2 - y, y - height) / L;
          cost += (dx * dx + dy * dy) * 2000;
          if (depth === 0 && i < 4)
            for (const other of swimmers) {
              if (other === sw) continue;
              const ahead = dt * (i + 1) * other.speed;
              const gap =
                Math.hypot(x - other.x - Math.sin(other.h) * ahead, y - other.y * ASPECT + Math.cos(other.h) * ahead) /
                ((L + other.len) * 0.5);
              cost += Math.max(0, 0.65 - gap) ** 2 * 2;
            }
        }
        const remaining = Math.hypot(x - sw.goal.x, y - sw.goal.y) / L;
        const radius = L / 1.2;
        const room = (sign) => {
          const cx = x + Math.cos(h) * radius * sign;
          const cy = y + Math.sin(h) * radius * sign;
          return Math.max(0, radius - cx - L * 0.2, cx + radius - cols - L * 0.2, waterTop + L * 0.1 + radius - cy, cy + radius - height) / L;
        };
        const trapped = Math.min(room(-1), room(1));
        const circling = Math.max(0, Math.abs(sw.turnMemory + h - sw.h) - 3);
        const score = cost + trapped ** 2 * 2000 + remaining ** 2 * 3 + circling ** 2 * 6;
        next.push({ x, y, h, curve, cost, score, first: depth ? path.first : requested });
      }
    next.sort((a, b) => a.score - b.score);
    paths = next.slice(0, 16);
  }
  return paths[0].first;
}

function advanceStep(sw, t, dt, swimmers, cols, rows, ASPECT, waterTop) {
  const L = sw.len;
  sw.goalTime -= dt;
  sw.navigationTime -= dt;
  if (!sw.goal || sw.goalTime <= 0 || Math.hypot(sw.x - sw.goal.x, sw.y * ASPECT - sw.goal.y) < L * 0.7) {
    chooseGoal(sw, cols, rows, ASPECT, waterTop);
    sw.navigationTime = 0;
  }
  if (sw.navigationTime <= 0) {
    sw.requestedTurn = chooseCourse(sw, swimmers, cols, rows, ASPECT, waterTop);
    sw.navigationTime += 0.3;
  }
  sw.gaitClock += dt;
  const cycle = sw.burstDuration + 0.32 + sw.coastDuration;
  if (sw.gaitClock >= cycle) {
    sw.gaitClock -= cycle;
    sw.bout++;
    const variation = 0.5 + 0.5 * Math.sin(sw.bout * 2.39996 + sw.seed);
    sw.burstDuration = 0.9 + 0.36 * variation;
    sw.coastDuration = 1.35 + 0.95 * (1 - variation);
  }
  sw.beatHz = 1.15 * Math.sqrt(56 / sw.baseLen);
  sw.phase = TAU * sw.beatHz * sw.gaitClock;
  sw.activity = pulse(sw.gaitClock - 0.22, sw.burstDuration);
  const effort = sw.activity;
  sw.speed += dt * (L * 0.42 * (sw.pace / 0.31) * effort - (0.9 * sw.speed * sw.speed) / L);
  sw.speed = Math.max(0, sw.speed);
  steer(sw, sw.requestedTurn, dt, ASPECT);
  sw.turnMemory = damp(sw.turnMemory, 0, 0.03, dt) + sw.turnRate * dt;
  sw.finAngle = damp(sw.finAngle, -0.24 * sw.activity * Math.sin(sw.phase - 0.7), 10, dt);
}

function advance(sw, t, dt, swimmers, cols, rows, ASPECT, waterTop) {
  const steps = Math.max(1, Math.ceil(dt * 120));
  for (let i = 0; i < steps; i++)
    advanceStep(sw, t - dt + ((i + 1) * dt) / steps, dt / steps, swimmers, cols, rows, ASPECT, waterTop);
}

function steer(sw, requested, dt, ASPECT) {
  sw.curvature = damp(sw.curvature, clamp(requested, -1.2, 1.2), 2.4, dt);
  const travel = sw.speed * dt;
  const yaw = (sw.curvature * travel) / sw.len;
  const heading = sw.h + yaw * 0.5;
  sw.x += Math.sin(heading) * travel;
  sw.y -= (Math.cos(heading) * travel) / ASPECT;
  sw.h += yaw;
  sw.turnRate = dt ? yaw / dt : 0;
  sw.distance += travel / sw.len;
  const trail = sw.trail;
  if (sw.distance - trail[trail.length - 1].distance >= 0.0125) {
    trail.push({ distance: sw.distance, heading: sw.h });
    while (trail.length > 2 && trail[1].distance < sw.distance - 1.3) trail.shift();
  }
}

function trailHeading(sw, behind) {
  const target = sw.distance - behind;
  const trail = sw.trail;
  let lo = 0;
  let hi = trail.length;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (trail[mid].distance < target) lo = mid + 1;
    else hi = mid;
  }
  const b = trail[lo] || { distance: sw.distance, heading: sw.h };
  const a = trail[Math.max(0, lo - 1)];
  const u = clamp((target - a.distance) / Math.max(0.000001, b.distance - a.distance), 0, 1);
  return a.heading + (b.heading - a.heading) * u;
}

function triangleDraw(ctx, img, sx0, sy0, sx1, sy1, sx2, sy2, x0, y0, x1, y1, x2, y2) {
  const su1 = sx1 - sx0, sv1 = sy1 - sy0, su2 = sx2 - sx0, sv2 = sy2 - sy0;
  const det = su1 * sv2 - su2 * sv1;
  if (Math.abs(det) < 0.0001) return;
  const dx1 = x1 - x0, dy1 = y1 - y0, dx2 = x2 - x0, dy2 = y2 - y0;
  const a = (dx1 * sv2 - dx2 * sv1) / det;
  const b = (dy1 * sv2 - dy2 * sv1) / det;
  const c = (dx2 * su1 - dx1 * su2) / det;
  const d = (dy2 * su1 - dy1 * su2) / det;
  ctx.save();
  ctx.beginPath();
  const mx = (x0 + x1 + x2) / 3, my = (y0 + y1 + y2) / 3;
  const expand = (x, y) => {
    const n = Math.hypot(x - mx, y - my) || 1;
    return [x + ((x - mx) / n) * 0.055, y + ((y - my) / n) * 0.055];
  };
  ctx.moveTo(...expand(x0, y0));
  ctx.lineTo(...expand(x1, y1));
  ctx.lineTo(...expand(x2, y2));
  ctx.closePath();
  ctx.clip();
  ctx.transform(a, b, c, d, x0 - a * sx0 - c * sy0, y0 - b * sx0 - d * sy0);
  ctx.drawImage(img, 0, 0);
  ctx.restore();
}

function drawFish(ctx, sw, SS, ASPECT) {
  if (!sw.texture) return;
  const img = sw.texture;
  const L = sw.len;
  const { off, points, edges } = sw;
  const step = L / SLICES;
  const neck = Math.round(SLICES * 0.24);
  for (let i = 0; i <= SLICES; i++) {
    const s = i / SLICES;
    const packet = pulse(sw.gaitClock - s * 0.32, sw.burstDuration);
    const amplitude = 0.012 - 0.035 * s + 0.11 * s * s;
    off[i] = L * amplitude * packet * Math.sin((TAU * s) / 1.15 - sw.phase);
  }
  const skullSlope = off[neck + 1] - off[neck];
  for (let i = neck - 1; i >= 0; i--) off[i] = off[i + 1] - skullSlope;
  points[0].x = 0;
  points[0].y = 0;
  for (let i = 1; i <= SLICES; i++) {
    const s = (i - 0.5) / SLICES;
    const swimAngle = Math.asin(clamp((off[i] - off[i - 1]) / step, -0.8, 0.8));
    const turnAngle = sw.h - trailHeading(sw, Math.max(0, s - neck / SLICES));
    const tailAngle = sw.finAngle * smooth(0.8, 1, s);
    const a = swimAngle + turnAngle + tailAngle;
    points[i].x = points[i - 1].x + Math.sin(a) * step;
    points[i].y = points[i - 1].y + Math.cos(a) * step;
  }
  const anchorX = points[neck].x, anchorY = points[neck].y;
  for (const p of points) { p.x -= anchorX; p.y -= anchorY; }
  for (let i = 0; i <= SLICES; i++) {
    const prev = points[Math.max(0, i - 1)], next = points[Math.min(SLICES, i + 1)];
    const dx = next.x - prev.x, dy = next.y - prev.y;
    const norm = Math.hypot(dx, dy) || 1;
    const nx = dy / norm, ny = -dx / norm;
    const halfWidth = (sw.rig[i].halfWidth * L) / sw.rigLength;
    edges[i].lx = points[i].x + nx * -halfWidth;
    edges[i].ly = points[i].y + ny * -halfWidth;
    edges[i].rx = points[i].x + nx * halfWidth;
    edges[i].ry = points[i].y + ny * halfWidth;
  }
  ctx.save();
  ctx.scale(SS, SS);
  ctx.translate(sw.x, sw.y);
  ctx.scale(1, 1 / ASPECT);
  ctx.rotate(sw.h);
  for (let i = 0; i < SLICES; i++) {
    const a = edges[i], b = edges[i + 1];
    const u = sw.rig[i], v = sw.rig[i + 1];
    triangleDraw(ctx, img, u.lx, u.ly, u.rx, u.ry, v.lx, v.ly, a.lx, a.ly, a.rx, a.ry, b.lx, b.ly);
    triangleDraw(ctx, img, u.rx, u.ry, v.rx, v.ry, v.lx, v.ly, a.rx, a.ry, b.rx, b.ry, b.lx, b.ly);
  }
  ctx.restore();
}

function classOf(r, g, b, lum) {
  const mx = Math.max(r, g, b);
  const mn = Math.min(r, g, b);
  const sat = (mx - mn) / Math.max(mx, 1);
  if (mx < 92) return 'k';
  if (r > g + 18 && r > b + 18 && sat > 0.26) {
    return lum < 118 ? 'd' : lum < 186 ? 'a' : 'p';
  }
  return lum < 158 ? 'b' : 'l';
}

async function recoverTail(img) {
  if (!img || !img.naturalWidth || typeof DecompressionStream !== 'function') return null;
  const response = await fetch(img.src);
  if (!response.ok) return null;
  const bytes = new Uint8Array(await response.arrayBuffer());
  if (bytes.length < 33) return null;
  const view = new DataView(bytes.buffer);
  if (view.getUint32(0) !== 0x89504e47 || view.getUint32(4) !== 0x0d0a1a0a ||
    bytes[24] !== 8 || bytes[25] !== 6 || bytes[28] !== 0 ||
    view.getUint32(16) !== 264 || view.getUint32(20) < 72) return null;
  const width = view.getUint32(16), height = Math.min(72, view.getUint32(20));
  const parts = [];
  for (let offset = 8; offset + 12 <= bytes.length;) {
    const length = view.getUint32(offset), type = view.getUint32(offset + 4);
    if (offset + length + 12 > bytes.length) return null;
    if (type === 0x49444154) parts.push(bytes.slice(offset + 8, offset + 8 + length));
    offset += length + 12;
  }
  const stream = new Blob(parts).stream().pipeThrough(new DecompressionStream('deflate'));
  const packed = new Uint8Array(await new Response(stream).arrayBuffer());
  const stride = width * 4, pixels = new Uint8ClampedArray(width * height * 4);
  if (packed.length < height * (stride + 1)) return null;
  const paeth = (a, b, c) => {
    const p = a + b - c, da = Math.abs(p - a), db = Math.abs(p - b), dc = Math.abs(p - c);
    return da <= db && da <= dc ? a : db <= dc ? b : c;
  };
  for (let y = 0; y < height; y++) {
    const filter = packed[y * (stride + 1)];
    if (filter > 4) return null;
    for (let x = 0; x < stride; x++) {
      const i = y * stride + x;
      const left = x >= 4 ? pixels[i - 4] : 0, up = y ? pixels[i - stride] : 0;
      const corner = y && x >= 4 ? pixels[i - stride - 4] : 0;
      const predict = filter === 1 ? left : filter === 2 ? up : filter === 3 ? (left + up) >> 1 : filter === 4 ? paeth(left, up, corner) : 0;
      pixels[i] = (packed[y * (stride + 1) + x + 1] + predict) & 255;
    }
  }
  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const light = Math.max(pixels[i], pixels[i + 1], pixels[i + 2]);
      pixels[i + 3] = y < 54 || x >= 200 ? Math.min(255, light * 12) : 0;
    }
  const tail = document.createElement('canvas');
  tail.width = width;
  tail.height = height;
  const g = tail.getContext('2d');
  if (!g) return null;
  g.putImageData(new ImageData(pixels, width, height), 0, 0);
  return tail;
}

function prepareTexture(sw, img, donor) {
  const c = document.createElement('canvas');
  const unit = img.naturalWidth / 264;
  const donorWidth = donor ? donor.width : 0;
  const restoreTail = sw.src === 'koi-b' && donorWidth;
  c.width = restoreTail ? Math.ceil(425 * unit) : img.naturalWidth;
  c.height = restoreTail ? Math.ceil(566 * unit) : img.naturalHeight - sw.cropY;
  const g = c.getContext('2d', { willReadFrequently: true });
  if (!g) return;
  if (sw.flip) { g.translate(c.width, 0); g.scale(-1, 1); }
  g.drawImage(img, 0, sw.cropY, img.naturalWidth, img.naturalHeight - sw.cropY, 0, 0, img.naturalWidth, img.naturalHeight - sw.cropY);
  if (sw.cropY) g.clearRect(200 * unit, 0, 64 * unit, 18 * unit);
  if (restoreTail) {
    const donorUnit = donorWidth / 264;
    g.save();
    g.translate(496.88 * unit, 549.02 * unit);
    g.scale((-1.261 * unit) / donorUnit, (-1.261 * unit) / donorUnit);
    g.drawImage(donor, 0, 0, donorWidth, 54 * donorUnit, 0, 0, donorWidth, 54 * donorUnit);
    g.drawImage(donor, 200 * donorUnit, 54 * donorUnit, 64 * donorUnit, 18 * donorUnit, 200 * donorUnit, 54 * donorUnit, 64 * donorUnit, 18 * donorUnit);
    g.restore();
  }
  const anatomyKey = sw.src;
  const anatomy = sw.src === 'koi-b' && !restoreTail ? ANATOMY[anatomyKey].slice(0, 9) : ANATOMY[anatomyKey];
  const keys = anatomy.map(([x, y]) => ({
    x: sw.flip ? c.width - x * unit : x * unit,
    y: y * unit - sw.cropY,
  }));
  const samples = [];
  let distance = 0;
  for (let k = 0; k <= (keys.length - 1) * 20; k++) {
    const index = Math.min(keys.length - 2, Math.floor(k / 20));
    const u = k / 20 - index;
    const a = keys[Math.max(0, index - 1)], b = keys[index];
    const d = keys[Math.min(keys.length - 1, index + 2)], e = keys[index + 1];
    const catmull = (axis) =>
      0.5 * (2 * b[axis] + (-a[axis] + e[axis]) * u + (2 * a[axis] - 5 * b[axis] + 4 * e[axis] - d[axis]) * u * u + (-a[axis] + 3 * b[axis] - 3 * e[axis] + d[axis]) * u * u * u);
    const x = catmull('x'), y = catmull('y');
    const prev = samples[samples.length - 1];
    if (prev) distance += Math.hypot(x - prev.x, y - prev.y);
    samples.push({ x, y, distance });
  }
  const centers = [];
  let idx = 1;
  for (let i = 0; i <= SLICES; i++) {
    const target = (i / SLICES) * distance;
    while (idx < samples.length - 1 && samples[idx].distance < target) idx++;
    const a = samples[idx - 1], b = samples[idx];
    const u = (target - a.distance) / Math.max(0.001, b.distance - a.distance);
    centers.push({ x: a.x + (b.x - a.x) * u, y: a.y + (b.y - a.y) * u });
  }
  const widths = [[0, 0.18], [0.1, 0.28], [0.24, 0.53], [0.38, 0.5], [0.55, 0.29], [0.74, 0.2], [0.9, 0.28], [1, 0.28]];
  sw.rig = centers.map((p, i) => {
    const a = centers[Math.max(0, i - 1)], b = centers[Math.min(SLICES, i + 1)];
    const length = Math.hypot(b.x - a.x, b.y - a.y);
    const nx = (b.y - a.y) / length, ny = -(b.x - a.x) / length;
    const s = i / SLICES;
    let j = 1;
    while (j < widths.length - 1 && widths[j][0] < s) j++;
    const u = (s - widths[j - 1][0]) / (widths[j][0] - widths[j - 1][0]);
    const halfWidth = img.naturalWidth * (widths[j - 1][1] + u * (widths[j][1] - widths[j - 1][1]));
    return { lx: p.x - nx * halfWidth, ly: p.y - ny * halfWidth, rx: p.x + nx * halfWidth, ry: p.y + ny * halfWidth, halfWidth };
  });
  sw.texture = c;
  sw.rigLength = distance;
}

const KoiPond = () => {
  const preRef = useRef(null);
  const boxRef = useRef(null);

  useEffect(() => {
    const host = preRef.current;
    const box = boxRef.current;
    if (!host || !box) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let cols = 80, rows = 40, ASPECT = 1.9;
    let elapsed = 0, timer = null, lastTime = null, ready = false, measured = false;
    // Image and font loads outlive an unmount (StrictMode mounts twice in dev); without
    // this flag the stale instance starts a second loop writing into the same <pre>.
    let disposed = false;
    let waterTop = 0;
    let lumArr = new Float32Array(0), covArr = new Float32Array(0);
    const ripples = [];
    const RIPPLE_LIFE = 2.2;
    const swimmers = createSwimmers();

    function measure() {
      if (!box.clientWidth || !box.clientHeight) return false;
      const probe = document.createElement('span');
      probe.textContent = '0'.repeat(20);
      probe.style.cssText = 'position:absolute;visibility:hidden;white-space:pre';
      probe.style.font = getComputedStyle(host).font;
      document.body.appendChild(probe);
      const rect = probe.getBoundingClientRect();
      probe.remove();
      const glyph = rect.width / 20;
      if (glyph <= 0) return false;
      const line = parseFloat(getComputedStyle(host).lineHeight) || rect.height;
      const oldCols = cols, oldRows = rows;
      ASPECT = line / glyph;
      cols = Math.max(20, Math.min(520, Math.ceil(box.clientWidth / glyph)));
      rows = Math.max(12, Math.min(240, Math.ceil(box.clientHeight / line)));
      canvas.width = cols * SS;
      canvas.height = rows * SS;
      lumArr = new Float32Array(cols * rows);
      covArr = new Float32Array(cols * rows);
      const scale = Math.min(1, Math.max(0.58, cols / 210), (rows * ASPECT) / 135);
      for (const sw of swimmers) {
        sw.x = measured ? (sw.x * cols) / oldCols : sw.x * cols;
        sw.y = measured ? (sw.y * rows) / oldRows : sw.y * rows;
        sw.goal = null;
        sw.navigationTime = 0;
        sw.len = sw.baseLen * scale;
        sw.speed = sw.len * sw.pace;
      }
      waterTop = 0;
      measured = true;
      ripples.length = 0;
      return true;
    }

    function render(dt = 0) {
      elapsed += dt;
      ctx.clearRect(0, 0, cols * SS, rows * SS);
      for (const sw of swimmers) {
        if (dt) advance(sw, elapsed, dt, swimmers, cols, rows, ASPECT, waterTop);
        drawFish(ctx, sw, SS, ASPECT);
        sw.wake += dt;
        if (dt && sw.wake >= 0.8 && sw.texture && Math.max(sw.activity, Math.abs(sw.curvature)) > 0.3) {
          sw.wake %= 0.8;
          const tail = sw.points[SLICES];
          ripples.push({
            x: sw.x + Math.cos(sw.h) * tail.x - Math.sin(sw.h) * tail.y,
            y: sw.y + (Math.sin(sw.h) * tail.x + Math.cos(sw.h) * tail.y) / ASPECT,
            age: 0,
            seed: sw.seed + sw.phase,
          });
          if (ripples.length > 18) ripples.shift();
        }
      }

      const px = ctx.getImageData(0, 0, cols * SS, rows * SS).data;
      const stride = cols * SS * 4;
      const glyphs = new Array(rows);
      const kinds = new Array(rows);
      for (let y = 0; y < rows; y++) {
        glyphs[y] = new Array(cols).fill(' ');
        kinds[y] = new Array(cols).fill('w');
      }
      lumArr.fill(0);
      covArr.fill(0);

      // Wake ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        if ((r.age += dt) > RIPPLE_LIFE) { ripples.splice(i, 1); continue; }
        const rad = 1.2 + r.age * 4.2;
        const f = r.age / RIPPLE_LIFE;
        const ch = f < 0.35 ? ':' : f < 0.7 ? '.' : '`';
        const steps = Math.max(6, Math.round(rad * 2.2));
        const sd = r.seed || 0;
        for (let k = 0; k < steps; k++) {
          const a = (k / steps) * Math.PI * 2;
          if (Math.sin(k * 7.3 + sd * 13.1) > 0.62) continue;
          const wob = 1 + 0.13 * Math.sin(3 * a + sd) + 0.08 * Math.sin(5 * a + sd * 1.7);
          const x = Math.round(r.x + Math.cos(a) * rad * wob * ASPECT);
          const y = Math.round(r.y + Math.sin(a) * rad * wob);
          if (y >= 0 && y < rows && x >= 0 && x < cols && glyphs[y][x] === ' ') glyphs[y][x] = ch;
        }
      }

      // Clear water ahead of fish
      for (const sw of swimmers) {
        const rad = sw.h;
        const hx = sw.x + Math.sin(rad) * sw.len * 0.48;
        const hy = sw.y - (Math.cos(rad) * sw.len * 0.48) / ASPECT;
        const R = sw.len * 0.55;
        const ry = Math.ceil(R / ASPECT) + 1;
        const rx = Math.ceil(R) + 1;
        for (let y = Math.max(0, Math.round(hy) - ry); y <= Math.min(rows - 1, Math.round(hy) + ry); y++)
          for (let x = Math.max(0, Math.round(hx) - rx); x <= Math.min(cols - 1, Math.round(hx) + rx); x++) {
            const dxv = x - hx, dyv = (y - hy) * ASPECT;
            if (dxv * dxv + dyv * dyv < R * R) glyphs[y][x] = ' ';
          }
      }

      // Pixel -> ASCII conversion
      const N = SS * SS;
      const CUT = 0.5;
      for (let y = 0; y < rows; y++) {
        const grow = glyphs[y];
        const krow = kinds[y];
        for (let x = 0; x < cols; x++) {
          let r = 0, g = 0, b = 0, a = 0;
          for (let sy = 0; sy < SS; sy++) {
            let o = (y * SS + sy) * stride + x * SS * 4;
            for (let sx = 0; sx < SS; sx++, o += 4) {
              const pa = px[o + 3];
              a += pa; r += px[o] * pa; g += px[o + 1] * pa; b += px[o + 2] * pa;
            }
          }
          const cov = a / (255 * N);
          if (cov < CUT) continue;
          r /= a; g /= a; b /= a;
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;
          const d = 0.26 + 0.74 * (1 - lum / 255);
          grow[x] = RAMP[Math.min(RAMP.length - 1, Math.max(1, Math.round(d * (RAMP.length - 1))))];
          krow[x] = classOf(r, g, b, lum);
          lumArr[y * cols + x] = lum;
          covArr[y * cols + x] = cov;
        }
      }

      const isFish = (x, y) => x >= 0 && y >= 0 && x < cols && y < rows && glyphs[y][x] !== ' ' && kinds[y][x] !== 'w';

      // Bridge gaps
      const fill = [];
      for (let y = 0; y < rows; y++)
        for (let x = 0; x < cols; x++) {
          if (glyphs[y][x] !== ' ') continue;
          const lr = isFish(x - 1, y) && isFish(x + 1, y);
          const ud = isFish(x, y - 1) && isFish(x, y + 1);
          if (lr || ud) fill.push(y * cols + x);
        }
      for (const i of fill) {
        const y = (i / cols) | 0, x = i % cols;
        glyphs[y][x] = ':';
        kinds[y][x] = isFish(x - 1, y) ? kinds[y][x - 1] : kinds[y - 1][x];
        if (isFish(x - 1, y) && isFish(x + 1, y)) {
          lumArr[i] = (lumArr[i - 1] + lumArr[i + 1]) / 2;
          covArr[i] = (covArr[i - 1] + covArr[i + 1]) / 2;
        } else {
          lumArr[i] = (lumArr[i - cols] + lumArr[i + cols]) / 2;
          covArr[i] = (covArr[i - cols] + covArr[i + cols]) / 2;
        }
      }

      // Despeckle
      const drop = [];
      for (let y = 0; y < rows; y++)
        for (let x = 0; x < cols; x++) {
          if (!isFish(x, y)) continue;
          const up = isFish(x, y - 1), dn = isFish(x, y + 1), lf = isFish(x - 1, y), rt = isFish(x + 1, y);
          const n = up + dn + lf + rt;
          if (n < 2 || !(up || dn)) drop.push(y * cols + x);
        }
      for (const i of drop) { glyphs[(i / cols) | 0][i % cols] = ' '; kinds[(i / cols) | 0][i % cols] = 'w'; }

      // Cull small islands
      const MIN_ISLAND = cols < 130 ? 8 : 24;
      const seen = new Uint8Array(cols * rows);
      for (let y0 = 0; y0 < rows; y0++)
        for (let x0 = 0; x0 < cols; x0++) {
          if (seen[y0 * cols + x0] || !isFish(x0, y0)) continue;
          seen[y0 * cols + x0] = 1;
          const stack = [y0 * cols + x0], comp = [];
          while (stack.length) {
            const i = stack.pop(); comp.push(i);
            const cx = i % cols, cy = (i / cols) | 0;
            for (let dy = -1; dy <= 1; dy++)
              for (let dx = -1; dx <= 1; dx++) {
                if (!dx && !dy) continue;
                const nx = cx + dx, ny = cy + dy;
                if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue;
                const ni = ny * cols + nx;
                if (seen[ni] || !isFish(nx, ny)) continue;
                seen[ni] = 1; stack.push(ni);
              }
          }
          if (comp.length < MIN_ISLAND)
            for (const i of comp) { glyphs[(i / cols) | 0][i % cols] = ' '; kinds[(i / cols) | 0][i % cols] = 'w'; }
        }

      // Detail pass
      const GAIN = 1.2, EDGE_T = 180;
      for (let y = 0; y < rows; y++)
        for (let x = 0; x < cols; x++) {
          if (!isFish(x, y)) continue;
          const c = lumArr[y * cols + x];
          const at = (xx, yy) => (isFish(xx, yy) ? lumArr[yy * cols + xx] : c);
          const nw = at(x - 1, y - 1), nn = at(x, y - 1), ne = at(x + 1, y - 1);
          const ww = at(x - 1, y), ee = at(x + 1, y);
          const sww = at(x - 1, y + 1), ss = at(x, y + 1), se = at(x + 1, y + 1);
          const avg = (nw + nn + ne + ww + ee + sww + ss + se) / 8;
          const covN = Math.min(1, Math.max(0, (covArr[y * cols + x] - CUT) / (1 - CUT)));
          let d = (0.26 + 0.74 * (1 - c / 255)) * (0.55 + 0.45 * covN) + (GAIN * (avg - c)) / 255;
          d = d < 0.08 ? 0.08 : d > 1 ? 1 : d;
          glyphs[y][x] = RAMP[Math.min(RAMP.length - 1, Math.max(1, Math.round(d * (RAMP.length - 1))))];
          const gx = ne + 2 * ee + se - nw - 2 * ww - sww;
          const gy = (sww + 2 * ss + se - nw - 2 * nn - ne) / ASPECT;
          const m = Math.hypot(gx, gy);
          if (m > EDGE_T && d < 0.72) {
            let sa = (Math.atan2(gy, gx) * 180) / Math.PI + 90;
            sa = ((((sa + 90) % 180) + 180) % 180) - 90;
            glyphs[y][x] = sa < -67.5 ? '|' : sa < -22.5 ? '/' : sa < 22.5 ? '-' : sa < 67.5 ? '\\' : '|';
          }
        }

      // Build HTML
      let html = '';
      let cur = null;
      let run = '';
      for (let y = 0; y < rows; y++) {
        const grow = glyphs[y], krow = kinds[y];
        for (let x = 0; x < cols; x++) {
          const cls = grow[x] === ' ' ? 'w' : krow[x];
          if (cls !== cur) {
            if (cur !== null) html += `<i class=${cur}>${run}</i>`;
            cur = cls; run = '';
          }
          run += grow[x];
        }
        run += '\n';
      }
      html += `<i class=${cur}>${run}</i>`;
      host.innerHTML = html;
    }

    function tick(now) {
      if (lastTime === null) lastTime = now;
      const delta = (now - lastTime) / 1000;
      if (delta >= 1 / FPS - 0.001) {
        render(Math.min(delta, 0.075));
        lastTime = now;
      }
      timer = requestAnimationFrame(tick);
    }

    function start() {
      if (disposed || timer !== null || !ready || !measured || document.hidden || !box.clientWidth) return;
      lastTime = null;
      timer = requestAnimationFrame(tick);
    }

    function stop() {
      if (timer !== null) cancelAnimationFrame(timer);
      timer = null;
      lastTime = null;
    }

    // Load images
    const base = import.meta.env.BASE_URL || '/';
    let pending = swimmers.length;
    for (const sw of swimmers) {
      const img = new Image();
      img.decoding = 'async';
      img.onload = img.onerror = async () => {
        if (--pending === 0) {
          const tail = await recoverTail(swimmers[0].img).catch(() => null);
          if (disposed) return;
          for (const fish of swimmers) if (fish.img.naturalWidth) prepareTexture(fish, fish.img, tail);
          ready = true;
          // The <pre> is empty until the first render, so the browser never requests its
          // font on its own; load it explicitly before measuring glyph sizes.
          const fontLoad = document.fonts && document.fonts.load
            ? document.fonts.load(getComputedStyle(host).font, RAMP).catch(() => {})
            : Promise.resolve();
          fontLoad.then(() => {
            if (!disposed && measure()) { render(); start(); }
          });
        }
      };
      sw.img = img;
      img.src = `${base}photos/${sw.src}.png`;
    }

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVisibility);

    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        stop();
        if (ready && measure()) { render(); start(); }
      }, 120);
    };
    window.addEventListener('resize', onResize);

    return () => {
      disposed = true;
      clearTimeout(resizeTimer);
      stop();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className="pond" ref={boxRef} aria-hidden="true">
      <pre id="koi" ref={preRef} />
    </div>
  );
};

export default KoiPond;
