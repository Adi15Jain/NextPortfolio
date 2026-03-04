"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import TitleHeader from "../components/TitleHeader";

gsap.registerPlugin(ScrollTrigger);

const projectData = [
    {
        id: "project1",
        title: "InterviewPilot — AI Interview Coach",
        description:
            "An AI-powered mock interview platform that simulates real technical and behavioural interviews. Generates role-specific questions using Google Gemini, records video responses, and delivers instant AI feedback on answer quality, confidence, and clarity — helping candidates prep smarter, not harder.",
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
        description:
            "Full-stack deep learning app that diagnoses pneumonia from chest X-rays using a custom CNN built with PyTorch.",
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
        <section id="work" ref={sectionRef} className="mt-32">
            <TitleHeader title="Highlighted Projects" sub="🚀 My Projects" />
            <div className="app-showcase">
                <div className="showcaselayout">
                    {/* LEFT: Featured Project */}
                    <div className="first-project-wrapper" ref={project1Ref}>
                        <div className="image-wrapper group">
                            <img src={featured.image} alt={featured.alt} />

                            {/* Hover overlay */}
                            <div
                                className="project-overlay"
                                style={{
                                    background:
                                        "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
                                }}
                            >
                                <div className="flex gap-3">
                                    {featured.liveUrl && (
                                        <a
                                            href={featured.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:scale-105"
                                            style={{
                                                background:
                                                    "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                                            }}
                                        >
                                            🔗 Live
                                        </a>
                                    )}
                                    <a
                                        href={featured.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:scale-105"
                                        style={{
                                            background: "rgba(255,255,255,0.1)",
                                            border: "1px solid rgba(255,255,255,0.2)",
                                            backdropFilter: "blur(8px)",
                                        }}
                                    >
                                        ⭐ GitHub
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="text-content">
                            <div className="badges flex flex-wrap gap-2">
                                {featured.tags.map((tag) => (
                                    <TagBadge key={tag} text={tag} />
                                ))}
                            </div>
                            <h1>{featured.title}</h1>
                            <p>{featured.description}</p>
                        </div>
                    </div>

                    {/* RIGHT: Other Projects */}
                    <div className="project-list-wrapper overflow-hidden">
                        {rest.map((project, idx) => (
                            <div
                                key={project.id}
                                className="project"
                                ref={refs[idx + 1]}
                            >
                                <div
                                    className="image-wrapper relative overflow-hidden rounded-xl"
                                    style={{
                                        background:
                                            project.bgColor || "#0a0a0f",
                                    }}
                                >
                                    <img
                                        src={project.image}
                                        alt={project.alt}
                                    />

                                    {/* Hover overlay for smaller cards */}
                                    <div
                                        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-end p-4"
                                        style={{
                                            background:
                                                "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)",
                                        }}
                                    >
                                        <div className="flex gap-2">
                                            {project.liveUrl && (
                                                <a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-3 py-1.5 rounded-full text-xs font-semibold text-white"
                                                    style={{
                                                        background:
                                                            "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                                                    }}
                                                >
                                                    🔗 Live
                                                </a>
                                            )}
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-3 py-1.5 rounded-full text-xs font-semibold text-white"
                                                style={{
                                                    background:
                                                        "rgba(255,255,255,0.1)",
                                                    border: "1px solid rgba(255,255,255,0.2)",
                                                }}
                                            >
                                                ⭐ GitHub
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 space-y-2">
                                    <h2>{project.title}</h2>
                                    <div className="flex flex-wrap gap-1.5">
                                        {project.tags.map((tag) => (
                                            <TagBadge key={tag} text={tag} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ShowcaseSection;
