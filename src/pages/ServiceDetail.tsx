import { SERVICES, fmtINR } from "../data/services";
import { Img } from "../components/ui";
import { Link, navigate } from "../lib/router";

export default function ServiceDetail({ id }: { id: string }) {
  const service = SERVICES.find((s) => s.id === id);

  if (!service) {
    return (
      <main className="container-x section-pad pt-32 text-center">
        <p className="mb-4 text-5xl">🍃</p>
        <h1 className="h-serif text-3xl">We couldn't find that treatment</h1>
        <Link to="/services" className="btn-primary mt-6">
          Back to services
        </Link>
      </main>
    );
  }

  return (
    <main className="pt-8">
      <section className="section-pad">
        <div className="container-x grid gap-10 md:grid-cols-2 md:items-start">
          <Img src={service.image} fallbackSeed={service.id} alt={service.name} className="h-96 w-full rounded-xl2 object-cover" />
          <div>
            <p className="eyebrow">{service.category}</p>
            <h1 className="h-serif mt-1 text-3xl sm:text-4xl">{service.name}</h1>
            <p className="mt-4 leading-relaxed text-black/70">{service.description}</p>
            <div className="mt-6 flex items-center gap-4 text-sm">
              <span className="chip">{service.duration} min</span>
              <span className="chip">{fmtINR(service.price)}</span>
            </div>
            <button onClick={() => navigate(`/book?service=${service.id}`)} className="btn-primary mt-8">
              Book this treatment
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
