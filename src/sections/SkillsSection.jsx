"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TitleHeader from "../components/TitleHeader";

gsap.registerPlugin(ScrollTrigger);

const skillGroups = [
    {
        group: "Languages",
        icon: "💻",
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
        icon: "🛠️",
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
        icon: "🤖",
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

const SkillBar = ({ name, level, accentStart, accentEnd, barRef, pctRef }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {/* Label row */}
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <span
                style={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.75)",
                }}
            >
                {name}
            </span>
            <span
                ref={pctRef}
                style={{
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    fontVariantNumeric: "tabular-nums",
                    background: `linear-gradient(90deg, ${accentStart}, ${accentEnd})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    opacity: 0,
                }}
            >
                0%
            </span>
        </div>
        {/* Track */}
        <div
            style={{
                width: "100%",
                height: "6px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.07)",
                overflow: "hidden",
                position: "relative",
            }}
        >
            {/* Fill bar */}
            <div
                ref={barRef}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100%",
                    width: "0%",
                    borderRadius: "999px",
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
                        delay: si * 0.1,
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
                    delay: si * 0.1,
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
            id="skills"
            ref={sectionRef}
            style={{ width: "100%", marginTop: "5rem", padding: "0 1.25rem" }}
        >
            {/* Section header */}
            <div
                style={{
                    maxWidth: "80rem",
                    margin: "0 auto",
                    padding: "0 1.25rem",
                }}
            >
                <TitleHeader title="Technical Skills" sub="⚙️ My Stack" />

                {/* Cards grid */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "1.5rem",
                        marginTop: "3.5rem",
                    }}
                >
                    {skillGroups.map((group, gi) => (
                        <div
                            key={group.group}
                            ref={(el) => {
                                cardRefs.current[gi] = el;
                            }}
                            style={{
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.09)",
                                backdropFilter: "blur(20px)",
                                WebkitBackdropFilter: "blur(20px)",
                                borderRadius: "1.25rem",
                                padding: "1.75rem",
                                display: "flex",
                                flexDirection: "column",
                                gap: "1.5rem",
                                position: "relative",
                                overflow: "hidden",
                                opacity: 0, // GSAP will animate this in
                            }}
                        >
                            {/* Top accent line */}
                            <div
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    height: "2px",
                                    background: `linear-gradient(90deg, ${group.accentStart}, ${group.accentEnd})`,
                                    borderRadius: "1.25rem 1.25rem 0 0",
                                }}
                            />

                            {/* Group header */}
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.75rem",
                                    paddingTop: "0.5rem",
                                }}
                            >
                                {/* Icon bubble */}
                                <div
                                    style={{
                                        width: 44,
                                        height: 44,
                                        borderRadius: "50%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "1.3rem",
                                        background: `linear-gradient(135deg, ${group.accentStart}22, ${group.accentEnd}22)`,
                                        border: `1px solid ${group.accentStart}44`,
                                        flexShrink: 0,
                                    }}
                                >
                                    {group.icon}
                                </div>
                                <div>
                                    <h3
                                        style={{
                                            fontSize: "1.1rem",
                                            fontWeight: 700,
                                            color: "rgba(255,255,255,0.95)",
                                            margin: 0,
                                        }}
                                    >
                                        {group.group}
                                    </h3>
                                    <p
                                        style={{
                                            fontSize: "0.75rem",
                                            color: "rgba(255,255,255,0.4)",
                                            margin: 0,
                                            marginTop: 2,
                                        }}
                                    >
                                        {group.items.length} skills
                                    </p>
                                </div>
                            </div>

                            {/* Divider */}
                            <div
                                style={{
                                    height: "1px",
                                    background: "rgba(255,255,255,0.06)",
                                }}
                            />

                            {/* Skill bars */}
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "1.1rem",
                                }}
                            >
                                {group.items.map((skill, si) => (
                                    <SkillBar
                                        key={skill.name}
                                        name={skill.name}
                                        level={skill.level}
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
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;
