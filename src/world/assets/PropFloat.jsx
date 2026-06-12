"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { nearRange } from "../journeyStore";

/**
 * A themed prop that floats beside its project panel, gently spinning + bobbing.
 * The model keeps its OWN baked materials/textures — no tint, no emissive, no
 * "glow up". Two neutral white lights simply make it visible against the black
 * void. The lights only render while this project is the active staged one.
 */
export default function PropFloat({
    model,
    offset = [0, 0, 0],
    scale = 1,
    spin = 0.3,
}) {
    const ref = useRef();
    const { scene } = useGLTF(model);
    const obj = useMemo(() => scene.clone(true), [scene]);

    useFrame((state, delta) => {
        if (!ref.current || !nearRange(0.42, 0.63)) return; // galaxy only
        ref.current.rotation.y += delta * spin;
        ref.current.position.y =
            offset[1] + Math.sin(state.clock.elapsedTime * 0.6) * 0.12;
    });

    return (
        <group ref={ref} position={offset} scale={scale}>
            {/* neutral key + fill so the model reads — no colour added */}
            <pointLight intensity={6} distance={16} position={[2.5, 2.5, 3]} />
            <pointLight intensity={2.6} distance={14} position={[-2.5, -1, 2]} />
            <primitive object={obj} />
        </group>
    );
}
