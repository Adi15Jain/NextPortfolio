"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+<>/\\";

/**
 * Kinetic "decode-in" typography: the text resolves out of scrambling glyphs,
 * left to right. Re-runs whenever it mounts (so a scene title decodes each time
 * you arrive). Honors reduced-motion (renders the final text instantly).
 */
export default function Scramble({
    text,
    as: Tag = "span",
    className = "",
    duration = 750,
    delay = 120,
}) {
    const reduced = useReducedMotion();
    const [out, setOut] = useState(reduced ? text : text.replace(/\S/g, " "));
    const raf = useRef();

    useEffect(() => {
        if (reduced) {
            setOut(text);
            return;
        }
        let start = null;
        const tick = (now) => {
            if (start === null) start = now + delay;
            const t = Math.max(0, Math.min(1, (now - start) / duration));
            const revealed = Math.floor(t * text.length);
            let s = "";
            for (let i = 0; i < text.length; i++) {
                if (text[i] === " ") s += " ";
                else if (i < revealed) s += text[i];
                else s += CHARS[(Math.random() * CHARS.length) | 0];
            }
            setOut(s);
            if (t < 1) raf.current = requestAnimationFrame(tick);
            else setOut(text);
        };
        raf.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf.current);
    }, [text, reduced, duration, delay]);

    return (
        <Tag className={className} aria-label={text}>
            {out}
        </Tag>
    );
}
