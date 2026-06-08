"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
    useEffect(() => {
        // Return early on touch/mobile devices to prevent choppy scrolling
        const isTouch =
            typeof window !== "undefined" &&
            ("ontouchstart" in window ||
                navigator.maxTouchPoints > 0 ||
                (window.matchMedia &&
                    window.matchMedia("(pointer: coarse)").matches));

        if (isTouch) return;

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
            smoothWheel: true,
            wheelMultiplier: 1.0,
            touchMultiplier: 1.5,
        });

        let rafId;
        function raf(time) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);

        // Sync with GSAP ScrollTrigger
        lenis.on("scroll", () => {
            import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
                ScrollTrigger.update();
            });
        });

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);

    return null;
}
