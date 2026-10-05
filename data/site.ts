import homepage from "./homepage.json";

export type Status = "production" | "poc" | "internal" | "experiment";

export const site = {
  url: "https://www.sawabpsiddiq.com",
  name: "Sawab P Siddiq",
  displayName: "Sawab P Siddiq",
  role: "Applied AI Engineer",
  positioning:
    "Applied AI Engineer in Dubai translating business problems into AI agents, RAG applications, workflow automation, and enterprise integrations, from discovery through production delivery.",
  email: "sawabsiddiq@gmail.com",
  phone: "+971 501 484 570",
  linkedin: "https://linkedin.com/in/sawabsiddiq",
  github: "https://github.com/sawabsiddiq",
  repo: "https://github.com/sawabsiddiq/portfolio-site",
  location: "Dubai, UAE",
  city: "Dubai",
  country: "AE",
  resume: "/Sawab-P-Resume.pdf",
  ogImage: "/og/home.png",
  knowsAbout: [
    "Applied AI",
    "Generative AI",
    "LLM Application Engineering",
    "AI Agents",
    "RAG Systems",
    "LLM Workflows",
    "Workflow Automation",
    "Business Process Automation",
    "AI Solution Architecture",
    "CRM Automation",
    "Forward Deployed Engineering",
    "n8n",
    "OpenAI API",
    "Python",
    "FastAPI",
    "Supabase",
    "PostgreSQL",
    "Enterprise Integrations",
    "Agentic Workflows",
    "AI Evaluation",
    "Power BI",
    "Tableau",
    "Looker Studio",
  ],
};

// Shared with page metadata and the social-image generator.
export const hero = homepage;

export const capabilities = [
  {
    title: "Business process & workflow automation",
    description: "I map bottlenecks, redesign handoffs, and automate sales, HR, service, and back-office processes using n8n, Make, Zapier, Kissflow, Python, and APIs. My work spans insurance, automotive, real estate, and HR tech.",
    proof: "300+ automations delivered; 40% faster vehicle inspection and repair turnaround.",
    href: "/#experience",
    linkLabel: "Explore my automation experience",
  },
  {
    title: "Applied AI & agentic workflows",
    description: "I build LLM-powered applications, AI agents, and production-ready chatbots using retrieval-augmented generation (RAG), tool calling, and structured outputs. Human-in-the-loop escalation keeps people involved where judgment matters. Applications include support, candidate screening, and provider search.",
    proof: "AIVA reduced routine manual insurance support workload by 60%.",
    href: "/work/insurance-ai-support-agent",
    linkLabel: "Read the AIVA AI workflow case study",
  },
  {
    title: "Enterprise API & CRM integrations",
    description: "I connect CRMs, databases, messaging channels, and business applications through REST APIs, webhooks, and event-driven workflows. Integrations turn disconnected tools into processes teams can track and operate.",
    proof: "Odoo CRM integration improved lead visibility and follow-up discipline by 30%.",
    href: "/#experience",
    linkLabel: "See my enterprise integration work",
  },
  {
    title: "Operational dashboards & decision systems",
    description: "I build monitoring dashboards, reporting workflows, and applications that help teams understand activity and make decisions. My dashboard skills include Power BI, Tableau, and Looker Studio alongside custom React applications.",
    proof: "Built AIVA Dashboard for chatbot monitoring and contributed to ClaimCPU's explainable claims scoring.",
    href: "/work/claimcpu-claims-rule-engine",
    linkLabel: "Explore the ClaimCPU decision platform",
  },
];

