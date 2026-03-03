"use client";

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
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.25 });

    return (
        <div
            id="counter"
            ref={ref}
            className="padding-x-lg xl:mt-0 mt-32 relative z-20"
        >
            <div className="mx-auto grid-4-cols">
                {counterItems.map((item, i) => {
                    const { Icon, color, colorHex } = METRICS[i] || METRICS[0];
                    return (
                        <div
                            key={item.label}
                            style={{
                                position: "relative",
                                background: "rgba(10,10,20,0.55)",
                                border: `1px solid rgba(${colorHex},0.18)`,
                                borderRadius: 20,
                                padding: "28px 24px 24px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: 0,
                                backdropFilter: "blur(14px)",
                                WebkitBackdropFilter: "blur(14px)",
                                transition:
                                    "transform 0.28s cubic-bezier(.16,1,.3,1), box-shadow 0.28s ease, border-color 0.28s ease",
                                cursor: "default",
                                overflow: "hidden",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(-6px)";
                                e.currentTarget.style.boxShadow = `0 16px 48px rgba(${colorHex},0.18), 0 0 0 1px rgba(${colorHex},0.3)`;
                                e.currentTarget.style.borderColor = `rgba(${colorHex},0.38)`;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(0)";
                                e.currentTarget.style.boxShadow = "none";
                                e.currentTarget.style.borderColor = `rgba(${colorHex},0.18)`;
                            }}
                        >
                            {/* Top accent line */}
                            <div
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    height: 2,
                                    background: `linear-gradient(90deg, ${color}, transparent)`,
                                    borderRadius: "20px 20px 0 0",
                                    opacity: 0.7,
                                }}
                            />

                            {/* Subtle corner glow */}
                            <div
                                style={{
                                    position: "absolute",
                                    top: -40,
                                    left: -30,
                                    width: 120,
                                    height: 120,
                                    borderRadius: "50%",
                                    background: `radial-gradient(circle, rgba(${colorHex},0.12) 0%, transparent 70%)`,
                                    pointerEvents: "none",
                                }}
                            />

                            {/* Icon container */}
                            <div
                                style={{
                                    width: 44,
                                    height: 44,
                                    borderRadius: 12,
                                    background: `rgba(${colorHex},0.12)`,
                                    border: `1px solid rgba(${colorHex},0.22)`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginBottom: 18,
                                    flexShrink: 0,
                                }}
                            >
                                <Icon
                                    size={20}
                                    style={{ color, strokeWidth: 1.75 }}
                                />
                            </div>

                            {/* Animated number */}
                            <div
                                style={{
                                    fontSize: "clamp(36px,5vw,52px)",
                                    fontWeight: 900,
                                    lineHeight: 1,
                                    letterSpacing: "-0.03em",
                                    background: `linear-gradient(135deg, #fff 30%, ${color})`,
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                    marginBottom: 10,
                                    fontFamily: "Inter, sans-serif",
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

                            {/* Divider */}
                            <div
                                style={{
                                    width: 32,
                                    height: 2,
                                    borderRadius: 2,
                                    background: `linear-gradient(90deg, rgba(${colorHex},0.7), transparent)`,
                                    marginBottom: 10,
                                }}
                            />

                            {/* Label */}
                            <div
                                style={{
                                    fontSize: 13,
                                    lineHeight: 1.55,
                                    color: "rgba(255,255,255,0.52)",
                                    fontWeight: 500,
                                    letterSpacing: "0.01em",
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
