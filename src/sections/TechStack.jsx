"use client";

import TitleHeader from "../components/TitleHeader";
import { techStackIcons } from "../constants";
import TechIcon from "../components/Models/TechLogos/TechIcon";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Canvas } from "@react-three/fiber";
import { View, Preload } from "@react-three/drei";
import { useRef, Suspense } from "react";

const TechCard = ({ icon }) => {
    const trackRef = useRef();

    return (
        <div className="card-border tech-card overflow-hidden group xl:rounded-full rounded-lg">
            <div className="tech-card-animated-bg" />
            <div className="tech-card-content">
                <div className="tech-icon-wrapper" ref={trackRef}>
                    {/* The View component will 'portal' the 3D content into this div's position */}
                    <View track={trackRef}>
                        <Suspense fallback={null}>
                            <TechIcon model={icon} />
                        </Suspense>
                    </View>
                </div>
                <div className="padding-x w-full animate-gradient-text">
                    <p>{icon.name}</p>
                </div>
            </div>
        </div>
    );
};

const TechStack = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        gsap.fromTo(
            ".tech-card",
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power2.inOut",
                stagger: 0.2,
                scrollTrigger: {
                    trigger: "#skills",
                    start: "top center",
                },
            },
        );
    });

    return (
        <div
            id="skills"
            className="flex-center section-padding relative"
            ref={containerRef}
        >
            <div className="w-full h-full md:px-10 px-5 relative z-10">
                <TitleHeader
                    title="My Preffered Tech Stack"
                    sub="What am I equipped with? 🤔"
                />
                <div className="tech-grid">
                    {techStackIcons.map((icon) => (
                        <TechCard key={icon.name} icon={icon} />
                    ))}
                </div>
            </div>

            {/* Global Canvas for all Views inside TechStack */}
            {/* z-index 50 ensures models are on top of card backgrounds */}
            <Canvas
                eventSource={containerRef}
                className="pointer-events-none fixed inset-0 z-50"
                style={{ pointerEvents: "none" }}
            >
                <View.Port />
                <Preload all />
            </Canvas>
        </div>
    );
};

export default TechStack;
