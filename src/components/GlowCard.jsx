import React, { useRef } from "react";

const GlowCard = ({ card, children, index }) => {
    const cardRefs = useRef([]);

    const handleMouseMove = (index) => (e) => {
        const card = cardRefs.current[index];
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - rect.width / 2;
        const mouseY = e.clientY - rect.top - rect.height / 2;

        let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
        angle = (angle + 360) % 360;

        card.style.setProperty("--start", angle + 60);
    };

    return (
        <div
            ref={(el) => (cardRefs.current[index] = el)}
            onMouseMove={handleMouseMove(index)}
            className="card timeline-card rounded-2xl p-8"
            style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(16px)",
            }}
        >
            <div className="glow" />
            {/* Star rating */}
            <div className="flex items-center gap-1 mb-5">
                {Array.from({ length: 5 }, (_, i) => (
                    <span
                        key={i}
                        style={{ fontSize: "16px", filter: "hue-rotate(0deg)" }}
                    >
                        ⭐
                    </span>
                ))}
            </div>
            <div className="mb-5">
                <p className="text-white/60 text-sm leading-relaxed italic">
                    &ldquo;{card.review}&rdquo;
                </p>
            </div>
            {children}
        </div>
    );
};

export default GlowCard;
