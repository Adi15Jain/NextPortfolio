"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import Staged from "../Staged";

/**
 * SCENE 04 — PROJECT GALAXY
 * Projects are PRODUCTS, so they're shown as products: working terminals,
 * diagnostic stations, trading screens, paper pipelines — not planets.
 * All compositions sit in the CENTER-RIGHT story zone; the left third of the
 * frame stays clear for the content panel.
 */

const lineGeom = (pts) => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pts.flat(), 3));
    return g;
};

function ProductLabel({ name, tagline, color, y }) {
    return (
        <group position={[0, y, 0]}>
            <Text
                fontSize={0.34}
                color="#ffffff"
                anchorX="center"
                anchorY="top"
                outlineWidth={0.013}
                outlineColor="#05060a"
            >
                {name}
            </Text>
            <Text
                position={[0, -0.46, 0]}
                fontSize={0.17}
                color={color}
                anchorX="center"
                anchorY="top"
                outlineWidth={0.008}
                outlineColor="#05060a"
            >
                {tagline}
            </Text>
        </group>
    );
}

/* A product screen: dark display with a thin emissive frame. */
function Screen({ w, h, color, children, ...props }) {
    return (
        <group {...props}>
            <mesh position={[0, 0, -0.01]}>
                <planeGeometry args={[w + 0.08, h + 0.08]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.55} side={THREE.DoubleSide} />
            </mesh>
            <mesh>
                <planeGeometry args={[w, h]} />
                <meshStandardMaterial color="#070b14" side={THREE.DoubleSide} />
            </mesh>
            {children}
        </group>
    );
}

/* InterviewPilot — the flagship: an interview command center. Main screen
   speaks in live waveforms; side screens carry telemetry; the conversation
   graph (question → answer turns) floats above. */
function InterviewPilotStation({ position }) {
    const bars = useRef([]);
    const N = 21;
    const convo = useMemo(
        () => [
            [-1.0, 1.6, 0],
            [-0.3, 1.95, 0],
            [0.4, 1.6, 0],
            [1.1, 1.95, 0],
        ],
        [],
    );
    useFrame((state) => {
        const t = state.clock.elapsedTime;
        bars.current.forEach((m, i) => {
            if (!m) return;
            const h = 0.06 + Math.abs(Math.sin(t * 2.6 + i * 0.62) * Math.sin(t * 0.9 + i * 0.3)) * 0.5;
            m.scale.y = h / 0.3;
        });
    });
    return (
        <group position={position}>
            {/* Main screen with the live voice waveform */}
            <Screen w={2.6} h={1.5} color="#f5a623">
                {Array.from({ length: N }, (_, i) => (
                    <mesh
                        key={i}
                        ref={(el) => (bars.current[i] = el)}
                        position={[-1.1 + (i * 2.2) / (N - 1), 0, 0.02]}
                    >
                        <boxGeometry args={[0.05, 0.3, 0.02]} />
                        <meshBasicMaterial color="#ffd27f" />
                    </mesh>
                ))}
            </Screen>
            {/* Side telemetry screens, angled toward the operator */}
            <Screen w={0.95} h={1.1} color="#9adcff" position={[-1.95, -0.1, 0.35]} rotation={[0, 0.5, 0]}>
                {[0.32, 0.12, -0.08, -0.28].map((y, i) => (
                    <mesh key={i} position={[0, y, 0.02]}>
                        <boxGeometry args={[0.6 - i * 0.1, 0.05, 0.01]} />
                        <meshBasicMaterial color="#9adcff" transparent opacity={0.7} />
                    </mesh>
                ))}
            </Screen>
            <Screen w={0.95} h={1.1} color="#9adcff" position={[1.95, -0.1, 0.35]} rotation={[0, -0.5, 0]}>
                {[0.3, 0.05, -0.2].map((y, i) => (
                    <mesh key={i} position={[-0.15 + i * 0.18, y, 0.02]}>
                        <boxGeometry args={[0.1, 0.28 - i * 0.06, 0.01]} />
                        <meshBasicMaterial color="#7fc8f5" transparent opacity={0.8} />
                    </mesh>
                ))}
            </Screen>
            {/* Conversation graph: alternating interviewer/candidate turns */}
            {convo.map((p, i) => (
                <mesh key={i} position={p}>
                    <sphereGeometry args={[0.09, 10, 10]} />
                    <meshBasicMaterial color={i % 2 ? "#ffd27f" : "#9adcff"} />
                </mesh>
            ))}
            <line geometry={lineGeom(convo)}>
                <lineBasicMaterial color="#ffd27f" transparent opacity={0.4} />
            </line>
            <ProductLabel name="InterviewPilot" tagline="AI interview command center · <1s audio" color="#f5a623" y={-1.5} />
        </group>
    );
}

