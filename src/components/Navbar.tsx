import { useState } from "react";
import { Link } from "../lib/router";

export default function Navbar({ onBook }: { onBook: () => void }) {
  const [open, setOpen] = useState(false);
  const links: [string, string][] = [
    ["Home", "/"],
    ["Services", "/services"],
    ["My Wellness", "/dashboard"],
    ["About", "/about"],
    ["Contact", "/contact"],
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-linen/90 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between">
        <Link to="/" className="h-serif text-xl tracking-wide text-pine">
          Sereniva
        </Link>
        <nav className="hidden items-center gap-8 text-sm md:flex">
          {links.map(([l, h]) => (
            <Link key={h} to={h} className="hover:opacity-70">
              {l}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button onClick={onBook} className="btn-primary hidden sm:inline-flex">
            Book a visit
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="text-2xl leading-none md:hidden"
            aria-label="Toggle menu"
          >
            {open ? "×" : "☰"}
          </button>
        </div>
      </div>
      {open && (
        <div className="flex flex-col gap-3 border-t border-line px-5 pb-5 md:hidden">
          {links.map(([l, h]) => (
            <Link key={h} to={h} onClick={() => setOpen(false)} className="py-1">
              {l}
            </Link>
          ))}
          <button
            onClick={() => {
              setOpen(false);
              onBook();
            }}
            className="btn-primary mt-2 w-full"
          >
            Book a visit
          </button>
        </div>
      )}
    </header>
  );
}
