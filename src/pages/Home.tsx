import { Link } from "../lib/router";
import { SERVICES, Service, fmtINR } from "../data/services";
import { Img } from "../components/ui";

function ServiceCard({ s, onSelect }: { s: Service; onSelect: (s: Service) => void }) {
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
          <button onClick={() => onSelect(s)} className="btn-outline btn-sm">
            Book
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Home({ onBook, onSelectService }: { onBook: () => void; onSelectService: (s: Service) => void }) {
  const stats: [string, string][] = [
    ["4", "Certified therapists"],
    ["12k+", "Rituals performed"],
    ["1,200+", "Happy guests"],
    ["4.9★", "Average rating"],
  ];
  return (
    <>
      <div className="relative overflow-hidden">
        <Img
          src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1600&q=80"
          fallbackSeed="hero"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(32,36,31,.55), rgba(32,36,31,.75))" }} />
        <div className="container-x relative pb-24 pt-28 text-linen sm:pb-32 sm:pt-40">
          <p className="mb-4 text-sm tracking-wide opacity-80">Chandigarh · unisex spa</p>
          <h1 className="h-serif max-w-2xl text-4xl leading-[1.1] sm:text-6xl">
            A quiet room, at the pace your shoulders actually need.
          </h1>
          <p className="mt-5 max-w-lg leading-relaxed text-white/80">
            Certified therapists, organic products, and private suites — booked in under two minutes, no account
            required.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={onBook} className="btn-primary" style={{ background: "#B08D4F" }}>
              Book a visit
            </button>
            <Link to="/services" className="btn-outline" style={{ borderColor: "rgba(255,255,255,.5)", color: "#fff" }}>
              See services
            </Link>
          </div>
        </div>
      </div>

      <section className="section-pad">
        <div className="container-x">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow">Popular treatments</p>
              <h2 className="h-serif mt-1 text-3xl">A few favourites</h2>
            </div>
            <Link to="/services" className="text-sm underline">
              See all services →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.slice(0, 3).map((s) => (
              <ServiceCard key={s.id} s={s} onSelect={onSelectService} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad border-t border-line">
        <div className="container-x grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
          {stats.map(([n, l]) => (
            <div key={l} className="card p-6">
              <p className="h-serif text-3xl text-pine">{n}</p>
              <p className="mt-1 text-xs text-black/50">{l}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
