"use client";

import Hero from "../src/sections/Hero";
import Contact from "../src/sections/Contact";
import LogoSection from "../src/sections/LogoSection";
import NavBar from "../src/components/NavBar";
import FeatureCards from "../src/sections/FeatureCards";
import ShowcaseSection from "../src/sections/ShowcaseSection";
import ExperienceSection from "../src/sections/ExperienceSection";
import SkillsSection from "../src/sections/SkillsSection";
import TestimonialsSection from "../src/sections/TestimonialsSection";
import Footer from "../src/sections/Footer";

export default function Home() {
    return (
        <>
            <NavBar />
            <Hero />
            <ShowcaseSection />
            <LogoSection />
            <FeatureCards />
            <ExperienceSection />
            <SkillsSection />
            <TestimonialsSection />
            <Contact />
            <Footer />
        </>
    );
}
