"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import Staged from "../Staged";
import LogoIcon3D from "../assets/LogoIcon3D";
import IconCluster from "../assets/IconCluster";
import { nearRange } from "../journeyStore";

const ECO_RANGE = [0.22, 0.44];

/**
 * SCENE 03 — THE BUILDER'S ECOSYSTEM
 * Real systems doing their real jobs. Composition rule: every system lives in
 * the CENTER-RIGHT story zone (+X of the camera's look line); the left third
 * of the frame belongs to the DOM content panel. Nothing here is symbolic —
 * a component tree renders, routes stream pages, containers deploy, data
 * blocks read/write, commits merge, a network trains with a falling loss.
 */

const lineGeom = (pts) => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pts.flat(), 3));
    return g;
};

function SystemLabel({ name, caption, color, y = -1.9 }) {
    return (
        <group position={[0, y, 0]}>
            <Text
                fontSize={0.3}
                color="#ffffff"
                anchorX="center"
                anchorY="top"
                outlineWidth={0.012}
                outlineColor="#05060a"
            >
                {name}
            </Text>
            <Text
                position={[0, -0.42, 0]}
                fontSize={0.16}
                color={color}
                anchorX="center"
                anchorY="top"
                outlineWidth={0.008}
                outlineColor="#05060a"
            >
                {caption}
            </Text>
        </group>
    );
}

/* React — an actual component tree: root → children → leaves, with props
   flowing down the edges as pulses. */
function ReactComponentTree({ position }) {
    const nodes = useMemo(
        () => [
            { p: [0, 1.1, 0], w: 0.9 }, // <App/>
            { p: [-0.85, 0.3, 0], w: 0.65 },
            { p: [0.85, 0.3, 0], w: 0.65 },
            { p: [-1.25, -0.5, 0], w: 0.45 },
            { p: [-0.45, -0.5, 0], w: 0.45 },
            { p: [1.05, -0.5, 0], w: 0.45 },
        ],
        [],
    );
    const edges = useMemo(
        () => [
            [0, 1],
            [0, 2],
            [1, 3],
            [1, 4],
            [2, 5],
        ],
        [],
    );
    const pulses = useRef([]);
    useFrame((state) => {
        const t = state.clock.elapsedTime;
        pulses.current.forEach((m, i) => {
            if (!m) return;
            const [a, b] = edges[i % edges.length];
            const c = (t * 0.5 + i * 0.21) % 1;
            m.position.set(
                THREE.MathUtils.lerp(nodes[a].p[0], nodes[b].p[0], c),
                THREE.MathUtils.lerp(nodes[a].p[1], nodes[b].p[1], c),
                0.05,
            );
            m.material.userData._stagedExempt = true;
            m.material.opacity = Math.sin(c * Math.PI);
        });
    });
    return (
        <group position={position}>
            {nodes.map((n, i) => (
                <group key={i} position={n.p}>
                    <mesh>
                        <boxGeometry args={[n.w, 0.34, 0.06]} />
                        <meshStandardMaterial
                            color="#0b2733"
                            emissive="#61dafb"
                            emissiveIntensity={i === 0 ? 0.7 : 0.35}
                        />
                    </mesh>
                </group>
            ))}
            {edges.map(([a, b], i) => (
                <line key={i} geometry={lineGeom([nodes[a].p, nodes[b].p])}>
                    <lineBasicMaterial
                        color="#61dafb"
                        transparent
                        opacity={0.35}
                    />
                </line>
            ))}
            {edges.map((_, i) => (
                <mesh key={i} ref={(el) => (pulses.current[i] = el)}>
                    <sphereGeometry args={[0.05, 8, 8]} />
                    <meshBasicMaterial color="#bdefff" transparent />
                </mesh>
            ))}
            <SystemLabel
                name="React"
                caption="A component tree, props flowing down"
                color="#61dafb"
                y={-1.3}
            />
        </group>
    );
}

/* Next.js — a routing network: the server node fans into routes; rendered
   pages stream along each route to the edge. */
