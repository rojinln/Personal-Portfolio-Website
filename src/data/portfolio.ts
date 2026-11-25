// Single source of truth for all site content.
// Lines marked [GUESS] were written by Claude during the redesign and should be checked by Rojin.

export type Link = { label: string; href: string; external?: boolean };

export type Quest = {
  title: string;
  org: string;
  place: string;
  dates: string;
  kind: "job" | "school";
  tier: "main" | "side";
  loot: string[];
};

export type Project = {
  slot: string;
  title: string;
  tag: string;
  blurb: string;
  stats: { label: string; value: string }[];
  stack: string[];
  badge?: string;
  color: "pink" | "lilac" | "mint" | "gold";
  links: Link[];
};

export type SkillGroup = { title: string; icon: string; items: string[] };

export const portfolio = {
  name: "Rojin Lohrasbinejad",
  handle: "rojin",
  role: "Software Developer",
  subrole: "Backend · Cloud · Data",
  location: "Vancouver, BC",
  timezone: "America/Vancouver",
  tagline:
    "I build and debug production backends, REST APIs and real-time data systems, and I like them reliable, fast and easy to reason about.",
  bio: [
    "I'm a software developer with a B.Sc. in Computer Engineering from the University of Tehran and an M.Sc. in Big Data from Simon Fraser University. Right now I'm a Client Engineer at Glia, keeping enterprise AI deployments healthy.",
    "My path runs from C++ ATM software to AWS cloud services to real-time data platforms with Kafka and Spark. I care about systems that hold up under load, root causes over quick patches, and products that feel good to use.",
  ],
  playerCard: {
    class: "Client Engineer @ Glia",
    level: "Lv. 3", 
    origin: "Tehran → Vancouver",
    status: "Client Engineer at Glia, debugging APIs and cloud integrations for an enterprise AI platform",
  },
  stats: [
    { label: "Backend", value: 90 },
    { label: "Debugging", value: 96 },
    { label: "Cloud", value: 80 },
    { label: "Data", value: 84 },
    { label: "Frontend", value: 72 },
  ],
  hobbies: [
    { icon: "📷", label: "Photography" },
    { icon: "🎸", label: "Fromer Guitar Player" },
    { icon: "🏠", label: "Sims games" },
    { icon: "🏎️", label: "F1 (Ferrari, sadly)" },
  ],
  achievements: [
    { title: "SFU Innovation Prize", detail: "2025 · BC Car Crash Predictor" },
    { title: "Rank #1, four years running", detail: "B.Eng Computer Engineering, University of Tehran" },
    { title: "~25% snappier maps", detail: "Geospatial rendering at PavePal" },
    { title: "Shipped Bloom", detail: "Full-stack fitness & nutrition tracker" },
  ],
  links: {
    email: "mailto:rlohrasbinejad@gmail.com",
    emailLabel: "rlohrasbinejad@gmail.com",
    linkedin: "https://www.linkedin.com/in/rojin-lohrasbinejad/",
    github: "https://github.com/rojinln",
    resume: "/resume.pdf",
  },
  nowBuilding: {
    title: "Bloom fitness tracker",
    detail:
      "My full-stack workout, cardio and nutrition tracker. The MVP is built and working; now I'm hardening it for a real deploy.",
    progress: 80, 
    checklist: [
      { label: "Auth, database & typed API", done: true },
      { label: "Workout, cardio & meal logging", done: true },
      { label: "Progress dashboard & suggestions", done: true },
      { label: "Move to Postgres & deploy publicly", done: false }, 
    ],
  },
  quests: [
    {
      title: "Client Engineer",
      org: "Glia",
      place: "Vancouver, BC",
      dates: "Aug 2026 – Present",
      kind: "job",
      tier: "main",
      loot: [
        "Debug REST APIs, backend services and cloud integrations for an enterprise AI platform with SQL, logs and network analysis",
        "Technical point of contact for production issues, keeping enterprise deployments unblocked",
        "Partner with Product and Engineering through JIRA to reproduce defects and set priorities",
      ],
    },
    {
      title: "M.Sc., Big Data",
      org: "Simon Fraser University",
      place: "Burnaby, BC",
      dates: "Sep 2024 – Dec 2025",
      kind: "school",
      tier: "main",
      loot: [
        "Big Data Lab 1 & 2, Machine Learning, NLP, Distributed & Cloud Systems",
        "SFU Innovation Prize 2025 for the BC Car Crash Predictor",
      ],
    },
    {
      title: "B.Sc., Computer Engineering",
      org: "University of Tehran",
      place: "Tehran, Iran",
      dates: "Graduated Jun 2024",
      kind: "school",
      tier: "main",
      loot: ["Ranked first in my graduating cohort for four consecutive years"],
    },
    {
      title: "Software Engineer, Co-op",
      org: "PavePal",
      place: "Vancouver, BC",
      dates: "Apr 2025 – Aug 2025",
      kind: "job",
      tier: "side",
      loot: [
        "Built features on the full-stack team modernizing a global geospatial platform for municipal clients",
        "Sped up map rendering and interaction latency by ~25%",
        "Engineered AWS region-scoped auth for secure multi-tenant deployments",
      ],
    },
    {
      title: "Software Developer",
      org: "PEBCO Electronics",
      place: "Tehran, Iran",
      dates: "Sep 2021 – Aug 2022",
      kind: "job",
      tier: "side",
      loot: [
        "Built and maintained C++ ATM software for transaction processing and banking-cluster communication",
        "Integrated transaction workflows between ATM terminals and banking services",
        "Used SQL to investigate records, reconcile discrepancies and fix processing failures",
      ],
    },
    {
      title: "Software Developer, Intern",
      org: "PEBCO Electronics",
      place: "Tehran, Iran",
      dates: "Jun 2021 – Aug 2021",
      kind: "job",
      tier: "side",
      loot: ["Built ATM testing, monitoring and real-time error-logging tools that sped up debugging"],
    },
  ] satisfies Quest[],
  projects: [
    {
      slot: "01",
      title: "BC Car Crash Predictor",
      tag: "Streaming ML",
      blurb:
        "A near real-time crash-risk system for British Columbia that joins historical crash records with live traffic and weather streams to flag high-risk zones.",
      stats: [
        { label: "Accuracy", value: "86%" },
        { label: "Sources", value: "4" },
      ],
      stack: ["Kafka", "Spark", "PySpark MLlib", "Redis", "Tableau"],
      badge: "SFU Innovation Prize 2025",
      color: "pink",
      links: [],
    },
    {
      slot: "02",
      title: "Bloom · Fitness Tracker",
      tag: "Full-stack",
      blurb:
        "A mobile-first tracker for workouts with per-set progressive overload, cardio, meals with photos and body-weight goals, plus a day/week/month dashboard and rule-based suggestions. Installs to an iPhone home screen.",
      stats: [
        { label: "Status", value: "MVP built" },
        { label: "Logic", value: "Unit-tested" },
      ],
      stack: ["Next.js", "TypeScript", "Prisma", "Zod", "JWT auth", "Tailwind"],
      badge: "New",
      color: "mint",
      links: [{ label: "Source", href: "https://github.com/rojinln/Fitness-Tracker", external: true }],
    },
    {
      slot: "03",
      title: "Trivia QA over Literature",
      tag: "NLP · RAG",
      blurb:
        "An offline evaluation pipeline comparing long-context prompting with RAG for needle-in-a-haystack questions over a full novel, measured by needle depth.",
      stats: [
        { label: "RAG acc.", value: "63%" },
        { label: "Long-ctx", value: "50%" },
      ],
      stack: ["Python", "BM25", "BGE-M3", "FAISS", "Reranker", "Phi-3-mini"],
      color: "lilac",
      links: [],
    },
    {
      slot: "04",
      title: "Crypto Market Analytics",
      tag: "Big Data",
      blurb:
        "Streams live Coinbase candles through an ETL pipeline into ClickHouse and Spark, with trend analysis (Hurst on TWAP/VWAP) and volume-spike anomaly detection in Grafana.",
      stats: [
        { label: "Feed", value: "Live" },
        { label: "Dash", value: "Grafana" },
      ],
      stack: ["Python", "WebSockets", "ClickHouse", "Spark", "Grafana"],
      color: "gold",
      links: [],
    },
    {
      slot: "05",
      title: "This Portfolio",
      tag: "Frontend",
      blurb:
        "The site you're on: a Next.js build with a retro game-menu look, all content driven from one typed data file.",
      stats: [
        { label: "Theme", value: "Y2K" },
        { label: "Data", value: "1 file" },
      ],
      stack: ["Next.js", "React", "TypeScript", "Tailwind"],
      color: "pink",
      links: [{ label: "Source", href: "https://github.com/rojinln/Personal-Portfolio-Website", external: true }],
    },
  ] satisfies Project[],
  skills: [
    { title: "Languages", icon: "⌨", items: ["Python", "C++", "TypeScript", "JavaScript", "SQL"] },
    { title: "Backend", icon: "◈", items: ["REST APIs", "FastAPI", "Node.js", "PostgreSQL", "Redis", "API integration"] },
    { title: "Cloud & DevOps", icon: "☁", items: ["AWS Lambda", "Cognito", "S3", "CloudWatch", "AppConfig", "CDK", "Docker", "CI/CD", "Git"] },
    { title: "Data", icon: "▦", items: ["Kafka", "Spark", "ClickHouse", "pandas", "NumPy", "Grafana"] },
    { title: "ML / AI", icon: "✦", items: ["scikit-learn", "PySpark MLlib", "RAG", "FAISS", "Hugging Face"] },
    { title: "Frontend & Tools", icon: "♥", items: ["React", "Next.js", "Tailwind", "Postman", "JIRA"] },
  ] satisfies SkillGroup[],
  partyTraits: [
    { id: "ships", label: "Ships working software", line: "ships things that actually work" },
    { id: "learns", label: "Learns fast", line: "picks up new stacks quickly" },
    { id: "debugs", label: "Calm under pressure", line: "debugs calmly when prod is on fire" },
    { id: "talks", label: "Communicates clearly", line: "explains trade-offs in plain words" },
    { id: "systems", label: "Thinks in systems", line: "designs for scale from day one" },
  ],
};

export type Portfolio = typeof portfolio;