export const metrics = [
  {
    value: 300,
    suffix: "+",
    label: "Automations delivered",
    source: "Kissflow, Zapier, Make, n8n, and API integrations — ALBA CORP + eData",
  },
  {
    value: 60,
    suffix: "%",
    label: "Manual support workload reduced",
    source: "AI customer support agent — insurance operations",
  },
  {
    value: 40,
    suffix: "%",
    label: "Faster operational turnaround",
    source: "Vehicle inspection and repair workflow automation",
  },
  {
    value: 64,
    suffix: " hrs/wk",
    label: "Internal support time saved",
    source: "GPT-powered inventory chatbot",
  },
  {
    value: 5000,
    suffix: "/day",
    label: "AI outbound call capacity",
    source: "AI outbound call agent with NLP-based prioritisation",
  },
  {
    value: 20,
    suffix: "%",
    label: "Sales conversion improvement",
    source: "AI call-review system — transcript analysis and agent scoring",
  },
];

export type DiagramSpec = {
  stages: string[];
  branches?: [string, string]; // optional terminal fork
};

export const featured: {
  slug: string;
  title: string;
  outcome: string;
  role: string;
  domain: string;
  impact: string;
  status: Status;
  stack: string[];
  diagram: DiagramSpec;
}[] = [
  {
    slug: "insurance-ai-support-agent",
    title: "AIVA — Insurance AI Support & Claims Chatbot",
    outcome:
      "Multilingual AI chatbot I built for WhatsApp and email support — policy queries, claim intake, document collection, escalation, and follow-up automation.",
    role: "AI Architect / Workflow Engineer",
    domain: "Insurance operations",
    impact: "−60% routine manual support workload",
    status: "production",
    stack: ["OpenAI", "n8n", "WhatsApp/WABA", "Gupshup", "PostgreSQL", "Docker", "REST APIs", "Outlook", "Supabase"],
    diagram: { stages: ["WHATSAPP", "INTENT", "RAG"], branches: ["ESCALATE", "RESPOND"] },
  },
  {
    slug: "wizhire-ai",
    title: "WizHire AI — Recruitment Intelligence Platform",
    outcome:
      "AI recruitment platform automating job creation, resume ingestion, candidate screening, voice interview analysis, scoring, ranking, and hiring analytics.",
    role: "AI Engineer / Full-stack Workflow Engineer",
    domain: "HR tech",
    impact: "Rubric-based scoring + weighted ranking",
    status: "production",
    stack: ["React", "Vite", "Supabase", "OpenAI", "n8n", "Recharts", "Tailwind CSS", "Webhooks"],
    diagram: { stages: ["APPLICATION", "CV PARSE", "SCORING"], branches: ["INTERVIEW", "RANKING"] },
  },
  {
    slug: "healthcare-network-finder-ai",
    title: "Healthcare Network Finder AI",
    outcome:
      "Bilingual AI assistant that answers insurance questions and helps members find in-network clinics, hospitals, and pharmacies with location-aware search.",
    role: "AI Solution Architect / RAG Workflow Engineer",
    domain: "Healthcare / insurance",
    impact: "4,400+ provider records, Arabic + English",
    status: "poc",
    stack: ["OpenAI", "Pinecone", "n8n", "WhatsApp", "Supabase", "Google Places API", "Geocoding API"],
    diagram: { stages: ["WHATSAPP", "INTENT", "RAG / SEARCH"], branches: ["Q&A", "PROVIDERS"] },
  },
  {
    slug: "claimcpu-claims-rule-engine",
    title: "ClaimCPU — Claims Rule Engine Platform",
    outcome:
      "Client-facing claims decisioning platform with dataset ingestion, rule evaluation, tree-based scoring, RBAC, tenant isolation, and analytics dashboards.",
    role: "Product / Technical Architect + Full-stack Engineer",
    domain: "Insurance claims",
    impact: "Multi-tenant rule evaluation and explainable scoring",
    status: "poc",
    stack: ["React", "TypeScript", "Supabase", "PostgreSQL", "Edge Functions", "Recharts", "SQL/RLS"],
    diagram: { stages: ["DATASET", "RULES", "TREE SCORING"], branches: ["EXPLANATION", "DASHBOARD"] },
  },
];