function NextRoutingNetwork({ position }) {
    const routes = useMemo(
        () => [
            [
                [-1.2, 0, 0],
                [0.2, 0.7, 0],
                [1.4, 0.7, 0],
            ],
            [
                [-1.2, 0, 0],
                [0.3, 0, 0],
                [1.4, 0, 0],
            ],
            [
                [-1.2, 0, 0],
                [0.2, -0.7, 0],
                [1.4, -0.7, 0],
            ],
        ],
        [],
    );
    const curves = useMemo(
        () =>
            routes.map(
                (r) =>
                    new THREE.QuadraticBezierCurve3(
                        new THREE.Vector3(...r[0]),
                        new THREE.Vector3(...r[1]),
                        new THREE.Vector3(...r[2]),
                    ),
            ),
        [routes],
    );
    const pages = useRef([]);
    useFrame((state) => {
        const t = state.clock.elapsedTime;
        pages.current.forEach((m, i) => {
            if (!m) return;
            const c = (t * 0.35 + i * 0.33) % 1;
            m.position.copy(curves[i % 3].getPoint(c));
            m.material.userData._stagedExempt = true;
            m.material.opacity = 0.75 * Math.sin(c * Math.PI);
        });
    });
    return (
        <group position={position}>
            <mesh position={[-1.2, 0, 0]}>
                <boxGeometry args={[0.5, 0.5, 0.5]} />
                <meshStandardMaterial
                    color="#15151c"
                    emissive="#ffffff"
                    emissiveIntensity={0.25}
                />
            </mesh>
            {curves.map((c, i) => (
                <line
                    key={i}
                    geometry={lineGeom(
                        c.getPoints(16).map((v) => [v.x, v.y, v.z]),
                    )}
                >
                    <lineBasicMaterial
                        color="#cfd6e4"
                        transparent
                        opacity={0.3}
                    />
                </line>
            ))}
            {routes.map((r, i) => (
                <mesh key={i} position={r[2]}>
                    <planeGeometry args={[0.4, 0.28]} />
                    <meshBasicMaterial
                        color="#2a2f3c"
                        side={THREE.DoubleSide}
                    />
                </mesh>
            ))}
            {[0, 1, 2].map((i) => (
                <mesh key={i} ref={(el) => (pages.current[i] = el)}>
                    <planeGeometry args={[0.26, 0.18]} />
                    <meshBasicMaterial
                        color="#e8ecf5"
                        transparent
                        side={THREE.DoubleSide}
                    />
                </mesh>
            ))}
            <SystemLabel
                name="Next.js"
                caption="Server-rendered pages, streamed per route"
                color="#cfd6e4"
                y={-1.3}
            />
        </group>
    );
}

/* FastAPI — live traffic: requests enter the endpoint, responses exit. */
function FastApiConduit({ position }) {
    const reqs = useRef([]);
    const ress = useRef([]);
    useFrame((state) => {
        if (!nearRange(...ECO_RANGE)) return;
        const t = state.clock.elapsedTime;
        reqs.current.forEach((m, i) => {
            if (!m) return;
            const c = (t * 0.5 + i * 0.33) % 1;
            m.position.x = -1.7 + c * 1.7;
            m.material.userData._stagedExempt = true;
            m.material.opacity = 0.9 * (1 - c * 0.3);
        });
        ress.current.forEach((m, i) => {
            if (!m) return;
            const c = (t * 0.5 + i * 0.33 + 0.15) % 1;
            m.position.x = c * 1.7;
            m.material.userData._stagedExempt = true;
            m.material.opacity = 0.9 * (1 - c * 0.5);
        });
    });
    return (
        <group position={position}>
            <mesh rotation={[0, 0, Math.PI / 2]}>
                <torusGeometry args={[0.55, 0.04, 12, 48]} />
                <meshStandardMaterial
                    color="#05bfa3"
                    emissive="#05bfa3"
                    emissiveIntensity={1.2}
                />
            </mesh>
            {[0, 1, 2].map((i) => (
                <mesh key={`q${i}`} ref={(el) => (reqs.current[i] = el)}>
                    <sphereGeometry args={[0.07, 10, 10]} />
                    <meshBasicMaterial color="#3affd9" transparent />
                </mesh>
            ))}
            {[0, 1, 2].map((i) => (
                <mesh key={`s${i}`} ref={(el) => (ress.current[i] = el)}>
                    <sphereGeometry args={[0.07, 10, 10]} />
                    <meshBasicMaterial color="#b8fff1" transparent />
                </mesh>
            ))}
            <SystemLabel
                name="FastAPI"
                caption="Requests in · responses out"
                color="#05bfa3"
                y={-1.2}
            />
        </group>
    );
}

