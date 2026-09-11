import { useState } from "react";
import { SERVICES, THERAPIST_NAMES, TIME_SLOTS, Service, fmtINR } from "../data/services";
import { Link, navigate } from "../lib/router";
import { useApp } from "../context/AppContext";

function uid(): string {
  return Math.random().toString(36).slice(2, 9);
}

function stepFromQuery(route: string): Service | null {
  const q = route.split("?")[1];
  if (!q) return null;
  const params = new URLSearchParams(q);
  const id = params.get("service");
  return SERVICES.find((s) => s.id === id) || null;
}

export default function Booking({ route }: { route: string }) {
  const { pushToast, addBooking } = useApp();
  const preselected = stepFromQuery(route);

  const [step, setStep] = useState(1);
  const [svc, setSvc] = useState<Service>(preselected || SERVICES[0]);
  const [therapist, setTherapist] = useState(THERAPIST_NAMES[THERAPIST_NAMES.length - 1]);
  const [time, setTime] = useState<string | null>(null);
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");

  const next = () => {
    if (step === 3 && !time) {
      pushToast("Pick a time slot.", "error");
      return;
    }
    if (step === 4) {
      if (guestName.trim().length < 2 || guestPhone.trim().length < 8) {
        pushToast("Enter your name and phone number.", "error");
        return;
      }
      const id = uid();
      addBooking({
        id,
        serviceId: svc.id,
        serviceName: svc.name,
        price: svc.price,
        duration: svc.duration,
        therapist,
        time: time as string,
        date: new Date().toISOString().slice(0, 10),
        guestName,
        guestPhone,
        status: "Confirmed",
      });
      pushToast("Booking confirmed 🌿");
      navigate(`/booking-confirmation/${id}`);
      return;
    }
    setStep((s) => s + 1);
  };
  const back = () => setStep((s) => Math.max(1, s - 1));

  return (
    <main className="pt-8">
      <section className="section-pad">
        <div className="container-x max-w-lg">
          <h1 className="h-serif mb-6 text-3xl">Book your visit</h1>
          <div className="mb-8 flex justify-center gap-2">
            {[1, 2, 3, 4].map((i) => (
              <span key={i} className="h-2 rounded-full transition-all" style={{ width: step >= i ? 22 : 8, background: step >= i ? "#B08D4F" : "#D9D0BE" }} />
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-3">
              <p className="mb-2 font-medium">Select a service</p>
              {SERVICES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSvc(s)}
                  className="flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left"
                  style={{ borderColor: svc.id === s.id ? "#B08D4F" : "#D9D0BE" }}
                >
                  <span>
                    <span className="font-medium">{s.name}</span>
                    <span className="block text-sm text-black/50">{s.duration} min</span>
                  </span>
                  <span className="font-medium">{fmtINR(s.price)}</span>
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div>
              <p className="mb-3 font-medium">Choose a therapist</p>
              <div className="grid grid-cols-2 gap-3">
                {THERAPIST_NAMES.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTherapist(t)}
                    className="rounded-xl border px-4 py-3 text-sm"
                    style={{
                      borderColor: therapist === t ? "#B08D4F" : "#D9D0BE",
                      background: therapist === t ? "rgba(176,141,79,.08)" : "#fff",
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <p className="mb-3 font-medium">Pick a time — today</p>
              <div className="grid grid-cols-3 gap-2">
                {TIME_SLOTS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTime(t)}
                    className="rounded-xl border py-2.5 text-sm"
                    style={{
                      borderColor: time === t ? "#B08D4F" : "#D9D0BE",
                      background: time === t ? "rgba(176,141,79,.08)" : "#fff",
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <p className="font-medium">Your details</p>
              <input placeholder="Full name" value={guestName} onChange={(e) => setGuestName(e.target.value)} className="input" />
              <input placeholder="Phone number" value={guestPhone} onChange={(e) => setGuestPhone(e.target.value)} className="input" />
              <div className="rounded-xl bg-linen px-4 py-3 text-sm">
                <p className="flex justify-between">
                  <span>{svc.name}</span>
                  <span>{fmtINR(svc.price)}</span>
                </p>
                <p className="text-black/50">
                  {time} · with {therapist}
                </p>
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-col gap-3">
            <div className="flex gap-3">
              {step > 1 && (
                <button onClick={back} className="btn-outline flex-1">
                  Back
                </button>
              )}
              <button onClick={next} className="btn-primary flex-1">
                {step === 4 ? "Confirm booking" : "Continue"}
              </button>
            </div>
            <a
              href="https://wa.me/918757728679?text=Hi%20Sereniva%20Spa%2C%20I%20want%20to%20book%20an%20appointment."
              target="_blank"
              rel="noreferrer"
              className="btn-outline w-full text-center"
            >
              Book via WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export function BookingConfirmation({ id }: { id: string }) {
  const { bookings } = useApp();
  const booking = bookings.find((b) => b.id === id);

  if (!booking) {
    return (
      <main className="container-x section-pad pt-32 text-center">
        <p className="mb-4 text-5xl">🍃</p>
        <h1 className="h-serif text-3xl">We couldn't find that booking</h1>
        <Link to="/" className="btn-primary mt-6">
          Back home
        </Link>
      </main>
    );
  }

  return (
    <main className="container-x section-pad pt-24 text-center">
      <p className="mb-3 text-5xl">🌿</p>
      <h1 className="h-serif text-3xl">You're booked</h1>
      <p className="h-serif mt-4 text-xl">{booking.serviceName}</p>
      <p className="mt-1 text-black/60">
        {booking.time} · with {booking.therapist} · {fmtINR(booking.price)}
      </p>
      <p className="mt-1 text-sm text-black/50">Confirmation sent to {booking.guestPhone}</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link to="/dashboard" className="btn-primary">
          View in My Wellness
        </Link>
        <Link to="/" className="btn-outline">
          Back home
        </Link>
      </div>
    </main>
  );
}
