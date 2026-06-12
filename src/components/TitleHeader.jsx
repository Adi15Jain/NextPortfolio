import React from "react";
import Reveal from "./Reveal";

const TitleHeader = ({ title, sub }) => {
    return (
        <Reveal className="flex flex-col items-center gap-4" amount={0.5}>
            {/* Shimmer badge */}
            <div className="hero-badge shimmer-badge flex items-center gap-2 px-4 py-2">
                <p className="text-white/70 text-sm">{sub}</p>
            </div>

            {/* Title */}
            <div className="relative text-center">
                <h2 className="font-bold md:text-5xl text-3xl text-white leading-tight">
                    {title}
                </h2>
                {/* Animated gradient underline */}
                <div
                    className="mx-auto mt-3 h-0.5 rounded-full"
                    style={{
                        width: "60px",
                        background:
                            "linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4)",
                    }}
                />
            </div>
        </Reveal>
    );
};

export default TitleHeader;