/* PneumoAI — a diagnostic lightbox: the scan line sweeps the lung field,
   and the model's confidence bar reads out beside it. */
function PneumoStation({ position }) {
    const sweep = useRef();
    const conf = useRef();
    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (sweep.current) sweep.current.position.y = Math.sin(t * 0.8) * 0.55;
        if (conf.current) {
            const k = 0.86 + Math.sin(t * 1.2) * 0.045; // hovering ~92%
            conf.current.scale.y = k;
        }
    });
    return (
        <group position={position}>
            <Screen w={1.7} h={1.5} color="#5fd0e0">
                {/* Lung field: two lobes on the viewer */}
                <mesh position={[-0.38, -0.05, 0.02]} scale={[0.55, 0.85, 0.3]}>
                    <sphereGeometry args={[0.5, 12, 12]} />
                    <meshBasicMaterial color="#1d4e5c" wireframe />
                </mesh>
                <mesh position={[0.38, -0.05, 0.02]} scale={[0.55, 0.85, 0.3]}>
                    <sphereGeometry args={[0.5, 12, 12]} />
                    <meshBasicMaterial color="#1d4e5c" wireframe />
                </mesh>
                {/* Scan line */}
                <mesh ref={sweep} position={[0, 0, 0.04]}>
                    <boxGeometry args={[1.6, 0.02, 0.01]} />
                    <meshBasicMaterial color="#9ff2ff" />
                </mesh>
            </Screen>
            {/* Confidence bar */}
            <group position={[1.15, 0, 0]}>
                <mesh>
                    <boxGeometry args={[0.12, 1.3, 0.05]} />
                    <meshBasicMaterial color="#0d2229" />
                </mesh>
                <mesh ref={conf} position={[0, -0.65, 0.01]} scale={[1, 0.9, 1]}>
                    <boxGeometry args={[0.1, 1.3, 0.05]} />
                    <meshBasicMaterial color="#5fd0e0" />
                </mesh>
                <Text position={[0, 0.85, 0]} fontSize={0.14} color="#9ff2ff" anchorX="center" outlineWidth={0.006} outlineColor="#05060a">
                    92.4%
                </Text>
            </group>
            <ProductLabel name="PneumoAI" tagline="X-ray triage · CNN reads the scan" color="#5fd0e0" y={-1.35} />
        </group>
    );
}

/* CoinPush — a live trading terminal: candles repaint, the price line rides
   the top, the feed never stops. */
function CoinPushTerminal({ position }) {
    const candles = useRef([]);
    const N = 12;
    useFrame((state) => {
        const t = state.clock.elapsedTime;
        candles.current.forEach((m, i) => {
            if (!m) return;
            const v = Math.sin(t * 1.1 + i * 1.9) * Math.cos(t * 0.5 + i * 0.7);
            m.scale.y = 0.3 + Math.abs(v) * 1.1;
            m.material.color.set(v >= 0 ? "#2ec27e" : "#e2554f");
            m.position.y = -0.35 + (m.scale.y * 0.3) / 2;
        });
    });
    return (
        <group position={position}>
            <Screen w={2.1} h={1.4} color="#2ec27e">
                {Array.from({ length: N }, (_, i) => (
                    <mesh
                        key={i}
                        ref={(el) => (candles.current[i] = el)}
                        position={[-0.88 + (i * 1.76) / (N - 1), -0.2, 0.02]}
                    >
                        <boxGeometry args={[0.08, 0.3, 0.02]} />
                        <meshBasicMaterial color="#2ec27e" />
                    </mesh>
                ))}
                {/* Live feed indicator */}
                <mesh position={[0.85, 0.55, 0.02]}>
                    <circleGeometry args={[0.04, 12]} />
                    <meshBasicMaterial color="#2eea8d" />
                </mesh>
                <Text position={[0.62, 0.55, 0.02]} fontSize={0.1} color="#7fe9b5" anchorX="center" outlineWidth={0.004} outlineColor="#05060a">
                    LIVE
                </Text>
            </Screen>
            <ProductLabel name="CoinPush" tagline="Live WebSocket market terminal · 90% less latency" color="#2ec27e" y={-1.3} />
        </group>
    );
}

