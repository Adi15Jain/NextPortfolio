"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TitleHeader from "../components/TitleHeader";
import { testimonials } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const StarRow = ({ rating = 5 }) => (
    <div style={{ display: "flex", gap: "3px" }}>
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
        style={{ position: "absolute", top: 20, right: 20, opacity: 0.15 }}
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
        <section
            id="testimonials"
            style={{ width: "100%", marginTop: "5rem", padding: "0 1.25rem" }}
        >
            <div
                style={{
                    maxWidth: "80rem",
                    margin: "0 auto",
                    padding: "0 1.25rem",
                }}
            >
                <TitleHeader title="What People Say" sub="💬 Testimonials" />

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "1.5rem",
                        marginTop: "3.5rem",
                    }}
                >
                    {testimonials.map((t, i) => {
                        const accent = ACCENT_COLORS[i % ACCENT_COLORS.length];
                        return (
                            <div
                                key={i}
                                ref={(el) => {
                                    cardRefs.current[i] = el;
                                }}
                                style={{
                                    position: "relative",
                                    background: "rgba(255,255,255,0.04)",
                                    border: "1px solid rgba(255,255,255,0.09)",
                                    backdropFilter: "blur(24px)",
                                    WebkitBackdropFilter: "blur(24px)",
                                    borderRadius: "1.25rem",
                                    padding: "2rem 1.75rem 1.75rem",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "1.1rem",
                                    minHeight: 280,
                                    overflow: "hidden",
                                    opacity: 0,
                                    cursor: "default",
                                    transition:
                                        "transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform =
                                        "translateY(-8px)";
                                    e.currentTarget.style.boxShadow = `0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px ${accent.start}33`;
                                    e.currentTarget.style.borderColor = `${accent.start}44`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform =
                                        "translateY(0)";
                                    e.currentTarget.style.boxShadow = "none";
                                    e.currentTarget.style.borderColor =
                                        "rgba(255,255,255,0.09)";
                                }}
                            >
                                {/* Top accent bar */}
                                <div
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: "2px",
                                        background: `linear-gradient(90deg, ${accent.start}, ${accent.end})`,
                                        borderRadius: "1.25rem 1.25rem 0 0",
                                    }}
                                />

                                {/* SVG quote mark */}
                                <QuoteIcon color={accent.start} />

                                {/* Review text */}
                                <p
                                    style={{
                                        fontSize: "0.9rem",
                                        lineHeight: 1.75,
                                        color: "rgba(255,255,255,0.72)",
                                        flex: 1,
                                        margin: 0,
                                        paddingRight: "2rem",
                                    }}
                                >
                                    {t.review}
                                </p>

                                {/* Stars */}
                                <StarRow rating={t.rating || 5} />

                                {/* Author row */}
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.85rem",
                                        borderTop:
                                            "1px solid rgba(255,255,255,0.07)",
                                        paddingTop: "1rem",
                                    }}
                                >
                                    {/* Avatar */}
                                    <div
                                        style={{
                                            width: 46,
                                            height: 46,
                                            borderRadius: "50%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "1.4rem",
                                            background: `linear-gradient(135deg, ${accent.start}22, ${accent.end}22)`,
                                            border: `1.5px solid ${accent.start}55`,
                                            flexShrink: 0,
                                        }}
                                    >
                                        {t.avatar}
                                    </div>

                                    {/* Info */}
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 2,
                                        }}
                                    >
                                        <p
                                            style={{
                                                margin: 0,
                                                fontSize: "0.925rem",
                                                fontWeight: 700,
                                                color: "rgba(255,255,255,0.92)",
                                            }}
                                        >
                                            {t.name}
                                        </p>
                                        <p
                                            style={{
                                                margin: 0,
                                                fontSize: "0.8rem",
                                                color: "rgba(255,255,255,0.45)",
                                            }}
                                        >
                                            {t.role}
                                        </p>
                                        {t.mention && (
                                            <p
                                                style={{
                                                    margin: 0,
                                                    fontSize: "0.75rem",
                                                    fontWeight: 600,
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
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
