"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Flag } from "lucide-react";

/* A station's accent colour cycles through the brand gradient so the route
   visibly evolves from blue → violet → cyan → emerald as it progresses. */
const STOPS = ["#3b82f6", "#6366f1", "#8b5cf6", "#a855f7", "#06b6d4", "#22d3ee", "#14b8a6", "#10b981", "#34d399"];

/**
 * The route overview — the "map" of the build journey. Renders every project
 * as a numbered station on a single connected rail, shows where you currently
 * are (scroll-spy), and lets you jump to any milestone. Reads top-to-bottom as
 * a story: "started here, then built all of this."
 */
export default function JourneyMap({ projects }) {
    const [active, setActive] = useState(0);
    const railRef = useRef(null);
    const stationRefs = useRef([]);

    // Scroll-spy: light up the station for whichever project is on screen.
    useEffect(() => {
        const sections = projects
            .map((p, i) => ({ el: document.getElementById(`journey-${p.id}`), i }))
            .filter((s) => s.el);
        if (!sections.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const idx = sections.find(
                            (s) => s.el === entry.target,
                        )?.i;
                        if (typeof idx === "number") setActive(idx);
                    }
                });
            },
            { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
        );

        sections.forEach((s) => observer.observe(s.el));
        return () => observer.disconnect();
    }, [projects]);

    // Keep the active station in view inside the horizontally-scrolling rail.
    useEffect(() => {
        const node = stationRefs.current[active];
        if (node?.scrollIntoView) {
            node.scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "nearest",
            });
        }
    }, [active]);

    const goTo = (id, index) => {
        const el = document.getElementById(`journey-${id}`);
        if (!el) return;

        // Optimistically light the station so the click feels instant.
        if (typeof index === "number") setActive(index);

        const offset = -250; // clear the navbar + the tall sticky route bar
        const lenis = typeof window !== "undefined" && window.__lenis;

        if (lenis?.scrollTo) {
            // Scroll through Lenis so it doesn't snap the page back afterwards.
            lenis.scrollTo(el, {
                offset,
                duration: 1.4,
                easing: (t) => 1 - Math.pow(1 - t, 3), // easeOutCubic — smooth glide
            });
        } else {
            const top = el.getBoundingClientRect().top + window.scrollY + offset;
            window.scrollTo({ top, behavior: "smooth" });
        }

        // Pulse the destination so arrival feels deliberate.
        el.classList.remove("journey-focus");
        // Force reflow so the animation can re-trigger on repeat clicks.
        void el.offsetWidth;
        el.classList.add("journey-focus");
        window.setTimeout(() => el.classList.remove("journey-focus"), 1600);
    };

    const progress = projects.length > 1 ? (active / (projects.length - 1)) * 100 : 0;

    return (
        <div className="w-full">
            {/* Legend / framing */}
            <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
                <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-white/40">
                    <MapPin size={13} className="text-blue-400" />
                    <span>The Route</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-white/40">
                    <span className="text-blue-400 font-bold">
                        {String(active + 1).padStart(2, "0")}
                    </span>
                    <span>/</span>
                    <span>{String(projects.length).padStart(2, "0")}</span>
                    <span className="hidden sm:inline text-white/25">
                        · {projects[active]?.timelineTitle}
                    </span>
                </div>
            </div>

            {/* Horizontal rail of stations */}
            <div
                ref={railRef}
                className="journey-rail relative overflow-x-auto overflow-y-hidden pb-3 -mx-1 px-1 no-scrollbar"
            >
                {/* Base + progress line behind the dots */}
                <div className="relative" style={{ minWidth: "min(100%, 1180px)" }}>
                    <div className="absolute left-0 right-0 top-[34px] h-[2px] bg-white/[0.08] rounded-full" />
                    <div
                        className="absolute left-0 top-[34px] h-[2px] rounded-full transition-[width] duration-700 ease-out"
                        style={{
                            width: `${progress}%`,
                            background:
                                "linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4, #10b981)",
                            boxShadow: "0 0 12px rgba(99,102,241,0.5)",
                        }}
                    />

                    <div className="relative flex items-start justify-between gap-2">
                        {projects.map((p, i) => {
                            const color = STOPS[i % STOPS.length];
                            const isActive = i === active;
                            const isPast = i < active;
                            const shortName = p.title.split(" — ")[0];
                            const isLast = i === projects.length - 1;
                            return (
                                <button
                                    key={p.id}
                                    ref={(el) => (stationRefs.current[i] = el)}
                                    onClick={() => goTo(p.id, i)}
                                    className="group relative flex flex-col items-center gap-2.5 flex-1 min-w-[96px] cursor-pointer outline-none"
                                    aria-label={`Go to ${shortName}`}
                                >
                                    {/* Index */}
                                    <span
                                        className={`text-[10px] font-mono font-bold tracking-wider transition-colors duration-300 ${
                                            isActive
                                                ? "text-white"
                                                : "text-white/30 group-hover:text-white/60"
                                        }`}
                                    >
                                        {String(i + 1).padStart(2, "0")}
                                    </span>

                                    {/* Station node */}
                                    <span
                                        className="relative flex items-center justify-center rounded-full transition-all duration-300"
                                        style={{
                                            width: isActive ? 22 : 16,
                                            height: isActive ? 22 : 16,
                                            background:
                                                isActive || isPast
                                                    ? color
                                                    : "#0a0a12",
                                            border: `2px solid ${isActive || isPast ? color : "rgba(255,255,255,0.18)"}`,
                                            boxShadow: isActive
                                                ? `0 0 0 5px ${color}22, 0 0 18px ${color}88`
                                                : "none",
                                        }}
                                    >
                                        {isLast && (
                                            <Flag
                                                size={isActive ? 10 : 8}
                                                className="text-white"
                                            />
                                        )}
                                        {isActive && !isLast && (
                                            <span className="absolute inset-0 rounded-full animate-ping" style={{ background: `${color}55` }} />
                                        )}
                                    </span>

                                    {/* Name */}
                                    <span
                                        className={`text-[11px] md:text-xs font-bold text-center leading-tight transition-colors duration-300 ${
                                            isActive
                                                ? "text-white"
                                                : "text-white/45 group-hover:text-white/75"
                                        }`}
                                    >
                                        {shortName}
                                    </span>

                                    {/* Date */}
                                    <span className="text-[9px] font-mono text-white/25 whitespace-nowrap">
                                        {p.date}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
