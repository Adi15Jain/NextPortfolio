"use client";

import TitleHeader from "../components/TitleHeader";
import { TrendingUp } from "lucide-react";
import { expCards } from "../constants/index";
import GlowCard from "../components/GlowCard";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ExperienceSection = () => {
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

    return (
        <section
            id="experience"
            className="w-full md:mt-40 mt-20 section-padding xl:px-0"
        >
            <div className="w-full h-full md:px-20 px-5">
                <TitleHeader
                    title="Experience and Learning"
                    sub={
                        <span className="flex items-center gap-1.5">
                            <TrendingUp size={13} className="text-blue-400" />{" "}
                            My Overview
                        </span>
                    }
                />
                <div className="mt-32 relative">
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
        </section>
    );
};

export default ExperienceSection;
