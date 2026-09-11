import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useHashRoute, routeParts, Link } from "./lib/router";
import { Toasts } from "./components/ui";
import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Booking, { BookingConfirmation } from "./pages/Booking";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";

export default function App() {
  const route = useHashRoute();
  const parts = routeParts(route.split("?")[0]);

  if (parts[0] === "admin") {
    return (
      <>
        <Toasts />
        <Admin sub={parts[1] || ""} />
      </>
    );
  }

  let page: React.ReactNode;
  if (parts.length === 0) page = <Home onBook={() => (window.location.hash = "/book")} onSelectService={(s) => (window.location.hash = `/book?service=${s.id}`)} />;
  else if (parts[0] === "services" && parts[1]) page = <ServiceDetail id={parts[1]} />;
  else if (parts[0] === "services") page = <Services />;
  else if (parts[0] === "book") page = <Booking route={route} />;
  else if (parts[0] === "booking-confirmation" && parts[1]) page = <BookingConfirmation id={parts[1]} />;
  else if (parts[0] === "dashboard") page = <Dashboard sub={parts[1] || ""} />;
  else if (parts[0] === "about") page = <About />;
  else if (parts[0] === "contact") page = <Contact />;
  else
    page = (
      <main className="container-x section-pad pt-32 text-center">
        <p className="mb-4 text-5xl">🍃</p>
        <h1 className="h-serif text-4xl">This page drifted away</h1>
        <p className="mt-2 text-black/60">The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn-primary mt-6">
          Back to calm
        </Link>
      </main>
    );

  return (
    <div className="flex min-h-screen flex-col">
      <Toasts />
      <Navbar onBook={() => (window.location.hash = "/book")} />
      <div className="flex-1">{page}</div>
      <Footer />
    </div>
  );
}
