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
  /** real screenshot (path under /public); falls back to the line art when missing */
  image?: string;
  /** all screenshots shown in the detail view; defaults to [image] */
  images?: string[];
  /** phone-shaped screenshots: shown contained instead of cropped/stretched */
  portrait?: boolean;
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
    name: "Telex Website & Portals",
    tag: "Web platform · Full-stack",
    description:
      "Telex's public website plus three portals (Admin, Client and VA) for recruiting, shortlisting and managing Virtual Assistants.",
    year: "2026",
    status: "Live",
    stack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "Framer Motion",
      "Recharts",
      "Node.js / Express",
      "MongoDB",
      "JWT + OTP login",
      "Cloudflare Turnstile",
      "Cloudinary",
      "Resend / nodemailer",
      "Gemini AI",
      "GoHighLevel",
      "Render",
    ],
    image: "/projects/telex-website.png",
    overview:
      "Telex's public website plus three portals: Admin, Client and VA. The site shows services, careers, blogs, case studies and funnels. The Admin portal manages applicants, appointments, content and analytics. In the Client portal, clients browse and shortlist Virtual Assistants (VAs). The VA portal covers assessments and messaging.",
    features: [
      {
        title: "Public website",
        text: "Services, careers, blogs, case studies and funnels that present Telex and bring in clients and applicants.",
      },
      {
        title: "Admin portal",
        text: "Manages applicants, appointments, content and analytics in one place.",
      },
      {
        title: "Client portal",
        text: "Clients browse and shortlist Virtual Assistants (VAs).",
      },
      {
        title: "VA portal",
        text: "Covers VA assessments and messaging.",
      },
      {
        title: "Secure access",
        text: "JWT with OTP login, plus Cloudflare Turnstile to keep bots out.",
      },
      {
        title: "Integrations",
        text: "Cloudinary for media, Resend/nodemailer for email, Gemini AI and GoHighLevel for automation and CRM. The backend runs on Render.",
      },
    ],
    purpose:
      "Gives Telex one platform where visitors learn about the company, clients find and shortlist VAs, VAs get assessed, and admins run the whole pipeline.",
    results: [],
    link: "https://www.telexph.com/",
  },
  {
    name: "Wanderwave PH",
    tag: "Travel · Web platform",
    description:
      "Website of Wanderwave Travel and Tours, an online travel agency with flight and hotel search, tours, visa services and online payment.",
    year: "2026",
    status: "Live",
    stack: [
      "React 19",
      "Vite",
      "Tailwind CSS 4",
      "Framer Motion",
      "Node.js / Express",
      "MongoDB Atlas",
      "JWT",
      "Cloudinary",
      "Resend / nodemailer",
      "Gemini AI",
      "Cloudflare Worker",
      "Render",
      "PayMongo",
      "Amadeus / Kiwi / SerpApi",
      "GoHighLevel",
    ],
    image: "/projects/wanderwave-website.png",
    overview:
      "Website of Wanderwave Travel and Tours, an online travel agency. It offers flight and hotel search, tours and packages, visa and document services, and online payment. Customers have a dashboard for bookings and inquiries. Admins have a dashboard for bookings, revenue, users and content.",
    features: [
      {
        title: "Flight & hotel search",
        text: "Flight results from Amadeus, Kiwi and SerpApi, alongside hotel search.",
      },
      {
        title: "Tours & packages",
        text: "Browsable tours and travel packages, plus visa and document services.",
      },
      {
        title: "Online payment",
        text: "Bookings are paid online through PayMongo.",
      },
      {
        title: "Customer dashboard",
        text: "Customers track their bookings and inquiries in one place.",
      },
      {
        title: "Admin dashboard",
        text: "Admins manage bookings, revenue, users and content.",
      },
      {
        title: "Secure hosting",
        text: "A Cloudflare Worker handles hosting and security (CSP nonce), with the API on Render and integrations with Cloudinary, Resend/nodemailer, Gemini AI and GoHighLevel.",
      },
    ],
    purpose:
      "Lets travelers search, book and pay for trips online, while giving the agency one place to run bookings, revenue, users and content.",
    results: [],
    link: "https://wanderwaveph.com/",
  },
  {
    name: "HaidoVille",
    tag: "Hospitality · Booking website",
    description:
      "Booking website for HaidoVille, a budget vacation rental in General Luna, Siargao, with room availability checking and online booking.",
    year: "2026",
    status: "Live",
    stack: ["GoHighLevel", "Node.js", "Express", "JavaScript"],
    image: "/projects/haidoville-website.png",
    overview:
      "A single-page website for HaidoVille, a solar-powered, Starlink-connected budget vacation rental in General Luna, Siargao. Guests can check room availability, compare rooms and rates, and book online, all in one place.",
    features: [
      {
        title: "Availability check",
        text: "A check-in/check-out form and a calendar that marks dates as available, partly booked or fully booked.",
      },
      {
        title: "Online booking flow",
        text: "A step-by-step booking: dates, room, guests, guest details, payment and confirmation, with up to five rooms per booking.",
      },
      {
        title: "Rooms & rates",
        text: "Bunk beds, Barkada, Couples and Family rooms with per-night pricing and per-guest rules.",
      },
      {
        title: "Payments",
        text: "Guests pay through GCash, Maya or bank transfer and submit a reference number for the booking.",
      },
      {
        title: "Group quotes & FAQs",
        text: "A group quote inquiry form plus FAQs covering check-in times, transfers and policies.",
      },
      {
        title: "Gallery & contact",
        text: "Room photos, a guest photo album, links to review platforms, a contact section and a bug report button.",
      },
    ],
    purpose:
      "Lets guests find, price and book a stay directly with the property instead of going through third-party platforms.",
    results: [],
    link: "https://haidoville.com/",
  },
  {
    name: "HostOps",
    tag: "Property management · Web app",
    description:
      "A property management system for short-term rental hosts, with bookings, revenue and booking sources in one dashboard.",
    year: "2026",
    status: "Live",
    stack: ["JavaScript", "React", "Vite", "Node.js", "Express", "MongoDB"],
    image: "/projects/hostops-website.png",
    overview:
      "A property management system for short-term rental hosts. Hosts can see their bookings, revenue, and which booking platforms their guests come from, all in one dashboard.",
    features: [
      {
        title: "Bookings overview",
        text: "All of a host's bookings in one dashboard instead of scattered across platforms.",
      },
      {
        title: "Revenue tracking",
        text: "Revenue at a glance, so hosts can see how their properties are performing.",
      },
      {
        title: "Booking sources",
        text: "Shows which platforms guests come from, such as Airbnb, VRBO, Booking.com and Agoda.",
      },
      {
        title: "Marketing site",
        text: "A landing page with login and a qualification call-to-action for new property owners.",
      },
    ],
    purpose:
      "Gives short-term rental hosts a single place to understand their bookings, income and where their guests come from.",
    results: [],
    link: "https://hostops.online/",
  },
  {
    name: "Telex International Landing Page",
    tag: "Marketing · Landing page",
    description:
      "A landing page promoting TELEX Global Solutions' offshore services to international clients, with direct call booking.",
    year: "2026",
    status: "Live",
    stack: ["GoHighLevel", "Node.js", "Express"],
    image: "/projects/telex-intl-landing.png",
    overview:
      "A landing page promoting TELEX Global Solutions' offshore services. It highlights key benefits, cost savings, pricing and testimonials, with direct call booking for international clients.",
    features: [
      {
        title: "Key benefits",
        text: "Clear messaging on managed customer support teams that work alongside AI.",
      },
      {
        title: "Cost savings & pricing",
        text: "Sections that explain the savings and pricing of offshore staffing.",
      },
      {
        title: "Testimonials",
        text: "Client feedback that builds trust with prospective customers.",
      },
      {
        title: "Direct call booking",
        text: "A \"Book a 15-minute call\" button throughout the page so international clients can book straight away.",
      },
    ],
    purpose:
      "Turns international visitors into booked discovery calls by presenting the offer, the savings and the proof in one page.",
    results: [],
    link: "https://intl.telexph.com/",
  },
  {
    name: "It's Jena Portfolio",
    tag: "Personal brand · Portfolio",
    description:
      "A personal portfolio website for It's Jena that showcases her work and services, with appointment booking and a Business Growth Diagnostic.",
    year: "2026",
    status: "Live",
    stack: ["GoHighLevel", "Node.js", "Express"],
    image: "/projects/itsjena-website.png",
    overview:
      "A personal portfolio website for \"It's Jena\" that showcases Jena's work and services. Visitors can book an appointment and take a Business Growth Diagnostic to check where their business stands.",
    features: [
      {
        title: "Work & services",
        text: "Home, About, Why Us and Services sections that present Jena's background and what she offers.",
      },
      {
        title: "Appointment booking",
        text: "A \"Book a Call\" button in the header so visitors can schedule an appointment right away.",
      },
      {
        title: "Business Growth Diagnostic",
        text: "An assessment that lets visitors check where their business currently stands.",
      },
    ],
    purpose:
      "Presents Jena's personal brand and turns visitors into booked appointments and assessed leads.",
    results: [],
    link: "https://itsjena.telexph.com/",
  },
  {
    name: "Telex Workspace",
    tag: "Internal tool · Desktop app",
    description:
      "An internal desktop app (Telex Launcher) where each Telex employee sees only the tools their department is allowed to use.",
    year: "2026",
    status: "Live",
    stack: [
      "Electron",
      "React",
      "TypeScript",
      "Vite",
      "Node.js / Express",
      "MongoDB Atlas",
      "Cloudinary",
      "Render",
      "Vitest / Playwright",
    ],
    image: "/projects/telex-launcher.png",
    overview:
      "An internal desktop app for Telex employees. After logging in, each person sees only the tools their department is allowed to use. These tools are called modules, and they are small web apps such as Absent Reporting, Purchase Request, Ticketing and Evaluation Form.",
    features: [
      {
        title: "Department-based access",
        text: "After login, each person sees only the modules their department may use. The backend alone decides who can open what.",
      },
      {
        title: "Modules",
        text: "Small web apps inside the launcher, such as Absent Reporting, Purchase Request, Ticketing and Evaluation Form.",
      },
      {
        title: "Versioned releases",
        text: "Admins publish and activate new module versions and app updates.",
      },
      {
        title: "Audit log",
        text: "Every important action is written to an audit log.",
      },
      {
        title: "Announcements & realtime",
        text: "Announcements, push notifications and realtime updates reach employees inside the app.",
      },
    ],
    scope: "Internal to Telex. There is no public link for this project.",
    purpose:
      "Gives every employee one place to open the company tools they need, while admins keep control over access, releases and accountability.",
    results: [],
    link: "#contact",
  },
  {
    name: "Lead Tracker",
    tag: "Internal tool · Desktop app",
    description:
      "A Windows desktop app from Telex PH to track leads, schedule and send them emails, and handle the replies in one place.",
    year: "2026",
    status: "Live",
    stack: [
      "Electron",
      "Node.js",
      "JavaScript",
      "HTML / CSS",
      "Tailwind CSS",
      "DaisyUI",
      "MongoDB",
      "GoHighLevel API",
    ],
    image: "/projects/lead-tracker.png",
    overview:
      "Lead Tracker is a Windows desktop app from Telex PH that lets the team track their leads (prospective clients) and schedule and send them emails, then handle the replies, all in one place.",
    features: [
      {
        title: "Workbooks",
        text: "Leads are organised into workbooks, with a recent and favorites view and a quick way back to where you left off.",
      },
      {
        title: "Lead tracking",
        text: "Keeps track of prospective clients and how many leads each workbook holds.",
      },
      {
        title: "Email scheduling",
        text: "Schedule follow-up emails ahead of time and see this month's schedule on the home screen.",
      },
      {
        title: "Replies & activity",
        text: "Sent emails and replies show up as activity, so the team can follow up without switching tools.",
      },
      {
        title: "GoHighLevel integration",
        text: "Connects to the GoHighLevel API.",
      },
    ],
    scope: "Internal to Telex. There is no public link for this project.",
    purpose:
      "Lets the sales team manage leads, outreach and replies from one desktop app instead of juggling spreadsheets and inboxes.",
    results: [],
    link: "#contact",
  },
  {
    name: "Texionix",
    tag: "Internal tool · Report portal",
    description:
      "A centralized reporting system for Telex's internal tools, tracking each report from first submission to resolution.",
    year: "2026",
    status: "Live",
    stack: [
      "React",
      "Node.js",
      "Express",
      "Socket.IO",
      "MongoDB",
      "Mongoose",
      "Microsoft Graph API",
    ],
    image: "/projects/texionix-portal.png",
    overview:
      "A centralized reporting system for Telex's internal tools. One place where users can submit a report and where the team can track it, from first submission to resolution. It is tied to email and SLA deadlines so nothing slips through.",
    features: [
      {
        title: "Report submission",
        text: "Users submit a report for any of Telex's internal tools from one portal.",
      },
      {
        title: "Tracking to resolution",
        text: "The team follows each report from first submission to resolution, with an admin dashboard for open issues.",
      },
      {
        title: "SLA deadlines",
        text: "Response deadlines are tied to each report so nothing slips through.",
      },
      {
        title: "Email integration",
        text: "Connected to Outlook through the Microsoft Graph API and tied to email.",
      },
      {
        title: "Real-time updates",
        text: "Socket.IO pushes status updates as soon as a report changes.",
      },
    ],
    scope: "Internal to Telex. There is no public link for this project.",
    purpose:
      "Replaces scattered messages and emails with one place to report, track and resolve issues across Telex's internal tools.",
    results: [],
    link: "#contact",
  },
  {
    name: "TxSpace",
    tag: "Internal tool · Mobile app",
    description:
      "A centralized messaging app for TelexPH's internal communication: chat, channels and calls in one place, tied to the Trackio schedule.",
    year: "2026",
    status: "Live",
    stack: [
      "Flutter",
      "Dart",
      "Provider",
      "Flutter Quill",
      "Firebase",
      "Node.js",
      "Cloud Functions",
      "Cloud Firestore",
      "Realtime Database",
      "Firebase Authentication",
      "Trackio API",
      "Cloudinary",
      "LiveKit",
      "WebRTC",
      "Gemini",
    ],
    image: "/projects/txspace-1.png",
    images: ["/projects/txspace-1.png", "/projects/txspace-2.png"],
    portrait: true,
    overview:
      "A centralized messaging app for TelexPH's internal communication. One place where teams can chat, post updates in channels, and call each other without switching tools. It is tied to the Trackio schedule, so the daily End of Day report is collected and summarized automatically and nothing slips through.",
    features: [
      {
        title: "Team chat",
        text: "Teams chat, react and reply in one app without missing a beat.",
      },
      {
        title: "Channels",
        text: "Teams post updates in channels, with rich-text formatting through Flutter Quill.",
      },
      {
        title: "Calls",
        text: "Teammates call each other from inside the app using LiveKit and WebRTC.",
      },
      {
        title: "End of Day reports",
        text: "Tied to the Trackio schedule, the daily End of Day report is collected and summarized automatically.",
      },
      {
        title: "Secure sign-in",
        text: "Firebase Authentication with email and password, plus Remember Me.",
      },
    ],
    scope: "Internal to Telex. There is no public link for this project.",
    purpose:
      "Keeps internal communication, calls and daily reporting in one app instead of scattered across separate tools.",
    results: [],
    link: "#contact",
  },
  {
    name: "Telex IT Inventory",
    tag: "Internal tool · Launcher module",
    description:
      "The IT department's equipment inventory, running as a module inside the Telex Launcher desktop app, with a separate inventory per company.",
    year: "2026",
    status: "Live",
    stack: [
      "React 18",
      "TypeScript",
      "Vite",
      "Tailwind CSS 4",
      "DaisyUI 5",
      "Node.js / Express",
      "Zod",
      "MongoDB Atlas",
      "Mongoose",
      "JWT + Argon2",
      "Electron host SDK",
      "Google Gemini",
      "Render",
    ],
    image: "/projects/it-inventory.png",
    overview:
      "The IT department's equipment inventory, running as a module inside the Telex Launcher desktop app. Each company, TELEX and CallNovoPH, has its own inventory. IT records incoming purchases, builds each computer station from inventory parts, and tracks items assigned or lent to employees.",
    features: [
      {
        title: "Separate inventories",
        text: "TELEX and CallNovoPH each have their own inventory.",
      },
      {
        title: "Purchases & stations",
        text: "IT records incoming purchases and builds each computer station from inventory parts.",
      },
      {
        title: "Assigned & borrowed items",
        text: "Tracks items assigned or lent to employees, with printable gate passes for offsite borrowings.",
      },
      {
        title: "Disposals & reports",
        text: "Handles disposals with gate passes, and exports PDF and Excel reports generated in the browser.",
      },
      {
        title: "Approval workflow",
        text: "Edits by IT staff wait for the IT Department Head's approval, with role-based access per department.",
      },
      {
        title: "Dashboard & analytics",
        text: "Shows inventory value, stock movements and low stock alerts at a glance.",
      },
      {
        title: "Watt AI assistant",
        text: "An assistant powered by Google Gemini that answers questions about the inventory.",
      },
    ],
    scope: "Internal to Telex. There is no public link for this project.",
    purpose:
      "Gives the IT department one accurate record of every device, who has it, and where it is, with approvals and gate passes keeping changes accountable.",
    results: [],
    link: "#contact",
  },
  {
    name: "Purchase Requisition Portal",
    tag: "Internal tool · Web & desktop app",
    description:
      "An approval workflow for company purchases, available as a web portal and inside the Telex Launcher.",
    year: "2026",
    status: "Live",
    stack: [
      "React 18",
      "TypeScript",
      "Vite",
      "Tailwind CSS 4",
      "DaisyUI 5",
      "Electron",
      "Node.js / Express",
      "Zod",
      "WebSocket",
      "Web Push",
      "MongoDB Atlas",
      "Mongoose",
      "JWT + Argon2",
      "Cloudflare Turnstile",
      "GoHighLevel",
      "Cloudinary",
      "Render",
    ],
    image: "/projects/purchase-requisition.png",
    overview:
      "An approval workflow for company purchases, available as a web portal and inside the Telex Launcher. A Department Head files a purchase request, the Executive Coordination Office reviews it, and the President approves it. Accounting then creates the purchase order, which is signed before funds are transferred and the items are confirmed on arrival.",
    features: [
      {
        title: "Approval chain",
        text: "Department Head files the request, the Executive Coordination Office reviews it, and the President approves it.",
      },
      {
        title: "Purchase orders",
        text: "Accounting creates the purchase order in the system, and the preparer, the Head of Accounting and the CEO each sign it with a saved signature.",
      },
      {
        title: "Funds & delivery",
        text: "HR & Admin handles fund transfers, and IT confirms the items when they arrive.",
      },
      {
        title: "Timeline & email",
        text: "Every step updates the request's timeline and sends an email to the next person through GoHighLevel automation.",
      },
      {
        title: "Live updates",
        text: "WebSocket updates and Web Push notifications keep everyone current without refreshing.",
      },
      {
        title: "Secure signatures & forms",
        text: "Saved signatures are encrypted with AES-256-GCM, and purchase request and purchase order forms are generated as PDFs.",
      },
      {
        title: "Secure sign-in",
        text: "JWT with Argon2 passwords, Cloudflare Turnstile on the web sign-in, and an emailed code for password changes.",
      },
    ],
    scope: "Internal to Telex. There is no public link for this project.",
    purpose:
      "Makes sure purchase requests are approved by the right people, in the right order, before any money moves.",
    results: [],
    link: "#contact",
  },
  {
    name: "TxHive",
    tag: "Internal tool · Email SLA platform",
    description:
      "Telex's internal email platform where every thread gets a response deadline (SLA) and a status, with Outlook integration and SLA monitoring.",
    year: "2026",
    status: "Live",
    stack: [
      "React 18",
      "Vite",
      "Tailwind CSS",
      "DaisyUI",
      "TanStack Query",
      "Zustand",
      "Recharts",
      "Node.js / Express",
      "Socket.IO",
      "node-cron",
      "MongoDB Atlas",
      "Microsoft Entra ID",
      "Microsoft Graph API",
      "Gmail API",
      "Trackio API",
      "Cloudinary",
      "Web Push",
    ],
    image: "/projects/txhive.png",
    overview:
      "Telex's internal email platform. Every email thread gets a response deadline (SLA) and a status: New, Open, Pending, On Hold, Solved or Closed. Teams monitor email performance, meet SLA targets and resolve requests efficiently from one centralized platform.",
    features: [
      {
        title: "SLA & status per thread",
        text: "Every thread has a deadline and a status: New, Open, Pending, On Hold, Solved or Closed.",
      },
      {
        title: "Internal inbox",
        text: "Handles mail between employees with live SLA countdowns, pinned threads, custom folders and reactions.",
      },
      {
        title: "External mail",
        text: "Connects each user's Outlook mailbox so outside mail can be read, sent and organized in the same app.",
      },
      {
        title: "SLA monitoring & breach reports",
        text: "Flags overdue replies so nothing slips past its deadline.",
      },
      {
        title: "Analytics & compliance",
        text: "Audit & Compliance charts and exports on the Analytics page.",
      },
      {
        title: "Admin & notifications",
        text: "Admins manage users and access, while real-time and push notifications keep everyone updated. Includes a dark mode.",
      },
      {
        title: "Secure sign-in & data",
        text: "JWT with OTP and device verification, Microsoft Entra ID, Cloudflare Turnstile, and field-level encryption in MongoDB.",
      },
    ],
    scope: "Internal to Telex. There is no public link for this project.",
    purpose:
      "Gives every email thread an owner, a deadline and a live status, so replies are never missed.",
    results: [],
    link: "#contact",
  },
];

export const projects: Project[] = real.map((p, i) => ({
  ...p,
  pattern: PATTERNS[i % PATTERNS.length],
}));

export const slug = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
