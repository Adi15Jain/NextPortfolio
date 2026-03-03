"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import TitleHeader from "../components/TitleHeader";
import ContactExperience from "../components/Models/Contact/ContactExperience";

const Contact = () => {
    const formRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", message: "" });

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
            await emailjs.sendForm(
                process.env.NEXT_PUBLIC_APP_EMAILJS_SERVICE_ID,
                process.env.NEXT_PUBLIC_APP_EMAILJS_TEMPLATE_ID,
                formRef.current,
                process.env.NEXT_PUBLIC_APP_EMAILJS_PUBLIC_KEY,
            );
            setForm({ name: "", email: "", message: "" });
            setSuccess(true);
            setTimeout(() => setSuccess(false), 5000);
        } catch (err) {
            console.error("EmailJS Error:", err);
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
                    sub="💬 Have questions or ideas? Let's talk! 🚀"
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
                            <ContactExperience />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
