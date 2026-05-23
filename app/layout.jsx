import "./globals.css";
import { Montserrat } from "next/font/google";
import ClientCursor from "../src/components/ClientCursor";
import ScrollProgressBar from "../src/components/ScrollProgressBar";
import SmoothScroll from "../src/components/SmoothScroll";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const montserrat = Montserrat({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-montserrat",
});

export const metadata = {
    metadataBase: new URL("https://adijain.click"),
    title: {
        default: "Adi Jain — AI & ML Developer",
        template: "%s | Adi Jain",
    },
    description:
        "Computer Science student specializing in AI, ML & DL. Building impactful products with React, Python, Node.js, and Three.js.",
    keywords: [
        "Adi Jain",
        "portfolio",
        "AI developer",
        "ML engineer",
        "React",
        "Python",
        "Three.js",
        "Next.js",
        "computer science",
    ],
    authors: [{ name: "Adi Jain" }],
    creator: "Adi Jain",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://adijain.click",
        siteName: "Adi Jain Portfolio",
        title: "Adi Jain — AI & ML Developer",
        description:
            "Computer Science student specializing in AI, ML & DL. Building impactful products with React, Python, Node.js, and Three.js.",
        images: [
            {
                url: "/images/og-image.png",
                width: 1200,
                height: 630,
                alt: "Adi Jain — AI & ML Developer Portfolio",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Adi Jain — AI & ML Developer",
        description:
            "Computer Science student specializing in AI, ML & DL. Building impactful products with React, Python, Node.js, and Three.js.",
        images: ["/images/og-image.png"],
        creator: "@adi_jain_aj_",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    icons: {
        icon: "/images/fav.png",
        shortcut: "/images/fav.png",
        apple: "/images/fav.png",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={montserrat.variable}>
            <head>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Mona+Sans:ital,wght@0,200..900;1,200..900&display=swap"
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Person",
                            name: "Adi Jain",
                            jobTitle: "AI & Machine Learning Developer",
                            url: "https://adijain.click",
                            sameAs: [
                                "https://www.github.com/Adi15Jain/",
                                "https://www.linkedin.com/in/adi-jain-73334724b/",
                            ],
                            knowsAbout: [
                                "Artificial Intelligence",
                                "Machine Learning",
                                "Deep Learning",
                                "Next.js",
                                "React",
                                "Python",
                                "Three.js",
                            ],
                        }),
                    }}
                />
            </head>
            <body className="antialiased">
                <SmoothScroll />
                <ScrollProgressBar />
                <ClientCursor />
                {children}
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
