"use client";

import { useSyncExternalStore } from "react";
import { timelineGateAt } from "./timelineData";

/**
 * The single source of truth for the cinematic journey.
 *
 * `progress` and `velocity` mutate every frame and are read DIRECTLY (no React)
 * inside the R3F frame loop — subscribing React to them would re-render the tree
 * 60×/second. Only `scene` (a discrete index) notifies React subscribers, so
 * the DOM overlay / HUD re-render just when the act changes.
 */

// Each scene owns a slice of the 0→1 scroll journey. Order = the flight path.
export const SCENES = [
    { id: "workspace", label: "The Workspace", start: 0.0, end: 0.14 },
    { id: "portal", label: "The Portal", start: 0.14, end: 0.24 },
    { id: "ecosystem", label: "Builder's Ecosystem", start: 0.24, end: 0.42 },
    { id: "galaxy", label: "Project Galaxy", start: 0.42, end: 0.62 },
    { id: "mind", label: "The Engineering Mind", start: 0.62, end: 0.76 },
    { id: "timeline", label: "The Timeline", start: 0.76, end: 0.9 },
    { id: "future", label: "The Future", start: 0.9, end: 1.0 },
];

export const sceneIndexFromProgress = (p) => {
    for (let i = SCENES.length - 1; i >= 0; i--) {
        if (p >= SCENES[i].start) return i;
    }
    return 0;
};

// Local 0→1 progress *within* the active scene (used for fine choreography).
export const sceneLocalProgress = (p) => {
    const i = sceneIndexFromProgress(p);
    const s = SCENES[i];
    const span = s.end - s.start || 1;
    return Math.min(1, Math.max(0, (p - s.start) / span));
};

// ── Mutable state (frame-loop reads this object reference directly) ──
export const journey = {
    progress: 0,
    velocity: 0,
    scene: 0,
    timelineGate: 0,
};

// Contact-terminal activity channel: keystrokes (and an in-flight send) bump
// it; the workspace lighting reads + decays it every frame — so typing
// visibly travels through the room as light.
export const terminal = {
    activity: 0,
};

export const bumpTerminalActivity = (amount = 0.4) => {
    terminal.activity = Math.min(1, terminal.activity + amount);
};

const listeners = new Set();
let sceneSnapshot = 0;
let gateSnapshot = 0;

const emit = () => {
    sceneSnapshot = journey.scene;
    gateSnapshot = journey.timelineGate;
    listeners.forEach((l) => l());
};

/** Write progress + velocity from the scroll driver. Notifies React only when
 *  a discrete boundary (scene OR active timeline gate) changes. */
export const setJourneyProgress = (progress, velocity = 0) => {
    journey.progress = progress;
    journey.velocity = velocity;
    let changed = false;

    const nextScene = sceneIndexFromProgress(progress);
    if (nextScene !== journey.scene) {
        journey.scene = nextScene;
        changed = true;
    }

    const nextGate = timelineGateAt(progress).idx;
    if (nextGate !== journey.timelineGate) {
        journey.timelineGate = nextGate;
        changed = true;
    }

    if (changed) emit();
};

const subscribe = (cb) => {
    listeners.add(cb);
    return () => listeners.delete(cb);
};

/** React hook: re-renders only when the active scene index changes. */
export const useActiveScene = () =>
    useSyncExternalStore(
        subscribe,
        () => sceneSnapshot,
        () => 0,
    );

/** React hook: the active timeline milestone index (Scene 06). */
export const useTimelineGate = () =>
    useSyncExternalStore(
        subscribe,
        () => gateSnapshot,
        () => 0,
    );

// ── World-active flag (lets the global Atmosphere canvas stand down) ──
let worldActive = false;
const worldListeners = new Set();

export const setWorldActive = (b) => {
    if (worldActive === b) return;
    worldActive = b;
    worldListeners.forEach((l) => l());
};

export const useWorldActive = () =>
    useSyncExternalStore(
        (cb) => {
            worldListeners.add(cb);
            return () => worldListeners.delete(cb);
        },
        () => worldActive,
        () => false,
    );
