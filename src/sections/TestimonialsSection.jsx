"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TitleHeader from "../components/TitleHeader";
import { MessageSquare } from "lucide-react";
import { testimonials } from "../constants";
import SpotlightCard from "../components/SpotlightCard";

gsap.registerPlugin(ScrollTrigger);

const StarRow = ({ rating = 5 }) => (
    <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
            <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    fill={i <= rating ? "#fbbf24" : "rgba(255,255,255,0.15)"}
                />
            </svg>
        ))}
    </div>
);

const QuoteIcon = ({ color }) => (
    <svg
        width="40"
        height="32"
        viewBox="0 0 40 32"
        fill="none"
        className="absolute top-5 right-5 opacity-15 pointer-events-none"
        aria-hidden="true"
    >
        <path
            d="M0 32V20.8C0 14.4 2.13333 9.06667 6.4 4.8 10.6667 1.6 15.7333 0 21.6 0L24 4.8C19.7333 5.86667 16.5333 7.73333 14.4 10.4 12.2667 13.0667 11.2 16 11.2 19.2H17.6V32H0ZM22.4 32V20.8C22.4 14.4 24.5333 9.06667 28.8 4.8 33.0667 1.6 38.1333 0 44 0L46.4 4.8C42.1333 5.86667 38.9333 7.73333 36.8 10.4 34.6667 13.0667 33.6 16 33.6 19.2H40V32H22.4Z"
            fill={color}
        />
    </svg>
);

const ACCENT_COLORS = [
    { start: "#3b82f6", end: "#8b5cf6" },
    { start: "#8b5cf6", end: "#ec4899" },
    { start: "#10b981", end: "#06b6d4" },
];

const TestimonialsSection = () => {
    const cardRefs = useRef([]);

    useGSAP(() => {
        cardRefs.current.forEach((card, i) => {
            if (!card) return;
            gsap.fromTo(
                card,
                { y: 70, opacity: 0, scale: 0.96 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.9,
                    delay: i * 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 88%",
                    },
                },
            );
        });
    }, []);

    return (
        <section id="testimonials" className="w-full mt-20 px-5">
            <div className="max-w-7xl mx-auto px-5">
                <TitleHeader title="What People Say" sub={<span className="flex items-center gap-1.5"><MessageSquare size={13} className="text-blue-400" /> Testimonials</span>} />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
                    {testimonials.map((t, i) => {
                        const accent = ACCENT_COLORS[i % ACCENT_COLORS.length];
                        return (
                            <SpotlightCard
                                key={i}
                                ref={(el) => {
                                    cardRefs.current[i] = el;
                                }}
                                className="feature-card rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 cursor-default group min-h-[300px]"
                            >
                                {/* Top accent bar */}
                                <div
                                    className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                                    style={{
                                        background: `linear-gradient(90deg, ${accent.start}, ${accent.end})`,
                                    }}
                                />

                                {/* SVG quote mark */}
                                <QuoteIcon color={accent.start} />

                                {/* Content wrapper */}
                                <div className="flex-1 flex flex-col justify-between gap-5 relative z-10">
                                    {/* Review text */}
                                    <p className="text-sm leading-relaxed text-white/70 flex-1 pr-8">
                                        {t.review}
                                    </p>

                                    {/* Stars */}
                                    <StarRow rating={t.rating || 5} />
                                </div>

                                {/* Author row */}
                                <div className="flex items-center gap-3.5 border-t border-white/10 pt-4 mt-5 relative z-10">
                                    {/* Avatar */}
                                    <div
                                        className="w-11 h-11 rounded-full flex items-center justify-center text-xl flex-shrink-0"
                                        style={{
                                            background: `linear-gradient(135deg, ${accent.start}22, ${accent.end}22)`,
                                            border: `1.5px solid ${accent.start}55`,
                                        }}
                                    >
                                        {t.avatar}
                                    </div>

                                    {/* Info */}
                                    <div className="flex flex-col gap-0.5">
                                        <p className="text-sm font-bold text-white/90">
                                            {t.name}
                                        </p>
                                        <p className="text-xs text-white/50">
                                            {t.role}
                                        </p>
                                        {t.mention && (
                                            <p
                                                className="text-xs font-semibold"
                                                style={{
                                                    background: `linear-gradient(90deg, ${accent.start}, ${accent.end})`,
                                                    WebkitBackgroundClip:
                                                        "text",
                                                    WebkitTextFillColor:
                                                        "transparent",
                                                    backgroundClip: "text",
                                                }}
                                            >
                                                {t.mention}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </SpotlightCard>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