export const archive: {
  name: string;
  description: string;
  stack: string[];
  status: Status;
  statusLabel: string;
}[] = [
  {
    name: "AIVA Dashboard",
    description: "Dashboard I built to monitor AIVA chatbot activity — conversations, intent trends, escalations, and operational KPIs.",
    stack: ["Next.js", "TypeScript", "Recharts"],
    status: "production",
    statusLabel: "PRODUCTION",
  },
  {
    name: "FNOL Automation Workflows",
    description: "First Notice of Loss WhatsApp intake with master/worker n8n workflows.",
    stack: ["n8n", "WhatsApp", "Supabase"],
    status: "production",
    statusLabel: "PRODUCTION",
  },
  {
    name: "FlowFox",
    description: "AI-powered invoice management with role-based approvals, RLS, and audit logging.",
    stack: ["Next.js", "Supabase", "Stripe"],
    status: "poc",
    statusLabel: "PRODUCT BUILD",
  },
  {
    name: "LinkedIn Lead Generation Automation",
    description: "LinkedIn lead generation, scraping and enrichment, filtering, deduplication, and automated email sequencing.",
    stack: ["n8n", "Supabase", "APIs"],
    status: "internal",
    statusLabel: "INTERNAL",
  },
  {
    name: "AI Outbound Calling & Call QA",
    description: "Outbound calling capacity up to 5,000 calls/day, with transcript analysis, agent scoring, and sales feedback workflows.",
    stack: ["AI workflows", "NLP", "Automation"],
    status: "internal",
    statusLabel: "INTERNAL",
  },
  {
    name: "Auto Parts Scraper",
    description: "Playwright-based two-stage scraper for authorized auto-parts data collection.",
    stack: ["Python", "Playwright"],
    status: "experiment",
    statusLabel: "UTILITY",
  },
  {
    name: "Internal HR Agent",
    description: "38-node internal HR email and sheet automation agent.",
    stack: ["n8n", "OpenAI", "Outlook"],
    status: "internal",
    statusLabel: "INTERNAL",
  },
];

export const experience = [
  {
    company: "eData Information Management",
    role: "AI Architect / Forward Deployed AI Engineer",
    period: "MAR 2025 — AUG 2026",
    location: "Dubai",
    current: false,
    summary:
      "I led architecture and delivery for AI agent and insurance technology solutions, working directly with business, operations, product, engineering, and client stakeholders. My work spanned discovery, BRD/SRS documentation, LLM/RAG workflow design, n8n and API integrations, UAT, deployment support, and production troubleshooting. My contributions to the company's projects ended when I left in August 2026.",
    bullets: [
      "Designed and deployed an AI customer support agent (OpenAI, n8n, WABA/Gupshup, CRM, escalation logic) cutting manual workload by 60%",
      "Built AIVA, a multilingual insurance assistant for motor claims — intake flows, document collection, 48-hour follow-ups, escalation",
      "Built AIVA Dashboard to monitor the chatbot's conversations, intents, escalations, and operational KPIs",
      "Developed WizHire AI and Network Finder AI end to end",
      "Created automation and analytics workflows for reporting, trend analysis, and operational decision support",
      "Supported production infrastructure: Docker, Linux VMs, Azure exposure, reverse proxy, SSL/TLS, webhooks, Supabase/PostgreSQL",
      "Advised on AI governance: escalation paths, audit-friendly docs, human-in-the-loop handling, operational guardrails",
    ],
  },
  {
    company: "ALBA CORP",
    role: "Software Developer — Workflow & AI Automations",
    period: "NOV 2021 — FEB 2025",
    location: "Dubai",
    current: false,
    summary:
      "I built workflow and AI automations across automotive, real estate, and HR tech divisions, supporting sales, service operations, reporting, and internal support. I delivered 300+ automations using Kissflow, Zapier, Make, Google Sheets, APIs, CRM systems, and AI workflows, reducing redundant work and improving operational visibility across teams.",
    bullets: [
      "GPT-powered inventory chatbot — saved 64 agent-hours/week of internal support",
      "AI outbound call agent automating up to 5,000 calls/day with NLP-based prioritisation",
      "AI call-review system: transcript analysis and agent scoring, +20% sales conversion",
      "Odoo CRM integration improving lead visibility and follow-up discipline by 30%",
      "Vehicle inspection/repair workflow automation, −40% turnaround time",
    ],
  },
];

