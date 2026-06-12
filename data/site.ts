export type Status = "production" | "poc" | "internal" | "experiment";

export const site = {
  url: "https://sawabp.com",
  email: "sawabsiddiq@gmail.com",
  phone: "+971 501 484 570",
  linkedin: "https://linkedin.com/in/sawabsiddiq",
  github: "https://github.com/sawabsiddiq",
  location: "Dubai, UAE",
  resume: "/Sawab-P-Resume.pdf",
};

export const hero = {
  eyebrow: "FORWARD DEPLOYED AI ENGINEER · DUBAI",
  // Three lines — revealed line-by-line on load
  headline: ["AI agents, RAG systems,", "and automation that", "survive production."],
  subline:
    "I design, build, deploy, and support AI-powered systems across insurance, HR tech, automotive, and service operations — from discovery and SRS to APIs, databases, UAT, and 2am troubleshooting.",
  proofRow: ["4.5+ YRS", "300+ AUTOMATIONS", "60% WORKLOAD CUT", "5,000 CALLS/DAY"],
};

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
    title: "Insurance AI Support & Claims Assistant",
    outcome:
      "Multilingual WhatsApp and email AI support workflow handling policy queries, claim intake, document collection, escalation, and follow-up automation.",
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
    impact: "Multi-tenant rule evaluation + detection APIs",
    status: "poc",
    stack: ["React", "TypeScript", "Supabase", "PostgreSQL", "Edge Functions", "Recharts", "SQL/RLS"],
    diagram: { stages: ["DATASET", "RULES", "TREE SCORING"], branches: ["RISK API", "DASHBOARD"] },
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
    name: "AIVA Analytics Dashboard",
    description: "Monitoring and analytics for AI support interactions — intent trends, escalations, KPIs.",
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
    name: "Lead Enrichment Automation",
    description: "LinkedIn lead enrichment, deduplication, and automated email sequencing.",
    stack: ["n8n", "Supabase", "APIs"],
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
    period: "MAR 2025 — PRESENT",
    location: "Dubai",
    current: true,
    summary:
      "I lead architecture and delivery for AI agent and insurance technology solutions, working directly with business, operations, product, engineering, and client stakeholders. My work spans discovery, BRD/SRS documentation, LLM/RAG workflow design, n8n and API integrations, UAT, deployment support, and production troubleshooting.",
    bullets: [
      "Designed and deployed an AI customer support agent (OpenAI, n8n, WABA/Gupshup, CRM, escalation logic) cutting manual workload by 60%",
      "Built AIVA, a multilingual insurance assistant for motor claims — intake flows, document collection, 48-hour follow-ups, escalation",
      "Developed WizHire AI and Network Finder AI end to end",
      "Run production infrastructure: Docker, Linux VMs, Azure exposure, reverse proxy, SSL/TLS, webhooks, Supabase/PostgreSQL",
      "Advise on AI governance: escalation paths, audit-friendly docs, human-in-the-loop handling, operational guardrails",
    ],
  },
  {
    company: "ALBA CORP",
    role: "Software Developer — Workflow & AI Automations",
    period: "NOV 2021 — FEB 2025",
    location: "Dubai",
    current: false,
    summary:
      "I built workflow and AI automations across sales, HR, service operations, reporting, and internal support. I delivered 300+ automations using Kissflow, Zapier, Make, Google Sheets, APIs, CRM systems, and AI workflows, reducing redundant work and improving operational visibility across teams.",
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
    group: "AI / LLM Systems",
    core: ["OpenAI API", "RAG", "tool calling", "prompt engineering", "AI agents", "LangChain"],
    rest: ["Claude", "Gemini", "CrewAI", "contextual memory", "AI evaluation", "ElevenLabs"],
  },
  {
    group: "Backend / APIs",
    core: ["Python", "FastAPI", "REST APIs", "webhooks"],
    rest: ["Node.js", "TypeScript", "OAuth 2.0", "Postman", "microservice-style workflow design"],
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
    rest: ["Docker Compose", "Azure VM", "SSL/TLS", "scheduled jobs", "production webhooks"],
  },
  {
    group: "Business Systems",
    core: ["WhatsApp Business API", "Gupshup/WABA", "Odoo"],
    rest: ["HubSpot", "Pipedrive", "ZohoCRM", "Kissflow", "CRM workflows", "reporting automations"],
  },
  {
    group: "Frontend / Dashboarding",
    core: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    rest: ["Vite", "Recharts", "Supabase Auth", "shadcn/ui-style components"],
  },
];

export const about = {
  intro:
    "I'm an AI Engineer and Forward Deployed AI Engineer based in Dubai, with 4.5+ years of experience building AI agents, RAG systems, business automation workflows, and enterprise integrations. My work sits between business operations and engineering: I speak with stakeholders, document requirements, design the architecture, build the workflow or application, connect APIs and databases, support UAT, and troubleshoot production issues.",
  howIWork:
    "I work best where the problem is messy, cross-functional, and operationally important. I start by understanding the business workflow, failure points, data sources, users, and escalation paths. Then I design a practical AI or automation system with clear guardrails, structured outputs, human handoff, logging, and measurable outcomes.",
  philosophy:
    "I don't treat AI as a chatbot layer. I design AI systems as operational workflows: inputs, routing, retrieval, tools, policies, escalation, persistence, observability, and feedback loops.",
  languages: ["English — fluent", "Malayalam — native", "Tamil — professional", "Hindi — professional"],
};

export const contact = {
  copy: "If you're building AI agents, RAG workflows, automation platforms, or internal tools that need to work in real operations, I'd be happy to talk.",
};
