export const SITE = {
  name: "Damian Dev Studio",
  role: "Independent web developer",
  email: "dziminski79@gmail.com",
  github: "https://github.com/dziminski79-sudo",
} as const;

export const services = [
  {
    title: "Business websites",
    text: "Fast, responsive sites built around one goal: turning visitors into quote requests and bookings.",
  },
  {
    title: "Booking systems",
    text: "Customers pick a service and a time from real availability. No double bookings, no phone tag.",
  },
  {
    title: "Client portals and dashboards",
    text: "A secure login area where each client sees only their own projects, invoices, and files.",
  },
  {
    title: "Workflow automation",
    text: "Form submissions, emails, and spreadsheets connected so leads are saved and the right person is notified instantly.",
  },
  {
    title: "AI assistants",
    text: "A chat assistant that answers customer questions using only your own prices, hours, and policies.",
  },
] as const;

export type Project = {
  slug: string;
  title: string;
  kind: string;
  image: string | null;
  problem: string;
  solution: string;
  highlights: string[];
  stack: string[];
  live?: string;
  code: string;
};

export const projects: Project[] = [
  {
    slug: "clearspace",
    title: "ClearSpace Cleaning",
    kind: "Business website",
    image: "/projects/clearspace.png",
    problem: "Local service companies often have a site that looks fine but gives visitors no clear next step.",
    solution:
      "A clean one-page site with services, pricing, and a quote request form placed where visitors are ready to act.",
    highlights: ["Fully responsive, mobile menu included", "Services, pricing, and trust sections", "Quote request form"],
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    live: "https://clearspace-cleaning-website.vercel.app",
    code: "https://github.com/dziminski79-sudo/clearspace-cleaning-website",
  },
  {
    slug: "fadeco",
    title: "Fade & Co. Booking",
    kind: "Booking system",
    image: "/projects/fadeco.png",
    problem: "Barbershops lose customers to missed calls and walk-in guesswork.",
    solution:
      "Customers choose a service, barber, and time from live availability. The owner manages everything in a private dashboard.",
    highlights: [
      "Double bookings are blocked by the database itself, not just the UI",
      "Passwordless magic-link admin login",
      "Time zone aware availability",
    ],
    stack: ["Next.js", "Supabase (Postgres)", "Zod", "Vercel"],
    live: "https://fadeco-booking.vercel.app",
    code: "https://github.com/dziminski79-sudo/fadeco-booking",
  },
  {
    slug: "meridian",
    title: "Meridian Client Portal",
    kind: "Client portal",
    image: "/projects/meridian.png",
    problem: "Agencies and clinics juggle project status, invoices, and files across email threads.",
    solution:
      "Each client signs in and sees only their own projects, invoices, documents, and updates. An admin panel manages it all.",
    highlights: [
      "Data isolation enforced by Postgres Row Level Security",
      "Private document storage with signed download links",
      "Public read-only demo, no login needed",
    ],
    stack: ["Next.js", "Supabase (Auth, Postgres, Storage)", "Row Level Security"],
    live: "https://meridian-portal-eta.vercel.app/demo",
    code: "https://github.com/dziminski79-sudo/meridian-portal",
  },
  {
    slug: "automation",
    title: "Lead Intake Automation",
    kind: "Workflow automation",
    image: null,
    problem: "Form submissions sit unread in an inbox, and slow follow-up costs customers.",
    solution:
      "One workflow validates each submission, saves the lead to a database, emails the owner immediately, and confirms back to the form.",
    highlights: [
      "Webhook, validation, database write, and email in one flow",
      "Tested end to end with a real request",
      "Exported workflow file included in the repo",
    ],
    stack: ["n8n", "Postgres (Supabase)", "SMTP"],
    code: "https://github.com/dziminski79-sudo/clearspace-lead-automation",
  },
  {
    slug: "assistant",
    title: "ClearSpace AI Assistant",
    kind: "AI assistant",
    image: "/projects/assistant.png",
    problem: "Customers have questions at 11pm, and a contact form cannot answer them.",
    solution:
      "A chat widget that answers from the business's own services, prices, hours, and policies, and politely declines everything else.",
    highlights: [
      "Will not invent prices or promise appointment times",
      "Resists attempts to make it go off topic",
      "One component and one API route, drops into any site",
    ],
    stack: ["Next.js", "Google Gemini API", "TypeScript"],
    live: "https://clearspace-ai-assistant.vercel.app",
    code: "https://github.com/dziminski79-sudo/clearspace-ai-assistant",
  },
];

export const stack = [
  { name: "Next.js and TypeScript", why: "Fast sites and apps with fewer bugs" },
  { name: "Tailwind CSS", why: "Clean, consistent, responsive design" },
  { name: "Supabase and Postgres", why: "Real database, login, and file storage" },
  { name: "Vercel", why: "Reliable hosting with instant deploys" },
  { name: "n8n", why: "Automations you own and can self-host" },
  { name: "Gemini API", why: "AI features grounded in your data" },
];

export const process = [
  { title: "Short call", text: "You describe the problem. I ask questions until the goal is clear." },
  { title: "Written scope", text: "A simple document with what will be built, what will not, and the price." },
  { title: "Build with demos", text: "You see a working version early and often, not only at the end." },
  { title: "Launch and handover", text: "Deployed on accounts you own, with notes so you are never locked in." },
];

export const faq = [
  {
    q: "Are these real client projects?",
    a: "No. Every project above is a concept build I made to show what I can do. They are fully working, but the businesses are fictional. I would rather be upfront about that than dress it up.",
  },
  {
    q: "How does pricing work?",
    a: "Fixed price per project, agreed in writing after a short scoping call. I do not publish rates because scope varies a lot between a landing page and a booking system.",
  },
  {
    q: "How long does a project take?",
    a: "It depends on scope. I work on projects part time, so I take a small number at once and give a realistic timeline in the written scope instead of a promise up front.",
  },
  {
    q: "Who owns the code and the accounts?",
    a: "You do. I deploy to hosting and database accounts in your name and hand over the code and notes when the project is done.",
  },
  {
    q: "Do you offer support after launch?",
    a: "Yes, small fixes and improvements can be arranged after launch. We agree on that before the project starts.",
  },
  {
    q: "What languages and time zones do you work in?",
    a: "English, mostly by email so it fits any time zone. Video calls by arrangement.",
  },
];