/* Exyst — academic intelligence: papers feed a knowledge graph; the graph
   predicts what the next exam asks. */
function ExystStation({ position }) {
    const papers = useRef([]);
    const graphNodes = useMemo(
        () => [
            [0, 1.3, 0],
            [-0.7, 1.7, 0],
            [0.7, 1.75, 0],
            [-0.35, 2.15, 0],
            [0.4, 2.25, 0],
        ],
        [],
    );
    const graphEdges = useMemo(
        () => [
            [0, 1],
            [0, 2],
            [1, 3],
            [2, 4],
            [1, 2],
        ],
        [],
    );
    useFrame((state) => {
        const t = state.clock.elapsedTime;
        papers.current.forEach((m, i) => {
            if (!m) return;
            const c = (t * 0.25 + i / 3) % 1;
            m.position.set(-0.9 + c * 0.9, -0.3 + c * 1.5, 0.05);
            m.material.userData._stagedExempt = true;
            m.material.opacity = 0.8 * Math.sin(c * Math.PI);
        });
    });
    return (
        <group position={position}>
            {/* The paper stack being ingested */}
            {[0, 1, 2].map((i) => (
                <mesh key={i} position={[-0.9, -0.45 - i * 0.05, -i * 0.02]} rotation={[0, 0, (i - 1) * 0.06]}>
                    <planeGeometry args={[0.6, 0.8]} />
                    <meshBasicMaterial color="#efe6cf" transparent opacity={0.85 - i * 0.2} side={THREE.DoubleSide} />
                </mesh>
            ))}
            {/* Pages streaming up into the knowledge graph */}
            {[0, 1, 2].map((i) => (
                <mesh key={i} ref={(el) => (papers.current[i] = el)}>
                    <planeGeometry args={[0.3, 0.4]} />
                    <meshBasicMaterial color="#efe6cf" transparent side={THREE.DoubleSide} />
                </mesh>
            ))}
            {/* The knowledge graph */}
            {graphNodes.map((p, i) => (
                <mesh key={i} position={p}>
                    <sphereGeometry args={[0.08, 10, 10]} />
                    <meshBasicMaterial color="#c9b48a" />
                </mesh>
            ))}
            {graphEdges.map(([a, b], i) => (
                <line key={i} geometry={lineGeom([graphNodes[a], graphNodes[b]])}>
                    <lineBasicMaterial color="#c9b48a" transparent opacity={0.45} />
                </line>
            ))}
            <Text position={[1.0, 0.2, 0]} fontSize={0.13} color="#e3d4ac" anchorX="left" outlineWidth={0.006} outlineColor="#05060a">
                91.4% confidence
            </Text>
            <ProductLabel name="Exyst" tagline="Papers → knowledge graph → prediction" color="#c9b48a" y={-1.4} />
        </group>
    );
}

/* ArchLens — layered architecture done right: UI → services → data, every
   dependency pointing down. The product's whole point: zero cycles. */
function ArchLensObservatory({ position }) {
    const tiers = useMemo(
        () => [
            { y: 0.9, xs: [-0.5, 0.5], color: "#7fd2c8" },
            { y: 0, xs: [-0.8, 0, 0.8], color: "#56b3a0" },
            { y: -0.9, xs: [-0.45, 0.45], color: "#3a8a7a" },
        ],
        [],
    );
    const deps = useMemo(
        () => [
            [[-0.5, 0.9], [-0.8, 0]],
            [[-0.5, 0.9], [0, 0]],
            [[0.5, 0.9], [0, 0]],
            [[0.5, 0.9], [0.8, 0]],
            [[-0.8, 0], [-0.45, -0.9]],
            [[0, 0], [-0.45, -0.9]],
            [[0, 0], [0.45, -0.9]],
            [[0.8, 0], [0.45, -0.9]],
        ],
        [],
    );
    const pulse = useRef();
    useFrame((state) => {
        const t = (state.clock.elapsedTime * 0.4) % 1;
        if (pulse.current) {
            // One dependency traced top → bottom, always downward.
            pulse.current.position.set(
                THREE.MathUtils.lerp(-0.5, -0.45, t),
                THREE.MathUtils.lerp(0.9, -0.9, t),
                0.05,
            );
        }
    });
    return (
        <group position={position}>
            {tiers.map((tier, ti) =>
                tier.xs.map((x, xi) => (
                    <mesh key={`${ti}-${xi}`} position={[x, tier.y, 0]}>
                        <boxGeometry args={[0.5, 0.32, 0.3]} />
                        <meshStandardMaterial color="#0f2c27" emissive={tier.color} emissiveIntensity={0.5} />
                    </mesh>
                )),
            )}
            {deps.map(([[x1, y1], [x2, y2]], i) => (
                <line key={i} geometry={lineGeom([[x1, y1 - 0.16, 0], [x2, y2 + 0.16, 0]])}>
                    <lineBasicMaterial color="#56b3a0" transparent opacity={0.4} />
                </line>
            ))}
            <mesh ref={pulse}>
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshBasicMaterial color="#b8f5e9" />
            </mesh>
            <Text position={[1.15, 0.9, 0]} fontSize={0.13} color="#7fd2c8" anchorX="left" outlineWidth={0.006} outlineColor="#05060a">
                0 cycles
            </Text>
            <ProductLabel name="ArchLens" tagline="Layers enforced · dependencies only flow down" color="#56b3a0" y={-1.6} />
        </group>
    );
}

