"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { journey } from "../journeyStore";
import { buildShapes } from "./shapeTargets";

/**
 * "Made of Light" — one persistent particle organism that travels with the
 * camera and MORPHS into the hero shape of each scene as you scroll
 * (dust → vortex → world → galaxy → mind → time-stream → dust). The same
 * substance reshaping itself through the journey: the portfolio's soul.
 *
 * Pure GPU morph: two position attributes (from/to) lerped in the vertex
 * shader by a uMix uniform. The from/to buffers are swapped on the CPU only
 * when a scene boundary is crossed (rare), so it stays one cheap draw call.
 */

const smooth = (t) => t * t * (3 - 2 * t);

const vertexShader = /* glsl */ `
  attribute vec3 aFrom;
  attribute vec3 aTo;
  attribute float aSeed;
  attribute float aSize;
  uniform float uMix;
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uStreak;
  uniform vec2 uPointer;
  varying float vTwinkle;
  varying float vDepth;
  varying vec3 vColor;

  void main() {
    vec3 p = mix(aFrom, aTo, uMix);
    // slow per-particle drift so it breathes even at rest
    p.x += sin(uTime * 0.18 + aSeed * 6.2831) * 0.35;
    p.y += cos(uTime * 0.15 + aSeed * 5.17) * 0.35;
    p.z += sin(uTime * 0.12 + aSeed * 4.3) * 0.35;
    // gentle cursor pull (parallax)
    p.xy += uPointer * (0.5 + aSeed * 0.8);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    float dist = max(-mv.z, 0.2);
    vDepth = -mv.z;
    // finer points that fade with distance for an airy, deep field
    gl_PointSize = min(
      uSize * aSize * uPixelRatio * (1.0 + uStreak * 1.6) * (40.0 / dist),
      9.0
    );
    vTwinkle = 0.5 + 0.45 * sin(uTime * 0.7 + aSeed * 22.0);

    // a cool, layered palette: icy blue → cyan → soft violet
    vec3 cA = vec3(0.42, 0.62, 1.00);
    vec3 cB = vec3(0.60, 0.86, 1.00);
    vec3 cC = vec3(0.78, 0.70, 1.00);
    float h = aSeed;
    vColor = h < 0.5 ? mix(cA, cB, h * 2.0) : mix(cB, cC, (h - 0.5) * 2.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision mediump float;
  uniform float uOpacity;
  varying float vTwinkle;
  varying float vDepth;
  varying vec3 vColor;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    // soft glowing sprite: a bright core with a feathered halo
    float core = smoothstep(0.5, 0.0, d);
    float glow = pow(core, 1.6);
    // BACKDROP RULE: fade out any particle inside the content zone so the
    // field can never render in front of the room / panels / logos / form.
    // Only particles beyond the content (deep background) stay visible.
    float behind = smoothstep(13.0, 19.0, vDepth);
    // and let the far edge dissolve into the fog instead of a hard rim
    float farFade = 1.0 - smoothstep(52.0, 82.0, vDepth);
    float a = glow * vTwinkle * uOpacity * behind * farFade;
    if (a < 0.003) discard;
    // lift the very centre toward white for a jewel-like highlight
    vec3 col = mix(vColor, vec3(1.0), pow(core, 4.0) * 0.6);
    gl_FragColor = vec4(col, a);
  }
`;

export default function MorphField({ count = 22000 }) {
    const ref = useRef();
    const matRef = useRef();
    const lastFrom = useRef(-1);
    const streak = useRef(0);
    const pointer = useRef(new THREE.Vector2());
    const { camera } = useThree();

    const SHAPES = useMemo(() => buildShapes(count), [count]);

    const { aFrom, aTo, aSeed, aSize } = useMemo(() => {
        const rand = (() => {
            let s = 909;
            return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
        })();
        const aFrom = SHAPES[0].buf.slice();
        const aTo = SHAPES[1].buf.slice();
        const aSeed = new Float32Array(count);
        const aSize = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            aSeed[i] = rand();
            aSize[i] = 0.4 + rand() * 0.9;
        }
        return { aFrom, aTo, aSeed, aSize };
    }, [SHAPES, count]);

    const uniforms = useMemo(
        () => ({
            uMix: { value: 0 },
            uTime: { value: 0 },
            uSize: { value: 5.5 },
            uOpacity: { value: 0.55 },
            uStreak: { value: 0 },
            uPointer: { value: new THREE.Vector2() },
            uPixelRatio: {
                value:
                    typeof window !== "undefined"
                        ? Math.min(window.devicePixelRatio, 1.5)
                        : 1,
            },
        }),
        [],
    );

    useFrame((state, delta) => {
        const dt = Math.min(delta, 0.05);
        const g = ref.current;
        if (!g) return;

        // the organism is camera-centred (slight lag) so the large, dispersed
        // shapes fill the whole viewport as an atmosphere. The depth fade in
        // the shader hollows out the near content zone, so the field still
        // reads behind the room / panels / logos without clumping in front.
        g.position.lerp(camera.position, 0.06);

        const p = journey.progress;
        // find the [from, to] shapes surrounding progress
        let i = 0;
        while (i < SHAPES.length - 1 && p > SHAPES[i + 1].at) i++;
        const from = i;
        const to = Math.min(i + 1, SHAPES.length - 1);
        const span = SHAPES[to].at - SHAPES[from].at || 1;
        const localMix = Math.min(1, Math.max(0, (p - SHAPES[from].at) / span));

        if (from !== lastFrom.current) {
            const geo = g.geometry;
            geo.attributes.aFrom.array.set(SHAPES[from].buf);
            geo.attributes.aTo.array.set(SHAPES[to].buf);
            geo.attributes.aFrom.needsUpdate = true;
            geo.attributes.aTo.needsUpdate = true;
            lastFrom.current = from;
        }

        const m = matRef.current;
        if (m) {
            m.uniforms.uMix.value = smooth(localMix);
            m.uniforms.uTime.value += dt;
            // scroll-velocity streak (warp)
            const target = Math.min(1, Math.abs(journey.velocity) * 120);
            streak.current += (target - streak.current) * Math.min(1, dt * 4);
            m.uniforms.uStreak.value = streak.current;
            // damped cursor
            pointer.current.lerp(state.pointer, Math.min(1, dt * 3));
            m.uniforms.uPointer.value.copy(pointer.current);
        }
    });

    return (
        <points ref={ref} frustumCulled={false}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} array={aFrom} itemSize={3} />
                <bufferAttribute attach="attributes-aFrom" count={count} array={aFrom} itemSize={3} />
                <bufferAttribute attach="attributes-aTo" count={count} array={aTo} itemSize={3} />
                <bufferAttribute attach="attributes-aSeed" count={count} array={aSeed} itemSize={1} />
                <bufferAttribute attach="attributes-aSize" count={count} array={aSize} itemSize={1} />
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
