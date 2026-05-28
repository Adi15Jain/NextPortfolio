"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { socialImgs } from "../constants";
import { Cpu, Wifi, Activity, ShieldCheck, ShieldAlert, Github, Instagram, Linkedin } from "lucide-react";

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
                // HEAD request to robots.txt with cache-busting timestamp
                await fetch(`/robots.txt?t=${Date.now()}`, {
                    method: "HEAD",
                    cache: "no-store",
                    headers: { "Cache-Control": "no-cache" }
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
        const particles = [];
        const maxParticles = 36;
        const colors = [
            "rgba(59, 130, 246, ",
            "rgba(139, 92, 246, ",
            "rgba(6, 182, 212, ",
            "rgba(16, 185, 129, ",
        ];

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

                // Neon glow color
                this.colorTemplate =
                    colors[Math.floor(Math.random() * colors.length)];
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
                if (this.alpha <= 0) return;

                ctx.save();

                // 1. Draw soft volumetric neon glow halo (radial gradient)
                const glowRadius = this.size * 5;
                const gradient = ctx.createRadialGradient(
                    this.x,
                    this.y,
                    0,
                    this.x,
                    this.y,
                    glowRadius,
                );

                const alphaVal = Math.max(0, Math.min(1, this.alpha));
                gradient.addColorStop(0, this.colorTemplate + alphaVal + ")");
                gradient.addColorStop(
                    0.3,
                    this.colorTemplate + alphaVal * 0.4 + ")",
                );
                gradient.addColorStop(1, "transparent");

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(this.x, this.y, glowRadius, 0, Math.PI * 2);
                ctx.fill();

                // 2. Draw high-intensity glowing white core
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 0.4, 0, Math.PI * 2);
                ctx.fillStyle = "#ffffff";
                ctx.globalAlpha = Math.max(0, Math.min(1, this.alpha * 1.2));
                ctx.fill();

                ctx.restore();
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

            {/* Futuristic Spread Out HUD Container (Bypasses globals.css layout grid constraint) */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-6 flex md:flex-row flex-col justify-between items-center gap-10">
                {/* Left Column: Futuristic Branding & Navigation Meta */}
                <div className="flex flex-col items-center md:items-start gap-2.5 min-w-[240px]">
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
                    <p className="text-[11px] font-mono tracking-wider text-white/40 text-center md:text-start">
                        SYSTEM DESIGN & PRODUCT ENGINEERING
                    </p>
                    <Link
                        href="/"
                        className="text-xs font-mono tracking-wide text-cyan-400/50 hover:text-cyan-400/80 transition-colors duration-300 mt-1 flex items-center gap-1.5 justify-center md:justify-start"
                    >
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                        Visit my blog (In Progress)
                    </Link>
                </div>

                {/* Center Column: Social Icons in Sleek Glass Nodes */}
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
                                const IconComponent = socialIcons[img.name];
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
                                        socialColors[img.name] || "#ffffff",
                                }}
                            />
                            {/* Outer futuristic corner bracket indicator */}
                            <div className="absolute inset-0 border border-transparent group-hover:border-white/10 rounded-xl transition-all duration-300 scale-90 group-hover:scale-105" />
                        </a>
                    ))}
                </div>

                {/* Right Column: Technical Meta-Telemetry Panel */}
                <div className="flex flex-col items-center md:items-end gap-2.5 text-[11px] font-mono text-white/35 min-w-[240px]">
                    <div className="flex items-center gap-3 bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 backdrop-blur-md">
                        {isOnline ? (
                            <>
                                <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                                    <Activity size={12} className="animate-pulse" />
                                    <span className="text-white/50 font-normal">SYS:</span> ACTIVE
                                </span>
                                <span className="text-white/15">|</span>
                                <span className="flex items-center gap-1 text-cyan-400 font-medium">
                                    <Wifi size={12} />
                                    <span className="text-white/50 font-normal">PING:</span> {currentPing === "---" ? currentPing : `${currentPing}MS`}
                                </span>
                                <span className="text-white/15">|</span>
                                <span className="flex items-center gap-1 text-purple-400 font-medium">
                                    <ShieldCheck size={12} />
                                    <span className="text-white/50 font-normal">TLS:</span> SECURE
                                </span>
                            </>
                        ) : (
                            <>
                                <span className="flex items-center gap-1.5 text-rose-500 font-medium animate-pulse">
                                    <ShieldAlert size={12} />
                                    <span className="text-white/30 font-normal">SYS:</span> OFFLINE
                                </span>
                                <span className="text-white/15">|</span>
                                <span className="flex items-center gap-1 text-white/20 font-normal">
                                    <Wifi size={12} className="opacity-30" />
                                    <span className="text-white/30 font-normal">PING:</span> ---
                                </span>
                                <span className="text-white/15">|</span>
                                <span className="flex items-center gap-1 text-rose-400/50 font-medium">
                                    <ShieldAlert size={12} className="opacity-50" />
                                    <span className="text-white/30 font-normal">TLS:</span> INACTIVE
                                </span>
                            </>
                        )}
                    </div>

                    <div className="flex items-center md:justify-end gap-2 mt-1">
                        <span className="text-white/35 font-mono">
                            TIME UPTIME:
                        </span>
                        <span className="text-white/70 bg-white/[0.03] px-1.5 py-0.5 rounded border border-white/[0.08]">
                            {currentTime || "00:00:00"}
                        </span>
                    </div>

                    <p className="text-white/35 text-[10px] mt-1 tracking-wider text-center md:text-right">
                        © {new Date().getFullYear()} ADI JAIN • ALL CHANNELS
                        SECURED
                    </p>
                </div>
            </div>

            {/* Custom Interactive Hover Scopes & Bottom Margin Override */}
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                .footer {
                    margin-bottom: 0 !important;
                }
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
