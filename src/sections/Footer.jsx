import React from "react";
import { socialImgs } from "../constants";

const socialColors = {
    insta: "#e1306c",
    github: "#f0f6fc",
    linkedin: "#0a66c2",
    x: "#ffffff",
};

const Footer = () => {
    return (
        <footer className="footer">
            {/* Top separator */}
            <div
                className="absolute left-0 right-0 h-px"
                style={{
                    background:
                        "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
                }}
            />

            <div className="footer-container">
                {/* Left */}
                <div className="flex flex-col justify-center md:items-start items-center gap-1">
                    <p
                        className="text-sm font-bold"
                        style={{
                            background:
                                "linear-gradient(135deg, #ffffff 0%, #94a3b8 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                    >
                        Adi Jain
                    </p>
                    <a
                        href="/"
                        className="text-xs text-white/40 hover:text-white/60 transition-colors duration-200"
                    >
                        Visit my blog (In Progress)
                    </a>
                </div>

                {/* Center: Social Icons */}
                <div className="socials">
                    {socialImgs.map((img) => (
                        <a
                            key={img.url}
                            className="icon group"
                            href={img.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={img.name}
                            style={{
                                "--hover-color":
                                    socialColors[img.name] || "#ffffff",
                            }}
                        >
                            <img
                                src={img.imgPath}
                                alt={img.name}
                                className="w-5 h-5 object-contain transition-all duration-300 group-hover:scale-110"
                                style={{
                                    filter: "brightness(0.7)",
                                    transition: "filter 0.3s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.filter =
                                        "brightness(1)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.filter =
                                        "brightness(0.7)";
                                }}
                            />
                        </a>
                    ))}
                </div>

                {/* Right */}
                <div className="flex flex-col justify-center">
                    <p className="text-center md:text-end text-xs text-white/40">
                        © {new Date().getFullYear()} Adi Jain. Made with ❤️
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
