"use client";

import { useState } from "react";
import { counterItems } from "../constants";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Layers, Clock, BadgeCheck, Code2 } from "lucide-react";

/* ── Per-metric config: icon + accent colour ── */
const METRICS = [
    {
        Icon: Layers,
        color: "#a78bfa",
        colorHex: "124,58,237",
        label: "Completed Projects",
    },
    {
        Icon: Clock,
        color: "#60a5fa",
        colorHex: "59,130,246",
        label: "Hours of Practical Learning",
    },
    {
        Icon: BadgeCheck,
        color: "#fbbf24",
        colorHex: "245,158,11",
        label: "Technical Certifications Earned",
    },
    {
        Icon: Code2,
        color: "#34d399",
        colorHex: "16,185,129",
        label: "Tools & Technologies Used",
    },
];

const AnimatedCounter = () => {
    const { ref, inView } = useInView({ threshold: 0.15 });
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <div
            id="counter"
            ref={ref}
            className="padding-x-lg xl:mt-0 mt-32 relative z-20"
        >
            <div className="mx-auto grid-4-cols">
                {counterItems.map((item, i) => {
                    const { Icon, color, colorHex } = METRICS[i] || METRICS[0];
                    const isHovered = hoveredIndex === i;

                    return (
                        <div
                            key={item.label}
                            style={{
                                position: "relative",
                                background: isHovered
                                    ? "rgba(12, 12, 28, 0.75)"
                                    : "rgba(10, 10, 20, 0.55)",
                                border: isHovered
                                    ? `1px solid rgba(${colorHex}, 0.45)`
                                    : `1px solid rgba(${colorHex}, 0.18)`,
                                borderRadius: 20,
                                padding: "20px 22px 20px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: 0,
                                backdropFilter: "blur(14px)",
                                WebkitBackdropFilter: "blur(14px)",
                                boxShadow: isHovered
                                    ? `0 20px 40px rgba(${colorHex}, 0.22), inset 0 0 12px rgba(${colorHex}, 0.1)`
                                    : "none",
                                transform: isHovered
                                    ? "translateY(-6px) scale(1.02)"
                                    : "translateY(0) scale(1)",
                                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                                cursor: "default",
                                overflow: "hidden",
                            }}
                            onMouseEnter={() => setHoveredIndex(i)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            {/* Top accent line */}
                            <div
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    height: isHovered ? 3 : 2,
                                    background: isHovered
                                        ? `linear-gradient(90deg, ${color}, ${color})`
                                        : `linear-gradient(90deg, ${color}, transparent)`,
                                    borderRadius: "20px 20px 0 0",
                                    opacity: isHovered ? 1 : 0.7,
                                    transition: "all 0.4s ease",
                                }}
                            />

                            {/* Subtle corner glow */}
                            <div
                                style={{
                                    position: "absolute",
                                    top: isHovered ? -50 : -40,
                                    left: isHovered ? -40 : -30,
                                    width: isHovered ? 220 : 120,
                                    height: isHovered ? 220 : 120,
                                    borderRadius: "50%",
                                    background: isHovered
                                        ? `radial-gradient(circle, rgba(${colorHex},0.28) 0%, transparent 70%)`
                                        : `radial-gradient(circle, rgba(${colorHex},0.12) 0%, transparent 70%)`,
                                    pointerEvents: "none",
                                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                                }}
                            />

                            {/* Horizontal Top Row: Icon Container + Animated Number */}
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 14,
                                    width: "100%",
                                    marginBottom: 14,
                                }}
                            >
                                {/* Icon container */}
                                <div
                                    style={{
                                        width: 44,
                                        height: 44,
                                        borderRadius: 12,
                                        background: isHovered
                                            ? `rgba(${colorHex},0.2)`
                                            : `rgba(${colorHex},0.12)`,
                                        border: isHovered
                                            ? `1px solid rgba(${colorHex},0.35)`
                                            : `1px solid rgba(${colorHex},0.22)`,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0,
                                        transform: isHovered
                                            ? "scale(1.1) rotate(6deg)"
                                            : "scale(1) rotate(0deg)",
                                        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                                    }}
                                >
                                    <Icon
                                        size={20}
                                        style={{
                                            color,
                                            strokeWidth: isHovered ? 2 : 1.75,
                                            transition: "all 0.4s ease",
                                        }}
                                    />
                                </div>

                                {/* Animated number */}
                                <div
                                    style={{
                                        transform: isHovered ? "scale(1.03)" : "scale(1)",
                                        transformOrigin: "left center",
                                        transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                                        display: "inline-block",
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: "clamp(26px, 3.8vw, 36px)",
                                            fontWeight: 900,
                                            lineHeight: 1,
                                            letterSpacing: "-0.02em",
                                            background: `linear-gradient(135deg, #fff 30%, ${color})`,
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                            backgroundClip: "text",
                                            fontFamily: "Inter, sans-serif",
                                            display: "block",
                                        }}
                                    >
                                        {inView ? (
                                            <CountUp
                                                end={item.value}
                                                duration={2.6}
                                                suffix={item.suffix}
                                                useEasing
                                            />
                                        ) : (
                                            <span>0{item.suffix}</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Divider */}
                            <div
                                style={{
                                    width: isHovered ? 48 : 28,
                                    height: 2,
                                    borderRadius: 2,
                                    background: `linear-gradient(90deg, rgba(${colorHex},0.7), transparent)`,
                                    marginBottom: 10,
                                    transition: "width 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                                }}
                            />

                            {/* Label */}
                            <div
                                style={{
                                    fontSize: 13,
                                    lineHeight: 1.5,
                                    color: isHovered ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.52)",
                                    fontWeight: 500,
                                    letterSpacing: "0.01em",
                                    transition: "color 0.4s ease",
                                }}
                            >
                                {item.label}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AnimatedCounter;

