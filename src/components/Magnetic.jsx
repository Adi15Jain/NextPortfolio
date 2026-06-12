"use client";

import { useRef } from "react";
import { useCoarsePointer, useReducedMotion } from "../hooks/useDeviceCapabilities";

/**
 * Wraps any element and gives it a premium "magnetic" pull toward the cursor.
 * Disabled on touch devices and when reduced-motion is requested.
 *
 *   <Magnetic><button>…</button></Magnetic>
 *
 * `strength` ~ how far it travels (px-ish at edge), `radius` padding included
 * via the element's own bounds. Uses a transform on a wrapper so children keep
 * their own transitions/hover states intact.
 */
export default function Magnetic({ children, strength = 0.35, className = "" }) {
    const ref = useRef(null);
    const coarse = useCoarsePointer();
    const reduced = useReducedMotion();
    const enabled = !coarse && !reduced;

    const onMove = (e) => {
        if (!enabled || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const mx = e.clientX - (rect.left + rect.width / 2);
        const my = e.clientY - (rect.top + rect.height / 2);
        ref.current.style.transform = `translate(${mx * strength}px, ${my * strength}px)`;
    };

    const reset = () => {
        if (ref.current) ref.current.style.transform = "translate(0px, 0px)";
    };

    return (
        <div
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={reset}
            className={`magnetic ${className}`}
            style={{
                display: "inline-flex",
                willChange: enabled ? "transform" : "auto",
                transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
        >
            {children}
        </div>
    );
}
