"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { SCENES, useActiveScene, useTimelineGate } from "./journeyStore";
import { MILESTONES } from "./timelineData";
import ContactTerminal from "./ContactTerminal";
import { counterItems, socialImgs } from "../constants";

const EASE = [0.16, 1, 0.3, 1];

const panelVariants = {
    initial: { opacity: 0, y: 28, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: -22, filter: "blur(8px)" },
};

/* Positioning lives on the OUTER plain div (so its centering transforms are
   never overwritten by Framer's animated transform); the motion div inside
   only animates. */
const Panel = ({ children, align = "center" }) => (
    <div className={`world-panel world-panel-${align}`}>
        <motion.div
            className="world-panel-anim"
            variants={panelVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.7, ease: EASE }}
        >
            {children}
        </motion.div>
    </div>
);

const Eyebrow = ({ children }) => (
    <span className="world-eyebrow">{children}</span>
);

/* ── Per-scene content (the real, indexable copy, docked into the world) ── */
function SceneContent({ scene }) {
    const id = SCENES[scene].id;

    if (id === "workspace")
        return (
            <Panel align="left">
                <Eyebrow>● Open to opportunities</Eyebrow>
                <h1 className="world-h1">
                    Adi Jain
                    <span className="world-h1-sub">
                        AI &amp; ML Engineer · Systems Builder
                    </span>
                </h1>
                <p className="world-lead">
                    Welcome into my workspace. Everything you&apos;re about to
                    travel through started here — at this desk.
                </p>
                <div className="world-stats">
                    {counterItems.map((c) => (
                        <div key={c.label} className="world-stat">
                            <span className="world-stat-v">
                                {c.value}
                                {c.suffix}
                            </span>
                            <span className="world-stat-l">{c.label}</span>
                        </div>
                    ))}
                </div>
                <span className="world-hint">Scroll to begin the journey ↓</span>
            </Panel>
        );

    if (id === "portal")
        return (
            <Panel>
                <h2 className="world-h2 world-glow">Into the mind…</h2>
            </Panel>
        );

    // Scenes 03–05: the world now explains itself (labeled living systems),
    // so the overlay stays minimal — an eyebrow and a single framing line.
    if (id === "ecosystem")
        return (
            <Panel align="left">
                <Eyebrow>Scene 03 — The Builder&apos;s Ecosystem</Eyebrow>
                <h2 className="world-h2">Watch the stack run</h2>
                <p className="world-lead">
                    Every system here is doing its real job — requests flowing,
                    containers shipping, networks learning.
                </p>
            </Panel>
        );

    if (id === "galaxy")
        return (
            <Panel align="left">
                <Eyebrow>Scene 04 — Project Galaxy</Eyebrow>
                <h2 className="world-h2">Each project is a world</h2>
                <p className="world-lead">
                    The form is the function — a scanner that scans, a market
                    that moves, an interview room that speaks.
                </p>
                <Link href="/projects" className="world-cta">
                    Step inside the projects →
                </Link>
            </Panel>
        );

    if (id === "mind")
        return (
            <Panel align="left">
                <Eyebrow>Scene 05 — The Engineering Mind</Eyebrow>
                <h2 className="world-h2">Watch a thought travel</h2>
                <p className="world-lead">
                    Five disciplines, one engine. Each pulse leaving the core is
                    a problem becoming a decision.
                </p>
            </Panel>
        );

    if (id === "timeline") return <TimelinePanel />;

    if (id === "future")
        return (
            <div className="world-finale-layout">
                <motion.div
                    className="world-finale-grid"
                    variants={panelVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.7, ease: EASE }}
                >
                {/* Left: the message. Right: the machine. Never overlapping. */}
                <div className="world-finale-copy">
                    <Eyebrow>Scene 07 — Back at the desk</Eyebrow>
                    <h2 className="world-h2">
                        Let&apos;s build something
                        <br />
                        meaningful together.
                    </h2>
                    <p className="world-lead">
                        You&apos;ve traveled through everything I&apos;ve built
                        and how I think. The workstation is live — send a
                        transmission and it lands on my desk.
                    </p>
                    <div className="world-socials world-socials-left">
                        <a
                            href="/AdiJainResumeNew.pdf?v=2"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="world-social"
                        >
                            Résumé
                        </a>
                        {socialImgs.map((s) => (
                            <a
                                key={s.url}
                                href={s.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="world-social"
                            >
                                {s.name}
                            </a>
                        ))}
                    </div>
                </div>
                <div className="world-finale-form">
                    <ContactTerminal />
                </div>
                </motion.div>
            </div>
        );

    return null;
}

/* ── Scene 06 panel: the active milestone's USP achievements, animated in as
   you reach each gate (synced to the 3D loop via the shared active gate). ── */
function TimelinePanel() {
    const gate = useTimelineGate();
    const m = MILESTONES[gate] || MILESTONES[0];
    return (
        <div className="world-panel world-panel-bottom world-tl-panel">
            <div className="world-panel-anim">
                <Eyebrow>Scene 06 — The Timeline</Eyebrow>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={gate}
                        className="world-tl-card"
                        initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                        transition={{ duration: 0.5, ease: EASE }}
                    >
                        <div
                            className="world-tl-role"
                            style={{ color: m.color }}
                        >
                            {m.title}
                        </div>
                        <div className="world-tl-org">{m.org}</div>
                        <ul className="world-tl-points">
                            {m.points.map((p, i) => (
                                <li key={i}>
                                    <span
                                        className="world-tl-dot"
                                        style={{ background: m.color }}
                                    />
                                    {p}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

/* ── Flight-path navigator (jump anywhere; never trapped) ── */
function FlightPath({ onJump }) {
    const scene = useActiveScene();
    return (
        <nav className="world-flightpath" aria-label="Journey navigation">
            {SCENES.map((s, i) => (
                <button
                    key={s.id}
                    onClick={() => onJump(i)}
                    className={`world-fp-dot ${i === scene ? "active" : ""}`}
                    aria-label={s.label}
                    aria-current={i === scene}
                >
                    <span className="world-fp-label">{s.label}</span>
                </button>
            ))}
        </nav>
    );
}

export default function WorldOverlay({ onJump, onClassic }) {
    const scene = useActiveScene();
    return (
        <div className="world-overlay">
            <header className="world-topbar">
                <span className="world-brand">ADI JAIN</span>
                <button className="world-classic-toggle" onClick={onClassic}>
                    Classic view
                </button>
            </header>

            <AnimatePresence mode="wait">
                <SceneContent key={scene} scene={scene} />
            </AnimatePresence>

            <FlightPath onJump={onJump} />
        </div>
    );
}
