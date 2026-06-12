/**
 * Scene 06 milestones — the real CV, shared by the 3D loop (logo + headline in
 * each gate) and the DOM panel (the USP achievements that animate in per gate).
 * `logo` is a key resolved to a loaded texture in the Timeline; null = no org
 * chip (independent work).
 */
export const MILESTONES = [
    {
        z: -97,
        date: "Aug 2022 — May 2026",
        title: "B.Tech CSE (AI · ML · DL)",
        org: "Teerthanker Mahaveer University",
        logo: "tmu",
        color: "#3b82f6",
        points: [
            "Specialized in Artificial Intelligence, Machine Learning & Deep Learning",
            "Coursework across Pattern Recognition, NLP and Computer Vision",
            "Self-driven research and hands-on intelligent-systems projects",
        ],
    },
    {
        z: -107,
        date: "Sep 2025 — Dec 2025",
        title: "Data Science Intern",
        org: "EvoAstra Ventures",
        logo: "evoastra",
        color: "#8b5cf6",
        points: [
            "Built a telecom churn pipeline — 87.2% accuracy, 0.89 ROC-AUC",
            "FastAPI + Plotly ROI dashboard projecting ₹7.7M in savings",
            "Regional strategy module recommending FTTH migration",
        ],
    },
    {
        z: -117,
        date: "Feb 2026 — May 2026",
        title: "Web Developer",
        org: "Teerthanker Mahaveer University",
        logo: "tmu",
        color: "#06b6d4",
        points: [
            "Rebuilt the homepage (Laravel) for 150+ programs — +28% session time",
            "Cut page load 45% via HLS streaming and lazy DB queries",
            "Modular layouts serving 25k+ monthly visitors",
        ],
    },
    {
        z: -127,
        date: "June 2026 — Present",
        title: "Full-stack Developer",
        org: "Independent · Building the next gen",
        logo: null,
        color: "#34d399",
        points: [
            "Shipping production-grade AI products end-to-end",
            "Open to full-time and collaborative opportunities",
            "Let's build something meaningful together",
        ],
    },
];

// Timeline occupies this slice of the journey; 4 gates split it evenly so the
// 3D loop and the DOM panel agree on which milestone is active.
export const TL_START = 0.78;
export const TL_END = 0.92;
export const TL_GATES = MILESTONES.length;

export const timelineGateAt = (p) => {
    const span = (TL_END - TL_START) / TL_GATES;
    const local = (p - TL_START) / span;
    const idx = Math.max(0, Math.min(TL_GATES - 1, Math.floor(local)));
    const f = local - Math.floor(local);
    const fade = Math.max(0, Math.min(1, Math.min(f / 0.25, (1 - f) / 0.25)));
    return { idx, fade };
};
