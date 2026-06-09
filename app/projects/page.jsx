"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import NavBar from "../../src/components/NavBar";
import Footer from "../../src/sections/Footer";
import SpotlightCard from "../../src/components/SpotlightCard";
import Image from "next/image";
import {
    ArrowLeft,
    ExternalLink,
    Github,
    Flame,
    Cpu,
    Sparkles,
    CheckCircle2,
    ShieldAlert,
    Terminal,
    TrendingUp,
    Workflow,
    BookOpen,
    Zap,
    CpuIcon,
    Database,
    Shield,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projectsDetailed = [
    {
        id: "pneumoai",
        phase: "Project 1",
        timelineTitle: "Deep Learning & Applied AI",
        date: "June 2025",
        title: "PneumoAI — Clinical Decision CNN",
        subtitle:
            "High-precision diagnostic triage for emergency lung imaging.",
        image: "/images/project1.png",
        tags: ["PyTorch", "FastAPI", "React.js", "CNN"],
        liveUrl: "https://www.youtube.com/watch?v=ppJ2CQorY5g",
        githubUrl: "https://github.com/Adi15Jain/pneumoAI",
        metricValue: "92%",
        metricLabel: "Diagnostic Accuracy",
        metricSub: "Serves PyTorch model inferences in under 500 milliseconds.",
        problem:
            "Radiology departments face severe backlogs, causing dangerous clinical triage delays.",
        solution:
            "A custom deep CNN flagging consolidation zones instantly to sort high-risk scans.",
        specs: [
            "Clinical DICOM: Rapid medical image format ingestion.",
            "Grad-CAM Maps: Draws high-precision consolidation regions.",
            "Weighted Entropy: Highly balanced predictive accuracy.",
        ],
    },
    {
        id: "algoplus",
        phase: "Project 2",
        timelineTitle: "High-Performance Systems",
        date: "October 2025",
        title: "AlgoPlus — Cinematic DSA Visualizer",
        subtitle: "High-performance hybrid compiled algorithm snapshots.",
        image: null,
        tags: ["C++ Core", "FastAPI", "NextJS", "Framer Motion"],
        liveUrl: null,
        githubUrl: "https://github.com/Adi15Jain/AlgoPlus",
        metricValue: "< 1ms",
        metricLabel: "C++ Snap Speed",
        metricSub:
            "Microsecond snapshot states generated directly via compiled C++ routines.",
        problem:
            "Client-side JS visualizers suffer massive layout lag on large array computations.",
        solution:
            "A fast hybrid engine running compiled routines in C++ with uvicorn FastAPI routes.",
        specs: [
            "C++ Core Engine: Processes recursive snapshots in microseconds.",
            "60fps Animations: Renders visual data changes with zero jank.",
            "Interactive Canvas: Custom graphical graph and tree builders.",
        ],
    },
    {
        id: "coinpush",
        phase: "Project 3",
        timelineTitle: "Real-Time Telemetry Streams",
        date: "January 2026",
        title: "CoinPush — Crypto Screening Terminal",
        subtitle: "Zero-latency real-time cryptocurrency price terminal.",
        image: "/images/project3.png",
        tags: ["Next.js", "WebSockets", "CoinGecko API", "SWR"],
        liveUrl: "https://coin-push.vercel.app/",
        githubUrl: "https://github.com/Adi15Jain/CoinPush",
        metricValue: "90%",
        metricLabel: "Faster Discovery",
        metricSub:
            "Pipes continuous prices via WebSockets, eliminating refresh wait.",
        problem:
            "Traders lose critical windows due to noisy, delayed ticker feeds.",
        solution:
            "A unified market screening terminal using WebSocket telemetry streams and SWR caches.",
        specs: [
            "Resilient Sockets: Features automatic socket reconnection pathways.",
            "SWR Query Cache: Decreases outgoing API loads by over 75%.",
            "Static Caching: Pre-caches layout frames for fast loading.",
        ],
    },
    {
        id: "wealthyminds",
        phase: "Project 4",
        timelineTitle: "Scientific Portfolio Computing",
        date: "February 2026",
        title: "WealthyMinds — AI Wealth Advisor",
        subtitle: "AI investment oracle for long-term wealth creation.",
        image: null,
        tags: ["Next.js 16", "Gemini 2.0 Flash", "Prisma", "Python", "FastAPI"],
        liveUrl: null,
        githubUrl: "https://github.com/Adi15Jain/wealthyminds",
        metricValue: "100%",
        metricLabel: "Offline Math Fallback",
        metricSub:
            "Runs 10,000 compound variance equations locally if backend is down.",
        problem:
            "Casual investors lack entry-level access to rigorous mathematical risk forecasting.",
        solution:
            "AI advisor running stochastic Monte Carlo projections with Gemini 2.0 advisory feedback.",
        specs: [
            "Monte Carlo Math: Fast compound variance calculations in SciPy.",
            "Math Failover: Instant local math equations fallback.",
            "Secure Auth BFF: Route guards protecting server assets.",
        ],
    },
    {
        id: "interviewpilot",
        phase: "Project 5",
        timelineTitle: "Generative Voice & Telemetry",
        date: "March 2026",
        title: "InterviewPilot — Conversational Coach",
        subtitle: "Interactive mock coaching with voice and behavioral AI.",
        image: "/images/interviewPilot.png",
        tags: ["Next.js", "Gemini AI", "Vapi Sockets", "MediaPipe", "NeonDB"],
        liveUrl: "https://interview-pilot-web.vercel.app/",
        githubUrl: "https://github.com/Adi15Jain/InterviewPilot",
        metricValue: "< 1s",
        metricLabel: "Voice Response Delay",
        metricSub:
            "Maintains continuous audio and micro-expression mapping streams.",
        problem:
            "Candidates experience high preparation anxiety practicing mock tests alone.",
        solution:
            "Real-time WebSocket audio coach tracking micro-expressions with MediaPipe.",
        specs: [
            "WebSockets Voice: Real-time verbal feedback pipelines.",
            "Web Workers CV: Offloads webcam telemetry to prevent frame drops.",
            "Radar Analytics: Computes global percentiles using Prisma query aggregates.",
        ],
    },
    {
        id: "vectrion",
        phase: "Project 6",
        timelineTitle: "AI Applications Infrastructure",
        date: "April 2026",
        title: "Vectrion — AI Applications SDK",
        subtitle: "Modular TypeScript infrastructure SDK for AI apps.",
        image: null,
        tags: [
            "TypeScript",
            "Google AI",
            "Ollama",
            "Zod",
            "Vitest",
            "Turborepo",
        ],
        liveUrl: "https://vectrion-docs.adijain.click",
        githubUrl: "https://github.com/Adi15Jain/vectrion",
        metricValue: "0%",
        metricLabel: "Execution Overhead",
        metricSub:
            "Unified adapters, schema validation, and routing with no latency.",
        problem:
            "Developers waste hours duplicating API cost, safety, and routing layers.",
        solution:
            "A composable SDK handling prompts validation, tracing, and local LLM fallbacks.",
        specs: [
            "Onion Middleware: Composable trace pipelines for AI prompts.",
            "Prompt Injection Guard: Scans variables to stop payload overrides.",
            "Local Ollama: Resilient local adapter failover system.",
        ],
    },
    {
        id: "archlens",
        phase: "Project 7",
        timelineTitle: "Architecture Intelligence & Governance",
        date: "May 2026",
        title: "ArchLens — Architecture Intelligence",
        subtitle:
            "Continuous, evidence-based structural governance and dependency graph analysis for software repositories.",
        image: null,
        tags: [
            "TypeScript",
            "Turborepo",
            "Graph Theory",
            "AST Parsing",
            "CI/CD Gates",
        ],
        liveUrl: null,
        githubUrl: "https://github.com/Adi15Jain/archLens",
        metricValue: "0 Cycle",
        metricLabel: "Circular Dependencies",
        metricSub:
            "Enforces strict module decoupling and layer boundaries on every pull request.",
        problem:
            "Software architecture degrades silently, leading to build-time bloat, circular dependency paths, and architectural debt that linters cannot detect.",
        solution:
            "A monorepo-based AST parser and dependency graph builder that enforces module rules and calculates explainable structural health scores.",
        specs: [
            "Dependency Cycles: Deterministic cycle detection across multi-package codebases.",
            "Structural Parsing: Multi-stage AST parser resolving module-level import/export graphs.",
            "Governance Rules: Enforces layer restrictions and score thresholds directly in CI/CD quality gates.",
        ],
    },
    {
        id: "exyst",
        phase: "Project 8",
        timelineTitle: "AI Document Intelligence & RAG",
        date: "June 2026",
        title: "Exyst — AI Exam Intelligence",
        subtitle:
            "Predictive exam analytics engine leveraging LLM-based page classification and ChromaDB semantic RAG pipelines.",
        image: null,
        tags: [
            "Next.js 15",
            "FastAPI",
            "ChromaDB",
            "LiteLLM",
            "Groq",
            "PostgreSQL",
        ],
        liveUrl: null,
        githubUrl: "https://github.com/Adi15Jain/exyst_paper",
        metricValue: "91.4%",
        metricLabel: "Composite Confidence",
        metricSub:
            "Calculates real-time historical alignment, syllabus coverage, and quality check indexes.",
        problem:
            "Students and educators struggle to extract key focal areas from dense, unstructured historical question papers and university syllabi.",
        solution:
            "An intelligent processing pipeline parsing PDFs, classifying sections, indexing question embeddings via ChromaDB, and predicting exam papers.",
        specs: [
            "Multi-Stage PDF Pipeline: Combines pdfminer and PyMuPDF fallback for perfect document intelligence.",
            "Vector RAG Layer: Stores historical question papers in ChromaDB for high-precision semantic recall.",
            "Structured LiteLLM Routing: Features zero-parse-failure Pydantic outputs backed by Groq APIs.",
        ],
    },
];

const RenderVisualCard = ({ id }) => {
    if (id === "algoplus") {
        return (
            <div className="w-full h-full min-h-[200px] bg-slate-950/80 rounded-xl border border-white/5 relative p-4 flex flex-col font-mono text-xs overflow-hidden select-none">
                <div className="flex gap-1.5 items-center pb-2 border-b border-white/5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    <span className="text-[10px] text-white/40 ml-2">
                        algoplus_kernel.cpp
                    </span>
                </div>
                <div className="flex-grow flex flex-col justify-center items-center py-4 relative gap-3">
                    <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                        <svg className="w-full h-full stroke-blue-500/40 stroke-[1.5] fill-none">
                            <path d="M 50,30 L 150,60 L 250,20 M 150,60 L 200,110 L 50,30 M 250,20 L 200,110" />
                            <circle
                                cx="50"
                                cy="30"
                                r="4"
                                className="fill-blue-400"
                            />
                            <circle
                                cx="150"
                                cy="60"
                                r="4"
                                className="fill-purple-400"
                            />
                            <circle
                                cx="250"
                                cy="20"
                                r="4"
                                className="fill-emerald-400"
                            />
                            <circle
                                cx="200"
                                cy="110"
                                r="4"
                                className="fill-blue-400"
                            />
                        </svg>
                    </div>
                    <div className="z-10 flex gap-4 text-[11px] text-blue-400/90 font-semibold bg-blue-500/5 border border-blue-500/10 px-3 py-1.5 rounded-lg shadow-sm backdrop-blur-md">
                        <span>BFS Queue Snap:</span>
                        <span className="text-white">[ 1 → 2 → 5 → 8 ]</span>
                    </div>
                    <div className="z-10 text-[10px] text-white/50 text-center">
                        <span>C++ Binaries generated snapshot array in </span>
                        <span className="text-emerald-400 font-bold">
                            0.08ms
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    if (id === "wealthyminds") {
        return (
            <div className="w-full h-full min-h-[200px] bg-slate-950/80 rounded-xl border border-white/5 relative p-4 flex flex-col font-sans text-xs overflow-hidden select-none">
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                    <span className="text-[10px] font-mono text-white/40">
                        wealth_intelligence_teller
                    </span>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium">
                        Gemini 2.0 Flash
                    </span>
                </div>
                <div className="flex-grow flex flex-col justify-between py-2.5 relative">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                        <svg className="w-full h-full stroke-[2] fill-none">
                            <path
                                d="M 10,105 Q 80,80 160,60 T 320,35"
                                className="stroke-blue-400/70"
                            />
                            <path
                                d="M 10,105 Q 80,60 160,30 T 320,10"
                                className="stroke-emerald-400"
                            />
                        </svg>
                    </div>
                    <div className="z-10 flex flex-col gap-0.5">
                        <span className="text-[10px] text-white/70 font-semibold">
                            Monte Carlo Wealth Projection
                        </span>
                        <span className="text-[8px] text-white/40">
                            10,000 Stochastic Iterations
                        </span>
                    </div>
                    <div className="z-10 flex gap-4 text-[10px] justify-between font-mono bg-white/[0.02] border border-white/5 p-2 rounded-lg backdrop-blur-sm">
                        <div className="flex flex-col">
                            <span className="text-white/40 text-[8px]">
                                90th (Opt)
                            </span>
                            <span className="text-emerald-400 font-bold">
                                +18.4% CAGR
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-white/40 text-[8px]">
                                50th (Exp)
                            </span>
                            <span className="text-blue-400 font-bold">
                                +12.1% CAGR
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-white/40 text-[8px]">
                                10th (Con)
                            </span>
                            <span className="text-red-400 font-bold">
                                +6.2% CAGR
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (id === "vectrion") {
        return (
            <div className="w-full h-full min-h-[200px] bg-slate-950/80 rounded-xl border border-white/5 relative p-4 flex flex-col font-mono text-xs overflow-hidden select-none">
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                    <span className="text-[10px] text-white/40">
                        npm install @vectrion/core
                    </span>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-medium">
                        TS SDK
                    </span>
                </div>
                <div className="flex-grow flex flex-col justify-center py-2.5 relative gap-1.5 font-mono text-[9px]">
                    <div className="text-blue-400">
                        <span className="text-purple-400">import</span> {"{"}{" "}
                        Vectrion {"}"}{" "}
                        <span className="text-purple-400">from</span>{" "}
                        <span className="text-emerald-400">
                            &quot;@vectrion/core&quot;
                        </span>
                        ;
                    </div>
                    <div className="text-white/40">
                        <span className="text-blue-400">const</span> ai ={" "}
                        <span className="text-blue-400">new</span> Vectrion(
                        {"{"} providers: [...] {"}"});
                    </div>
                    <div className="text-blue-400">
                        <span className="text-blue-400">const</span> res ={" "}
                        <span className="text-purple-400">await</span>{" "}
                        ai.generate({"{"}
                        <div className="pl-4 text-white">
                            model:{" "}
                            <span className="text-emerald-400">
                                &quot;gemini-2.0-flash&quot;
                            </span>
                            ,
                        </div>
                        <div className="pl-4 text-white">
                            schema: z.object({"{"} age: z.number() {"}"})
                        </div>
                        {"}"});
                    </div>
                    <div className="text-emerald-400 font-semibold bg-emerald-500/5 border border-emerald-500/10 p-1.5 rounded text-center text-[9px] mt-1">
                        ✔ Validation Schema Verified (0.02ms overhead)
                    </div>
                </div>
            </div>
        );
    }
    if (id === "archlens") {
        return (
            <div className="w-full h-full min-h-[200px] bg-slate-950/80 rounded-xl border border-white/5 relative p-4 flex flex-col font-mono text-xs overflow-hidden select-none">
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                    <span className="text-[10px] text-white/40">
                        archlens analyze .
                    </span>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-medium">
                        L7 Governance
                    </span>
                </div>
                <div className="flex-grow flex flex-col justify-between py-2.5 relative gap-2">
                    <div className="flex flex-col gap-1 text-[9px] z-10">
                        <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded text-emerald-400">
                            <span>L7: Governance / CI Gate</span>
                            <span className="font-bold">✔ PASSED</span>
                        </div>
                        <div className="flex items-center justify-between bg-blue-500/10 border border-blue-500/20 px-2 py-1 rounded text-blue-400">
                            <span>L5: Scoring (Aggregate)</span>
                            <span className="font-bold">94/100 (A)</span>
                        </div>
                        <div className="flex items-center justify-between bg-purple-500/5 border border-purple-500/10 px-2 py-1 rounded text-purple-300">
                            <span>L4: Rules Evaluation</span>
                            <span className="font-bold">0 Violations</span>
                        </div>
                        <div className="flex items-center justify-between bg-white/[0.02] border border-white/5 px-2 py-1 rounded text-white/60">
                            <span>L2: Dependency Graph</span>
                            <span className="font-bold text-emerald-400">
                                0 Cycles
                            </span>
                        </div>
                    </div>
                    <div className="z-10 text-[9px] text-white/30 text-center font-sans">
                        Static dependency cycle checks completed in{" "}
                        <span className="text-purple-400 font-bold">142ms</span>
                    </div>
                </div>
            </div>
        );
    }

    if (id === "exyst") {
        return (
            <div className="w-full h-full min-h-[200px] bg-slate-950/80 rounded-xl border border-white/5 relative p-4 flex flex-col font-mono text-xs overflow-hidden select-none">
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                    <span className="text-[10px] text-white/40">
                        exyst predict --doc exam_pack.pdf
                    </span>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-medium">
                        RAG AI Pipeline
                    </span>
                </div>
                <div className="flex-grow flex flex-col justify-between py-2.5 relative gap-2">
                    {/* Background abstract embedding network */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                        <svg className="w-full h-full stroke-amber-500/50 stroke-[1] fill-none">
                            <path d="M 30,20 L 120,50 L 80,100 L 30,20 M 120,50 L 200,30 L 250,80 M 200,30 L 280,60 L 250,80 M 80,100 L 160,110 L 250,80" />
                            <circle
                                cx="30"
                                cy="20"
                                r="3"
                                className="fill-amber-400"
                            />
                            <circle
                                cx="120"
                                cy="50"
                                r="3"
                                className="fill-blue-400"
                            />
                            <circle
                                cx="80"
                                cy="100"
                                r="3"
                                className="fill-purple-400"
                            />
                            <circle
                                cx="200"
                                cy="30"
                                r="3"
                                className="fill-amber-400"
                            />
                            <circle
                                cx="250"
                                cy="80"
                                r="3"
                                className="fill-emerald-400"
                            />
                            <circle
                                cx="280"
                                cy="60"
                                r="3"
                                className="fill-blue-400"
                            />
                            <circle
                                cx="160"
                                cy="110"
                                r="3"
                                className="fill-purple-400"
                            />
                        </svg>
                    </div>
                    <div className="flex flex-col gap-1.5 text-[9px] z-10">
                        <div className="flex items-center justify-between bg-blue-500/10 border border-blue-500/20 px-2 py-1 rounded text-blue-400">
                            <span>Syllabus Parsing</span>
                            <span className="font-bold">
                                ✔ 12 Units Extracted
                            </span>
                        </div>
                        <div className="flex items-center justify-between bg-purple-500/10 border border-purple-500/20 px-2 py-1 rounded text-purple-400">
                            <span>ChromaDB Vector Match</span>
                            <span className="font-bold">
                                94% Semantic Recall
                            </span>
                        </div>
                        <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded text-emerald-400">
                            <span>Exam Confidence Score</span>
                            <span className="font-bold">
                                91.4% (High Trust)
                            </span>
                        </div>
                    </div>
                    <div className="z-10 text-[9px] text-white/30 text-center font-sans">
                        Predicted 15 questions with structured JSON validation
                        in{" "}
                        <span className="text-amber-400 font-bold">1.2s</span>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

const ProjectsPage = () => {
    const pageRef = useRef(null);
    const titleRef = useRef(null);
    const timelineRef = useRef(null);
    const lineRef = useRef(null);

    // State for interactive mobile accordion and sub-tabs
    const [expandedProjectId, setExpandedProjectId] = useState("pneumoai");
    const [activeMobileTabs, setActiveMobileTabs] = useState({});

    const toggleProject = (projectId) => {
        setExpandedProjectId((prev) => (prev === projectId ? null : projectId));
        setTimeout(() => {
            if (typeof window !== "undefined") {
                ScrollTrigger.refresh();
            }
        }, 150);
    };

    const setMobileTab = (projectId, tab) => {
        setActiveMobileTabs((prev) => ({
            ...prev,
            [projectId]: tab,
        }));
        setTimeout(() => {
            if (typeof window !== "undefined") {
                ScrollTrigger.refresh();
            }
        }, 150);
    };

    // Arrays of refs for animations
    const infoCardRefs = useRef([]);
    const specCardRefs = useRef([]);
    const nodeRefs = useRef([]);
    const mobileCardRefs = useRef([]);

    useGSAP(
        () => {
            // Fade in header elements smoothly
            gsap.fromTo(
                titleRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
            );

            gsap.fromTo(
                ".intro-element",
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power2.out",
                    delay: 0.3,
                },
            );

            // Timeline drawing animation on scroll
            if (lineRef.current) {
                gsap.fromTo(
                    lineRef.current,
                    { height: "0%" },
                    {
                        height: "100%",
                        ease: "none",
                        scrollTrigger: {
                            trigger: timelineRef.current,
                            start: "top center+=100",
                            end: "bottom center+=200",
                            scrub: true,
                        },
                    },
                );
            }

            // Animate Info Cards and Spec Cards upon scroll entering
            infoCardRefs.current.forEach((card, index) => {
                if (card) {
                    const isEven = index % 2 === 0;
                    const xOffset = isEven ? -45 : 45;

                    gsap.fromTo(
                        card,
                        { opacity: 0, x: xOffset, y: 30 },
                        {
                            opacity: 1,
                            x: 0,
                            y: 0,
                            duration: 1,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: card,
                                start: "top bottom-=120",
                                toggleActions: "play none none none",
                            },
                        },
                    );
                }
            });

            specCardRefs.current.forEach((card, index) => {
                if (card) {
                    const isEven = index % 2 === 0;
                    const xOffset = isEven ? 45 : -45;

                    gsap.fromTo(
                        card,
                        { opacity: 0, x: xOffset, y: 30 },
                        {
                            opacity: 1,
                            x: 0,
                            y: 0,
                            duration: 1.1,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: card,
                                start: "top bottom-=120",
                                toggleActions: "play none none none",
                            },
                        },
                    );
                }
            });

            nodeRefs.current.forEach((node) => {
                if (node) {
                    gsap.fromTo(
                        node,
                        { scale: 0, opacity: 0 },
                        {
                            scale: 1,
                            opacity: 1,
                            duration: 0.6,
                            ease: "back.out(1.7)",
                            scrollTrigger: {
                                trigger: node,
                                start: "top bottom-=180",
                                toggleActions: "play none none none",
                            },
                        },
                    );
                }
            });

            mobileCardRefs.current.forEach((card) => {
                if (card) {
                    gsap.fromTo(
                        card,
                        { opacity: 0, y: 30 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: card,
                                start: "top bottom-=120",
                                toggleActions: "play none none none",
                            },
                        },
                    );
                }
            });
        },
        { scope: pageRef },
    );

    return (
        <div
            ref={pageRef}
            className="min-h-screen bg-[#030303] text-white flex flex-col font-sans relative overflow-hidden animate-fade-in"
        >
            {/* Structured Schema Markup (JSON-LD ItemList / SoftwareApplications) */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ItemList",
                        name: "Adi Jain's Project Catalog",
                        description:
                            "Showcase of AI/ML models, deep learning CNNs, and systems engineering frameworks built by Adi Jain.",
                        url: "https://adijain.click/projects",
                        numberOfItems: 8,
                        itemListElement: [
                            {
                                "@type": "ListItem",
                                position: 1,
                                item: {
                                    "@type": "SoftwareApplication",
                                    name: "PneumoAI",
                                    description:
                                        "High-precision diagnostic triage deep CNN for lung imaging.",
                                    applicationCategory: "DeveloperApplication",
                                    operatingSystem: "Web",
                                    url: "https://github.com/Adi15Jain/pneumoAI",
                                },
                            },
                            {
                                "@type": "ListItem",
                                position: 2,
                                item: {
                                    "@type": "SoftwareApplication",
                                    name: "AlgoPlus",
                                    description:
                                        "High-performance compiled C++ algorithm visualizer engine.",
                                    applicationCategory: "DeveloperApplication",
                                    operatingSystem: "Web",
                                    url: "https://github.com/Adi15Jain/AlgoPlus",
                                },
                            },
                            {
                                "@type": "ListItem",
                                position: 3,
                                item: {
                                    "@type": "SoftwareApplication",
                                    name: "CoinPush",
                                    description:
                                        "Zero-latency real-time cryptocurrency WebSocket screening terminal.",
                                    applicationCategory: "DeveloperApplication",
                                    operatingSystem: "Web",
                                    url: "https://coin-push.vercel.app/",
                                },
                            },
                            {
                                "@type": "ListItem",
                                position: 4,
                                item: {
                                    "@type": "SoftwareApplication",
                                    name: "WealthyMinds",
                                    description:
                                        "AI-powered compound variance Monte Carlo projections advisor.",
                                    applicationCategory: "DeveloperApplication",
                                    operatingSystem: "Web",
                                    url: "https://github.com/Adi15Jain/wealthyminds",
                                },
                            },
                            {
                                "@type": "ListItem",
                                position: 5,
                                item: {
                                    "@type": "SoftwareApplication",
                                    name: "InterviewPilot",
                                    description:
                                        "Generative mock coaching platform featuring voice and expression AI.",
                                    applicationCategory: "DeveloperApplication",
                                    operatingSystem: "Web",
                                    url: "https://interview-pilot-web.vercel.app/",
                                },
                            },
                            {
                                "@type": "ListItem",
                                position: 6,
                                item: {
                                    "@type": "SoftwareApplication",
                                    name: "Vectrion",
                                    description:
                                        "Modular TypeScript infrastructure SDK for prompt-tracing and Ollama routes.",
                                    applicationCategory: "DeveloperApplication",
                                    operatingSystem: "Web",
                                    url: "https://vectrion-docs.adijain.click",
                                },
                            },
                            {
                                "@type": "ListItem",
                                position: 7,
                                item: {
                                    "@type": "SoftwareApplication",
                                    name: "ArchLens",
                                    description:
                                        "Evidence-based structural governance and dependency graph analyzer.",
                                    applicationCategory: "DeveloperApplication",
                                    operatingSystem: "Web",
                                    url: "https://github.com/Adi15Jain/archLens",
                                },
                            },
                            {
                                "@type": "ListItem",
                                position: 8,
                                item: {
                                    "@type": "SoftwareApplication",
                                    name: "Exyst",
                                    description:
                                        "AI-powered exam intelligence platform with RAG pipelines and confidence scoring.",
                                    applicationCategory: "DeveloperApplication",
                                    operatingSystem: "Web",
                                    url: "https://github.com/Adi15Jain/exyst_paper",
                                },
                            },
                        ],
                    }),
                }}
            />
            {/* Ambient Background Spotlights */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none -z-10" />
            <div className="absolute top-[30%] right-[-10%] w-[55%] h-[55%] rounded-full bg-purple-500/10 blur-[130px] pointer-events-none -z-10" />
            <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none -z-10" />

            <NavBar />

            <main className="flex-grow max-w-[1550px] mx-auto px-5 w-full pt-32 pb-24 relative z-20">
                {/* Header Section */}
                <div className="flex flex-col items-start mb-16">
                    <button
                        onClick={() => (window.location.href = "/")}
                        className="intro-element group flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white/80 hover:text-white bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-md cursor-pointer mb-8"
                    >
                        <ArrowLeft
                            size={15}
                            className="transition-transform duration-300 group-hover:-translate-x-1"
                        />
                        <span>Back to Home</span>
                    </button>

                    <div ref={titleRef} className="space-y-4">
                        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider text-blue-400 bg-blue-400/10 border border-blue-400/20 uppercase">
                            <Sparkles size={12} /> The Engineering Timeline
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] max-w-4xl bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                            Solving Real-World Challenges Chronologically
                        </h1>
                    </div>
                </div>

                {/* TIMELINE SECTION */}
                <div ref={timelineRef} className="relative w-full mt-24">
                    {/* Central vertical line on desktop, left vertical line on mobile */}
                    <div className="absolute left-[30px] lg:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2 pointer-events-none z-10">
                        <div
                            ref={lineRef}
                            className="w-full bg-gradient-to-b from-blue-500 via-purple-500 to-emerald-500 rounded-full"
                            style={{ height: "0%" }}
                        />
                    </div>

                    <div className="space-y-20 lg:space-y-32">
                        {projectsDetailed.map((project, index) => {
                            const isEven = index % 2 === 0;

                            const infoCardComponent = (
                                <SpotlightCard
                                    ref={(el) =>
                                        (infoCardRefs.current[index] = el)
                                    }
                                    className="w-full max-w-[620px] p-6 md:p-8 rounded-[2.5rem] bg-slate-950/20 border border-white/5 backdrop-blur-xl hover:border-blue-500/25 transition-all duration-500 relative flex flex-col gap-6.5 shadow-2xl hover:shadow-blue-900/5"
                                >
                                    {/* Mini Phase header */}
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs md:text-sm font-bold tracking-widest uppercase text-blue-400/90">
                                            {project.phase} &bull;{" "}
                                            {project.timelineTitle}
                                        </span>
                                        <span className="lg:hidden text-xs font-bold text-slate-500/90">
                                            {project.date}
                                        </span>
                                    </div>

                                    <div className="space-y-5.5">
                                        <div>
                                            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">
                                                {project.title}
                                            </h2>
                                            <p className="text-slate-300 font-medium text-sm md:text-base leading-relaxed mt-2.5 italic border-l-2 border-blue-500/60 pl-3.5">
                                                {project.subtitle}
                                            </p>
                                        </div>

                                        {/* High-visibility Metrics Panel */}
                                        <div
                                            className="flex items-center gap-5 p-5 rounded-2xl border border-white/[0.04] backdrop-blur-md"
                                            style={{
                                                background:
                                                    "rgba(255, 255, 255, 0.01)",
                                            }}
                                        >
                                            <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent tracking-tight">
                                                {project.metricValue}
                                            </div>
                                            <div className="flex-grow">
                                                <div className="text-xs font-bold uppercase tracking-wider text-slate-200">
                                                    {project.metricLabel}
                                                </div>
                                                <div className="text-xs md:text-sm text-slate-400 leading-normal mt-0.5">
                                                    {project.metricSub}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Concise Copywriting Section */}
                                        <div className="space-y-4.5 text-sm md:text-base text-slate-300 leading-relaxed pt-1">
                                            <div className="flex items-start gap-3">
                                                <ShieldAlert
                                                    className="text-red-400 flex-shrink-0 mt-0.5"
                                                    size={18}
                                                />
                                                <div>
                                                    <span className="font-bold text-white text-xs md:text-sm block uppercase tracking-wider text-red-300/90 mb-1">
                                                        The Real-World Problem
                                                    </span>
                                                    <p className="text-slate-400 leading-relaxed">
                                                        {project.problem}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <Flame
                                                    className="text-emerald-400 flex-shrink-0 mt-0.5"
                                                    size={18}
                                                />
                                                <div>
                                                    <span className="font-bold text-white text-xs md:text-sm block uppercase tracking-wider text-emerald-300/90 mb-1">
                                                        The Engineering Solution
                                                    </span>
                                                    <p className="text-slate-400 leading-relaxed">
                                                        {project.solution}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Tags Badging */}
                                        <div className="flex flex-wrap gap-2 pt-3.5">
                                            {project.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-3 py-1 rounded-full text-xs font-bold bg-slate-900/80 border border-white/5 text-blue-300/80 uppercase tracking-wider"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-3 pt-4.5">
                                            {project.liveUrl && (
                                                <a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 px-5 py-3 rounded-full text-xs md:text-sm font-bold text-white transition-all duration-200 hover:scale-105 cursor-pointer shadow-md hover:shadow-blue-500/10"
                                                    style={{
                                                        background:
                                                            "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                                                    }}
                                                >
                                                    {project.id ===
                                                    "vectrion" ? (
                                                        <BookOpen size={14} />
                                                    ) : (
                                                        <ExternalLink
                                                            size={14}
                                                        />
                                                    )}
                                                    <span>
                                                        {project.id === "vectrion"
                                                            ? "Documentation"
                                                            : (project.liveUrl.includes("youtube.com") || project.liveUrl.includes("youtu.be")
                                                                ? "Video Demonstration"
                                                                : "Live Demonstration")}
                                                    </span>
                                                </a>
                                            )}
                                            {project.githubUrl && (
                                                <a
                                                    href={project.githubUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 px-5 py-3 rounded-full text-xs md:text-sm font-bold text-white transition-all duration-200 hover:scale-105 cursor-pointer border border-white/10 hover:border-white/20 bg-white/5 backdrop-blur-md"
                                                >
                                                    <Github size={14} />
                                                    <span>
                                                        Source Repository
                                                    </span>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </SpotlightCard>
                            );

                            const specCardComponent = (
                                <SpotlightCard
                                    ref={(el) =>
                                        (specCardRefs.current[index] = el)
                                    }
                                    className="w-full max-w-[620px] p-6 md:p-8 rounded-[2.5rem] bg-slate-950/20 border border-white/5 backdrop-blur-xl hover:border-blue-500/25 transition-all duration-500 relative flex flex-col gap-6 shadow-2xl justify-between"
                                >
                                    {/* Spec Header */}
                                    <div className="flex items-center gap-2.5 text-xs font-bold tracking-widest uppercase text-purple-400">
                                        <CpuIcon
                                            size={14}
                                            className="text-purple-400"
                                        />
                                        <span>System Architecture & Specs</span>
                                    </div>

                                    {/* Visual Representation Frame */}
                                    <div className="w-full">
                                        {project.image ? (
                                            <div className="image-wrapper relative overflow-hidden rounded-xl w-full aspect-[16/9] bg-slate-950/60 border border-white/5 flex items-center justify-center p-2 shadow-inner">
                                                <Image
                                                    src={project.image}
                                                    alt={project.title}
                                                    width={500}
                                                    height={280}
                                                    className="w-full h-full object-contain rounded-lg"
                                                />
                                            </div>
                                        ) : (
                                            <RenderVisualCard id={project.id} />
                                        )}
                                    </div>

                                    {/* Architectural Specs List */}
                                    <div className="space-y-4 pt-2.5">
                                        <span className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-widest block">
                                            Technical Milestones
                                        </span>
                                        <ul className="space-y-3.5 text-sm text-slate-300">
                                            {project.specs.map((spec, sIdx) => {
                                                const [specTitle, specDesc] =
                                                    spec.split(": ");
                                                return (
                                                    <li
                                                        key={sIdx}
                                                        className="flex items-start gap-3 bg-white/[0.01] hover:bg-white/[0.02] border border-white/[0.02] p-3 rounded-xl transition-colors duration-300"
                                                    >
                                                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
                                                        <div>
                                                            <span className="font-bold text-white block text-xs md:text-sm tracking-wide">
                                                                {specTitle}
                                                            </span>
                                                            <span className="text-slate-400 text-xs md:text-sm leading-relaxed mt-0.5 block">
                                                                {specDesc}
                                                            </span>
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </SpotlightCard>
                            );

                            return (
                                <div
                                    key={project.id}
                                    className="relative w-full"
                                >
                                    {/* Timeline Node Point Indicator */}
                                    <div
                                        ref={(el) =>
                                            (nodeRefs.current[index] = el)
                                        }
                                        className="absolute left-[30px] lg:left-1/2 top-10 lg:top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center pointer-events-none"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-[#030303] border-2 border-slate-800 flex items-center justify-center relative shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                                            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse" />
                                            {/* Date bubble showing timeline phase */}
                                            <span className="hidden lg:block absolute left-12 whitespace-nowrap px-3.5 py-1 rounded-full text-xs font-bold tracking-widest text-slate-400 uppercase bg-slate-950 border border-white/5 shadow-md">
                                                {project.date}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Desktop: Filled Grid Layout utilizing both left and right sides */}
                                    <div className="hidden lg:grid grid-cols-2 gap-16 w-full items-stretch relative">
                                        {/* Left Column */}
                                        <div className="w-full pr-16 flex justify-end">
                                            {isEven
                                                ? infoCardComponent
                                                : specCardComponent}
                                        </div>

                                        {/* Right Column */}
                                        <div className="w-full pl-16 flex justify-start">
                                            {isEven
                                                ? specCardComponent
                                                : infoCardComponent}
                                        </div>
                                    </div>

                                    {/* Mobile: Interactive Collapsible Timeline Card */}
                                    <div
                                        ref={(el) =>
                                            (mobileCardRefs.current[index] = el)
                                        }
                                        className="lg:hidden pl-12 md:pl-16 w-full"
                                    >
                                        <SpotlightCard
                                            className={`w-full p-5 rounded-[2rem] bg-slate-950/20 border border-white/5 backdrop-blur-xl transition-all duration-300 relative flex flex-col gap-4 shadow-2xl hover:border-blue-500/20 ${expandedProjectId === project.id ? "border-white/10 shadow-blue-900/5" : ""}`}
                                        >
                                            {/* Clickable Header for Collapsing/Expanding */}
                                            <div
                                                onClick={() =>
                                                    toggleProject(project.id)
                                                }
                                                className="flex flex-col gap-2 cursor-pointer select-none"
                                            >
                                                <div className="flex justify-between items-center w-full">
                                                    <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-blue-400/90">
                                                        {project.phase} &bull;{" "}
                                                        {project.date}
                                                    </span>

                                                    {/* Expand / Collapse Chevron Indicator */}
                                                    <div className="text-white/60 hover:text-white transition-colors duration-200">
                                                        {expandedProjectId ===
                                                        project.id ? (
                                                            <svg
                                                                className="w-4 h-4 transform rotate-180 transition-transform duration-300"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={
                                                                        2.5
                                                                    }
                                                                    d="M5 15l7-7 7 7"
                                                                />
                                                            </svg>
                                                        ) : (
                                                            <svg
                                                                className="w-4 h-4 transition-transform duration-300"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={
                                                                        2.5
                                                                    }
                                                                    d="M19 9l-7 7-7-7"
                                                                />
                                                            </svg>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="flex justify-between items-start gap-3">
                                                    <h2 className="text-lg md:text-xl font-black text-white tracking-tight leading-snug">
                                                        {project.title}
                                                    </h2>

                                                    {/* Metric pill (compact preview) when collapsed */}
                                                    {expandedProjectId !==
                                                        project.id && (
                                                        <span className="flex-shrink-0 text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono">
                                                            {
                                                                project.metricValue
                                                            }
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Short subtitle preview when collapsed */}
                                                {expandedProjectId !==
                                                    project.id && (
                                                    <p className="text-xs text-slate-400 font-medium line-clamp-1 italic pl-2 border-l border-blue-500/30">
                                                        {project.subtitle}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Expanded Body Content */}
                                            {expandedProjectId ===
                                                project.id && (
                                                <div className="flex flex-col gap-4 animate-fade-in pt-2 border-t border-white/5">
                                                    {/* Tab Switcher */}
                                                    <div className="flex bg-slate-950/60 rounded-xl p-1 border border-white/[0.04]">
                                                        <button
                                                            onClick={() =>
                                                                setMobileTab(
                                                                    project.id,
                                                                    "overview",
                                                                )
                                                            }
                                                            className={`flex-1 py-2 text-center rounded-lg text-xs font-bold transition-all duration-300 cursor-pointer ${
                                                                (activeMobileTabs[
                                                                    project.id
                                                                ] ||
                                                                    "overview") ===
                                                                "overview"
                                                                    ? "bg-white/10 text-white shadow-sm"
                                                                    : "text-slate-400 hover:text-white"
                                                            }`}
                                                        >
                                                            Overview
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                setMobileTab(
                                                                    project.id,
                                                                    "specs",
                                                                )
                                                            }
                                                            className={`flex-1 py-2 text-center rounded-lg text-xs font-bold transition-all duration-300 cursor-pointer ${
                                                                (activeMobileTabs[
                                                                    project.id
                                                                ] ||
                                                                    "overview") ===
                                                                "specs"
                                                                    ? "bg-white/10 text-white shadow-sm"
                                                                    : "text-slate-400 hover:text-white"
                                                            }`}
                                                        >
                                                            System Specs
                                                        </button>
                                                    </div>

                                                    {/* Subtitle (fully visible when expanded) */}
                                                    <p className="text-xs md:text-sm text-slate-300 font-medium italic border-l-2 border-blue-500/60 pl-3 leading-relaxed">
                                                        {project.subtitle}
                                                    </p>

                                                    {/* TAB 1: Overview */}
                                                    {(activeMobileTabs[
                                                        project.id
                                                    ] || "overview") ===
                                                        "overview" && (
                                                        <div className="flex flex-col gap-4 animate-fade-in">
                                                            {/* High-visibility Metrics Panel */}
                                                            <div
                                                                className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.04] backdrop-blur-md"
                                                                style={{
                                                                    background:
                                                                        "rgba(255, 255, 255, 0.01)",
                                                                }}
                                                            >
                                                                <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent tracking-tight font-mono">
                                                                    {
                                                                        project.metricValue
                                                                    }
                                                                </div>
                                                                <div className="flex-grow">
                                                                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-200">
                                                                        {
                                                                            project.metricLabel
                                                                        }
                                                                    </div>
                                                                    <div className="text-[11px] text-slate-400 leading-tight mt-0.5">
                                                                        {
                                                                            project.metricSub
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Problem & Solution copy */}
                                                            <div className="flex flex-col gap-3.5 text-xs text-slate-300 leading-relaxed">
                                                                <div className="flex items-start gap-2.5">
                                                                    <ShieldAlert
                                                                        className="text-red-400 flex-shrink-0 mt-0.5"
                                                                        size={
                                                                            15
                                                                        }
                                                                    />
                                                                    <div>
                                                                        <span className="font-bold text-white text-[10px] block uppercase tracking-wider text-red-300/90 mb-0.5">
                                                                            The
                                                                            Real-World
                                                                            Problem
                                                                        </span>
                                                                        <p className="text-slate-400 leading-relaxed">
                                                                            {
                                                                                project.problem
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-start gap-2.5">
                                                                    <Flame
                                                                        className="text-emerald-400 flex-shrink-0 mt-0.5"
                                                                        size={
                                                                            15
                                                                        }
                                                                    />
                                                                    <div>
                                                                        <span className="font-bold text-white text-[10px] block uppercase tracking-wider text-emerald-300/90 mb-0.5">
                                                                            The
                                                                            Engineering
                                                                            Solution
                                                                        </span>
                                                                        <p className="text-slate-400 leading-relaxed">
                                                                            {
                                                                                project.solution
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Tech tags */}
                                                            <div className="flex flex-wrap gap-1.5 pt-1.5">
                                                                {project.tags.map(
                                                                    (tag) => (
                                                                        <span
                                                                            key={
                                                                                tag
                                                                            }
                                                                            className="px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-slate-900/80 border border-white/5 text-blue-300/80 uppercase tracking-wider"
                                                                        >
                                                                            {
                                                                                tag
                                                                            }
                                                                        </span>
                                                                    ),
                                                                )}
                                                            </div>

                                                            {/* Action buttons */}
                                                            <div className="flex gap-2.5 pt-2">
                                                                {project.liveUrl && (
                                                                    <a
                                                                        href={
                                                                            project.liveUrl
                                                                        }
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold text-white transition-all duration-200 hover:scale-[1.02] cursor-pointer shadow-md"
                                                                        style={{
                                                                            background:
                                                                                "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                                                                        }}
                                                                    >
                                                                        {project.id ===
                                                                        "vectrion" ? (
                                                                            <BookOpen
                                                                                size={
                                                                                    12
                                                                                }
                                                                            />
                                                                        ) : (
                                                                            <ExternalLink
                                                                                size={
                                                                                    12
                                                                                }
                                                                            />
                                                                        )}
                                                                        <span>
                                                                            {project.id === "vectrion"
                                                                                ? "Docs"
                                                                                : (project.liveUrl.includes("youtube.com") || project.liveUrl.includes("youtu.be")
                                                                                    ? "Video Demo"
                                                                                    : "Live Demo")}
                                                                        </span>
                                                                    </a>
                                                                )}
                                                                {project.githubUrl && (
                                                                    <a
                                                                        href={
                                                                            project.githubUrl
                                                                        }
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold text-white transition-all duration-200 hover:scale-[1.02] cursor-pointer border border-white/10 hover:border-white/20 bg-white/5 backdrop-blur-md"
                                                                    >
                                                                        <Github
                                                                            size={
                                                                                12
                                                                            }
                                                                        />
                                                                        <span>
                                                                            Source
                                                                            Code
                                                                        </span>
                                                                    </a>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* TAB 2: System Specs */}
                                                    {(activeMobileTabs[
                                                        project.id
                                                    ] || "overview") ===
                                                        "specs" && (
                                                        <div className="flex flex-col gap-4 animate-fade-in">
                                                            {/* System Specs Header */}
                                                            <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-purple-400">
                                                                <CpuIcon
                                                                    size={12}
                                                                    className="text-purple-400"
                                                                />
                                                                <span>
                                                                    System
                                                                    Architecture
                                                                    & Specs
                                                                </span>
                                                            </div>

                                                            {/* Visual Frame */}
                                                            <div className="w-full">
                                                                {project.image ? (
                                                                    <div className="image-wrapper relative overflow-hidden rounded-xl w-full aspect-[16/9] bg-slate-950/60 border border-white/5 flex items-center justify-center p-1 shadow-inner">
                                                                        <Image
                                                                            src={
                                                                                project.image
                                                                            }
                                                                            alt={
                                                                                project.title
                                                                            }
                                                                            width={
                                                                                400
                                                                            }
                                                                            height={
                                                                                225
                                                                            }
                                                                            className="w-full h-full object-contain rounded-lg"
                                                                        />
                                                                    </div>
                                                                ) : (
                                                                    <RenderVisualCard
                                                                        id={
                                                                            project.id
                                                                        }
                                                                    />
                                                                )}
                                                            </div>

                                                            {/* Milestones list */}
                                                            <div className="space-y-2 pt-1">
                                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                                                                    Technical
                                                                    Milestones
                                                                </span>
                                                                <ul className="space-y-2 text-xs text-slate-300">
                                                                    {project.specs.map(
                                                                        (
                                                                            spec,
                                                                            sIdx,
                                                                        ) => {
                                                                            const [
                                                                                specTitle,
                                                                                specDesc,
                                                                            ] =
                                                                                spec.split(
                                                                                    ": ",
                                                                                );
                                                                            return (
                                                                                <li
                                                                                    key={
                                                                                        sIdx
                                                                                    }
                                                                                    className="flex items-start gap-2 bg-white/[0.01] border border-white/[0.02] p-2.5 rounded-xl"
                                                                                >
                                                                                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 flex-shrink-0" />
                                                                                    <div>
                                                                                        <span className="font-bold text-white block text-[11px] tracking-wide">
                                                                                            {
                                                                                                specTitle
                                                                                            }
                                                                                        </span>
                                                                                        <span className="text-slate-400 text-[11px] leading-normal mt-0.5 block">
                                                                                            {
                                                                                                specDesc
                                                                                            }
                                                                                        </span>
                                                                                    </div>
                                                                                </li>
                                                                            );
                                                                        },
                                                                    )}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </SpotlightCard>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProjectsPage;
