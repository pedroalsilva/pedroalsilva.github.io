export type Project = {
  slug: string; title: string; category: string; kind: string; description: string;
  tags: string[]; image: string; featured: boolean;
  sections: { title: string; text: string }[]; github?: string; demo?: string; thesis?: string;
};
export const profile = {
  name: 'Pedro Silva', role: 'Business Analytics · Data & Technology · Process Engineering',
  linkedin: 'https://www.linkedin.com/in/pedrolopessilva/', github: 'https://github.com/pedroalsilva',
  email: 'pedroalsilva@gmail.com' as string | null, resume: '/documents/Pedro_Silva_Resume.pdf' as string | null,
};
export const experience = [
  { company: 'adidas', role: 'Manager, Order & Customer Fulfilment', specialty: 'Digital and Analytics', period: 'Dec 2025 — Present', location: 'Porto, Portugal', summary: 'Connecting fulfilment operations with reliable reporting and better-informed decisions.', responsibilities: ['Reporting portfolio governance and business requirements.', 'Cross-functional reporting validation and user acceptance testing during ERP transformation.', 'Documentation and collaboration with Product Owners and Data Engineers.'], technologies: ['Power BI', 'Databricks', 'SQL', 'Confluence'] },
  { company: 'Ewals Cargo Care', role: 'Logistics Engineer', specialty: 'IT Management & Development · Continuous Improvement', period: 'Apr 2023 — Nov 2025', location: 'Porto, Portugal', summary: 'Building practical reporting and automation tools around the realities of logistics.', responsibilities: ['Operational dashboards, cost monitoring and logistics planning tools.', 'Process automation, data quality, documentation and user training.'], technologies: ['Power BI', 'Python', 'Power Automate', 'Power Apps'] },
  { company: 'Sonae MC', role: 'Business Analyst', specialty: 'Retail Operations', period: 'Feb 2021 — Apr 2023', location: 'Porto, Portugal', summary: 'Translating store operations into useful analysis, process recommendations and reporting.', responsibilities: ['Operational KPI reporting and loss-prevention analysis.', 'SQL queries, workflow improvements and training for store teams.'], technologies: ['SQL', 'MicroStrategy', 'Excel', 'Power Automate'] },
];
export const projects: Project[] = [
  { slug: 'retail-forecasting', thesis: 'https://recipp.ipp.pt/entities/publication/2d2dc4bc-536b-44ce-ad6d-cc5a0d150f5d', title: 'A clearer view of demand.', category: 'Analytics & Decision Intelligence', kind: 'Academic research', description: 'Comparing machine-learning approaches to retail sales forecasting, with a practical decision-support interface.', tags: ['Python', 'XGBoost', 'Flask', 'SQLite'], image: 'forecast', featured: true, sections: [
    { title: 'Challenge', text: 'Explore sales forecasting for retail products using historical transactions. The research concerns a confidential beauty retailer; its identity and underlying data are not shared here.' },
    { title: 'Approach', text: 'Prepare transaction data and compare XGBoost, LightGBM, LSTM and Transformer models using temporal evaluation. Assess model behaviour across product families rather than relying on a single headline metric.' },
    { title: 'Solution', text: 'A forecasting prototype with a Flask interface and SQLite backend, developed as part of a master’s dissertation completed in July 2025.' },
    { title: 'Technology', text: 'Python, XGBoost, LightGBM, LSTM, Transformer, Flask, SQLite, JavaScript and Chart.js.' },
    { title: 'Impact', text: 'The company uses the tool, and user training was delivered. No quantitative business impact is claimed. The evaluation used products with sales history; it does not establish cold-start performance for entirely new products.' },
    { title: 'Learnings', text: 'Forecasting requires both sound temporal evaluation and an interface that people can use. Adoption and predictive performance need to be assessed separately.' },
  ] },
  { slug: 'offshore-logistics', title: 'Better routes. Clearer trade-offs.', category: 'Operations & Optimization', kind: 'Academic project', description: 'A minimum-cost transport model for offshore supply, designed to make planning constraints explicit.', tags: ['Python', 'PuLP', 'Linear programming'], image: 'routes', featured: true, sections: [
    { title: 'Challenge', text: 'Model transport planning for offshore platforms while accounting for the constraints of a logistics network.' },
    { title: 'Approach', text: 'Express the planning problem as a linear programming model and compare scenarios. This is an academic optimization project from January 2025.' },
    { title: 'Solution', text: 'A Python-based model for finding a minimum-cost transport plan within the defined assumptions and constraints.' },
    { title: 'Technology', text: 'Python, PuLP and SolverStudio; linear programming and scenario analysis.' },
    { title: 'Impact', text: 'Demonstrates a structured approach to logistics optimization. Industrial deployment and realized cost savings have not been established.' },
    { title: 'Learnings', text: 'An optimal plan is only useful when its assumptions reflect the operation. Scenario analysis helps reveal how constraints affect the result.' },
  ] },
  { slug: 'fitz', demo: 'https://fitz.pt', title: 'From workflow to working product.', category: 'Software & Applied AI', kind: 'Personal project · AI-assisted development', description: 'FITZ: a training platform exploring the connection between coaching workflows and a usable digital product.', tags: ['Next.js', 'TypeScript', 'Supabase', 'PWA'], image: 'product', featured: true, sections: [
    { title: 'Challenge', text: 'Build a personal software project around training and coaching workflows, bringing product decisions and implementation into the same process.' },
    { title: 'Approach', text: 'AI-assisted development with iterative implementation and testing. Local repository inspection supports the technology and feature descriptions; this is not presented as professional software engineering tenure.' },
    { title: 'Solution', text: 'A Next.js and React application with authentication, database access rules, migrations, automated tests and progressive web app support.' },
    { title: 'Technology', text: 'Next.js, React, TypeScript, CSS, Supabase/PostgreSQL, authentication and row-level security.' },
    { title: 'Impact', text: 'A working personal product implementation. User numbers, commercial results and performance improvements are not claimed. Visit the FITZ website to explore the product. Source code access is available on request.' },
    { title: 'Learnings', text: 'Building FITZ brought interface design, access permissions and regression testing into the same workflow. Development was assisted by AI.' },
  ] },
];
export const skills = [
  { title: 'Analytics & Business Intelligence', items: ['Power BI', 'Databricks', 'Reporting governance', 'Data modelling'] },
  { title: 'Programming & Data', items: ['SQL', 'Python', 'PostgreSQL¹', 'Data preparation'] },
  { title: 'Process Engineering & Optimization', items: ['Supply chain', 'Process improvement', 'Linear programming', 'Scenario analysis'] },
  { title: 'Automation & Digital Solutions', items: ['Power Automate', 'Power Apps', 'Next.js / React¹', 'TypeScript¹'] },
  { title: 'Applied AI & Machine Learning', items: ['Copilot Studio', 'Forecasting²', 'XGBoost / LightGBM²', 'Model evaluation²'] },
  { title: 'Business & Leadership', items: ['Business requirements', 'Cross-functional coordination', 'UAT', 'Documentation & training'] },
];
export const buildings = [
  { id: 'operations', title: 'Operations Hub', short: 'OPERATIONS', description: 'Where real-world constraints become better processes. Explore logistics, supply chain and optimization.', topics: ['Supply chain', 'Logistics', 'Process engineering', 'Continuous improvement'], project: 'offshore-logistics', section: 'experience', x: 140, y: 150, color: '#d8b68a' },
  { id: 'analytics', title: 'Analytics Lab', short: 'ANALYTICS', description: 'Turning operational questions into useful evidence, from reporting to forecasting.', topics: ['Business intelligence', 'SQL & Python', 'Databricks', 'Data modelling'], project: 'retail-forecasting', section: 'skills', x: 500, y: 150, color: '#73e3c0' },
  { id: 'innovation', title: 'Innovation Studio', short: 'INNOVATION', description: 'A space for software, automation and applied AI. Practical ideas, built and tested.', topics: ['Software development', 'Automation', 'Applied AI', 'Personal products'], project: 'fitz', section: 'work', x: 140, y: 390, color: '#a9baff' },
  { id: 'career', title: 'Career Journey', short: 'CAREER', description: 'A journey from retail operations to analytics and process engineering, alongside continued education.', topics: ['Retail & logistics', 'Business analysis', 'Industrial Engineering and Management — ISEP, 2025', 'Cross-functional coordination'], project: null, section: 'about', x: 500, y: 390, color: '#dab5cd' },
] as const;
export type BuildingId = typeof buildings[number]['id'];

export const appliedSolutions = [
  { title: 'Operational answers with AI', context: 'adidas · Copilot Studio', label: 'Applied AI', problem: 'Operational questions need a shared understanding of business assumptions.', contribution: 'Built a Copilot Studio agent to clarify business assumptions and support operational teams.', evidence: 'In use for operational support.', tools: ['Copilot Studio', 'Business requirements'] },
  { title: 'A clearer route for issues', context: 'adidas · Workflow automation', label: 'Automation', problem: 'Internal issues need to be consolidated and assessed before external escalation.', contribution: 'Implemented an intake and assessment workflow using Smartsheet and Power Automate, designed to avoid duplicate solution evaluations.', evidence: 'In use for internal issue intake and assessment.', tools: ['Power Automate', 'Smartsheet'] },
  { title: 'Tools built around logistics', context: 'Ewals Cargo Care · Digital solutions', label: 'Digital tools', problem: 'Logistics teams need practical tools for planning, reporting and handling exceptions.', contribution: 'Automated workflows with Python, VBA and Power Automate, and developed Power Apps tools for operational requests and exception handling.', evidence: 'Supported adoption through documentation and training for teams and partners.', tools: ['Python', 'Power Automate', 'Power Apps'] },
];
