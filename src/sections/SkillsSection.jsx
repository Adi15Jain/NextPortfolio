"use client";

import { useRef } from "react";
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
            { name: "Python", level: 90 },
            { name: "JavaScript", level: 85 },
            { name: "C / C++", level: 70 },
            { name: "HTML & CSS", level: 92 },
            { name: "SQL", level: 75 },
        ],
    },
    {
        group: "Frameworks & Tools",
        icon: Wrench,
        accentStart: "#8b5cf6",
        accentEnd: "#ec4899",
        items: [
            { name: "React.js", level: 88 },
            { name: "Node.js", level: 72 },
            { name: "Three.js / R3F", level: 78 },
            { name: "Next.js", level: 80 },
            { name: "Git & GitHub", level: 85 },
        ],
    },
    {
        group: "AI & Data Science",
        icon: Bot,
        accentStart: "#10b981",
        accentEnd: "#06b6d4",
        items: [
            { name: "Machine Learning", level: 82 },
            { name: "Deep Learning", level: 75 },
            { name: "NLP", level: 68 },
            { name: "Pandas / EDA", level: 85 },
            { name: "TensorFlow/Keras", level: 70 },
        ],
    },
];

const SkillBar = ({ name, accentStart, accentEnd, barRef, pctRef }) => (
    <div className="flex flex-col gap-1.5 w-full">
        {/* Label row */}
        <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-white/75">{name}</span>
            <span
                ref={pctRef}
                className="text-xs font-bold tabular-nums opacity-0"
                style={{
                    background: `linear-gradient(90deg, ${accentStart}, ${accentEnd})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                }}
            >
                0%
            </span>
        </div>
        {/* Track */}
        <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden relative">
            {/* Fill bar */}
            <div
                ref={barRef}
                className="absolute top-0 left-0 h-full w-0 rounded-full"
                style={{
                    background: `linear-gradient(90deg, ${accentStart}, ${accentEnd})`,
                    boxShadow: `0 0 12px ${accentStart}66`,
                }}
            />
        </div>
    </div>
);

const SkillsSection = () => {
    const sectionRef = useRef(null);

    // For each group × each item we store refs to the bar div and the pct span
    const barRefs = useRef(skillGroups.map((g) => g.items.map(() => null)));
    const pctRefs = useRef(skillGroups.map((g) => g.items.map(() => null)));
    const cardRefs = useRef([]);

    useGSAP(() => {
        // 1. Cards slide up on scroll
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

        // 2. Bars animate width + counter on scroll
        skillGroups.forEach((group, gi) => {
            group.items.forEach((skill, si) => {
                const bar = barRefs.current[gi][si];
                const pct = pctRefs.current[gi][si];
                if (!bar || !pct) return;

                const proxy = { val: 0 };

                gsap.fromTo(
                    bar,
                    { width: "0%" },
                    {
                        width: `${skill.level}%`,
                        duration: 1.4,
                        delay: si * 0.08,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: bar,
                            start: "top 90%",
                        },
                    },
                );

                // Counter up
                gsap.to(proxy, {
                    val: skill.level,
                    duration: 1.4,
                    delay: si * 0.08,
                    ease: "power2.out",
                    onUpdate: () => {
                        if (pct) {
                            pct.textContent = `${Math.round(proxy.val)}%`;
                            pct.style.opacity = "1";
                        }
                    },
                    scrollTrigger: {
                        trigger: bar,
                        start: "top 90%",
                    },
                });
            });
        });
    }, []);

    return (
        <section
            id="skills-detailed"
            ref={sectionRef}
            className="w-full mt-20 px-5"
        >
            <div className="max-w-7xl mx-auto px-5">
                <TitleHeader title="Technical Skills" sub={<span className="flex items-center gap-1.5"><Cpu size={13} className="text-blue-400" /> My Stack</span>} />

                {/* Cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
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
                                    <group.icon size={18} style={{ color: group.accentStart }} />
                                </div>
                                <div className="flex flex-col gap-0.5">
                                    <h3 className="text-base font-bold text-white/95">
                                        {group.group}
                                    </h3>
                                    <p className="text-xs text-white/40">
                                        {group.items.length} skills
                                    </p>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="h-px bg-white/5" />

                            {/* Skill bars */}
                            <div className="flex flex-col gap-4">
                                {group.items.map((skill, si) => (
                                    <SkillBar
                                        key={skill.name}
                                        name={skill.name}
                                        accentStart={group.accentStart}
                                        accentEnd={group.accentEnd}
                                        barRef={(el) => {
                                            barRefs.current[gi][si] = el;
                                        }}
                                        pctRef={(el) => {
                                            pctRefs.current[gi][si] = el;
                                        }}
                                    />
                                ))}
                            </div>
                        </SpotlightCard>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;
