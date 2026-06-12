"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import WorldOverlay from "./WorldOverlay";
import {
    SCENES,
    setJourneyProgress,
    journey,
    setWorldActive,
} from "./journeyStore";
import { FLASHES } from "./worldConfig";

const WorldCanvas = dynamic(() => import("./WorldCanvas"), { ssr: false });

const SCROLL_VH = 760; // total journey length (7 scenes)

export default function WorldExperience({ onExitToClassic }) {
    const flashRef = useRef(null);
    const [booted, setBooted] = useState(false);

    // ── Scroll → journey progress (one writer) ──
    useEffect(() => {
        let last = 0;
        const read = () => {
            const max =
                document.documentElement.scrollHeight - window.innerHeight;
            const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
            const v = p - last;
            last = p;
            setJourneyProgress(p, v);
        };
        read();
        window.addEventListener("scroll", read, { passive: true });
        window.addEventListener("resize", read);
        return () => {
            window.removeEventListener("scroll", read);
            window.removeEventListener("resize", read);
        };
    }, []);

    // ── Portal flashes (mask the two threshold crossings) ──
    useEffect(() => {
        let raf;
        const loop = () => {
            const p = journey.progress;
            let a = 0;
            for (const f of FLASHES) {
                const k = 1 - Math.min(1, Math.abs(p - f.at) / f.width);
                if (k > a) a = k;
            }
            if (flashRef.current)
                flashRef.current.style.opacity = String(Math.pow(a, 1.5));
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(raf);
    }, []);

    useEffect(() => {
        const t = setTimeout(() => setBooted(true), 900);
        return () => clearTimeout(t);
    }, []);

    // Tell the global atmosphere canvas to stand down while the world is live.
    useEffect(() => {
        setWorldActive(true);
        return () => setWorldActive(false);
    }, []);

    const jumpTo = (i) => {
        const target = SCENES[i].start + 0.015;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const y = target * max;
        const lenis = typeof window !== "undefined" && window.__lenis;
        if (lenis?.scrollTo) {
            lenis.scrollTo(y, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 3) });
        } else {
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };

    return (
        <>
            {/* Fixed world (canvas + content) */}
            <div className="world-stage" aria-hidden={false}>
                <WorldCanvas />
                <div ref={flashRef} className="world-flash" />
                <WorldOverlay onJump={jumpTo} onClassic={onExitToClassic} />
            </div>

            {/* Boot veil */}
            <div className={`world-boot ${booted ? "done" : ""}`} aria-hidden="true">
                <div className="world-boot-ring" />
                <span className="world-boot-label">ENTERING THE WORKSPACE</span>
            </div>

            {/* The tall scroll spine that drives the flight */}
            <div style={{ height: `${SCROLL_VH}vh` }} aria-hidden="true" />
        </>
    );
}
