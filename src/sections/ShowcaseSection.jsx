"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import TitleHeader from "../components/TitleHeader";
import SpotlightCard from "../components/SpotlightCard";
import { ExternalLink, Github, FolderGit2 } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const projectData = [
    {
        id: "project1",
        title: "InterviewPilot — AI Interview Trainer",
        metric: "< 1s Audio Latency",
        solution:
            "A collaborative app where I engineered the real-time AI audio pipeline and client-side expression telemetry using MediaPipe.",
        image: "/images/interviewPilot.png",
        alt: "InterviewPilot",
        liveUrl: "https://interview-pilot-web.vercel.app/",
        githubUrl: "https://github.com/Adi15Jain/InterviewPilot",
        tags: ["Next.js", "Gemini AI", "Vapi Sockets", "MediaPipe", "NeonDB"],
        featured: true,
    },
    {
        id: "project2",
        title: "PneumoAI — Pneumonia Detection",
        metric: "92.4% Recall Triage",
        solution:
            "A PyTorch Convolutional Neural Network classifier identifying lung consolidation regions to prioritize urgent clinical scans.",
        image: "/images/project1.png",
        alt: "PneumoAI",
        liveUrl: "https://www.youtube.com/watch?v=ppJ2CQorY5g",
        githubUrl: "https://github.com/Adi15Jain/pneumoAI",
        tags: ["PyTorch", "FastAPI", "React.js", "CNN"],
        featured: false,
    },
    {
        id: "project3",
        title: "CoinPush — Crypto Screening App",
        metric: "90% Latency Reduction",
        solution:
            "A real-time cryptocurrency terminal piping live price updates over WebSockets to bypass REST polling limits.",
        image: "/images/project3.png",
        alt: "CoinPush",
        liveUrl: "https://coin-push.vercel.app/",
        githubUrl: "https://github.com/Adi15Jain/CoinPush",
        tags: ["Next.js", "WebSockets", "CoinGecko API", "SWR"],
        featured: false,
    },
];

const TagBadge = ({ text }) => <span className="tech-badge">{text}</span>;

