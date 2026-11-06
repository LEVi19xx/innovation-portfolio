const stack = [
  {
    name: "React",
    icon: (
      <g fill="none" stroke="#61dafb" strokeWidth="1.4">
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="1.8" fill="#61dafb" stroke="none" />
      </g>
    ),
  },
  {
    name: "Next.js",
    icon: (
      <g>
        <circle cx="12" cy="12" r="11" fill="#000" />
        <path
          d="M8.5 7.5v9M8.5 7.5l7 9"
          fill="none"
          stroke="#fff"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path d="M15.2 7.5v9" fill="none" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
      </g>
    ),
  },
  {
    name: "TypeScript",
    icon: (
      <g>
        <rect x="1" y="1" width="22" height="22" rx="4" fill="#3178c6" />
        <text
          x="12"
          y="16.5"
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
          fontFamily="Arial, sans-serif"
          fill="#fff"
        >
          TS
        </text>
      </g>
    ),
  },
  {
    name: "Tailwind CSS",
    icon: (
      <path
        fill="#38bdf8"
        d="M12 6.2c-2.8 0-4.6 1.4-5.3 4.2.9-1.4 2.1-1.9 3.4-1.6.75.2 1.28.77 1.87 1.4C13.02 11.4 14.28 12.7 17 12.7c2.8 0 4.6-1.4 5.3-4.2-.9 1.4-2.1 1.9-3.4 1.6-.75-.2-1.28-.77-1.87-1.4C15.98 7.5 14.72 6.2 12 6.2Zm-5.3 6.5c-2.8 0-4.6 1.4-5.3 4.2.9-1.4 2.1-1.9 3.4-1.6.75.2 1.28.77 1.87 1.4 1.02 1.1 2.28 2.4 5 2.4 2.8 0 4.6-1.4 5.3-4.2-.9 1.4-2.1 1.9-3.4 1.6-.75-.2-1.28-.77-1.87-1.4-1.02-1.1-2.28-2.4-5-2.4Z"
      />
    ),
  },
  {
    name: "Node.js",
    icon: (
      <path
        fill="#3c873a"
        d="M12 1.5 2.5 7v10L12 22.5 21.5 17V7L12 1.5Zm4.3 14.8c-1.3.75-3.1 1.05-4.6.4-.65-.28-1.1-.75-1.45-1.35-.06-.1 0-.22.1-.26l1-.58c.1-.06.2-.02.26.06.24.35.55.63 1.05.63.75 0 1.15-.3 1.15-.82 0-.5-.45-.68-1.2-1l-.45-.15c-1.25-.42-2.05-.95-2.05-2.15 0-1.15.9-1.95 2.25-1.95 1 0 1.7.32 2.25 1.15.06.1.02.2-.06.26l-.9.55c-.1.06-.18.04-.26-.04-.28-.4-.58-.55-1.03-.55-.55 0-.85.28-.85.7 0 .48.32.62 1.05.9l.45.16c1.5.5 2.3 1.05 2.3 2.28 0 1.28-1.02 2.07-2.6 2.07-1.05 0-1.85-.35-2.4-1.02Z"
      />
    ),
  },
  {
    name: "JavaScript",
    icon: (
      <g>
        <rect x="1" y="1" width="22" height="22" rx="4" fill="#f7df1e" />
        <text
          x="12"
          y="16.5"
          textAnchor="middle"
          fontSize="10"
          fontWeight="700"
          fontFamily="Arial, sans-serif"
          fill="#000"
        >
          JS
        </text>
      </g>
    ),
  },
  {
    name: "MongoDB",
    icon: (
      <path
        fill="#47a248"
        d="M12 2s4 3.6 4 9.4c0 4.4-2.4 6.9-3.4 7.8l-.2 2.8h-.9l-.2-2.8C10.3 18.3 8 15.8 8 11.4 8 5.6 12 2 12 2Zm0 3.4v13.4"
        stroke="#47a248"
        strokeWidth="0.6"
      />
    ),
  },
  {
    name: "Vite",
    icon: (
      <g>
        <rect x="1" y="1" width="22" height="22" rx="4" fill="#646cff" />
        <text
          x="12"
          y="16"
          textAnchor="middle"
          fontSize="10"
          fontWeight="700"
          fontFamily="Arial, sans-serif"
          fill="#fff"
        >
          V
        </text>
      </g>
    ),
  },
  {
    name: "Express",
    icon: (
      <g>
        <rect x="1" y="1" width="22" height="22" rx="4" fill="#303030" />
        <text
          x="12"
          y="16"
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
          fontFamily="Arial, sans-serif"
          fill="#fff"
        >
          ex
        </text>
      </g>
    ),
  },
  {
    name: "Electron",
    icon: (
      <g>
        <circle cx="12" cy="12" r="11" fill="#2b2e3a" />
        <text
          x="12"
          y="16"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fontFamily="Arial, sans-serif"
          fill="#9feaf9"
        >
          E
        </text>
      </g>
    ),
  },
  {
    name: "Flutter",
    icon: (
      <g>
        <rect x="1" y="1" width="22" height="22" rx="4" fill="#02569b" />
        <text
          x="12"
          y="16"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fontFamily="Arial, sans-serif"
          fill="#fff"
        >
          F
        </text>
      </g>
    ),
  },
  {
    name: "Firebase",
    icon: (
      <g>
        <rect x="1" y="1" width="22" height="22" rx="4" fill="#ffa000" />
        <text
          x="12"
          y="16"
          textAnchor="middle"
          fontSize="9"
          fontWeight="700"
          fontFamily="Arial, sans-serif"
          fill="#fff"
        >
          Fb
        </text>
      </g>
    ),
  },
  {
    name: "Framer Motion",
    icon: (
      <g>
        <rect x="1" y="1" width="22" height="22" rx="4" fill="#0055ff" />
        <text
          x="12"
          y="16"
          textAnchor="middle"
          fontSize="9"
          fontWeight="700"
          fontFamily="Arial, sans-serif"
          fill="#fff"
        >
          Fm
        </text>
      </g>
    ),
  },
  {
    name: "Socket.IO",
    icon: (
      <g>
        <circle cx="12" cy="12" r="11" fill="#010101" />
        <text
          x="12"
          y="16"
          textAnchor="middle"
          fontSize="9"
          fontWeight="700"
          fontFamily="Arial, sans-serif"
          fill="#fff"
        >
          IO
        </text>
      </g>
    ),
  },
  {
    name: "DaisyUI",
    icon: (
      <g>
        <rect x="1" y="1" width="22" height="22" rx="4" fill="#1ad1a5" />
        <text
          x="12"
          y="16"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fontFamily="Arial, sans-serif"
          fill="#fff"
        >
          D
        </text>
      </g>
    ),
  },
  {
    name: "Cloudflare",
    icon: (
      <g>
        <rect x="1" y="1" width="22" height="22" rx="4" fill="#f38020" />
        <text
          x="12"
          y="16"
          textAnchor="middle"
          fontSize="9"
          fontWeight="700"
          fontFamily="Arial, sans-serif"
          fill="#fff"
        >
          CF
        </text>
      </g>
    ),
  },
  {
    name: "Gemini",
    icon: (
      <g>
        <circle cx="12" cy="12" r="11" fill="#4285f4" />
        <text
          x="12"
          y="16"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fontFamily="Arial, sans-serif"
          fill="#fff"
        >
          G
        </text>
      </g>
    ),
  },
];

