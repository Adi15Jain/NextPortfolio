"use client";

import { useEffect, useRef } from "react";
import TitleHeader from "../components/TitleHeader";

// ─── Icon Data ────────────────────────────────────────────────────────────────
// Each icon: { name, slug } — slug matches skillicons.dev
const ALL_ICONS = [
    { name: "C++", slug: "cpp" },
    { name: "CodePen", slug: "codepen" },
    { name: "CSS", slug: "css" },
    { name: "D3.js", slug: "d3" },
    { name: "Express", slug: "express" },
    { name: "FastAPI", slug: "fastapi" },
    { name: "Flask", slug: "flask" },
    { name: "Git", slug: "git" },
    { name: "HTML", slug: "html" },
    { name: "JavaScript", slug: "js" },
    { name: "LaTeX", slug: "latex" },
    { name: "MySQL", slug: "mysql" },
    { name: "MongoDB", slug: "mongodb" },
    { name: "Next.js", slug: "nextjs" },
    { name: "Node.js", slug: "nodejs" },
    { name: "Notion", slug: "notion" },
    { name: "npm", slug: "npm" },
    { name: "OpenCV", slug: "opencv" },
    { name: "PostgreSQL", slug: "postgres" },
    { name: "Postman", slug: "postman" },
    { name: "Prisma", slug: "prisma" },
    { name: "PyTorch", slug: "pytorch" },
    { name: "React", slug: "react" },
    { name: "scikit-learn", slug: "sklearn" },
    { name: "Tailwind CSS", slug: "tailwind" },
    { name: "TensorFlow", slug: "tensorflow" },
    { name: "Three.js", slug: "threejs" },
    { name: "TypeScript", slug: "ts" },
    { name: "Vercel", slug: "vercel" },
    { name: "Vite", slug: "vite" },
];

// Split into two balanced rows
const MID = Math.ceil(ALL_ICONS.length / 2);
const ROW_1 = ALL_ICONS.slice(0, MID); // 15 icons — scrolls LEFT
const ROW_2 = ALL_ICONS.slice(MID); // 15 icons — scrolls RIGHT

// Build skillicons.dev URL for a single icon
const iconUrl = (slug) => `https://skillicons.dev/icons?i=${slug}`;

// ─── Marquee Styles (injected once) ──────────────────────────────────────────
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
    gap: 18px;
    width: max-content;
    margin-bottom: 14px;
  }
  .ag-row:last-child { margin-bottom: 0; }

  /* Row 1 scrolls left → */
  .ag-row-ltr {
    animation: ag-scroll-left 35s linear infinite;
  }
  /* Row 2 scrolls ← right */
  .ag-row-rtl {
    animation: ag-scroll-right 35s linear infinite;
  }

  /* Pause on hover over the whole section */
  .ag-marquee-section:hover .ag-row {
    animation-play-state: paused;
  }

  @keyframes ag-scroll-left {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes ag-scroll-right {
    0%   { transform: translateX(-50%); }
    100% { transform: translateX(0); }
  }

  /* ── Icon chip ── */
  .ag-icon-chip {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    border-radius: 16px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    cursor: default;
    flex-shrink: 0;
    transition: transform 0.25s ease, background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
  }
  .ag-icon-chip:hover {
    transform: translateY(-6px) scale(1.12);
    background: rgba(255,255,255,0.1);
    border-color: rgba(255,255,255,0.22);
    box-shadow: 0 12px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(139,92,246,0.35);
    z-index: 20;
  }
  .ag-icon-chip img {
    width: 38px;
    height: 38px;
    object-fit: contain;
    display: block;
    pointer-events: none;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4));
  }

  /* ── Name tooltip ── */
  .ag-icon-label {
    position: absolute;
    bottom: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%) translateY(4px);
    background: rgba(15,12,30,0.92);
    border: 1px solid rgba(139,92,246,0.5);
    color: rgba(255,255,255,0.92);
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    white-space: nowrap;
    padding: 4px 10px;
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
            <TitleHeader title="Frequently Used Tools" sub="📌 My Tech Stack" />

            <div
                className="ag-marquee-section mt-14"
                style={{ padding: "8px 0" }}
            >
                <MarqueeRow icons={ROW_1} direction="ltr" />
                <MarqueeRow icons={ROW_2} direction="rtl" />
            </div>
        </div>
    );
};

export default LogoSection;
