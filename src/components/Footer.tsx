import { Link } from "../lib/router";

export default function Footer() {
  return (
    <footer className="container-x flex flex-col gap-3 border-t border-line py-10 text-sm text-black/50 sm:flex-row sm:justify-between">
      <p className="h-serif text-pine">Sereniva</p>
      <div className="flex gap-5">
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/admin">Staff login</Link>
      </div>
      <p>© 2026 Sereniva Spa &amp; Wellness, Chandigarh.</p>
    </footer>
  );
}
