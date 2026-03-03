"use client";

import TitleHeader from "../components/TitleHeader";
import { expCards } from "../constants/index";
import GlowCard from "../components/GlowCard";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ExperienceSection = () => {
    useGSAP(() => {
        gsap.utils.toArray(".timeline-card").forEach((card) => {
            gsap.from(card, {
                xPercent: -100,
                opacity: 0,
                transformOrigin: "left left",
                duration: 1,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                },
            });
        });
        gsap.to(".timeline", {
            transformOrigin: "bottom bottom",
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: ".timeline",
                start: "top center",
                end: "70% center",
                onUpdate: (self) => {
                    gsap.to(".timeline", { scaleY: 1 - self.progress });
                },
            },
        });
        gsap.utils.toArray(".expText").forEach((text) => {
            gsap.from(text, {
                opacity: 0,
                x: 30,
                duration: 1,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: text,
                    start: "top 60%",
                },
            });
        });
    }, []);

    return (
        <section
            id="experience"
            className="w-full md:mt-40 mt-20 section-padding xl:px-0"
        >
            <div className="w-full h-full md:px-20 px-5">
                <TitleHeader
                    title="Experience and Learning"
                    sub="📊 My Overview"
                />
                <div className="mt-32 relative">
                    <div className="relative z-50 xl:space-y-32 space-y-10">
                        {expCards.map((card, index) => (
                            <div key={card.title} className="exp-card-wrapper">
                                <div className="xl:w-2/6">
                                    <GlowCard card={card} index={index}>
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
                                    <div className="flex items-start">
                                        <div className="timeline-wrapper">
                                            <div className="timeline" />
                                            <div className="gradient-line w-1 h-full" />
                                        </div>
                                        <div className="expText flex xl:gap-20 md:gap-10 gap-5 relative z-20">
                                            <div className="timeline-logo">
                                                <img
                                                    src={card.logoPath}
                                                    alt="logo"
                                                    className="rounded-full lg:mr-3"
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
