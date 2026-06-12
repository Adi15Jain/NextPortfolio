"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { journey } from "./journeyStore";

const smooth = (t) => {
    const c = Math.min(1, Math.max(0, t));
    return c * c * (3 - 2 * c);
};

/**
 * Progressive staging for world objects, driven by journey progress.
 *
 *   · before its window  → `preview` opacity (a dim, out-of-focus hint)
 *   · entering           → soft ramp to full presence
 *   · inside [start,end] → fully visible
 *   · after              → fades out and is REMOVED (frees the stage)
 *
 * This is what turns "everything rendered at once" into "one thing presented
 * at a time": items emerge as the camera reaches them and clear the viewport
 * once they've been seen.
 */
export default function Staged({
    start,
    end,
    pre = 0.03,
    post = 0.035,
    preview = 0,
    children,
    ...props
}) {
    const ref = useRef();

    useFrame(() => {
        const g = ref.current;
        if (!g) return;
        const p = journey.progress;

        let k;
        if (p < start - pre) k = preview;
        else if (p < start)
            k = preview + (1 - preview) * smooth((p - (start - pre)) / pre);
        else if (p <= end) k = 1;
        else k = 1 - smooth((p - end) / post);
        k = Math.max(0, Math.min(1, k));

        g.visible = k > 0.01;
        if (!g.visible) return;

        // Scale every material's opacity against its authored base value.
        // Materials flagged _stagedExempt run their own opacity choreography
        // (e.g. per-gate timeline text) and are left alone. Handles material
        // arrays and materials (like troika Text's) that lack a userData object.
        g.traverse((o) => {
            if (!o.material) return;
            const mats = Array.isArray(o.material) ? o.material : [o.material];
            for (const m of mats) {
                if (!m) continue;
                if (!m.userData) m.userData = {};
                if (m.userData._stagedExempt) continue;
                if (m.userData._base === undefined) {
                    m.userData._base = m.opacity ?? 1;
                    m.transparent = true;
                }
                m.opacity = m.userData._base * k;
            }
        });
    });

    return (
        <group ref={ref} {...props}>
            {children}
        </group>
    );
}
