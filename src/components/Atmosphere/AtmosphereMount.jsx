"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useDeviceTier } from "../../hooks/useDeviceCapabilities";
import { useWorldActive } from "../../world/journeyStore";

const AtmosphereCanvas = dynamic(() => import("./AtmosphereCanvas"), {
    ssr: false,
});

/**
 * Decides *what* atmosphere to render based on the device tier and mounts the
 * heavy WebGL field only after the browser is idle, so the hero paints first.
 *
 *  high → full shader particle field (idle-mounted)
 *  low  → lightweight animated CSS aurora (touch / small / low-core)
 *  off  → static gradient (reduced motion)
 */
export default function AtmosphereMount() {
    const tier = useDeviceTier();
    const worldActive = useWorldActive();
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (tier !== "high") return;
        let id;
        const mount = () => setReady(true);
        if ("requestIdleCallback" in window) {
            id = window.requestIdleCallback(mount, { timeout: 1800 });
            return () => window.cancelIdleCallback?.(id);
        }
        id = window.setTimeout(mount, 900);
        return () => window.clearTimeout(id);
    }, [tier]);

    // When the immersive world owns the screen, the ambient canvas stands down
    // entirely (no double WebGL).
    if (worldActive) return null;

    // The CSS layer is always present: it's the instant paint, the WebGL
    // fallback, and the soft colour wash that sits under the canvas.
    return (
        <div className="atmosphere-root" aria-hidden="true">
            <div className={`atmosphere-css tier-${tier}`} />
            {tier === "high" && ready && (
                <AtmosphereCanvas count={850} intensity={1} />
            )}
        </div>
    );
}
