"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";

// Deterministic pseudo-random number generator (LCG)
// This ensures pure rendering, stable coordinates, and resolves ESLint purity errors.
const createRandom = (seed = 42) => {
    let s = seed;
    return () => {
        s = (s * 1664525 + 1013904223) % 4294967296;
        return s / 4294967296;
    };
};

const Particles = ({ count }) => {
    const mesh = useRef();

    const particles = useMemo(() => {
        const random = createRandom(12345);
        const temp = [];
        for (let i = 0; i < count; i++) {
            temp.push({
                position: [
                    (random() - 0.5) * 10,
                    random() * 10 - 2, // Y: from -2 to 8 (fills the space)
                    (random() - 0.5) * 10,
                ],
                speed: 0.005 + random() * 0.001,
            });
        }
        return temp;
    }, [count]);

    useFrame(() => {
        const positions = mesh.current.geometry.attributes.position.array;
        for (let i = 0; i < count; i++) {
            let y = positions[i * 3 + 1];
            y -= particles[i].speed;
            // Deterministically reset the height based on index to maintain purity and high performance
            if (y < -2) y = 5 + ((i * 17) % 10);
            positions[i * 3 + 1] = y;
        }
        mesh.current.geometry.attributes.position.needsUpdate = true;
    });

    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        particles.forEach((p, i) => {
            arr[i * 3] = p.position[0];
            arr[i * 3 + 1] = p.position[1];
            arr[i * 3 + 2] = p.position[2];
        });
        return arr;
    }, [particles, count]);

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                color="aliceblue"
                size={0.05}
                transparent
                opacity={0.9}
                depthWrite={false}
            />
        </points>
    );
};

export default Particles;
