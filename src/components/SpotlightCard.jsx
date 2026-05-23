"use client";

import React, {
    useRef,
    useEffect,
    useImperativeHandle,
    forwardRef,
} from "react";

const SpotlightCard = forwardRef(
    ({ children, className = "", style = {} }, ref) => {
        const cardRef = useRef(null);

        // Forward the real DOM element to the parent ref
        useImperativeHandle(ref, () => cardRef.current);

        useEffect(() => {
            const card = cardRef.current;
            if (!card) return;

            const handleMouseMove = (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                card.style.setProperty("--mouse-x", `${x}px`);
                card.style.setProperty("--mouse-y", `${y}px`);
            };

            card.addEventListener("mousemove", handleMouseMove, {
                passive: true,
            });
            return () => {
                card.removeEventListener("mousemove", handleMouseMove);
            };
        }, []);

        return (
            <div
                ref={cardRef}
                className={`spotlight-card ${className}`}
                style={style}
            >
                {children}
            </div>
        );
    },
);

SpotlightCard.displayName = "SpotlightCard";

export default SpotlightCard;
