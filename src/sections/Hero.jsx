"use client";

import AnimatedCounter from "../components/AnimatedCounter";
import Button from "../components/Button";
import HeroExperience from "../components/HeroModels/HeroExperience";
import ResumeViewer from "../components/ResumeViewer";
import { words } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useState } from "react";

const Hero = () => {
    const [showScroll, setShowScroll] = useState(true);
    const [showResume, setShowResume] = useState(false);

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
            ".see-button",
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.5, delay: 1, ease: "power2.inOut" },
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

            <div className="hero-layout">
                {/* LEFT: HERO CONTENT */}
                <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5">
                    <div className="flex flex-col gap-7">
                        {/* Availability badge */}
                        <div className="hero-badge shimmer-badge w-fit flex items-center gap-2">
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
                                                <span>{word.text}</span>
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
                                undergraduate specializing <br /> in
                                AI&nbsp;&amp;&nbsp;ML, passionate about building
                                products that matter.
                            </p>
                        </div>

                        <Button
                            className="see-button md:w-80 md:h-16 w-60 h-12"
                            id="button"
                            text="See my Work"
                        />
                    </div>
                </header>

                {/* RIGHT: 3D MODEL */}
                <figure>
                    <div className="hero-3d-layout">
                        <HeroExperience
                            onOpenResume={() => setShowResume(true)}
                        />
                    </div>
                </figure>
            </div>

            {/* Scroll Indicator */}
            {showScroll && (
                <div className="scroll-indicator" aria-hidden="true">
                    <div className="chevron" />
                    <div className="chevron" />
                </div>
            )}

            <AnimatedCounter />

            {/* Animated Resume Viewer — mounts as full-screen overlay */}
            {showResume && (
                <ResumeViewer onClose={() => setShowResume(false)} />
            )}
        </section>
    );
};

export default Hero;