export const stack: { group: string; core: string[]; rest: string[] }[] = [
  {
    group: "Applied AI / LLM Engineering",
    core: ["AI agents", "RAG", "OpenAI API", "tool calling", "LangChain", "AI evaluation"],
    rest: ["Generative AI", "agentic workflows", "prompt engineering", "Claude", "Gemini", "CrewAI", "contextual memory", "ElevenLabs"],
  },
  {
    group: "Backend / APIs",
    core: ["Python", "FastAPI", "REST APIs", "webhooks"],
    rest: ["Node.js", "JavaScript", "TypeScript", "OAuth 2.0", "Postman", "microservice-style workflow design"],
  },
  {
    group: "Databases / Vector Search",
    core: ["PostgreSQL", "Supabase", "pgVector", "Pinecone"],
    rest: ["Airtable", "structured data models", "reporting data flows"],
  },
  {
    group: "Automation / Orchestration",
    core: ["n8n", "Make.com", "Zapier", "Playwright"],
    rest: ["Kissflow", "Latenode", "Google Apps Script", "RPA-style workflow automation"],
  },
  {
    group: "Cloud / Deployment",
    core: ["Docker", "Linux", "Nginx/Apache reverse proxy"],
    rest: ["Docker Compose", "Azure VM (exposure)", "SSL/TLS", "scheduled jobs", "production webhooks"],
  },
  {
    group: "Business Systems",
    core: ["WhatsApp Business API", "Gupshup/WABA", "Odoo"],
    rest: ["HubSpot", "Pipedrive", "ZohoCRM", "Kissflow", "CRM workflows", "enterprise integration", "reporting automations"],
  },
  {
    group: "Frontend",
    core: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    rest: ["Vite", "Recharts", "Supabase Auth", "shadcn/ui-style components"],
  },
  {
    group: "Dashboards / Business Intelligence",
    core: ["Power BI", "Tableau", "Looker Studio"],
    rest: ["Operational dashboards", "trend analysis", "reporting automation", "data visualization"],
  },
  {
    group: "Solution Architecture / Delivery",
    core: ["Technical discovery", "solution design", "BRD / SRS", "client-facing delivery"],
    rest: ["Architecture diagrams", "UAT coordination", "deployment planning", "production troubleshooting", "client demos", "stakeholder communication", "user training", "AI governance"],
  },
];

export const about = {
  intro:
    "I'm an Applied AI Engineer based in Dubai, with 5 years of experience across software engineering and business process automation. My experience as a Forward Deployed AI Engineer connects hands-on development with client-facing delivery: understanding stakeholder needs, designing solutions, building AI applications and integrations, supporting UAT, and troubleshooting production issues. I've worked across insurance, automotive, real estate, and HR tech.",
  howIWork:
    "I work best where the problem is messy, cross-functional, and operationally important. I start by understanding the business workflow, failure points, data sources, users, and escalation paths. Then I design a practical AI or automation system with clear guardrails, structured outputs, human handoff, logging, and measurable outcomes.",
  philosophy:
    "I start with the business process: where time is lost, where decisions stall, and what people need to do better. Then I design the right combination of AI, automation, integrations, and human judgment to improve it.",
  languages: ["English — fluent", "Malayalam — native", "Tamil — professional", "Hindi — professional"],
  certifications: [
    "Agile with Atlassian Jira",
    "IBM Product Management: An Introduction — Coursera",
    "Google Automation with Python",
    "AWS Cloud Solutions Architect — ongoing",
  ],
};

export const contact = {
  copy: "Hiring an Applied AI Engineer or Forward Deployed Engineer? Need hands-on AI solutions architecture and delivery? Let's talk about the business problem, the systems involved, and the outcomes you need.",
};
