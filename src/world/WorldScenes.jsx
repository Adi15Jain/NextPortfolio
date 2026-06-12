"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useTexture, Text } from "@react-three/drei";
import * as THREE from "three";
import { journey, terminal, nearRange } from "./journeyStore";
import { REGION } from "./worldConfig";
import { MILESTONES, timelineGateAt } from "./timelineData";
import Staged from "./Staged";

/* ───────────────────────── SCENE 1/7 — THE WORKSPACE ───────────────────────── */
export function Workspace() {
    const { scene } = useGLTF("/models/optimized-room.glb");
    const room = useMemo(() => scene.clone(true), [scene]);
    const ref = useRef();

    useFrame(() => {
        if (!ref.current) return;
        const p = journey.progress;
        const near = p < 0.2 ? 1 : p > 0.9 ? 1 : Math.max(0, 1 - (p - 0.2) * 6);
        ref.current.visible = near > 0.02;
    });

    return (
        <group
            ref={ref}
            position={[0, -3.5, 0]}
            rotation={[0, -Math.PI / 4, 0]}
        >
            <primitive object={room} />
        </group>
    );
}

export function WorkspaceLights() {
    const pulse = useRef();
    const dawn = useRef();

    useFrame((_, delta) => {
        const dt = Math.min(delta, 0.05);

        // Typing in the contact terminal sends light through the room —
        // the workstation visibly "processing" your message.
        terminal.activity = Math.max(0, terminal.activity - dt * 1.2);
        if (pulse.current) {
            pulse.current.intensity = 6 + terminal.activity * 46;
        }

        // The return (scene 7) is dawn: warm light rises as the journey ends.
        if (dawn.current) {
            const k = Math.max(0, (journey.progress - 0.9) / 0.1);
            dawn.current.intensity = k * 55;
        }
    });

    return (
        <>
            <spotLight
                position={[2, 5, 6]}
                angle={0.5}
                penumbra={0.6}
                intensity={90}
                color="#ffe9c9"
            />
            <spotLight
                position={[-3, 5, 5]}
                angle={0.5}
                penumbra={1}
                intensity={50}
                color="#9ec9ff"
            />
            <pointLight position={[0, 1, 0]} intensity={8} color="#c0a8d7" />
            <pointLight
                ref={pulse}
                position={[1.5, 0.4, -1]}
                intensity={6}
                color="#7fd2ff"
            />
            <pointLight
                ref={dawn}
                position={[-4, 3, 4]}
                intensity={0}
                color="#ffb37f"
            />
        </>
    );
}

/* ───────────────────────── SCENE 2 — THE PORTAL ───────────────────────── */
export function PortalGate() {
    const ringRef = useRef();
    const matRef = useRef();
    useFrame((state) => {
        if (!nearRange(0.09, 0.24)) return;
        const p = journey.progress;
        const k = Math.max(0, 1 - Math.abs(p - 0.17) * 9);
        // Opacity is owned by the Staged wrapper; the crossing pulse is
        // expressed through scale + spin only.
        if (ringRef.current) {
            ringRef.current.rotation.z = state.clock.elapsedTime * 0.2;
            ringRef.current.scale.setScalar(1 + k * 1.5);
        }
    });
    return (
        <Staged start={0.09} end={0.225} pre={0.02} post={0.025} preview={0}>
            <group position={REGION.portal}>
                <mesh ref={ringRef}>
                    <torusGeometry args={[2.4, 0.05, 16, 80]} />
                    <meshBasicMaterial
                        ref={matRef}
                        color="#bcd4ff"
                        transparent
                        opacity={0.4}
                    />
                </mesh>
                <mesh>
                    <circleGeometry args={[2.35, 64]} />
                    <meshBasicMaterial
                        color="#0a1430"
                        transparent
                        opacity={0.5}
                        side={THREE.DoubleSide}
                    />
                </mesh>
            </group>
        </Staged>
    );
}

/* ───────────────────────── SCENE 6 — THE TIMELINE ─────────────────────────
   Real milestones as gates: each active gate shows the ORG LOGO + headline in
   the loop (3D), while the USP achievements animate in the DOM panel. One
   milestone is "active" at a time — synced to the journey so 3D + DOM agree. */
