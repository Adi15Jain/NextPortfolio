"use client";

import { useMemo } from "react";
import { Billboard, useTexture, Text } from "@react-three/drei";
import * as THREE from "three";

/**
 * The wider stack as a compact 3×3 grid of flat icon chips on a single
 * camera-facing billboard (one cheap transform, local same-origin PNGs). Adds
 * breadth of tech coverage without 9 more 3D models.
 */
const ICONS = [
    { key: "ts", label: "TypeScript" },
    { key: "nextjs", label: "Next.js" },
    { key: "tailwind", label: "Tailwind" },
    { key: "docker", label: "Docker" },
    { key: "postgres", label: "PostgreSQL" },
    { key: "fastapi", label: "FastAPI" },
    { key: "prisma", label: "Prisma" },
    { key: "mongodb", label: "MongoDB" },
    { key: "vercel", label: "Vercel" },
];

function Chip({ url, position }) {
    const tex = useTexture(url);
    tex.colorSpace = THREE.SRGBColorSpace;
    return (
        <group position={position}>
            <mesh position={[0, 0, -0.02]}>
                <planeGeometry args={[0.7, 0.7]} />
                <meshBasicMaterial color="#10141e" transparent opacity={0.9} />
            </mesh>
            <mesh position={[0, 0, -0.01]}>
                <planeGeometry args={[0.72, 0.72]} />
                <meshBasicMaterial color="#2a3550" transparent opacity={0.5} />
            </mesh>
            <mesh>
                <planeGeometry args={[0.5, 0.5]} />
                <meshBasicMaterial map={tex} transparent toneMapped={false} />
            </mesh>
        </group>
    );
}

export default function IconCluster({ position = [0, 0, 0] }) {
    const cells = useMemo(
        () =>
            ICONS.map((ic, i) => {
                const c = i % 3;
                const r = Math.floor(i / 3);
                return {
                    key: ic.key,
                    url: `/images/tech/${ic.key}.svg`,
                    position: [(c - 1) * 0.82, (1 - r) * 0.82 + 0.3, 0],
                };
            }),
        [],
    );

    return (
        <Billboard position={position}>
            {cells.map((c) => (
                <Chip key={c.key} url={c.url} position={c.position} />
            ))}
            <Text
                position={[0, -1.55, 0]}
                fontSize={0.26}
                color="#ffffff"
                anchorX="center"
                anchorY="top"
                outlineWidth={0.012}
                outlineColor="#05060a"
            >
                …and the rest of the stack
            </Text>
        </Billboard>
    );
}