/* PyTorch — a network training in real time: forward passes sweep the
   layers while the loss curve falls epoch by epoch. */
function TorchTrainingNet({ position }) {
    const layers = useMemo(
        () => [
            [-0.9, [-0.6, 0, 0.6]],
            [0, [-0.9, -0.3, 0.3, 0.9]],
            [0.9, [-0.4, 0.4]],
        ],
        [],
    );
    const nodeRefs = useRef([]);
    const lossDot = useRef();
    let n = 0;

    const lossCurve = useMemo(() => {
        // A decaying training-loss curve, drawn to the right of the net.
        const pts = [];
        for (let i = 0; i <= 20; i++) {
            const x = 1.5 + (i / 20) * 1.2;
            const y = -0.5 + Math.exp(-i / 6) * 0.9;
            pts.push(new THREE.Vector3(x, y, 0));
        }
        return pts;
    }, []);

    useFrame((state) => {
        if (!nearRange(...ECO_RANGE)) return;
        const t = state.clock.elapsedTime;
        const phase = (t * 0.7) % 3;
        nodeRefs.current.forEach((m) => {
            if (!m) return;
            const k = Math.max(0, 1 - Math.abs(m.userData.layer - phase) * 1.4);
            m.material.emissiveIntensity = 0.3 + k * 2.2;
        });
        if (lossDot.current) {
            const c = (t * 0.18) % 1;
            const idx = Math.min(19, Math.floor(c * 20));
            lossDot.current.position.copy(lossCurve[idx]);
        }
    });

    return (
        <group position={position}>
            {layers.map(([x, ys], li) =>
                ys.map((y, yi) => (
                    <mesh
                        key={`${li}-${yi}`}
                        position={[x, y, 0]}
                        ref={(el) => {
                            if (el) {
                                el.userData.layer = li;
                                nodeRefs.current[n++] = el;
                            }
                        }}
                    >
                        <sphereGeometry args={[0.11, 12, 12]} />
                        <meshStandardMaterial
                            color="#ee4c2c"
                            emissive="#ee4c2c"
                            emissiveIntensity={0.3}
                        />
                    </mesh>
                )),
            )}
            {layers.slice(0, -1).map(([x, ys], li) =>
                ys.flatMap((y, yi) =>
                    layers[li + 1][1].map((y2, y2i) => (
                        <line
                            key={`${li}-${yi}-${y2i}`}
                            geometry={lineGeom([
                                [x, y, 0],
                                [layers[li + 1][0], y2, 0],
                            ])}
                        >
                            <lineBasicMaterial
                                color="#ee4c2c"
                                transparent
                                opacity={0.18}
                            />
                        </line>
                    )),
                ),
            )}
            {/* Training loss falling */}
            <line geometry={lineGeom(lossCurve.map((v) => [v.x, v.y, v.z]))}>
                <lineBasicMaterial color="#ffb59f" transparent opacity={0.6} />
            </line>
            <line
                geometry={lineGeom([
                    [1.5, -0.55, 0],
                    [2.7, -0.55, 0],
                ])}
            >
                <lineBasicMaterial color="#ffffff" transparent opacity={0.2} />
            </line>
            <mesh ref={lossDot}>
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshBasicMaterial color="#ffd9cd" />
            </mesh>
            <Text
                position={[2.1, 0.6, 0]}
                fontSize={0.13}
                color="#ffb59f"
                anchorX="center"
                outlineWidth={0.006}
                outlineColor="#05060a"
            >
                loss ↓
            </Text>
            <SystemLabel
                name="PyTorch"
                caption="Forward pass · loss falling"
                color="#ee4c2c"
                y={-1.5}
            />
        </group>
    );
}

/* Docker — containers riding the pipeline onto the deployment deck, with a
   deploy light that confirms each landing. */
