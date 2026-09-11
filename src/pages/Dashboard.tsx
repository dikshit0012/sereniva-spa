import { useState } from "react";
import { useApp } from "../context/AppContext";
import { SERVICES, fmtINR } from "../data/services";
import { StatusBadge, EmptyState } from "../components/ui";
import { navigate } from "../lib/router";

const TABS: [string, string][] = [
  ["overview", "Overview"],
  ["bookings", "My Bookings"],
  ["favorites", "Favorites"],
  ["rewards", "Rewards"],
];

export default function Dashboard({ sub }: { sub: string }) {
  const { bookings, cancelBooking, pushToast } = useApp();
  const [tab, setTab] = useState(sub || "overview");
  const active = bookings.find((b) => b.status === "Confirmed");
  const points = bookings.filter((b) => b.status !== "Cancelled").length * 120;

  const cancel = (id: string) => {
    cancelBooking(id);
    pushToast("Booking cancelled.");
  };

  return (
    <main className="pt-8">
      <section className="section-pad">
        <div className="container-x">
          <p className="eyebrow">My Wellness</p>
          <h1 className="h-serif mb-8 mt-1 text-3xl">Welcome back</h1>

          <div className="mb-8 -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
            {TABS.map(([k, l]) => (
              <button key={k} onClick={() => setTab(k)} className={"chip whitespace-nowrap " + (tab === k ? "chip-active" : "")}>
                {l}
              </button>
            ))}
          </div>

          {tab === "overview" && (
            <div className="space-y-6">
              {active ? (
                <div className="card flex flex-col justify-between gap-4 p-6 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-moss">Next appointment</p>
                    <p className="h-serif mt-1 text-xl">{active.serviceName}</p>
                    <p className="text-sm text-black/60">
                      {active.time} · with {active.therapist} · {fmtINR(active.price)}
                    </p>
                  </div>
                  <button onClick={() => cancel(active.id)} className="btn-sm rounded-full border border-red-300/60 px-4 py-2 text-xs text-red-500 hover:bg-red-50">
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="card">
                  <EmptyState title="No upcoming appointments" sub="Book a treatment to see it here." />
                </div>
              )}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="card p-5">
                  <p className="text-xs text-black/50">Total visits</p>
                  <p className="h-serif mt-1 text-2xl">{bookings.length}</p>
                </div>
                <div className="card p-5">
                  <p className="text-xs text-black/50">Reward points</p>
                  <p className="h-serif mt-1 text-2xl">{points}</p>
                </div>
                <div className="card p-5">
                  <p className="text-xs text-black/50">Membership</p>
                  <p className="h-serif mt-1 text-2xl">Silver</p>
                </div>
              </div>
            </div>
          )}

          {tab === "bookings" && (
            <div className="space-y-3">
              {bookings.length === 0 && (
                <div className="card">
                  <EmptyState title="No bookings yet" sub="Your appointments will show up here." />
                </div>
              )}
              {bookings.map((b) => (
                <div key={b.id} className="card flex flex-col justify-between gap-3 p-5 sm:flex-row sm:items-center">
                  <div>
                    <p className="font-medium">{b.serviceName}</p>
                    <p className="text-sm text-black/50">
                      {b.date} · {b.time} · with {b.therapist} · {fmtINR(b.price)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={b.status.toLowerCase() as "confirmed" | "cancelled"} />
                    {b.status === "Confirmed" && (
                      <button onClick={() => cancel(b.id)} className="btn-sm rounded-full border border-red-300/60 px-4 py-2 text-xs text-red-500 hover:bg-red-50">
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "favorites" && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.slice(0, 3).map((s) => (
                <div key={s.id} className="card p-5">
                  <p className="h-serif text-lg">{s.name}</p>
                  <p className="mt-1 text-sm text-black/60">
                    {s.duration} min · {fmtINR(s.price)}
                  </p>
                  <button onClick={() => navigate(`/book?service=${s.id}`)} className="btn-outline btn-sm mt-4 w-full">
                    Book again
                  </button>
                </div>
              ))}
            </div>
          )}

          {tab === "rewards" && (
            <div className="card p-6">
              <p className="mb-2 font-medium">{points} / 1000 points to Gold membership</p>
              <div className="h-2.5 rounded-full bg-stone">
                <div className="h-full rounded-full bg-brass" style={{ width: `${Math.min(100, points / 10)}%` }} />
              </div>
              <p className="mt-3 text-sm text-black/50">Earn 120 points per completed visit. Redeem 500 points for a free 30-minute add-on.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
