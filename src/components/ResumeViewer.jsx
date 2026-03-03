"use client";

import { useEffect, useRef, useState } from "react";
import {
    Globe,
    Github,
    Linkedin,
    Mail,
    MapPin,
    Phone,
    User,
    Briefcase,
    Rocket,
    Zap,
    Award,
    GraduationCap,
    Download,
    X,
    FileText,
    ExternalLink,
} from "lucide-react";

/* ─── No warp canvas — replaced with zoom-from-book transition ── */

/* ─── Resume Data ─────────────────────────────────────────── */
const DATA = {
    name: "Adi Jain",
    title: "CSE UnderGrad · AI/ML Engineer · LLMs & RAG · Full-Stack Developer",
    links: [
        {
            Icon: Globe,
            text: "adijainnext-portfolio.vercel.app",
            href: "https://adijainnext-portfolio.vercel.app/",
        },
        {
            Icon: Github,
            text: "github.com/Adi15Jain",
            href: "https://github.com/Adi15Jain",
        },
        {
            Icon: Linkedin,
            text: "linkedin.com/in/adi-jain-73334724b",
            href: "https://www.linkedin.com/in/adi-jain-73334724b/",
        },
        {
            Icon: Mail,
            text: "adi1510jain@gmail.com",
            href: "mailto:adi1510jain@gmail.com",
        },
        { Icon: MapPin, text: "Meerut, India", href: null },
        { Icon: Phone, text: "+91-8630497191", href: "tel:+918630497191" },
    ],
    stats: [
        { n: "8.52", l: "GPA / 10.00" },
        { n: "2", l: "Internships" },
        { n: "92%", l: "Best Model Acc." },
        { n: "LLMs", l: "& RAG Systems" },
    ],
    about: "I work across AI, ML, and full-stack development, mainly building LLM pipelines, RAG systems, and clean APIs. I focus on practical, end-to-end solutions — from data work and modeling to FastAPI backends and React/Next.js frontends. I enjoy figuring things out on my own, keeping things simple, and delivering work that actually solves a problem.",
    education: [
        {
            degree: "B.Tech — CSE (AI, ML & Deep Learning)",
            school: "Teerthanker Mahaveer University",
            loc: "Moradabad, India",
            period: "Aug 2022 – Present",
            grade: "GPA: 8.52 / 10.00",
            color: "#3b82f6",
        },
        {
            degree: "Senior High School — Science (PCM)",
            school: "St. John's Senior Secondary School",
            loc: "Meerut, India",
            period: "Apr 2018 – Jul 2022",
            grade: "CGPA: 8.2 / 10",
            color: "#06b6d4",
        },
    ],
    skills: [
        {
            cat: "Programming",
            items: ["Python", "JavaScript (ES6+)", "C++"],
        },
        {
            cat: "AI & Machine Learning",
            items: [
                "Scikit-learn",
                "XGBoost",
                "LangChain",
                "NLP",
                "CNNs",
                "LLMs",
                "RAG",
            ],
        },
        {
            cat: "Frameworks & Libraries",
            items: [
                "FastAPI",
                "Flask",
                "ReactJS",
                "NextJS",
                "NodeJS",
                "ThreeJS",
                "TailwindCSS",
                "AntDesign",
            ],
        },
        {
            cat: "Databases",
            items: [
                "MySQL",
                "PostgreSQL",
                "SQLite",
                "MongoDB",
                "MongoDB Atlas",
            ],
        },
        {
            cat: "Cloud & Deployment",
            items: ["Vercel", "Render", "GitHub Actions", "REST APIs"],
        },
        {
            cat: "Data & Analysis",
            items: [
                "NumPy",
                "Pandas",
                "Data Cleaning",
                "Text Preprocessing",
                "Feature Engineering",
            ],
        },
        {
            cat: "Developer Tools",
            items: [
                "Git",
                "GitHub",
                "VS Code",
                "Jupyter",
                "Vite",
                "Groq",
                "Canva",
            ],
        },
    ],
    experience: [
        {
            role: "Data Science Intern",
            company: "EvoAstra Ventures Private Limited",
            project: "Telecom Customer Churn Prediction",
            period: "Sep 2025 – Dec 2025",
            loc: "Remote, India",
            color: "#7c3aed",
            bullets: [
                "Developed a churn prediction pipeline on a 70k+ telecom dataset — cleaning, EDA, and key feature engineering.",
                "Trained & compared ML models (Logistic Regression, Random Forest, XGBoost, LightGBM) with imbalance handling.",
                "Built deployable assets: preprocessing pipeline, trained model, and a prediction API/dashboard.",
            ],
        },
        {
            role: "Artificial Intelligence Intern",
            company: "CETPA Infotech Private Limited",
            project: "Sentysis — Twitter Sentiment Analysis",
            period: "Jun 2024 – Aug 2024",
            loc: "Noida, India",
            color: "#3b82f6",
            bullets: [
                "Developed a sentiment-analysis system using Python, NLP & ML — improved classification by 18% via feature engineering.",
                "Implemented SVM, Decision Tree, PCA-based dimensionality reduction, and clustering for comparative evaluation.",
                "Designed preprocessing pipelines and evaluation workflows enhancing accuracy, stability, and reproducibility.",
            ],
        },
    ],
    projects: [
        {
            name: "InterviewPilot — AI Mock Interview Platform",
            date: "Feb 2026",
            link: "github.com/Adi15Jain",
            tech: [
                "Next.js",
                "Vapi",
                "NeonDB",
                "MediaPipe",
                "Recharts",
                "Prisma",
            ],
            color: "#7c3aed",
            desc: "Full-stack AI mock interview platform with real-time voice interactions, role-specific question generation, MediaPipe behavioral analysis, and a gamified analytics dashboard with global percentile ranks.",
        },
        {
            name: "CoinPush — Crypto Screening App",
            date: "Jan 2026",
            link: "github.com/Adi15Jain",
            tech: ["NextJS", "WebSockets", "SWC", "CoinGecko API", "SWR"],
            color: "#3b82f6",
            desc: "Real-time crypto screening platform with candlestick charts, live WebSocket price updates, and a Cmd+K command-palette with debounced SWR queries — preventing rate-limit issues.",
        },
        {
            name: "PneumoAI — Pneumonia Detection System",
            date: "Jun 2025",
            link: "github.com/Adi15Jain",
            tech: ["Python", "FastAPI", "ReactJS", "CNN", "Vite"],
            color: "#06b6d4",
            desc: "CNN-based classifier achieving 92% accuracy on chest X-ray dataset. FastAPI + React/Vite frontend with response times under 500 ms. Noise-reduction pipeline improved model performance by 12%.",
        },
    ],
    certs: [
        "Data Science Training — EvoAstra Private Ventures Pvt. Ltd. (Dec 2025)",
        "Artificial Intelligence Internship — CETPA Infotech Pvt. Ltd. (Aug 2024)",
        "Python for Data Science & AI — IBM / Coursera (2024)",
        "Machine Learning Specialization — DeepLearning.AI / Coursera (2024)",
        "TensorFlow Developer Certificate — Google / Coursera (2023)",
        "Full Stack Web Development — Udemy (2023)",
    ],
};