function DockerPipeline({ position }) {
    const boxes = useRef([]);
    const lamp = useRef();
    useFrame((state) => {
        if (!nearRange(...ECO_RANGE)) return;
        const t = state.clock.elapsedTime;
        let landed = 0;
        boxes.current.forEach((m, i) => {
            if (!m) return;
            const c = (t * 0.3 + i / 3) % 1;
            m.position.x = -1.6 + c * 3.2;
            m.position.y = c > 0.72 ? 0.22 : 0.5 + Math.sin(c * 18) * 0.03;
            m.material.userData._stagedExempt = true;
            m.material.opacity = c > 0.94 ? (1 - c) / 0.06 : 1;
            if (c > 0.72 && c < 0.94) landed = 1;
        });
        if (lamp.current)
            lamp.current.material.emissiveIntensity = 0.3 + landed * 1.8;
    });
    const colors = ["#2496ed", "#5ab2f7", "#1d7fd1"];
    return (
        <group position={position}>
            <mesh position={[0.9, 0, 0]}>
                <boxGeometry args={[1.8, 0.12, 1.0]} />
                <meshStandardMaterial
                    color="#11324d"
                    emissive="#2496ed"
                    emissiveIntensity={0.25}
                />
            </mesh>
            <mesh ref={lamp} position={[1.7, 0.16, 0.4]}>
                <sphereGeometry args={[0.06, 8, 8]} />
                <meshStandardMaterial
                    color="#2eea8d"
                    emissive="#2eea8d"
                    emissiveIntensity={0.3}
                />
            </mesh>
            <mesh position={[-1.1, 0.42, 0]}>
                <boxGeometry args={[1.4, 0.03, 0.5]} />
                <meshBasicMaterial color="#2496ed" transparent opacity={0.35} />
            </mesh>
            {[0, 1, 2].map((i) => (
                <mesh
                    key={i}
                    ref={(el) => (boxes.current[i] = el)}
                    position={[-1.6, 0.5, 0]}
                >
                    <boxGeometry args={[0.42, 0.3, 0.42]} />
                    <meshStandardMaterial
                        color={colors[i]}
                        emissive={colors[i]}
                        emissiveIntensity={0.5}
                        transparent
                    />
                </mesh>
            ))}
            <SystemLabel
                name="Docker"
                caption="Build → ship → deployed ●"
                color="#2496ed"
                y={-1.1}
            />
        </group>
    );
}

/* PostgreSQL — data blocks written into and read out of the core; relation
   lines hold satellite tables in the schema. */
function PostgresCore({ position }) {
    const writes = useRef([]);
    const reads = useRef([]);
    const sats = useMemo(
        () => [
            [1.3, 0.5, 0],
            [-1.2, 0.7, 0.2],
        ],
        [],
    );
    useFrame((state) => {
        const t = state.clock.elapsedTime;
        writes.current.forEach((m, i) => {
            if (!m) return;
            const c = (t * 0.45 + i * 0.5) % 1;
            m.position.set(-1.4 + c * 1.4, 0.9 - c * 1.0, 0);
            m.material.userData._stagedExempt = true;
            m.material.opacity = 1 - c * 0.4;
        });
        reads.current.forEach((m, i) => {
            if (!m) return;
            const c = (t * 0.45 + i * 0.5 + 0.25) % 1;
            m.position.set(c * 1.4, -0.1 + c * 1.0, 0);
            m.material.userData._stagedExempt = true;
            m.material.opacity = 1 - c * 0.4;
        });
    });
    return (
        <group position={position}>
            {[-0.3, 0, 0.3].map((y, i) => (
                <mesh key={i} position={[0, y - 0.1, 0]}>
                    <cylinderGeometry args={[0.5, 0.5, 0.22, 24]} />
                    <meshStandardMaterial
                        color="#274a78"
                        emissive="#4f7fd0"
                        emissiveIntensity={0.5}
                    />
                </mesh>
            ))}
            {sats.map((s, i) => (
                <group key={i}>
                    <mesh position={s}>
                        <boxGeometry args={[0.3, 0.2, 0.06]} />
                        <meshStandardMaterial
                            color="#4f7fd0"
                            emissive="#4f7fd0"
                            emissiveIntensity={0.7}
                        />
                    </mesh>
                    <line geometry={lineGeom([[0, -0.1, 0], s])}>
                        <lineBasicMaterial
                            color="#4f7fd0"
                            transparent
                            opacity={0.3}
                        />
                    </line>
                </group>
            ))}
            {[0, 1].map((i) => (
                <mesh key={`w${i}`} ref={(el) => (writes.current[i] = el)}>
                    <boxGeometry args={[0.1, 0.1, 0.1]} />
                    <meshBasicMaterial color="#9cc2ff" transparent />
                </mesh>
            ))}
            {[0, 1].map((i) => (
                <mesh key={`r${i}`} ref={(el) => (reads.current[i] = el)}>
                    <boxGeometry args={[0.1, 0.1, 0.1]} />
                    <meshBasicMaterial color="#d6e6ff" transparent />
                </mesh>
            ))}
            <SystemLabel
                name="PostgreSQL"
                caption="Writes in · reads out · relations held"
                color="#6f9ee8"
                y={-1.25}
            />
        </group>
    );
}