export function Timeline() {
    // Two real org logos; gates without one (independent work) show no chip.
    const [tmuTex, evoTex] = useTexture([
        "/images/logo.png",
        "/images/download4.jpeg",
    ]);
    tmuTex.colorSpace = THREE.SRGBColorSpace;
    evoTex.colorSpace = THREE.SRGBColorSpace;
    const logoFor = { tmu: tmuTex, evoastra: evoTex };

    return (
        <Staged start={0.762} end={0.93} pre={0.022} post={0.05} preview={0}>
            <group>
                <pointLight
                    position={[0, 0, -110]}
                    intensity={40}
                    distance={60}
                    color="#34d399"
                />
                {MILESTONES.map((m, i) => (
                    <TimeGate
                        key={m.z}
                        {...m}
                        index={i}
                        logoTex={m.logo ? logoFor[m.logo] : null}
                    />
                ))}
            </group>
        </Staged>
    );
}

function TimeGate({ z, date, title, org, color, index, logoTex }) {
    const ring = useRef();
    const mat = useRef();
    const infoGroup = useRef();
    const infoMats = useRef([]);
    const collected = useRef(false);

    useFrame((state) => {
        if (!ring.current || !nearRange(0.76, 0.93)) return;
        ring.current.rotation.z = state.clock.elapsedTime * 0.08 + index;

        // Active milestone is decided by journey progress (same source the DOM
        // panel reads) — 3D and the achievement list stay perfectly in sync.
        const { idx, fade } = timelineGateAt(journey.progress);
        const k = idx === index ? fade : 0;

        if (mat.current) mat.current.emissiveIntensity = 0.3 + k * 1.6;

        const ig = infoGroup.current;
        if (ig) {
            if (!collected.current) {
                infoMats.current = [];
                ig.traverse((o) => {
                    if (!o.material) return;
                    const mats = Array.isArray(o.material)
                        ? o.material
                        : [o.material];
                    for (const m of mats) {
                        if (!m) continue;
                        if (!m.userData) m.userData = {};
                        m.userData._stagedExempt = true;
                        m.transparent = true;
                        infoMats.current.push(m);
                    }
                });
                collected.current = infoMats.current.length > 0;
            }
            ig.visible = k > 0.02;
            for (const m of infoMats.current) m.opacity = k;
        }
    });

    return (
        <group position={[0, 0, z]}>
            <mesh ref={ring}>
                <torusGeometry args={[3.2, 0.06, 12, 80]} />
                <meshStandardMaterial
                    ref={mat}
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.5}
                />
            </mesh>

            <group ref={infoGroup}>
                {/* Org logo chip — a framed card so any logo reads cleanly */}
                {logoTex && (
                    <group position={[0, 1.65, 0.05]}>
                        <mesh position={[0, 0, -0.02]}>
                            <planeGeometry args={[1.12, 1.12]} />
                            <meshBasicMaterial
                                color={color}
                                transparent
                                opacity={0.9}
                            />
                        </mesh>
                        <mesh position={[0, 0, -0.01]}>
                            <planeGeometry args={[1.0, 1.0]} />
                            <meshBasicMaterial color="#ffffff" transparent />
                        </mesh>
                        <mesh>
                            <planeGeometry args={[0.84, 0.84]} />
                            <meshBasicMaterial map={logoTex} transparent />
                        </mesh>
                    </group>
                )}

                <Text
                    position={[0, logoTex ? 0.85 : 1.1, 0.05]}
                    fontSize={0.21}
                    color={color}
                    anchorX="center"
                    anchorY="bottom"
                    outlineWidth={0.008}
                    outlineColor="#05060a"
                >
                    {date}
                </Text>
                <Text
                    position={[0, logoTex ? 0.32 : 0.55, 0.05]}
                    fontSize={0.4}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="bottom"
                    outlineWidth={0.014}
                    outlineColor="#05060a"
                >
                    {title}
                </Text>
                <Text
                    position={[0, logoTex ? -0.1 : 0.14, 0.05]}
                    fontSize={0.2}
                    color="#c2c8d6"
                    anchorX="center"
                    anchorY="bottom"
                    outlineWidth={0.008}
                    outlineColor="#05060a"
                >
                    {org}
                </Text>
            </group>
        </group>
    );
}

useGLTF.preload("/models/optimized-room.glb");
