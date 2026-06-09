const navLinks = [
    {
        name: "Work",
        link: "#work",
    },
    {
        name: "Projects",
        link: "/projects",
    },
    {
        name: "Experience",
        link: "#experience",
    },
];

const words = [
    {
        text: "Ideas",
        imgPath: "/images/ideas.svg",
        gradient: "linear-gradient(135deg, #60a5fa, #22d3ee)",
    },
    {
        text: "Concepts",
        imgPath: "/images/concepts.svg",
        gradient: "linear-gradient(135deg, #c084fc, #f472b6)",
    },
    {
        text: "Designs",
        imgPath: "/images/designs.svg",
        gradient: "linear-gradient(135deg, #34d399, #059669)",
    },
    {
        text: "Code",
        imgPath: "/images/code.svg",
        gradient: "linear-gradient(135deg, #fb923c, #ef4444)",
    },
    {
        text: "Ideas",
        imgPath: "/images/ideas.svg",
        gradient: "linear-gradient(135deg, #60a5fa, #22d3ee)",
    },
    {
        text: "Concepts",
        imgPath: "/images/concepts.svg",
        gradient: "linear-gradient(135deg, #c084fc, #f472b6)",
    },
    {
        text: "Designs",
        imgPath: "/images/designs.svg",
        gradient: "linear-gradient(135deg, #34d399, #059669)",
    },
    {
        text: "Code",
        imgPath: "/images/code.svg",
        gradient: "linear-gradient(135deg, #fb923c, #ef4444)",
    },
];

const counterItems = [
    { value: 15, suffix: "+", label: "Completed Projects" },
    { value: 5000, suffix: "+", label: "Hours of Practical Learning" },
    { value: 12, suffix: "+", label: "Technical Certifications Earned" },
    { value: 25, suffix: "+", label: "Tools & Technologies Used" },
];

const logoIconsList = [
    {
        imgPath: "/images/logos/company-logo-1.png",
    },
    {
        imgPath: "/images/logos/company-logo-2.png",
    },
    {
        imgPath: "/images/logos/company-logo-3.svg",
    },
    {
        imgPath: "/images/logos/company-logo-4.png",
    },
    {
        imgPath: "/images/logos/company-logo-5.png",
    },
    {
        imgPath: "/images/logos/company-logo-6.png",
    },
    {
        imgPath: "/images/logos/company-logo-7.png",
    },
    {
        imgPath: "/images/logos/company-logo-8.png",
    },
    {
        imgPath: "/images/logos/company-logo-9.png",
    },
    {
        imgPath: "/images/logos/company-logo-10.svg",
    },
    {
        imgPath: "/images/logos/company-logo-11.png",
    },
    {
        imgPath: "/images/logos/company-logo-12.png",
    },
];

const abilities = [
    {
        imgPath: "/images/code2.png",
        title: "The Problem I Solve",
        desc: "I eliminate user friction and bridge the gap between high-performance systems and human-centric design. I don't build generic static sites; I build software that solves actual utility bottlenecks.",
    },
    {
        imgPath: "/images/ai.png",
        title: "The Products I Ship",
        desc: "Production-ready platforms designed to handle real scale. I engineer tools that are fast, visually immersive, and functionally complete, from custom dashboard panels to modular developer tools.",
    },
    {
        imgPath: "/images/curious.png",
        title: "My Core Standard",
        desc: "Zero reliance on generic templates. I build full-stack architectures using Next.js and FastAPI, backed by resilient databases mapped securely using modern tools like Drizzle ORM.",
    },
    {
        imgPath: "/images/focus.png",
        title: "Real-World Proof",
        desc: "From crafting high-end, customized relational e-commerce dashboards to deploying deep learning models in clinic workflows — I build software for active usage.",
    },
];

const techStackImgs = [
    {
        name: "React Developer",
        imgPath: "/images/logos/react.png",
    },
    {
        name: "Python Developer",
        imgPath: "/images/logos/python.svg",
    },
    {
        name: "Backend Developer",
        imgPath: "/images/logos/node.png",
    },
    {
        name: "Interactive Developer",
        imgPath: "/images/logos/three.png",
    },
    {
        name: "Project Manager",
        imgPath: "/images/logos/git.svg",
    },
];