/* Git — commit history with a feature branch merging back to main. */
function GitGraph({ position }) {
    const path = useMemo(
        () => ({
            branch: new THREE.QuadraticBezierCurve3(
                new THREE.Vector3(-0.8, -0.3, 0),
                new THREE.Vector3(-0.1, 0.55, 0),
                new THREE.Vector3(0.7, -0.3, 0),
            ),
        }),
        [],
    );
    const pulse = useRef();
    useFrame((state) => {
        const t = (state.clock.elapsedTime * 0.35) % 1;
        if (pulse.current) pulse.current.position.copy(path.branch.getPoint(t));
    });
    const commits = useMemo(
        () => [
            [-1.4, -0.3],
            [-0.8, -0.3],
            [0, -0.3],
            [0.7, -0.3],
            [1.4, -0.3],
            [-0.1, 0.34],
        ],
        [],
    );
    const branchPts = useMemo(
        () => path.branch.getPoints(24).map((v) => [v.x, v.y, v.z]),
        [path],
    );
    return (
        <group position={position}>
            <line
                geometry={lineGeom([
                    [-1.4, -0.3, 0],
                    [1.4, -0.3, 0],
                ])}
            >
                <lineBasicMaterial color="#f05133" transparent opacity={0.6} />
            </line>
            <line geometry={lineGeom(branchPts)}>
                <lineBasicMaterial color="#f0a443" transparent opacity={0.55} />
            </line>
            {commits.map(([x, y], i) => (
                <mesh key={i} position={[x, y, 0]}>
                    <sphereGeometry args={[0.07, 10, 10]} />
                    <meshStandardMaterial
                        color={i === 5 ? "#f0a443" : "#f05133"}
                        emissive={i === 5 ? "#f0a443" : "#f05133"}
                        emissiveIntensity={0.9}
                    />
                </mesh>
            ))}
            <mesh ref={pulse}>
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshBasicMaterial color="#ffd9a8" />
            </mesh>
            <SystemLabel
                name="Git"
                caption="Feature branch merging to main"
                color="#f05133"
                y={-1.0}
            />
        </group>
    );
}

/* TypeScript — a type-check sweep: blocks assemble into the strict grid in
   sequence, hold, then re-check. */
function TypeAssembly({ position }) {
    const cubes = useRef([]);
    const grid = useMemo(() => {
        const out = [];
        for (let x = -1; x <= 1; x++)
            for (let y = -1; y <= 1; y++) out.push([x * 0.5, y * 0.5]);
        return out;
    }, []);
    useFrame((state) => {
        const t = state.clock.elapsedTime;
        const cycle = (t * 0.5) % (grid.length + 4); // sweep + hold
        cubes.current.forEach((m, i) => {
            if (!m) return;
            const k = THREE.MathUtils.clamp(cycle - i, 0, 1);
            m.scale.setScalar(0.2 + k * 0.8);
            m.material.emissiveIntensity = 0.2 + k * 0.6;
        });
    });
    return (
        <group position={position}>
            {grid.map(([x, y], i) => (
                <mesh
                    key={i}
                    position={[x, y, 0]}
                    ref={(el) => (cubes.current[i] = el)}
                >
                    <boxGeometry args={[0.34, 0.34, 0.34]} />
                    <meshStandardMaterial
                        color="#3178c6"
                        emissive="#3178c6"
                        emissiveIntensity={0.3}
                    />
                </mesh>
            ))}
            <SystemLabel
                name="TypeScript"
                caption="Strict mode: every block checked"
                color="#6aa9ee"
                y={-1.35}
            />
        </group>
    );
}

