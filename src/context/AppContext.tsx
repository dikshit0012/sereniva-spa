import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  price: number;
  duration: number;
  therapist: string;
  time: string;
  date: string;
  guestName: string;
  guestPhone: string;
  status: "Confirmed" | "Cancelled";
}

export interface Toast {
  id: string;
  message: string;
  kind: "success" | "error" | "info";
}

interface AppContextValue {
  bookings: Booking[];
  addBooking: (b: Booking) => void;
  cancelBooking: (id: string) => void;
  toasts: Toast[];
  pushToast: (message: string, kind?: Toast["kind"]) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

const STORAGE_KEY = "sereniva_bookings_v1";

function loadBookings(): Booking[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Booking[]) : [];
  } catch {
    return [];
  }
}

function uid(): string {
  return Math.random().toString(36).slice(2, 9);
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>(loadBookings);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    } catch {
      /* storage unavailable, ignore */
    }
  }, [bookings]);

  const addBooking = (b: Booking) => setBookings((list) => [b, ...list]);

  const cancelBooking = (id: string) =>
    setBookings((list) => list.map((b) => (b.id === id ? { ...b, status: "Cancelled" } : b)));

  const pushToast = (message: string, kind: Toast["kind"] = "success") => {
    const id = uid();
    setToasts((t) => [...t, { id, message, kind }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  };

  return (
    <AppContext.Provider value={{ bookings, addBooking, cancelBooking, toasts, pushToast }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