const ShowcaseSection = () => {
    const sectionRef = useRef(null);
    const project1Ref = useRef(null);
    const project2Ref = useRef(null);
    const project3Ref = useRef(null);
    const refs = [project1Ref, project2Ref, project3Ref];

    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = (e) => {
        const scrollLeft = e.target.scrollLeft;
        const width = e.target.clientWidth;
        const index = Math.round(scrollLeft / (width || 1));
        if (index >= 0 && index < projectData.length && index !== activeIndex) {
            setActiveIndex(index);
        }
    };

    useGSAP(() => {
        [project1Ref, project2Ref, project3Ref].forEach((ref, index) => {
            if (!ref.current) return;
            gsap.set(ref.current, { opacity: 0, y: 56 });
            gsap.to(ref.current, {
                opacity: 1,
                y: 0,
                duration: 0.9,
                delay: index * 0.12,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ref.current,
                    start: "top 88%",
                },
            });
        });
    }, []);

    const featured = projectData[0];
    const rest = projectData.slice(1);

    return (
        <section id="work" ref={sectionRef} className="md:mt-32 mt-16 w-full">
            <div className="max-w-[1550px] mx-auto px-5 w-full">
                <TitleHeader
                    title="Highlighted Projects"
                    sub={
                        <span className="flex items-center gap-1.5">
                            <FolderGit2 size={13} className="text-blue-400" />{" "}
                            My Projects
                        </span>
                    }
                />
                <div className="app-showcase">
                    <div className="w-full flex flex-col items-center">
                        {/* Mobile View: Horizontal swipeable projects carousel (visible on mobile, hidden on md+) */}
                        <div
                            className="flex md:hidden overflow-x-auto snap-x snap-mandatory gap-5 w-full pb-4 no-scrollbar scroll-smooth"
                            onScroll={handleScroll}
                        >
                            {projectData.map((project, i) => (
                                <SpotlightCard
                                    key={project.id}
                                    className="w-[85vw] max-w-[340px] shrink-0 snap-center p-5 rounded-2xl flex flex-col justify-between cursor-default border border-white/5 bg-slate-900/40 relative h-[430px]"
                                >
                                    <div className="flex flex-col justify-start gap-4 w-full h-full">
                                        {/* Image Wrapper */}
                                        <div className="relative overflow-hidden rounded-xl bg-slate-950/40 border border-white/5 w-full aspect-[16/10] shrink-0">
                                            <Image
                                                src={project.image}
                                                alt={project.alt}
                                                width={400}
                                                height={250}
                                                className="w-full h-full object-contain rounded-xl"
                                            />
                                        </div>

                                        {/* Text Content */}
                                        <div className="text-content mt-1 flex flex-col gap-2 flex-grow">
                                            <div className="flex justify-between items-center gap-2 flex-wrap">
                                                <div className="badges flex flex-wrap gap-1.5">
                                                    {project.tags
                                                        .slice(0, 3)
                                                        .map((tag) => (
                                                            <TagBadge
                                                                key={tag}
                                                                text={tag}
                                                            />
                                                        ))}
                                                    {project.tags.length >
                                                        3 && (
                                                        <span className="text-[10px] text-white/40 self-center">
                                                            +
                                                            {project.tags
                                                                .length - 3}
                                                        </span>
                                                    )}
                                                </div>
                                                <span
                                                    className={`hidden md:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black border ${
                                                        project.featured
                                                            ? "bg-blue-500/10 border-blue-500/25 text-blue-400"
                                                            : "bg-purple-500/10 border-purple-500/25 text-purple-400"
                                                    }`}
                                                >
                                                    {project.metric}
                                                </span>
                                            </div>
                                            <h1
                                                className={`text-xl font-bold text-white transition-colors duration-300 ${
                                                    project.featured
                                                        ? "group-hover:text-blue-400"
                                                        : "group-hover:text-purple-400"
                                                }`}
                                            >
                                                {project.title.split(" — ")[0]}
                                            </h1>
                                            <p className="text-slate-300 text-xs leading-relaxed line-clamp-3">
                                                {project.solution}
                                            </p>
                                        </div>

                                        {/* Action Buttons Row */}
                                        <div className="flex gap-2.5 pt-2 mt-auto w-full">
                                            {project.liveUrl && (
                                                <a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold text-white transition-all duration-200 hover:scale-105 cursor-pointer shadow-md"
                                                    style={{
                                                        background:
                                                            project.featured
                                                                ? "linear-gradient(135deg, #3b82f6, #8b5cf6)"
                                                                : "linear-gradient(135deg, #a855f7, #ec4899)",
                                                    }}
                                                >
                                                    <ExternalLink size={12} />{" "}
                                                    {project.liveUrl.includes(
                                                        "youtube.com",
                                                    ) ||
                                                    project.liveUrl.includes(
                                                        "youtu.be",
                                                    )
                                                        ? "Video Demo"
                                                        : "Live Demo"}
                                                </a>
                                            )}
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold text-white transition-all duration-200 hover:scale-105 cursor-pointer border border-white/10 hover:border-white/20 bg-white/5 backdrop-blur-md"
                                            >
                                                <Github size={12} /> GitHub
                                            </a>
                                        </div>
                                    </div>
                                </SpotlightCard>
                            ))}
                        </div>

                        {/* Mobile pagination dots indicator */}
                        <div className="flex justify-center gap-2 mt-2 mb-6 md:hidden">
                            {projectData.map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${
                                        activeIndex === i
                                            ? "w-6 bg-blue-500"
                                            : "w-1.5 bg-white/20"
                                    }`}
                                />
                            ))}
                        </div>

                        <div className="showcaselayout hidden md:flex">
                            {/* LEFT: Featured Project */}
                            <SpotlightCard
                                ref={project1Ref}
                                tilt
                                tiltStrength={4}
                                className="first-project-wrapper p-6 rounded-2xl flex flex-col justify-start gap-4 cursor-default group h-fit"
                            >
                                <div className="image-wrapper relative overflow-hidden rounded-xl bg-slate-950/40 border border-white/5 w-full">
                                    <Image
                                        src={featured.image}
                                        alt={featured.alt}
                                        width={800}
                                        height={450}
                                        priority
                                        className="w-full h-auto block object-contain rounded-xl transition-transform duration-700 group-hover:scale-[1.02]"
                                    />
                                </div>

                                <div className="text-content mt-2 space-y-1">
                                    <div className="flex justify-between items-center gap-2 flex-wrap">
                                        <div className="badges flex flex-wrap gap-2">
                                            {featured.tags.map((tag) => (
                                                <TagBadge
                                                    key={tag}
                                                    text={tag}
                                                />
                                            ))}
                                        </div>
                                        <span className="px-3 py-1 rounded-full text-xs font-black bg-blue-500/10 border border-blue-500/25 text-blue-400">
                                            {featured.metric}
                                        </span>
                                    </div>
                                    <h1 className="text-2xl md:text-3xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                                        {featured.title}
                                    </h1>
                                    <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                                        {featured.solution}
                                    </p>

                                    {/* Action Buttons Row */}
                                    <div className="flex gap-3 pt-3">
                                        {featured.liveUrl && (
                                            <a
                                                href={featured.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:scale-105 cursor-pointer shadow-md hover:shadow-blue-500/10"
                                                style={{
                                                    background:
                                                        "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                                                }}
                                            >
                                                <ExternalLink size={14} />{" "}
                                                {featured.liveUrl.includes(
                                                    "youtube.com",
                                                ) ||
                                                featured.liveUrl.includes(
                                                    "youtu.be",
                                                )
                                                    ? "Video Demo"
                                                    : "Live Demo"}
                                            </a>
                                        )}
                                        <a
                                            href={featured.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:scale-105 cursor-pointer border border-white/10 hover:border-white/20 bg-white/5 backdrop-blur-md"
                                        >
                                            <Github size={14} /> GitHub
                                        </a>
                                    </div>
                                </div>
                            </SpotlightCard>

                            {/* RIGHT: Other Projects */}
                            <div className="project-list-wrapper overflow-hidden flex flex-col gap-6 xl:w-[43%]">
                                {rest.map((project, idx) => (
                                    <SpotlightCard
                                        key={project.id}
                                        ref={refs[idx + 1]}
                                        tilt
                                        tiltStrength={5}
                                        className="project p-6 md:p-3 rounded-2xl cursor-default group"
                                    >
                                        {/* Mobile View: stacked layout matching InterviewPilot (visible on mobile, hidden on md+) */}
                                        <div className="flex md:hidden flex-col justify-start gap-4 w-full">
                                            {/* Image Wrapper */}
                                            <div className="relative overflow-hidden rounded-xl bg-slate-950/40 border border-white/5 w-full">
                                                <Image
                                                    src={project.image}
                                                    alt={project.alt}
                                                    width={800}
                                                    height={450}
                                                    className="w-full h-auto block object-contain rounded-xl"
                                                />
                                            </div>

                                            {/* Text Content */}
                                            <div className="text-content mt-2 space-y-3.5 w-full">
                                                <div className="flex justify-between items-center gap-2 flex-wrap">
                                                    <div className="badges flex flex-wrap gap-2">
                                                        {project.tags.map(
                                                            (tag) => (
                                                                <TagBadge
                                                                    key={tag}
                                                                    text={tag}
                                                                />
                                                            ),
                                                        )}
                                                    </div>
                                                    <span className="hidden md:inline-block px-3 py-1 rounded-full text-xs font-black bg-purple-500/10 border border-purple-500/25 text-purple-400">
                                                        {project.metric}
                                                    </span>
                                                </div>
                                                <h1 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                                                    {project.title}
                                                </h1>
                                                <p className="text-slate-300 text-sm leading-relaxed">
                                                    {project.solution}
                                                </p>

                                                {/* Action Buttons Row */}
                                                <div className="flex gap-3 pt-3">
                                                    {project.liveUrl && (
                                                        <a
                                                            href={
                                                                project.liveUrl
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:scale-105 cursor-pointer shadow-md hover:shadow-blue-500/10"
                                                            style={{
                                                                background:
                                                                    "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                                                            }}
                                                        >
                                                            <ExternalLink
                                                                size={14}
                                                            />{" "}
                                                            Live Demo
                                                        </a>
                                                    )}
                                                    <a
                                                        href={project.githubUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:scale-105 cursor-pointer border border-white/10 hover:border-white/20 bg-white/5 backdrop-blur-md"
                                                    >
                                                        <Github size={14} />{" "}
                                                        GitHub
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Desktop View: original absolute aspect-[16/9] overlay (hidden on mobile, visible on md+) */}
                                        <div className="hidden md:block w-full">
                                            <div className="image-wrapper relative overflow-hidden rounded-xl w-full aspect-[16/9] bg-slate-950/80 border border-white/5 flex items-center justify-center">
                                                <Image
                                                    src={project.image}
                                                    alt={project.alt}
                                                    width={500}
                                                    height={280}
                                                    className="w-full h-full object-contain rounded-xl transition-transform duration-700 group-hover:scale-[1.03]"
                                                />

                                                {/* Dynamic Overlay Content: Title & Tags in normal state, Links in hover state */}
                                                <div className="absolute inset-0 rounded-xl z-10 flex flex-col justify-end p-5 transition-all duration-300 bg-gradient-to-t from-black/95 via-black/45 to-transparent group-hover:bg-black/40 group-hover:backdrop-blur-[2px]">
                                                    {/* Normal View: Title, Metric, Solution & Tags */}
                                                    <div className="normal-content transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-4 pointer-events-none w-full">
                                                        <div className="flex justify-between items-start gap-2.5 flex-wrap">
                                                            <h2 className="text-base md:text-lg font-bold text-white leading-tight">
                                                                {project.title}
                                                            </h2>
                                                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-purple-500/10 border border-purple-500/25 text-purple-400">
                                                                {project.metric}
                                                            </span>
                                                        </div>
                                                        <p className="text-slate-300 text-xs md:text-sm leading-relaxed mt-2 mb-3.5">
                                                            {project.solution}
                                                        </p>
                                                        <div className="flex flex-wrap gap-1.5">
                                                            {project.tags.map(
                                                                (tag) => (
                                                                    <TagBadge
                                                                        key={
                                                                            tag
                                                                        }
                                                                        text={
                                                                            tag
                                                                        }
                                                                    />
                                                                ),
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Hover View: Live & GitHub Links */}
                                                    <div className="hover-links absolute inset-0 p-5 flex flex-col justify-center items-center gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20">
                                                        <h2 className="text-base font-bold text-white/90 mb-1 hidden group-hover:block pointer-events-none">
                                                            {project.title}
                                                        </h2>
                                                        <div className="flex gap-2.5">
                                                            {project.liveUrl && (
                                                                <a
                                                                    href={
                                                                        project.liveUrl
                                                                    }
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white transition-all duration-200 hover:scale-105 cursor-pointer shadow-md hover:shadow-blue-500/10"
                                                                    style={{
                                                                        background:
                                                                            "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                                                                    }}
                                                                >
                                                                    <ExternalLink
                                                                        size={
                                                                            12
                                                                        }
                                                                    />{" "}
                                                                    {project.liveUrl.includes(
                                                                        "youtube.com",
                                                                    ) ||
                                                                    project.liveUrl.includes(
                                                                        "youtu.be",
                                                                    )
                                                                        ? "Video Demo"
                                                                        : "Live Demo"}
                                                                </a>
                                                            )}
                                                            <a
                                                                href={
                                                                    project.githubUrl
                                                                }
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white transition-all duration-200 hover:scale-105 cursor-pointer border border-white/10 hover:border-white/20 bg-white/5 backdrop-blur-md"
                                                            >
                                                                <Github
                                                                    size={12}
                                                                />{" "}
                                                                GitHub
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SpotlightCard>
                                ))}
                            </div>
                        </div>

                        {/* Bottom CTA for Dedicated Projects Page */}
                        <div className="flex justify-center relative z-20">
                            <button
                                onClick={() => {
                                    window.location.href = "/projects";
                                }}
                                className="group relative px-8 py-3.5 rounded-full text-sm font-semibold text-white transition-all duration-300 overflow-hidden cursor-pointer"
                                style={{
                                    background: "rgba(255, 255, 255, 0.03)",
                                    border: "1px solid rgba(255, 255, 255, 0.08)",
                                    backdropFilter: "blur(12px)",
                                }}
                            >
                                {/* Glow background effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Border glow */}
                                <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-300 blur-sm -z-10" />

                                <span className="relative z-10 flex items-center gap-2">
                                    View All Projects
                                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                                        →
                                    </span>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ShowcaseSection;
