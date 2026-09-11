import { useState } from "react";
import { SERVICES, CATEGORIES, Service, fmtINR } from "../data/services";
import { Img, SectionHead } from "../components/ui";
import { Link } from "../lib/router";

function ServiceCard({ s }: { s: Service }) {
  return (
    <div className="card flex flex-col overflow-hidden">
      <Img src={s.image} fallbackSeed={s.id} alt={s.name} className="h-48 w-full object-cover" />
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs uppercase tracking-wide text-moss">{s.category}</p>
        <h3 className="h-serif mt-1 text-lg">{s.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-black/60">{s.short}</p>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span>
            {s.duration} min · <strong>{fmtINR(s.price)}</strong>
          </span>
          <Link to={`/services/${s.id}`} className="btn-outline btn-sm">
            View
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const [cat, setCat] = useState<string>("All");
  const shown = cat === "All" ? SERVICES : SERVICES.filter((s) => s.category === cat);

  return (
    <main className="pt-8">
      <section className="section-pad">
        <div className="container-x">
          <SectionHead eyebrow="Treatments" title="Choose your ritual" />
          <div className="mb-8 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button key={c} onClick={() => setCat(c)} className={"chip " + (cat === c ? "chip-active" : "")}>
                {c}
              </button>
            ))}
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((s) => (
              <ServiceCard key={s.id} s={s} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
