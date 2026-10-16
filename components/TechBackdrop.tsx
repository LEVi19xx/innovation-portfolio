// Line-art tech logos scattered across a section as a quiet backdrop.
// Everything strokes with currentColor, so the parent sets colour and opacity.

type Item = {
  name: string;
  /** position as a percentage of the section */
  x: number;
  y: number;
  size: number; // px
  rotate: number;
  delay: number; // s, offsets the float animation
  mobile?: boolean; // keep on small screens
  icon: React.ReactNode;
};

const items: Item[] = [
  {
    name: "React",
    x: 7, y: 20, size: 78, rotate: -8, delay: 0, mobile: true,
    icon: (
      <g>
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="1.6" />
      </g>
    ),
  },
  {
    name: "Next.js",
    x: 86, y: 14, size: 66, rotate: 6, delay: 1.2, mobile: true,
    icon: (
      <g>
        <circle cx="12" cy="12" r="10.5" />
        <path d="M8.5 7.5v9M8.5 7.5l7 9M15.3 7.5v6" strokeLinecap="round" />
      </g>
    ),
  },
  {
    name: "TypeScript",
    x: 24, y: 72, size: 60, rotate: 5, delay: 2.1,
    icon: (
      <g>
        <rect x="2" y="2" width="20" height="20" rx="3" />
        <path d="M6.5 11.5h5M9 11.5v6M18 12c-.6-.6-1.3-.8-2-.8-1 0-1.7.5-1.7 1.3 0 2 3.9 1 3.9 3.1 0 .9-.8 1.4-1.9 1.4-.8 0-1.6-.3-2.2-.9" strokeLinecap="round" />
      </g>
    ),
  },
  {
    name: "JavaScript",
    x: 66, y: 84, size: 54, rotate: -6, delay: 0.7,
    icon: (
      <g>
        <rect x="2" y="2" width="20" height="20" rx="3" />
        <path d="M10 10v6c0 1.2-.7 1.8-1.7 1.8-.6 0-1.1-.2-1.5-.7M18 11.2c-.5-.5-1.2-.7-1.9-.7-1 0-1.6.5-1.6 1.2 0 1.8 3.7 1 3.7 3 0 .9-.8 1.4-1.8 1.4-.8 0-1.5-.3-2-.8" strokeLinecap="round" />
      </g>
    ),
  },
  {
    name: "Tailwind CSS",
    x: 45, y: 8, size: 76, rotate: 0, delay: 1.7, mobile: true,
    icon: (
      <path d="M12 6.2c-2.8 0-4.6 1.4-5.3 4.2.9-1.4 2.1-1.9 3.4-1.6.75.2 1.28.77 1.87 1.4C13.02 11.4 14.28 12.7 17 12.7c2.8 0 4.6-1.4 5.3-4.2-.9 1.4-2.1 1.9-3.4 1.6-.75-.2-1.28-.77-1.87-1.4C15.98 7.5 14.72 6.2 12 6.2Zm-5.3 6.5c-2.8 0-4.6 1.4-5.3 4.2.9-1.4 2.1-1.9 3.4-1.6.75.2 1.28.77 1.87 1.4 1.02 1.1 2.28 2.4 5 2.4 2.8 0 4.6-1.4 5.3-4.2-.9 1.4-2.1 1.9-3.4 1.6-.75-.2-1.28-.77-1.87-1.4-1.02-1.1-2.28-2.4-5-2.4Z" />
    ),
  },
  {
    name: "Node.js",
    x: 92, y: 52, size: 70, rotate: 10, delay: 0.4,
    icon: (
      <g>
        <path d="M12 1.8 3 7v10l9 5.2L21 17V7l-9-5.2Z" />
        <path d="M12 8.5v7M9 10.2c0-.9 1.2-1.7 3-1.7s3 .8 3 1.7-1.3 1.4-3 1.8c-1.8.4-3 .9-3 1.8s1.3 1.7 3 1.7 3-.7 3-1.7" strokeLinecap="round" />
      </g>
    ),
  },
  {
    name: "GraphQL",
    x: 5, y: 56, size: 62, rotate: -4, delay: 2.6,
    icon: (
      <g>
        <path d="M12 2.5 20.2 7.2v9.6L12 21.5l-8.2-4.7V7.2L12 2.5Z" />
        <path d="M12 2.5 20.2 16.8H3.8L12 2.5Z" />
        <circle cx="12" cy="2.5" r="1.1" />
        <circle cx="20.2" cy="7.2" r="1.1" />
        <circle cx="20.2" cy="16.8" r="1.1" />
        <circle cx="12" cy="21.5" r="1.1" />
        <circle cx="3.8" cy="16.8" r="1.1" />
        <circle cx="3.8" cy="7.2" r="1.1" />
      </g>
    ),
  },
  {
    name: "PostgreSQL",
    x: 78, y: 70, size: 64, rotate: 4, delay: 1.5, mobile: true,
    icon: (
      <g strokeLinecap="round">
        <ellipse cx="12" cy="5.5" rx="8" ry="3" />
        <path d="M4 5.5v13c0 1.66 3.58 3 8 3s8-1.34 8-3v-13" />
        <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
      </g>
    ),
  },
  {
    name: "Git",
    x: 36, y: 90, size: 58, rotate: -10, delay: 0.9,
    icon: (
      <g strokeLinecap="round">
        <circle cx="6" cy="5" r="2.2" />
        <circle cx="6" cy="19" r="2.2" />
        <circle cx="18" cy="9" r="2.2" />
        <path d="M6 7.2v9.6M18 11.2c0 4-5.5 3-10 6.6" />
      </g>
    ),
  },
  {
    name: "HTML5",
    x: 14, y: 88, size: 56, rotate: 8, delay: 2.9,
    icon: (
      <g strokeLinejoin="round">
        <path d="M4 3h16l-1.5 16.5L12 21.5 5.5 19.5 4 3Z" />
        <path d="M8 8h8l-.4 5-3.6 1.2L8.4 13" strokeLinecap="round" />
      </g>
    ),
  },
  {
    name: "Terminal",
    x: 60, y: 22, size: 64, rotate: -5, delay: 3.3,
    icon: (
      <g strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2.5" />
        <path d="m6.5 9.5 3 2.5-3 2.5M12.5 15h5" />
      </g>
    ),
  },
  {
    name: "Figma",
    x: 94, y: 88, size: 50, rotate: 7, delay: 1.9,
    icon: (
      <g strokeLinejoin="round">
        <path d="M9 2h3v6H9a3 3 0 0 1 0-6ZM12 2h3a3 3 0 0 1 0 6h-3V2ZM9 8h3v6H9a3 3 0 0 1 0-6ZM9 14h3v3a3 3 0 1 1-3-3ZM12 8h0a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z" />
      </g>
    ),
  },
  {
    name: "Code",
    x: 30, y: 36, size: 48, rotate: 0, delay: 0.2,
    icon: (
      <g strokeLinecap="round" strokeLinejoin="round">
        <path d="m8 7-5 5 5 5M16 7l5 5-5 5M13.5 5l-3 14" />
      </g>
    ),
  },
  {
    name: "Cloud",
    x: 52, y: 62, size: 56, rotate: 3, delay: 1.1,
    icon: (
      <g strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 18a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 9.5a4 4 0 0 1-.5 8.5H7Z" />
      </g>
    ),
  },
  {
    name: "Docker",
    x: 12, y: 38, size: 66, rotate: -6, delay: 0.5, mobile: true,
    icon: (
      <g strokeLinejoin="round" strokeLinecap="round">
        <path d="M2 12.5h17.5c1 0 2-.5 2.5-1.5.6.2 1.200.4 1.500.5-.5 2-2 3.500-4 4.500C16 17.700 12 19 8 18c-3-.8-5.400-2.700-6-5.500Z" />
        <rect x="4" y="9" width="3" height="3" />
        <rect x="7.500" y="9" width="3" height="3" />
        <rect x="11" y="9" width="3" height="3" />
        <rect x="7.500" y="6" width="3" height="3" />
        <rect x="14.500" y="9" width="3" height="3" />
      </g>
    ),
  },
  {
    name: "Python",
    x: 75, y: 7, size: 60, rotate: 8, delay: 1.4,
    icon: (
      <g strokeLinejoin="round">
        <path d="M12 3c-4 0-5 1.500-5 3v2h5v1H5.500C3.500 9 3 11 3 12.500S3.500 16 5.500 16H7v-2.200C7 12.500 8.200 11.500 9.500 11.500H14c1 0 2-.8 2-2V6c0-1.500-1.500-3-4-3Z" />
        <path d="M12 21c4 0 5-1.500 5-3v-2h-5v-1h6.500c2 0 2.500-2 2.500-3.500S20.500 8 18.500 8H17v2.200c0 1.300-1.200 2.300-2.500 2.300H10c-1 0-2 .8-2 2V18c0 1.500 1.500 3 4 3Z" />
        <circle cx="9.500" cy="5.500" r=".7" />
        <circle cx="14.500" cy="18.500" r=".7" />
      </g>
    ),
  },
  {
    name: "Vue",
    x: 38, y: 24, size: 56, rotate: 4, delay: 2.2,
    icon: (
      <g strokeLinejoin="round">
        <path d="M2 3h4.500L12 12.500 17.500 3H22L12 20.500 2 3Z" />
        <path d="M7 3h3l2 3.500L14 3h3l-5 8.500L7 3Z" />
      </g>
    ),
  },
  {
    name: "Angular",
    x: 88, y: 34, size: 60, rotate: -7, delay: 3,
    icon: (
      <g strokeLinejoin="round">
        <path d="M12 2 3 5.200l1.400 12L12 22l7.600-4.800L21 5.200 12 2Z" />
        <path d="M12 6.500 8 15.500h1.800l.8-2h2.800l.8 2H16L12 6.500Zm-1 5.500 1-2.200L13 12h-2Z" />
      </g>
    ),
  },
  {
    name: "MongoDB",
    x: 4, y: 78, size: 54, rotate: 5, delay: 0.8,
    icon: (
      <g strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2c2.500 3 5 6.500 5 10.500 0 3.700-2.300 6.300-4.500 7.500V22h-1v-2c-2.200-1.200-4.500-3.800-4.500-7.500C7 8.500 9.500 5 12 2Z" />
        <path d="M12.500 14v8" />
      </g>
    ),
  },
  {
    name: "Redis",
    x: 46, y: 78, size: 56, rotate: -3, delay: 1.7,
    icon: (
      <g strokeLinejoin="round" strokeLinecap="round">
        <path d="M12 3 21 7l-9 4-9-4 9-4Z" />
        <path d="m3 11 9 4 9-4M3 15l9 4 9-4" />
      </g>
    ),
  },
  {
    name: "npm",
    x: 68, y: 58, size: 58, rotate: 6, delay: 2.5,
    icon: (
      <g strokeLinejoin="round" strokeLinecap="round">
        <rect x="2" y="6" width="20" height="12" rx="1" />
        <path d="M5.500 15V9h4v6M7.500 15v-4M12 15V9h6v6M15 15v-4" />
      </g>
    ),
  },
  {
    name: "Vite",
    x: 22, y: 52, size: 54, rotate: -9, delay: 3.4,
    icon: (
      <g strokeLinejoin="round" strokeLinecap="round">
        <path d="M3 5.500 12 21.500 21 5.500 12 8 3 5.500Z" />
        <path d="M14 2.500 9.500 12.500h3.200L11 18" />
      </g>
    ),
  },
  {
    name: "Firebase",
    x: 82, y: 94, size: 52, rotate: 3, delay: 1,
    icon: (
      <g strokeLinejoin="round" strokeLinecap="round">
        <path d="M5 17 7.500 3l3.200 5.500L12.500 5 19 17l-7 4.500L5 17Z" />
        <path d="m5 17 5-7 2.500 3" />
      </g>
    ),
  },
  {
    name: "Kubernetes",
    x: 40, y: 50, size: 60, rotate: 0, delay: 2.8,
    icon: (
      <g strokeLinejoin="round" strokeLinecap="round">
        <path d="M12 2 20 6l2 8.500-5.500 6.500h-9L2 14.500 4 6l8-4Z" />
        <circle cx="12" cy="12" r="2.600" />
        <path d="M12 6v3.400M12 14.600V18M6.800 9l3 1.700M14.200 13.300l3 1.700M17.200 9l-3 1.700M9.800 13.300l-3 1.700" />
      </g>
    ),
  },
  {
    name: "GitHub",
    x: 62, y: 4, size: 58, rotate: -4, delay: 0.3,
    icon: (
      <path d="M12 2C6.480 2 2 6.580 2 12.190c0 4.490 2.870 8.300 6.840 9.640.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.720-2.780.62-3.370-1.370-3.370-1.370-.46-1.180-1.110-1.500-1.110-1.500-.91-.63.07-.62.07-.62 1 .07 1.530 1.050 1.530 1.050.89 1.560 2.340 1.110 2.910.85.09-.66.35-1.110.63-1.370-2.220-.26-4.560-1.140-4.560-5.070 0-1.120.39-2.030 1.030-2.750-.1-.26-.45-1.300.1-2.710 0 0 .84-.27 2.750 1.050a9.300 9.300 0 0 1 2.500-.35c.85 0 1.700.12 2.500.35 1.910-1.320 2.750-1.050 2.750-1.050.55 1.410.2 2.450.1 2.710.64.72 1.030 1.630 1.030 2.750 0 3.940-2.340 4.800-4.570 5.060.36.32.68.95.68 1.920 0 1.390-.01 2.510-.01 2.850 0 .27.18.6.69.49A10.020 10.020 0 0 0 22 12.190C22 6.580 17.520 2 12 2Z" />
    ),
  },
  {
    name: "Server",
    x: 97, y: 30, size: 52, rotate: 5, delay: 2,
    icon: (
      <g strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="6.500" rx="1.500" />
        <rect x="3" y="13.500" width="18" height="6.500" rx="1.500" />
        <path d="M7 7.250h.01M7 16.750h.01M11 7.250h6M11 16.750h6" />
      </g>
    ),
  },
];

export default function TechBackdrop({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {items.map((it) => (
        <svg
          key={it.name}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.9"
          className={`absolute ${it.mobile ? "" : "hidden md:block"}`}
          style={{
            left: `${it.x}%`,
            top: `${it.y}%`,
            width: it.size,
            height: it.size,
            transform: `translate(-50%, -50%) rotate(${it.rotate}deg)`,
            animationDelay: `${-it.delay * 2}s`,
          }}
        >
          {it.icon}
        </svg>
      ))}
    </div>
  );
}