/* ─── Token colours (matching portfolio theme) ─────────────── */
const T = {
    bg: "rgb(5,5,15)",
    glass: "rgba(255,255,255,0.04)",
    glassBorder: "rgba(255,255,255,0.09)",
    glassBorderHover: "rgba(124,58,237,0.45)",
    purple: "#7c3aed",
    blue: "#3b82f6",
    purpleLight: "#a78bfa",
    text: "#e2e8f0",
    muted: "#94a3b8",
    faint: "#475569",
};

/* ─── Tiny helpers ─────────────────────────────────────────── */
const GradText = ({ children, style = {} }) => (
    <span
        style={{
            background:
                "linear-gradient(135deg,#ffffff 0%,#a78bfa 55%,#3b82f6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            ...style,
        }}
    >
        {children}
    </span>
);

const Glass = ({ children, style = {}, hover = true }) => {
    const [hov, setHov] = useState(false);
    return (
        <div
            onMouseEnter={() => hover && setHov(true)}
            onMouseLeave={() => hover && setHov(false)}
            style={{
                background: T.glass,
                border: `1px solid ${hov ? T.glassBorderHover : T.glassBorder}`,
                borderRadius: 16,
                backdropFilter: "blur(16px)",
                transition: "border-color .25s, box-shadow .25s",
                boxShadow: hov
                    ? "0 0 28px rgba(124,58,237,.15), 0 8px 32px rgba(0,0,0,.45)"
                    : "0 4px 24px rgba(0,0,0,.35)",
                ...style,
            }}
        >
            {children}
        </div>
    );
};