/* The stack leads with REAL 3D brand logos (the optimized GLBs already in
   /public/models) for the techs that have one, then a few signature "machines"
   for the rest. Each gets a staged window so 2–3 are visible at a time and
   clear as you pass. The order matches the camera's travel. */
const M = {
    react: "/models/react_logo-transformed.glb",
    python: "/models/python-transformed.glb",
    node: "/models/node-opt.glb",
    three: "/models/three.js-transformed.glb",
    git: "/models/git-svg-transformed.glb",
};

/* The 8 stack items, rendered into a tidy 2×1 VERTICAL pair per stage (top +
   bottom) so the stack occupies a narrow column instead of sprawling across
   the viewport. */
const ITEMS = [
    {
        key: "react",
        render: (p) => (
            <LogoIcon3D
                model={M.react}
                position={p}
                name="React"
                caption="Component-driven interfaces"
                captionColor="#61dafb"
            />
        ),
    },
    {
        key: "python",
        render: (p) => (
            <LogoIcon3D
                model={M.python}
                position={p}
                name="Python"
                caption="AI / ML & backend"
                captionColor="#ffd54a"
            />
        ),
    },
    {
        key: "node",
        render: (p) => (
            <LogoIcon3D
                model={M.node}
                position={p}
                name="Node.js"
                caption="Real-time backends"
                captionColor="#7cc66b"
            />
        ),
    },
    {
        key: "three",
        render: (p) => (
            <LogoIcon3D
                model={M.three}
                position={p}
                name="Three.js"
                caption="Powers this very world"
                captionColor="#ffffff"
                tint="#e6ebf5"
            />
        ),
    },
    {
        key: "git",
        render: (p) => (
            <LogoIcon3D
                model={M.git}
                position={p}
                name="Git"
                caption="Version control"
                captionColor="#f05133"
            />
        ),
    },
    { key: "fastapi", render: (p) => <FastApiConduit position={p} /> },
    { key: "pytorch", render: (p) => <TorchTrainingNet position={p} /> },
    { key: "docker", render: (p) => <DockerPipeline position={p} /> },
];

// 4 vertical pairs + a final "wider stack" icon grid, each placed where the
// camera is looking at that moment.
const PAIR_Z = [-27, -31, -36, -41];
const COL_X = 3.2;
const TOP_Y = 1.5;
const BOT_Y = -1.7;
const PFIRST = 0.235;
const PSTEP = 0.037;
const PWIDTH = 0.06;

export default function EcosystemScene() {
    const pairs = [0, 1, 2, 3];
    return (
        <group>
            <pointLight
                position={[3, 0, -34]}
                intensity={36}
                distance={48}
                color="#3ad6ff"
            />
            {pairs.map((pi) => {
                const z = PAIR_Z[pi];
                const top = ITEMS[pi * 2];
                const bottom = ITEMS[pi * 2 + 1];
                return (
                    <Staged
                        key={pi}
                        start={PFIRST + pi * PSTEP}
                        end={PFIRST + pi * PSTEP + PWIDTH}
                        pre={0.02}
                        post={0.024}
                        preview={0.1}
                    >
                        {top.render([COL_X, TOP_Y, z])}
                        {bottom.render([COL_X, BOT_Y, z])}
                    </Staged>
                );
            })}

            {/* Final beat: the wider stack as flat icon chips */}
            <Staged
                start={PFIRST + 4 * PSTEP}
                end={PFIRST + 4 * PSTEP + PWIDTH}
                pre={0.02}
                post={0.026}
                preview={0.1}
            >
                <IconCluster position={[COL_X, 0.2, -45]} />
            </Staged>
        </group>
    );
}
