"use client";

import React, { useEffect, useState } from "react";
import { navLinks } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const NavBar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState("");

    useGSAP(() => {
        gsap.fromTo(
            ".navbar .logo",
            { y: -20, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
        );
        gsap.fromTo(
            ".navbar nav.desktop li",
            { y: -20, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.1,
                ease: "power2.out",
                delay: 0.3,
            },
        );
        gsap.fromTo(
            ".navbar .contact-btn",
            { y: -20, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.5 },
        );
    });

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);

            // Active link detection via scroll position
            const sections = navLinks.map((n) => n.link.replace("#", ""));
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i]);
                if (el && window.scrollY >= el.offsetTop - 200) {
                    setActiveLink("#" + sections[i]);
                    break;
                }
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    const handleMobileLinkClick = () => setMenuOpen(false);

    return (
        <>
            <header
                className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}`}
            >
                <div className="inner">
                    {/* Logo */}
                    <a className="logo" href="#hero">
                        Adi Jain
                    </a>

                    {/* Desktop Nav */}
                    <nav className="desktop">
                        <ul>
                            {navLinks.map(({ link, name }) => (
                                <li key={name} className="group">
                                    <a
                                        href={link}
                                        className="relative py-1 block"
                                    >
                                        <span
                                            className={`transition-colors duration-300 text-sm tracking-wide ${
                                                activeLink === link
                                                    ? "text-white"
                                                    : "text-white/60 hover:text-white"
                                            }`}
                                        >
                                            {name}
                                        </span>
                                        <span
                                            className={`absolute -bottom-0.5 left-0 h-0.5 transition-all duration-300 rounded-full ${
                                                activeLink === link
                                                    ? "w-full"
                                                    : "w-0 group-hover:w-full"
                                            }`}
                                            style={{
                                                background:
                                                    "linear-gradient(90deg, #3b82f6, #8b5cf6)",
                                            }}
                                        />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="flex items-center gap-4">
                        {/* Contact Button */}
                        <a
                            href="#contact"
                            className="contact-btn group hidden lg:flex"
                        >
                            <div className="inner">
                                <span>Contact me</span>
                            </div>
                        </a>

                        {/* Hamburger Button */}
                        <button
                            className={`hamburger ${menuOpen ? "open" : ""}`}
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Toggle mobile menu"
                        >
                            <span />
                            <span />
                            <span />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Full-Screen Menu */}
            <div className={`mobile-menu ${menuOpen ? "open" : "closed"}`}>
                {/* Close area at top */}
                <div className="absolute top-6 right-6">
                    <button
                        className={`hamburger open`}
                        onClick={() => setMenuOpen(false)}
                        aria-label="Close menu"
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                </div>

                {/* Brand in mobile menu */}
                <p
                    className="text-4xl font-bold mb-4"
                    style={{
                        background:
                            "linear-gradient(135deg, #ffffff 0%, #94a3b8 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                    }}
                >
                    Adi Jain
                </p>

                <div
                    style={{
                        width: "40px",
                        height: "2px",
                        background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
                        borderRadius: "9999px",
                        marginBottom: "2rem",
                    }}
                />

                {navLinks.map(({ link, name }) => (
                    <a
                        key={name}
                        href={link}
                        onClick={handleMobileLinkClick}
                        className="text-2xl font-semibold text-white/80 hover:text-white transition-all duration-200 hover:scale-105"
                    >
                        {name}
                    </a>
                ))}

                <a
                    href="#contact"
                    onClick={handleMobileLinkClick}
                    className="mt-4 px-8 py-3 rounded-full font-semibold text-white text-lg"
                    style={{
                        background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                        boxShadow: "0 0 30px rgba(59,130,246,0.4)",
                    }}
                >
                    Contact Me
                </a>
            </div>
        </>
    );
};

export default NavBar;
