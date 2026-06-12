"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, Text, Billboard } from "@react-three/drei";
import * as THREE from "three";
import { journey, nearRange } from "../journeyStore";
import { MILESTONES, timelineGateAt } from "../timelineData";
import Staged from "../Staged";

/**
 * SCENE 06 — THE TIMELINE, as time travel.
 * A warp tunnel: streaks of light flash past, a vortex of rings shifts colour
 * through time (blue → emerald = past → now), and each milestone is a glowing
 * portal you fly *through*. The DOM panel carries the achievements; the world
 * carries the feeling of moving through your own timeline.
 */

const TL_RANGE = [0.76, 0.93];
const Z_NEAR = -88;
const Z_FAR = -138;
const C_PAST = new THREE.Color("#3b82f6");
const C_NOW = new THREE.Color("#34d399");

const rng = (seed) => {
    let s = seed >>> 0;
    return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
};

/* The warp: short light-streaks filling a tube, so flying −Z whooshes them
   past on every side. The whole field slowly spins for a vortex. */
function WarpStreaks({ count = 150 }) {
    const ref = useRef();
    const geom = useMemo(() => {
        const rand = rng(73);
        const pos = new Float32Array(count * 2 * 3);
        const col = new Float32Array(count * 2 * 3);
        for (let i = 0; i < count; i++) {
            const ang = rand() * Math.PI * 2;
            const rad = 1.6 + rand() * 4.6;
            const z = THREE.MathUtils.lerp(Z_NEAR, Z_FAR, rand());
            const len = 1.4 + rand() * 3.2;
            const x = Math.cos(ang) * rad;
            const y = Math.sin(ang) * rad;
            pos.set([x, y, z, x, y, z - len], i * 6);
            const c = C_PAST.clone().lerp(
                C_NOW,
                (z - Z_NEAR) / (Z_FAR - Z_NEAR),
            );
            col.set([c.r, c.g, c.b, c.r, c.g, c.b], i * 6);
        }
        const g = new THREE.BufferGeometry();
        g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
        g.setAttribute("color", new THREE.BufferAttribute(col, 3));
        return g;
    }, [count]);

    useFrame((_, delta) => {
        if (!nearRange(...TL_RANGE)) return;
        if (ref.current) ref.current.rotation.z += delta * 0.07;
    });

    return (
        <lineSegments ref={ref} geometry={geom} frustumCulled={false}>
            <lineBasicMaterial
                vertexColors
                transparent
                opacity={0.8}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </lineSegments>
    );
}

/* Faint structural rings forming the tunnel wall — twist along the length so
   the spin reads as a vortex. */
function TunnelRings({ count = 26 }) {
    const ref = useRef();
    const rings = useMemo(() => {
        const arr = [];
        for (let i = 0; i < count; i++) {
            const t = i / (count - 1);
            arr.push({
                z: THREE.MathUtils.lerp(Z_NEAR, Z_FAR, t),
                color: C_PAST.clone().lerp(C_NOW, t),
                rot: t * Math.PI * 2.2,
                r: 4.4 - Math.sin(t * Math.PI) * 0.5, // gentle waist
            });
        }
        return arr;
    }, [count]);

    useFrame((_, delta) => {
        if (!nearRange(...TL_RANGE)) return;
        if (ref.current) ref.current.rotation.z -= delta * 0.05;
    });

    return (
        <group ref={ref}>
            {rings.map((r, i) => (
                <mesh key={i} position={[0, 0, r.z]} rotation={[0, 0, r.rot]}>
                    <torusGeometry args={[r.r, 0.018, 6, 5]} />
                    <meshBasicMaterial
                        color={r.color}
                        transparent
                        opacity={0.32}
                        blending={THREE.AdditiveBlending}
                        depthWrite={false}
                    />
                </mesh>
            ))}
        </group>
    );
}

/* A milestone as a portal you fly through: a bright pulsing gate ring + the
   billboarded info (logo, date, title, org), lit only while it's the active
   milestone (synced to the same gate the DOM panel reads). */
function Portal({ z, date, title, org, color, index, logoTex }) {
    const ring = useRef();
    const glow = useRef();
    const info = useRef();
    const mats = useRef([]);
    const collected = useRef(false);

    useFrame((state) => {
        if (!nearRange(...TL_RANGE)) return;
        const { idx, fade } = timelineGateAt(journey.progress);
        const k = idx === index ? fade : 0;
        const t = state.clock.elapsedTime;

        if (ring.current) {
            ring.current.rotation.z = t * 0.25;
            ring.current.material.opacity = 0.28 + k * 0.6;
            ring.current.scale.setScalar(1 + k * 0.06 + Math.sin(t * 1.5) * 0.01);
        }
        if (glow.current) glow.current.material.opacity = 0.05 + k * 0.18;

        const g = info.current;
        if (g) {
            if (!collected.current) {
                mats.current = [];
                g.traverse((o) => {
                    if (!o.material) return;
                    const list = Array.isArray(o.material)
                        ? o.material
                        : [o.material];
                    for (const m of list) {
                        if (!m) continue;
                        if (!m.userData) m.userData = {};
                        m.userData._stagedExempt = true;
                        m.transparent = true;
                        mats.current.push(m);
                    }
                });
                collected.current = mats.current.length > 0;
            }
            g.visible = k > 0.02;
            for (const m of mats.current) m.opacity = k;
        }
    });

    return (
        <group position={[0, 0, z]}>
            {/* portal gate */}
            <mesh ref={ring}>
                <torusGeometry args={[4.5, 0.07, 16, 90]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.3}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </mesh>
            {/* soft membrane glow inside the gate */}
            <mesh ref={glow}>
                <circleGeometry args={[4.4, 48]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.05}
                    side={THREE.DoubleSide}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </mesh>

            {/* billboarded info, offset up so the camera doesn't fly into it */}
            <Billboard ref={info} position={[0, 0.2, 0]}>
                {logoTex && (
                    <group position={[0, 1.95, 0]}>
                        <mesh position={[0, 0, -0.02]}>
                            <planeGeometry args={[1.1, 1.1]} />
                            <meshBasicMaterial color={color} transparent opacity={0.9} />
                        </mesh>
                        <mesh position={[0, 0, -0.01]}>
                            <planeGeometry args={[0.98, 0.98]} />
                            <meshBasicMaterial color="#ffffff" transparent />
                        </mesh>
                        <mesh>
                            <planeGeometry args={[0.82, 0.82]} />
                            <meshBasicMaterial map={logoTex} transparent />
                        </mesh>
                    </group>
                )}
                <Text position={[0, 1.05, 0]} fontSize={0.24} color={color} anchorX="center" anchorY="bottom" outlineWidth={0.009} outlineColor="#05060a">
                    {date}
                </Text>
                <Text position={[0, 0.5, 0]} fontSize={0.42} color="#ffffff" anchorX="center" anchorY="bottom" outlineWidth={0.014} outlineColor="#05060a">
                    {title}
                </Text>
                <Text position={[0, 0.05, 0]} fontSize={0.2} color="#c2c8d6" anchorX="center" anchorY="bottom" outlineWidth={0.008} outlineColor="#05060a">
                    {org}
                </Text>
            </Billboard>
        </group>
    );
}

export default function TimelineScene() {
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
                <WarpStreaks />
                <TunnelRings />
                {MILESTONES.map((m, i) => (
                    <Portal
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