/* WealthyMinds — a real chart: axes, ten thousand futures fanning out from
   one decision, the median path bright. */
function WealthyMindsChart({ position }) {
    const curves = useMemo(() => {
        const out = [];
        for (let i = 0; i < 9; i++) {
            const spread = (i - 4) / 4;
            const c = new THREE.QuadraticBezierCurve3(
                new THREE.Vector3(-1.1, -0.55, 0),
                new THREE.Vector3(0.2, spread * 0.8, 0),
                new THREE.Vector3(1.3, spread * 1.15 + 0.2, 0),
            );
            out.push(c.getPoints(20).map((v) => [v.x, v.y, v.z]));
        }
        return out;
    }, []);
    const pulse = useRef();
    const median = useMemo(
        () =>
            new THREE.QuadraticBezierCurve3(
                new THREE.Vector3(-1.1, -0.55, 0),
                new THREE.Vector3(0.2, 0.4, 0),
                new THREE.Vector3(1.3, 0.78, 0),
            ),
        [],
    );
    useFrame((state) => {
        const t = (state.clock.elapsedTime * 0.4) % 1;
        if (pulse.current) pulse.current.position.copy(median.getPoint(t));
    });
    return (
        <group position={position}>
            {/* Axes — it reads as a chart, not an ornament */}
            <line geometry={lineGeom([[-1.2, -0.65, 0], [1.45, -0.65, 0]])}>
                <lineBasicMaterial color="#ffffff" transparent opacity={0.25} />
            </line>
            <line geometry={lineGeom([[-1.2, -0.65, 0], [-1.2, 1.3, 0]])}>
                <lineBasicMaterial color="#ffffff" transparent opacity={0.25} />
            </line>
            {curves.map((pts, i) => (
                <line key={i} geometry={lineGeom(pts)}>
                    <lineBasicMaterial color="#9d8ff5" transparent opacity={i === 4 ? 0.9 : 0.22} />
                </line>
            ))}
            <mesh position={[-1.1, -0.55, 0]}>
                <sphereGeometry args={[0.1, 12, 12]} />
                <meshStandardMaterial color="#7c6cf0" emissive="#7c6cf0" emissiveIntensity={1.2} />
            </mesh>
            <mesh ref={pulse}>
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshBasicMaterial color="#d9d2ff" />
            </mesh>
            <ProductLabel name="WealthyMinds" tagline="10k Monte Carlo futures, one decision" color="#7c6cf0" y={-1.35} />
        </group>
    );
}

