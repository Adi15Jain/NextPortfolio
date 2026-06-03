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
                            className="counter-card p-5 md:px-[22px] md:py-[20px]"
                            style={{
                                "--card-color": color,
                                "--card-color-rgb": colorHex,
                            }}
                            onMouseEnter={() => setHoveredIndex(i)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            {/* Top accent line */}
                            <div className="counter-card-accent" />

                            {/* Subtle corner glow */}
                            <div className="counter-card-glow" />

                            {/* Mobile View: longitudinal layout (visible on mobile, hidden on md+) */}
                            <div className="flex md:hidden items-center gap-5 w-full relative z-10">
                                {/* Icon container */}
                                <div className="counter-card-icon-container">
                                    <Icon
                                        size={20}
                                        className="counter-card-icon"
                                        style={{
                                            color,
                                            strokeWidth: isHovered ? 2 : 1.75,
                                        }}
                                    />
                                </div>

                                {/* Vertical Divider */}
                                <div className="counter-card-divider-vertical" />

                                {/* Text content (Number + Label) */}
                                <div className="flex flex-col items-start gap-1">
                                    <div className="counter-card-number-wrapper">
                                        <div className="counter-card-number">
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
                                    <div className="counter-card-label">
                                        {item.label}
                                    </div>
                                </div>
                            </div>

                            {/* Desktop/Tablet View: square-ish layout (hidden on mobile, visible on md+) */}
                            <div className="hidden md:flex flex-col items-start w-full relative z-10">
                                {/* Horizontal Top Row: Icon Container + Animated Number */}
                                <div className="flex flex-row items-center gap-3.5 w-full mb-3.5">
                                    {/* Icon container */}
                                    <div className="counter-card-icon-container">
                                        <Icon
                                            size={20}
                                            className="counter-card-icon"
                                            style={{
                                                color,
                                                strokeWidth: isHovered ? 2 : 1.75,
                                            }}
                                        />
                                    </div>

                                    {/* Animated number */}
                                    <div className="counter-card-number-wrapper">
                                        <div className="counter-card-number">
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
                                <div className="counter-card-divider" />

                                {/* Label */}
                                <div className="counter-card-label">
                                    {item.label}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AnimatedCounter;

