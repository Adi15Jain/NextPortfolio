"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* Deterministic LCG so buffers stay pure across renders (no Math.random). */
const createRandom = (seed = 1337) => {
    let s = seed >>> 0;
    return () => {
        s = (s * 1664525 + 1013904223) >>> 0;
        return s / 4294967296;
    };
};

/* Calm, mostly-white palette with the faintest cool tint — reads as distant
   star-dust, never as coloured bokeh. */
const PALETTE = [
    [0.9, 0.94, 1.0], // soft white
    [0.9, 0.94, 1.0],
    [0.9, 0.94, 1.0],
    [0.72, 0.82, 1.0], // pale blue
    [0.78, 0.86, 1.0], // pale blue
    [0.82, 0.8, 1.0], // whisper of lavender
];

const vertexShader = /* glsl */ `
  attribute float aScale;
  attribute float aSeed;
  attribute vec3 aColor;
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  varying vec3 vColor;
  varying float vTwinkle;

  void main() {
    vColor = aColor;
    vec3 p = position;

    // Very slow, lazy drift — barely perceptible, just enough to feel alive.
    float t = uTime;
    p.x += sin(t * 0.035 + aSeed * 6.2831) * 0.5;
    p.y += cos(t * 0.028 + aSeed * 5.1731) * 0.4;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    // Crisp, small points with gentle distance attenuation. Hide anything at or
    // behind the camera so a dolly never flashes a giant blob.
    float inFront = step(0.5, -mv.z);
    float dist = max(-mv.z, 1.0);
    gl_PointSize = inFront * min(uSize * aScale * uPixelRatio * (60.0 / dist), 9.0);

    // Slow individual twinkle.
    vTwinkle = 0.35 + 0.3 * sin(t * 0.8 + aSeed * 22.0);
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
    // Tight core + faint halo: a clean star, not a soft blob.
    float core = smoothstep(0.5, 0.0, d);
    core = pow(core, 2.6);
    gl_FragColor = vec4(vColor, core * vTwinkle * uOpacity);
  }
`;

/**
 * A soothing, fine star-dust field. Slow drift, gentle parallax toward the
 * cursor, and an unobtrusive scroll dolly. Deliberately subtle — it adds depth
 * without ever competing with the content.
 */
export default function AtmosphereField({ count = 850, intensity = 1 }) {
    const pointsRef = useRef();
    const materialRef = useRef();
    const { camera } = useThree();

    const scroll = useRef(0);
    const pointer = useRef({ x: 0, y: 0 });

    const { positions, scales, seeds, colors } = useMemo(() => {
        const rand = createRandom(20260612);
        const positions = new Float32Array(count * 3);
        const scales = new Float32Array(count);
        const seeds = new Float32Array(count);
        const colors = new Float32Array(count * 3);

        const spreadX = 46;
        const spreadY = 30;

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (rand() - 0.5) * 2 * spreadX;
            positions[i * 3 + 1] = (rand() - 0.5) * 2 * spreadY;
            positions[i * 3 + 2] = -50 + rand() * 56; // -50 (far) .. 6 (near)

            // Uniformly small — no large motes, so nothing ever blooms.
            scales[i] = 0.35 + rand() * 0.7;

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
            uSize: { value: 7 * intensity },
            uOpacity: { value: 0.62 * intensity },
            uPixelRatio: {
                value:
                    typeof window !== "undefined"
                        ? Math.min(window.devicePixelRatio, 1.5)
                        : 1,
            },
        }),
        [intensity],
    );

    useFrame((state, delta) => {
        const dt = Math.min(delta, 0.05);

        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value += dt;
        }

        const max =
            (typeof document !== "undefined" &&
                document.documentElement.scrollHeight - window.innerHeight) ||
            1;
        const frac = Math.min(
            1,
            Math.max(0, (window.scrollY || 0) / Math.max(max, 1)),
        );
        scroll.current += (frac - scroll.current) * Math.min(1, dt * 4);

        // Gentle forward dolly — subtle, not a fly-through.
        const targetZ = 16 - scroll.current * 14;
        camera.position.z += (targetZ - camera.position.z) * Math.min(1, dt * 2.5);

        pointer.current.x +=
            (state.pointer.x - pointer.current.x) * Math.min(1, dt * 2);
        pointer.current.y +=
            (state.pointer.y - pointer.current.y) * Math.min(1, dt * 2);

        if (pointsRef.current) {
            pointsRef.current.rotation.y = pointer.current.x * 0.05;
            pointsRef.current.rotation.x = -pointer.current.y * 0.035;
        }
    });

    return (
        <points ref={pointsRef} frustumCulled={false}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-aScale"
                    count={count}
                    array={scales}
                    itemSize={1}
                />
                <bufferAttribute
                    attach="attributes-aSeed"
                    count={count}
                    array={seeds}
                    itemSize={1}
                />
                <bufferAttribute
                    attach="attributes-aColor"
                    count={count}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <shaderMaterial
                ref={materialRef}
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
