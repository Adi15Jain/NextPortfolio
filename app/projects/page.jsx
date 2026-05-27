"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import NavBar from "../../src/components/NavBar";
import Footer from "../../src/sections/Footer";
import SpotlightCard from "../../src/components/SpotlightCard";
import { 
    ArrowLeft, 
    ExternalLink, 
    Github, 
    Flame, 
    Cpu, 
    Sparkles, 
    CheckCircle2, 
    ShieldAlert 
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projectsDetailed = [
    {
        id: "interviewpilot",
        title: "InterviewPilot — AI Interview Coach",
        subtitle: "Democratizing high-fidelity professional coaching with interactive, real-time voice & behavioral AI.",
        image: "/images/InterviewPilot.png",
        tags: ["Next.js", "Gemini AI", "Vapi", "Tailwind CSS", "NeonDB"],
        liveUrl: "https://interview-pilot-web.vercel.app/",
        githubUrl: "https://github.com/Adi15Jain/InterviewPilot",
        problem: "Job seekers experience massive anxiety and lack access to realistic, high-pressure mock interviews. Traditional preparation relies on static, generic questions that fail to simulate conversational dynamics. Human coaches are highly expensive, and online portals fail to provide instant, quantitative feedback on voice inflection, behavioral cues, and technical depth.",
        solution: "InterviewPilot bridges this gap by engineering a production-grade, conversational mock interview agent. Users upload role-specific job descriptions, and the system uses Gemini AI to generate custom, context-aware interview boards. Integrated with Vapi, it conducts ultra-low latency voice interviews over WebSockets. It records user telemetry, delivering structured analytics covering sentiment, speech rate, and technical accuracy.",
        usability: "A candidate selects their target job category, starts a real-time voice call, and interacts directly with the AI interviewer. The agent probes deep concepts, adapts dynamically to candidate answers, and provides a quantitative dashboard detailing critical improvements.",
        impact: "Dramatically reduces candidate interview anxiety, builds physiological muscle memory for remote technical tests, and democratizes institutional-grade preparation at zero cost.",
        architecture: "Next.js provides dynamic hydration and SEO optimization. Gemini AI governs adaptive question trees and automated performance grading. Vapi coordinates real-time audio streams, and NeonDB serverless PostgreSQL secures analytic progress pipelines."
    },
    {
        id: "pneumoai",
        title: "PneumoAI — Pneumonia Detection",
        subtitle: "Empowering clinical staff with high-precision computer vision triage for emergency medical imaging.",
        image: "/images/project1.png",
        tags: ["PyTorch", "FastAPI", "React.js", "CNN"],
        liveUrl: "https://www.youtube.com/watch?v=ppJ2CQorY5g",
        githubUrl: "https://github.com/Adi15Jain/pneumoAI",
        problem: "Radiology departments in public clinics face high patient backlogs. Fatigued radiologists must manually examine hundreds of chest X-rays daily under intense pressure. A delay in triaging acute pulmonary infiltration can lead to severe clinical complications, presenting a significant clinical risk.",
        solution: "PneumoAI integrates a custom deep Convolutional Neural Network (CNN) trained on thousands of chest X-ray images, serving as a rapid second-opinion diagnostic support. The clean portal allows emergency nurses to upload X-rays and instantly visualize probability maps highlighting consolidation, congestion, or normality.",
        usability: "Clinical personnel upload high-resolution DICOM or standard imagery at the point of care. The backend processes the tensor array in milliseconds, immediately flagging abnormalities and sorting high-risk patient files to the top of the radiologist's manual review queue.",
        impact: "Shrinks diagnostic triage delays from hours to milliseconds, serves as a powerful medical safety net against human fatigue, and provides automated screening support for rural health centers lacking specialist radiologists.",
        architecture: "PyTorch powers the deep learning training pipeline and local inference engine. FastAPI drives highly concurrent asynchronous image ingestion endpoints, and React maps diagnostic overlays instantly onto clean medical tablet screens."
    },
    {
        id: "coinpush",
        title: "CoinPush — Crypto Screening App",
        subtitle: "Sanitizing volatile market telemetry into actionable, high-performance dashboards.",
        image: "/images/project3.png",
        tags: ["Next.js", "REST API", "SWC", "CoinGecko API"],
        liveUrl: "https://coin-push.vercel.app/",
        githubUrl: "https://github.com/Adi15Jain/CoinPush",
        problem: "Cryptocurrency markets operate continuously, producing an overwhelming torrent of volatile price feeds and trading volumes. Casual traders and investors are flooded with noise, making it extremely difficult to identify breakout categories or trending coins without purchasing expensive institutional terminal licenses.",
        solution: "CoinPush aggregates and structures raw market telemetry into an elegant, high-throughput screening terminal. It consolidates volatile feeds into curated trends, gainers/losers screens, and historical data, making it easy to identify genuine market-moving momentum instantly.",
        usability: "Traders monitor live cryptocurrency movements sorted by volume velocity and trading groups. Users filter global assets by customized parameters and access technical price trends in real-time without refreshing the page.",
        impact: "Saves retail traders hours of manual scanning across fragmented platforms, eliminates expensive data subscription fees, and delivers an intuitive portfolio-monitoring experience.",
        architecture: "Next.js drives static layout caching with dynamic hydration. CoinGecko REST APIs supply high-signal price and historical data, and SWC compilation minimizes interface latency to deliver responsive page interactions."
    }
];

const ProjectsPage = () => {
    const pageRef = useRef(null);
    const titleRef = useRef(null);
    const cardRefs = useRef([]);

    useGSAP(() => {
        // Hero section animations
        gsap.fromTo(
            titleRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );

        // Fade in back button and introduction
        gsap.fromTo(
            ".intro-element",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power2.out", delay: 0.3 }
        );

        // Project cards entrance on scroll
        cardRefs.current.forEach((card) => {
            if (card) {
                gsap.fromTo(
                    card,
                    { opacity: 0, y: 60 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.2,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top bottom -=120",
                            toggleActions: "play none none none"
                        }
                    }
                );
            }
        });
    }, { scope: pageRef });

    return (
        <div ref={pageRef} className="min-h-screen bg-[#030303] text-white flex flex-col font-sans relative overflow-hidden">
            {/* Ambient Background Spotlights */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none -z-10" />
            <div className="absolute top-[30%] right-[-10%] w-[55%] h-[55%] rounded-full bg-purple-500/10 blur-[130px] pointer-events-none -z-10" />
            <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none -z-10" />

            <NavBar />

            {/* Back Button & Title Header */}
            <main className="flex-grow max-w-[1550px] mx-auto px-5 w-full pt-32 pb-24 relative z-20">
                <div className="flex flex-col items-start mb-16">
                    {/* Back to Home Button */}
                    <button
                        onClick={() => window.location.href = "/"}
                        className="intro-element group flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white/80 hover:text-white bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-md cursor-pointer mb-8"
                    >
                        <ArrowLeft size={15} className="transition-transform duration-300 group-hover:-translate-x-1" />
                        <span>Back to Home</span>
                    </button>

                    {/* Dedicated Title */}
                    <div ref={titleRef} className="space-y-4">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-blue-400 bg-blue-400/10 border border-blue-400/20 uppercase">
                            <Sparkles size={11} /> Project Usability & Architecture
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] max-w-4xl bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                            Solving Real-World Problems Through Engineering
                        </h1>
                        <p className="text-slate-400 text-base md:text-lg lg:text-xl max-w-3xl leading-relaxed">
                            Discover the real-life usability, target outcomes, and technical architecture behind my core applications. I build products to solve tangible challenges, ensuring robust performance and modular engineering.
                        </p>
                    </div>
                </div>

                {/* Alternating Project Cards */}
                <div className="space-y-24 md:space-y-32">
                    {projectsDetailed.map((project, index) => {
                        const isEven = index % 2 === 0;
                        return (
                            <SpotlightCard
                                key={project.id}
                                ref={(el) => (cardRefs.current[index] = el)}
                                className="p-6 md:p-8 rounded-[2.5rem] bg-slate-950/20 border border-white/5 backdrop-blur-xl relative overflow-hidden"
                            >
                                <div className={`flex flex-col lg:flex-row gap-8 lg:gap-12 items-center ${isEven ? "" : "lg:flex-row-reverse"}`}>
                                    {/* Column 1: Image Frame */}
                                    <div className="w-full lg:w-[45%] flex flex-col gap-4">
                                        <div className="image-wrapper relative overflow-hidden rounded-2xl w-full aspect-video bg-slate-950/60 border border-white/5 flex items-center justify-center p-2 shadow-2xl group cursor-default">
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-contain rounded-xl transition-transform duration-700 group-hover:scale-[1.02]"
                                            />
                                        </div>

                                        {/* Demo & Repo Links */}
                                        <div className="flex flex-wrap gap-3 mt-1">
                                            {project.liveUrl && (
                                                <a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold text-white transition-all duration-200 hover:scale-105 cursor-pointer shadow-lg hover:shadow-blue-500/20"
                                                    style={{
                                                        background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                                                    }}
                                                >
                                                    <ExternalLink size={14} /> Live Demonstration
                                                </a>
                                            )}
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold text-white transition-all duration-200 hover:scale-105 cursor-pointer border border-white/10 hover:border-white/20 bg-white/5 backdrop-blur-md"
                                            >
                                                <Github size={14} /> Source Repository
                                            </a>
                                        </div>
                                    </div>

                                    {/* Column 2: Detailed Copywriting */}
                                    <div className="w-full lg:w-[55%] space-y-6">
                                        {/* Badges & Header */}
                                        <div className="space-y-2">
                                            <div className="flex flex-wrap gap-2">
                                                {project.tags.map((tag) => (
                                                    <span 
                                                        key={tag} 
                                                        className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-900/60 border border-white/5 text-blue-300/90 tracking-wide uppercase"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
                                                {project.title}
                                            </h2>
                                            <p className="text-slate-400 font-medium text-sm md:text-base leading-relaxed italic border-l-2 border-blue-500/60 pl-3">
                                                {project.subtitle}
                                            </p>
                                        </div>

                                        {/* Core Breakdowns */}
                                        <div className="space-y-5 text-sm md:text-base text-slate-300 leading-relaxed">
                                            {/* Problem */}
                                            <div className="space-y-1 bg-white/[0.01] hover:bg-white/[0.02] border border-white/[0.03] p-4 rounded-xl transition-all duration-300">
                                                <h3 className="font-bold text-white flex items-center gap-2 text-sm md:text-base">
                                                    <ShieldAlert className="text-red-400" size={17} />
                                                    <span>🔴 The Real-World Problem</span>
                                                </h3>
                                                <p className="text-slate-400 pl-6 leading-relaxed">
                                                    {project.problem}
                                                </p>
                                            </div>

                                            {/* Solution & Usability */}
                                            <div className="space-y-1 bg-white/[0.01] hover:bg-white/[0.02] border border-white/[0.03] p-4 rounded-xl transition-all duration-300">
                                                <h3 className="font-bold text-white flex items-center gap-2 text-sm md:text-base">
                                                    <Flame className="text-blue-400" size={17} />
                                                    <span>🚀 Solution & Usability Flow</span>
                                                </h3>
                                                <p className="text-slate-400 pl-6 leading-relaxed">
                                                    {project.solution} <span className="text-slate-300 font-medium">{project.usability}</span>
                                                </p>
                                            </div>

                                            {/* Real-World Impact */}
                                            <div className="space-y-1 bg-white/[0.01] hover:bg-white/[0.02] border border-white/[0.03] p-4 rounded-xl transition-all duration-300">
                                                <h3 className="font-bold text-white flex items-center gap-2 text-sm md:text-base">
                                                    <CheckCircle2 className="text-emerald-400" size={17} />
                                                    <span>💼 Real-Life Usability & Value</span>
                                                </h3>
                                                <p className="text-slate-400 pl-6 leading-relaxed">
                                                    {project.impact}
                                                </p>
                                            </div>

                                            {/* Tech Stack Decisions */}
                                            <div className="space-y-1 bg-white/[0.01] hover:bg-white/[0.02] border border-white/[0.03] p-4 rounded-xl transition-all duration-300">
                                                <h3 className="font-bold text-white flex items-center gap-2 text-sm md:text-base">
                                                    <Cpu className="text-purple-400" size={17} />
                                                    <span>🛠️ Architectural Decisions</span>
                                                </h3>
                                                <p className="text-slate-400 pl-6 leading-relaxed">
                                                    {project.architecture}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SpotlightCard>
                        );
                    })}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProjectsPage;
