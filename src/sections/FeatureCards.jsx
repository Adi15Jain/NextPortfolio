"use client";

import { abilities } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const iconGradients = [
    "linear-gradient(135deg, #3b82f6, #06b6d4)",
    "linear-gradient(135deg, #8b5cf6, #ec4899)",
    "linear-gradient(135deg, #10b981, #3b82f6)",
    "linear-gradient(135deg, #f59e0b, #ef4444)",
];

const FeatureCards = () => {
    useGSAP(() => {
        gsap.utils.toArray(".feature-card").forEach((card, i) => {
            gsap.fromTo(
                card,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: i * 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                    },
                },
            );
        });
    }, []);

    return (
        <div className="w-full padding-x-lg">
            <div className="mx-auto grid-4-cols">
                {abilities.map(({ imgPath, title, desc }, index) => (
                    <div
                        key={title}
                        className="feature-card glass-card rounded-2xl p-8 flex flex-col gap-5 transition-all duration-300 hover:-translate-y-2 cursor-default"
                        style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                        {/* Icon bubble */}
                        <div
                            className="w-14 h-14 flex items-center justify-center rounded-2xl flex-shrink-0"
                            style={{
                                background:
                                    iconGradients[index % iconGradients.length],
                            }}
                        >
                            <img
                                src={imgPath}
                                alt={title}
                                className="w-7 h-7 object-contain"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <h3 className="text-white text-xl font-bold">
                                {title}
                            </h3>
                            <p className="text-white/50 text-sm leading-relaxed">
                                {desc}
                            </p>
                        </div>

                        {/* Subtle bottom accent line */}
                        <div
                            className="h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full mt-auto"
                            style={{
                                background:
                                    iconGradients[index % iconGradients.length],
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeatureCards;
