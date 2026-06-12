"use client";

import { useEffect, useRef, useState } from "react";

import TitleHeader from "../components/TitleHeader";
import Reveal from "../components/Reveal";
import { MessageSquare } from "lucide-react";
import dynamic from "next/dynamic";

const ContactExperience = dynamic(
    () => import("../components/Models/Contact/ContactExperience"),
    {
        ssr: false,
        loading: () => <div className="w-full h-full bg-transparent" />,
    },
);

const ContactFallback = ({ onLoad }) => {
    return (
        <div className="relative w-full h-full min-h-[350px] flex flex-col items-center justify-center rounded-3xl p-6 overflow-hidden select-none">
            {/* Pulsing glow highlights matching the copper background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-amber-200/10 filter blur-[40px] animate-pulse pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-amber-300/5 filter blur-[25px] animate-pulse delay-700 pointer-events-none" />

            {/* Tech grid aesthetic overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:20px_20px] opacity-40 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center text-center gap-4">
                {/* Visual Graphic Representation: A beautifully styled glowing computer display */}
                <div className="relative w-20 h-20 flex items-center justify-center rounded-2xl bg-black/15 border border-white/10 shadow-2xl text-amber-100">
                    <div className="absolute inset-0 border border-white/10 rounded-2xl scale-105" />
                    <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-white/45 rounded-tl-md" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-white/45 rounded-tr-md" />
                    <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-white/45 rounded-bl-md" />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-white/45 rounded-br-md" />

                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                        <svg
                            className="w-6 h-6 animate-pulse text-white/80"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <rect
                                x="2"
                                y="3"
                                width="20"
                                height="14"
                                rx="2"
                                ry="2"
                            />
                            <line x1="8" y1="21" x2="16" y2="21" />
                            <line x1="12" y1="17" x2="12" y2="21" />
                        </svg>
                    </div>
                </div>

                <div className="flex flex-col gap-1.5 mt-2">
                    <h3 className="text-white text-sm font-semibold tracking-wider font-mono uppercase">
                        Interactive Workstation
                    </h3>
                    <p className="text-white/60 text-[10px] tracking-wide font-mono leading-relaxed max-w-[280px]">
                        WebGL model paused to maximize mobile responsive
                        scrolling speeds.
                    </p>
                </div>

                <button
                    onClick={onLoad}
                    className="mt-3 px-5 py-2 rounded-xl text-[10px] font-bold tracking-widest font-mono text-white bg-white/10 hover:bg-white/15 border border-white/20 active:scale-95 transition-all duration-300 shadow-md"
                >
                    TAP TO LOAD 3D MODEL
                </button>
            </div>
        </div>
    );
};

