"use client";

import { useEffect, useState } from "react";
import TitleHeader from "../components/TitleHeader";
import { Wrench } from "lucide-react";

// ─── Expanded Icon Data ────────────────────────────────────────────────────────
// Each icon: { name, slug } — slug matches skillicons.dev
const ALL_ICONS = [
    { name: "C++", slug: "cpp" },
    { name: "CSS", slug: "css" },
    { name: "Docker", slug: "docker" },
    { name: "Express", slug: "express" },
    { name: "FastAPI", slug: "fastapi" },
    { name: "Flask", slug: "flask" },
    { name: "Git", slug: "git" },
    { name: "GitHub", slug: "github" },
    { name: "HTML", slug: "html" },
    { name: "JavaScript", slug: "js" },
    { name: "Laravel", slug: "laravel" },
    { name: "Linux", slug: "linux" },
    { name: "MongoDB", slug: "mongodb" },
    { name: "MySQL", slug: "mysql" },
    { name: "Next.js", slug: "nextjs" },
    { name: "Node.js", slug: "nodejs" },
    { name: "npm", slug: "npm" },
    { name: "pnpm", slug: "pnpm" },
    { name: "PostgreSQL", slug: "postgres" },
    { name: "Postman", slug: "postman" },
    { name: "Prisma", slug: "prisma" },
    { name: "Python", slug: "py" },
    { name: "PyTorch", slug: "pytorch" },
    { name: "React", slug: "react" },
    { name: "scikit-learn", slug: "sklearn" },
    { name: "Tailwind CSS", slug: "tailwind" },
    { name: "TensorFlow", slug: "tensorflow" },
    { name: "Three.js", slug: "threejs" },
    { name: "TypeScript", slug: "ts" },
    { name: "Vercel", slug: "vercel" },
    { name: "Vite", slug: "vite" },
    { name: "Vitest", slug: "vitest" },
    { name: "VS Code", slug: "vscode" },
];

// Split into two balanced rows
const MID = Math.ceil(ALL_ICONS.length / 2);
const ROW_1 = ALL_ICONS.slice(0, MID); // 17 icons — scrolls LEFT
const ROW_2 = ALL_ICONS.slice(MID); // 16 icons — scrolls RIGHT

// Build skillicons.dev URL for a single icon
const iconUrl = (slug) => `https://skillicons.dev/icons?i=${slug}`;

// ─── Seamless Marquee Styles (mathematically adjusted loop) ─────────────────
const MARQUEE_CSS = `
  .ag-marquee-section {
    width: 100%;
    overflow: hidden;
    position: relative;
  }
  /* Left+right fade edges */
  .ag-marquee-section::before,
  .ag-marquee-section::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 160px;
    z-index: 10;
    pointer-events: none;
  }
  .ag-marquee-section::before {
    left: 0;
    background: linear-gradient(90deg, #000010 0%, transparent 100%);
  }
  .ag-marquee-section::after {
    right: 0;
    background: linear-gradient(270deg, #000010 0%, transparent 100%);
  }

  .ag-row {
    display: flex;
    align-items: center;
    gap: 24px;
    padding-right: 24px;
    width: max-content;
    margin-bottom: 24px;
  }
  .ag-row:last-child { margin-bottom: 0; }

  /* Row 1 scrolls left → */
  .ag-row-ltr {
    animation: ag-scroll-left 45s linear infinite;
  }
  /* Row 2 scrolls ← right */
  .ag-row-rtl {
    animation: ag-scroll-right 45s linear infinite;
  }

  /* Pause on hover over the whole section */
  .ag-marquee-section:hover .ag-row {
    animation-play-state: paused;
  }

  /* Mathematically seamless infinite translation (accounting for the 24px flex gaps) */
  @keyframes ag-scroll-left {
    0%   { transform: translateX(0); }
    100% { transform: translateX(calc(-50% - 12px)); }
  }
  @keyframes ag-scroll-right {
    0%   { transform: translateX(calc(-50% - 12px)); }
    100% { transform: translateX(0); }
  }

  /* ── Icon chip ── */
  .ag-icon-chip {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    border-radius: 20px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    cursor: default;
    flex-shrink: 0;
    transition: transform 0.25s ease, background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
  }
  .ag-icon-chip:hover {
    transform: translateY(-8px) scale(1.15);
    background: rgba(255,255,255,0.1);
    border-color: rgba(255,255,255,0.22);
    box-shadow: 0 12px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(139,92,246,0.35);
    z-index: 20;
  }
  .ag-icon-chip img {
    width: 48px;
    height: 48px;
    object-fit: contain;
    display: block;
    pointer-events: none;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4));
  }

  /* ── Name tooltip ── */
  .ag-icon-label {
    position: absolute;
    bottom: calc(100% + 14px);
    left: 50%;
    transform: translateX(-50%) translateY(4px);
    background: rgba(15,12,30,0.95);
    border: 1px solid rgba(139,92,246,0.6);
    color: rgba(255,255,255,0.95);
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    white-space: nowrap;
    padding: 6px 14px;
    border-radius: 8px;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s ease, transform 0.2s ease;
    backdrop-filter: blur(8px);
    box-shadow: 0 4px 16px rgba(0,0,0,0.6);
  }
  .ag-icon-chip:hover .ag-icon-label {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }

  @media (prefers-reduced-motion: reduce) {
    .ag-row { animation: none !important; }
  }
`;

