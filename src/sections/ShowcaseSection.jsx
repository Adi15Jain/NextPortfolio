"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import TitleHeader from "../components/TitleHeader";
import SpotlightCard from "../components/SpotlightCard";
import { ExternalLink, Github, FolderGit2 } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const projectData = [
    {
        id: "project1",
        title: "InterviewPilot — AI Interview Coach",
        description:
            "An AI-powered mock interview coach simulating technical and behavioural interviews. Generates role-specific questions using Gemini AI, records video responses, and delivers instant, detailed feedback on answer quality, confidence, and clarity.",
        image: "/images/interviewPilot.png",
        alt: "InterviewPilot",
        liveUrl: "https://interview-pilot-web.vercel.app/",
        githubUrl: "https://github.com/Adi15Jain/InterviewPilot",
        tags: ["Next.Js", "Gemini AI", "Vapi", "Tailwind CSS", "NeonDB"],
        featured: true,
    },
    {
        id: "project2",
        title: "PneumoAI — Pneumonia Detection",
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
        image: "/images/project3.png",
        alt: "CoinPush",
        liveUrl: "https://coin-push.vercel.app/",
        githubUrl: "https://github.com/Adi15Jain/CoinPush",
        tags: ["Next.Js", "REST API", "SWC", "CoinGecko API"],
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

    useGSAP(() => {
        [project1Ref, project2Ref, project3Ref].forEach((ref, index) => {
            gsap.fromTo(
                ref.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    delay: 0.3 * (index + 1),
                    scrollTrigger: {
                        trigger: ref.current,
                        start: "top bottom -=100",
                    },
                },
            );
        });
        gsap.fromTo(
            sectionRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1.5 },
        );
    }, []);

    const featured = projectData[0];
    const rest = projectData.slice(1);

    return (
        <section id="work" ref={sectionRef} className="mt-32 w-full">
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
                        <div className="showcaselayout">
                            {/* LEFT: Featured Project */}
                            <SpotlightCard
                                ref={project1Ref}
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

                                <div className="text-content mt-2 space-y-3">
                                    <div className="badges flex flex-wrap gap-2">
                                        {featured.tags.map((tag) => (
                                            <TagBadge key={tag} text={tag} />
                                        ))}
                                    </div>
                                    <h1 className="text-2xl md:text-3xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                                        {featured.title}
                                    </h1>
                                    <p className="text-white/60 text-sm md:text-base leading-relaxed">
                                        {featured.description}
                                    </p>

                                    {/* Action Buttons Row */}
                                    <div className="flex gap-3 pt-3">
                                        {featured.liveUrl && (
                                            <a
                                                href={featured.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:scale-105 cursor-pointer"
                                                style={{
                                                    background:
                                                        "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                                                }}
                                            >
                                                <ExternalLink size={14} /> Live
                                                Demo
                                            </a>
                                        )}
                                        <a
                                            href={featured.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:scale-105 cursor-pointer"
                                            style={{
                                                background:
                                                    "rgba(255,255,255,0.06)",
                                                border: "1px solid rgba(255,255,255,0.15)",
                                                backdropFilter: "blur(8px)",
                                            }}
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
                                        className="project p-3 rounded-2xl cursor-default group"
                                    >
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
                                                {/* Normal View: Title & Tags */}
                                                <div className="normal-content transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-4 pointer-events-none">
                                                    <h2 className="text-lg md:text-xl font-bold text-white mb-2 leading-tight">
                                                        {project.title}
                                                    </h2>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {project.tags.map(
                                                            (tag) => (
                                                                <TagBadge
                                                                    key={tag}
                                                                    text={tag}
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
                                                                className="flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white transition-all duration-200 hover:scale-105 cursor-pointer"
                                                                style={{
                                                                    background:
                                                                        "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                                                                }}
                                                            >
                                                                <ExternalLink
                                                                    size={12}
                                                                />{" "}
                                                                Live Demo
                                                            </a>
                                                        )}
                                                        <a
                                                            href={
                                                                project.githubUrl
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white transition-all duration-200 hover:scale-105 cursor-pointer"
                                                            style={{
                                                                background:
                                                                    "rgba(255,255,255,0.1)",
                                                                border: "1px solid rgba(255,255,255,0.2)",
                                                                backdropFilter:
                                                                    "blur(8px)",
                                                            }}
                                                        >
                                                            <Github size={12} />{" "}
                                                            GitHub
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SpotlightCard>
                                ))}
                            </div>
                        </div>

                        {/* Bottom CTA for Dedicated Projects Page */}
                        <div className="flex justify-center mt-14 relative z-20">
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
