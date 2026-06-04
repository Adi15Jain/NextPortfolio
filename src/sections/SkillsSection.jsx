"use client";

import React, { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TitleHeader from "../components/TitleHeader";
import SpotlightCard from "../components/SpotlightCard";
import { Terminal, Wrench, Bot, Cpu } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const skillGroups = [
    {
        group: "Languages",
        icon: Terminal,
        accentStart: "#3b82f6",
        accentEnd: "#06b6d4",
        items: [
            {
                name: "Python",
                projectCount: 3,
                projects: ["PneumoAI", "WealthyMinds"],
            },
            {
                name: "JavaScript / TS",
                projectCount: 6,
                projects: [
                    "PneumoAI",
                    "CoinPush",
                    "WealthyMinds",
                    "InterviewPilot",
                    "Vectrion",
                ],
            },
            { name: "C / C++", projectCount: 1, projects: ["AlgoPlus"] },
            {
                name: "HTML & CSS",
                projectCount: 6,
                projects: [
                    "PneumoAI",
                    "AlgoPlus",
                    "CoinPush",
                    "WealthyMinds",
                    "InterviewPilot",
                ],
            },
            {
                name: "SQL",
                projectCount: 3,
                projects: ["WealthyMinds", "InterviewPilot"],
            },
        ],
    },
    {
        group: "Frameworks & Tools",
        icon: Wrench,
        accentStart: "#8b5cf6",
        accentEnd: "#ec4899",
        items: [
            {
                name: "React.js / Next.js",
                projectCount: 6,
                projects: [
                    "PneumoAI",
                    "AlgoPlus",
                    "CoinPush",
                    "WealthyMinds",
                    "InterviewPilot",
                ],
            },
            {
                name: "Node.js / Express",
                projectCount: 4,
                projects: ["Vectrion", "CoinPush", "AlgoPlus", "Portfolio"],
            },
            {
                name: "Three.js / Canvas",
                projectCount: 2,
                projects: ["AlgoPlus", "Portfolio"],
            },
            {
                name: "Drizzle / Prisma",
                projectCount: 3,
                projects: ["WealthyMinds", "InterviewPilot"],
            },
            {
                name: "Git & GitHub",
                projectCount: 7,
                projects: [
                    "PneumoAI",
                    "AlgoPlus",
                    "CoinPush",
                    "WealthyMinds",
                    "InterviewPilot",
                    "Vectrion",
                ],
            },
        ],
    },
    {
        group: "AI & Data Science",
        icon: Bot,
        accentStart: "#10b981",
        accentEnd: "#06b6d4",
        items: [
            {
                name: "Machine Learning",
                projectCount: 3,
                projects: ["PneumoAI", "WealthyMinds"],
            },
            {
                name: "Deep Learning / CNN",
                projectCount: 2,
                projects: ["PneumoAI"],
            },
            {
                name: "NLP / LLM Systems",
                projectCount: 3,
                projects: ["WealthyMinds", "InterviewPilot", "Vectrion"],
            },
            {
                name: "Pandas / NumPy / EDA",
                projectCount: 2,
                projects: ["PneumoAI"],
            },
            {
                name: "PyTorch / TensorFlow",
                projectCount: 2,
                projects: ["PneumoAI"],
            },
        ],
    },
];

const SkillBar = ({
    name,
    projectCount,
    projects,
    accentStart,
    accentEnd,
    maxCount,
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [barWidth, setBarWidth] = useState(0);
    const fillPercent = Math.min((projectCount / maxCount) * 100, 100);

    useEffect(() => {
        const timer = setTimeout(() => {
            setBarWidth(fillPercent);
        }, 100);
        return () => clearTimeout(timer);
    }, [fillPercent]);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="flex flex-col gap-2 w-full p-2.5 -mx-2.5 rounded-xl transition-all duration-300 hover:bg-white/[0.03] cursor-default"
        >
            {/* Label and Project Badge Row */}
            <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-white/80">
                    {name}
                </span>
                <span
                    className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border transition-all duration-300"
                    style={{
                        background: isHovered
                            ? `linear-gradient(135deg, ${accentStart}22, ${accentEnd}22)`
                            : "transparent",
                        borderColor: isHovered
                            ? accentStart
                            : "rgba(255,255,255,0.08)",
                        color: isHovered ? "#fff" : "rgba(255,255,255,0.4)",
                    }}
                >
                    {projectCount} {projectCount === 1 ? "Project" : "Projects"}
                </span>
            </div>

            {/* Track and Fill bar */}
            <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden relative">
                <div
                    className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                        width: `${barWidth}%`,
                        background: `linear-gradient(90deg, ${accentStart}, ${accentEnd})`,
                        boxShadow: `0 0 8px ${accentStart}44`,
                    }}
                />
            </div>

            {/* Expandable Project badging container */}
            <div
                className={`overflow-hidden transition-all duration-300 flex flex-wrap gap-1.5 ${
                    isHovered
                        ? "max-h-[80px] mt-1 opacity-100 animate-slide-down"
                        : "max-h-0 opacity-0"
                }`}
            >
                {projects.map((proj) => (
                    <span
                        key={proj}
                        className="text-[9px] font-mono tracking-wider font-semibold px-2 py-0.5 rounded bg-white/5 border border-white/5 text-white/50 hover:text-white/80 hover:border-white/10 transition-colors"
                    >
                        {proj}
                    </span>
                ))}
            </div>
        </div>
    );
};

