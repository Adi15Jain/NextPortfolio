"use client";

import React, { useState, useEffect } from "react";
import { abilities } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SpotlightCard from "../components/SpotlightCard";
import TitleHeader from "../components/TitleHeader";
import Reveal, { RevealStagger, RevealItem } from "../components/Reveal";
import {
    Sparkles,
    Terminal,
    Activity,
    Database,
    Heart,
    Play,
} from "lucide-react";

const iconGradients = [
    "linear-gradient(135deg, #3b82f6, #06b6d4)",
    "linear-gradient(135deg, #8b5cf6, #ec4899)",
    "linear-gradient(135deg, #10b981, #3b82f6)",
    "linear-gradient(135deg, #f59e0b, #ef4444)",
];

const FeatureCards = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [drizzleLogs, setDrizzleLogs] = useState([]);
    const [isDrizzleRunning, setIsDrizzleRunning] = useState(false);
    const [telemetryTicks, setTelemetryTicks] = useState(0);
    const [hoveredSchemaNode, setHoveredSchemaNode] = useState(null);
    const [wsLogs, setWsLogs] = useState([
        "▸ Ingress handshake verified for client_Node_482",
        "▸ Pipelining 33 skill stacks into marquee...",
        "▸ Active cluster status: 100% operational.",
    ]);

    // Simulated real-time WebSocket ticker updates
    useEffect(() => {
        const interval = setInterval(() => {
            setTelemetryTicks((prev) => prev + 1);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    // Simulated rolling WebSocket ingest logs
    useEffect(() => {
        if (activeIndex !== 1) return;
        const interval = setInterval(() => {
            const events = [
                `▸ Ingress client Node_${Math.floor(Math.random() * 900 + 100)} established socket connection.`,
                `▸ Broadcasted telemetry tick #${Math.floor(Math.random() * 500)} successfully.`,
                `▸ Database synchronization latency: ${Math.floor(Math.random() * 8 + 4)}ms.`,
                `▸ Memory cluster sweep completed in ${Math.floor(Math.random() * 3 + 1)}ms.`,
                `▸ Heartbeat acknowledged by Vercel edge nodes.`,
            ];
            const randomEvent =
                events[Math.floor(Math.random() * events.length)];
            setWsLogs((prev) => [...prev.slice(1), randomEvent]);
        }, 2000);
        return () => clearInterval(interval);
    }, [activeIndex]);

    // Interactive Drizzle query execution
    const runDrizzleSimulation = () => {
        if (isDrizzleRunning) return;
        setIsDrizzleRunning(true);
        setDrizzleLogs([
            "$ npx drizzle-kit query running...",
            "▸ Establishing database handshake...",
        ]);

        setTimeout(() => {
            setDrizzleLogs((prev) => [
                ...prev,
                "▸ Connected to PostgreSQL (Drizzle client active)",
            ]);
        }, 600);

        setTimeout(() => {
            setDrizzleLogs((prev) => [
                ...prev,
                "▸ Querying: db.select().from(productsSchema).limit(2)",
            ]);
        }, 1200);

        setTimeout(() => {
            setDrizzleLogs((prev) => [
                ...prev,
                "✓ Returned 2 records in 1.4ms:",
                `  [ { id: 1, name: "Vectrion Enterprise Package", stock: 12 },`,
                `    { id: 2, name: "Cloud Sync Subscription", stock: 8 } ]`,
            ]);
            setIsDrizzleRunning(false);
        }, 2000);
    };

    // Render interactive visual simulation inside the right-hand preview panel
    const renderInteractiveVisual = (index) => {
        switch (index) {
            case 0: // The Problem I Solve: Interactive Optimization Sandbox
                return (
                    <div className="w-full h-full flex flex-col gap-6 lg:gap-8 font-sans text-xs">
                        <div className="flex justify-between items-center pb-3 border-b border-white/5">
                            <span className="text-white/40 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                                <Activity size={12} className="text-cyan-400" />{" "}
                                UX Friction Optimizer
                            </span>
                            <span className="bg-cyan-500/10 text-cyan-400 px-2.5 py-0.5 rounded-full font-mono font-bold text-[10px]">
                                SIMULATION ACTIVE
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 flex-grow items-center">
                            {/* Left Column: Core Web Vitals Checklist */}
                            <div className="md:col-span-5 flex flex-col gap-2.5 lg:gap-5 bg-slate-950/40 p-4 lg:p-6 rounded-xl border border-white/5 h-full justify-center">
                                <span className="text-[10px] text-white/40 uppercase font-mono tracking-wider block border-b border-white/5 pb-1.5 mb-1">
                                    Core Web Vitals
                                </span>
                                <div className="flex justify-between items-center">
                                    <span className="text-white/70">
                                        Largest Contentful Paint
                                    </span>
                                    <span className="text-emerald-400 font-mono font-bold">
                                        0.8s
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-white/70">
                                        First Input Delay
                                    </span>
                                    <span className="text-emerald-400 font-mono font-bold">
                                        8ms
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-white/70">
                                        Cumulative Layout Shift
                                    </span>
                                    <span className="text-emerald-400 font-mono font-bold">
                                        0.00
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-white/70">
                                        Interaction to Next Paint
                                    </span>
                                    <span className="text-emerald-400 font-mono font-bold">
                                        14ms
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-white/70">
                                        SSR Hydration Speed
                                    </span>
                                    <span className="text-emerald-400 font-mono font-bold">
                                        18ms
                                    </span>
                                </div>
                            </div>

                            {/* Right Column: Interactive gauges & waves */}
                            <div className="md:col-span-7 flex flex-col gap-4 lg:gap-6">
                                {/* User Friction Gauge */}
                                <div className="space-y-1.5 lg:space-y-3.5">
                                    <div className="flex justify-between text-[11px] font-mono">
                                        <span className="text-white/60">
                                            Friction Level
                                        </span>
                                        <span className="text-red-400 animate-pulse font-bold">
                                            12.4% (Critical) → 0.02% (Target)
                                        </span>
                                    </div>
                                    <div className="h-2.5 lg:h-3.5 w-full bg-white/5 rounded-full overflow-hidden relative">
                                        <div
                                            className="h-full bg-gradient-to-r from-red-500 to-cyan-500 rounded-full animate-progress-bar"
                                            style={{ width: "98%" }}
                                        />
                                    </div>
                                </div>

                                {/* Telemetry Wave */}
                                <div className="h-20 lg:h-28 bg-slate-950/80 border border-white/5 rounded-xl flex items-center justify-center p-3 lg:p-5 relative overflow-hidden">
                                    <div className="absolute inset-0 flex items-center justify-center opacity-20">
                                        <svg className="w-full h-full stroke-cyan-400 stroke-2 fill-none">
                                            <path
                                                d="M 0,40 Q 50,10 100,40 T 200,40 T 300,40 T 400,40 T 500,40"
                                                className="animate-wave-path"
                                            />
                                        </svg>
                                    </div>
                                    <div className="text-center z-10 space-y-0.5">
                                        <span className="text-cyan-400 font-mono font-bold block text-[13px] lg:text-[15px]">
                                            Telemetry Sync: ON
                                        </span>
                                        <span className="text-white/50 text-[10px] lg:text-[12px]">
                                            Layout shifts successfully
                                            eradicated.
                                        </span>
                                    </div>
                                </div>

                                {/* Quick stats */}
                                <div className="grid grid-cols-2 gap-3 lg:gap-4.5 text-[10px] text-white/50">
                                    <div className="bg-white/5 border border-white/5 p-2 lg:p-3.5 rounded-lg">
                                        <span className="text-white font-semibold block">
                                            Hydration Guard
                                        </span>
                                        <span>Eliminates browser errors.</span>
                                    </div>
                                    <div className="bg-white/5 border border-white/5 p-2 lg:p-3.5 rounded-lg">
                                        <span className="text-white font-semibold block">
                                            Dynamic Pre-render
                                        </span>
                                        <span>Pre-caches layout blocks.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 1: // The Products I Ship: WebSocket Live Sockets Console
                return (
                    <div className="w-full h-full flex flex-col gap-6 lg:gap-8 font-sans text-xs">
                        <div className="flex justify-between items-center pb-3 border-b border-white/5">
                            <span className="text-white/40 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                                <Terminal
                                    size={12}
                                    className="text-purple-400"
                                />{" "}
                                WebSocket Sockets Terminal
                            </span>
                            <span className="bg-purple-500/10 text-purple-400 px-2.5 py-0.5 rounded-full font-mono font-bold text-[10px]">
                                FEED ACTIVE (14ms)
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 flex-grow items-center">
                            {/* Left Column: Sockets Statistics */}
                            <div className="md:col-span-5 flex flex-col gap-3 lg:gap-5 h-full justify-center">
                                <div className="grid grid-cols-3 gap-2 lg:gap-3">
                                    <div className="bg-white/5 border border-white/5 p-2 lg:p-3 rounded-xl text-center">
                                        <span className="text-white/40 block text-[8px]">
                                            Uptime
                                        </span>
                                        <span className="text-white font-bold font-mono text-[10px]">
                                            99.98%
                                        </span>
                                    </div>
                                    <div className="bg-white/5 border border-white/5 p-2 lg:p-3 text-center rounded-xl">
                                        <span className="text-white/40 block text-[8px]">
                                            Ingress
                                        </span>
                                        <span className="text-white font-bold font-mono text-[10px]">
                                            1.2GB/s
                                        </span>
                                    </div>
                                    <div className="bg-white/5 border border-white/5 p-2 lg:p-3 text-center rounded-xl">
                                        <span className="text-white/40 block text-[8px]">
                                            Conns
                                        </span>
                                        <span className="text-white font-bold font-mono text-[10px]">
                                            18.4K
                                        </span>
                                    </div>
                                </div>

                                {/* Sockets Server Nodes */}
                                <div className="bg-slate-950/40 p-3 lg:p-4.5 rounded-xl border border-white/5 space-y-2 lg:space-y-3.5">
                                    <span className="text-[10px] text-white/40 font-mono tracking-wider uppercase block border-b border-white/5 pb-1">
                                        Active Nodes
                                    </span>
                                    <div className="flex justify-between items-center text-[10px]">
                                        <span className="text-white/60">
                                            Node US-East (Virginia)
                                        </span>
                                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />{" "}
                                            Healthy
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-[10px]">
                                        <span className="text-white/60">
                                            Node EU-West (Frankfurt)
                                        </span>
                                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />{" "}
                                            Healthy
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-[10px]">
                                        <span className="text-white/60">
                                            Node AS-South (Mumbai)
                                        </span>
                                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />{" "}
                                            Healthy
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Real-time scrolling event feed */}
                            <div className="md:col-span-7 flex flex-col gap-3 lg:gap-5">
                                {/* Simulated WebSocket Feed */}
                                <div className="bg-slate-950/80 border border-white/5 rounded-xl p-3 lg:p-5 font-mono text-[10px] space-y-2.5 lg:space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-white/60">
                                            ▸ ws://live.analytics.v1/stream
                                        </span>
                                        <span className="text-emerald-400 animate-pulse font-bold">
                                            ● ONLINE
                                        </span>
                                    </div>

                                    <div className="space-y-1 text-white/50">
                                        <div className="flex justify-between border-b border-white/5 pb-1 text-white/70">
                                            <span>CLIENT</span>
                                            <span>METRIC</span>
                                            <span>STATUS</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-purple-400">
                                                PneumoAI_inference
                                            </span>
                                            <span className="font-semibold">
                                                {92 + (telemetryTicks % 3)}%
                                                accuracy
                                            </span>
                                            <span className="text-emerald-400">
                                                ACTIVE
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-blue-400">
                                                CoinPush_websocket
                                            </span>
                                            <span className="font-semibold">
                                                {14.2 -
                                                    (telemetryTicks % 2) *
                                                        0.1}{" "}
                                                ms latency
                                            </span>
                                            <span className="text-emerald-400">
                                                ACTIVE
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-amber-400">
                                                InterviewPilot_voice
                                            </span>
                                            <span className="font-semibold">
                                                {800 + (telemetryTicks % 4) * 5}{" "}
                                                ms RTT
                                            </span>
                                            <span className="text-amber-400">
                                                STANDBY
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Scrolling rolling event logger */}
                                <div className="bg-black/90 border border-white/5 rounded-xl p-3 lg:p-4.5 font-mono text-[9px] min-h-[70px] lg:min-h-[110px] space-y-1 lg:space-y-2 flex flex-col justify-center text-white/60">
                                    <span className="text-white/30 text-[8px] uppercase tracking-wider block mb-1">
                                        Server Event Logger
                                    </span>
                                    {wsLogs.map((log, i) => (
                                        <div key={i} className="truncate">
                                            {log}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 2: // My Core Standard: Interactive Drizzle ORM Terminal
                return (
                    <div className="w-full h-full flex flex-col gap-5 lg:gap-8 font-sans text-xs">
                        <div className="flex justify-between items-center pb-3 border-b border-white/5">
                            <span className="text-emerald-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                                <Database
                                    size={12}
                                    className="text-emerald-400"
                                />{" "}
                                Drizzle ORM Engine sandbox
                            </span>
                            <button
                                onClick={runDrizzleSimulation}
                                disabled={isDrizzleRunning}
                                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border font-semibold transition-all duration-200 ${
                                    isDrizzleRunning
                                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 cursor-not-allowed"
                                        : "bg-emerald-500/20 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/30 hover:border-emerald-500/40 cursor-pointer active:scale-95"
                                }`}
                            >
                                <Play
                                    size={10}
                                    className={
                                        isDrizzleRunning ? "animate-spin" : ""
                                    }
                                />{" "}
                                Run Query
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 flex-grow items-center">
                            {/* Left Column: Schema and SQL compilation */}
                            <div className="md:col-span-6 flex flex-col gap-3">
                                {/* Drizzle code sandbox mock */}
                                <div className="bg-slate-950/90 border border-white/5 rounded-xl p-3.5 lg:p-5 font-mono text-[10px] space-y-1 lg:space-y-2.5 relative group">
                                    <span className="text-white/30 absolute top-2 right-3 font-sans text-[8px] tracking-wider uppercase">
                                        Drizzle Schema
                                    </span>
                                    <div className="text-purple-400">
                                        const{" "}
                                        <span className="text-white">
                                            products
                                        </span>{" "}
                                        = pgTable(
                                        <span className="text-emerald-400">
                                            'products'
                                        </span>
                                        ,{" "}
                                        <span className="text-white">{`{`}</span>
                                    </div>
                                    <div className="text-white pl-4">
                                        id: serial(
                                        <span className="text-emerald-400">
                                            'id'
                                        </span>
                                        ).primaryKey(),
                                    </div>
                                    <div className="text-white pl-4">
                                        name: varchar(
                                        <span className="text-emerald-400">
                                            'name'
                                        </span>
                                        ).notNull(),
                                    </div>
                                    <div className="text-white pl-4">
                                        stock: integer(
                                        <span className="text-emerald-400">
                                            'stock'
                                        </span>
                                        ).notNull(),
                                    </div>
                                    <div className="text-white">{`});`}</div>
                                </div>

                                {/* Compiled RAW SQL */}
                                <div className="bg-slate-950/80 border border-white/5 rounded-xl p-3 lg:p-4.5 font-mono text-[9px] space-y-1 lg:space-y-2.5 relative">
                                    <span className="text-white/30 absolute top-2 right-3 font-sans text-[8px] tracking-wider uppercase">
                                        Compiled Raw SQL
                                    </span>
                                    <div className="text-emerald-400 font-semibold uppercase text-[8px]">
                                        SELECT STATEMENT
                                    </div>
                                    <div className="text-white/70">
                                        <span className="text-purple-400">
                                            SELECT
                                        </span>{" "}
                                        "id", "name", "stock"
                                        <br />
                                        <span className="text-purple-400">
                                            FROM
                                        </span>{" "}
                                        "products"
                                        <br />
                                        <span className="text-purple-400">
                                            ORDER BY
                                        </span>{" "}
                                        "id"{" "}
                                        <span className="text-purple-400">
                                            DESC
                                        </span>{" "}
                                        <span className="text-purple-400">
                                            LIMIT
                                        </span>{" "}
                                        2;
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Execution logs */}
                            <div className="md:col-span-6 flex flex-col gap-3 lg:gap-4.5 h-full justify-center">
                                {/* Simulated console logs */}
                                <div className="bg-black/90 border border-white/5 rounded-xl p-3.5 lg:p-5 font-mono text-[10px] min-h-[110px] lg:min-h-[160px] flex flex-col justify-start">
                                    <span className="text-white/30 text-[8px] uppercase tracking-wider block mb-1">
                                        Query Handshake Console
                                    </span>
                                    {drizzleLogs.length === 0 ? (
                                        <div className="text-white/30 italic flex items-center justify-center h-full min-h-[66px] text-center">
                                            Click "Run Query" to compile &
                                            execute Drizzle adapter handshake...
                                        </div>
                                    ) : (
                                        <div className="space-y-1 text-white/70">
                                            {drizzleLogs.map((log, i) => (
                                                <div
                                                    key={i}
                                                    className={
                                                        log.startsWith("✓")
                                                            ? "text-emerald-400 font-bold"
                                                            : log.startsWith(
                                                                    "$",
                                                                )
                                                              ? "text-white/40"
                                                              : "text-white/70"
                                                    }
                                                >
                                                    {log}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Strict TS compilation status */}
                                <div className="bg-white/5 border border-white/5 px-3 lg:px-5 py-2.5 lg:py-4 rounded-xl flex items-center justify-between text-[10px]">
                                    <span className="text-white/60">
                                        TypeScript Typings Validate
                                    </span>
                                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />{" "}
                                        STRICT OK (0 ERRORS)
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 3: // Real-World Proof: Interactive Catalog Relational Map
                return (
                    <div className="w-full h-full flex flex-col gap-5 lg:gap-8 font-sans text-xs">
                        <div className="flex justify-between items-center pb-3 border-b border-white/5">
                            <span className="text-amber-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                                <Heart size={12} className="text-amber-400" />{" "}
                                Relational Architecture Schema
                            </span>
                            <span className="bg-amber-500/10 text-amber-400 px-2.5 py-0.5 rounded-full font-mono font-bold text-[10px]">
                                RELATIONS: ACTIVE
                            </span>
                        </div>

                        <div className="flex-grow flex flex-col gap-4 relative justify-center">
                            <div className="text-center text-[10px] text-white/40">
                                Hover over the table modules below to compile
                                relational SQL joins in real-time.
                            </div>

                            <div className="grid grid-cols-3 gap-3 relative z-10 text-[9px] font-mono">
                                {/* Table: Catalog */}
                                <div
                                    onMouseEnter={() =>
                                        setHoveredSchemaNode("catalog")
                                    }
                                    onMouseLeave={() =>
                                        setHoveredSchemaNode(null)
                                    }
                                    className={`bg-slate-950/90 border p-3 rounded-xl transition-all duration-300 ${
                                        hoveredSchemaNode === "catalog" ||
                                        hoveredSchemaNode === "orders"
                                            ? "border-amber-400/80 shadow-md shadow-amber-400/5 bg-slate-900/90 -translate-y-1"
                                            : "border-white/5"
                                    }`}
                                >
                                    <span className="text-amber-400 font-bold block pb-1 border-b border-white/5 mb-1.5 uppercase">
                                        catalog
                                    </span>
                                    <div className="text-white/60 space-y-0.5">
                                        <div>
                                            🔑 id{" "}
                                            <span className="text-white/30">
                                                serial
                                            </span>
                                        </div>
                                        <div>
                                            name{" "}
                                            <span className="text-white/30">
                                                varchar
                                            </span>
                                        </div>
                                        <div>
                                            price{" "}
                                            <span className="text-white/30">
                                                numeric
                                            </span>
                                        </div>
                                        <div>
                                            sku{" "}
                                            <span className="text-white/30">
                                                varchar
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Table: Orders */}
                                <div
                                    onMouseEnter={() =>
                                        setHoveredSchemaNode("orders")
                                    }
                                    onMouseLeave={() =>
                                        setHoveredSchemaNode(null)
                                    }
                                    className={`bg-slate-950/90 border p-3 rounded-xl transition-all duration-300 ${
                                        hoveredSchemaNode === "orders" ||
                                        hoveredSchemaNode === "catalog" ||
                                        hoveredSchemaNode === "transactions"
                                            ? "border-purple-400/80 shadow-md shadow-purple-400/5 bg-slate-900/90 -translate-y-1"
                                            : "border-white/5"
                                    }`}
                                >
                                    <span className="text-purple-400 font-bold block pb-1 border-b border-white/5 mb-1.5 uppercase">
                                        orders
                                    </span>
                                    <div className="text-white/60 space-y-0.5">
                                        <div>
                                            🔑 id{" "}
                                            <span className="text-white/30">
                                                serial
                                            </span>
                                        </div>
                                        <div
                                            className={
                                                hoveredSchemaNode === "catalog"
                                                    ? "text-amber-400 font-semibold"
                                                    : ""
                                            }
                                        >
                                            🔗 product_id{" "}
                                            <span className="text-white/30">
                                                int
                                            </span>
                                        </div>
                                        <div>
                                            user_id{" "}
                                            <span className="text-white/30">
                                                int
                                            </span>
                                        </div>
                                        <div>
                                            total{" "}
                                            <span className="text-white/30">
                                                numeric
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Table: Transactions */}
                                <div
                                    onMouseEnter={() =>
                                        setHoveredSchemaNode("transactions")
                                    }
                                    onMouseLeave={() =>
                                        setHoveredSchemaNode(null)
                                    }
                                    className={`bg-slate-950/90 border p-3 rounded-xl transition-all duration-300 ${
                                        hoveredSchemaNode === "transactions" ||
                                        hoveredSchemaNode === "orders"
                                            ? "border-cyan-400/80 shadow-md shadow-cyan-400/5 bg-slate-900/90 -translate-y-1"
                                            : "border-white/5"
                                    }`}
                                >
                                    <span className="text-cyan-400 font-bold block pb-1 border-b border-white/5 mb-1.5 uppercase">
                                        txns
                                    </span>
                                    <div className="text-white/60 space-y-0.5">
                                        <div>
                                            🔑 id{" "}
                                            <span className="text-white/30">
                                                serial
                                            </span>
                                        </div>
                                        <div
                                            className={
                                                hoveredSchemaNode === "orders"
                                                    ? "text-purple-400 font-semibold"
                                                    : ""
                                            }
                                        >
                                            🔗 order_id{" "}
                                            <span className="text-white/30">
                                                int
                                            </span>
                                        </div>
                                        <div>
                                            gateway{" "}
                                            <span className="text-white/30">
                                                varchar
                                            </span>
                                        </div>
                                        <div>
                                            status{" "}
                                            <span className="text-white/30">
                                                varchar
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Schema connections line rendering overlay */}
                            <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
                                <svg className="w-full h-full stroke-[1.5] fill-none">
                                    <path
                                        d="M 120,80 Q 150,80 180,80"
                                        className={`transition-all duration-300 ${
                                            hoveredSchemaNode
                                                ? "stroke-amber-400 stroke-2"
                                                : "stroke-white/10"
                                        }`}
                                    />
                                    <path
                                        d="M 220,80 Q 250,80 280,80"
                                        className={`transition-all duration-300 ${
                                            hoveredSchemaNode
                                                ? "stroke-cyan-400 stroke-2"
                                                : "stroke-white/10"
                                        }`}
                                    />
                                </svg>
                            </div>

                            {/* Compiled SQL JOINS based on Hover State */}
                            <div className="bg-slate-950/90 border border-white/5 rounded-xl p-3 lg:p-4.5 font-mono text-[9px] min-h-[70px] lg:min-h-[120px] space-y-1.5 lg:space-y-3 relative">
                                <span className="text-white/30 absolute top-2 right-3 font-sans text-[8px] tracking-wider uppercase">
                                    Relational SQL Compiler
                                </span>
                                <div className="text-amber-400 font-semibold uppercase text-[8px]">
                                    COMPILED DRIZZLE RELATION
                                </div>
                                <div className="text-white/70 overflow-x-auto whitespace-pre">
                                    {!hoveredSchemaNode ? (
                                        <span className="text-white/40 italic">
                                            ▸ Hover over a table module to
                                            visualize Compiled SQL joins...
                                        </span>
                                    ) : hoveredSchemaNode === "catalog" ? (
                                        <span>
                                            <span className="text-purple-400">
                                                SELECT
                                            </span>{" "}
                                            "catalog"."id", "catalog"."name",
                                            "catalog"."price"
                                            <br />
                                            <span className="text-purple-400">
                                                FROM
                                            </span>{" "}
                                            "catalog"{" "}
                                            <span className="text-purple-400">
                                                WHERE
                                            </span>{" "}
                                            "catalog"."status" = 'active';
                                        </span>
                                    ) : hoveredSchemaNode === "orders" ? (
                                        <span>
                                            <span className="text-purple-400">
                                                SELECT
                                            </span>{" "}
                                            *{" "}
                                            <span className="text-purple-400">
                                                FROM
                                            </span>{" "}
                                            "orders"
                                            <br />
                                            <span className="text-purple-400">
                                                LEFT JOIN
                                            </span>{" "}
                                            "catalog"{" "}
                                            <span className="text-purple-400">
                                                ON
                                            </span>{" "}
                                            "orders"."product_id" =
                                            "catalog"."id"
                                            <br />
                                            <span className="text-purple-400">
                                                LIMIT
                                            </span>{" "}
                                            5;
                                        </span>
                                    ) : (
                                        <span>
                                            <span className="text-purple-400">
                                                SELECT
                                            </span>{" "}
                                            *{" "}
                                            <span className="text-purple-400">
                                                FROM
                                            </span>{" "}
                                            "txns"
                                            <br />
                                            <span className="text-purple-400">
                                                INNER JOIN
                                            </span>{" "}
                                            "orders"{" "}
                                            <span className="text-purple-400">
                                                ON
                                            </span>{" "}
                                            "txns"."order_id" = "orders"."id";
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <section className="w-full md:my-32 my-16 xl:px-0">
            <div className="w-full md:px-20 px-5 flex flex-col gap-16">
                <TitleHeader
                    title="How I Think & Build"
                    sub={
                        <span className="flex items-center gap-1.5">
                            <Sparkles size={13} className="text-purple-400" />{" "}
                            Development Standard
                        </span>
                    }
                />

                {/* Main Interactive Dual Column Panel */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
                    {/* Left Column: Interactive Tab Selectors */}
                    <RevealStagger
                        className="lg:col-span-5 flex flex-col gap-4"
                        stagger={0.1}
                    >
                        {abilities.map(({ imgPath, title, desc }, index) => {
                            const isActive = activeIndex === index;
                            return (
                                <RevealItem
                                    key={title}
                                    className="flex flex-col gap-4"
                                >
                                    <div
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => setActiveIndex(index)}
                                        onKeyDown={(e) => {
                                            if (
                                                e.key === "Enter" ||
                                                e.key === " "
                                            ) {
                                                setActiveIndex(index);
                                            }
                                        }}
                                        className={`text-left rounded-2xl p-6 border transition-all duration-300 cursor-pointer flex gap-5 group relative overflow-hidden ${
                                            isActive
                                                ? "bg-white/[0.06] border-white/15 shadow-xl shadow-black/40 scale-[1.01]"
                                                : "bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/10"
                                        }`}
                                    >
                                        {/* Active Left Indicator Line */}
                                        <div
                                            className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 ${
                                                isActive
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            }`}
                                            style={{
                                                background:
                                                    iconGradients[
                                                        index %
                                                            iconGradients.length
                                                    ],
                                            }}
                                        />

                                        {/* Icon container */}
                                        <div className="w-12 h-12 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                                            <img
                                                src={imgPath}
                                                alt={title}
                                                className="w-12 h-12 object-contain"
                                            />
                                        </div>

                                        {/* Content fields */}
                                        <div className="flex flex-col gap-1.5 flex-1">
                                            <h3
                                                className={`text-lg lg:text-xl font-bold transition-colors duration-200 ${isActive ? "text-white" : "text-white/70"}`}
                                            >
                                                {title}
                                            </h3>
                                            <p
                                                className={`text-xs lg:text-[13.5px] leading-relaxed transition-colors duration-200 ${isActive ? "text-white/60" : "text-white/40 line-clamp-2 group-hover:text-white/50"}`}
                                            >
                                                {desc}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Mobile visual details view - displayed inline on screens below lg */}
                                    {isActive && (
                                        <div className="block lg:hidden w-full transition-all duration-300">
                                            <SpotlightCard className="w-full rounded-2xl p-5 sm:p-6 bg-slate-900/40 border border-white/5 flex flex-col justify-between backdrop-blur-xl relative min-h-[320px] overflow-hidden">
                                                {/* Neon visual halo wrapper */}
                                                <div
                                                    className="absolute -top-12 -right-12 w-48 h-48 rounded-full filter blur-[80px] opacity-15 pointer-events-none"
                                                    style={{
                                                        background:
                                                            iconGradients[
                                                                index %
                                                                    iconGradients.length
                                                            ],
                                                    }}
                                                />
                                                <div className="w-full h-full flex flex-col justify-between flex-grow">
                                                    {renderInteractiveVisual(
                                                        index,
                                                    )}
                                                </div>
                                            </SpotlightCard>
                                        </div>
                                    )}
                                </RevealItem>
                            );
                        })}
                    </RevealStagger>

                    {/* Right Column: High-fidelity interactive visual preview sandbox panel */}
                    <Reveal
                        as="div"
                        className="hidden lg:flex lg:col-span-7"
                        delay={0.15}
                    >
                        <SpotlightCard
                            tilt
                            tiltStrength={3}
                            className="w-full rounded-2xl p-8 bg-slate-900/40 border border-white/5 flex flex-col justify-between backdrop-blur-xl relative min-h-[360px] desktop-detail-card"
                        >
                            {/* Neon visual halo wrapper */}
                            <div
                                className="absolute -top-12 -right-12 w-48 h-48 rounded-full filter blur-[80px] opacity-15 pointer-events-none transition-all duration-700"
                                style={{
                                    background:
                                        iconGradients[
                                            activeIndex % iconGradients.length
                                        ],
                                }}
                            />

                            {/* Display active index visualization */}
                            <div className="w-full h-full flex flex-col justify-between flex-grow">
                                {renderInteractiveVisual(activeIndex)}
                            </div>
                        </SpotlightCard>
                    </Reveal>
                </div>
            </div>

            {/* Custom keyframes & styles injected for interactive simulation */}
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                @keyframes progress-bar {
                    0% { width: 12%; }
                    50% { width: 64%; }
                    100% { width: 98%; }
                }
                .animate-progress-bar {
                    animation: progress-bar 4s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate;
                }
                @keyframes wave-path {
                    0% { stroke-dashoffset: 0; }
                    100% { stroke-dashoffset: -100; }
                }
                .animate-wave-path {
                    stroke-dasharray: 10, 5;
                    animation: wave-path 5s linear infinite;
                }
                @media (min-width: 1024px) {
                    .desktop-detail-card .text-xs {
                        font-size: 13.5px !important;
                    }
                    .desktop-detail-card .text-\\[10px\\] {
                        font-size: 11.5px !important;
                    }
                    .desktop-detail-card .text-\\[9px\\] {
                        font-size: 11px !important;
                    }
                    .desktop-detail-card .text-\\[8px\\] {
                        font-size: 10px !important;
                    }
                    .desktop-detail-card .text-\\[11px\\] {
                        font-size: 12.5px !important;
                    }
                    .desktop-detail-card .text-\\[13px\\] {
                        font-size: 14.5px !important;
                    }
                }
            `,
                }}
            />
        </section>
    );
};

export default FeatureCards;
