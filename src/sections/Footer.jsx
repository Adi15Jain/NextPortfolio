"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { socialImgs } from "../constants";
import {
    Cpu,
    Wifi,
    Activity,
    ShieldCheck,
    ShieldAlert,
    Github,
    Instagram,
    Linkedin,
    Eye,
} from "lucide-react";

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

const Footer = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [currentTime, setCurrentTime] = useState("");
    const [currentPing, setCurrentPing] = useState("---");
    const [isOnline, setIsOnline] = useState(true);
    const [visitCount, setVisitCount] = useState("---");

    // Setup visitor count tracking
    useEffect(() => {
        const incrementAndFetchVisits = async () => {
            try {
                // Increment visitor count publicly and retrieve the new value
                const response = await fetch(
                    "https://api.counterapi.dev/v1/adijain-portfolio/visits/up",
                );
                const data = await response.json();
                if (data && typeof data.count === "number") {
                    setVisitCount(data.count.toLocaleString());
                }
            } catch (err) {
                try {
                    // Fallback to read-only visits value if increment fails
                    const response = await fetch(
                        "https://api.counterapi.dev/v1/adijain-portfolio/visits",
                    );
                    const data = await response.json();
                    if (data && typeof data.count === "number") {
                        setVisitCount(data.count.toLocaleString());
                    }
                } catch (e) {
                    setVisitCount("---");
                }
            }
        };
        incrementAndFetchVisits();
    }, []);

    // Setup current system time ticker
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString("en-US", { hour12: false }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
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

    // Setup dynamic live ping (RTT) tracking
    useEffect(() => {
        if (!isOnline) {
            setCurrentPing("---");
            return;
        }

        const measurePing = async () => {
            const startTime = performance.now();
            try {
                // GET request to robots.txt with cache-busting timestamp for wider server support
                await fetch(`/robots.txt?t=${Date.now()}`, {
                    method: "GET",
                    cache: "no-store",
                    headers: { "Cache-Control": "no-cache" },
                });
                const endTime = performance.now();
                const rtt = Math.round(endTime - startTime);
                // Clamp RTT bounds to make it robust and clean
                setCurrentPing(Math.min(999, Math.max(1, rtt)));
            } catch (err) {
                setCurrentPing("---");
            }
        };

        measurePing();
        const interval = setInterval(measurePing, 5000); // poll every 5s
        return () => clearInterval(interval);
    }, [isOnline]);

    // Canvas 3D Fireflies Particle Loop
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let animationFrameId;

        const resizeCanvas = () => {
            const rect = containerRef.current?.getBoundingClientRect();
            canvas.width = rect?.width || window.innerWidth;
            canvas.height = rect?.height || 240;
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // Particle configuration
        const isMobileDevice =
            typeof window !== "undefined" && window.innerWidth < 768;
        const maxParticles = isMobileDevice ? 12 : 36;
        const particles = [];
        const colors = [
            "rgba(59, 130, 246, ",
            "rgba(139, 92, 246, ",
            "rgba(6, 182, 212, ",
            "rgba(16, 185, 129, ",
        ];

        // Pre-render firefly glow textures onto offscreen canvases once to avoid creating radial gradients in the loop
        const textureSize = 64;
        const halfTexture = textureSize / 2;
        const offscreenCanvases = colors.map((colorPrefix) => {
            const offscreen = document.createElement("canvas");
            offscreen.width = textureSize;
            offscreen.height = textureSize;
            const oCtx = offscreen.getContext("2d");

            const gradient = oCtx.createRadialGradient(
                halfTexture,
                halfTexture,
                0,
                halfTexture,
                halfTexture,
                halfTexture,
            );
            gradient.addColorStop(0, colorPrefix + "1.0)");
            gradient.addColorStop(0.3, colorPrefix + "0.4)");
            gradient.addColorStop(1.0, "transparent");

            oCtx.fillStyle = gradient;
            oCtx.beginPath();
            oCtx.arc(halfTexture, halfTexture, halfTexture, 0, Math.PI * 2);
            oCtx.fill();

            oCtx.beginPath();
            oCtx.arc(halfTexture, halfTexture, 2, 0, Math.PI * 2);
            oCtx.fillStyle = "#ffffff";
            oCtx.fill();

            return offscreen;
        });

        class Firefly3D {
            constructor() {
                this.reset(true);
            }

            reset(init = false) {
                // Spawns with concentrated density near the bottom-center
                const spawnSpread = canvas.width * 0.5;
                this.x = canvas.width / 2 + (Math.random() - 0.5) * spawnSpread;

                // Spawn y position: at the bottom or randomly distributed if initiating
                this.y = init
                    ? Math.random() * canvas.height
                    : canvas.height + 15;

                // 3D Depth coordinate (z): 0.5 (close) to 2.5 (far away)
                this.z = Math.random() * 2.0 + 0.5;

                // Focal length and 3D perspective scale calculation
                const focalLength = 1.5;
                this.scale = focalLength / (focalLength + this.z);

                // Base particle size scaled by 3D perspective depth
                this.baseSize = Math.random() * 2.5 + 1.2;
                this.size = this.baseSize * this.scale;

                // Base vertical speed (upward) scaled by 3D perspective depth
                this.baseVy = -(Math.random() * 0.7 + 0.3);
                this.vy = this.baseVy * this.scale;

                // Horizontal expansion velocity (fanning out) scaled by 3D depth
                this.baseVx = (Math.random() - 0.5) * 0.6;
                this.vx = this.baseVx * this.scale;

                // 3D sway (sine wave movement) settings
                this.phase = Math.random() * Math.PI * 2;
                this.swaySpeed = Math.random() * 0.015 + 0.005;
                this.baseSwayWidth = Math.random() * 2.5 + 0.8;
                this.swayWidth = this.baseSwayWidth * this.scale;

                // Opacity characteristics (distant particles are dimmer)
                this.baseAlpha = Math.random() * 0.6 + 0.4;
                this.alpha = this.baseAlpha * this.scale;
                this.fadeSpeed =
                    (Math.random() * 0.003 + 0.001) * (1 / this.scale);

                // Neon glow color index
                this.colorIndex = Math.floor(Math.random() * colors.length);
            }

            update() {
                this.y += this.vy;
                this.x +=
                    this.vx + Math.sin(this.phase) * this.swayWidth * 0.15;
                this.phase += this.swaySpeed;

                // Fade out as it floats higher
                const verticalPercentage = this.y / canvas.height; // 1 at bottom, 0 at top
                this.alpha =
                    this.baseAlpha *
                    this.scale *
                    Math.min(1, verticalPercentage * 1.5);

                // Reset when faded out, out of bounds, or drifted off the top
                if (
                    this.alpha <= 0.02 ||
                    this.y < -15 ||
                    this.x < -20 ||
                    this.x > canvas.width + 20
                ) {
                    this.reset(false);
                }
            }

            draw() {
                if (this.alpha <= 0.02) return;

                // Blitting pre-rendered canvases using fast, hardware-accelerated drawImage
                const glowRadius = this.size * 5;
                ctx.globalAlpha = Math.max(0, Math.min(1, this.alpha));
                ctx.drawImage(
                    offscreenCanvases[this.colorIndex],
                    this.x - glowRadius,
                    this.y - glowRadius,
                    glowRadius * 2,
                    glowRadius * 2,
                );
            }
        }

        // Initialize particles
        for (let i = 0; i < maxParticles; i++) {
            particles.push(new Firefly3D());
        }

        // High-performance canvas drawing loop
        const loop = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => {
                p.update();
                p.draw();
            });
            animationFrameId = requestAnimationFrame(loop);
        };

        loop();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <footer
            ref={containerRef}
            className="footer relative overflow-hidden bg-gradient-to-t from-[#050508] via-[#050508]/98 to-transparent border-t border-white/[0.02]"
        >
            {/* Interactive 3D Perspective Fireflies Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 pointer-events-none z-0"
            />

            {/* Glowing 3D Neon Horizon Emitter Bar (at the absolute bottom boundary) */}
            <div
                className="absolute bottom-0 left-0 right-0 h-[3px] filter blur-[6px] opacity-80 animate-pulse z-10"
                style={{
                    background:
                        "linear-gradient(90deg, rgba(59,130,246,0.3), rgba(139,92,246,0.8), rgba(6,182,212,0.8), rgba(139,92,246,0.8), rgba(59,130,246,0.3))",
                }}
            />
            <div
                className="absolute bottom-0 left-0 right-0 h-[1.5px] opacity-90 z-10"
                style={{
                    background:
                        "linear-gradient(90deg, transparent 5%, #3b82f6 20%, #8b5cf6 50%, #06b6d4 80%, transparent 95%)",
                }}
            />

            {/* 3D Volumetric Radial Ambient Glow Dome (Rises up behind content) */}
            <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] h-44 rounded-full filter blur-[80px] opacity-20 pointer-events-none z-0 transition-all duration-1000 animate-pulse"
                style={{
                    background:
                        "radial-gradient(ellipse at bottom, #8b5cf6 0%, #06b6d4 45%, #3b82f6 75%, transparent 100%)",
                }}
            />

            {/* Futuristic Top Grid-line Separator */}
            <div
                className="absolute top-0 left-0 right-0 h-[1px]"
                style={{
                    background:
                        "linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.1) 20%, rgba(139,92,246,0.2) 50%, rgba(6,182,212,0.1) 80%, transparent 100%)",
                }}
            />

            {/* Main Footer Grid — 3-column on desktop, stacked on mobile */}
            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-8 pb-8 md:pt-8 md:pb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 items-center">
                    {/* Left Column: Branding & Navigation */}
                    <div className="flex flex-col items-center md:items-start gap-2.5">
                        <div className="flex items-center gap-2.5 group">
                            <div className="p-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] group-hover:border-cyan-500/50 transition-colors duration-300">
                                <Cpu
                                    size={15}
                                    className="text-cyan-400 group-hover:rotate-90 transition-transform duration-500"
                                />
                            </div>
                            <span className="text-sm font-mono font-bold tracking-[0.2em] uppercase bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                                Adi Jain
                            </span>
                        </div>
                        <p className="text-[11px] font-mono tracking-wider text-white/40 text-center md:text-left">
                            SYSTEM DESIGN & PRODUCT ENGINEERING
                        </p>
                        <span
                            className="text-xs font-mono tracking-wide text-cyan-400/40 cursor-not-allowed mt-1 flex items-center gap-1.5 justify-center md:justify-start select-none"
                            title="My blog is currently in progress. Stay tuned!"
                        >
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400/30" />
                            Visit my blog (In Progress)
                        </span>
                    </div>

                    {/* Center Column: Social Icons */}
                    <div className="flex justify-center">
                        <div className="socials flex items-center justify-center gap-4">
                            {socialImgs.map((img) => (
                                <a
                                    key={img.url}
                                    className="icon group relative flex justify-center items-center rounded-xl size-10 md:size-11 cursor-pointer transition-all duration-300 border border-white/[0.08] bg-white/[0.04] backdrop-blur-md"
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
                                        const IconComponent =
                                            socialIcons[img.name];
                                        return IconComponent ? (
                                            <IconComponent
                                                size={18}
                                                className="w-4.5 h-4.5 transition-all duration-300 group-hover:scale-110 z-10 opacity-60 group-hover:opacity-100 text-white group-hover:text-white"
                                            />
                                        ) : null;
                                    })()}
                                    {/* Cybernetic hover backlight halo */}
                                    <div
                                        className="absolute inset-0 rounded-xl filter blur-[12px] opacity-0 group-hover:opacity-30 transition-all duration-300 -z-0"
                                        style={{
                                            background:
                                                socialColors[img.name] ||
                                                "#ffffff",
                                        }}
                                    />
                                    {/* Outer futuristic corner bracket indicator */}
                                    <div className="absolute inset-0 border border-transparent group-hover:border-white/10 rounded-xl transition-all duration-300 scale-90 group-hover:scale-105" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Telemetry Panel */}
                    <div className="flex flex-col items-center md:items-end gap-2 text-[10.5px] sm:text-[11px] font-mono text-white/35 w-full md:w-auto">
                        {/* On Desktop: single horizontal bar */}
                        <div className="hidden md:flex flex-nowrap items-center gap-x-2.5 bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-1.5 backdrop-blur-md whitespace-nowrap">
                            {isOnline ? (
                                <>
                                    <span className="flex items-center gap-1 text-emerald-400 font-medium">
                                        <Activity
                                            size={12}
                                            className="animate-pulse"
                                        />
                                        <span className="text-white/50 font-normal">
                                            SYS:
                                        </span>{" "}
                                        ACTIVE
                                    </span>
                                    <span className="text-white/15">|</span>
                                    <span className="flex items-center gap-1 text-cyan-400 font-medium">
                                        <Wifi size={12} />
                                        <span className="text-white/50 font-normal">
                                            PING:
                                        </span>{" "}
                                        {currentPing === "---"
                                            ? currentPing
                                            : `${currentPing}MS`}
                                    </span>
                                    <span className="text-white/15">|</span>
                                    <span className="flex items-center gap-1 text-purple-400 font-medium">
                                        <ShieldCheck size={12} />
                                        <span className="text-white/50 font-normal">
                                            TLS:
                                        </span>{" "}
                                        SECURE
                                    </span>
                                    <span className="text-white/15">|</span>
                                    <span className="flex items-center gap-1 text-amber-400 font-medium">
                                        <Eye size={12} />
                                        <span className="text-white/50 font-normal">
                                            VISITS:
                                        </span>{" "}
                                        {visitCount}
                                    </span>
                                </>
                            ) : (
                                <>
                                    <span className="flex items-center gap-1 text-rose-500 font-medium animate-pulse">
                                        <ShieldAlert size={12} />
                                        <span className="text-white/30 font-normal">
                                            SYS:
                                        </span>{" "}
                                        OFFLINE
                                    </span>
                                    <span className="text-white/15">|</span>
                                    <span className="flex items-center gap-1 text-white/20 font-normal">
                                        <Wifi
                                            size={12}
                                            className="opacity-30"
                                        />
                                        <span className="text-white/30 font-normal">
                                            PING:
                                        </span>{" "}
                                        ---
                                    </span>
                                    <span className="text-white/15">|</span>
                                    <span className="flex items-center gap-1 text-rose-400/50 font-medium">
                                        <ShieldAlert
                                            size={12}
                                            className="opacity-50"
                                        />
                                        <span className="text-white/30 font-normal">
                                            TLS:
                                        </span>{" "}
                                        INACTIVE
                                    </span>
                                    <span className="text-white/15">|</span>
                                    <span className="flex items-center gap-1 text-white/20 font-normal">
                                        <Eye size={12} className="opacity-30" />
                                        <span className="text-white/30 font-normal">
                                            VISITS:
                                        </span>{" "}
                                        ---
                                    </span>
                                </>
                            )}
                        </div>

                        {/* On Mobile: 2x2 Grid Capsule Badges */}
                        <div className="grid grid-cols-2 gap-2 w-full md:hidden bg-white/[0.02] border border-white/[0.06] rounded-xl p-2.5 backdrop-blur-md">
                            {isOnline ? (
                                <>
                                    {/* Item 1: SYS */}
                                    <div className="flex items-center gap-1.5 text-emerald-400 font-medium bg-white/[0.03] border border-white/[0.04] rounded-lg px-2 py-1.5 justify-center">
                                        <Activity
                                            size={11}
                                            className="animate-pulse"
                                        />
                                        <span className="text-white/40 font-normal text-[9px] tracking-wider">
                                            SYS:
                                        </span>
                                        <span className="text-[10px]">
                                            ACTIVE
                                        </span>
                                    </div>

                                    {/* Item 2: PING */}
                                    <div className="flex items-center gap-1.5 text-cyan-400 font-medium bg-white/[0.03] border border-white/[0.04] rounded-lg px-2 py-1.5 justify-center">
                                        <Wifi size={11} />
                                        <span className="text-white/40 font-normal text-[9px] tracking-wider">
                                            PING:
                                        </span>
                                        <span className="text-[10px]">
                                            {currentPing === "---"
                                                ? currentPing
                                                : `${currentPing}MS`}
                                        </span>
                                    </div>

                                    {/* Item 3: TLS */}
                                    <div className="flex items-center gap-1.5 text-purple-400 font-medium bg-white/[0.03] border border-white/[0.04] rounded-lg px-2 py-1.5 justify-center">
                                        <ShieldCheck size={11} />
                                        <span className="text-white/40 font-normal text-[9px] tracking-wider">
                                            TLS:
                                        </span>
                                        <span className="text-[10px]">
                                            SECURE
                                        </span>
                                    </div>

                                    {/* Item 4: VISITS */}
                                    <div className="flex items-center gap-1.5 text-amber-400 font-medium bg-white/[0.03] border border-white/[0.04] rounded-lg px-2 py-1.5 justify-center">
                                        <Eye size={11} />
                                        <span className="text-white/40 font-normal text-[9px] tracking-wider">
                                            VISITS:
                                        </span>
                                        <span className="text-[10px]">
                                            {visitCount}
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* Item 1: SYS OFFLINE */}
                                    <div className="flex items-center gap-1.5 text-rose-500 font-medium bg-white/[0.03] border border-white/[0.04] rounded-lg px-2 py-1.5 justify-center animate-pulse">
                                        <ShieldAlert size={11} />
                                        <span className="text-white/40 font-normal text-[9px] tracking-wider">
                                            SYS:
                                        </span>
                                        <span className="text-[10px]">
                                            OFFLINE
                                        </span>
                                    </div>

                                    {/* Item 2: PING OFFLINE */}
                                    <div className="flex items-center gap-1.5 text-white/20 font-normal bg-white/[0.03] border border-white/[0.04] rounded-lg px-2 py-1.5 justify-center">
                                        <Wifi
                                            size={11}
                                            className="opacity-30"
                                        />
                                        <span className="text-white/40 font-normal text-[9px] tracking-wider">
                                            PING:
                                        </span>
                                        <span className="text-[10px]">---</span>
                                    </div>

                                    {/* Item 3: TLS INACTIVE */}
                                    <div className="flex items-center gap-1.5 text-rose-400/50 font-medium bg-white/[0.03] border border-white/[0.04] rounded-lg px-2 py-1.5 justify-center">
                                        <ShieldAlert
                                            size={11}
                                            className="opacity-50"
                                        />
                                        <span className="text-white/40 font-normal text-[9px] tracking-wider">
                                            TLS:
                                        </span>
                                        <span className="text-[10px]">
                                            INACTIVE
                                        </span>
                                    </div>

                                    {/* Item 4: VISITS OFFLINE */}
                                    <div className="flex items-center gap-1.5 text-white/20 font-normal bg-white/[0.03] border border-white/[0.04] rounded-lg px-2 py-1.5 justify-center">
                                        <Eye size={11} className="opacity-30" />
                                        <span className="text-white/40 font-normal text-[9px] tracking-wider">
                                            VISITS:
                                        </span>
                                        <span className="text-[10px]">---</span>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-white/35 font-mono">
                                TIME UPTIME:
                            </span>
                            <span className="text-white/70 bg-white/[0.03] px-1.5 py-0.5 rounded border border-white/[0.08]">
                                {currentTime || "00:00:00"}
                            </span>
                        </div>

                        <p className="text-white/35 text-[10px] mt-0.5 tracking-wider text-center md:text-right">
                            © {new Date().getFullYear()} ADI JAIN • ALL CHANNELS
                            SECURED
                        </p>
                    </div>
                </div>
            </div>

            {/* Custom Interactive Hover Scopes */}
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                .footer .icon:hover {
                    border-color: var(--hover-color) !important;
                    box-shadow: 0 0 20px var(--hover-color)55 !important;
                    transform: translateY(-3px) scale(1.02);
                }
            `,
                }}
            />
        </footer>
    );
};

export default Footer;
