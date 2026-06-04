"use client";

import AnimatedCounter from "../components/AnimatedCounter";
import Button from "../components/Button";
import dynamic from "next/dynamic";

const HeroExperience = dynamic(
    () => import("../components/HeroModels/HeroExperience"),
    {
        ssr: false,
        loading: () => <div className="w-full h-full bg-transparent" />,
    },
);

import { words } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const HeroFallback = ({ onLoad }) => {
    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center rounded-3xl bg-transparent border-0 p-6 group overflow-hidden select-none">
            {/* Pulsing glow highlights */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-cyan-500/10 filter blur-[40px] animate-pulse pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-purple-500/8 filter blur-[25px] animate-pulse delay-700 pointer-events-none" />

            {/* Tech grid aesthetic overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:20px_20px] opacity-30 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center text-center gap-4">
                {/* Visual Graphic Representation: A beautifully styled glowing CPU node */}
                <div className="relative w-20 h-20 flex items-center justify-center rounded-2xl bg-white/[0.03] border border-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] text-cyan-400">
                    <div className="absolute inset-0 border border-cyan-500/20 rounded-2xl scale-105" />
                    <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-400 rounded-tl-md" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-cyan-400 rounded-tr-md" />
                    <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-cyan-400 rounded-bl-md" />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-400 rounded-br-md" />

                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center shadow-lg shadow-cyan-500/10">
                        <svg
                            className="w-6 h-6 animate-pulse text-cyan-400"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <rect x="4" y="4" width="16" height="16" rx="2" />
                            <path d="M9 9h6v6H9z" />
                            <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
                        </svg>
                    </div>
                </div>

                <div className="flex flex-col gap-1.5 mt-2">
                    <h3 className="text-white/80 text-sm font-semibold tracking-wider font-mono uppercase">
                        Interactive 3D Room
                    </h3>
                    <p className="text-white/35 text-[10px] tracking-wide font-mono leading-relaxed max-w-[280px]">
                        Paused to maximize device performance and save battery
                        life.
                    </p>
                </div>

                <button
                    onClick={onLoad}
                    className="mt-3 px-5 py-2 rounded-xl text-[10px] font-bold tracking-widest font-mono text-cyan-400 bg-cyan-500/5 hover:bg-cyan-500/10 border border-cyan-500/20 active:scale-95 transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] shadow-md"
                >
                    TAP TO LOAD 3D ROOM
                </button>
            </div>
        </div>
    );
};

