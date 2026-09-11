export type ApptStatus = "Confirmed" | "Pending" | "Completed" | "Cancelled";

export interface AdminAppt {
  id: string;
  client: string;
  service: string;
  therapist: string;
  time: string;
  room: string;
  amount: number;
  status: ApptStatus;
}

function uid(): string {
  return Math.random().toString(36).slice(2, 9);
}

export const ADMIN_APPTS: AdminAppt[] = [
  { id: uid(), client: "Priya Nair", service: "Himalayan Hot Stone Massage", therapist: "Anjali Verma", time: "09:30", room: "Suite 1", amount: 2800, status: "Confirmed" },
  { id: uid(), client: "Karan Mehta", service: "Deep Tissue Release", therapist: "Rohan Kapoor", time: "11:00", room: "Suite 2", amount: 2200, status: "Pending" },
  { id: uid(), client: "Simran Kaur", service: "Radiance Renewal Facial", therapist: "Meher Singh", time: "13:00", room: "Facial Room", amount: 2400, status: "Confirmed" },
  { id: uid(), client: "Arjun Rao", service: "Foot & Scalp Reflexology", therapist: "Rohan Kapoor", time: "14:30", room: "Suite 3", amount: 1800, status: "Completed" },
  { id: uid(), client: "Neha Joshi", service: "Sereniva Signature Ritual", therapist: "Anjali Verma", time: "16:00", room: "Suite 1", amount: 4900, status: "Confirmed" },
  { id: uid(), client: "Vikram Shah", service: "Herbal Salt Scrub & Wrap", therapist: "Meher Singh", time: "17:30", room: "Suite 2", amount: 2600, status: "Cancelled" },
];

export const CUSTOMERS = [
  { id: "c1", name: "Priya Nair", phone: "+91 98111 22334", email: "priya@example.com", membership: "Gold", visits: 14, spend: 38400, lastVisit: "2026-09-02", favourite: "Himalayan Hot Stone Massage" },
  { id: "c2", name: "Karan Mehta", phone: "+91 98222 33445", email: "karan@example.com", membership: "Silver", visits: 6, spend: 13200, lastVisit: "2026-08-28", favourite: "Deep Tissue Release" },
  { id: "c3", name: "Simran Kaur", phone: "+91 98333 44556", email: "simran@example.com", membership: "Silver", visits: 9, spend: 21600, lastVisit: "2026-09-05", favourite: "Radiance Renewal Facial" },
  { id: "c4", name: "Arjun Rao", phone: "+91 98444 55667", email: "arjun@example.com", membership: "Bronze", visits: 3, spend: 5400, lastVisit: "2026-08-14", favourite: "Foot & Scalp Reflexology" },
];

export const REVENUE_WEEK = [32000, 41000, 28000, 47000, 52000, 61000, 39000];
export const BOOKINGS_WEEK = [12, 15, 9, 17, 19, 22, 14];
export const PEAK_HOURS = [4, 6, 9, 12, 8, 5, 14, 18, 16, 10];

export const SERVICE_SHARE = [
  { label: "Massage", value: 38, color: "#233529" },
  { label: "Facials", value: 24, color: "#B08D4F" },
  { label: "Body Wellness", value: 22, color: "#6E8567" },
  { label: "Signature", value: 16, color: "#8C7A63" },
];

export function fmtINR(n: number): string {
  return "₹" + n.toLocaleString("en-IN");
}
