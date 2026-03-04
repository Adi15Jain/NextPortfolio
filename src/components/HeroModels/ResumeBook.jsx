"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { FileText } from "lucide-react";
import * as THREE from "three";

/* ─────────────────────────────────────────────────────────────
   Generates a canvas texture that looks like a real CV page.
   Drawn once, cached as a THREE.CanvasTexture.
───────────────────────────────────────────────────────────── */
function buildResumeTexture() {
    const W = 512;
    const H = 720;
    const cv = document.createElement("canvas");
    cv.width = W;
    cv.height = H;
    const ctx = cv.getContext("2d");

    /* Background — off-white paper */
    ctx.fillStyle = "#f5f0eb";
    ctx.fillRect(0, 0, W, H);

    /* Top accent bar */
    const headerGrad = ctx.createLinearGradient(0, 0, W, 0);
    headerGrad.addColorStop(0, "#1e3a8a");
    headerGrad.addColorStop(1, "#7c3aed");
    ctx.fillStyle = headerGrad;
    ctx.fillRect(0, 0, W, 90);

    /* Name */
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 36px Arial";
    ctx.fillText("Adi Jain", 24, 46);

    /* Title under name */
    ctx.fillStyle = "#c4b5fd";
    ctx.font = "15px Arial";
    ctx.fillText("AI / ML Engineer  ·  Full-Stack Dev", 24, 72);

    /* Section: Contact line */
    ctx.fillStyle = "#1e3a8a";
    ctx.font = "bold 11px Arial";
    ctx.fillText("github.com/Adi15Jain   ·   linkedin.com/in/adijain", 24, 108);

    /* ── Helper: ruled section ── */
    const line = (y) => {
        ctx.beginPath();
        ctx.moveTo(24, y);
        ctx.lineTo(W - 24, y);
        ctx.strokeStyle = "#d1d5db";
        ctx.lineWidth = 1;
        ctx.stroke();
    };
    const section = (label, y) => {
        ctx.fillStyle = "#1e3a8a";
        ctx.font = "bold 13px Arial";
        ctx.fillText(label.toUpperCase(), 24, y);
        line(y + 4);
    };
    const bodyLine = (text, y, indent = 24) => {
        ctx.fillStyle = "#374151";
        ctx.font = "11px Arial";
        ctx.fillText(text, indent, y);
    };

    /* SKILLS */
    section("Skills", 138);
    bodyLine("Python · PyTorch · FastAPI · React.js · Next.js", 158);
    bodyLine("Three.js · TailwindCSS · Node.js · SQL · Docker", 174);

    /* EXPERIENCE */
    section("Experience", 204);
    ctx.fillStyle = "#111827";
    ctx.font = "bold 11px Arial";
    ctx.fillText("AI/ML Engineer Intern  —  (2024–present)", 24, 222);
    bodyLine(
        "• Built PneumoAI: CNN-based pneumonia detector (94.7% acc)",
        238,
        32,
    );
    bodyLine("• Developed full-stack interface with React + FastAPI", 253, 32);

    /* PROJECTS */
    section("Projects", 280);
    ctx.fillStyle = "#111827";
    ctx.font = "bold 11px Arial";
    ctx.fillText("PneumoAI  —  React · PyTorch · FastAPI", 24, 298);
    bodyLine(
        "Deep-learning web app diagnosing pneumonia from X-rays.",
        313,
        32,
    );
    ctx.fillStyle = "#111827";
    ctx.font = "bold 11px Arial";
    ctx.fillText("Portfolio  —  Next.js · Three.js · GSAP", 24, 338);
    bodyLine(
        "Immersive 3D portfolio with glassmorphism & scroll animations.",
        353,
        32,
    );

    /* EDUCATION */
    section("Education", 380);
    ctx.fillStyle = "#111827";
    ctx.font = "bold 11px Arial";
    ctx.fillText("B.Tech Computer Science  (AI & ML Specialization)", 24, 398);
    bodyLine("Expected Graduation: 2026", 413, 32);

    /* Ruled blank lines — makes it look like a real paper */
    for (let y = 440; y < H - 30; y += 20) {
        line(y);
    }

    /* Bottom watermark */
    ctx.fillStyle = "#9ca3af";
    ctx.font = "10px Arial";
    ctx.fillText("adijain.dev  ·  Resume 2025", 24, H - 12);

    return new THREE.CanvasTexture(cv);
}

