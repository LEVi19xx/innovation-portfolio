// Project content for the Projects section and its detail view.
// NOTE: everything here is sample / placeholder copy. Replace it with the real
// project details (and a real `link`) before sharing the portfolio.

export type Project = {
  name: string;
  tag: string;
  description: string;
  pattern: string;
  year: string;
  role?: string;
  team?: string;
  stack?: string[];
  overview: string;
  /** generic case-study copy; entries with before/after use those instead */
  challenge?: string;
  solution?: string;
  /** work-log style entries */
  status?: string;
  /** e.g. "September 23–24, 2026" */
  date?: string;
  estTime?: string;
  before?: string;
  after?: string;
  /** the individual pieces that were built, each with a short explanation */
  features?: { title: string; text: string }[];
  /** what was and wasn't covered by this piece of work */
  scope?: string;
  /** purpose / impact statement */
  purpose?: string;
  results: { value: string; label: string }[];
  /** live site / case study; "#contact" until there is a real one */
  link: string;
};

const PATTERNS = ["circles", "grid", "wave", "diagonal"];

const real: Omit<Project, "pattern">[] = [
  {
    name: "Payroll Dashboard Content",
    tag: "Payroll System · Dashboard",
    description:
      "Populated the payroll system's Dashboard with live, data-driven content: stats, activity, upcoming periods, and a payroll calendar.",
    year: "2026",
    status: "Completed",
    date: "September 23–24, 2026",
    estTime: "6 hours",
    overview:
      "Populated the payroll system's Dashboard with content and data: a welcome banner showing the current cutoff period and pending 201-file imports, a live date/time card, Quick Actions, stat cards, a Payroll Overview panel, a Recent Activity feed, an Upcoming Payroll Periods list, and a Payroll Calendar marking cutoff and pay dates.",
    before:
      "The Dashboard lacked real data-driven content. There was no visibility into headcount, active payroll periods and files, attendance, computed payroll cost, recent activity, or upcoming cutoffs at a glance.",
    after:
      "The Dashboard now surfaces a welcome banner, live date/time, Quick Actions, key stat cards, a Payroll Overview panel, a Recent Activity feed, an Upcoming Payroll Periods list, and a Payroll Calendar.",
    features: [
      {
        title: "Welcome banner",
        text: "Shows the current cutoff period and the number of pending 201-file imports, so admins know what needs attention the moment they log in.",
      },
      {
        title: "Live date / time card",
        text: "A real-time clock and date card so the current day is always visible against the payroll schedule.",
      },
      {
        title: "Quick Actions",
        text: "Shortcuts to the most common tasks, saving a trip through the menu.",
      },
      {
        title: "Stat cards",
        text: "Four headline numbers: Total Employees, Payroll Periods, Payroll Files, and Attendance.",
      },
      {
        title: "Payroll Overview panel",
        text: "A summary of the current payroll state, including the computed payroll cost.",
      },
      {
        title: "Recent Activity feed",
        text: "A running list of the latest changes in the system, so nothing happens unnoticed.",
      },
      {
        title: "Upcoming Payroll Periods",
        text: "A list of the next payroll periods and their cutoffs, so upcoming deadlines are never a surprise.",
      },
      {
        title: "Payroll Calendar",
        text: "A calendar that marks cutoff dates and pay dates at a glance.",
      },
    ],
    scope: "This covers the dashboard's data and layout only, not the final UI design.",
    purpose:
      "Gives administrators an at-a-glance view of the payroll system's current state on login, reducing the need to navigate to separate pages just to check headcount, upcoming cutoffs, or recent changes.",
    results: [
      { value: "6", label: "Hours (est.)" },
      { value: "8", label: "Dashboard sections" },
      { value: "4", label: "Stat cards" },
    ],
    link: "#contact",
  },
  {
    name: "Nova Banking",
    tag: "Fintech · Mobile app",
    description:
      "A full mobile banking experience redesigned from the ground up, cutting onboarding time by 60%.",
    year: "2025",
    role: "Design & engineering",
    team: "5 people",
    stack: ["React Native", "TypeScript", "Node.js", "PostgreSQL"],
    overview:
      "A full mobile banking experience redesigned from the ground up. We rebuilt the app around the few things customers do every day and removed everything that got in the way.",
    challenge:
      "Onboarding took too many steps and too many documents, and customers dropped out before their account was ever opened.",
    solution:
      "We mapped the real drop-off points, cut the flow to the essentials, and added progress saving so people can finish on their own time.",
    results: [
      { value: "60%", label: "Faster onboarding" },
      { value: "4.8", label: "Store rating" },
      { value: "120k", label: "Active users" },
    ],
    link: "#contact",
  },
  {
    name: "Terra CRM",
    tag: "Internal tools · Web app",
    description:
      "A custom CRM built for a 200-person sales team, replacing three disconnected spreadsheets.",
    year: "2025",
    role: "Product & engineering",
    team: "4 people",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    overview:
      "A custom CRM for a 200-person sales team. One place for accounts, activity, and follow-ups instead of three spreadsheets that never agreed with each other.",
    challenge:
      "Leads lived in separate spreadsheets, so nobody had the full picture and follow-ups were missed.",
    solution:
      "We consolidated the data, built the views each role actually uses, and added reminders and simple reporting on top.",
    results: [
      { value: "3→1", label: "Tools replaced" },
      { value: "200", label: "Daily users" },
      { value: "-35%", label: "Missed follow-ups" },
    ],
    link: "#contact",
  },
  {
    name: "Pulse Analytics",
    tag: "Data · Dashboard",
    description: "A real-time analytics dashboard processing millions of events a day.",
    year: "2024",
    role: "Data & engineering",
    team: "3 people",
    stack: ["React", "Node.js", "GraphQL", "PostgreSQL"],
    overview:
      "A real-time analytics dashboard that turns millions of daily events into numbers teams can act on while the day is still happening.",
    challenge:
      "Reports arrived a day late and were built by hand, so decisions were always made on old data.",
    solution:
      "We streamed events into a pipeline, pre-computed the common questions, and built a fast, filterable dashboard.",
    results: [
      { value: "1M+", label: "Events / day" },
      { value: "<2s", label: "Query time" },
      { value: "Live", label: "Data freshness" },
    ],
    link: "#contact",
  },
  {
    name: "Orbit Marketplace",
    tag: "E-commerce · Platform",
    description: "A two-sided marketplace connecting local makers with buyers nationwide.",
    year: "2024",
    role: "Design & engineering",
    team: "6 people",
    stack: ["Next.js", "TypeScript", "Node.js", "Stripe"],
    overview:
      "A two-sided marketplace that connects local makers with buyers across the country, with listings, payments, and fulfilment in one flow.",
    challenge:
      "Makers had no easy way to reach buyers outside their area, and buyers had no trusted place to find them.",
    solution:
      "We built storefronts for makers, a simple discovery and checkout experience for buyers, and the tooling to keep both sides in sync.",
    results: [
      { value: "2-sided", label: "Marketplace" },
      { value: "Nationwide", label: "Reach" },
      { value: "1 flow", label: "Listing to delivery" },
    ],
    link: "#contact",
  },
];

const placeholders: Omit<Project, "pattern">[] = Array.from({ length: 15 }, (_, i) => ({
  name: `Project ${String(i + real.length + 1).padStart(2, "0")}`,
  tag: "Category · Type",
  description: "Placeholder description for this project.",
  year: "2025",
  role: "Role",
  team: "Team size",
  stack: ["Technology", "Technology", "Technology"],
  overview:
    "Placeholder overview. Describe what this project is, who it is for, and why it matters in two or three sentences.",
  challenge: "Placeholder: what problem did this project set out to solve?",
  solution: "Placeholder: how did the team approach and solve it?",
  results: [
    { value: "00", label: "Metric" },
    { value: "00", label: "Metric" },
    { value: "00", label: "Metric" },
  ],
  link: "#contact",
}));

export const projects: Project[] = [...real, ...placeholders].map((p, i) => ({
  ...p,
  pattern: PATTERNS[i % PATTERNS.length],
}));

export const slug = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
