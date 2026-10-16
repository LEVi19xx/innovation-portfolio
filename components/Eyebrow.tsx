/** Same eyebrow used by the other sections: three slanted bars + gradient label. */
export default function Eyebrow({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-4 font-mono text-sm uppercase tracking-[0.3em] md:text-base">
      <span className="flex items-center gap-1" aria-hidden>
        <span className="h-4 w-[3px] -skew-x-[20deg] bg-blue-600 dark:bg-blue-400" />
        <span className="h-4 w-[3px] -skew-x-[20deg] bg-blue-600/60 dark:bg-blue-400/60" />
        <span className="h-4 w-[3px] -skew-x-[20deg] bg-blue-600/25 dark:bg-blue-400/25" />
      </span>
      <span className="bg-gradient-to-r from-blue-700 to-cyan-500 bg-clip-text font-bold text-transparent dark:from-blue-300 dark:to-cyan-300">
        {children}
      </span>
    </div>
  );
}
