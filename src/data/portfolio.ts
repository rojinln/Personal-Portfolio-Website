export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type HeroAction = {
  label: string;
  href: string;
  external?: boolean;
  variant?: "primary" | "secondary";
  hidden?: boolean;
};

export type AboutCard = {
  key: "engineering" | "data" | "research";
  title: string;
  description: string;
};

export type SkillCategory = {
  title: string;
  items: string[];
};

export type ProjectLink = {
  label: "GitHub" | "Demo" | "Case Study";
  href: string;
};

export type Project = {
  title: string;
  description: string;
  stack: string[];
  problemSolved: string;
  learned: string;
  links: ProjectLink[];
};

export type CurrentWork = {
  title: string;
  status: string;
  goal: string;
  stack: string[];
  nextSteps: string[];
  checklist: { label: string; done: boolean }[];
};

export type Repository = {
  category: string;
  title: string;
  description: string;
  href: string;
};

export type HireTrait = {
  id: string;
  label: string;
};

export type TimelineEntry = {
  title: string;
  location: string;
  dateRange: string;
  track: "Experience" | "Project" | "Research" | "Education" | "Coursework";
  summary: string;
};

export const portfolioData = {
  name: "Rojin Lohrasbinejad",
  title: "Software Engineer | Data & ML", 
  bio: "I'm a software engineer with a background in data, machine learning, and full-stack development. I enjoy building thoughtful products that turn complex ideas into practical, user-friendly tools. I care about clean systems, meaningful user experiences, and solving problems from both a technical and business perspective.",
  shortBio:
    "I am a multidisciplinary builder focused on dependable engineering, practical machine learning, and clear product thinking.",
  personalNote:
    "Outside of work, I love photography, pottery, playing The Sims 4, and cheering for Ferrari in F1 — which has taught me patience, loyalty, and emotional resilience.",
  location: "Vancouver, Canada", 
  links: {
    email: "mailto:rlohrasbinejad@gmail.com",
    linkedin: "https://www.linkedin.com/in/rojin-lohrasbinejad/",
    github: "https://github.com/rojinln",
    resume: "https://www.linkedin.com/in/rojin-lohrasbinejad/",
  },
  navLinks: [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Current Work", href: "#current-work" },
    { label: "Work With Me", href: "#hire-simulator" },
    { label: "Contact", href: "#contact" },
  ] satisfies NavLink[],
  heroActions: [
    { label: "View Projects", href: "#projects", variant: "primary" },
    { label: "View GitHub", href: "https://github.com/rojinln", external: true, variant: "secondary" },
    {
      label: "Download Resume",
      href: "#", // TODO: replace with PDF resume URL when ready
      external: true,
      variant: "secondary",
      hidden: true,
    },
    { label: "Contact Me", href: "#contact", variant: "secondary" },
  ] satisfies HeroAction[],
  aboutCards: [
    {
      key: "engineering",
      title: "Software Engineering",
      description:
        "Designing resilient full-stack systems with clean architecture, testing discipline, and product-aware implementation.",
    },
    {
      key: "data",
      title: "Data / Machine Learning",
      description:
        "Shipping practical analytics and ML workflows that support decision-making, automation, and measurable outcomes.",
    },
    {
      key: "research",
      title: "Research & Systems Thinking",
      description:
        "Breaking complex problems into clear models, trade-offs, and execution plans that teams can act on confidently.",
    },
  ] satisfies AboutCard[],
  skills: [
    {
      title: "Core Engineering",
      items: ["TypeScript", "Node.js", "API Design", "System Design", "Testing"],
    },
    {
      title: "Data & ML",
      items: ["Python", "Pandas", "Apache Spark", "Feature Engineering", "Model Evaluation", "MLOps Basics"],
    },
    {
      title: "Cloud & Tools",
      items: ["AWS", "Docker", "PostgreSQL", "ClickHouse", "GitHub Actions", "Observability"],
    },
    {
      title: "Data Engineering",
      items: ["SQL", "Apache Kafka", "ETL Pipelines", "Redis", "ClickHouse", "Spark Streaming"],
    },
    {
      title: "Frontend & UI",
      items: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Accessible UI"],
    },
  ] satisfies SkillCategory[],
  skillNote: "I prefer showing practical work over long skill lists.",
  projects: [
    {
      title: "Personal Portfolio Website",
      description:
        "Designed and built a fully custom portfolio site from scratch featuring a 3D avatar, animated UI, interactive sections, and a clean data-driven architecture — all optimized for performance and accessibility.",
      stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"],
      problemSolved:
        "Needed a portfolio that reflected both technical depth and design sensibility — moving beyond template sites to a fully custom build with a clear content model, smooth animations, and a polished user experience.",
      learned:
        "Combining Three.js with React Server Components requires careful client boundary management; keeping content in a single typed data file made iteration fast and kept the UI/data concerns cleanly separated.",
      links: [
        { label: "GitHub", href: "https://github.com/rojinln/Personal-Portfolio-Website" },
      ] as ProjectLink[],
    },
    {
      // [PROJECT_1_BIG_DATA_LAB] Replace/refine details as needed.
      title: "Cryptocurrency Financial Analysis",
      description:
        "Built an end-to-end big data workflow that streamed live Coinbase candle data, processed it through an ETL pipeline, and delivered analytical insights through ClickHouse, Spark, and Grafana.",
      stack: ["Python", "Coinbase WebSocket API", "Pandas", "ClickHouse", "Apache Spark", "Grafana"],
      problemSolved:
        "Created a scalable workflow for near real-time crypto market monitoring, including trend analysis (Hurst on TWAP/VWAP) and anomaly detection (MAD-based volume spikes) to support faster decision-making.",
      learned:
        "Balancing real-time fidelity with system complexity is critical; practical architecture decisions and cross-team alignment matter as much as algorithm choice.",
      
      // [PRIVACY_NOTE] No public links for this project right now (GitHub/demo/case-study intentionally hidden).
      links: [] as ProjectLink[],
    },
    {
      // [PROJECT_2_BIG_DATA_LAB] Replace/refine details as needed.
      title: "British Columbia Car Crash Predictor",
      description:
        "Designed and built a near real-time crash-risk prediction system for British Columbia by combining historical crash records with live traffic and weather streams.",
      stack: [
        "Python",
        "Apache Spark",
        "PySpark ML",
        "Apache Kafka",
        "Redis",
        "Docker Compose",
        "Tableau",
      ],
      problemSolved:
        "Integrated multi-source ETL (TAS, ICBC, TomTom, OpenWeather) with streaming inference to identify high-risk zones quickly, supporting safer planning and response workflows.",
      learned:
        "Strong production-style ML requires equal attention to feature engineering, data contracts, and low-latency serving. This project was recognized with the SFU Innovation Prize (2025).",
      // [PRIVACY_NOTE] SFU/internal repository and dashboards are private. Public links intentionally hidden.
      links: [] as ProjectLink[],
    },
    {
      // [PROJECT_3_NLP_SFU] Replace/refine details as needed.
      title: "Needle-in-a-Haystack Trivia QA over Literature",
      description:
        "Built an offline QA evaluation pipeline over full-length novels (The Great Gatsby) to compare long-context prompting against RAG for needle-in-a-haystack trivia retrieval.",
      stack: [
        "Python 3.11",
        "BM25 (Whoosh)",
        "BGE-M3",
        "FAISS",
        "BGE-reranker-base",
        "Phi-3-mini",
        "Hugging Face",
      ],
      problemSolved:
        "Created a controlled framework to measure QA accuracy by needle depth (context rot), while benchmarking retrieval quality (Recall@k, MRR) and end-to-end answer quality (binary-judge accuracy, F1).",
      learned:
        "RAG outperformed long-context in this setup (63.3% vs 50.0% accuracy) and was more robust on deep-context facts, showing how retrieval design can mitigate context-rot effects in book-length QA.",
      // [PRIVACY_NOTE] SFU/NLP lab work may be private. No public GitHub/demo/case-study links.
      links: [] as ProjectLink[],
    },
  ] satisfies Project[],
  currentWork: {
    // [CURRENT_WORK_FITNESS_APP] Design-phase concept. Update as architecture decisions become final.
    title: "iOS Fitness Tracking Companion (Design Phase)",
    status:
      "Currently in product/system design. Defining user flows, feature scope, and technical architecture before implementation.",
    goal: "Design and build an iPhone app that unifies gym logging, nutrition tracking, progress monitoring, and wearable data into one practical fitness workflow.",
    stack: [
      "Swift / SwiftUI (planned)",
      "HealthKit + Apple Watch integration (planned)",
      "Local persistence + cloud sync (TBD)",
      "LLM API for food parsing from text/images (optional)",
    ],
    nextSteps: [
      "Finalize MVP boundaries: gym sets/reps/weight, cardio logs, and progress photos",
      "Design calorie intake flow: search, manual text entry, and future image-assisted logging",
      "Define Apple Health/Watch data strategy, privacy model, and synchronization rules",
    ],
    checklist: [
      { label: "Problem statement and product direction documented", done: true },
      { label: "Core feature map drafted (workouts, calories, photos, cardio)", done: true },
      { label: "System architecture and data model finalized", done: false },
      { label: "Initial iOS prototype implementation started", done: false },
      { label: "Testing and feedback loop established", done: false },
      { label: "Deployment automation and quality gates", done: false },
      { label: "User testing and feedback loop established", done: false },
    ],
  } satisfies CurrentWork,
  repositories: [
    {
      category: "Portfolio Website",
      title: "portfolio-site",
      description: "Personal portfolio source with case studies, polished UI, and fast performance.",
      href: "[Repository URL]",
    },
    {
      category: "Software Engineering Project",
      title: "service-automation-platform",
      description: "Production-oriented backend project with robust API workflows and monitoring.",
      href: "[Repository URL]",
    },
    {
      category: "Machine Learning / Big Data Project",
      title: "predictive-analytics-pipeline",
      description: "Data engineering plus model experimentation pipeline for business forecasting.",
      href: "[Repository URL]",
    },
    {
      category: "Ongoing Project",
      title: "ios-fitness-tracking-companion",
      description:
        "Designing an iPhone-first fitness system covering workout logging, nutrition tracking, progress photos, cardio, and Apple Watch data.",
      href: "[Repository URL]",
    },
    {
      category: "Academic / Research Project",
      title: "research-systems-lab",
      description: "Technical research repository with reproducible experiments and implementation notes.",
      href: "[Repository URL]",
    },
  ] satisfies Repository[],
  hireTraits: [
    { id: "ships", label: "Ships working software" },
    { id: "learns", label: "Learns fast" },
    { id: "debugs", label: "Debugs under pressure" },
    { id: "communicates", label: "Communicates clearly" },
    { id: "systems", label: "Thinks in systems" },
  ] satisfies HireTrait[],
  timelineEntries: [
    {
      title: "Software Engineer Co-op",
      location: "PavePal Electronics, Vancouver, Canada",
      dateRange: "Apr 2025 - Aug 2025",
      track: "Experience",
      summary:
        "Built CI/CD pipelines, deployed backend cloud services on AWS (Lambda, EC2, Cognito), and improved application performance by ~25% through caching and lazy loading.",
    },
    {
      title: "Software Developer",
      location: "PEBCO Electronics, Tehran, Iran",
      dateRange: "Sep 2021 - Aug 2022",
      track: "Experience",
      summary:
        "Developed C++ ATM middleware and multithreaded socket communication to improve transaction reliability and reduce end-to-end latency by ~15% under peak load.",
    },
    {
      title: "Software Developer Intern",
      location: "PEBCO Electronic, Tehran, Iran",
      dateRange: "Jun 2021 - Aug 2021",
      track: "Experience",
      summary:
        "Built internal ATM testing and monitoring tools and improved real-time error logging, increasing failure visibility and speeding up debugging workflows.",
    },
    {
      title: "Master of Science in Big Data",
      location: "Simon Fraser University, Burnaby, Canada",
      dateRange: "Sep 2024 - Dec 2025",
      track: "Education",
      summary:
        "Relevant coursework: Distributed and Cloud Systems, Machine Learning, Natural Language Processing, and Big Data Lab.",
    },
    {
      title: "Bachelor of Computer Engineering",
      location: "University of Tehran, Kish, Iran",
      dateRange: "Sep 2020 - Jun 2024",
      track: "Education",
      summary:
        "Relevant coursework: Data Structures, Object-Oriented Programming, Computer Networks, Operating Systems, and Databases. Ranked 1st in the program for four consecutive years.",
    },
  ] satisfies TimelineEntry[],
};
