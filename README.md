# Adi Jain — Professional AI & Full-Stack Developer Portfolio

A production-grade, high-performance personal portfolio engineered using Next.js, React, Three.js, GSAP, and Tailwind CSS. This codebase showcases advanced user interfaces, custom animations, clinical-grade computer vision dashboards, real-time voice synthesis agents, and dynamic SEO configurations.

---

## Technical Architecture & Core Features

* Next.js App Router: Dynamic hydration, server-side caching, and static generation.
* GSAP & ScrollTrigger: Smooth entrance animations, viewport-locked counters, and micro-interactive page transitions.
* Custom Spotlight Cards: Cursor-tracking hover shaders providing glassmorphic lighting effects.
* Responsive Grid Scaling: Fluid, adaptive desktop columns (e.g. 57/43 grids) that scale cleanly down to mobile.
* Dynamic Navigation Core: A route-aware navbar that automatically transitions from local home scroll targets to relative root-prefixed paths.
* Comprehensive 404 Route: A custom retro-themed 404 landing page featuring rotating background wireframes and interactive CTA components.

---

## Detailed Project Catalog

### 1. InterviewPilot — AI Interview Coach
* Target Challenge: Job seekers lack realistic, low-pressure interview practice. Traditional platforms use static questions that do not adapt to specific job specifications.
* Core Solution: An interactive, low-latency mock interview coaching platform. It parses target job descriptions using Gemini AI to construct tailored adaptive questions, running interactive voice sessions over WebSocket connections.
* Real-World Impact: Democratizes technical preparation, builds physiological muscle memory, and provides detailed metrics on candidate confidence and answer correctness.
* Architectural Selection: Next.js handles fast UI updates, Gemini AI handles adaptive evaluation, Vapi drives real-time audio streams, and NeonDB serverless PostgreSQL coordinates analytic storage.

### 2. PneumoAI — Pneumonia Detection
* Target Challenge: Radiology departments in high-volume clinics face massive patient queues. Diagnostic fatigue can lead to delayed detection in emergency pulmonary cases.
* Core Solution: A diagnostic screening support tool utilizing a deep Convolutional Neural Network (CNN) trained on chest X-rays, providing doctors with regional abnormality indicators.
* Real-World Impact: Accelerates patient sorting times from hours to milliseconds, serves as a powerful validation safety net, and assists rural centers lacking onsite radiologists.
* Architectural Selection: PyTorch runs deep learning inference pipelines, FastAPI serves rapid asynchronous ingestion endpoints, and React maps diagnostic arrays onto clean tablet screens.

### 3. CoinPush — Crypto Screening App
* Target Challenge: Cryptocurrency markets operate constantly, producing highly volatile pricing streams that overwhelm retail investors.
* Core Solution: A consolidated crypto screening terminal aggregating telemetry into sorted breakout lists, gainers/losers metrics, and trending category charts.
* Real-World Impact: Saves traders hours of manual scraping across fragmented platforms and provides zero-cost market visualization.
* Architectural Selection: Next.js processes dynamic page hydration, CoinGecko REST APIs provide price metrics, and SWC compilation optimizes browser route compilation.

---

## Getting Started & Local Development

### Installation

Clone the repository and install the required dependencies:

```bash
npm install
```

### Run Development Server

Launch the local dev server under Turbopack compilation:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) inside your browser to inspect the application.

### Build Production Bundle

To compile the optimized, production-ready static bundle:

```bash
npm run build
```

---

## Search Engine Optimization (SEO) Architecture

This portfolio integrates advanced technical SEO protocols to maximize ranking velocity across Google and Bing indexers:
* Dynamic Sitemap: Generates dynamic page maps mapping the homepage and project sub-routes.
* Structured JSON-LD Metadata: Injects rich structured profile data into header DOM arrays to support crawler index extraction.
* Open Graph & Twitter Cards: Includes pre-scaled, high-fidelity card visualization tags for social platform indexing.
* Keyword Profiling: Focuses on high-intent industry terms (Full-Stack Engineer, AI Developer, PyTorch Specialist, React Developer) across all page copy.