/* Vectrion — the SDK hub routing to its real adapters. */
function VectrionHub({ position }) {
    const adapters = useMemo(
        () => [
            { name: "Google AI", p: [1.2, 0.55, 0] },
            { name: "Groq", p: [1.35, -0.15, 0] },
            { name: "Ollama (local)", p: [1.1, -0.85, 0] },
        ],
        [],
    );
    const pulses = useRef([]);
    useFrame((state) => {
        const t = state.clock.elapsedTime;
        pulses.current.forEach((m, i) => {
            if (!m) return;
            const c = (t * 0.5 + i / 3) % 1;
            const a = adapters[i].p;
            m.position.set(a[0] * c, a[1] * c, 0);
            m.material.userData._stagedExempt = true;
            m.material.opacity = Math.sin(c * Math.PI);
        });
    });
    return (
        <group position={position}>
            <mesh>
                <octahedronGeometry args={[0.45, 0]} />
                <meshStandardMaterial color="#2a2f55" emissive="#9aa7ff" emissiveIntensity={1.0} />
            </mesh>
            {adapters.map((a, i) => (
                <group key={a.name}>
                    <mesh position={a.p}>
                        <boxGeometry args={[0.24, 0.24, 0.24]} />
                        <meshStandardMaterial color="#9aa7ff" emissive="#9aa7ff" emissiveIntensity={0.6} />
                    </mesh>
                    <line geometry={lineGeom([[0, 0, 0], a.p])}>
                        <lineBasicMaterial color="#9aa7ff" transparent opacity={0.35} />
                    </line>
                    <Text
                        position={[a.p[0] + 0.25, a.p[1], 0]}
                        fontSize={0.13}
                        color="#c3cbff"
                        anchorX="left"
                        outlineWidth={0.006}
                        outlineColor="#05060a"
                    >
                        {a.name}
                    </Text>
                    <mesh ref={(el) => (pulses.current[i] = el)}>
                        <sphereGeometry args={[0.045, 8, 8]} />
                        <meshBasicMaterial color="#dfe4ff" transparent />
                    </mesh>
                </group>
            ))}
            <ProductLabel name="Vectrion" tagline="One SDK · routed to real adapters" color="#9aa7ff" y={-1.45} />
        </group>
    );
}

/* TeleChurn — the retention dashboard: regional bars against a churn
   threshold; the breach pulses until addressed. */
function TeleChurnDashboard({ position }) {
    const risk = useRef();
    const heights = useMemo(() => [0.35, 0.5, 0.95, 0.42, 0.6, 0.3, 0.52], []);
    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (risk.current) {
            const k = 0.5 + 0.5 * Math.sin(t * 2.2);
            risk.current.material.emissiveIntensity = 0.4 + k * 1.5;
        }
    });
    return (
        <group position={position}>
            <Screen w={1.9} h={1.3} color="#e08a5f">
                {heights.map((h, i) => {
                    const isRisk = i === 2;
                    return (
                        <mesh
                            key={i}
                            ref={isRisk ? risk : undefined}
                            position={[-0.75 + i * 0.25, -0.55 + h / 2, 0.02]}
                        >
                            <boxGeometry args={[0.14, h, 0.02]} />
                            <meshStandardMaterial
                                color={isRisk ? "#e2554f" : "#e08a5f"}
                                emissive={isRisk ? "#e2554f" : "#e08a5f"}
                                emissiveIntensity={0.5}
                            />
                        </mesh>
                    );
                })}
                {/* The churn threshold line */}
                <mesh position={[0, 0.12, 0.03]}>
                    <boxGeometry args={[1.8, 0.012, 0.01]} />
                    <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
                </mesh>
            </Screen>
            <ProductLabel name="TeleChurn" tagline="Churn flagged before it costs · ₹7.7M saved" color="#e08a5f" y={-1.25} />
        </group>
    );
}

/* Products take the stage one at a time along the flight: each emerges as
   the camera reaches it, holds its moment, then clears the frame. The
   flagship (InterviewPilot) sits dead-center of the dwell with the longest
   window. */
const STAGE = [
    { key: "pneumoai", el: PneumoStation, pos: [1.7, 2.3, -49] },
    { key: "coinpush", el: CoinPushTerminal, pos: [6.3, 1.4, -51.5] },
    { key: "interviewpilot", el: InterviewPilotStation, pos: [3.3, 0.4, -55] },
    { key: "exyst", el: ExystStation, pos: [1.6, -2.0, -58.5] },
    { key: "wealthyminds", el: WealthyMindsChart, pos: [6.2, -1.7, -61] },
    { key: "vectrion", el: VectrionHub, pos: [2.3, 2.2, -64] },
    { key: "archlens", el: ArchLensObservatory, pos: [5.8, 0.6, -67] },
    { key: "telechurn", el: TeleChurnDashboard, pos: [3.3, -2.6, -69] },
];

const FIRST = 0.452;
const STEP = 0.022;
const WIDTH = 0.058;

export default function GalaxyScene() {
    return (
        <group>
            <pointLight position={[3, 0, -57]} intensity={46} distance={48} color="#cfe0ff" />
            {STAGE.map(({ key, el: Product, pos }, i) => (
                <Staged
                    key={key}
                    start={FIRST + i * STEP}
                    end={
                        FIRST +
                        i * STEP +
                        (key === "interviewpilot" ? WIDTH + 0.02 : WIDTH)
                    }
                    pre={0.02}
                    post={0.026}
                    preview={0.1}
                >
                    <Product position={pos} />
                </Staged>
            ))}
        </group>
    );
}
