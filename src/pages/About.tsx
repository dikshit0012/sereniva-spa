import { Link } from "../lib/router";
import { THERAPISTS } from "../data/services";
import { Img, Stars } from "../components/ui";

const VALUES: [string, string][] = [
  ["Unisex by design", "A space shaped for every body, with no assumptions made either way."],
  ["Certified therapists", "Trained in therapeutic and spa arts, with ongoing refresher courses."],
  ["Private suites", "Sound-softened rooms and a phone-free lounge to protect your quiet."],
  ["Premium products", "Organic, cruelty-free oils and balms chosen for sensitive skin."],
];

export default function About() {
  return (
    <main className="pt-8">
      <section className="section-pad">
        <div className="container-x grid items-center gap-12 md:grid-cols-2">
          <Img
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1000&q=80"
            fallbackSeed="about"
            alt="Spa interior"
            className="h-80 w-full rounded-xl2 object-cover"
          />
          <div>
            <p className="eyebrow">Our story</p>
            <h1 className="h-serif mb-5 mt-1 text-3xl">Wellness, without boundaries</h1>
            <p className="mb-6 leading-relaxed text-black/70">
              Founded in 2024, Sereniva brings boutique-resort care to Chandigarh — a unisex spa where certified
              therapists and quiet, private rooms meet.
            </p>
            <div className="space-y-5">
              {VALUES.map(([t, d]) => (
                <div key={t} className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brass" />
                  <div>
                    <p className="font-medium">{t}</p>
                    <p className="text-sm text-black/60">{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad border-t border-line">
        <div className="container-x grid gap-6 sm:grid-cols-3">
          {THERAPISTS.map((t) => (
            <div key={t.id} className="card p-6 text-center">
              <div className="h-serif mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-linen text-2xl text-pine">
                {t.name[0]}
              </div>
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
        <div className="mt-12 text-center">
          <Link to="/book" className="btn-primary">
            Experience Sereniva
          </Link>
        </div>
      </section>
    </main>
  );
}