/* ─────────────────────────────────────────────────────────────
   Cover page — gradient dark blue/purple, "RÉSUMÉ" title
───────────────────────────────────────────────────────────── */
function buildCoverTexture() {
    const W = 512;
    const H = 720;
    const cv = document.createElement("canvas");
    cv.width = W;
    cv.height = H;
    const ctx = cv.getContext("2d");

    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, "#0f172a");
    grad.addColorStop(0.5, "#1e1b4b");
    grad.addColorStop(1, "#1e3a8a");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    /* Decorative corner accent */
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(160, 0);
    ctx.lineTo(0, 160);
    ctx.closePath();
    ctx.fillStyle = "rgba(124,58,237,0.4)";
    ctx.fill();

    /* Bottom accent mirror */
    ctx.beginPath();
    ctx.moveTo(W, H);
    ctx.lineTo(W - 160, H);
    ctx.lineTo(W, H - 160);
    ctx.closePath();
    ctx.fillStyle = "rgba(59,130,246,0.4)";
    ctx.fill();

    /* RÉSUMÉ text */
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 56px Arial";
    ctx.textAlign = "center";
    ctx.fillText("RÉSUMÉ", W / 2, H / 2 - 30);

    /* Underline */
    const ul = ctx.createLinearGradient(W / 2 - 100, 0, W / 2 + 100, 0);
    ul.addColorStop(0, "#7c3aed");
    ul.addColorStop(1, "#3b82f6");
    ctx.strokeStyle = ul;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 100, H / 2 - 14);
    ctx.lineTo(W / 2 + 100, H / 2 - 14);
    ctx.stroke();

    /* Name below */
    ctx.fillStyle = "#94a3b8";
    ctx.font = "22px Arial";
    ctx.fillText("Adi Jain", W / 2, H / 2 + 24);
    ctx.font = "14px Arial";
    ctx.fillStyle = "#475569";
    ctx.fillText("adijain.dev", W / 2, H / 2 + 52);

    ctx.textAlign = "left";

    return new THREE.CanvasTexture(cv);
}

