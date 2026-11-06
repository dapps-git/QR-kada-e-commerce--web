// Illustrated product renders (SVG). Used whenever a product has no photo.
// Keeps the catalogue looking consistent until real photos are shot.

const THEMES = {
  noir: { face: ['#1a1a1d', '#050506'], ink: '#f4f1ea', accent: '#d8ae5e', accent2: '#8c6a2c', base: ['#1b1b1e', '#000'], muted: '#8b8b90', sweep: null },
  crimson: { face: ['#151517', '#030304'], ink: '#ffffff', accent: '#e11d2a', accent2: '#8f0f18', base: ['#e11d2a', '#7a0c13'], muted: '#9a9aa0', sweep: '#e11d2a' },
  frost: { face: ['#f3f4f2', '#d5d8d6'], ink: '#3c3a36', accent: '#c99a46', accent2: '#8a6524', base: ['#e8c98a', '#a77d34'], muted: '#7a7873', sweep: null, frost: true },
  ivory: { face: ['#fbf6ec', '#ece2cf'], ink: '#3b3125', accent: '#c4964a', accent2: '#8a652a', base: ['#e9cf95', '#a47b33'], muted: '#8a7e6b', sweep: null },
  walnut: { face: ['#1d1c1b', '#0b0b0a'], ink: '#efe8dc', accent: '#cfa462', accent2: '#8a6730', base: ['#8a5a36', '#4a2c17'], muted: '#8f877b', sweep: null },
  pearl: { face: ['#eceef0', '#b9bdc2'], ink: '#1e1f22', accent: '#1e1f22', accent2: '#55585e', base: ['#c9ccd0', '#8d9196'], muted: '#5d6066', sweep: null, brushed: true },
};

// deterministic pseudo-random
function rng(seed) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return () => {
    h ^= h << 13; h ^= h >>> 17; h ^= h << 5;
    return ((h >>> 0) % 1000) / 1000;
  };
}

function qrPath(seed, x, y, size) {
  const n = 21;
  const c = size / n;
  const r = rng(seed);
  const finder = (i, j) => {
    const zones = [[0, 0], [n - 7, 0], [0, n - 7]];
    for (const [fx, fy] of zones) {
      if (i >= fx && i < fx + 7 && j >= fy && j < fy + 7) {
        const a = i - fx, b = j - fy;
        const ring = a === 0 || a === 6 || b === 0 || b === 6;
        const core = a >= 2 && a <= 4 && b >= 2 && b <= 4;
        return ring || core ? 1 : 0;
      }
      if (i >= fx - 1 && i <= fx + 7 && j >= fy - 1 && j <= fy + 7) return 0;
    }
    return -1;
  };
  let d = '';
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < n; i++) {
      const f = finder(i, j);
      const on = f === -1 ? r() > 0.52 : f === 1;
      if (on) d += `M${(x + i * c).toFixed(2)} ${(y + j * c).toFixed(2)}h${c.toFixed(2)}v${c.toFixed(2)}h-${c.toFixed(2)}z`;
    }
  }
  return d;
}

function Wordmark({ x, y, t, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M-46 -9v-4h4M-26 -13h4v4M-46 5v4h4M-26 9h4v-4" stroke="#e11d2a" strokeWidth="1.8" fill="none" />
      <text x="-34" y="4" textAnchor="middle" fontSize="12.5" fontWeight="800" fill={t.ink} fontFamily="Arial, sans-serif" letterSpacing="-.5">QR</text>
      <text x="-17" y="4.5" fontSize="15" fontWeight="800" fill="#e11d2a" fontFamily="Arial, sans-serif" letterSpacing="-.6">kada</text>
    </g>
  );
}

function QrTile({ id, x, y, size, t, label, seed }) {
  const pad = size * 0.09;
  return (
    <g>
      <rect x={x - 3} y={y - 3} width={size + 6} height={size + 6} rx="3" fill={`url(#${id}-gold)`} />
      <rect x={x} y={y} width={size} height={size} rx="1.5" fill="#fff" />
      <path d={qrPath(seed, x + pad, y + pad, size - pad * 2)} fill="#111" />
      {label && (
        <text x={x + size / 2} y={y + size + 17} textAnchor="middle" fontSize="10" fontWeight="600" fill={t.ink} fontFamily="Arial, sans-serif" letterSpacing=".6">
          {label.toUpperCase()}
        </text>
      )}
    </g>
  );
}

