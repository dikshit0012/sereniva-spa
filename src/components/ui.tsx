import { ImgHTMLAttributes, ReactNode } from "react";
import { useApp } from "../context/AppContext";
import type { ApptStatus } from "../data/mock";

export function Img({
  src,
  fallbackSeed,
  ...rest
}: ImgHTMLAttributes<HTMLImageElement> & { fallbackSeed?: string }) {
  return (
    <img
      src={src}
      onError={(e) => {
        const el = e.currentTarget;
        el.onerror = null;
        el.src = `https://picsum.photos/seed/${fallbackSeed || "sereniva"}/800/600`;
      }}
      {...rest}
    />
  );
}

export function Toasts() {
  const { toasts } = useApp();
  return (
    <div className="fixed bottom-5 right-5 z-[999] w-[calc(100%-2.5rem)] max-w-xs space-y-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="card animate-rise border-l-4 px-4 py-3 text-sm shadow-lift"
          style={{ borderLeftColor: t.kind === "error" ? "#c4695a" : "#B08D4F" }}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}

export function StatusBadge({ status }: { status: ApptStatus | "confirmed" | "cancelled" }) {
  const norm = status[0].toUpperCase() + status.slice(1).toLowerCase();
  const map: Record<string, [string, string]> = {
    Confirmed: ["#233529", "#fff"],
    Pending: ["#B08D4F", "#fff"],
    Completed: ["#6E8567", "#fff"],
    Cancelled: ["#c4695a", "#fff"],
  };
  const [bg, fg] = map[norm] || ["#999", "#fff"];
  return (
    <span className="badge" style={{ background: bg, color: fg }}>
      {norm}
    </span>
  );
}

export function Modal({
  open,
  onClose,
  title,
  children,
  wide,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  wide?: boolean;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center p-0 sm:items-center sm:p-6"
      style={{ background: "rgba(32,36,31,.55)" }}
      onClick={onClose}
    >
      <div
        className={
          "card max-h-[92vh] w-full overflow-y-auto rounded-t-2xl sm:rounded-2xl " +
          (wide ? "sm:max-w-2xl" : "sm:max-w-lg")
        }
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <p className="h-serif text-lg">{title}</p>
          <button onClick={onClose} aria-label="Close" className="text-2xl leading-none">
            ×
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export function SectionHead({
  eyebrow,
  title,
  sub,
  center,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  center?: boolean;
}) {
  return (
    <div className={"mb-10 " + (center ? "text-center" : "")}>
      {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
      <h2 className="h-serif text-3xl sm:text-4xl">{title}</h2>
      {sub && <p className="mx-auto mt-3 max-w-xl text-black/60">{sub}</p>}
    </div>
  );
}

export function EmptyState({ icon = "🍃", title, sub }: { icon?: string; title: string; sub?: string }) {
  return (
    <div className="py-14 text-center">
      <p className="mb-3 text-4xl">{icon}</p>
      <p className="font-medium">{title}</p>
      {sub && <p className="mt-1 text-sm text-black/50">{sub}</p>}
    </div>
  );
}

export function Stars({ rating, size = "text-xs" }: { rating: number; size?: string }) {
  return <span className={size} style={{ color: "#B08D4F" }}>{"★".repeat(Math.round(rating))}</span>;
}
