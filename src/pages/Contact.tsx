import { useState } from "react";
import { useApp } from "../context/AppContext";

export default function Contact() {
  const { pushToast } = useApp();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = () => {
    if (form.name.trim().length < 2 || !/.+@.+\..+/.test(form.email) || !form.message.trim()) {
      pushToast("Please fill in every field correctly.", "error");
      return;
    }
    pushToast("Message sent — we reply within a day.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <main className="pt-8">
      <section className="section-pad">
        <div className="container-x grid gap-10 md:grid-cols-2">
          <div>
            <p className="eyebrow">Visit us</p>
            <h1 className="h-serif mb-6 mt-1 text-3xl">Sereniva Spa</h1>
            <div className="space-y-3 text-sm text-black/70">
              <p>123 Wellness Avenue, Chandigarh</p>
              <p>Mon–Sun · 9:00 AM – 9:00 PM</p>
              <p>+91 98765 43210 · hello@sereniva.in</p>
            </div>
          </div>
          <div className="card p-6">
            <div className="grid gap-4">
              <input placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" />
              <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" />
              <textarea
                placeholder="Message"
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="input resize-none"
              />
              <button onClick={submit} className="btn-primary">
                Send message
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
