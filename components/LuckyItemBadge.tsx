export default function LuckyItemBadge({
  luckyItem,
}: {
  luckyItem: { emoji: string; name: string };
}) {
  return (
    <div className="relative w-56 overflow-hidden rounded-2xl bg-white/70 px-5 py-6 shadow-inner">
      <svg
        viewBox="0 0 200 200"
        className="pointer-events-none absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 opacity-50"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="petalGradient" cx="50%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#fff5f7" />
            <stop offset="55%" stopColor="#fbb6ce" />
            <stop offset="100%" stopColor="#ec4899" />
          </radialGradient>
          <radialGradient id="centerGradient" cx="50%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#fff9db" />
            <stop offset="100%" stopColor="#f6ad55" />
          </radialGradient>
        </defs>
        <g transform="translate(100 100)">
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <ellipse
              key={deg}
              cx="0"
              cy="-48"
              rx="26"
              ry="42"
              fill="url(#petalGradient)"
              transform={`rotate(${deg})`}
            />
          ))}
        </g>
        <circle cx="100" cy="100" r="22" fill="url(#centerGradient)" />
      </svg>
      <div className="relative flex flex-col items-center gap-1">
        <span className="text-3xl">{luckyItem.emoji}</span>
        <span className="text-sm font-medium text-zinc-700">
          행운의 아이템: {luckyItem.name}
        </span>
      </div>
    </div>
  );
}
