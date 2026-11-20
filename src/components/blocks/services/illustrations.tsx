// Decorative line drawings for the service cards (design mockup, Nov 2026).
// Faint grey strokes with one red accent each; purely decorative, so they are
// hidden from assistive technology.

const LINE = "rgba(255, 255, 255, 0.14)";
const FILL = "rgba(255, 255, 255, 0.025)";
const RED = "var(--brand-red)";

const Svg = ({ children }: { children: React.ReactNode }) => (
  <svg
    viewBox="0 0 150 110"
    width="150"
    height="110"
    fill="none"
    aria-hidden="true"
    focusable="false"
    className="h-auto w-[110px] sm:w-[150px]"
  >
    {children}
  </svg>
);

/** AI Development: a radar sweep with one red contact. */
export const RadarArt = () => (
  <Svg>
    <path d="M150 0 A110 110 0 0 0 40 110" stroke={LINE} />
    <path d="M150 35 A75 75 0 0 0 75 110" stroke={LINE} />
    <path d="M150 70 A40 40 0 0 0 110 110" stroke={LINE} />
    <circle cx="96" cy="42" r="7" fill="rgba(229,6,6,0.18)" />
    <circle cx="96" cy="42" r="3" fill={RED} />
  </Svg>
);

/** AI Automation: connected workflow nodes, one of them red. */
export const NodesArt = () => (
  <Svg>
    <path d="M58 55 H74 M83 24 V46 M83 64 V86 M92 55 H106" stroke={LINE} />
    <rect x="72" y="8" width="22" height="18" rx="4" fill={FILL} stroke={LINE} />
    <rect x="22" y="42" width="36" height="26" rx="5" fill={FILL} stroke={LINE} />
    <rect x="72" y="44" width="22" height="22" rx="4" fill={FILL} stroke={LINE} />
    <rect x="72" y="84" width="22" height="18" rx="4" fill={FILL} stroke={LINE} />
    <rect x="106" y="45" width="20" height="20" rx="3" fill={RED} opacity="0.85" />
  </Svg>
);

/** Custom Software Development: a module grid with one red module. */
export const GridArt = () => {
  const cells = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 4; col++) {
      const red = row === 1 && col === 3;
      cells.push(
        <rect
          key={`${row}-${col}`}
          x={44 + col * 26}
          y={14 + row * 26}
          width="20"
          height="20"
          rx="3"
          fill={red ? "rgba(229,6,6,0.08)" : FILL}
          stroke={red ? RED : LINE}
          strokeWidth={red ? 1.5 : 1}
          opacity={red ? 1 : 1 - row * 0.25}
        />,
      );
    }
  }
  return <Svg>{cells}</Svg>;
};

/** Backend Development: stacked infrastructure layers with a red node on top. */
export const LayersArt = () => {
  const layer = (y: number, o: number) => (
    <path
      key={y}
      d={`M75 ${y} L125 ${y + 22} L75 ${y + 44} L25 ${y + 22} Z`}
      fill={FILL}
      stroke={LINE}
      opacity={o}
    />
  );
  return (
    <Svg>
      {layer(52, 0.6)}
      {layer(34, 0.8)}
      {layer(16, 1)}
      <circle cx="98" cy="36" r="6" fill="rgba(229,6,6,0.2)" />
      <circle cx="98" cy="36" r="2.6" fill={RED} />
    </Svg>
  );
};

/** Frontend Development: stacked browser windows and a red cursor. */
export const WindowsArt = () => {
  const win = (x: number, y: number, o: number, dots = false) => (
    <g key={x} opacity={o} transform={`translate(${x} ${y}) skewY(-12)`}>
      <rect width="62" height="74" rx="5" fill="rgba(10,10,10,0.9)" stroke={LINE} />
      <path d="M0 12 H62" stroke={LINE} />
      {dots && (
        <>
          <circle cx="8" cy="6" r="1.8" fill={RED} />
          <circle cx="14" cy="6" r="1.8" fill={LINE} />
          <circle cx="20" cy="6" r="1.8" fill={LINE} />
        </>
      )}
    </g>
  );
  return (
    <Svg>
      {win(30, 26, 0.5)}
      {win(46, 30, 0.75)}
      {win(62, 34, 1, true)}
      <path d="M112 66 L112 84 L117 79 L121 88 L124 86.5 L120 78 L127 78 Z" fill={RED} />
    </Svg>
  );
};
