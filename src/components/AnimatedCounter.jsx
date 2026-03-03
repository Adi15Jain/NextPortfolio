"use client";

import { counterItems } from "../constants";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const icons = ["🚀", "⏱️", "🏅", "🛠️"];

const AnimatedCounter = () => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.3,
    });

    return (
        <div
            id="counter"
            ref={ref}
            className="padding-x-lg xl:mt-0 mt-32 relative z-20"
        >
            <div className="mx-auto grid-4-cols">
                {counterItems.map((item, index) => (
                    <div
                        key={item.label}
                        className="glass-card rounded-2xl p-6 md:p-10 flex flex-col justify-center items-center text-center gap-2 group transition-all duration-300 hover:-translate-y-2"
                        style={{
                            border: "1px solid rgba(255,255,255,0.08)",
                        }}
                    >
                        <div className="text-3xl mb-1">{icons[index]}</div>
                        <div className="counter-number animate-gradient-text text-4xl md:text-6xl text-center font-bold">
                            {inView && (
                                <CountUp
                                    end={item.value}
                                    duration={3}
                                    suffix={item.suffix}
                                />
                            )}
                        </div>
                        <div className="text-white/50 text-sm md:text-base text-center leading-snug">
                            {item.label}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnimatedCounter;
