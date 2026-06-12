"use client";

import { useEffect, useRef, useState } from "react";
import { bumpTerminalActivity } from "./journeyStore";

/**
 * SCENE 07 — the workstation terminal.
 * Not a contact form: a transmission. Typing pulses light through the room
 * (via the terminal activity channel); sending runs a visible uplink sequence
 * with explicit success / failure states. The user contacts the engineer
 * through the world they just explored.
 */

const SEQUENCE = [
    "▸ ESTABLISHING CONNECTION…",
    "▸ ENCRYPTING PAYLOAD…",
    "▸ TRANSMITTING MESSAGE…",
];

export default function ContactTerminal() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState("idle"); // idle | sending | success | failed
    const [log, setLog] = useState([]);
    const [fieldError, setFieldError] = useState("");
    const timers = useRef([]);

    useEffect(() => () => timers.current.forEach(clearTimeout), []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setFieldError("");
        bumpTerminalActivity(0.35); // light travels through the room
    };

    const validate = () => {
        if (!form.name.trim()) return "Identify yourself — name required.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
            return "A valid uplink address (email) is required.";
        if (!form.message.trim()) return "The transmission is empty.";
        return "";
    };

    const transmit = async (e) => {
        e.preventDefault();
        const err = validate();
        if (err) {
            setFieldError(err);
            return;
        }

        setStatus("sending");
        setLog([]);

        // Staged uplink sequence — the room stays lit while transmitting.
        SEQUENCE.forEach((line, i) => {
            timers.current.push(
                setTimeout(() => {
                    setLog((prev) => [...prev, line]);
                    bumpTerminalActivity(1);
                }, 450 * i),
            );
        });

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const result = await res.json();
            const ok = res.ok && result.success;

            // Let the sequence finish before the verdict lands.
            timers.current.push(
                setTimeout(() => {
                    if (ok) {
                        setLog((prev) => [...prev, "✓ DELIVERY CONFIRMED"]);
                        setStatus("success");
                        setForm({ name: "", email: "", message: "" });
                    } else {
                        setLog((prev) => [...prev, "✕ TRANSMISSION FAILED"]);
                        setStatus("failed");
                    }
                    bumpTerminalActivity(1);
                }, 450 * SEQUENCE.length + 300),
            );
        } catch (error) {
            timers.current.push(
                setTimeout(() => {
                    setLog((prev) => [...prev, "✕ TRANSMISSION FAILED"]);
                    setStatus("failed");
                }, 450 * SEQUENCE.length + 300),
            );
        }
    };

    if (status === "success") {
        return (
            <div className="terminal terminal-verdict" role="status" aria-live="polite">
                <div className="terminal-log">
                    {log.map((l, i) => (
                        <div key={i} className={l.startsWith("✓") ? "ok" : ""}>
                            {l}
                        </div>
                    ))}
                </div>
                <h3 className="terminal-result ok">MESSAGE RECEIVED</h3>
                <p className="terminal-note">
                    Your transmission reached my workstation. I&apos;ll respond
                    within 24 hours.
                </p>
                <button
                    className="terminal-btn ghost"
                    onClick={() => {
                        setStatus("idle");
                        setLog([]);
                    }}
                >
                    SEND ANOTHER
                </button>
            </div>
        );
    }

    if (status === "failed") {
        return (
            <div className="terminal terminal-verdict" role="alert">
                <div className="terminal-log">
                    {log.map((l, i) => (
                        <div key={i} className={l.startsWith("✕") ? "err" : ""}>
                            {l}
                        </div>
                    ))}
                </div>
                <h3 className="terminal-result err">UPLINK INTERRUPTED</h3>
                <p className="terminal-note">
                    The message didn&apos;t get through. Check your connection
                    and retry — your draft is preserved.
                </p>
                <button
                    className="terminal-btn"
                    onClick={() => {
                        setStatus("idle");
                        setLog([]);
                    }}
                >
                    RETRY TRANSMISSION
                </button>
            </div>
        );
    }

    return (
        <form className="terminal" onSubmit={transmit} noValidate>
            <div className="terminal-head">
                <span className="terminal-dot" />
                <span>WORKSTATION UPLINK · adijain.click</span>
            </div>

            <label className="terminal-field" htmlFor="tx-name">
                <span>NAME</span>
                <input
                    id="tx-name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Who's reaching out?"
                    disabled={status === "sending"}
                    autoComplete="name"
                />
            </label>
            <label className="terminal-field" htmlFor="tx-email">
                <span>EMAIL</span>
                <input
                    id="tx-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    disabled={status === "sending"}
                    autoComplete="email"
                />
            </label>
            <label className="terminal-field" htmlFor="tx-message">
                <span>MESSAGE</span>
                <textarea
                    id="tx-message"
                    name="message"
                    rows={3}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="What should we build?"
                    disabled={status === "sending"}
                />
            </label>

            {fieldError && (
                <div className="terminal-error" role="alert">
                    ⚠ {fieldError}
                </div>
            )}

            {status === "sending" ? (
                <div className="terminal-log live" role="status" aria-live="polite">
                    {log.map((l, i) => (
                        <div key={i}>{l}</div>
                    ))}
                    <span className="terminal-caret" aria-hidden="true" />
                </div>
            ) : (
                <button type="submit" className="terminal-btn">
                    TRANSMIT ⏎
                </button>
            )}
        </form>
    );
}
