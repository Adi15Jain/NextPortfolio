"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { journey } from "./journeyStore";

const createRandom = (seed = 7) => {
    let s = seed >>> 0;
    return () => {
        s = (s * 1664525 + 1013904223) >>> 0;
        return s / 4294967296;
    };
};

const vertexShader = /* glsl */ `
  attribute float aScale;
  attribute float aSeed;
  attribute vec3 aColor;
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uStreak;
  varying vec3 vColor;
  varying float vTwinkle;
  void main() {
    vColor = aColor;
    vec3 p = position;
    p.x += sin(uTime * 0.04 + aSeed * 6.2831) * 0.6;
    p.y += cos(uTime * 0.03 + aSeed * 5.17) * 0.5;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    float inFront = step(0.5, -mv.z);
    float dist = max(-mv.z, 1.0);
    gl_PointSize = inFront * min(uSize * aScale * uPixelRatio * (70.0 / dist) * (1.0 + uStreak * 2.0), 14.0);
    vTwinkle = 0.4 + 0.35 * sin(uTime * 0.9 + aSeed * 22.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision mediump float;
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vTwinkle;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float core = pow(smoothstep(0.5, 0.0, d), 2.4);
    gl_FragColor = vec4(vColor, core * vTwinkle * uOpacity);
  }
`;

const PALETTE = [
    [0.85, 0.92, 1.0],
    [0.7, 0.82, 1.0],
    [0.6, 0.7, 1.0],
    [0.78, 0.7, 1.0],
];

/**
 * One dust field spanning the entire flight corridor — present in every scene,
 * so the room and the cosmos read as the *same* continuous space. It streaks
 * with flight velocity (speed) and calms at rest (arrival).
 */
export default function WorldDust({ count = 1100 }) {
    const matRef = useRef();
    const streak = useRef(0);

    const { positions, scales, seeds, colors } = useMemo(() => {
        const rand = createRandom(424242);
        const positions = new Float32Array(count * 3);
        const scales = new Float32Array(count);
        const seeds = new Float32Array(count);
        const colors = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (rand() - 0.5) * 70;
            positions[i * 3 + 1] = (rand() - 0.5) * 44;
            positions[i * 3 + 2] = 12 - rand() * 150; // +12 (room) .. -138 (corridor end)
            scales[i] = 0.4 + rand() * 0.8;
            seeds[i] = rand();
            const c = PALETTE[Math.floor(rand() * PALETTE.length)];
            colors[i * 3] = c[0];
            colors[i * 3 + 1] = c[1];
            colors[i * 3 + 2] = c[2];
        }
        return { positions, scales, seeds, colors };
    }, [count]);

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uSize: { value: 8 },
            uOpacity: { value: 0.45 },
            uStreak: { value: 0 },
            uPixelRatio: {
                value:
                    typeof window !== "undefined"
                        ? Math.min(window.devicePixelRatio, 1.5)
                        : 1,
            },
        }),
        [],
    );

    useFrame((_, delta) => {
        const dt = Math.min(delta, 0.05);
        if (!matRef.current) return;
        matRef.current.uniforms.uTime.value += dt;
        const target = Math.min(1, Math.abs(journey.velocity) * 140);
        streak.current += (target - streak.current) * Math.min(1, dt * 4);
        matRef.current.uniforms.uStreak.value = streak.current;
    });

    return (
        <points frustumCulled={false}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
                <bufferAttribute attach="attributes-aScale" count={count} array={scales} itemSize={1} />
                <bufferAttribute attach="attributes-aSeed" count={count} array={seeds} itemSize={1} />
                <bufferAttribute attach="attributes-aColor" count={count} array={colors} itemSize={3} />
            </bufferGeometry>
            <shaderMaterial
                ref={matRef}
                uniforms={uniforms}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}