function Defs({ id, t }) {
  return (
    <defs>
      <linearGradient id={`${id}-face`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor={t.face[0]} />
        <stop offset="1" stopColor={t.face[1]} />
      </linearGradient>
      <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor={t.accent} />
        <stop offset=".5" stopColor={t.accent2} />
        <stop offset="1" stopColor={t.accent} />
      </linearGradient>
      <linearGradient id={`${id}-base`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={t.base[0]} />
        <stop offset="1" stopColor={t.base[1]} />
      </linearGradient>
      <linearGradient id={`${id}-shine`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#fff" stopOpacity="0" />
        <stop offset=".5" stopColor="#fff" stopOpacity=".16" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
      <radialGradient id={`${id}-shadow`}>
        <stop offset="0" stopColor="#000" stopOpacity=".35" />
        <stop offset="1" stopColor="#000" stopOpacity="0" />
      </radialGradient>
      {t.brushed && (
        <pattern id={`${id}-brush`} width="4" height="400" patternUnits="userSpaceOnUse">
          <rect width="4" height="400" fill="transparent" />
          <path d="M1 0v400" stroke="#fff" strokeOpacity=".18" strokeWidth=".6" />
        </pattern>
      )}
    </defs>
  );
}

function Stand({ id, t, codes, seed }) {
  const n = Math.max(1, Math.min(4, codes.length));
  const dims = { 1: [190, 250], 2: [250, 210], 3: [300, 190], 4: [330, 180] }[n];
  const [w, h] = dims;
  const x = 200 - w / 2;
  const y = 330 - 22 - h;
  const qs = { 1: 112, 2: 82, 3: 66, 4: 56 }[n];
  const gap = (w - qs * n) / (n + 1);
  const qy = y + (n === 1 ? 62 : 58);

  return (
    <g className="art-float">
      <ellipse cx="200" cy="338" rx={w * 0.62} ry="14" fill={`url(#${id}-shadow)`} />
      {/* base */}
      <rect x={x - 22} y="314" width={w + 44} height="16" rx="4" fill={`url(#${id}-base)`} />
      <rect x={x - 22} y="314" width={w + 44} height="2.5" rx="1" fill="#fff" opacity=".35" />
      {/* face */}
      <rect x={x} y={y} width={w} height={h + 14} rx="14" fill={`url(#${id}-face)`} />
      {t.brushed && <rect x={x} y={y} width={w} height={h + 14} rx="14" fill={`url(#${id}-brush)`} />}
      {t.frost && <rect x={x} y={y} width={w} height={h + 14} rx="14" fill="#fff" opacity=".25" />}
      {t.sweep && (
        <>
          <path d={`M${x + 14} ${y} H${x + w * 0.42} C${x + w * 0.26} ${y + 10} ${x + 10} ${y + 26} ${x} ${y + 52} V${y + 14} A14 14 0 0 1 ${x + 14} ${y}Z`} fill={t.sweep} />
          <path d={`M${x + w} ${y + h - 44} V${y + h} A14 14 0 0 1 ${x + w - 14} ${y + h + 14} H${x + w * 0.5} C${x + w * 0.75} ${y + h + 4} ${x + w - 8} ${y + h - 18} ${x + w} ${y + h - 44}Z`} fill={t.sweep} />
        </>
      )}
      <rect x={x} y={y} width={w} height={h + 14} rx="14" fill="none" stroke="#fff" strokeOpacity=".22" />
      <rect x={x + 6} y={y + 4} width={w * 0.35} height={h} rx="10" fill={`url(#${id}-shine)`} transform={`skewX(-12) translate(${y * 0.2} 0)`} />

      <Wordmark x={200 + 14} y={y + 30} t={t} scale={n === 1 ? 1.15 : 1} />

      {codes.slice(0, 4).map((label, i) => (
        <QrTile key={i} id={id} t={t} x={x + gap + i * (qs + gap)} y={qy} size={qs} label={label} seed={seed + i} />
      ))}

      {/* tap strip */}
      <g transform={`translate(200 ${y + h - 6})`}>
        <g stroke={t.muted} strokeWidth="1.3" fill="none" strokeLinecap="round">
          <path d="M-36 -5a6 6 0 0 1 0 10M-32 -8a10 10 0 0 1 0 16" />
        </g>
        <text x="-22" y="4" fontSize="9" fontWeight="600" fill={t.muted} fontFamily="Arial, sans-serif" letterSpacing="1.4">TAP OR SCAN</text>
      </g>
    </g>
  );
}

function Card({ id, t, codes, seed }) {
  return (
    <g className="art-float">
      <ellipse cx="200" cy="318" rx="150" ry="14" fill={`url(#${id}-shadow)`} />
      <g transform="rotate(-8 200 200)">
        <rect x="58" y="112" width="284" height="180" rx="14" fill="#000" opacity=".18" transform="translate(6 10)" />
        <rect x="58" y="112" width="284" height="180" rx="14" fill={`url(#${id}-face)`} />
        {t.brushed && <rect x="58" y="112" width="284" height="180" rx="14" fill={`url(#${id}-brush)`} />}
        {t.sweep && <path d="M58 250 Q160 230 342 280 V278 a14 14 0 0 1 -14 14 H72 a14 14 0 0 1 -14 -14Z" fill={t.sweep} />}
        <rect x="58" y="112" width="284" height="180" rx="14" fill="none" stroke="#fff" strokeOpacity=".25" />
        <Wordmark x={136} y={146} t={t} />
        <text x="80" y="206" fontSize="17" fontWeight="700" fill={t.ink} fontFamily="Arial, sans-serif">Your Name</text>
        <text x="80" y="224" fontSize="10" fill={t.muted} fontFamily="Arial, sans-serif" letterSpacing="1">{(codes[0] || 'Connect').toUpperCase()}</text>
        <g stroke={t.accent} strokeWidth="1.8" fill="none" strokeLinecap="round" transform="translate(84 262)">
          <path d="M0 -6a7 7 0 0 1 0 12M5 -10a12 12 0 0 1 0 20M10 -14a17 17 0 0 1 0 28" />
        </g>
        <QrTile id={id} t={t} x={252} y={178} size={68} seed={seed} />
      </g>
    </g>
  );
}

function Tag({ id, t, codes, seed }) {
  return (
    <g className="art-float">
      <ellipse cx="200" cy="320" rx="110" ry="12" fill={`url(#${id}-shadow)`} />
      <circle cx="200" cy="196" r="112" fill="#000" opacity=".2" transform="translate(4 8)" />
      <circle cx="200" cy="196" r="112" fill={`url(#${id}-face)`} />
      <circle cx="200" cy="196" r="104" fill="none" stroke={`url(#${id}-gold)`} strokeWidth="2.5" />
      <ellipse cx="170" cy="140" rx="60" ry="28" fill="#fff" opacity=".12" transform="rotate(-25 170 140)" />
      <QrTile id={id} t={t} x={160} y={146} size={80} seed={seed} />
      <text x="200" y="128" textAnchor="middle" fontSize="11" fontWeight="700" fill={t.ink} fontFamily="Arial, sans-serif" letterSpacing="2">{(codes[0] || 'Tap').toUpperCase()}</text>
      <text x="200" y="258" textAnchor="middle" fontSize="9" fontWeight="600" fill={t.muted} fontFamily="Arial, sans-serif" letterSpacing="1.6">TAP OR SCAN</text>
    </g>
  );
}

export default function StandArt({ art, id = 'a', className }) {
  const t = THEMES[art?.theme] || THEMES.noir;
  const codes = art?.codes?.length ? art.codes : ['Review us'];
  const type = art?.type || 'stand';
  const uid = `sa-${id}`.replace(/[^a-z0-9-]/gi, '');
  const props = { id: uid, t, codes, seed: id };
  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label="Product illustration">
      <Defs id={uid} t={t} />
      {type === 'card' ? <Card {...props} /> : type === 'tag' ? <Tag {...props} /> : <Stand {...props} />}
    </svg>
  );
}
