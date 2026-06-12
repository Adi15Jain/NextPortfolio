"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Staged from "./Staged";
import { nearRange } from "./journeyStore";

/**
 * The connective narrative between regions. Three luminous streams carry
 * pulses of light along the flight path:
 *   ecosystem → galaxy   ("technologies converge into products")
 *   galaxy → mind        ("products distill into ways of thinking")
 *   mind → timeline      ("thinking becomes a track record")
 * The user flies *alongside* these streams, so the story of one thing
 * becoming the next is visible the whole way.
 */

/* Each bridge only exists during ITS transition — it carries the story
   between two scenes, then leaves the stage (no stray pulses drifting
   through unrelated scenes). */
const BRIDGES = [
    {
        from: [3.5, 0, -38.5],
        mid: [4.8, 1.2, -46],
        to: [3.3, 0.4, -53],
        color: "#3ad6ff",
        window: [0.405, 0.475],
    },
    {
        from: [3.3, 0, -70.5],
        mid: [1.2, 1.5, -78],
        to: [2.6, 0, -83],
        color: "#a78bfa",
        window: [0.612, 0.675],
    },
    {
        from: [2.6, 0, -89.5],
        mid: [1.2, -0.8, -93],
        to: [0, 0.2, -97],
        color: "#34d399",
        window: [0.742, 0.79],
    },
];

const PULSES_PER_BRIDGE = 4;

function Bridge({ from, mid, to, color }) {
    const pulses = useRef([]);
    const curve = useMemo(
        () =>
            new THREE.QuadraticBezierCurve3(
                new THREE.Vector3(...from),
                new THREE.Vector3(...mid),
                new THREE.Vector3(...to),
            ),
        [from, mid, to],
    );
    const geom = useMemo(() => {
        const g = new THREE.BufferGeometry();
        g.setAttribute(
            "position",
            new THREE.Float32BufferAttribute(
                curve.getPoints(40).flatMap((v) => [v.x, v.y, v.z]),
                3,
            ),
        );
        return g;
    }, [curve]);

    useFrame((state) => {
        if (!nearRange(0.4, 0.8)) return;
        const t = state.clock.elapsedTime;
        pulses.current.forEach((m, i) => {
            if (!m) return;
            // Pulses run their own fade; exempt them from Staged's opacity
            // pass (the Staged visibility gate still hides them off-window).
            m.material.userData._stagedExempt = true;
            const c = (t * 0.22 + i / PULSES_PER_BRIDGE) % 1;
            m.position.copy(curve.getPoint(c));
            m.material.opacity = 0.85 * Math.sin(c * Math.PI);
        });
    });

    return (
        <group>
            <line geometry={geom}>
                <lineBasicMaterial color={color} transparent opacity={0.16} />
            </line>
            {Array.from({ length: PULSES_PER_BRIDGE }, (_, i) => (
                <mesh key={i} ref={(el) => (pulses.current[i] = el)}>
                    <sphereGeometry args={[0.07, 8, 8]} />
                    <meshBasicMaterial color={color} transparent />
                </mesh>
            ))}
        </group>
    );
}

export default function StreamBridges() {
    return (
        <group>
            {BRIDGES.map(({ window, ...b }, i) => (
                <Staged
                    key={i}
                    start={window[0]}
                    end={window[1]}
                    pre={0.018}
                    post={0.022}
                    preview={0}
                >
                    <Bridge {...b} />
                </Staged>
            ))}
        </group>
    );
}