const Contact = () => {
    const formRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [lastSubmittedEmail, setLastSubmittedEmail] = useState("");
    const [errors, setErrors] = useState({ name: "", email: "", message: "" });
    const [isMobile, setIsMobile] = useState(false);
    const [load3D, setLoad3D] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setIsMobile(window.innerWidth < 768);
            const checkMobile = () => {
                setIsMobile(window.innerWidth < 768);
            };
            window.addEventListener("resize", checkMobile);
            return () => window.removeEventListener("resize", checkMobile);
        }
    }, []);

    const validate = () => {
        let tempErrors = { name: "", email: "", message: "" };
        let isValid = true;

        if (!form.name.trim()) {
            tempErrors.name = "Please compile your name signature.";
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!form.email.trim()) {
            tempErrors.email = "Uplink destination (email) is required.";
            isValid = false;
        } else if (!emailRegex.test(form.email)) {
            tempErrors.email = "Invalid email format. Telemetry check failed.";
            isValid = false;
        }

        if (!form.message.trim()) {
            tempErrors.message = "Message payload cannot be empty.";
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        setLoading(true);
        setSuccess(false);
        setError(false);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.error || "Failed to send message.");
            }

            const submittedEmail = form.email;
            setLastSubmittedEmail(submittedEmail);
            setForm({ name: "", email: "", message: "" });
            setSuccess(true);
        } catch (err) {
            console.error("Contact Form Submission Error:", err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="flex-center section-padding">
            <div className="w-full h-full md:px-10 px-0">
                <TitleHeader
                    title="Get in Touch – Let's Connect"
                    sub={
                        <span className="flex items-center gap-1.5">
                            <MessageSquare
                                size={13}
                                className="text-blue-400"
                            />{" "}
                            Have questions or ideas? Let&apos;s talk!
                        </span>
                    }
                />
                <div className="grid-12-cols mt-16">
                    {/* FORM */}
                    <Reveal as="div" className="xl:col-span-5">
                        <div
                            className="glass-card rounded-2xl p-8 md:p-10"
                            style={{
                                border: "1px solid rgba(255,255,255,0.08)",
                            }}
                        >
                            {success ? (
                                <div className="flex flex-col items-center justify-center text-center py-6 px-4 animate-contact-scale-up">
                                    {/* Glowing Success Icon */}
                                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 relative">
                                        <div className="absolute inset-0 rounded-full bg-emerald-500/20 filter blur-[8px] animate-pulse" />
                                        <svg
                                            className="w-8 h-8"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </div>

                                    <h3 className="text-lg font-bold text-white mb-2 tracking-widest font-mono uppercase text-emerald-400">
                                        SIGNAL TRANSMITTED
                                    </h3>
                                    <p className="text-white/60 text-xs font-mono leading-relaxed max-w-[280px] mb-8">
                                        Your packet was successfully routed. I
                                        will establish contact via{" "}
                                        <span className="text-blue-400 font-semibold">
                                            {lastSubmittedEmail}
                                        </span>{" "}
                                        within 24 hours.
                                    </p>

                                    <button
                                        onClick={() => setSuccess(false)}
                                        className="px-6 py-2.5 rounded-full text-[10px] font-bold tracking-widest font-mono text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 active:scale-95 transition-all duration-300 shadow-md cursor-pointer"
                                    >
                                        DISMISS SIGNAL
                                    </button>
                                </div>
                            ) : error ? (
                                <div className="flex flex-col items-center justify-center text-center py-6 px-4 animate-contact-scale-up">
                                    {/* Glowing Error Icon */}
                                    <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-6 relative">
                                        <div className="absolute inset-0 rounded-full bg-red-500/20 filter blur-[8px] animate-pulse" />
                                        <svg
                                            className="w-8 h-8"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </div>

                                    <h3 className="text-lg font-bold text-red-400 mb-2 tracking-widest font-mono uppercase">
                                        TRANSMISSION ERROR
                                    </h3>
                                    <p className="text-white/60 text-xs font-mono leading-relaxed max-w-[280px] mb-8">
                                        An uplink exception occurred. Please
                                        verify your network interface and retry
                                        routing the transmission.
                                    </p>

                                    <button
                                        onClick={() => setError(false)}
                                        className="px-6 py-2.5 rounded-full text-[10px] font-bold tracking-widest font-mono text-white bg-red-500/15 border border-red-500/30 hover:bg-red-500/25 active:scale-95 transition-all duration-300 shadow-md cursor-pointer"
                                    >
                                        RETRY UPLINK
                                    </button>
                                </div>
                            ) : (
                                <form
                                    ref={formRef}
                                    onSubmit={handleSubmit}
                                    noValidate
                                    className="w-full flex flex-col gap-6 animate-contact-fade-in"
                                >
                                    <div>
                                        <label htmlFor="name">Your Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="What's your good name?"
                                            className={
                                                errors.name
                                                    ? "!border-red-500/40 !bg-red-500/5 !focus:border-red-500/60"
                                                    : ""
                                            }
                                        />
                                        {errors.name && (
                                            <div className="mt-1.5 px-3 py-1 rounded-lg border border-red-500/15 bg-red-500/5 text-red-400/90 text-[10px] font-mono flex items-center gap-1.5 animate-contact-fade-in shadow-[0_2px_10px_rgba(239,68,68,0.05)]">
                                                <span className="text-[11px] animate-pulse">
                                                    ⚠️
                                                </span>
                                                {errors.name}
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="email">
                                            Your Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="your@email.com"
                                            className={
                                                errors.email
                                                    ? "!border-red-500/40 !bg-red-500/5 !focus:border-red-500/60"
                                                    : ""
                                            }
                                        />
                                        {errors.email && (
                                            <div className="mt-1.5 px-3 py-1 rounded-lg border border-red-500/15 bg-red-500/5 text-red-400/90 text-[10px] font-mono flex items-center gap-1.5 animate-contact-fade-in shadow-[0_2px_10px_rgba(239,68,68,0.05)]">
                                                <span className="text-[11px] animate-pulse">
                                                    ⚠️
                                                </span>
                                                {errors.email}
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="message">
                                            Your Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={form.message}
                                            onChange={handleChange}
                                            placeholder="How can I help you?"
                                            rows="5"
                                            className={`resize-none ${errors.message ? "!border-red-500/40 !bg-red-500/5 !focus:border-red-500/60" : ""}`}
                                        />
                                        {errors.message && (
                                            <div className="mt-1.5 px-3 py-1 rounded-lg border border-red-500/15 bg-red-500/5 text-red-400/90 text-[10px] font-mono flex items-center gap-1.5 animate-contact-fade-in shadow-[0_2px_10px_rgba(239,68,68,0.05)]">
                                                <span className="text-[11px] animate-pulse">
                                                    ⚠️
                                                </span>
                                                {errors.message}
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full"
                                    >
                                        <div
                                            className={`cta-button group w-full relative overflow-hidden transition-all duration-300 ${loading ? "border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.3)]" : ""}`}
                                        >
                                            {loading ? (
                                                <>
                                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20 animate-pulse" />
                                                    <div
                                                        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 animate-loading-shimmer"
                                                        style={{
                                                            width: "100%",
                                                        }}
                                                    />

                                                    <div className="flex items-center justify-center gap-2 z-10 py-1.5">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce delay-100" />
                                                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce delay-200" />
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce delay-300" />
                                                        <span className="text-[11px] font-semibold text-white/80 font-mono tracking-wider ml-1 uppercase">
                                                            Transmitting
                                                            Signal...
                                                        </span>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="bg-circle" />
                                                    <p className="text">
                                                        Send Message
                                                    </p>
                                                    <div className="arrow-wrapper">
                                                        <img
                                                            src="/images/arrow-down.svg"
                                                            alt="arrow"
                                                        />
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </button>
                                </form>
                            )}
                        </div>
                    </Reveal>

                    {/* 3D MODEL */}
                    <Reveal as="div" delay={0.15} className="xl:col-span-7 min-h-96">
                        <div
                            className="w-full h-full hover:cursor-grab rounded-3xl overflow-hidden"
                            style={{ background: "#cd7c2e" }}
                        >
                            {!isMobile || load3D ? (
                                <ContactExperience />
                            ) : (
                                <ContactFallback
                                    onLoad={() => setLoad3D(true)}
                                />
                            )}
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
};

export default Contact;
