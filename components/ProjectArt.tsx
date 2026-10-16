// Abstract line artwork used as a stand-in for project screenshots.
export default function ProjectArt({ type }: { type: string }) {
  if (type === "circles") {
    return (
      <svg viewBox="0 0 200 140" className="h-full w-full">
        <circle cx="60" cy="70" r="44" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="60" cy="70" r="28" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="150" cy="40" r="14" fill="#60a5fa" />
      </svg>
    );
  }
  if (type === "grid") {
    return (
      <svg viewBox="0 0 200 140" className="h-full w-full">
        {Array.from({ length: 4 }).map((_, row) =>
          Array.from({ length: 6 }).map((_, col) => (
            <rect
              key={`${row}-${col}`}
              x={10 + col * 32}
              y={10 + row * 32}
              width="20"
              height="20"
              rx="4"
              fill={row === 1 && col === 2 ? "#60a5fa" : "none"}
              stroke="currentColor"
              strokeOpacity="0.35"
            />
          )),
        )}
      </svg>
    );
  }
  if (type === "wave") {
    return (
      <svg viewBox="0 0 200 140" className="h-full w-full">
        <polyline
          points="0,90 30,70 60,100 90,50 120,65 150,30 180,45 200,20"
          fill="none"
          stroke="#60a5fa"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 200 140" className="h-full w-full">
      {Array.from({ length: 5 }).map((_, i) => (
        <line
          key={i}
          x1={-20 + i * 50}
          y1="140"
          x2={60 + i * 50}
          y2="0"
          stroke={i === 2 ? "#60a5fa" : "currentColor"}
          strokeOpacity={i === 2 ? 1 : 0.35}
          strokeWidth="3"
        />
      ))}
    </svg>
  );
}
