import { useState } from "react";
import { Link } from "../lib/router";
import {
  ADMIN_APPTS,
  CUSTOMERS,
  REVENUE_WEEK,
  BOOKINGS_WEEK,
  SERVICE_SHARE,
  fmtINR,
  AdminAppt,
} from "../data/mock";
import { SERVICES, THERAPISTS, TIME_SLOTS } from "../data/services";
import { LineChart, BarChart, DonutChart } from "../components/charts";
import { StatusBadge, Modal, Stars } from "../components/ui";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const NAV: [string, string, string][] = [
  ["overview", "Overview", "📊"],
  ["calendar", "Calendar", "🗓️"],
  ["appointments", "Appointments", "🧾"],
  ["customers", "Customers", "👥"],
  ["services", "Services", "✨"],
  ["therapists", "Therapists", "🤲"],
  ["analytics", "Analytics", "📈"],
];

function AdminShell({ tab, setTab, children }: { tab: string; setTab: (t: string) => void; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const NavList = ({ onItemClick }: { onItemClick?: () => void }) => (
    <>
      {NAV.map(([k, l, ic]) => (
        <button
          key={k}
          onClick={() => {
            setTab(k);
            onItemClick?.();
          }}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium"
          style={tab === k ? { background: "#233529", color: "#EFEAE1" } : {}}
        >
          <span>{ic}</span>
          {l}
        </button>
      ))}
    </>
  );

  return (
    <div className="flex min-h-[85vh]">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-line p-3 lg:flex">
        <div className="px-3 py-4">
          <p className="h-serif text-lg text-pine">Sereniva</p>
          <p className="text-[10px] uppercase tracking-widest text-black/40">Staff Console</p>
        </div>
        <nav className="flex-1 space-y-1">
          <NavList />
        </nav>
        <Link to="/" className="btn-outline btn-sm w-full text-center">
          ← Back to site
        </Link>
      </aside>

      <div className="min-w-0 flex-1">
        <div className="flex h-16 items-center justify-between border-b border-line px-5">
          <div className="flex items-center gap-3">
            <button onClick={() => setOpen(true)} className="text-xl lg:hidden" aria-label="Open menu">
              ☰
            </button>
            <p className="h-serif text-lg capitalize">{tab}</p>
          </div>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-pine text-sm font-medium text-linen">S</span>
        </div>

        {open && (
          <div className="fixed inset-0 z-[150] lg:hidden" onClick={() => setOpen(false)}>
            <div className="absolute inset-0" style={{ background: "rgba(32,36,31,.5)" }} />
            <div className="absolute left-0 top-0 h-full w-64 bg-linen p-3" onClick={(e) => e.stopPropagation()}>
              <p className="h-serif px-3 py-4 text-lg text-pine">Sereniva</p>
              <NavList onItemClick={() => setOpen(false)} />
              <Link to="/" className="btn-outline btn-sm mt-3 w-full text-center">
                ← Back to site
              </Link>
            </div>
          </div>
        )}

        <div className="p-5 sm:p-8">{children}</div>
      </div>
    </div>
  );
}

function Stat({ icon, label, value, sub }: { icon: string; label: string; value: string; sub: string }) {
  return (
    <div className="card flex items-center gap-4 p-5">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-linen text-xl">{icon}</span>
      <div>
        <p className="text-xs text-black/50">{label}</p>
        <p className="h-serif text-xl">{value}</p>
        <p className="text-xs text-moss">{sub}</p>
      </div>
    </div>
  );
}

function Overview({ appts }: { appts: AdminAppt[] }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat icon="🧾" label="Today's appointments" value={String(appts.length)} sub="+4 vs yesterday" />
        <Stat icon="💰" label="Today's revenue" value={fmtINR(appts.reduce((s, a) => s + a.amount, 0))} sub="+12% week over week" />
        <Stat icon="🆕" label="New customers" value="8" sub="2 from referrals" />
        <Stat icon="🛏️" label="Occupancy" value="76%" sub="peak at 5:30 PM" />
      </div>
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="card p-6 xl:col-span-2">
          <p className="mb-4 font-medium">Revenue this week</p>
          <LineChart data={DAYS.map((d, i) => ({ label: d, value: REVENUE_WEEK[i] }))} />
        </div>
        <div className="card p-6">
          <p className="mb-4 font-medium">Service mix</p>
          <DonutChart items={SERVICE_SHARE} />
        </div>
      </div>
      <div className="card p-6">
        <p className="mb-4 font-medium">Bookings this week</p>
        <BarChart data={DAYS.map((d, i) => ({ label: d, value: BOOKINGS_WEEK[i] }))} color="#6E8567" />
      </div>
    </div>
  );
}

