"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgressBar() {
    const barRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!barRef.current) return;
            const totalScroll =
                document.documentElement.scrollHeight - window.innerHeight;
            if (totalScroll > 0) {
                const scrolled = (window.scrollY / totalScroll) * 100;
                barRef.current.style.width = `${scrolled}%`;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        
        // Initialize immediately on mount
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            ref={barRef}
            className="fixed top-0 left-0 h-1 z-[99999] pointer-events-none"
            style={{
                width: "0%",
                background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4)",
                boxShadow:
                    "0 0 10px rgba(59, 130, 246, 0.7), 0 0 20px rgba(6, 182, 212, 0.4)",
            }}
            aria-hidden="true"
        />
    );
}