function MarqueeSet({ keyPrefix }: { keyPrefix: string }) {
  return (
    <>
      {stack.map((tech) => (
        <div key={`${keyPrefix}-${tech.name}`} className="group flex shrink-0 items-center">
          <div className="flex items-center gap-3 px-6">
            <span
              style={{ background: "var(--tech-node-fill)" }}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-900/10 transition-all duration-300 group-hover:border-blue-500/50 dark:border-white/10 dark:group-hover:border-blue-400/50"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
                {tech.icon}
              </svg>
            </span>
            <span className="whitespace-nowrap font-mono text-xs uppercase tracking-[0.15em] text-slate-500 transition-colors duration-300 group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-white">
              {tech.name}
            </span>
          </div>
          <span aria-hidden className="h-1 w-1 shrink-0 rounded-full bg-slate-900/15 dark:bg-white/15" />
        </div>
      ))}
    </>
  );
}

export default function TechStack() {
  return (
    <section
      className="relative flex w-full items-stretch overflow-hidden border-t border-slate-200 dark:border-white/10"
      style={{ background: "var(--tech-bg)" }}
    >
      <div className="hidden shrink-0 items-center gap-2.5 border-r border-slate-200 px-6 py-5 dark:border-white/10 sm:flex">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75 dark:bg-blue-400" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-500 dark:bg-blue-400" />
        </span>
        <span className="whitespace-nowrap font-mono text-xs uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
          Our Stack
        </span>
      </div>

      <div className="relative flex-1 overflow-hidden py-5">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-24"
          style={{ background: `linear-gradient(90deg, var(--tech-bg), transparent)` }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-24"
          style={{ background: `linear-gradient(270deg, var(--tech-bg), transparent)` }}
        />
        <div className="flex w-max animate-tech-marquee hover:[animation-play-state:paused]">
          <MarqueeSet keyPrefix="a" />
          <MarqueeSet keyPrefix="b" />
        </div>
      </div>
    </section>
  );
}
