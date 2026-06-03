"use client";

import { useEffect, useRef, useState } from "react";

import TitleHeader from "../components/TitleHeader";
import { MessageSquare } from "lucide-react";
import ContactExperience from "../components/Models/Contact/ContactExperience";

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
                        <svg className="w-6 h-6 animate-pulse text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
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
                        WebGL model paused to maximize mobile responsive scrolling speeds.
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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

            setForm({ name: "", email: "", message: "" });
            setSuccess(true);
            setTimeout(() => setSuccess(false), 5000);
        } catch (err) {
            console.error("Contact Form Submission Error:", err);
            setError(true);
            setTimeout(() => setError(false), 5000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="flex-center section-padding">
            <div className="w-full h-full md:px-10 px-5">
                <TitleHeader
                    title="Get in Touch – Let's Connect"
                    sub={<span className="flex items-center gap-1.5"><MessageSquare size={13} className="text-blue-400" /> Have questions or ideas? Let&apos;s talk!</span>}
                />
                <div className="grid-12-cols mt-16">
                    {/* FORM */}
                    <div className="xl:col-span-5">
                        <div
                            className="glass-card rounded-2xl p-8 md:p-10"
                            style={{
                                border: "1px solid rgba(255,255,255,0.08)",
                            }}
                        >
                            <form
                                ref={formRef}
                                onSubmit={handleSubmit}
                                className="w-full flex flex-col gap-6"
                            >
                                {/* Status feedback */}
                                {success && (
                                    <div
                                        className="w-full py-3 px-4 rounded-xl text-sm font-medium text-green-300 flex items-center gap-2"
                                        style={{
                                            background: "rgba(16,185,129,0.1)",
                                            border: "1px solid rgba(16,185,129,0.3)",
                                        }}
                                    >
                                        ✅ Message sent successfully! I&apos;ll
                                        get back to you soon.
                                    </div>
                                )}
                                {error && (
                                    <div
                                        className="w-full py-3 px-4 rounded-xl text-sm font-medium text-red-300 flex items-center gap-2"
                                        style={{
                                            background: "rgba(239,68,68,0.1)",
                                            border: "1px solid rgba(239,68,68,0.3)",
                                        }}
                                    >
                                        ❌ Something went wrong. Please try
                                        again.
                                    </div>
                                )}

                                <div>
                                    <label htmlFor="name">Your Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="What's your good name?"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email">Your Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="your@email.com"
                                        required
                                    />
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
                                        required
                                        className="resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full"
                                >
                                    <div className="cta-button group w-full">
                                        <div className="bg-circle" />
                                        <p className="text">
                                            {loading
                                                ? "Sending..."
                                                : "Send Message"}
                                        </p>
                                        <div className="arrow-wrapper">
                                            <img
                                                src="/images/arrow-down.svg"
                                                alt="arrow"
                                            />
                                        </div>
                                    </div>
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* 3D MODEL */}
                    <div className="xl:col-span-7 min-h-96">
                        <div
                            className="w-full h-full hover:cursor-grab rounded-3xl overflow-hidden"
                            style={{ background: "#cd7c2e" }}
                        >
                            {!isMobile || load3D ? (
                                <ContactExperience />
                            ) : (
                                <ContactFallback onLoad={() => setLoad3D(true)} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
