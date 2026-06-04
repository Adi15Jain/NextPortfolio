"use client";

import React, { useState } from "react";
import TitleHeader from "../components/TitleHeader";
import { TrendingUp, CheckCircle2 } from "lucide-react";
import { expCards } from "../constants/index";
import GlowCard from "../components/GlowCard";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ExperienceSection = () => {
    const [activeTab, setActiveTab] = useState(0);

    useGSAP(() => {
        // Use set() to apply initial states explicitly, then animate with to()
        // This avoids the fromTo + immediateRender issue in Next.js where
        // the "from" values get applied but ScrollTrigger never fires.

        gsap.utils.toArray(".timeline-card").forEach((card) => {
            gsap.set(card, { xPercent: -100, opacity: 0 });
            gsap.to(card, {
                xPercent: 0,
                opacity: 1,
                transformOrigin: "left left",
                duration: 1,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                },
            });
        });

        gsap.utils.toArray(".timeline-wrapper").forEach((wrapper) => {
            const mask = wrapper.querySelector(".timeline");
            if (!mask) return;

            gsap.set(mask, { scaleY: 1 });
            gsap.to(mask, {
                scaleY: 0,
                transformOrigin: "bottom bottom",
                ease: "none",
                scrollTrigger: {
                    trigger: wrapper,
                    start: "top 85%",
                    end: "bottom 85%",
                    scrub: true,
                },
            });
        });

        gsap.utils.toArray(".expText").forEach((text) => {
            gsap.set(text, { opacity: 0, x: 30 });
            gsap.to(text, {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: text,
                    start: "top 85%",
                },
            });
        });

        // Recalculate ScrollTrigger positions after a short delay
        // to ensure layout and images have settled
        ScrollTrigger.refresh();
        const refreshTimeout = setTimeout(() => ScrollTrigger.refresh(), 500);
        return () => clearTimeout(refreshTimeout);
    }, []);

    // Short tab labels for the mobile pill navigation
    const tabLabels = expCards.map((card) => {
        if (card.title.includes("B.Tech")) return "B.Tech Student";
        if (card.title.includes("Data")) return "Data Intern";
        return card.title;
    });

    return (
        <section
            id="experience"
            className="w-full md:mt-40 mt-20 section-padding xl:px-0"
        >
            <div className="w-full h-full md:px-20 px-0">
                <TitleHeader
                    title="Experience and Learning"
                    sub={
                        <span className="flex items-center gap-1.5">
                            <TrendingUp size={13} className="text-blue-400" />{" "}
                            My Overview
                        </span>
                    }
                />

                {/* ===================== MOBILE: Tabbed Card Layout ===================== */}
                <div className="block md:hidden mt-12">
                    {/* Tab pills - horizontally scrollable */}
                    <div
                        className="flex gap-2.5 overflow-x-auto pb-3 mb-5"
                        role="tablist"
                        style={{
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                        }}
                    >
                        {tabLabels.map((label, index) => (
                            <button
                                key={label}
                                role="tab"
                                aria-selected={activeTab === index}
                                onClick={() => setActiveTab(index)}
                                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-300 flex-shrink-0 cursor-pointer ${
                                    activeTab === index
                                        ? "bg-blue-500/15 border-blue-500 text-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.15)]"
                                        : "bg-white/[0.03] border-white/10 text-white/50 hover:border-white/20 hover:text-white/70"
                                }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    {/* Active card content */}
                    <div
                        className="rounded-2xl p-6 relative overflow-hidden"
                        style={{
                            background: "rgba(255,255,255,0.04)",
                            backdropFilter: "blur(16px)",
                            WebkitBackdropFilter: "blur(16px)",
                            border: "1px solid rgba(255,255,255,0.08)",
                        }}
                    >
                        {/* Accent gradient line at top */}
                        <div
                            className="absolute top-0 left-0 right-0 h-[2px]"
                            style={{
                                background:
                                    "linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4)",
                            }}
                        />

                        {/* Card content with fade animation */}
                        {expCards.map((card, index) => (
                            <div
                                key={card.title}
                                className={`flex flex-col ${
                                    activeTab === index
                                        ? "exp-tab-active"
                                        : "hidden"
                                }`}
                            >
                                {/* Star rating */}
                                <div className="flex items-center gap-1 mb-1">
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <span key={i} className="text-sm">
                                            ⭐
                                        </span>
                                    ))}
                                </div>

                                {/* Logo + Title + Date */}
                                <div className="flex items-center gap-4 pb-4 mb-1 border-b border-white/[0.06]">
                                    <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-white/10 bg-white/5 p-1.5">
                                        <img
                                            src={card.logoPath}
                                            alt={card.title}
                                            className="w-full h-full object-contain rounded-lg"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1.5 flex-1">
                                        <h3 className="text-lg font-bold text-white leading-tight">
                                            {card.title}
                                        </h3>
                                        <span
                                            className="text-[10px] font-mono font-medium uppercase tracking-wider px-2 py-0.5 rounded w-fit"
                                            style={{
                                                background:
                                                    "rgba(59, 130, 246, 0.1)",
                                                color: "#60a5fa",
                                                border: "1px solid rgba(59, 130, 246, 0.2)",
                                            }}
                                        >
                                            🗓️ {card.date}
                                        </span>
                                    </div>
                                </div>

                                {/* Short testimonial quote */}
                                <p
                                    className="text-[13px] text-white/45 italic leading-relaxed pl-3.5 py-2"
                                    style={{
                                        borderLeft:
                                            "2px solid rgba(59, 130, 246, 0.35)",
                                    }}
                                >
                                    &ldquo;
                                    {card.review.length > 130
                                        ? card.review.slice(0, 127) + "…"
                                        : card.review}
                                    &rdquo;
                                </p>

                                {/* Highlights */}
                                <div className="pt-3 mt-1 border-t border-white/[0.06]">
                                    <p
                                        className="text-[11px] font-semibold mb-3 uppercase tracking-wider"
                                        style={{
                                            background:
                                                "linear-gradient(90deg, #3b82f6, #8b5cf6)",
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor:
                                                "transparent",
                                            backgroundClip: "text",
                                        }}
                                    >
                                        Highlights
                                    </p>
                                    <ul className="flex flex-col gap-3">
                                        {card.responsibilities
                                            .slice(0, 2)
                                            .map((responsibility) => (
                                                <li
                                                    key={responsibility}
                                                    className="flex items-start gap-2.5 text-white/55 text-[13px] leading-relaxed"
                                                >
                                                    <CheckCircle2
                                                        size={14}
                                                        className="text-blue-400 mt-0.5 flex-shrink-0"
                                                    />
                                                    {responsibility}
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ===================== DESKTOP: Original Timeline Layout ===================== */}
                <div className="mt-32 relative hidden md:block">
                    <div className="relative z-50 xl:space-y-32 space-y-10">
                        {expCards.map((card) => (
                            <div key={card.title} className="exp-card-wrapper">
                                <div className="xl:w-2/6">
                                    <GlowCard card={card}>
                                        <div>
                                            <img
                                                src={card.imgPath}
                                                alt={card.title}
                                                className="items-center justify-center w-full h-full object-cover rounded-lg"
                                            />
                                        </div>
                                    </GlowCard>
                                </div>
                                <div className="xl:w-4/6">
                                    <div className="flex items-start relative">
                                        <div className="timeline-wrapper xl:left-10 md:left-10 left-5">
                                            <div className="timeline" />
                                            <div className="gradient-line w-1 h-full" />
                                        </div>
                                        <div className="expText flex xl:gap-20 md:gap-10 gap-5 relative z-40">
                                            <div className="timeline-logo relative z-50 p-2.5 md:p-3 overflow-hidden">
                                                <img
                                                    src={card.logoPath}
                                                    alt="logo"
                                                    className="object-contain max-h-full max-w-full rounded-lg"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h1 className="font-bold text-2xl md:text-3xl text-white">
                                                    {card.title}
                                                </h1>

                                                {/* Date badge */}
                                                <div className="my-4">
                                                    <span className="hero-badge shimmer-badge text-sm text-white/60 flex items-center gap-2 w-fit">
                                                        🗓️ {card.date}
                                                    </span>
                                                </div>

                                                <p
                                                    className="text-sm font-semibold mb-4 uppercase tracking-wider"
                                                    style={{
                                                        background:
                                                            "linear-gradient(90deg, #3b82f6, #8b5cf6)",
                                                        WebkitBackgroundClip:
                                                            "text",
                                                        WebkitTextFillColor:
                                                            "transparent",
                                                        backgroundClip: "text",
                                                    }}
                                                >
                                                    Responsibilities
                                                </p>

                                                <ul className="list-none flex flex-col gap-4">
                                                    {card.responsibilities.map(
                                                        (responsibility) => (
                                                            <li
                                                                key={
                                                                    responsibility
                                                                }
                                                                className="flex items-start gap-3 text-white/60 text-base"
                                                            >
                                                                <span
                                                                    className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                                                                    style={{
                                                                        background:
                                                                            "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                                                                    }}
                                                                />
                                                                {responsibility}
                                                            </li>
                                                        ),
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile tab fade-in animation */}
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                .exp-tab-active {
                    display: flex;
                    animation: expFadeIn 0.35s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }
                @keyframes expFadeIn {
                    from { opacity: 0; transform: translateY(8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                /* Hide scrollbar on tab pills */
                .exp-tabs-scroll::-webkit-scrollbar { display: none; }
            `,
                }}
            />
        </section>
    );
};

export default ExperienceSection;