const Tag = ({ children, color = T.purple }) => (
    <span
        style={{
            fontSize: 11,
            padding: "3px 10px",
            background: `${color}22`,
            border: `1px solid ${color}44`,
            borderRadius: 999,
            color: color,
            fontWeight: 600,
            letterSpacing: ".03em",
            whiteSpace: "nowrap",
        }}
    >
        {children}
    </span>
);

const SectionTitle = ({ Icon, children }) => (
    <div
        style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 20,
            paddingBottom: 12,
            borderBottom: `1px solid ${T.glassBorder}`,
        }}
    >
        {Icon && (
            <Icon
                size={15}
                style={{
                    color: "#a78bfa",
                    flexShrink: 0,
                }}
            />
        )}
        <span
            style={{
                fontSize: 12,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: ".12em",
                background: "linear-gradient(90deg,#a78bfa,#3b82f6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
            }}
        >
            {children}
        </span>
    </div>
);

/* ─── Main component ───────────────────────────────────────── */
export default function ResumeViewer({ onClose }) {
    // phases: opening → open → closing
    const [phase, setPhase] = useState("opening");
    const scrollRef = useRef(null);

    useEffect(() => {
        // Lock body scroll; backdrop overlay handles dim/blur
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    const close = () => setPhase("closing");

    const handleAnimationEnd = () => {
        if (phase === "opening") setPhase("open");
        if (phase === "closing") {
            document.body.style.overflow = "";
            onClose();
        }
    };

    /* ── Keyframes injected once ── */
    useEffect(() => {
        const id = "rv-styles";
        if (document.getElementById(id)) return;
        const s = document.createElement("style");
        s.id = id;
        s.textContent = `
            /* ── Document pickup (open) ──
               Starts flat on the floor (rotateX -65° = lying face-up, zoomed out),
               lifts and rotates to face the camera, fills the screen. */
            @keyframes rv-pickup {
                0%   { opacity:0; transform: perspective(600px) rotateX(-65deg) scale(0.06) translateY(25%); }
                18%  { opacity:1; }
                55%  { transform: perspective(600px) rotateX(-12deg) scale(0.72) translateY(-2%); }
                100% { opacity:1; transform: perspective(600px) rotateX(0deg) scale(1) translateY(0); }
            }
            /* ── Document put-down (close) ── */
            @keyframes rv-putdown {
                0%   { opacity:1; transform: perspective(600px) rotateX(0deg) scale(1) translateY(0); }
                45%  { transform: perspective(600px) rotateX(-12deg) scale(0.72) translateY(-2%); }
                82%  { opacity:0.4; }
                100% { opacity:0; transform: perspective(600px) rotateX(-65deg) scale(0.06) translateY(25%); }
            }
            @keyframes rv-blob{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(40px,-30px) scale(1.12)}66%{transform:translate(-25px,20px) scale(.9)}}
            @keyframes rv-section{from{opacity:0;transform:translateX(-18px)}to{opacity:1;transform:translateX(0)}}
            @keyframes rv-fadeup{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
            .rv-anim{opacity:0;animation:rv-section .55s cubic-bezier(.16,1,.3,1) both}
            .rv-up{opacity:0;animation:rv-fadeup .5s ease both}
            .rv-dot-grid{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(255,255,255,.06) 1px,transparent 1px);background-size:28px 28px;pointer-events:none;z-index:0}
            .rv-scroll::-webkit-scrollbar{width:4px}
            .rv-scroll::-webkit-scrollbar-track{background:transparent}
            .rv-scroll::-webkit-scrollbar-thumb{background:rgba(124,58,237,.4);border-radius:4px}
        `;
        document.head.appendChild(s);
    }, []);

    return (
        <>
            {/* ── Backdrop: appears immediately, fades out on close ── */}
            <div
                style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 9998,
                    background: "rgba(5,5,8,0.82)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    opacity: phase === "closing" ? 0 : 1,
                    transition: "opacity 0.45s ease",
                    pointerEvents: "none",
                }}
            />

            {/* ── Outer viewport container: fixed, NO transform ── */}
            <div
                style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 9999,
                    overflow: "hidden",
                    fontFamily: "'Inter',-apple-system,sans-serif",
                }}
            >
                {/* ── Close button ── */}
                <button
                    onClick={close}
                    style={{
                        position: "absolute",
                        top: 20,
                        right: 24,
                        zIndex: 100,
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,.06)",
                        border: "1px solid rgba(255,255,255,.12)",
                        color: "rgba(255,255,255,.65)",
                        fontSize: 17,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backdropFilter: "blur(12px)",
                        opacity: phase === "open" ? 1 : 0,
                        transition:
                            "opacity 0.3s ease 0.3s, background 0.2s, color 0.2s",
                        pointerEvents: phase === "open" ? "auto" : "none",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(239,68,68,.2)";
                        e.currentTarget.style.color = "#f87171";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                            "rgba(255,255,255,.06)";
                        e.currentTarget.style.color = "rgba(255,255,255,.65)";
                    }}
                    aria-label="Close"
                >
                    <X size={16} />
                </button>

                {/* ── Inner zoom wrapper: FPS pickup animation lives here ── */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background: T.bg,
                        transformOrigin: "78% 75%",
                        /* opening: flat on floor → lifts to fill screen */
                        ...(phase === "opening" && {
                            animation:
                                "rv-pickup 0.78s cubic-bezier(.22,1,.36,1) forwards",
                        }),
                        /* open: settled at full size */
                        ...(phase === "open" && {
                            transform:
                                "perspective(600px) rotateX(0deg) scale(1)",
                            opacity: 1,
                        }),
                        /* closing: drops back to floor */
                        ...(phase === "closing" && {
                            animation:
                                "rv-putdown 0.52s cubic-bezier(.55,0,.6,.4) forwards",
                        }),
                        overflow: "hidden",
                    }}
                    onAnimationEnd={handleAnimationEnd}
                >
                    {/* ─ Background blobs: position:absolute (not fixed) since a transformed
                         parent would break fixed positioning for these too ─ */}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            zIndex: 0,
                            overflow: "hidden",
                            pointerEvents: "none",
                        }}
                    >
                        <div className="rv-dot-grid" />
                        <div
                            style={{
                                position: "absolute",
                                width: 520,
                                height: 520,
                                borderRadius: "50%",
                                background:
                                    "radial-gradient(circle,rgba(124,58,237,.22) 0%,transparent 70%)",
                                top: "-10%",
                                left: "-8%",
                                animation: "rv-blob 12s ease-in-out infinite",
                            }}
                        />
                        <div
                            style={{
                                position: "absolute",
                                width: 420,
                                height: 420,
                                borderRadius: "50%",
                                background:
                                    "radial-gradient(circle,rgba(59,130,246,.18) 0%,transparent 70%)",
                                bottom: "10%",
                                right: "-5%",
                                animation:
                                    "rv-blob 15s ease-in-out infinite 4s",
                            }}
                        />
                        <div
                            style={{
                                position: "absolute",
                                width: 300,
                                height: 300,
                                borderRadius: "50%",
                                background:
                                    "radial-gradient(circle,rgba(6,182,212,.12) 0%,transparent 70%)",
                                top: "55%",
                                left: "40%",
                                animation:
                                    "rv-blob 18s ease-in-out infinite 8s",
                            }}
                        />
                    </div>

                    {/* ─ Scrollable resume content (z-index:1 sits above the absolute background) ─ */}
                    <div
                        ref={scrollRef}
                        className="rv-scroll"
                        style={{
                            position: "absolute",
                            inset: 0,
                            overflowY: "auto",
                            zIndex: 1,
                        }}
                    >
                        {/* ─ Page content ─ */}

                        <div
                            style={{
                                position: "relative",
                                zIndex: 1,
                                maxWidth: 1120,
                                margin: "0 auto",
                                padding: "40px 24px 80px",
                            }}
                        >
                            {/* ════════ HEADER CARD ════════ */}
                            <Glass
                                hover={false}
                                style={{
                                    padding: "36px 40px",
                                    marginBottom: 24,
                                    background:
                                        "linear-gradient(135deg,rgba(30,27,75,.85) 0%,rgba(15,23,42,.92) 60%,rgba(30,58,138,.65) 100%)",
                                    border: "1px solid rgba(124,58,237,.3)",
                                    borderRadius: 24,
                                    boxShadow:
                                        "0 0 60px rgba(124,58,237,.12), 0 24px 60px rgba(0,0,0,.55)",
                                }}
                            >
                                <div
                                    className="rv-anim"
                                    style={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        justifyContent: "space-between",
                                        gap: 24,
                                        flexWrap: "wrap",
                                    }}
                                >
                                    {/* Left: identity */}
                                    <div>
                                        <h1
                                            style={{
                                                margin: "0 0 6px",
                                                fontSize:
                                                    "clamp(32px,5vw,52px)",
                                                fontWeight: 900,
                                                lineHeight: 1,
                                                letterSpacing: "-.03em",
                                            }}
                                        >
                                            <GradText>Adi Jain</GradText>
                                        </h1>
                                        <p
                                            style={{
                                                margin: "0 0 18px",
                                                fontSize: 15,
                                                color: T.muted,
                                                letterSpacing: ".01em",
                                            }}
                                        >
                                            {DATA.title}
                                        </p>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexWrap: "wrap",
                                                gap: 8,
                                            }}
                                        >
                                            {DATA.links.map((l) => (
                                                <span
                                                    key={l.text}
                                                    style={{
                                                        display: "inline-flex",
                                                        alignItems: "center",
                                                        gap: 5,
                                                        fontSize: 11,
                                                        padding: "4px 12px",
                                                        background:
                                                            "rgba(255,255,255,.05)",
                                                        border: "1px solid rgba(255,255,255,.1)",
                                                        borderRadius: 999,
                                                        color: T.muted,
                                                    }}
                                                >
                                                    <l.Icon
                                                        size={11}
                                                        style={{
                                                            flexShrink: 0,
                                                        }}
                                                    />
                                                    {l.href ? (
                                                        <a
                                                            href={l.href}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            style={{
                                                                color: "inherit",
                                                                textDecoration:
                                                                    "none",
                                                            }}
                                                        >
                                                            {l.text}
                                                        </a>
                                                    ) : (
                                                        l.text
                                                    )}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Right: stat cards */}
                                    <div
                                        style={{
                                            display: "grid",
                                            gridTemplateColumns:
                                                "repeat(2,1fr)",
                                            gap: 10,
                                            flexShrink: 0,
                                        }}
                                    >
                                        {DATA.stats.map((s) => (
                                            <div
                                                key={s.l}
                                                style={{
                                                    background:
                                                        "rgba(255,255,255,.04)",
                                                    border: "1px solid rgba(255,255,255,.07)",
                                                    borderRadius: 12,
                                                    padding: "12px 18px",
                                                    textAlign: "center",
                                                    minWidth: 90,
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        fontSize: 22,
                                                        fontWeight: 900,
                                                        background:
                                                            "linear-gradient(135deg,#7c3aed,#3b82f6)",
                                                        WebkitBackgroundClip:
                                                            "text",
                                                        WebkitTextFillColor:
                                                            "transparent",
                                                        backgroundClip: "text",
                                                    }}
                                                >
                                                    {s.n}
                                                </div>
                                                <div
                                                    style={{
                                                        fontSize: 10,
                                                        color: T.faint,
                                                        textTransform:
                                                            "uppercase",
                                                        letterSpacing: ".06em",
                                                        marginTop: 2,
                                                    }}
                                                >
                                                    {s.l}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Glass>

                            {/* ════════ ABOUT ════════ */}
                            <Glass
                                style={{
                                    padding: "22px 28px",
                                    marginBottom: 24,
                                }}
                            >
                                <div
                                    className="rv-anim"
                                    style={{ animationDelay: ".05s" }}
                                >
                                    <SectionTitle Icon={User}>
                                        About
                                    </SectionTitle>
                                    <p
                                        style={{
                                            margin: 0,
                                            fontSize: 13.5,
                                            lineHeight: 1.75,
                                            color: T.muted,
                                        }}
                                    >
                                        {DATA.about}
                                    </p>
                                </div>
                            </Glass>

                            {/* ════════ TWO-COLUMN ════════ */}
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr 340px",
                                    gap: 20,
                                    alignItems: "start",
                                }}
                            >
                                {/* ── LEFT: Experience + Projects ── */}
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 20,
                                    }}
                                >
                                    {/* Experience */}
                                    <Glass style={{ padding: "24px 28px" }}>
                                        <div
                                            className="rv-anim"
                                            style={{ animationDelay: ".1s" }}
                                        >
                                            <SectionTitle Icon={Briefcase}>
                                                Experience
                                            </SectionTitle>
                                            <div
                                                style={{
                                                    position: "relative",
                                                    paddingLeft: 20,
                                                }}
                                            >
                                                {/* timeline line */}
                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        left: 6,
                                                        top: 8,
                                                        bottom: 8,
                                                        width: 2,
                                                        background:
                                                            "linear-gradient(180deg,#7c3aed44,#3b82f644)",
                                                        borderRadius: 2,
                                                    }}
                                                />

                                                {DATA.experience.map(
                                                    (exp, i) => (
                                                        <div
                                                            key={i}
                                                            style={{
                                                                position:
                                                                    "relative",
                                                                marginBottom:
                                                                    i <
                                                                    DATA
                                                                        .experience
                                                                        .length -
                                                                        1
                                                                        ? 28
                                                                        : 0,
                                                            }}
                                                        >
                                                            {/* dot */}
                                                            <div
                                                                style={{
                                                                    position:
                                                                        "absolute",
                                                                    left: -21,
                                                                    top: 4,
                                                                    width: 10,
                                                                    height: 10,
                                                                    borderRadius:
                                                                        "50%",
                                                                    background:
                                                                        exp.color,
                                                                    boxShadow: `0 0 8px ${exp.color}88`,
                                                                }}
                                                            />
                                                            {/* card */}
                                                            <div
                                                                style={{
                                                                    background:
                                                                        "rgba(255,255,255,.025)",
                                                                    border: `1px solid rgba(255,255,255,.06)`,
                                                                    borderRadius: 12,
                                                                    padding:
                                                                        "14px 16px",
                                                                    transition:
                                                                        "border-color .2s",
                                                                }}
                                                                onMouseEnter={(
                                                                    e,
                                                                ) =>
                                                                    (e.currentTarget.style.borderColor = `${exp.color}55`)
                                                                }
                                                                onMouseLeave={(
                                                                    e,
                                                                ) =>
                                                                    (e.currentTarget.style.borderColor =
                                                                        "rgba(255,255,255,.06)")
                                                                }
                                                            >
                                                                <div
                                                                    style={{
                                                                        display:
                                                                            "flex",
                                                                        justifyContent:
                                                                            "space-between",
                                                                        alignItems:
                                                                            "flex-start",
                                                                        gap: 12,
                                                                        flexWrap:
                                                                            "wrap",
                                                                        marginBottom: 10,
                                                                    }}
                                                                >
                                                                    <div>
                                                                        <div
                                                                            style={{
                                                                                fontSize: 14,
                                                                                fontWeight: 700,
                                                                                color: T.text,
                                                                            }}
                                                                        >
                                                                            {
                                                                                exp.role
                                                                            }
                                                                        </div>
                                                                        <div
                                                                            style={{
                                                                                fontSize: 12,
                                                                                color: exp.color,
                                                                                marginTop: 2,
                                                                                fontWeight: 500,
                                                                            }}
                                                                        >
                                                                            {
                                                                                exp.company
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <span
                                                                        style={{
                                                                            fontSize: 11,
                                                                            color: T.faint,
                                                                            background:
                                                                                "rgba(255,255,255,.04)",
                                                                            border: "1px solid rgba(255,255,255,.07)",
                                                                            borderRadius: 999,
                                                                            padding:
                                                                                "3px 10px",
                                                                            whiteSpace:
                                                                                "nowrap",
                                                                        }}
                                                                    >
                                                                        {
                                                                            exp.period
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <ul
                                                                    style={{
                                                                        margin: 0,
                                                                        padding: 0,
                                                                        listStyle:
                                                                            "none",
                                                                        display:
                                                                            "flex",
                                                                        flexDirection:
                                                                            "column",
                                                                        gap: 5,
                                                                    }}
                                                                >
                                                                    {exp.bullets.map(
                                                                        (
                                                                            b,
                                                                            j,
                                                                        ) => (
                                                                            <li
                                                                                key={
                                                                                    j
                                                                                }
                                                                                style={{
                                                                                    fontSize: 12,
                                                                                    color: T.muted,
                                                                                    paddingLeft: 16,
                                                                                    position:
                                                                                        "relative",
                                                                                    lineHeight: 1.65,
                                                                                }}
                                                                            >
                                                                                <span
                                                                                    style={{
                                                                                        position:
                                                                                            "absolute",
                                                                                        left: 0,
                                                                                        color: exp.color,
                                                                                    }}
                                                                                >
                                                                                    ▹
                                                                                </span>
                                                                                {
                                                                                    b
                                                                                }
                                                                            </li>
                                                                        ),
                                                                    )}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    </Glass>

                                    {/* Projects */}
                                    <Glass style={{ padding: "24px 28px" }}>
                                        <div
                                            className="rv-anim"
                                            style={{ animationDelay: ".15s" }}
                                        >
                                            <SectionTitle Icon={Rocket}>
                                                Projects
                                            </SectionTitle>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    gap: 14,
                                                }}
                                            >
                                                {DATA.projects.map((p, i) => (
                                                    <div
                                                        key={i}
                                                        style={{
                                                            background:
                                                                "rgba(255,255,255,.025)",
                                                            border: "1px solid rgba(255,255,255,.06)",
                                                            borderRadius: 12,
                                                            padding:
                                                                "14px 16px",
                                                            transition:
                                                                "border-color .2s, box-shadow .2s",
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.currentTarget.style.borderColor = `${p.color}55`;
                                                            e.currentTarget.style.boxShadow = `0 0 20px ${p.color}14`;
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.style.borderColor =
                                                                "rgba(255,255,255,.06)";
                                                            e.currentTarget.style.boxShadow =
                                                                "none";
                                                        }}
                                                    >
                                                        {/* header */}
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                justifyContent:
                                                                    "space-between",
                                                                alignItems:
                                                                    "center",
                                                                marginBottom: 8,
                                                                gap: 8,
                                                            }}
                                                        >
                                                            <span
                                                                style={{
                                                                    fontSize: 13,
                                                                    fontWeight: 700,
                                                                    color: T.text,
                                                                }}
                                                            >
                                                                {p.name}
                                                            </span>
                                                            {p.link && (
                                                                <span
                                                                    style={{
                                                                        fontSize: 10,
                                                                        color: p.color,
                                                                        opacity: 0.75,
                                                                    }}
                                                                >
                                                                    ↗ {p.link}
                                                                </span>
                                                            )}
                                                        </div>
                                                        {/* accent bar */}
                                                        <div
                                                            style={{
                                                                height: 2,
                                                                width: 40,
                                                                background: `linear-gradient(90deg,${p.color},transparent)`,
                                                                borderRadius: 2,
                                                                marginBottom: 10,
                                                            }}
                                                        />
                                                        {/* tags */}
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                flexWrap:
                                                                    "wrap",
                                                                gap: 5,
                                                                marginBottom: 8,
                                                            }}
                                                        >
                                                            {p.tech.map((t) => (
                                                                <Tag
                                                                    key={t}
                                                                    color={
                                                                        p.color
                                                                    }
                                                                >
                                                                    {t}
                                                                </Tag>
                                                            ))}
                                                        </div>
                                                        <p
                                                            style={{
                                                                margin: 0,
                                                                fontSize: 12,
                                                                color: T.muted,
                                                                lineHeight: 1.65,
                                                            }}
                                                        >
                                                            {p.desc}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </Glass>
                                </div>

                                {/* ── RIGHT: Skills + Certs + Download ── */}
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 20,
                                    }}
                                >
                                    {/* Skills */}
                                    <Glass style={{ padding: "24px 24px" }}>
                                        <div
                                            className="rv-anim"
                                            style={{ animationDelay: ".12s" }}
                                        >
                                            <SectionTitle Icon={Zap}>
                                                Skills
                                            </SectionTitle>
                                            {DATA.skills.map((sk, i) => (
                                                <div
                                                    key={i}
                                                    style={{ marginBottom: 14 }}
                                                >
                                                    <div
                                                        style={{
                                                            fontSize: 10,
                                                            textTransform:
                                                                "uppercase",
                                                            letterSpacing:
                                                                ".08em",
                                                            color: T.faint,
                                                            marginBottom: 7,
                                                            fontWeight: 600,
                                                        }}
                                                    >
                                                        {sk.cat}
                                                    </div>
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            flexWrap: "wrap",
                                                            gap: 5,
                                                        }}
                                                    >
                                                        {sk.items.map(
                                                            (item) => (
                                                                <span
                                                                    key={item}
                                                                    style={{
                                                                        fontSize: 11,
                                                                        padding:
                                                                            "4px 10px",
                                                                        background:
                                                                            "rgba(255,255,255,.04)",
                                                                        border: "1px solid rgba(255,255,255,.08)",
                                                                        borderRadius: 6,
                                                                        color: T.text,
                                                                        cursor: "default",
                                                                        transition:
                                                                            "all .15s",
                                                                    }}
                                                                    onMouseEnter={(
                                                                        e,
                                                                    ) => {
                                                                        e.currentTarget.style.background =
                                                                            "rgba(124,58,237,.14)";
                                                                        e.currentTarget.style.borderColor =
                                                                            "rgba(124,58,237,.35)";
                                                                        e.currentTarget.style.color =
                                                                            T.purpleLight;
                                                                    }}
                                                                    onMouseLeave={(
                                                                        e,
                                                                    ) => {
                                                                        e.currentTarget.style.background =
                                                                            "rgba(255,255,255,.04)";
                                                                        e.currentTarget.style.borderColor =
                                                                            "rgba(255,255,255,.08)";
                                                                        e.currentTarget.style.color =
                                                                            T.text;
                                                                    }}
                                                                >
                                                                    {item}
                                                                </span>
                                                            ),
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </Glass>

                                    {/* Certifications */}
                                    <Glass style={{ padding: "24px 24px" }}>
                                        <div
                                            className="rv-anim"
                                            style={{ animationDelay: ".18s" }}
                                        >
                                            <SectionTitle Icon={Award}>
                                                Certifications
                                            </SectionTitle>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    gap: 7,
                                                }}
                                            >
                                                {DATA.certs.map((c, i) => (
                                                    <div
                                                        key={i}
                                                        style={{
                                                            display: "flex",
                                                            alignItems:
                                                                "flex-start",
                                                            gap: 8,
                                                            fontSize: 12,
                                                            color: T.muted,
                                                            padding: "8px 10px",
                                                            background:
                                                                "rgba(255,255,255,.02)",
                                                            border: "1px solid rgba(255,255,255,.05)",
                                                            borderRadius: 8,
                                                            lineHeight: 1.55,
                                                        }}
                                                    >
                                                        <Award
                                                            size={13}
                                                            style={{
                                                                flexShrink: 0,
                                                                marginTop: 2,
                                                                color: "#a78bfa",
                                                            }}
                                                        />
                                                        {c}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </Glass>

                                    {/* Download */}
                                    <div
                                        className="rv-anim"
                                        style={{ animationDelay: ".22s" }}
                                    >
                                        <a
                                            href="https://github.com/Adi15Jain/NextPortfolio/blob/main/RelatedDocs/AdiJainResume.pdf"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gap: 10,
                                                padding: "14px 20px",
                                                width: "100%",
                                                boxSizing: "border-box",
                                                background:
                                                    "linear-gradient(135deg,#7c3aed,#3b82f6)",
                                                borderRadius: 12,
                                                color: "#fff",
                                                fontSize: 13,
                                                fontWeight: 700,
                                                textDecoration: "none",
                                                letterSpacing: ".02em",
                                                boxShadow:
                                                    "0 4px 20px rgba(124,58,237,.35)",
                                                transition: "all .25s ease",
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform =
                                                    "translateY(-2px)";
                                                e.currentTarget.style.boxShadow =
                                                    "0 8px 30px rgba(124,58,237,.55)";
                                                e.currentTarget.style.filter =
                                                    "brightness(1.08)";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform =
                                                    "translateY(0)";
                                                e.currentTarget.style.boxShadow =
                                                    "0 4px 20px rgba(124,58,237,.35)";
                                                e.currentTarget.style.filter =
                                                    "none";
                                            }}
                                        >
                                            <Download size={15} />
                                            <span>Download PDF Resume</span>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* ── Footer ── */}
                            <div
                                className="rv-anim"
                                style={{
                                    animationDelay: ".28s",
                                    marginTop: 40,
                                    paddingTop: 24,
                                    borderTop: `1px solid ${T.glassBorder}`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 10,
                                    fontSize: 12,
                                    color: T.faint,
                                }}
                            >
                                <span>Adi Jain</span>
                                <span style={{ color: T.glassBorder }}>·</span>
                                <span
                                    style={{
                                        background:
                                            "linear-gradient(90deg,#3b82f6,#7c3aed)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                        fontWeight: 600,
                                    }}
                                >
                                    adijain.dev
                                </span>
                                <span style={{ color: T.glassBorder }}>·</span>
                                <span>{new Date().getFullYear()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
