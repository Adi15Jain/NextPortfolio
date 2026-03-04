"use client";

import { useEffect, useRef } from "react";

// Injects cursor styles directly into the document to avoid any CSS loading issues
const CURSOR_STYLES = `
  .ag-cursor-dot {
    position: fixed;
    pointer-events: none;
    z-index: 999999;
    width: 10px;
    height: 10px;
    background: #ffffff;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    will-change: left, top;
    box-shadow: 0 0 10px rgba(255,255,255,0.9), 0 0 20px rgba(255,255,255,0.4);
    transition: width 0.15s ease, height 0.15s ease, background 0.15s ease, box-shadow 0.15s ease;
  }
  .ag-cursor-dot.pressed {
    width: 7px;
    height: 7px;
    background: #a78bfa;
    box-shadow: 0 0 14px rgba(167,139,250,1), 0 0 28px rgba(139,92,246,0.6);
  }
  .ag-cursor-ring {
    position: fixed;
    pointer-events: none;
    z-index: 999998;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    border: 1.5px solid rgba(255,255,255,0.55);
    transform: translate(-50%, -50%);
    will-change: left, top;
    transition: width 0.2s ease, height 0.2s ease, border-color 0.2s ease, background 0.2s ease;
  }
  .ag-cursor-ring.hovering {
    width: 56px;
    height: 56px;
    border-color: rgba(139, 92, 246, 0.9);
    background: rgba(139, 92, 246, 0.08);
  }
  .ag-cursor-ring.pressed {
    width: 30px;
    height: 30px;
    border-color: rgba(167, 139, 250, 1);
  }
  body.ag-cursor-active { cursor: none !important; }
  body.ag-cursor-active *, body.ag-cursor-active *::before, body.ag-cursor-active *::after { cursor: none !important; }
`;

const INTERACTIVE =
    "a, button, [role='button'], label, input, textarea, select, [data-cursor]";

const CustomCursor = () => {
    const dotRef = useRef(null);
    const ringRef = useRef(null);

    useEffect(() => {
        // Inject styles into <head>
        const styleTag = document.createElement("style");
        styleTag.id = "ag-cursor-styles";
        if (!document.getElementById("ag-cursor-styles")) {
            styleTag.textContent = CURSOR_STYLES;
            document.head.appendChild(styleTag);
        }

        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        // State
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let ringX = mouseX;
        let ringY = mouseY;
        let rafId;
        const LERP = 0.13;

        const onMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const onDown = () => {
            dot.classList.add("pressed");
            ring.classList.add("pressed");
        };
        const onUp = () => {
            dot.classList.remove("pressed");
            ring.classList.remove("pressed");
        };

        const onOver = (e) => {
            if (e.target.closest(INTERACTIVE)) {
                ring.classList.add("hovering");
            } else {
                ring.classList.remove("hovering");
            }
        };

        const tick = () => {
            // Dot: snap immediately
            dot.style.left = `${mouseX}px`;
            dot.style.top = `${mouseY}px`;
            // Ring: lerp
            ringX += (mouseX - ringX) * LERP;
            ringY += (mouseY - ringY) * LERP;
            ring.style.left = `${ringX}px`;
            ring.style.top = `${ringY}px`;
            rafId = requestAnimationFrame(tick);
        };

        document.body.classList.add("ag-cursor-active");
        window.addEventListener("mousemove", onMove, { passive: true });
        window.addEventListener("mouseover", onOver, { passive: true });
        window.addEventListener("mousedown", onDown, { passive: true });
        window.addEventListener("mouseup", onUp, { passive: true });
        rafId = requestAnimationFrame(tick);

        return () => {
            document.body.classList.remove("ag-cursor-active");
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseover", onOver);
            window.removeEventListener("mousedown", onDown);
            window.removeEventListener("mouseup", onUp);
            cancelAnimationFrame(rafId);
            styleTag.remove();
        };
    }, []);

    return (
        <>
            <div ref={dotRef} className="ag-cursor-dot" aria-hidden="true" />
            <div ref={ringRef} className="ag-cursor-ring" aria-hidden="true" />
        </>
    );
};

export default CustomCursor;