const techStackIcons = [
    {
        name: "React Development (React.js)",
        modelPath: "/models/react_logo-transformed.glb",
        scale: 1,
        rotation: [0, 0, 0],
    },
    {
        name: "AI/ML Practitioner (Python)",
        modelPath: "/models/python-transformed.glb",
        scale: 0.8,
        rotation: [0, 0, 0],
    },
    {
        name: "Backend Development (Node.js)",
        modelPath: "/models/node-transformed.glb",
        scale: 5,
        rotation: [0, -Math.PI / 2, 0],
    },
    {
        name: "Interactive Development (Three.js)",
        modelPath: "/models/three.js-transformed.glb",
        scale: 0.05,
        rotation: [0, 0, 0],
    },
    {
        name: "Project Managment (Git)",
        modelPath: "/models/git-svg-transformed.glb",
        scale: 0.05,
        rotation: [0, -Math.PI / 4, 0],
    },
];

const expCards = [
    {
        review: "Worked as a Web Developer at Teerthanker Mahaveer University, focusing on backend restructuring and frontend load-time optimizations. I designed custom modules in Laravel and decoupled dynamic scripts, resulting in measurable speed improvements across the university's primary traffic gateways.",
        imgPath: "/images/logo.webp",
        logoPath: "/images/logo.png",
        title: "Web Developer",
        date: "February 2026 - May 2026",
        responsibilities: [
            "Redesigned the university homepage (Laravel) serving 150+ academic programs, boosting average session duration by 28% through improved information architecture and responsive design.",
            "Cut page load time by 45% by implementing adaptive HLS streaming, asset preloading, and lazy-loaded DB queries via IntersectionObserver API.",
            "Designed modular layout components using Laravel and CSS to support 25k+ monthly visitors across primary university traffic gateways.",
        ],
    },
    {
        review: "My internship at EvoAstra Private Ventures Pvt. Ltd. was focused on building end-to-end predictive systems. I architected the TeleChurn machine learning classification pipeline and FastAPI dashboard, which forecasted MoM circle-level subscriber churn and optimized marketing retention budgets.",
        imgPath: "/images/download3.png",
        logoPath: "/images/download4.jpeg",
        title: "Data Science Intern",
        date: "September 2025 - December 2025",
        responsibilities: [
            "Engineered a telecom subscriber churn prediction pipeline using longitudinal TRAI records, achieving an accuracy of 87.2% and a ROC-AUC of 0.89 on chronological test splits.",
            "Developed an interactive web dashboard in FastAPI and Plotly to simulate business ROI metrics, projecting campaign profit savings of ₹7.7 Million.",
            "Built a custom strategic advisory module to recommend regional interventions (such as FTTH migration) based on circle wireline-to-wireless ratios.",
        ],
    },
    {
        review: "As a B.Tech graduate specializing in AI, ML, and DL, I have actively explored both the theoretical and practical aspects of intelligent technologies. My coursework and hands-on projects have deepened my understanding and fueled my passion for innovation in this field.",
        imgPath: "/images/logo.webp",
        logoPath: "/images/logo.png",
        title: "B.Tech CSE Graduate (AI, ML, DL)",
        date: "August 2022 - May 2026",
        responsibilities: [
            "Completed B.Tech in Computer Science and Engineering with a specialization in AI, ML, and DL at Teerthanker Mahaveer University, Moradabad.",
            "Studied advanced subjects like Machine Learning, Deep Learning, Pattern Recognition, and Natural Language Processing.",
            "Engaged in self-driven learning and hands-on experimentation with intelligent systems.",
        ],
    },
];

const expLogos = [
    {
        name: "logo1",
        imgPath: "/images/logo1.png",
    },
    {
        name: "logo2",
        imgPath: "/images/logo2.png",
    },
    {
        name: "logo3",
        imgPath: "/images/logo3.png",
    },
];

const socialImgs = [
    {
        name: "github",
        url: "https://www.github.com/Adi15Jain/",
        imgPath: "/images/github.png",
    },
    {
        name: "linkedin",
        url: "https://www.linkedin.com/in/adi-jain-73334724b/",
        imgPath: "/images/linkedin.png",
    },
];

export {
    words,
    abilities,
    logoIconsList,
    counterItems,
    expCards,
    expLogos,
    testimonials,
    socialImgs,
    techStackIcons,
    techStackImgs,
    navLinks,
};