// ─── Single icon chip component ────────────────────────────────────────────--
const IconChip = ({ slug, name }) => (
    <div className="ag-icon-chip">
        <img src={iconUrl(slug)} alt={name} loading="lazy" />
        <span className="ag-icon-label">{name}</span>
    </div>
);

// ─── Marquee row (icons duplicated for seamless loop) ─────────────────────--
const MarqueeRow = ({ icons, direction }) => {
    const doubled = [...icons, ...icons]; // duplicate for seamless loop
    return (
        <div
            className={`ag-row ${direction === "rtl" ? "ag-row-rtl" : "ag-row-ltr"}`}
        >
            {doubled.map((icon, i) => (
                <IconChip
                    key={`${icon.slug}-${i}`}
                    slug={icon.slug}
                    name={icon.name}
                />
            ))}
        </div>
    );
};

// ─── Section ──────────────────────────────────────────────────────────────--
const LogoSection = () => {
    const [activeTool, setActiveTool] = useState(null);

    useEffect(() => {
        if (document.getElementById("ag-marquee-styles")) return;
        const style = document.createElement("style");
        style.id = "ag-marquee-styles";
        style.textContent = MARQUEE_CSS;
        document.head.appendChild(style);
        return () => style.remove();
    }, []);

    return (
        <div className="md:my-20 my-10">
            <TitleHeader
                title="Frequently Used Tools"
                sub={
                    <span className="flex items-center gap-1.5">
                        <Wrench size={13} className="text-blue-400" /> My Tech
                        Stack
                    </span>
                }
            />

            {/* Desktop View: Infinite Marquee */}
            <div
                className="hidden md:block ag-marquee-section mt-2"
                style={{ paddingTop: "70px", paddingBottom: "20px" }}
            >
                <MarqueeRow icons={ROW_1} direction="ltr" />
                <MarqueeRow icons={ROW_2} direction="rtl" />
            </div>

            {/* Mobile View: High-Density Interactive Grid */}
            <div className="block md:hidden mt-8 px-4">
                <div className="grid grid-cols-6 gap-3 justify-items-center max-w-[340px] mx-auto">
                    {ALL_ICONS.map((icon) => (
                        <div
                            key={icon.slug}
                            onClick={() => setActiveTool(icon)}
                            className={`w-11 h-11 flex items-center justify-center rounded-xl bg-white/[0.02] border border-white/5 transition-all duration-200 active:scale-90 active:bg-blue-500/10 active:border-blue-500/30 cursor-pointer ${
                                activeTool?.slug === icon.slug
                                    ? "bg-blue-500/10 border-blue-500/40 shadow-[0_0_12px_rgba(59,130,246,0.2)] scale-105"
                                    : ""
                            }`}
                        >
                            <img
                                src={iconUrl(icon.slug)}
                                alt={icon.name}
                                className="w-6 h-6 object-contain pointer-events-none filter drop-shadow(0 2px 4px rgba(0,0,0,0.4))"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
                <div className="text-center text-xs font-semibold text-slate-400 mt-5 h-8 flex items-center justify-center gap-1.5 bg-white/[0.01] border border-white/[0.03] py-1 px-4 rounded-full w-fit mx-auto backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    <span>
                        {activeTool
                            ? activeTool.name
                            : "Tap a tool to identify it"}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default LogoSection;
