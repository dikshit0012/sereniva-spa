export type Category = "Massage" | "Facials" | "Body Wellness" | "Signature Experiences";

export interface Service {
  id: string;
  name: string;
  category: Category;
  duration: number;
  price: number;
  short: string;
  description: string;
  image: string;
}

export const CATEGORIES: (Category | "All")[] = [
  "All",
  "Massage",
  "Facials",
  "Body Wellness",
  "Signature Experiences",
];

export const SERVICES: Service[] = [
  {
    id: "himalayan-stone",
    name: "Himalayan Hot Stone Massage",
    category: "Massage",
    duration: 75,
    price: 2800,
    short: "Warm basalt stones ease deep tension along the spine and shoulders.",
    description:
      "Warm basalt stones, sourced from the foothills, are worked along the spine, shoulders and legs to release deep-seated tension. Finished with a light scalp massage.",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80",
  },
  {
    id: "deep-tissue",
    name: "Deep Tissue Release",
    category: "Massage",
    duration: 60,
    price: 2200,
    short: "Firm, targeted pressure for knotted muscles.",
    description:
      "A firm-pressure massage built for desks, long drives and heavy training weeks. Therapists work slowly through problem areas using elbow and forearm techniques.",
    image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1200&q=80",
  },
  {
    id: "radiance-facial",
    name: "Radiance Renewal Facial",
    category: "Facials",
    duration: 50,
    price: 2400,
    short: "Vitamin C brightening over a gentle enzyme peel.",
    description:
      "A brightening facial layered with a gentle enzyme peel, vitamin C serum and a cooling jade roller finish — built for city skin that needs its glow back.",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=80",
  },
  {
    id: "herbal-scrub",
    name: "Herbal Salt Scrub & Wrap",
    category: "Body Wellness",
    duration: 70,
    price: 2600,
    short: "Coarse mountain salt and warm mustard oil, then a herbal wrap.",
    description:
      "Coarse mountain salt is worked into the skin with warm mustard oil, then rinsed and finished with a cocooning herbal wrap to leave skin soft and calm.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80",
  },
  {
    id: "signature-ritual",
    name: "Sereniva Signature Ritual",
    category: "Signature Experiences",
    duration: 110,
    price: 4900,
    short: "Stone therapy, scalp work and a facial, in one private suite.",
    description:
      "Our longest, quietest treatment: hot stone therapy, an extended scalp massage and a full facial, sequenced together in a private suite with your own therapist throughout.",
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1200&q=80",
  },
  {
    id: "reflexology",
    name: "Foot & Scalp Reflexology",
    category: "Body Wellness",
    duration: 45,
    price: 1800,
    short: "Pressure-point work on feet and scalp, aimed at sleep and fatigue.",
    description:
      "Targeted pressure-point work across the feet and scalp, aimed squarely at better sleep and mental fatigue — a favourite for a quick reset mid-week.",
    image: "https://images.unsplash.com/photo-1519415510236-718bdfcd89c1?w=1200&q=80",
  },
];

export const THERAPISTS = [
  { id: "t1", name: "Anjali Verma", role: "Senior Massage Therapist", experience: 8, rating: 4.9 },
  { id: "t2", name: "Rohan Kapoor", role: "Deep Tissue Specialist", experience: 6, rating: 4.8 },
  { id: "t3", name: "Meher Singh", role: "Facial & Skin Specialist", experience: 5, rating: 4.9 },
];

export const THERAPIST_NAMES = [...THERAPISTS.map((t) => t.name), "No preference"];
export const TIME_SLOTS = ["09:30", "11:00", "13:00", "14:30", "16:00", "17:30", "19:00"];

export function fmtINR(n: number): string {
  return "₹" + n.toLocaleString("en-IN");
}
