"use client";

import { useEffect, useState } from "react";
import Hero from "../src/sections/Hero";
import Contact from "../src/sections/Contact";
import LogoSection from "../src/sections/LogoSection";
import NavBar from "../src/components/NavBar";
import FeatureCards from "../src/sections/FeatureCards";
import ShowcaseSection from "../src/sections/ShowcaseSection";
import ExperienceSection from "../src/sections/ExperienceSection";
import Footer from "../src/sections/Footer";
import WorldExperience from "../src/world/WorldExperience";
import { useDeviceTier } from "../src/hooks/useDeviceCapabilities";

/**
 * The classic, fully-semantic portfolio. It is the SSR/SEO substrate, the
 * accessibility fallback, and what every non-high-tier device sees.
 */
function ClassicHome({ onEnterWorld }) {
    return (
        <>
            <NavBar onEnterWorld={onEnterWorld} />
            <Hero />
            <ShowcaseSection />
            <LogoSection />
            <FeatureCards />
            <ExperienceSection />
            <Contact />
            <Footer />
        </>
    );
}

export default function Home() {
    const tier = useDeviceTier(); // resolves to "high" on capable desktops
    const [forceClassic, setForceClassic] = useState(false);
    const [decided, setDecided] = useState(false);

    // Resolve the user's explicit preference on mount (URL or stored).
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const pref = params.get("view") || localStorage.getItem("view");
        if (pref === "classic") setForceClassic(true);
        setDecided(true);
    }, []);

    const showWorld = decided && !forceClassic && tier === "high";

    if (showWorld) {
        return (
            <WorldExperience
                onExitToClassic={() => {
                    try {
                        localStorage.setItem("view", "classic");
                    } catch (e) {
                        /* private mode */
                    }
                    setForceClassic(true);
                }}
            />
        );
    }

    return (
        <ClassicHome
            onEnterWorld={
                tier === "high"
                    ? () => {
                          try {
                              localStorage.removeItem("view");
                          } catch (e) {
                              /* ignore */
                          }
                          setForceClassic(false);
                      }
                    : null
            }
        />
    );
}
