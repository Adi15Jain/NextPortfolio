"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Text } from "@react-three/drei";
import * as THREE from "three";
import { nearRange } from "../journeyStore";

/**
 * A real 3D brand-logo model presented as a uniform, well-framed tech icon:
 *   · auto-normalized to one target size (via bounding box) so every logo —
 *     whatever its native scale — reads the same,
 *   · re-centered so it spins cleanly around its own middle,
 *   · seated on a glowing pedestal ring with the label safely below it.
 * Uses the optimized logo GLBs already in /public/models — real 3D icons.
 */
export default function LogoIcon3D({
    model,
    position = [0, 0, 0],
    name,
    caption,
    captionColor = "#9ec9ff",
    target = 1.25, // uniform max-dimension for every logo
    scale = 1, // optional per-logo fine-tune
    spin = 0.45,
    tint = null, // lighten/recolour a dark logo (e.g. the black Three.js mark)
}) {
    const ref = useRef();
    const { scene } = useGLTF(model);

    const { obj, factor, halfH } = useMemo(() => {
        const clone = scene.clone(true);
        if (tint) {
            const c = new THREE.Color(tint);
            clone.traverse((o) => {
                if (!o.isMesh || !o.material) return;
                const m = o.material.clone();
                m.color = c;
                m.emissive = c;
                m.emissiveIntensity = 0.35;
                m.metalness = Math.min(m.metalness ?? 0, 0.3);
                m.needsUpdate = true;
                o.material = m;
            });
        }
        const box = new THREE.Box3().setFromObject(clone);
        const size = new THREE.Vector3();
        const center = new THREE.Vector3();
        box.getSize(size);
        box.getCenter(center);
        const maxDim = Math.max(size.x, size.y, size.z) || 1;
        const factor = (target / maxDim) * scale;
        clone.position.sub(center); // center geometry at origin
        return { obj: clone, factor, halfH: (size.y * factor) / 2 };
    }, [scene, target, scale, tint]);

    useFrame((_, delta) => {
        if (!nearRange(0.22, 0.44)) return; // ecosystem only
        if (ref.current) ref.current.rotation.y += delta * spin;
    });

    const baseY = -halfH - 0.18;
    const labelY = baseY - 0.32;

    return (
        <group position={position}>
            {/* neutral key + fill */}
            <pointLight intensity={5} distance={12} position={[2.5, 2.5, 3]} />
            <pointLight intensity={2} distance={10} position={[-2, -1, 2]} />

            {/* presentation pedestal */}
            <group position={[0, baseY, 0]}>
                <mesh rotation={[-Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[0.72, 0.86, 56]} />
                    <meshBasicMaterial
                        color={captionColor}
                        transparent
                        opacity={0.55}
                        side={THREE.DoubleSide}
                    />
                </mesh>
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
                    <circleGeometry args={[0.86, 56]} />
                    <meshBasicMaterial
                        color={captionColor}
                        transparent
                        opacity={0.07}
                    />
                </mesh>
            </group>

            {/* the normalized, centered, spinning logo */}
            <group ref={ref} scale={factor}>
                <primitive object={obj} />
            </group>

            <Text
                position={[0, labelY, 0]}
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
                position={[0, labelY - 0.44, 0]}
                fontSize={0.16}
                color={captionColor}
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
