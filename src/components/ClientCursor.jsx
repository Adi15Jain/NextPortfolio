"use client";

import dynamic from "next/dynamic";
import { useCoarsePointer, useReducedMotion } from "../hooks/useDeviceCapabilities";

const CustomCursor = dynamic(() => import("./CustomCursor"), { ssr: false });

export default function ClientCursor() {
    const coarse = useCoarsePointer();
    const reduced = useReducedMotion();

    // No bespoke cursor on touch devices or for reduced-motion users.
    if (coarse || reduced) return null;

    return <CustomCursor />;
}