/* ─────────────────────────────────────────────────────────────
   Main ResumeBook component
   Sits on top of the desk at world position passed from parent.
───────────────────────────────────────────────────────────── */
export default function ResumeBook({
    position = [1.2, 0.58, 0.3],
    onOpenResume,
}) {
    const groupRef = useRef();
    const coverPivotRef = useRef();
    const glowRef = useRef();

    /* Textures — built once on the client */
    const [textures, setTextures] = useState(null);
    useEffect(() => {
        setTextures({
            resume: buildResumeTexture(),
            cover: buildCoverTexture(),
        });
    }, []);

    const [showLabel, setShowLabel] = useState(false);

    /* Inject button emerge keyframe once */
    useEffect(() => {
        const id = "rb-btn-styles";
        if (document.getElementById(id)) return;
        const s = document.createElement("style");
        s.id = id;
        s.textContent = `
            @keyframes rb-emerge {
                0%   { opacity:0; transform:translateY(22px) scale(0.55); filter:blur(6px); }
                60%  { opacity:1; transform:translateY(-4px) scale(1.06); filter:blur(0); }
                80%  { transform:translateY(2px) scale(0.97); }
                100% { opacity:1; transform:translateY(0) scale(1); filter:blur(0); }
            }
            @keyframes rb-pulse-glow {
                0%,100% { box-shadow:0 0 12px rgba(124,58,237,0.3); }
                50%     { box-shadow:0 0 22px rgba(124,58,237,0.55), 0 0 40px rgba(124,58,237,0.15); }
            }
        `;
        document.head.appendChild(s);
    }, []);

    /* Animation state */
    const anim = useRef({
        phase: "waiting", // waiting | emerge | open | done
        t: 0, // 0→1 progress within phase
        delay: 0, // countdown frames
        EMERGE_DUR: 1.0, // seconds
        OPEN_DUR: 1.6, // seconds
    });

    useEffect(() => {
        /* Start animation after 3 seconds */
        const id = setTimeout(() => {
            anim.current.phase = "emerge";
        }, 3000);
        return () => clearTimeout(id);
    }, []);

    /* Paper size — A4 proportioned */
    const PW = 1.3;
    const PH = 1.82;
    const THICKNESS = 0.009;

    useFrame((_, delta) => {
        const a = anim.current;
        const group = groupRef.current;
        const pivot = coverPivotRef.current;
        const glow = glowRef.current;
        if (!group || !pivot) return;

        if (a.phase === "waiting") return;

        if (a.phase === "emerge") {
            a.t = Math.min(a.t + delta / a.EMERGE_DUR, 1);
            const ease = 1 - Math.pow(1 - a.t, 4); // easeOutQuart
            group.scale.y = 0.01 + ease * 0.99;
            group.position.y = position[1] + (1 - ease) * -0.3;
            if (glow) glow.intensity = ease * 3;
            if (a.t >= 1) {
                a.t = 0;
                a.phase = "open";
                setShowLabel(false);
                group.scale.y = 1;
                group.position.y = position[1];
            }
            return;
        }

        if (a.phase === "open") {
            a.t = Math.min(a.t + delta / a.OPEN_DUR, 1);
            /* easeInOutCubic for a realistic book-open feel */
            const ease =
                a.t < 0.5
                    ? 4 * a.t * a.t * a.t
                    : 1 - Math.pow(-2 * a.t + 2, 3) / 2;
            pivot.rotation.x = -Math.PI * ease;

            /* Glow fades out as cover finishes opening */
            if (glow) glow.intensity = 3 * (1 - ease * 0.8);

            if (a.t >= 1) {
                a.phase = "done";
                setShowLabel(true);
                if (glow) glow.intensity = 0.6; // leave a subtle residual glow
            }
            return;
        }
    });

    const pageMat = useMemo(() => {
        if (!textures) return null;
        return new THREE.MeshPhongMaterial({
            map: textures.resume,
            side: THREE.FrontSide,
        });
    }, [textures]);

    const coverMat = useMemo(() => {
        if (!textures) return null;
        return new THREE.MeshPhongMaterial({
            map: textures.cover,
            side: THREE.DoubleSide,
        });
    }, [textures]);

    const backMat = useMemo(
        () =>
            new THREE.MeshPhongMaterial({
                color: "#0f172a",
                side: THREE.FrontSide,
            }),
        [],
    );
    const spineMat = useMemo(
        () => new THREE.MeshPhongMaterial({ color: "#1e1b4b" }),
        [],
    );

    if (!textures) return null;

    return (
        <group ref={groupRef} position={position} scale={[1, 0.01, 1]}>
            {/* Floating label after animation */}
            {showLabel && (
                <Html
                    position={[0, 1.6, 0]}
                    center
                    distanceFactor={8}
                    zIndexRange={[0, 0]}
                >
                    <button
                        onClick={onOpenResume}
                        style={{
                            background: "rgba(15,23,42,0.92)",
                            backdropFilter: "blur(10px)",
                            border: "1px solid rgba(124,58,237,0.5)",
                            borderRadius: "20px",
                            padding: "5px 14px",
                            color: "#e2e8f0",
                            fontSize: "20px",
                            fontFamily: "Inter, Arial, sans-serif",
                            fontWeight: "600",
                            whiteSpace: "nowrap",
                            pointerEvents: "auto",
                            letterSpacing: "0.04em",
                            boxShadow: "0 0 12px rgba(124,58,237,0.3)",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                            /* Emerge-from-book animation on mount */
                            animation:
                                "rb-emerge 0.65s cubic-bezier(.16,1,.3,1) both, rb-pulse-glow 2.5s ease-in-out 0.8s infinite",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                                "rgba(124,58,237,0.4)";
                            e.currentTarget.style.boxShadow =
                                "0 0 20px rgba(124,58,237,0.6)";
                            e.currentTarget.style.transform = "scale(1.06)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background =
                                "rgba(15,23,42,0.92)";
                            e.currentTarget.style.boxShadow =
                                "0 0 12px rgba(124,58,237,0.3)";
                            e.currentTarget.style.transform = "scale(1)";
                        }}
                        aria-label="Open resume viewer"
                    >
                        <FileText size={30} style={{ flexShrink: 0 }} />
                        My Resume
                    </button>
                </Html>
            )}
            {/* Dramatic glow above the resume */}
            <pointLight
                ref={glowRef}
                position={[0, 1.2, 0]}
                intensity={0}
                color="#a78bfa"
                distance={4}
            />

            {/* ── Back cover (flat, always visible) ── */}
            <mesh position={[0, 0, 0]} material={backMat}>
                <boxGeometry args={[PW, THICKNESS, PH]} />
            </mesh>

            {/* ── Resume page (face-up, sitting on back cover) ── */}
            <mesh
                position={[0, THICKNESS * 2, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                material={pageMat}
            >
                <planeGeometry args={[PW, PH]} />
            </mesh>

            {/*
                ── Cover pivot ──
                Positioned at the far edge (top of paper in Z).
                When coverPivot.rotation.x goes 0 → -PI, the cover
                swings open like a real book page.
            */}
            <group ref={coverPivotRef} position={[0, THICKNESS * 3, -PH / 2]}>
                {/* Cover plane, offset forward so it hinges from back edge */}
                <mesh
                    position={[0, 0, PH / 2]}
                    rotation={[-Math.PI / 2, 0, 0]}
                    material={coverMat}
                >
                    <planeGeometry args={[PW, PH]} />
                </mesh>

                {/* Spine (thin strip on hinge edge, adds depth) */}
                <mesh position={[0, -THICKNESS, 0]} material={spineMat}>
                    <boxGeometry args={[PW, THICKNESS * 2, 0.04]} />
                </mesh>
            </group>
        </group>
    );
}
