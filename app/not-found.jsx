"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Home, Compass, AlertCircle } from "lucide-react";

export default function NotFound() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const raf = requestAnimationFrame(() => setMounted(true));
        return () => cancelAnimationFrame(raf);
    }, []);

    if (!mounted) return null;

    return (
        <main className="relative min-h-screen w-full bg-[#030303] text-white flex flex-col items-center justify-center overflow-hidden px-6">
            {/* Ambient Background Glows */}
            <div
                className="absolute top-[20%] left-[20%] w-[30vw] h-[30vw] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none animate-pulse"
                style={{ animationDuration: "6s" }}
            />
            <div
                className="absolute bottom-[20%] right-[20%] w-[30vw] h-[30vw] rounded-full bg-purple-500/10 blur-[100px] pointer-events-none animate-pulse"
                style={{ animationDuration: "8s" }}
            />

            {/* Retro Wireframe Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center max-w-2xl text-center space-y-8 select-none">
                {/* 404 Floating Badge */}
                <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/30 bg-red-500/10 backdrop-blur-md text-red-400 text-sm font-semibold tracking-wide shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                    <AlertCircle size={16} className="animate-bounce" />
                    <span>404</span>
                </div>

                {/* Animated 404 Title */}
                <div className="relative group">
                    <h1
                        className="text-[120px] sm:text-[180px] font-black tracking-tighter leading-none select-none"
                        style={{
                            background:
                                "linear-gradient(135deg, #fff 30%, #3b82f6 70%, #8b5cf6)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            filter: "drop-shadow(0 0 30px rgba(59,130,246,0.2))",
                        }}
                    >
                        404
                    </h1>

                    {/* Shadow Layer for Depth */}
                    <div
                        className="absolute inset-0 text-[120px] sm:text-[180px] font-black tracking-tighter leading-none opacity-20 blur-md pointer-events-none -z-10 group-hover:opacity-40 transition-opacity duration-500"
                        style={{
                            background:
                                "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                    >
                        404
                    </div>
                </div>

                {/* Main Text Content */}
                <div className="space-y-4">
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white/90">
                        Lost
                    </h2>
                    <p className="text-white/50 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                        The coordinates you requested do not exist in this
                        portfolio dimension. Let&apos;s guide you back to the home
                        base.
                    </p>
                </div>

                {/* Interactive Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full">
                    <Link
                        href="/"
                        className="group relative px-6 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 w-full sm:w-auto text-center cursor-pointer"
                        style={{
                            background:
                                "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                            boxShadow: "0 4px 20px rgba(59, 130, 246, 0.25)",
                        }}
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            <Home size={16} />
                            Back to Home Base
                        </span>
                        {/* Glow on hover */}
                        <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>

                    <Link
                        href="/#work"
                        className="group px-6 py-3 rounded-full text-sm font-semibold text-white border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 w-full sm:w-auto text-center flex items-center justify-center gap-2 cursor-pointer"
                    >
                        <Compass
                            size={16}
                            className="text-purple-400 group-hover:rotate-45 transition-transform duration-500"
                        />
                        Explore Work
                    </Link>
                </div>
            </div>

            {/* Bottom Credit */}
            <div className="absolute bottom-6 text-white/30 text-xs">
                © {new Date().getFullYear()} Adi Jain. All rights reserved.
            </div>
        </main>
    );
}