function CalendarView({ appts }: { appts: AdminAppt[] }) {
  return (
    <div className="card overflow-x-auto">
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="border-b border-line text-left text-xs uppercase text-black/40">
            <th className="px-4 py-3">Time</th>
            <th className="px-4 py-3">Client</th>
            <th className="px-4 py-3">Service</th>
            <th className="px-4 py-3">Therapist</th>
            <th className="px-4 py-3">Room</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {TIME_SLOTS.map((t) => {
            const a = appts.find((x) => x.time === t);
            return (
              <tr key={t} className="border-b border-line">
                <td className="px-4 py-3 font-medium">{t}</td>
                <td className="px-4 py-3">{a?.client || "—"}</td>
                <td className="px-4 py-3">{a?.service || "Open slot"}</td>
                <td className="px-4 py-3">{a?.therapist || "—"}</td>
                <td className="px-4 py-3">{a?.room || "—"}</td>
                <td className="px-4 py-3">{a ? <StatusBadge status={a.status} /> : <span className="text-xs text-black/40">available</span>}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Appointments({ appts, setAppts, pushToast }: { appts: AdminAppt[]; setAppts: (fn: (l: AdminAppt[]) => AdminAppt[]) => void; pushToast: (m: string) => void }) {
  const [selected, setSelected] = useState<AdminAppt | null>(null);
  const setStatus = (id: string, status: AdminAppt["status"]) => {
    setAppts((l) => l.map((a) => (a.id === id ? { ...a, status } : a)));
    setSelected((s) => (s && s.id === id ? { ...s, status } : s));
    pushToast(`Appointment ${status.toLowerCase()}`);
  };
  return (
    <>
      <div className="card hidden overflow-x-auto md:block">
        <table className="w-full min-w-[860px] text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs uppercase text-black/40">
              {["Client", "Service", "Therapist", "Time", "Room", "Amount", "Status", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {appts.map((a) => (
              <tr key={a.id} className="border-b border-line">
                <td className="px-4 py-3 font-medium">{a.client}</td>
                <td className="px-4 py-3">{a.service}</td>
                <td className="px-4 py-3">{a.therapist}</td>
                <td className="px-4 py-3">{a.time}</td>
                <td className="px-4 py-3">{a.room}</td>
                <td className="px-4 py-3 font-medium">{fmtINR(a.amount)}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={a.status} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1.5">
                    <button onClick={() => setSelected(a)} className="btn-outline btn-sm">
                      View
                    </button>
                    {a.status === "Pending" && (
                      <button onClick={() => setStatus(a.id, "Confirmed")} className="btn-primary btn-sm">
                        Confirm
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 md:hidden">
        {appts.map((a) => (
          <button key={a.id} onClick={() => setSelected(a)} className="card w-full p-4 text-left">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium">{a.client}</p>
                <p className="text-xs text-black/50">
                  {a.service} · {a.time}
                </p>
              </div>
              <StatusBadge status={a.status} />
            </div>
          </button>
        ))}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Appointment details">
        {selected && (
          <div className="space-y-3 text-sm">
            {(
              [
                ["Client", selected.client],
                ["Service", selected.service],
                ["Therapist", selected.therapist],
                ["Time", selected.time],
                ["Room", selected.room],
                ["Amount", fmtINR(selected.amount)],
              ] as [string, string][]
            ).map(([k, v]) => (
              <p key={k} className="flex justify-between border-b border-line pb-2">
                <span className="text-black/50">{k}</span>
                <span className="font-medium">{v}</span>
              </p>
            ))}
            <div className="flex gap-2 pt-2">
              {selected.status === "Pending" && (
                <button onClick={() => setStatus(selected.id, "Confirmed")} className="btn-primary flex-1">
                  Confirm
                </button>
              )}
              {selected.status !== "Cancelled" && (
                <button
                  onClick={() => setStatus(selected.id, "Cancelled")}
                  className="flex-1 rounded-full border border-red-300/60 px-4 py-2 text-xs font-medium text-red-500 hover:bg-red-50"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

function Customers() {
  const [selected, setSelected] = useState<(typeof CUSTOMERS)[0] | null>(null);
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {CUSTOMERS.map((c) => (
          <button key={c.id} onClick={() => setSelected(c)} className="card p-5 text-left transition-all hover:-translate-y-0.5 hover:shadow-lift">
            <div className="flex items-center gap-3">
              <span className="h-serif flex h-11 w-11 items-center justify-center rounded-full bg-linen text-lg text-pine">{c.name[0]}</span>
              <div className="min-w-0">
                <p className="truncate font-medium">{c.name}</p>
                <p className="truncate text-xs text-black/50">{c.membership}</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-lg bg-linen/70 py-2">
                <p className="h-serif text-lg">{c.visits}</p>
                <p className="text-black/50">visits</p>
              </div>
              <div className="rounded-lg bg-linen/70 py-2">
                <p className="h-serif text-lg">{(c.spend / 1000).toFixed(1)}k</p>
                <p className="text-black/50">spent ₹</p>
              </div>
              <div className="rounded-lg bg-linen/70 py-2">
                <p className="h-serif text-lg">{c.lastVisit.slice(5)}</p>
                <p className="text-black/50">last</p>
              </div>
            </div>
          </button>
        ))}
      </div>
      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.name || ""} wide>
        {selected && (
          <div className="grid gap-6 sm:grid-cols-2 text-sm">
            <div className="space-y-3">
              <p className="flex justify-between">
                <span className="text-black/50">Phone</span>
                <span className="font-medium">{selected.phone}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-black/50">Email</span>
                <span className="font-medium">{selected.email}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-black/50">Lifetime spend</span>
                <span className="font-medium text-pine">{fmtINR(selected.spend)}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-black/50">Favourite service</span>
                <span className="font-medium">{selected.favourite}</span>
              </p>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

function ServicesAdmin({ pushToast }: { pushToast: (m: string) => void }) {
  const [items, setItems] = useState(SERVICES.map((s) => ({ ...s, enabled: true })));
  return (
    <div className="card overflow-x-auto">
      <table className="w-full min-w-[680px] text-sm">
        <thead>
          <tr className="border-b border-line text-left text-xs uppercase text-black/40">
            <th className="px-4 py-3">Service</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Duration</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((s) => (
            <tr key={s.id} className="border-b border-line" style={{ opacity: s.enabled ? 1 : 0.5 }}>
              <td className="px-4 py-3 font-medium">{s.name}</td>
              <td className="px-4 py-3">{s.category}</td>
              <td className="px-4 py-3">{s.duration} min</td>
              <td className="px-4 py-3">{fmtINR(s.price)}</td>
              <td className="px-4 py-3">
                <StatusBadge status={s.enabled ? "confirmed" : "cancelled"} />
              </td>
              <td className="px-4 py-3">
                <button
                  onClick={() => {
                    setItems((l) => l.map((x) => (x.id === s.id ? { ...x, enabled: !x.enabled } : x)));
                    pushToast(s.enabled ? "Service disabled" : "Service enabled");
                  }}
                  className="btn-outline btn-sm"
                >
                  {s.enabled ? "Disable" : "Enable"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TherapistsAdmin() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {THERAPISTS.map((t) => (
        <div key={t.id} className="card p-6 text-center">
          <div className="h-serif mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-linen text-xl text-pine">{t.name[0]}</div>
          <p className="mt-4 font-medium">{t.name}</p>
          <p className="text-xs text-black/50">
            {t.role} · {t.experience} yrs
          </p>
          <p className="mt-1 text-xs">
            <Stars rating={t.rating} /> {t.rating}
          </p>
        </div>
      ))}
    </div>
  );
}

function Analytics() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="card p-6 xl:col-span-2">
          <p className="mb-4 font-medium">Monthly revenue</p>
          <LineChart data={DAYS.map((d, i) => ({ label: d, value: REVENUE_WEEK[i] }))} />
        </div>
        <div className="card p-6">
          <p className="mb-4 font-medium">Most popular services</p>
          <DonutChart items={SERVICE_SHARE} />
        </div>
      </div>
      <div className="card p-6">
        <p className="mb-4 font-medium">Therapist performance</p>
        <div className="space-y-4">
          {THERAPISTS.map((t, i) => (
            <div key={t.id}>
              <div className="mb-1 flex justify-between text-sm">
                <span>{t.name}</span>
                <span className="text-black/50">{88 - i * 5}% rebook rate</span>
              </div>
              <div className="h-2 rounded-full bg-stone">
                <div className="h-full rounded-full bg-pine" style={{ width: `${88 - i * 5}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Admin({ sub }: { sub: string }) {
  const [tab, setTab] = useState(sub || "overview");
  const [appts, setAppts] = useState<AdminAppt[]>(ADMIN_APPTS);
  const pushToast = (m: string) => {
    // lightweight local toast for admin-only actions (no global context needed here)
    const el = document.createElement("div");
    el.textContent = m;
    el.className = "fixed bottom-5 right-5 z-[999] card px-4 py-3 text-sm shadow-lift";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3000);
  };

  return (
    <AdminShell tab={tab} setTab={setTab}>
      {tab === "overview" && <Overview appts={appts} />}
      {tab === "calendar" && <CalendarView appts={appts} />}
      {tab === "appointments" && <Appointments appts={appts} setAppts={setAppts} pushToast={pushToast} />}
      {tab === "customers" && <Customers />}
      {tab === "services" && <ServicesAdmin pushToast={pushToast} />}
      {tab === "therapists" && <TherapistsAdmin />}
      {tab === "analytics" && <Analytics />}
    </AdminShell>
  );
}
