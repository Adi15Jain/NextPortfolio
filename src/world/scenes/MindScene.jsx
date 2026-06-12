"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Billboard } from "@react-three/drei";
import * as THREE from "three";
import { REGION } from "../worldConfig";
import Staged from "../Staged";

/**
 * SCENE 05 — THE ENGINEERING MIND
 * A living decision engine. Five cognition lobes — the actual disciplines —
 * surround a breathing core. Thoughts fire in sequence: a pulse leaves the
 * core, rides a synaptic pathway, and ignites a lobe, which blooms while
 * "thinking". The structure demonstrates reasoning, not decoration.
 */

const LOBES = [
    { key: "problem", label: "Problem Solving", color: "#ffd27f", dir: [0, 3.3, 0] },
    { key: "systems", label: "Systems Thinking", color: "#7fb4ff", dir: [3.4, 1.0, -0.4] },
    { key: "ai", label: "AI Engineering", color: "#c79bff", dir: [-3.4, 1.0, -0.4] },
    { key: "product", label: "Product Design", color: "#7fe9d9", dir: [2.3, -2.6, 0.3] },
    { key: "perf", label: "Performance", color: "#ff9d7f", dir: [-2.3, -2.6, 0.3] },
];

const FIRE_PERIOD = 2.6; // seconds per thought

export default function MindScene() {
    const core = useRef();
    const lobeRefs = useRef([]);
    const pulseRefs = useRef([]);
    const crossPulse = useRef();

    const pathways = useMemo(
        () =>
            LOBES.map((l) => {
                const end = new THREE.Vector3(...l.dir);
                const mid = end
                    .clone()
                    .multiplyScalar(0.5)
                    .add(
                        new THREE.Vector3(
                            -end.y * 0.18,
                            end.x * 0.18,
                            0.6,
                        ),
                    );
                return new THREE.QuadraticBezierCurve3(
                    new THREE.Vector3(0, 0, 0),
                    mid,
                    end,
                );
            }),
        [],
    );

    const pathGeoms = useMemo(
        () =>
            pathways.map((c) => {
                const g = new THREE.BufferGeometry();
                g.setAttribute(
                    "position",
                    new THREE.Float32BufferAttribute(
                        c.getPoints(28).flatMap((v) => [v.x, v.y, v.z]),
                        3,
                    ),
                );
                return g;
            }),
        [pathways],
    );

    // Disciplines interconnect — a perimeter ring of association links, and a
    // cross-thought that travels lobe→lobe (integrated thinking, not silos).
    const ringCurves = useMemo(
        () =>
            LOBES.map((l, i) => {
                const a = new THREE.Vector3(...l.dir);
                const b = new THREE.Vector3(...LOBES[(i + 1) % LOBES.length].dir);
                const mid = a.clone().add(b).multiplyScalar(0.55);
                return new THREE.QuadraticBezierCurve3(a, mid, b);
            }),
        [],
    );
    const ringGeoms = useMemo(
        () =>
            ringCurves.map((c) => {
                const g = new THREE.BufferGeometry();
                g.setAttribute(
                    "position",
                    new THREE.Float32BufferAttribute(
                        c.getPoints(20).flatMap((v) => [v.x, v.y, v.z]),
                        3,
                    ),
                );
                return g;
            }),
        [ringCurves],
    );

    useFrame((state, delta) => {
        const t = state.clock.elapsedTime;

        // Breathing core
        if (core.current) {
            core.current.rotation.y += delta * 0.12;
            core.current.scale.setScalar(1 + Math.sin(t * 0.8) * 0.05);
        }

        // A slower association-thought rides the perimeter ring continuously.
        if (crossPulse.current) {
            const ringT = (t * 0.1) % 1;
            const seg = Math.min(
                ringCurves.length - 1,
                Math.floor(ringT * ringCurves.length),
            );
            const local = ringT * ringCurves.length - seg;
            crossPulse.current.position.copy(ringCurves[seg].getPoint(local));
        }

        // Which lobe is "thinking" right now, and how far the thought has run.
        const cycle = (t / FIRE_PERIOD) % LOBES.length;
        const activeIdx = Math.floor(cycle);
        const phase = cycle - activeIdx; // 0→1 along the pathway

        LOBES.forEach((l, i) => {
            const lobe = lobeRefs.current[i];
            const pulse = pulseRefs.current[i];
            const isActive = i === activeIdx;

            if (pulse) {
                pulse.visible = isActive;
                if (isActive) {
                    pulse.position.copy(pathways[i].getPoint(phase));
                    pulse.material.userData._stagedExempt = true;
                    pulse.material.opacity = Math.sin(phase * Math.PI);
                }
            }
            if (lobe) {
                // Lobe blooms as the thought arrives, then settles.
                const arrival = isActive ? Math.max(0, phase - 0.55) / 0.45 : 0;
                const settle = lobe.userData.glow || 0;
                const target = Math.max(arrival * 1.6, settle * 0.94);
                lobe.userData.glow = target;
                lobe.material.emissiveIntensity = 0.45 + target;
                lobe.scale.setScalar(1 + target * 0.12);
            }
        });
    });

    return (
        <Staged start={0.635} end={0.79} pre={0.025} post={0.04} preview={0.06}>
            <group position={REGION.mind}>
                <pointLight intensity={55} distance={32} color="#a78bfa" />

            {/* The core — the decision engine itself */}
            <mesh ref={core}>
                <icosahedronGeometry args={[1.6, 1]} />
                <meshStandardMaterial color="#7c5cff" emissive="#a78bfa" emissiveIntensity={1.1} wireframe />
            </mesh>

            {/* Association links between disciplines + the cross-thought */}
            {ringGeoms.map((g, i) => (
                <line key={`ring-${i}`} geometry={g}>
                    <lineBasicMaterial color="#8d7bd8" transparent opacity={0.16} />
                </line>
            ))}
            <mesh ref={crossPulse}>
                <sphereGeometry args={[0.07, 10, 10]} />
                <meshBasicMaterial color="#e8e1ff" />
            </mesh>

            {/* Synaptic pathways + cognition lobes */}
            {LOBES.map((l, i) => (
                <group key={l.key}>
                    <line geometry={pathGeoms[i]}>
                        <lineBasicMaterial color={l.color} transparent opacity={0.28} />
                    </line>
                    <mesh
                        position={l.dir}
                        ref={(el) => (lobeRefs.current[i] = el)}
                    >
                        <icosahedronGeometry args={[0.42, 1]} />
                        <meshStandardMaterial color={l.color} emissive={l.color} emissiveIntensity={0.45} />
                    </mesh>
                    <mesh ref={(el) => (pulseRefs.current[i] = el)} visible={false}>
                        <sphereGeometry args={[0.09, 10, 10]} />
                        <meshBasicMaterial color="#ffffff" transparent />
                    </mesh>
                    {/* Billboarded label, pushed clear of the lobe so it can
                        never be clipped by geometry or viewing angle. */}
                    <Billboard
                        position={[
                            l.dir[0] * 1.45,
                            l.dir[1] * 1.45 + (l.dir[1] >= 0 ? 0.55 : -0.55),
                            l.dir[2],
                        ]}
                    >
                        <Text
                            fontSize={0.3}
                            color="#ffffff"
                            anchorX="center"
                            anchorY="middle"
                            outlineWidth={0.012}
                            outlineColor="#05060a"
                        >
                            {l.label}
                        </Text>
                    </Billboard>
                </group>
            ))}
            </group>
        </Staged>
    );
}