const Hero = () => {
    const [showScroll, setShowScroll] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [load3D, setLoad3D] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setIsMobile(window.innerWidth < 768);
            const checkMobile = () => {
                setIsMobile(window.innerWidth < 768);
            };
            window.addEventListener("resize", checkMobile);
            return () => window.removeEventListener("resize", checkMobile);
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => setShowScroll(false), 5000);
        const handleScroll = () => setShowScroll(false);
        window.addEventListener("scroll", handleScroll, {
            passive: true,
            once: true,
        });
        return () => {
            clearTimeout(timer);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useGSAP(() => {
        gsap.fromTo(
            ".hero-text h1",
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.5,
                stagger: 0.2,
                ease: "power2.inOut",
            },
        );
        gsap.fromTo(
            ".hero-description p",
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.5,
                delay: 0.5,
                ease: "power2.inOut",
            },
        );
        gsap.fromTo(
            ".see-button, .download-btn",
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.5,
                delay: 1,
                stagger: 0.15,
                ease: "power2.inOut",
            },
        );
        gsap.fromTo(
            ".hero-3d-layout",
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.5,
                delay: 1.5,
                ease: "power2.inOut",
            },
        );
        gsap.fromTo(
            ".background",
            { opacity: 0 },
            { opacity: 1, duration: 2, ease: "power2.inOut" },
        );

        // Parallax effect on scroll
        gsap.to(".blob-1", {
            yPercent: 35,
            ease: "none",
            scrollTrigger: {
                trigger: "#hero",
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
        });
        gsap.to(".blob-2", {
            yPercent: -25,
            ease: "none",
            scrollTrigger: {
                trigger: "#hero",
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
        });
        gsap.to(".hero-text", {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
                trigger: "#hero",
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
        });
        gsap.to(".hero-3d-layout", {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
                trigger: "#hero",
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
        });
    });

    return (
        <section id="hero" className="relative overflow-hidden">
            {/* Dot Grid Pattern */}
            <div className="hero-dot-grid" aria-hidden="true" />

            {/* Ambient Blobs */}
            <div className="blob blob-1 gpu-layer" aria-hidden="true" />
            <div className="blob blob-2 gpu-layer" aria-hidden="true" />
            <div className="blob blob-3 gpu-layer" aria-hidden="true" />

            {/* Original bg image (kept for 3D model lighting) */}
            <div className="background absolute top-0 left-0 z-10 opacity-30">
                <img src="/images/bg.png" alt="" aria-hidden="true" />
            </div>

            <div className="hero-layout relative z-10 pb-[42vh] md:pb-0">
                {/* LEFT: HERO CONTENT */}
                <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5 relative z-20 pointer-events-none">
                    <div className="flex flex-col gap-7">
                        {/* Availability badge */}
                        <div className="hero-badge shimmer-badge w-fit flex items-center gap-2 pointer-events-auto">
                            <span
                                className="w-2 h-2 rounded-full bg-green-400 inline-block"
                                style={{
                                    boxShadow:
                                        "0 0 8px rgba(74, 222, 128, 0.8)",
                                    animation: "pulse 2s ease-in-out infinite",
                                }}
                            />
                            <span className="text-white/80 text-sm">
                                Open to opportunities
                            </span>
                        </div>

                        <div className="hero-text">
                            <h1>
                                Shaping
                                <span className="slide">
                                    <span className="wrapper">
                                        {words.map((word, index) => (
                                            <span
                                                key={index}
                                                className="flex items-center md:gap-3 gap-1 pb-2"
                                            >
                                                <img
                                                    src={word.imgPath}
                                                    alt={word.text}
                                                    className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50"
                                                />
                                                <span
                                                    style={{
                                                        background:
                                                            word.gradient ||
                                                            "linear-gradient(135deg, #ffffff 30%, #94a3b8 100%)",
                                                        WebkitBackgroundClip:
                                                            "text",
                                                        WebkitTextFillColor:
                                                            "transparent",
                                                        backgroundClip: "text",
                                                    }}
                                                >
                                                    {word.text}
                                                </span>
                                            </span>
                                        ))}
                                    </span>
                                </span>
                            </h1>
                            <h1>into Real Projects</h1>
                            <h1
                                style={{
                                    background:
                                        "linear-gradient(135deg, #ffffff 30%, #94a3b8 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                that Deliver Results
                            </h1>
                        </div>

                        <div className="hero-description">
                            <p className="text-white/60 md:text-xl relative z-10 pointer-events-none leading-relaxed">
                                Hi, I&apos;m Adi 👋 — a Computer Science
                                Graduate specializing in <br />{" "}
                                AI&nbsp;&amp;&nbsp;ML, building products that
                                matter.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Button
                                className="see-button md:w-80 md:h-16 w-60 h-12 pointer-events-auto"
                                id="button"
                                text="See my Work"
                            />
                        </div>
                    </div>
                </header>

                {/* RIGHT: 3D MODEL IN THE BACKGROUND (Bottom-most layer inside hero-layout, z-0) */}
                <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
                    <div className="relative w-full h-full">
                        {/* The room canvas is sized exactly to the viewport but absolutely positioned */}
                        <div className="absolute md:-top-16 lg:-top-20 md:-right-12 lg:-right-20 md:w-[55%] lg:w-[65%] xl:w-[70%] w-full h-[45vh] min-h-[350px] md:h-full md:min-h-[50vh] bottom-0 right-0 z-0 pointer-events-auto">
                            {!isMobile || load3D ? (
                                <HeroExperience />
                            ) : (
                                <HeroFallback onLoad={() => setLoad3D(true)} />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            {showScroll && (
                <div className="scroll-indicator" aria-hidden="true">
                    <div className="chevron" />
                    <div className="chevron" />
                </div>
            )}

            <AnimatedCounter />
        </section>
    );
};

export default Hero;
