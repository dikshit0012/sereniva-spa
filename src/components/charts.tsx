interface Point {
  label: string;
  value: number;
}

export function BarChart({
  data,
  height = 160,
  color = "#233529",
}: {
  data: Point[];
  height?: number;
  color?: string;
}) {
  const max = Math.max(...data.map((d) => d.value)) || 1;
  return (
    <div className="flex items-end gap-3" style={{ height }}>
      {data.map((d) => (
        <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
          <div
            className="w-full rounded-t-md transition-all"
            style={{ height: `${(d.value / max) * 100}%`, background: color, minHeight: 4 }}
          />
          <span className="text-[10px] text-black/50">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

export function LineChart({
  data,
  height = 160,
  color = "#B08D4F",
}: {
  data: Point[];
  height?: number;
  color?: string;
}) {
  const max = Math.max(...data.map((d) => d.value)) || 1;
  const w = 100,
    h = 100;
  const pts = data.map((d, i) => `${(i / (data.length - 1)) * w},${h - (d.value / max) * h}`).join(" ");
  return (
    <div style={{ height }}>
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="h-[85%] w-full">
        <polyline points={pts} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="mt-1 flex justify-between text-[10px] text-black/50">
        {data.map((d) => (
          <span key={d.label}>{d.label}</span>
        ))}
      </div>
    </div>
  );
}

export function DonutChart({ items }: { items: { label: string; value: number; color: string }[] }) {
  const total = items.reduce((s, i) => s + i.value, 0);
  let acc = 0;
  const r = 40,
    c = 2 * Math.PI * r;
  return (
    <div className="flex flex-wrap items-center gap-5">
      <svg viewBox="0 0 100 100" className="h-28 w-28 -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="#EFEAE1" strokeWidth="14" />
        {items.map((it) => {
          const dash = (it.value / total) * c;
          const el = (
            <circle
              key={it.label}
              cx="50"
              cy="50"
              r={r}
              fill="none"
              stroke={it.color}
              strokeWidth="14"
              strokeDasharray={`${dash} ${c - dash}`}
              strokeDashoffset={-acc}
            />
          );
          acc += dash;
          return el;
        })}
      </svg>
      <div className="space-y-1.5 text-xs">
        {items.map((it) => (
          <div key={it.label} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: it.color }} />
            <span>{it.label}</span>
            <span className="text-black/40">· {it.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