const SkillsSection = () => {
    const sectionRef = useRef(null);
    const cardRefs = useRef([]);

    useGSAP(() => {
        // Slide up cards on scroll
        cardRefs.current.forEach((card, i) => {
            if (!card) return;
            gsap.fromTo(
                card,
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    delay: i * 0.12,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                    },
                },
            );
        });
    }, []);

    return (
        <section
            id="skills-detailed"
            ref={sectionRef}
            className="w-full md:my-32 my-16 px-5"
        >
            <div className="max-w-7xl mx-auto md:px-5 px-0">
                <TitleHeader
                    title="Technical Skills"
                    sub={
                        <span className="flex items-center gap-1.5">
                            <Cpu size={13} className="text-blue-400" /> Proven
                            Stack
                        </span>
                    }
                />

                {/* Desktop View: original cards grid */}
                <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
                    {skillGroups.map((group, gi) => (
                        <SpotlightCard
                            key={group.group}
                            ref={(el) => {
                                cardRefs.current[gi] = el;
                            }}
                            className="feature-card rounded-2xl p-7 flex flex-col gap-6 relative overflow-hidden opacity-0"
                        >
                            {/* Top accent line */}
                            <div
                                className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                                style={{
                                    background: `linear-gradient(90deg, ${group.accentStart}, ${group.accentEnd})`,
                                }}
                            />

                            {/* Group header */}
                            <div className="flex items-center gap-3.5 pt-2">
                                {/* Icon bubble */}
                                <div
                                    className="w-11 h-11 rounded-full flex items-center justify-center text-xl flex-shrink-0"
                                    style={{
                                        background: `linear-gradient(135deg, ${group.accentStart}22, ${group.accentEnd}22)`,
                                        border: `1px solid ${group.accentStart}44`,
                                    }}
                                >
                                    <group.icon
                                        size={18}
                                        style={{ color: group.accentStart }}
                                    />
                                </div>
                                <div className="flex flex-col gap-0.5">
                                    <h3 className="text-base font-bold text-white/95">
                                        {group.group}
                                    </h3>
                                    <p className="text-xs text-white/40">
                                        {group.items.length} skills listed
                                    </p>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="h-px bg-white/5" />

                            {/* Skill bars with dynamic verification */}
                            <div className="flex flex-col gap-3">
                                {group.items.map((skill) => (
                                    <SkillBar
                                        key={skill.name}
                                        name={skill.name}
                                        projectCount={skill.projectCount}
                                        projects={skill.projects}
                                        accentStart={group.accentStart}
                                        accentEnd={group.accentEnd}
                                        maxCount={7} // Max projects count in catalog to map relative bar widths
                                    />
                                ))}
                            </div>
                        </SpotlightCard>
                    ))}
                </div>

                {/* Mobile View: Compact Single Card Layout */}
                <div className="md:hidden block mt-8">
                    <SpotlightCard
                        ref={(el) => {
                            cardRefs.current[skillGroups.length] = el;
                        }}
                        className="feature-card rounded-2xl p-6 flex flex-col gap-5 relative overflow-hidden opacity-0"
                    >
                        {/* Top decorative gradient bar */}
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#10b981]" />

                        {skillGroups.map((group, gi) => (
                            <div
                                key={group.group}
                                className="flex flex-col gap-3"
                            >
                                {/* Group Category Header */}
                                <div className="flex items-center gap-2.5">
                                    <div
                                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                                        style={{
                                            background: `linear-gradient(135deg, ${group.accentStart}15, ${group.accentEnd}15)`,
                                            border: `1px solid ${group.accentStart}33`,
                                        }}
                                    >
                                        <group.icon
                                            size={13}
                                            style={{ color: group.accentStart }}
                                        />
                                    </div>
                                    <h4 className="text-[12px] font-bold text-white/90 uppercase tracking-wider font-mono">
                                        {group.group}
                                    </h4>
                                    <span className="text-[10px] text-white/40 font-mono font-medium">
                                        ({group.items.length})
                                    </span>
                                </div>

                                {/* Skills wrapping pills */}
                                <div className="flex flex-wrap gap-2">
                                    {group.items.map((skill) => (
                                        <div
                                            key={skill.name}
                                            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs border border-white/[0.04] bg-white/[0.02]"
                                            style={{
                                                borderColor: `${group.accentStart}22`,
                                                boxShadow: `inset 0 1px 0 rgba(255, 255, 255, 0.05)`,
                                            }}
                                        >
                                            <span className="text-white/80 font-medium">
                                                {skill.name}
                                            </span>
                                            <span
                                                className="text-[9px] font-mono font-bold px-1.5 py-0.25 rounded-full"
                                                style={{
                                                    background: `linear-gradient(135deg, ${group.accentStart}22, ${group.accentEnd}22)`,
                                                    border: `1px solid ${group.accentStart}33`,
                                                    color: group.accentStart,
                                                }}
                                            >
                                                {skill.projectCount}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Separator line between categories */}
                                {gi < skillGroups.length - 1 && (
                                    <div className="h-px bg-white/[0.06] mt-1" />
                                )}
                            </div>
                        ))}
                    </SpotlightCard>
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;
