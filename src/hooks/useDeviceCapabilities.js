"use client";

import { useEffect, useState } from "react";

/**
 * Tracks the user's prefers-reduced-motion preference reactively.
 * Returns `true` when motion should be minimized.
 */
export function useReducedMotion() {
    const [reduced, setReduced] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined" || !window.matchMedia) return;
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => setReduced(mq.matches);
        update();
        mq.addEventListener?.("change", update);
        return () => mq.removeEventListener?.("change", update);
    }, []);

    return reduced;
}

/**
 * Detects a coarse (touch) primary pointer. Used to disable cursor-driven
 * effects and heavy WebGL on phones/tablets.
 */
export function useCoarsePointer() {
    const [coarse, setCoarse] = useState(true); // assume touch until proven otherwise (SSR-safe)

    useEffect(() => {
        if (typeof window === "undefined" || !window.matchMedia) return;
        const mq = window.matchMedia("(pointer: coarse)");
        const update = () => setCoarse(mq.matches);
        update();
        mq.addEventListener?.("change", update);
        return () => mq.removeEventListener?.("change", update);
    }, []);

    return coarse;
}

/**
 * Returns a coarse device-quality tier used to scale visual richness:
 *   "off"  → render nothing heavy (reduced motion)
 *   "low"  → CSS-only fallbacks (touch / small / low-core devices)
 *   "high" → full WebGL atmosphere
 *
 * The tier is resolved on the client after mount, so callers should treat the
 * first render as "off"/SSR-safe and progressively enhance.
 */
export function useDeviceTier() {
    const [tier, setTier] = useState("off");

    useEffect(() => {
        if (typeof window === "undefined") return;

        const prefersReduced = window.matchMedia?.(
            "(prefers-reduced-motion: reduce)",
        )?.matches;
        if (prefersReduced) {
            setTier("off");
            return;
        }

        const coarse = window.matchMedia?.("(pointer: coarse)")?.matches;
        const narrow = window.innerWidth < 768;
        const cores =
            typeof navigator !== "undefined" && navigator.hardwareConcurrency
                ? navigator.hardwareConcurrency
                : 8;
        const lowMemory =
            typeof navigator !== "undefined" && navigator.deviceMemory
                ? navigator.deviceMemory <= 4
                : false;

        if (coarse || narrow || cores <= 4 || lowMemory) {
            setTier("low");
        } else {
            setTier("high");
        }
    }, []);

    return tier;
}
