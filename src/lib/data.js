// ─── Navigation ──────────────────────────────────────────
export const navLinks = [
    { label: "Home", href: "hero" },
    { label: "About", href: "about" },
    { label: "Experience", href: "experience" },
    { label: "Skills", href: "skills" },
    { label: "Projects", href: "projects" },
    { label: "Contact", href: "contact" },
];

// ─── Hero ────────────────────────────────────────────────
export const heroData = {
    greeting: "Hello, I'm",
    name: "Aryan Sahu",
    titles: [
        "GenAI Developer",
        "ML Engineer",
        "Automation Builder",
        "Full-Stack Developer",
    ],
    description:
        "Electronics & Telecommunications student at PICT with expertise in building advanced GenAI systems, ML/DL models, and embedded systems.",
    cta: [
        { label: "View Projects", href: "projects" },
        { label: "Contact Me", href: "contact" },
    ],
};

// ─── About ──────────────────────────────────────────────
export const aboutData = {
    title: "About Me",
    bio: [
        "I'm a passionate developer exploring the frontiers of Generative AI, automation, and full-stack development. I work on building intelligent workflows that bridge AI capabilities with real-world business needs.",
        "My journey spans from crafting n8n automation pipelines and LLM-powered QnA systems to building responsive web applications. I thrive at the intersection of creativity and technology, always seeking to push what's possible.",
        "When I'm not coding, you'll find me exploring new AI models, contributing to open source, or diving deep into the latest tech trends.",
    ],
    stats: [
        { label: "Projects Built", value: "15+" },
        { label: "Technologies", value: "20+" },
        { label: "Cups of Coffee", value: "∞" },
    ],
};

// ─── Experience ─────────────────────────────────────────
export const experienceData = [
    {
        role: "GenAI Intern",
        company: "iMocha",
        period: "January 2025 – Present",
        type: "Internship",
        description: [
            "Working on automation workflows for file validation and bulk file processing",
            "Building QnA generation pipelines using LLM integrations",
            "Exploring agentic AI workflows and document intelligence",
        ],
        technologies: ["LLMs", "Python", "Agentic AI", "Document AI", "Automation"],
    },
    {
        role: "IT Intern",
        company: "Shoption Pvt. Ltd.",
        period: "September 2025 – December 2025",
        type: "Internship",
        description: [
            "Developing multilingual advanced RAG backend layer for customer facing chatbots",
            "Integrating APIs with frontend, CRM, marketing automation platforms, and internal tools",
        ],
        technologies: ["RAG", "Python", "LLMs", "API Integration", "CRM"],
    },
    {
        role: "Control Systems Intern",
        company: "Aeronica Advance Technologies Pvt. Ltd.",
        period: "June 2025 – August 2025",
        type: "Internship",
        description: [
            "Worked on advanced automation algorithms, including PID, MPC, and LQR",
            "Implemented algorithms on STM32 microcontroller with MPU6050 sensor for real-time feedback control",
        ],
        technologies: ["STM32", "MPC", "PID", "Embedded Systems", "C/C++"],
    },
    {
        role: "Data Science Intern",
        company: "NxTechWorks Consulting Pvt. Ltd.",
        period: "May 2025 – June 2025",
        type: "Internship",
        description: [
            "Engineered RAG chatbot with advanced features like crossencoder reranking and summarization",
            "Developed automation workflows for personalized event suggestions and Google Calendar sync",
        ],
        technologies: ["RAG", "Python", "LLMs", "Data Science", "Automation"],
    },
];

// ─── Skills ─────────────────────────────────────────────
export const skillCategories = [
    {
        name: "AI / ML",
        color: "cyan-neon",
        skills: [
            { name: "LLMs & Prompt Engineering", level: 90 },
            { name: "LangChain / LlamaIndex", level: 75 },
            { name: "Python ML Stack", level: 80 },
            { name: "Document Intelligence", level: 70 },
            { name: "Agentic AI", level: 85 },
        ],
    },
    {
        name: "Automation",
        color: "green-neon",
        skills: [
            { name: "Workflow Automation", level: 90 },
            { name: "API Integrations", level: 85 },
            { name: "Web Scraping", level: 75 },
            { name: "CI/CD Pipelines", level: 70 },
            { name: "Task Automation", level: 80 },
        ],
    },
    {
        name: "Frontend",
        color: "purple-neon",
        skills: [
            { name: "React / Next.js", level: 85 },
            { name: "Tailwind CSS", level: 90 },
            { name: "JavaScript / TypeScript", level: 85 },
            { name: "Framer Motion", level: 75 },
        ],
    },
    {
        name: "Backend",
        color: "cyan-neon",
        skills: [
            { name: "Python / FastAPI", level: 85 },
            { name: "Flask", level: 80 },
            { name: "SQLAlchemy / DuckDB", level: 75 },
            { name: "REST APIs", level: 80 },
            { name: "SQLite / PostgreSQL", level: 70 },
        ],
    },
    {
        name: "Tools",
        color: "green-neon",
        skills: [
            { name: "Git & GitHub", level: 90 },
            { name: "Docker", level: 65 },
            { name: "VS Code / Cursor", level: 95 },
            { name: "Linux / CLI", level: 75 },
            { name: "OpenCV", level: 60 },
        ],
    },
];

// ─── Projects ───────────────────────────────────────────
export const projectsData = [
    {
        title: "AquaMitra: Hybrid RAG + Text-to-SQL",
        description:
            "Built a Hybrid RAG QA assistant with LlamaIndex routing and Text-to-SQL capabilities on DuckDB. Delivered FastAPI + Uvicorn backend with SQLAlchemy, exposing /api/chat, /api/health, and /api/history endpoints.",
        technologies: ["Python", "FastAPI", "LlamaIndex", "HuggingFace", "DuckDB", "SQLAlchemy"],
        github: "https://github.com/aryaniscoding/SIH_2025_sql_coder/tree/frontend",
        live: "",
        featured: true,
    },
    {
        title: "FareFlow: Smart Parking System",
        description:
            "Built an end-to-end parking solution with ESP32-CAM video feed and Flask backend. Achieved 98% accuracy in license plate recognition using Plate Recognizer API. Developed dynamic fare logic based on parking duration.",
        technologies: ["Python", "Flask", "ESP32-CAM", "Plate Recognizer API", "SQLite", "OpenCV"],
        github: "https://github.com/aryaniscoding/FareFlow",
        live: "",
        featured: true,
    },
    {
        title: "The Gladiators: Fantasy Cricket Selector",
        description:
            "Built an automated fantasy-cricket selection engine using scikit-learn Pipelines with RandomForestRegressor tuned via RandomizedSearchCV. Containerized workflow with Docker for reproducible data pipeline.",
        technologies: ["Python", "pandas", "scikit-learn", "Docker", "numpy"],
        github: "https://github.com/aryaniscoding/The_Gladiators_gameathon",
        live: "",
        featured: true,
    },
    {
        title: "Portfolio Website",
        description:
            "This very portfolio — a Windows OS-style developer showcase built with React.",
        technologies: ["React", "Tailwind", "CSS"],
        github: "https://github.com/aryaniscoding",
        live: "",
        featured: false,
    },
];

// ─── Social ─────────────────────────────────────────────
export const socialLinks = [
    { name: "GitHub", url: "https://github.com/aryaniscoding" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/aryan-sahu-131928277/" },
    { name: "Email", url: "mailto:aryansahu2705@gmail.com" },
];
