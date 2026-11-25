// Single source of truth for all site content.
// Lines marked [GUESS] were written by Claude during the redesign and should be checked by Rojin.

export type Link = { label: string; href: string; external?: boolean };

export type Quest = {
  title: string;
  org: string;
  place: string;
  dates: string;
  kind: "job" | "school";
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
  role: "Software Engineer",
  subrole: "Backend · Data · ML",
  location: "Vancouver, BC",
  timezone: "America/Vancouver",
  tagline:
    "I build backend systems, data pipelines and the occasional ML model, and I like them clean, fast and easy to reason about.",
  bio: [
    "I'm an early-career software engineer with a Computer Engineering degree from the University of Tehran and an MSc in Big Data from Simon Fraser University.",
    "I've written C++ middleware for ATMs, shipped AWS backends and CI/CD pipelines, and built streaming data systems with Kafka and Spark. I care about systems that hold up under load and products that feel good to use.",
  ],
  // [GUESS] "Class" / "Level" style labels are playful framing for the game theme.
  playerCard: {
    class: "Backend Engineer",
    level: "Lv. 26", // [GUESS] purely decorative, change or remove
    origin: "Tehran → Vancouver",
    status: "Open to new-grad & junior SWE roles", // [GUESS] confirm what you're looking for
  },
  stats: [
    { label: "Backend", value: 90 },
    { label: "Data / ML", value: 82 },
    { label: "Cloud", value: 78 },
    { label: "Frontend", value: 70 },
    { label: "Debugging", value: 95 },
  ], // [GUESS] stat values are decorative, not self-assessments you gave
  hobbies: [
    { icon: "📷", label: "Photography" },
    { icon: "🏺", label: "Pottery" },
    { icon: "🏠", label: "Life-sim games" },
    { icon: "🏎️", label: "F1 (Ferrari, sadly)" },
  ],
  achievements: [
    { title: "SFU Innovation Prize", detail: "2025 · BC Car Crash Predictor" },
    { title: "Rank #1, four years running", detail: "B.Eng Computer Engineering, University of Tehran" },
    { title: "~25% faster app", detail: "Caching + lazy loading at PavePal" },
    { title: "~15% lower latency", detail: "Multithreaded ATM sockets at PEBCO" },
  ],
  links: {
    email: "mailto:rlohrasbinejad@gmail.com",
    emailLabel: "rlohrasbinejad@gmail.com",
    linkedin: "https://www.linkedin.com/in/rojin-lohrasbinejad/",
    github: "https://github.com/rojinln",
    resume: "/resume.pdf",
  },
  nowBuilding: {
    title: "iOS fitness companion",
    detail: "Designing a SwiftUI app that unifies gym logs, nutrition, progress photos and Apple Watch data.",
    progress: 30, // [GUESS] carried over from old site's "design phase" checklist (2 of 7 done)
    checklist: [
      { label: "Problem statement & product direction", done: true },
      { label: "Core feature map", done: true },
      { label: "Architecture & data model", done: false },
      { label: "First SwiftUI prototype", done: false },
      { label: "User testing", done: false },
    ],
  },
  quests: [
    {
      title: "Software Engineer Co-op",
      org: "PavePal Electronics",
      place: "Vancouver, Canada",
      dates: "Apr 2025 – Aug 2025",
      kind: "job",
      loot: [
        "Built and maintained CI/CD pipelines for build, test and deploy",
        "Shipped backend services on AWS Lambda, EC2 and Cognito",
        "Cut latency on large datasets ~25% with caching and lazy loading",
        "Wrote unit tests and took part in code reviews",
      ],
    },
    {
      title: "MSc, Big Data",
      org: "Simon Fraser University",
      place: "Burnaby, Canada",
      dates: "Sep 2024 – Dec 2025",
      kind: "school",
      loot: ["Distributed & Cloud Systems, Machine Learning, NLP, Big Data Lab", "SFU Innovation Prize 2025"],
    },
    {
      title: "Software Developer",
      org: "PEBCO Electronics",
      place: "Tehran, Iran",
      dates: "Sep 2021 – Aug 2022",
      kind: "job",
      loot: [
        "C++ middleware connecting ATM client software to hardware devices",
        "Multithreaded ATM↔server sockets, ~15% lower latency at peak",
        "Tests and docs that led to ~23% cost savings",
      ],
    },
    {
      title: "Software Developer Intern",
      org: "PEBCO Electronics",
      place: "Tehran, Iran",
      dates: "Jun 2021 – Aug 2021",
      kind: "job",
      loot: ["Internal ATM testing & monitoring tools", "Better real-time error logging for faster debugging"],
    },
    {
      title: "B.Eng, Computer Engineering",
      org: "University of Tehran",
      place: "Kish, Iran",
      dates: "Sep 2020 – Jun 2024",
      kind: "school",
      loot: ["Ranked 1st in the program for four consecutive years"],
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
      stack: ["Kafka", "Spark", "PySpark ML", "Redis", "AWS", "Docker", "Tableau"],
      badge: "SFU Innovation Prize 2025",
      color: "pink",
      links: [],
    },
    {
      slot: "02",
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
      slot: "03",
      title: "Crypto Market Analysis",
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
      slot: "04",
      title: "This Portfolio",
      tag: "Frontend",
      blurb:
        "The site you're on: a Next.js build with a retro game-menu look, all content driven from one typed data file.",
      stats: [
        { label: "Theme", value: "Y2K" },
        { label: "Data", value: "1 file" },
      ],
      stack: ["Next.js", "React", "TypeScript", "Tailwind"],
      color: "mint",
      links: [{ label: "Source", href: "https://github.com/rojinln/Personal-Portfolio-Website", external: true }],
    },
  ] satisfies Project[],
  skills: [
    { title: "Languages", icon: "⌨", items: ["TypeScript", "JavaScript", "Python", "Java", "C++", "SQL"] },
    { title: "Web", icon: "◈", items: ["React", "Next.js", "Node.js", "REST APIs"] },
    { title: "Cloud & Infra", icon: "☁", items: ["AWS Lambda", "EC2", "S3", "CDK", "Cognito", "Docker", "Kubernetes", "CI/CD", "Linux"] },
    { title: "Data", icon: "▦", items: ["PostgreSQL", "MySQL", "Kafka", "Spark", "ClickHouse", "Redis"] },
    { title: "ML / AI", icon: "✦", items: ["PySpark ML", "RAG", "FAISS", "Hugging Face", "Model evaluation"] },
    { title: "Practices", icon: "♥", items: ["Unit testing", "Code review", "Agile", "Debugging", "Distributed systems"] },
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
