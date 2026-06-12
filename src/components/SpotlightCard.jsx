"use client";

import React, {
    useRef,
    useEffect,
    useImperativeHandle,
    forwardRef,
} from "react";

const SpotlightCard = forwardRef(
    (
        {
            children,
            className = "",
            style = {},
            tilt = false,
            tiltStrength = 7,
        },
        ref,
    ) => {
        const cardRef = useRef(null);

        // Forward the real DOM element to the parent ref
        useImperativeHandle(ref, () => cardRef.current);

        useEffect(() => {
            const card = cardRef.current;
            if (!card) return;

            // Tilt is a pointer-driven enhancement only — never on touch or for
            // reduced-motion users (where it would also fight other transforms).
            const finePointer =
                typeof window !== "undefined" &&
                window.matchMedia?.("(pointer: fine)").matches;
            const reduced =
                typeof window !== "undefined" &&
                window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
            const tiltOn = tilt && finePointer && !reduced;

            const handleMouseMove = (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Spotlight glow follows the cursor.
                card.style.setProperty("--mouse-x", `${x}px`);
                card.style.setProperty("--mouse-y", `${y}px`);

                // Depth tilt: map cursor offset from centre to a small rotation.
                if (tiltOn) {
                    const px = x / rect.width - 0.5;
                    const py = y / rect.height - 0.5;
                    card.style.transform = `perspective(1100px) rotateX(${-py * tiltStrength}deg) rotateY(${px * tiltStrength}deg) translateZ(0)`;
                }
            };

            const handleMouseEnter = () => {
                if (tiltOn) card.style.willChange = "transform";
            };

            const handleMouseLeave = () => {
                if (tiltOn) {
                    card.style.transform =
                        "perspective(1100px) rotateX(0deg) rotateY(0deg)";
                    card.style.willChange = "auto";
                }
            };

            card.addEventListener("mousemove", handleMouseMove, {
                passive: true,
            });
            if (tiltOn) {
                card.addEventListener("mouseenter", handleMouseEnter, {
                    passive: true,
                });
                card.addEventListener("mouseleave", handleMouseLeave, {
                    passive: true,
                });
            }
            return () => {
                card.removeEventListener("mousemove", handleMouseMove);
                card.removeEventListener("mouseenter", handleMouseEnter);
                card.removeEventListener("mouseleave", handleMouseLeave);
            };
        }, [tilt, tiltStrength]);

        return (
            <div
                ref={cardRef}
                className={`spotlight-card ${tilt ? "tilt-card" : ""} ${className}`}
                style={style}
            >
                {children}
            </div>
        );
    },
);

SpotlightCard.displayName = "SpotlightCard";

export default SpotlightCard;
