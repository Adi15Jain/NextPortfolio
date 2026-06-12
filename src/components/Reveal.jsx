"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

/**
 * Cinematic entrance wrapper. Children rise out of depth with a soft blur as
 * they scroll into view, giving each section the feel of a scene resolving
 * into focus. Honors reduced-motion (renders instantly, no transform).
 *
 *   <Reveal delay={0.1}>…</Reveal>
 */
export default function Reveal({
    children,
    delay = 0,
    y = 32,
    blur = 6,
    duration = 0.85,
    once = true,
    amount = 0.25,
    as = "div",
    className = "",
    style,
}) {
    const reduced = useReducedMotion();
    const MotionTag = motion[as] || motion.div;

    if (reduced) {
        const Tag = as;
        return (
            <Tag className={className} style={style}>
                {children}
            </Tag>
        );
    }

    return (
        <MotionTag
            className={className}
            style={style}
            initial={{ opacity: 0, y, filter: `blur(${blur}px)` }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once, amount }}
            transition={{ duration, delay, ease: EASE }}
        >
            {children}
        </MotionTag>
    );
}

/**
 * A container that staggers its <RevealItem> children into view one after
 * another — the smooth, progressive cascade used across the sections.
 *
 *   <RevealStagger className="flex flex-col gap-4">
 *     <RevealItem>…</RevealItem>
 *     <RevealItem>…</RevealItem>
 *   </RevealStagger>
 */
export function RevealStagger({
    children,
    className = "",
    style,
    stagger = 0.12,
    delayChildren = 0.05,
    once = true,
    amount = 0.2,
    as = "div",
}) {
    const reduced = useReducedMotion();
    const MotionTag = motion[as] || motion.div;

    if (reduced) {
        const Tag = as;
        return (
            <Tag className={className} style={style}>
                {children}
            </Tag>
        );
    }

    return (
        <MotionTag
            className={className}
            style={style}
            initial="hidden"
            whileInView="show"
            viewport={{ once, amount }}
            variants={{
                hidden: {},
                show: {
                    transition: {
                        staggerChildren: stagger,
                        delayChildren,
                    },
                },
            }}
        >
            {children}
        </MotionTag>
    );
}

export function RevealItem({
    children,
    className = "",
    style,
    y = 26,
    blur = 5,
    duration = 0.75,
    as = "div",
}) {
    const reduced = useReducedMotion();
    const MotionTag = motion[as] || motion.div;

    if (reduced) {
        const Tag = as;
        return (
            <Tag className={className} style={style}>
                {children}
            </Tag>
        );
    }

    return (
        <MotionTag
            className={className}
            style={style}
            variants={{
                hidden: { opacity: 0, y, filter: `blur(${blur}px)` },
                show: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: { duration, ease: EASE },
                },
            }}
        >
            {children}
        </MotionTag>
    );
}
