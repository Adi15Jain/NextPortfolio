"use client";

import React, { useEffect, useState } from "react";
import { navLinks, socialImgs } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Activity, Wifi, Instagram, Github, Linkedin } from "lucide-react";

const socialColors = {
    insta: "#e1306c",
    github: "#60a5fa",
    linkedin: "#0a66c2",
    x: "#ffffff",
};

const socialIcons = {
    insta: Instagram,
    github: Github,
    linkedin: Linkedin,
};

const NavBar = () => {
    const pathname = usePathname();
    const isHome = pathname === "/" || pathname === "";
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState("");
    const [currentPing, setCurrentPing] = useState("---");
    const [isOnline, setIsOnline] = useState(true);

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
            const sections = navLinks
                .map((n) => n.link.replace("#", ""))
                .filter((sec) => !sec.startsWith("/")); // Ignore absolute page links for scroll tracking

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

    // Monitor browser online/offline status
    useEffect(() => {
        if (typeof window === "undefined") return;
        setIsOnline(navigator.onLine);

        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => {
            setIsOnline(false);
            setCurrentPing("---");
        };

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);
        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    // Setup live ping (RTT) tracking for menu telemetry
    useEffect(() => {
        if (!isOnline) {
            setCurrentPing("---");
            return;
        }

        const measurePing = async () => {
            const startTime = performance.now();
            try {
                await fetch(`/robots.txt?t=${Date.now()}`, {
                    method: "HEAD",
                    cache: "no-store",
                    headers: { "Cache-Control": "no-cache" },
                });
                const endTime = performance.now();
                const rtt = Math.round(endTime - startTime);
                setCurrentPing(Math.min(999, Math.max(1, rtt)));
            } catch (err) {
                setCurrentPing("---");
            }
        };

        measurePing();
        const interval = setInterval(measurePing, 5000);
        return () => clearInterval(interval);
    }, [isOnline]);

    // Prevent body and html scroll when mobile menu is open (fixed-position viewport lock)
    useEffect(() => {
        if (menuOpen) {
            const scrollY = window.scrollY;
            document.body.style.position = "fixed";
            document.body.style.top = `-${scrollY}px`;
            document.body.style.left = "0";
            document.body.style.width = "100%";
            document.body.style.height = "100dvh";
            document.body.style.overflow = "hidden";
            document.documentElement.style.overscrollBehavior = "none";
        } else {
            const scrollY = document.body.style.top;
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.left = "";
            document.body.style.width = "";
            document.body.style.height = "";
            document.body.style.overflow = "";
            document.documentElement.style.overscrollBehavior = "";

            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
            }
        }
        return () => {
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.left = "";
            document.body.style.width = "";
            document.body.style.height = "";
            document.body.style.overflow = "";
            document.documentElement.style.overscrollBehavior = "";
        };
    }, [menuOpen]);

    const handleMobileLinkClick = () => setMenuOpen(false);

    const getHref = (link) => {
        if (link.startsWith("/")) {
            return link;
        }
        return isHome ? link : `/${link}`;
    };

    return (
        <>
            <header
                className={`navbar ${scrolled ? "scrolled" : "not-scrolled"} ${
                    menuOpen ? "nav-menu-open" : ""
                }`}
            >
                <div className="inner">
                    {/* Logo */}
                    <a
                        className={`logo flex items-center gap-2.5 transition-all duration-300 ${
                            menuOpen
                                ? "opacity-0 pointer-events-none -translate-x-3"
                                : "opacity-100 translate-x-0"
                        }`}
                        href={isHome ? "#hero" : "/"}
                    >
                        <Image
                            src="/images/avatar_noBg.png"
                            alt="Adi Jain"
                            width={64}
                            height={64}
                            className="rounded-full"
                        />
                        <span>Adi Jain</span>
                    </a>

                    {/* Desktop Nav */}
                    <nav className="desktop">
                        <ul>
                            {navLinks.map(({ link, name }) => (
                                <li key={name} className="group">
                                    <a
                                        href={getHref(link)}
                                        className="relative py-1 block"
                                    >
                                        <span
                                            className={`transition-colors duration-300 text-md tracking-wide ${
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
                            href={isHome ? "#contact" : "/#contact"}
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
                {/* Brand in mobile menu overlay */}
                <div className="flex flex-col items-center gap-2 mt-4 mb-1">
                    <div className="relative group">
                        <Image
                            src="/images/avatar_noBg.png"
                            alt="Adi Jain"
                            width={64}
                            height={64}
                            className="rounded-full bg-white/5 border border-white/10 relative z-10"
                        />
                        {/* Pulsing cyber-halo element */}
                        <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-[10px] scale-105 animate-pulse -z-0" />
                    </div>
                    <p
                        className="text-2xl font-bold tracking-wider font-mono mt-2"
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
                    <p className="text-[9px] font-mono tracking-[0.18em] text-white/30 uppercase">
                        System Design & Product Engineering
                    </p>
                </div>
                <div
                    style={{
                        width: "60px",
                        height: "2.5px",
                        background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
                        borderRadius: "9999px",
                        marginBottom: "1rem",
                    }}
                />

                {/* Links list */}
                <nav className="flex flex-col items-center gap-4.5">
                    {navLinks.map(({ link, name }) => (
                        <a
                            key={name}
                            href={getHref(link)}
                            onClick={handleMobileLinkClick}
                            className="relative text-xl font-semibold tracking-wide font-mono text-white/70 hover:text-white transition-all duration-300 flex items-center hover:scale-105"
                        >
                            {name}
                            {name === "Projects" && (
                                <span className="nav-projects-badge">HOT</span>
                            )}
                        </a>
                    ))}
                </nav>

                {/* Styled Mobile Contact Button */}
                <a
                    href={isHome ? "#contact" : "/#contact"}
                    onClick={handleMobileLinkClick}
                    className="mt-3 px-8 py-2.5 rounded-xl font-bold font-mono text-white text-[13px] tracking-widest transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] border border-blue-500/20"
                    style={{
                        background:
                            "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                    }}
                >
                    CONTACT ME
                </a>

                {/* Mobile Telemetry & Contact Info at Bottom */}
                <div className="mt-auto flex flex-col items-center gap-3.5 w-full">
                    {/* Live active telemetry box */}
                    <div className="menu-telemetry-box">
                        {isOnline ? (
                            <>
                                <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                                    <Activity
                                        size={11}
                                        className="animate-pulse"
                                    />
                                    <span className="text-white/40 font-normal">
                                        SYS:
                                    </span>{" "}
                                    ACTIVE
                                </span>
                                <span className="text-white/10">|</span>
                                <span className="flex items-center gap-1 text-cyan-400 font-medium">
                                    <Wifi size={11} />
                                    <span className="text-white/40 font-normal">
                                        PING:
                                    </span>{" "}
                                    {currentPing === "---"
                                        ? currentPing
                                        : `${currentPing}MS`}
                                </span>
                            </>
                        ) : (
                            <>
                                <span className="flex items-center gap-1.5 text-rose-500 font-medium animate-pulse">
                                    <Activity size={11} />
                                    <span className="text-white/40 font-normal">
                                        SYS:
                                    </span>{" "}
                                    OFFLINE
                                </span>
                            </>
                        )}
                    </div>

                    {/* Social media contact links */}
                    <div className="menu-socials">
                        {socialImgs.map((img) => (
                            <a
                                key={img.url}
                                className="menu-social-icon relative group"
                                href={img.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={img.name}
                                style={{
                                    "--hover-color":
                                        socialColors[img.name] || "#ffffff",
                                }}
                            >
                                {(() => {
                                    const IconComponent = socialIcons[img.name];
                                    return IconComponent ? (
                                        <IconComponent
                                            size={15}
                                            className="transition-all duration-300 opacity-60 group-hover:opacity-100 text-white z-10"
                                        />
                                    ) : null;
                                })()}
                                {/* Backlight halo on hover */}
                                <div
                                    className="absolute inset-0 rounded-lg filter blur-[8px] opacity-0 group-hover:opacity-30 transition-all duration-300 -z-0"
                                    style={{
                                        background:
                                            socialColors[img.name] || "#ffffff",
                                    }}
                                />
                            </a>
                        ))}
                    </div>

                    <p className="text-[9px] font-mono text-white/20 tracking-wider">
                        © {new Date().getFullYear()} ADI JAIN • ALL CHANNELS
                        SECURED
                    </p>
                </div>
            </div>
        </>
    );
};

export default NavBar;
